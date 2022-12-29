const { createCanvas, loadImage } = require('canvas');
const { get } = require('http');


var Ge = function () {
  var e = "6_11_7_10_4_12_3_1_0_5_2_9_8"["split"]("_");
  var t = [];
  var r;
  n = 0;
  i = 52;
  for (void 0; n < i; n++) {
    var n;
    var i;
    r = parseInt(e[parseInt(n % 26 / 2)]) * 2 + n % 2;

    if (!(parseInt(n / 2) % 2)) {
      r += n % 2 ? -1 : 1;
    }

    r += n < 26 ? 26 : 0;
    t["push"](r);
  }

  return t;
}();




(async () => {
  start = new Date().getTime();

    async function getImage(url){
          const t = createCanvas(300, 150);
          const i = createCanvas(312, 160);
          const o = i.getContext('2d');
          image =  await loadImage(url);
          o.drawImage(image, 0, 0);
          const a = t.getContext('2d');
          t.height = 160;
          t.width = 260;
        
          var s = 160 / 2; // 80
          var u = 10;
          
          for (var c = 0; c < 52; c = c + 1) {
              var _ = Ge[c] % 26 * 12 + 1;
      
              var f = Ge[c] > 25 ? s : 0;
              var l = o["getImageData"](_, f, u, s);
              a["putImageData"](l, c % 26 * 10, c > 25 ? s : 0);
          }

          reSlicedImg = '<img src="' + t.toDataURL() + '" />';
          console.log(reSlicedImg)
          return a.getImageData(0, 0, t.width, t.height);
    }

    async function getDistance(fullBgData, bgData){
      let diff = fullBgData.data.map(function(item, index) {
        return Math.abs(item - bgData.data[index]) > 45 ? true : false; // 45 is min difference between colors
      })

      let diff2 = Array();
      for (let i = 0, x = 0; x < diff.length; i++, x+=4) {
        temp = diff.slice(x, x+4)
        diff2.push(Math.max(...temp))
        
      }

      let endIndex = 0
      var breakCheck = false;
      for (let column = 0; column < fullBgData.width; column++) {
        for (let row = 0; row < fullBgData.height; row++) {
          if(diff2[column + row*fullBgData.width]){
            endIndex = column;
            breakCheck = true;
            break;
          }
        }
        if (breakCheck) break;
        
      }
      return endIndex;
    }

    bg = getImage("https://static.geetest.com/pictures/gt/456b7ea40/456b7ea40.jpg");
    fullBg = getImage("https://static.geetest.com/pictures/gt/456b7ea40/bg/335a207c8.jpg");

        const fullBgData = await fullBg;
        const bgData = await bg;
        const distance = await getDistance(fullBgData, bgData)
        console.log(distance)
        console.log(new Date().getTime() - start);

})()



