const {generateMouse} = require("./mouse")


const generate = async () => {
    console.log(JSON.stringify(await generateMouse(120)))
}

generate()