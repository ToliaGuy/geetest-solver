
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const WindMouse = require("windmouse");

const windMouse = new WindMouse(5)


        // MouseSettings
        let settings = {
          startX: 0,
          startY: 0,
          endX: 167,
          endY: 0,
          gravity: 9,
          wind: 1,
          minWait: 7,
          maxWait: 40,
          maxStep: 12,
          targetArea: 30
        };


// Print points
async function logPoints() {
  let points = await windMouse.GeneratePoints(settings);
  points.unshift([0,0,0])
  points.unshift([getRandomInt(-25, -15), getRandomInt(-25, -15), 0])
  
  console.log("this['LxVe']['MEOT'] = "+JSON.stringify(points));
}

logPoints();
// JSON.stringify(this['LxVe']['MEOT'])
// this['LxVe']['MEOT'] = 