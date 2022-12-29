const fs = require('fs');
const types = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const vm = require("vm");
const cleanup = require("../transformations/clean-up")

let testing_opts = {
  comments: false,
  minified: true,
  concise: true,
}

let beautify_opts = {
  comments: true,
  minified: false,
  concise: false,
}

const script = fs.readFileSync('original.js', 'utf-8');

var cleaned_up = cleanup(script);


// fs.writeFileSync('changed.js', cleaned_up);

let AST = parser.parse(cleaned_up, {})

const firstFunct = types.cloneNode(AST.program.body[0].expression.callee.body.body[0]);
const secFunct = types.cloneNode(AST.program.body[0].expression.callee.body.body[2]);
const funcName = secFunct.expression.left.property.name;
const declarObj = types.cloneNode(AST.program.body[0].expression.callee.body.body[4]);
const objName = declarObj.id.name;
const generatedFuncCode =  generate(firstFunct).code + generate(secFunct).code + generate(declarObj).code;

delete AST.program.body[0].expression.callee.body.body[0]
delete AST.program.body[0].expression.callee.body.body[2]

const context = {};
vm.runInNewContext(generatedFuncCode, context);



let varIdentifier;
let functionCall; 
let globArr = Array();

const myVisitor = {
  MemberExpression(path){
    if (path.node.object.type == "Identifier" && path.node.property.type == "Identifier"){
      if (path.node.object.name == objName && path.node.property.name == funcName){
        const varDeclaration = path.getStatementParent();  // that is whole declaration
        globArr.push(varDeclaration.node.declarations[0].id.name)
        varIdentifier = varDeclaration.node.declarations[0].id.name
        functionCall = objName + "." + funcName
        varDeclaration.remove()
      }
    }
  },
  CallExpression(path){
    if(functionCall && varIdentifier){
      const funcArgs = path.get("arguments")
      if (funcArgs.length != 0){
        for (i = 0; i < funcArgs.length; i++){
          if (funcArgs[i].node.name == varIdentifier){
            path.get("arguments")[i].replaceWith(types.stringLiteral(functionCall))
            
          }
        }
      }
    }
  }
}

// const myVisitor = {
  //     CallExpression(path){
    //       const callee = path.get("callee");
    //       if (callee.type == "MemberExpression"){
      //         if(callee.node.object.type == "Identifier" && callee.node.property.type == "Identifier"){
        //           if(callee.node.object.name == objName && callee.node.property.name == "Dvn"){
          //               const evaluatedNode = types.stringLiteral(vm.runInNewContext(generate(path.node).code, context));
          //               path.replaceWith(evaluatedNode);
          //           }
          //         }
          //       }
          //     }
// }

traverse(AST, myVisitor);

const secVisitor = {
  CallExpression(path){
    if (path.node.callee.property){
      if (path.node.callee.property.name == "concat"){
        declarPath = path.getStatementParent();
        declar = declarPath.node;
        globArr.push(declar.declarations[0].id.name)
        declarPath.remove();
      }
    }
  }
}

traverse(AST, secVisitor);


let newDeclar = Array();

do {  // go through declarations and occurencess and search for declarations in the globArr, if you find set newDeclar to 1
  newDeclar = [];
  traverse(AST, {
    MemberExpression(path){
      if (path.node.object){
        if (globArr.includes(path.node.object.name)){
          const parentPath = path.getStatementParent();
          const parent = parentPath.node;
          if (parent.type == "VariableDeclaration"){
            const decVarName = parent.declarations[0].id.name
            if(globArr.indexOf(decVarName) === -1) {
              globArr.push(decVarName);
              newDeclar.push(decVarName);
              parentPath.remove();
              
            }
          }
        }
      }
    }
  })
} while (newDeclar.length > 0);

traverse(AST, {  // cleanup shift methods
  CallExpression(path){
    if(path.node.callee.object && path.node.callee.property){
      if(globArr.includes(path.node.callee.object.name)){
        if(path.node.callee.property.name == "shift"){
          const parentPath = path.getStatementParent();
          parentPath.remove()
        }
        
      }
    }
  }
})


traverse(AST, { // finally call AaWgt.Dvn function
  CallExpression(path){
    if (path.node.callee.type == "Identifier"){
      if(globArr.includes(path.node.callee.name)){
        const arg = path.node.arguments[0].value;
        const func = "AaWgt.Dvn("+ arg +")";
        const evaluatedValue = vm.runInNewContext(func, context);
        const evaluetedNode = types.stringLiteral(evaluatedValue);
        // console.log(evaluatedNode)
        path.replaceWith(evaluetedNode);
      }
      }
    }
  })


  // TODO: decode switch statements inside for loops as they go in code

  const firstFunct2 = types.cloneNode(AST.program.body[0].expression.callee.body.body[1]);
  const secFunct2 = types.cloneNode(AST.program.body[0].expression.callee.body.body[3]);
  const evalScript = generate(firstFunct2).code + generate(secFunct2).code + generate(declarObj).code

  const context2 = {};
  vm.runInNewContext(evalScript, context2);

  delete AST.program.body[0].expression.callee.body.body[1];
  delete AST.program.body[0].expression.callee.body.body[3];
  delete AST.program.body[0].expression.callee.body.body[4];

  const controlFlowDeflatteningVisitor = {
    SwitchStatement(path){
      if(types.isIdentifier(path.node.discriminant)){
            let mainBlockStatement = path.parentPath.parentPath.parentPath;
            const mainDeclar = mainBlockStatement.node.body[0]
            delete mainBlockStatement.node.body[0]
            if(types.isVariableDeclaration(mainDeclar)){
              const mainDeclarName = mainDeclar.declarations[0].id.name;
              const discriminantName = path.node.discriminant.name;
              if (mainDeclarName == discriminantName) {
                // console.log(generate(mainDeclar).code)
                vm.runInNewContext(generate(mainDeclar).code, context2)
                const forStatementNode = mainBlockStatement.node.body[1]
                const nodeCases = path.node.cases
                const caseTests = Array()
                for (let i = 0; i < nodeCases.length; i++) {
                  caseTests.push(nodeCases[i].test)
                }
                const codeCollection = Array();
                try {
                for (;vm.runInNewContext(generate(forStatementNode.test).code, context2);){
                  for (let i = 0; i < caseTests.length; i++) {
                    let evaluationString = generate(caseTests[i]).code + " == " + discriminantName;
                    if (vm.runInNewContext(evaluationString, context2)){
                      let codeToCollect = nodeCases[i].consequent;
                      for (let a = 0; a < codeToCollect.length; a++) {
                        if (codeToCollect[a]) {
                          // console.log(generate(codeToCollect[a]).code)
                        if (codeToCollect[a] && codeToCollect[a].type == "BreakStatement"){
                          delete codeToCollect[a];
                        }
                        if (codeToCollect[a] && codeToCollect[a].type == "ExpressionStatement"){
                          // console.log(codeToCollect[a].expression.type)
                          if(codeToCollect[a].expression.type == "AssignmentExpression" && codeToCollect[a].expression.left.name == discriminantName){
                            // console.log("hello")
                            vm.runInNewContext(generate(codeToCollect[a]).code, context2)
                            delete codeToCollect[a]
                          }
                        }
                        if (codeToCollect[a] && codeToCollect[a].type == "ReturnStatement"){
                          codeCollection.push(codeToCollect[a]);
                          throw Error("return statement")
                        }
                        
                      }
                      // console.log("pushing")
                      if (codeToCollect[a]){
                        codeCollection.push(codeToCollect[a]);

                      }
                      
                    }
                      break;
                    }
                  }
                }
              }
              catch(err) {
                // console.log(err)
              }
              // console.log(codeCollection)
                path.parentPath.parentPath.replaceWithMultiple(codeCollection)
 
              }   
          }
        }
    }
  }
  
  
  traverse(AST, controlFlowDeflatteningVisitor);


//   const renameThis = {
//     Identifier(path){
//       if (path.node.name == this.declarName){
//         path.node.name = "this";
//       }
//     }
//   }

//   traverse(AST, {
//     FunctionExpression(path){
//       for (let i = 0; i < path.node.body.body.length; i++) {
//         if (path.node.body.body[i]) {
//         if(path.node.body.body[i].type == "VariableDeclaration"){
//           if (path.node.body.body[i].declarations[0].init){
//           if(path.node.body.body[i].declarations[0].init.type == "ThisExpression"){
//             const declar = path.node.body.body[i].declarations[0];
//             const declarName = declar.id.name;
//             path.traverse(renameThis, {declarName});
//           }
//         }
//       }
//     }
        
//       }
//     }
//   })

//   traverse(AST, {  // delete window = this
//     VariableDeclaration(path){
//       if (generate(path.node.declarations[0]).code == "this = this"){
//         path.remove()
//       }
//     }
// })



  const midle_code = generate(AST, beautify_opts).code;

  AST = parser.parse(midle_code, {})

  const funcs = {}
  traverse(AST, {
    FunctionExpression(path){
      const declarFunc = path.parentPath.node;
      if(declarFunc.type == "ObjectProperty"){
        if(declarFunc.key && declarFunc.value){
          funcs[declarFunc.key.value] = declarFunc.value;
        }
      }
    }
  })


  traverse(AST, {
    CallExpression(path){
      if(path.node.callee.property){
        const args = path.node.arguments;
        const funcToRef = funcs[path.node.callee.property.value]  // function that has to be replaced with call expression
        if(funcToRef){
          if (funcToRef.type && !(path.node.callee.property.value == "parse" || path.node.callee.property.value == "Lsfc" || path.node.callee.property.value == "oipJ" || path.node.callee.property.value == "bncW" || path.node.callee.property.value == "each" || path.node.callee.property.value == "MVGN")) {  // inbuild function doesnt have node, so that means they doesnt have type
          console.log(path.node.callee.property.value)
          console.log()
          console.log(funcToRef)
          console.log(generate(funcToRef).code)
          // const params = funcToRef.params;
          const funcCode = "(" + generate(funcToRef).code + ")"
          const func_ast = parser.parse(funcCode, {});
          path.replaceWith(funcToRef)
          console.log(generate(path.parentPath.node).code)
          
          
        }
      }

      }
    }
  })
  
  
  const final_code = generate(AST, beautify_opts).code;
  
  fs.writeFileSync('changed.js', final_code);







