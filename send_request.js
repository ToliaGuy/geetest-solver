const got = require('got');
const Jimp = require("jimp")
const { createCanvas, loadImage } = require('canvas')
const WindMouse = require("windmouse");
const { networkInterfaces } = require('os');
const mouse = require("./mouse.js")
const axios = require("axios")


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var d = {
    "GvzY": {
      "HxmV": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
      "IcKW": ".",
      "JrBD": 7274496,
      "KHKr": 9483264,
      "LZpG": 19220,
      "Mhna": 235,
      "NWSw": 24
    },
    "HxmV": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
    "IcKW": ".",
    "JrBD": 7274496,
    "KHKr": 9483264,
    "LZpG": 19220,
    "Mhna": 235,
    "NWSw": 24,
    "VIIJ": function (e) {
      var r = this["TmyQ"](e);
      return r["res"] + r["end"];
    },
    "Qitx" : function (e) {
      var t = this["HxmV"];
    
      if (e < 0 || e >= t["length"]) {
        return ".";
      }
    
      return t["charAt"](e);
    },
    "SVOJ": function (e, t) {
      return e >> t & 1;
    },
    "TmyQ" : function (e, i) {
      if (!i) {
        i = d;
      }
    
      function t(e, t) {
        var r = 0;
    
        for (var n = i["NWSw"] - 1; n >= 0; n -= 1) {
          if (d["SVOJ"](t, n) === 1) {
            r = (r << 1) + d["SVOJ"](e, n);
          }
        }
    
        return r;
      }
    
      var r = "";
      var n = "";
      var a = e["length"];
    
      for (var s = 0; s < a; s += 3) {
        var u;
    
        if (s + 2 < a) {
          u = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2];
          r += this["Qitx"](t(u, i["JrBD"])) + this["Qitx"](t(u, i["KHKr"])) + this["Qitx"](t(u, i["LZpG"])) + this["Qitx"](t(u, i["Mhna"]));
        } else {
          var c = a % 3;
    
          if (c === 2) {
            u = (e[s] << 16) + (e[s + 1] << 8);
            r += this["Qitx"](t(u, i["JrBD"])) + this["Qitx"](t(u, i["KHKr"])) + this["Qitx"](t(u, i["LZpG"]));
            n = i["IcKW"];
          } else {
            if (c === 1) {
              u = e[s] << 16;
              r += this["Qitx"](t(u, i["JrBD"])) + this["Qitx"](t(u, i["KHKr"]));
              n = i["IcKW"] + i["IcKW"];
            }
          }
        }
      }
    
      return {
        "res": r,
        "end": n
      };
    }
    
  }
  var ne = function () {
    function S4() {
      return ((1 + Math["random"]()) * 65536 | 0)["toString"](16)["substring"](1);
    }

    return function () {
      return S4() + S4() + S4() + S4();
    };
  }();
var te = function () {
    var r = Object["create"] || function () {
      function F() {
      }
  
      return function (e) {
        var t;
        F["prototype"] = e;
        t = new F();
        F["prototype"] = null;
        return t;
      };
    }();
  
    var e = {};
    var t = e["lib"] = {};
  
    var n = t["Base"] = function () {
      return {
        "extend": function (e) {
          var t = r(this);
  
          if (e) {
            t["mixIn"](e);
          }
  
          if (!t["hasOwnProperty"]("init") || this["init"] === t["init"]) {
            t["init"] = function () {
              t["$super"]["init"]["apply"](this, arguments);
            };
          }
  
          t["init"]["prototype"] = t;
          t["$super"] = this;
          return t;
        },
        "create": function () {
          var e = this["extend"]();
          e["init"]["apply"](e, arguments);
          return e;
        },
        "init": function () {},
        "mixIn": function (e) {
          for (var t in e) {
            if (e["hasOwnProperty"](t)) {
              this[t] = e[t];
            }
          }
  
          if (e["hasOwnProperty"]("toString")) {
            this["toString"] = e["toString"];
          }
        }
      };
    }();
  
    var f = t["WordArray"] = n["extend"]({
      "init": function (e, t) {
        e = this["words"] = e || [];
  
        if (t != undefined) {
          this["sigBytes"] = t;
        } else {
          this["sigBytes"] = e["length"] * 4;
        }
      },
      "concat": function (e) {
        var t = this["words"];
        var r = e["words"];
        var n = this["sigBytes"];
        var i = e["sigBytes"];
        this["clamp"]();
  
        if (n % 4) {
          for (var o = 0; o < i; o++) {
            var a = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
            t[n + o >>> 2] |= a << 24 - (n + o) % 4 * 8;
          }
        } else {
          for (var o = 0; o < i; o += 4) {
            t[n + o >>> 2] = r[o >>> 2];
          }
        }
  
        this["sigBytes"] += i;
        return this;
      },
      "clamp": function () {
        var e = this["words"];
        var t = this["sigBytes"];
        e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8;
        e["length"] = Math["ceil"](t / 4);
      }
    });
    var i = e["enc"] = {};
  
    var _ = i["Latin1"] = {
      "parse": function (e) {
        var t = e["length"];
        var r = [];
  
        for (var n = 0; n < t; n++) {
          r[n >>> 2] |= (e["charCodeAt"](n) & 255) << 24 - n % 4 * 8;
        }
  
        return new f["init"](r, t);
      }
    };
  
    var o = i["Utf8"] = {
      "parse": function (e) {
        return _["parse"](unescape(encodeURIComponent(e)));
      }
    };
    var a = t["BufferedBlockAlgorithm"] = n["extend"]({
      "reset": function () {
        this["MEOT"] = new f["init"]();
        this["NQMh"] = 0;
      },
      "OgvP": function (e) {
        if (typeof e == "string") {
          e = o["parse"](e);
        }
  
        this["MEOT"]["concat"](e);
        this["NQMh"] += e["sigBytes"];
      },
      "PILx": function (e) {
        var t = this["MEOT"];
        var r = t["words"];
        var n = t["sigBytes"];
        var i = this["blockSize"];
        var o = i * 4;
        var a = n / o;
  
        if (e) {
          a = Math["ceil"](a);
        } else {
          a = Math["max"]((a | 0) - this["QYmU"], 0);
        }
  
        var s = a * i;
        var u = Math["min"](s * 4, n);
  
        if (s) {
          for (var c = 0; c < s; c += i) {
            this["RNOc"](r, c);
          }
  
          var _ = r["splice"](0, s);
  
          t["sigBytes"] -= u;
        }
  
        return new f["init"](_, u);
      },
      "QYmU": 0
    });
    var s = e["algo"] = {};
    var u = t["Cipher"] = a["extend"]({
      "cfg": n["extend"](),
      "createEncryptor": function (e, t) {
        return this["create"](this["SeZS"], e, t);
      },
      "init": function (e, t, r) {
        this["cfg"] = this["cfg"]["extend"](r);
        this["TMSN"] = e;
        this["UYBd"] = t;
        this["reset"]();
      },
      "reset": function () {
        a["reset"]["call"](this);
        this["VofS"]();
      },
      "process": function (e) {
        this["OgvP"](e);
        return this["PILx"]();
      },
      "finalize": function (e) {
        if (e) {
          this["OgvP"](e);
        }
  
        var t = this["WTmK"]();
        return t;
      },
      "keySize": 128 / 32,
      "ivSize": 128 / 32,
      "SeZS": 1,
      "Xtiv": 2,
      "YrOg": function () {
        return function (c) {
          return {
            "encrypt": function (e, t, r) {
              var t = _["parse"](t);
  
              if (!r || !r["iv"]) {
                r = r || {};
                r["iv"] = _["parse"]("0000000000000000");
              }
  
              var n = m["encrypt"](c, e, t, r);
              var i = n["ciphertext"]["words"];
              var o = n["ciphertext"]["sigBytes"];
              var a = [];
  
              for (var s = 0; s < o; s++) {
                var u = i[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                a["push"](u);
              }
  
              return a;
            }
          };
        };
      }()
    });
    var c = e["mode"] = {};
    var l = t["BlockCipherMode"] = n["extend"]({
      "createEncryptor": function (e, t) {
        return this["Encryptor"]["create"](e, t);
      },
      "init": function (e, t) {
        this["Zpxi"] = e;
        this["aFoi"] = t;
      }
    });
  
    var h = c["CBC"] = function () {
      var e = l["extend"]();
      e["Encryptor"] = e["extend"]({
        "processBlock": function (e, t) {
          var r = this["Zpxi"];
          var n = r["blockSize"];
          Vvpe["call"](this, e, t, n);
          r["encryptBlock"](e, t);
          this["bWQk"] = e["slice"](t, t + n);
        }
      });
  
      function Vvpe(e, t, r) {
        var n = this["aFoi"];
  
        if (n) {
          var i = n;
          this["aFoi"] = undefined;
        } else {
          var i = this["bWQk"];
        }
  
        for (var o = 0; o < r; o++) {
          e[t + o] ^= i[o];
        }
      }
  
      return e;
    }();
  
    var v = e["pad"] = {};
    var d = v["Pkcs7"] = {
      "pad": function (e, t) {
        var r = t * 4;
        var n = r - e["sigBytes"] % r;
        var i = n << 24 | n << 16 | n << 8 | n;
        var o = [];
  
        for (var a = 0; a < n; a += 4) {
          o["push"](i);
        }
  
        var s = f["create"](o, n);
        e["concat"](s);
      }
    };
    var p = t["BlockCipher"] = u["extend"]({
      "cfg": u["cfg"]["extend"]({
        "mode": h,
        "padding": d
      }),
      "reset": function () {
        u["reset"]["call"](this);
        var e = this["cfg"];
        var t = e["iv"];
        var r = e["mode"];
  
        if (this["TMSN"] == this["SeZS"]) {
          var n = r["createEncryptor"];
        }
  
        if (this["cCCN"] && this["cCCN"]["dQAb"] == n) {
          this["cCCN"]["init"](this, t && t["words"]);
        } else {
          this["cCCN"] = n["call"](r, this, t && t["words"]);
          this["cCCN"]["dQAb"] = n;
        }
      },
      "RNOc": function (e, t) {
        this["cCCN"]["processBlock"](e, t);
      },
      "WTmK": function () {
        var e = this["cfg"]["padding"];
  
        if (this["TMSN"] == this["SeZS"]) {
          e["pad"](this["MEOT"], this["blockSize"]);
          var t = this["PILx"](!!"flush");
        }
  
        return t;
      },
      "blockSize": 128 / 32
    });
    var g = t["CipherParams"] = n["extend"]({
      "init": function (e) {
        this["mixIn"](e);
      }
    });
    var m = t["SerializableCipher"] = n["extend"]({
      "cfg": n["extend"](),
      "encrypt": function (e, t, r, n) {
        n = this["cfg"]["extend"](n);
        var i = e["createEncryptor"](r, n);
        var o = i["finalize"](t);
        var a = i["cfg"];
        return g["create"]({
          "ciphertext": o,
          "key": r,
          "iv": a["iv"],
          "algorithm": e,
          "mode": a["mode"],
          "padding": a["padding"],
          "blockSize": e["blockSize"],
          "formatter": n["format"]
        });
      }
    });
    var b = [];
    var y = [];
    var w = [];
    var x = [];
    var E = [];
    var S = [];
    var C = [];
    var T = [];
    var A = [];
    var k = [];
  
    (function () {
      var e = [];
  
      for (var t = 0; t < 256; t++) {
        if (t < 128) {
          e[t] = t << 1;
        } else {
          e[t] = t << 1 ^ 283;
        }
      }
  
      var r = 0;
      var n = 0;
  
      for (var t = 0; t < 256; t++) {
        var i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
        i = i >>> 8 ^ i & 255 ^ 99;
        b[r] = i;
        y[i] = r;
        var o = e[r];
        var a = e[o];
        var s = e[a];
        var u = e[i] * 257 ^ i * 16843008;
        w[r] = u << 24 | u >>> 8;
        x[r] = u << 16 | u >>> 16;
        E[r] = u << 8 | u >>> 24;
        S[r] = u;
        var u = s * 16843009 ^ a * 65537 ^ o * 257 ^ r * 16843008;
        C[i] = u << 24 | u >>> 8;
        T[i] = u << 16 | u >>> 16;
        A[i] = u << 8 | u >>> 24;
        k[i] = u;
  
        if (!r) {
          r = n = 1;
        } else {
          r = o ^ e[e[e[s ^ o]]];
          n ^= e[e[n]];
        }
      }
    })();
  
    var I = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
    var D = s["AES"] = p["extend"]({
      "VofS": function () {
        if (this["eSgm"] && this["fxOn"] === this["UYBd"]) {
          return;
        }
  
        var e = this["fxOn"] = this["UYBd"];
        var t = e["words"];
        var r = e["sigBytes"] / 4;
        var n = this["eSgm"] = r + 6;
        var i = (n + 1) * 4;
        var o = this["gIRQ"] = [];
  
        for (var a = 0; a < i; a++) {
          if (a < r) {
            o[a] = t[a];
          } else {
            var s = o[a - 1];
  
            if (!(a % r)) {
              s = s << 8 | s >>> 24;
              s = b[s >>> 24] << 24 | b[s >>> 16 & 255] << 16 | b[s >>> 8 & 255] << 8 | b[s & 255];
              s ^= I[a / r | 0] << 24;
            } else {
              if (r > 6 && a % r == 4) {
                s = b[s >>> 24] << 24 | b[s >>> 16 & 255] << 16 | b[s >>> 8 & 255] << 8 | b[s & 255];
              }
            }
  
            o[a] = o[a - r] ^ s;
          }
        }
  
        var u = this["htjV"] = [];
  
        for (var c = 0; c < i; c++) {
          var a = i - c;
  
          if (c % 4) {
            var s = o[a];
          } else {
            var s = o[a - 4];
          }
  
          if (c < 4 || a <= 4) {
            u[c] = s;
          } else {
            u[c] = C[b[s >>> 24]] ^ T[b[s >>> 16 & 255]] ^ A[b[s >>> 8 & 255]] ^ k[b[s & 255]];
          }
        }
      },
      "encryptBlock": function (e, t) {
        this["iFmT"](e, t, this["gIRQ"], w, x, E, S, b);
      },
      "iFmT": function (e, t, r, n, i, o, a, s) {
        var u = this["eSgm"];
        var c = e[t] ^ r[0];
  
        var _ = e[t + 1] ^ r[1];
  
        var f = e[t + 2] ^ r[2];
        var l = e[t + 3] ^ r[3];
        var h = 4;
  
        for (var v = 1; v < u; v++) {
          var d = n[c >>> 24] ^ i[_ >>> 16 & 255] ^ o[f >>> 8 & 255] ^ a[l & 255] ^ r[h++];
          var p = n[_ >>> 24] ^ i[f >>> 16 & 255] ^ o[l >>> 8 & 255] ^ a[c & 255] ^ r[h++];
          var g = n[f >>> 24] ^ i[l >>> 16 & 255] ^ o[c >>> 8 & 255] ^ a[_ & 255] ^ r[h++];
          var m = n[l >>> 24] ^ i[c >>> 16 & 255] ^ o[_ >>> 8 & 255] ^ a[f & 255] ^ r[h++];
          c = d;
          _ = p;
          f = g;
          l = m;
        }
  
        var d = (s[c >>> 24] << 24 | s[_ >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[l & 255]) ^ r[h++];
        var p = (s[_ >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[c & 255]) ^ r[h++];
        var g = (s[f >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[c >>> 8 & 255] << 8 | s[_ & 255]) ^ r[h++];
        var m = (s[l >>> 24] << 24 | s[c >>> 16 & 255] << 16 | s[_ >>> 8 & 255] << 8 | s[f & 255]) ^ r[h++];
        e[t] = d;
        e[t + 1] = p;
        e[t + 2] = g;
        e[t + 3] = m;
      },
      "keySize": 256 / 32
    });
    e["AES"] = p["YrOg"](D);
    return e["AES"];
  }();
  var xe = function () {
    "use strict";
  
    var e = {};
    var o = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  
    function f(e) {
      return e < 10 ? "0" + e : e;
    }
  
    function feRu() {
      return this["valueOf"]();
    }
  
    if (typeof Date["prototype"]["toJSON"] !== "function") {
      Date["prototype"]["toJSON"] = function () {
        return isFinite(this["valueOf"]()) ? this["getUTCFullYear"]() + "-" + f(this["getUTCMonth"]() + 1) + "-" + f(this["getUTCDate"]()) + "T" + f(this["getUTCHours"]()) + ":" + f(this["getUTCMinutes"]()) + ":" + f(this["getUTCSeconds"]()) + "Z" : null;
      };
  
      Boolean["prototype"]["toJSON"] = feRu;
      Number["prototype"]["toJSON"] = feRu;
      String["prototype"]["toJSON"] = feRu;
    }
  
    var c;
  
    var _;
  
    var s;
    var l;
  
    function gjVm(e) {
      o["lastIndex"] = 0;
      return o["test"](e) ? "\"" + e["replace"](o, function (e) {
        var t = s[e];
        return typeof t === "string" ? t : "\\u" + ("0000" + e["charCodeAt"](0)["toString"](16))["slice"](-4);
      }) + "\"" : "\"" + e + "\"";
    }
  
    function hjYV(e, t) {
      var r;
      var n;
      var i;
      var o;
      var a = c;
      var s;
      var u = t[e];
  
      if (u && typeof u === "object" && typeof u["toJSON"] === "function") {
        u = u["toJSON"](e);
      }
  
      if (typeof l === "function") {
        u = l["call"](t, e, u);
      }
  
      switch (typeof u) {
        case "string":
          return gjVm(u);
  
        case "number":
          return isFinite(u) ? String(u) : "null";
  
        case "boolean":
        case "null":
          return String(u);
  
        case "object":
          if (!u) {
            return "null";
          }
  
          c += _;
          s = [];
  
          if (Object["prototype"]["toString"]["apply"](u) === "[object Array]") {
            o = u["length"];
  
            for (r = 0; r < o; r += 1) {
              s[r] = hjYV(r, u) || "null";
            }
  
            i = s["length"] === 0 ? "[]" : c ? "[\n" + c + s["join"](",\n" + c) + "\n" + a + "]" : "[" + s["join"](",") + "]";
            c = a;
            return i;
          }
  
          if (l && typeof l === "object") {
            o = l["length"];
  
            for (r = 0; r < o; r += 1) {
              if (typeof l[r] === "string") {
                n = l[r];
                i = hjYV(n, u);
  
                if (i) {
                  s["push"](gjVm(n) + (c ? ": " : ":") + i);
                }
              }
            }
          } else {
            for (n in u) {
              if (Object["prototype"]["hasOwnProperty"]["call"](u, n)) {
                i = hjYV(n, u);
  
                if (i) {
                  s["push"](gjVm(n) + (c ? ": " : ":") + i);
                }
              }
            }
          }
  
          i = s["length"] === 0 ? "{}" : c ? "{\n" + c + s["join"](",\n" + c) + "\n" + a + "}" : "{" + s["join"](",") + "}";
          c = a;
          return i;
      }
    }
  
    s = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      "\"": "\\\"",
      "\\": "\\\\"
    };
  
    e["stringify"] = function (e, t, r) {
      var n;
      c = "";
      _ = "";
  
      if (typeof r === "number") {
        for (n = 0; n < r; n += 1) {
          _ += " ";
        }
      } else {
        if (typeof r === "string") {
          _ = r;
        }
      }
  
      l = t;
  
      if (t && typeof t !== "function" && (typeof t !== "object" || typeof t["length"] !== "number")) {
        throw new Error("JSON.stringify");
      }
  
      return hjYV("", {
        "": e
      });
    };
  
    return e;
  }();
  var Q = function () {
    function NvmZ() {
      this["i"] = 0;
      this["j"] = 0;
      this["S"] = [];
    }

    function OY_d(e) {
      var t;
      var r;
      var n;

      for (t = 0; t < 256; ++t) {
        this["S"][t] = t;
      }

      r = 0;

      for (t = 0; t < 256; ++t) {
        r = r + this["S"][t] + e[t % e["length"]] & 255;
        n = this["S"][t];
        this["S"][t] = this["S"][r];
        this["S"][r] = n;
      }

      this["i"] = 0;
      this["j"] = 0;
    }

    function PRBA() {
      var e;
      this["i"] = this["i"] + 1 & 255;
      this["j"] = this["j"] + this["S"][this["i"]] & 255;
      e = this["S"][this["i"]];
      this["S"][this["i"]] = this["S"][this["j"]];
      this["S"][this["j"]] = e;
      return this["S"][e + this["S"][this["i"]] & 255];
    }

    NvmZ["prototype"]["init"] = OY_d;
    NvmZ["prototype"]["next"] = PRBA;

    function Qkyy() {
      return new NvmZ();
    }

    var r = 256;
    var t;
    var n;
    var i;

    if (n == null) {
      n = [];
      i = 0;
      var e;

      try {
        if (window["crypto"] && window["crypto"]["getRandomValues"]) {
          var o = new Uint32Array(256);
          window["crypto"]["getRandomValues"](o);

          for (e = 0; e < o["length"]; ++e) {
            n[i++] = o[e] & 255;
          }
        }
      } catch (p) {}

      var a = 0;

      function s(e) {
        a = a || 0;

        if (a >= 256 || i >= r) {
          if (window["removeEventListener"]) {
            a = 0;
            window["removeEventListener"]("mousemove", s, false);
          } else {
            if (window["detachEvent"]) {
              a = 0;
              window["detachEvent"]("onmousemove", s);
            }
          }

          return;
        }

        try {
          var t = e["x"] + e["y"];
          n[i++] = t & 255;
          a += 1;
        } catch (p) {}
      }

      // if (window["addEventListener"]) {
      //   window["addEventListener"]("mousemove", s, false);
      // } else {
      //   if (window["attachEvent"]) {
      //     window["attachEvent"]("onmousemove", s);
      //   }
      // }
    }

    function ROOf() {
      if (t == null) {
        t = Qkyy();

        while (i < r) {
          var e = Math["floor"](65536 * Math["random"]());
          n[i++] = e & 255;
        }

        t["init"](n);

        for (i = 0; i < n["length"]; ++i) {
          n[i] = 0;
        }

        i = 0;
      }

      return t["next"]();
    }

    function SLOj(e) {
      var t;

      for (t = 0; t < e["length"]; ++t) {
        e[t] = ROOf();
      }
    }

    function TRqR() {
    }

    TRqR["prototype"]["nextBytes"] = SLOj;
    var u;
    var c = 0xdeadbeefcafe;

    var _ = (c & 16777215) == 15715070;

    function Ujr_(e, t, r) {
      if (e != null) {
        if ("number" == typeof e) {
          this["fromNumber"](e, t, r);
        } else {
          if (t == null && "string" != typeof e) {
            this["fromString"](e, 256);
          } else {
            this["fromString"](e, t);
          }
        }
      }
    }

    function VSMf() {
      return new Ujr_(null);
    }

    function WuAL(e, t, r, n, i, o) {
      while (--o >= 0) {
        var a = t * this[e++] + r[n] + i;
        i = Math["floor"](a / 67108864);
        r[n++] = a & 67108863;
      }

      return i;
    }

    function Xvne(e, t, r, n, i, o) {
      var a = t & 32767;
      var s = t >> 15;

      while (--o >= 0) {
        var u = this[e] & 32767;
        var c = this[e++] >> 15;

        var _ = s * u + c * a;

        u = a * u + ((_ & 32767) << 15) + r[n] + (i & 1073741823);
        i = (u >>> 30) + (_ >>> 15) + s * c + (i >>> 30);
        r[n++] = u & 1073741823;
      }

      return i;
    }

    function YmIR(e, t, r, n, i, o) {
      var a = t & 16383;
      var s = t >> 14;

      while (--o >= 0) {
        var u = this[e] & 16383;
        var c = this[e++] >> 14;

        var _ = s * u + c * a;

        u = a * u + ((_ & 16383) << 14) + r[n] + i;
        i = (u >> 28) + (_ >> 14) + s * c;
        r[n++] = u & 268435455;
      }

      return i;
    }

    Ujr_["prototype"]["am"] = YmIR;
    u = 28;
    Ujr_["prototype"]["DB"] = u;
    Ujr_["prototype"]["DM"] = (1 << u) - 1;
    Ujr_["prototype"]["DV"] = 1 << u;
    var f = 52;
    Ujr_["prototype"]["FV"] = Math["pow"](2, f);
    Ujr_["prototype"]["F1"] = f - u;
    Ujr_["prototype"]["F2"] = 2 * u - f;
    var l = "0123456789abcdefghijklmnopqrstuvwxyz";
    var h = [];
    var v;
    var d;
    v = "0"["charCodeAt"](0);

    for (d = 0; d <= 9; ++d) {
      h[v++] = d;
    }

    v = "a"["charCodeAt"](0);

    for (d = 10; d < 36; ++d) {
      h[v++] = d;
    }

    v = "A"["charCodeAt"](0);

    for (d = 10; d < 36; ++d) {
      h[v++] = d;
    }

    function ZFRL(e) {
      return l["charAt"](e);
    }

    function aIde(e, t) {
      var r = h[e["charCodeAt"](t)];
      return r == null ? -1 : r;
    }

    function bZgp(e) {
      for (var t = this["t"] - 1; t >= 0; --t) {
        e[t] = this[t];
      }

      e["t"] = this["t"];
      e["s"] = this["s"];
    }

    function cZR_(e) {
      this["t"] = 1;
      this["s"] = e < 0 ? -1 : 0;

      if (e > 0) {
        this[0] = e;
      } else {
        if (e < -1) {
          this[0] = e + this["DV"];
        } else {
          this["t"] = 0;
        }
      }
    }

    function dADS(e) {
      var t = VSMf();
      t["fromInt"](e);
      return t;
    }

    function eKl_(e, t) {
      var r;

      if (t == 16) {
        r = 4;
      } else {
        if (t == 8) {
          r = 3;
        } else {
          if (t == 256) {
            r = 8;
          } else {
            if (t == 2) {
              r = 1;
            } else {
              if (t == 32) {
                r = 5;
              } else {
                if (t == 4) {
                  r = 2;
                } else {
                  this["fromRadix"](e, t);
                  return;
                }
              }
            }
          }
        }
      }

      this["t"] = 0;
      this["s"] = 0;
      var n = e["length"];
      var i = false;
      var o = 0;

      while (--n >= 0) {
        var a = r == 8 ? e[n] & 255 : aIde(e, n);

        if (a < 0) {
          if (e["charAt"](n) == "-") {
            i = true;
          }

          continue;
        }

        i = false;

        if (o == 0) {
          this[this["t"]++] = a;
        } else {
          if (o + r > this["DB"]) {
            this[this["t"] - 1] |= (a & (1 << this["DB"] - o) - 1) << o;
            this[this["t"]++] = a >> this["DB"] - o;
          } else {
            this[this["t"] - 1] |= a << o;
          }
        }

        o += r;

        if (o >= this["DB"]) {
          o -= this["DB"];
        }
      }

      if (r == 8 && (e[0] & 128) != 0) {
        this["s"] = -1;

        if (o > 0) {
          this[this["t"] - 1] |= (1 << this["DB"] - o) - 1 << o;
        }
      }

      this["clamp"]();

      if (i) {
        Ujr_["ZERO"]["subTo"](this, this);
      }
    }

    function fepU() {
      var e = this["s"] & this["DM"];

      while (this["t"] > 0 && this[this["t"] - 1] == e) --this["t"];
    }

    function gkRK(e) {
      if (this["s"] < 0) {
        return "-" + this["negate"]()["toString"](e);
      }

      var t;

      if (e == 16) {
        t = 4;
      } else {
        if (e == 8) {
          t = 3;
        } else {
          if (e == 2) {
            t = 1;
          } else {
            if (e == 32) {
              t = 5;
            } else {
              if (e == 4) {
                t = 2;
              } else {
                return this["toRadix"](e);
              }
            }
          }
        }
      }

      var r = (1 << t) - 1;
      var n;
      var i = false;
      var o = "";
      var a = this["t"];
      var s = this["DB"] - a * this["DB"] % t;

      if (a-- > 0) {
        if (s < this["DB"] && (n = this[a] >> s) > 0) {
          i = true;
          o = ZFRL(n);
        }

        while (a >= 0) {
          if (s < t) {
            n = (this[a] & (1 << s) - 1) << t - s;
            n |= this[--a] >> (s += this["DB"] - t);
          } else {
            n = this[a] >> (s -= t) & r;

            if (s <= 0) {
              s += this["DB"];
              --a;
            }
          }

          if (n > 0) {
            i = true;
          }

          if (i) {
            o += ZFRL(n);
          }
        }
      }

      return i ? o : "0";
    }

    function hEZr() {
      var e = VSMf();
      Ujr_["ZERO"]["subTo"](this, e);
      return e;
    }

    function ixSz() {
      return this["s"] < 0 ? this["negate"]() : this;
    }

    function jSMX(e) {
      var t = this["s"] - e["s"];

      if (t != 0) {
        return t;
      }

      var r = this["t"];
      t = r - e["t"];

      if (t != 0) {
        return this["s"] < 0 ? -t : t;
      }

      while (--r >= 0) if ((t = this[r] - e[r]) != 0) {
        return t;
      }

      return 0;
    }

    function knpg(e) {
      var t = 1;
      var r;

      if ((r = e >>> 16) != 0) {
        e = r;
        t += 16;
      }

      if ((r = e >> 8) != 0) {
        e = r;
        t += 8;
      }

      if ((r = e >> 4) != 0) {
        e = r;
        t += 4;
      }

      if ((r = e >> 2) != 0) {
        e = r;
        t += 2;
      }

      if ((r = e >> 1) != 0) {
        e = r;
        t += 1;
      }

      return t;
    }

    function lPsl() {
      if (this["t"] <= 0) {
        return 0;
      }

      return this["DB"] * (this["t"] - 1) + knpg(this[this["t"] - 1] ^ this["s"] & this["DM"]);
    }

    function mjzz(e, t) {
      var r;

      for (r = this["t"] - 1; r >= 0; --r) {
        t[r + e] = this[r];
      }

      for (r = e - 1; r >= 0; --r) {
        t[r] = 0;
      }

      t["t"] = this["t"] + e;
      t["s"] = this["s"];
    }

    function nrgm(e, t) {
      for (var r = e; r < this["t"]; ++r) {
        t[r - e] = this[r];
      }

      t["t"] = Math["max"](this["t"] - e, 0);
      t["s"] = this["s"];
    }

    function om_L(e, t) {
      var r = e % this["DB"];
      var n = this["DB"] - r;
      var i = (1 << n) - 1;
      var o = Math["floor"](e / this["DB"]);
      var a = this["s"] << r & this["DM"];
      var s;

      for (s = this["t"] - 1; s >= 0; --s) {
        t[s + o + 1] = this[s] >> n | a;
        a = (this[s] & i) << r;
      }

      for (s = o - 1; s >= 0; --s) {
        t[s] = 0;
      }

      t[o] = a;
      t["t"] = this["t"] + o + 1;
      t["s"] = this["s"];
      t["clamp"]();
    }

    function pyvO(e, t) {
      t["s"] = this["s"];
      var r = Math["floor"](e / this["DB"]);

      if (r >= this["t"]) {
        t["t"] = 0;
        return;
      }

      var n = e % this["DB"];
      var i = this["DB"] - n;
      var o = (1 << n) - 1;
      t[0] = this[r] >> n;

      for (var a = r + 1; a < this["t"]; ++a) {
        t[a - r - 1] |= (this[a] & o) << i;
        t[a - r] = this[a] >> n;
      }

      if (n > 0) {
        t[this["t"] - r - 1] |= (this["s"] & o) << i;
      }

      t["t"] = this["t"] - r;
      t["clamp"]();
    }

    function qYSE(e, t) {
      var r = 0;
      var n = 0;
      var i = Math["min"](e["t"], this["t"]);

      while (r < i) {
        n += this[r] - e[r];
        t[r++] = n & this["DM"];
        n >>= this["DB"];
      }

      if (e["t"] < this["t"]) {
        n -= e["s"];

        while (r < this["t"]) {
          n += this[r];
          t[r++] = n & this["DM"];
          n >>= this["DB"];
        }

        n += this["s"];
      } else {
        n += this["s"];

        while (r < e["t"]) {
          n -= e[r];
          t[r++] = n & this["DM"];
          n >>= this["DB"];
        }

        n -= e["s"];
      }

      t["s"] = n < 0 ? -1 : 0;

      if (n < -1) {
        t[r++] = this["DV"] + n;
      } else {
        if (n > 0) {
          t[r++] = n;
        }
      }

      t["t"] = r;
      t["clamp"]();
    }

    function rXQB(e, t) {
      var r = this["abs"]();
      var n = e["abs"]();
      var i = r["t"];
      t["t"] = i + n["t"];

      while (--i >= 0) t[i] = 0;

      for (i = 0; i < n["t"]; ++i) {
        t[i + r["t"]] = r["am"](0, n[i], t, i, 0, r["t"]);
      }

      t["s"] = 0;
      t["clamp"]();

      if (this["s"] != e["s"]) {
        Ujr_["ZERO"]["subTo"](t, t);
      }
    }

    function sxGt(e) {
      var t = this["abs"]();
      var r = e["t"] = 2 * t["t"];

      while (--r >= 0) e[r] = 0;

      for (r = 0; r < t["t"] - 1; ++r) {
        var n = t["am"](r, t[r], e, 2 * r, 0, 1);

        if ((e[r + t["t"]] += t["am"](r + 1, 2 * t[r], e, 2 * r + 1, n, t["t"] - r - 1)) >= t["DV"]) {
          e[r + t["t"]] -= t["DV"];
          e[r + t["t"] + 1] = 1;
        }
      }

      if (e["t"] > 0) {
        e[e["t"] - 1] += t["am"](r, t[r], e, 2 * r, 0, 1);
      }

      e["s"] = 0;
      e["clamp"]();
    }

    function txvl(e, t, r) {
      var n = e["abs"]();

      if (n["t"] <= 0) {
        return;
      }

      var i = this["abs"]();

      if (i["t"] < n["t"]) {
        if (t != null) {
          t["fromInt"](0);
        }

        if (r != null) {
          this["copyTo"](r);
        }

        return;
      }

      if (r == null) {
        r = VSMf();
      }

      var o = VSMf();
      var a = this["s"];
      var s = e["s"];
      var u = this["DB"] - knpg(n[n["t"] - 1]);

      if (u > 0) {
        n["lShiftTo"](u, o);
        i["lShiftTo"](u, r);
      } else {
        n["copyTo"](o);
        i["copyTo"](r);
      }

      var c = o["t"];
      var _ = o[c - 1];

      if (_ == 0) {
        return;
      }

      var f = _ * (1 << this["F1"]) + (c > 1 ? o[c - 2] >> this["F2"] : 0);
      var l = this["FV"] / f;
      var h = (1 << this["F1"]) / f;
      var v = 1 << this["F2"];
      var d = r["t"];
      var p = d - c;
      var g = t == null ? VSMf() : t;
      o["dlShiftTo"](p, g);

      if (r["compareTo"](g) >= 0) {
        r[r["t"]++] = 1;
        r["subTo"](g, r);
      }

      Ujr_["ONE"]["dlShiftTo"](c, g);
      g["subTo"](o, o);

      while (o["t"] < c) o[o["t"]++] = 0;

      while (--p >= 0) {
        var m = r[--d] == _ ? this["DM"] : Math["floor"](r[d] * l + (r[d - 1] + v) * h);

        if ((r[d] += o["am"](0, m, r, p, 0, c)) < m) {
          o["dlShiftTo"](p, g);
          r["subTo"](g, r);

          while (r[d] < --m) r["subTo"](g, r);
        }
      }

      if (t != null) {
        r["drShiftTo"](c, t);

        if (a != s) {
          Ujr_["ZERO"]["subTo"](t, t);
        }
      }

      r["t"] = c;
      r["clamp"]();

      if (u > 0) {
        r["rShiftTo"](u, r);
      }

      if (a < 0) {
        Ujr_["ZERO"]["subTo"](r, r);
      }
    }

    function ua_L(e) {
      var t = VSMf();
      this["abs"]()["divRemTo"](e, null, t);

      if (this["s"] < 0 && t["compareTo"](Ujr_["ZERO"]) > 0) {
        e["subTo"](t, t);
      }

      return t;
    }

    function viog(e) {
      this["m"] = e;
    }

    function wjBs(e) {
      if (e["s"] < 0 || e["compareTo"](this["m"]) >= 0) {
        return e["mod"](this["m"]);
      } else {
        return e;
      }
    }

    function xTHT(e) {
      return e;
    }

    function yKuk(e) {
      e["divRemTo"](this["m"], null, e);
    }

    function AU_y(e, t, r) {
      e["multiplyTo"](t, r);
      this["reduce"](r);
    }

    function BLbP(e, t) {
      e["squareTo"](t);
      this["reduce"](t);
    }

    viog["prototype"]["convert"] = wjBs;
    viog["prototype"]["revert"] = xTHT;
    viog["prototype"]["reduce"] = yKuk;
    viog["prototype"]["mulTo"] = AU_y;
    viog["prototype"]["sqrTo"] = BLbP;

    function CQqV() {
      if (this["t"] < 1) {
        return 0;
      }

      var e = this[0];

      if ((e & 1) == 0) {
        return 0;
      }

      var t = e & 3;
      t = t * (2 - (e & 15) * t) & 15;
      t = t * (2 - (e & 255) * t) & 255;
      t = t * (2 - ((e & 65535) * t & 65535)) & 65535;
      t = t * (2 - e * t % this["DV"]) % this["DV"];
      return t > 0 ? this["DV"] - t : -t;
    }

    function DtlK(e) {
      this["m"] = e;
      this["mp"] = e["invDigit"]();
      this["mpl"] = this["mp"] & 32767;
      this["mph"] = this["mp"] >> 15;
      this["um"] = (1 << e["DB"] - 15) - 1;
      this["mt2"] = 2 * e["t"];
    }

    function EKxp(e) {
      var t = VSMf();
      e["abs"]()["dlShiftTo"](this["m"]["t"], t);
      t["divRemTo"](this["m"], null, t);

      if (e["s"] < 0 && t["compareTo"](Ujr_["ZERO"]) > 0) {
        this["m"]["subTo"](t, t);
      }

      return t;
    }

    function Fxzm(e) {
      var t = VSMf();
      e["copyTo"](t);
      this["reduce"](t);
      return t;
    }

    function GQAj(e) {
      while (e["t"] <= this["mt2"]) e[e["t"]++] = 0;

      for (var t = 0; t < this["m"]["t"]; ++t) {
        var r = e[t] & 32767;
        var n = r * this["mpl"] + ((r * this["mph"] + (e[t] >> 15) * this["mpl"] & this["um"]) << 15) & e["DM"];
        r = t + this["m"]["t"];
        e[r] += this["m"]["am"](0, n, e, t, 0, this["m"]["t"]);

        while (e[r] >= e["DV"]) {
          e[r] -= e["DV"];
          e[++r]++;
        }
      }

      e["clamp"]();
      e["drShiftTo"](this["m"]["t"], e);

      if (e["compareTo"](this["m"]) >= 0) {
        e["subTo"](this["m"], e);
      }
    }

    function HV_U(e, t) {
      e["squareTo"](t);
      this["reduce"](t);
    }

    function IdfX(e, t, r) {
      e["multiplyTo"](t, r);
      this["reduce"](r);
    }

    DtlK["prototype"]["convert"] = EKxp;
    DtlK["prototype"]["revert"] = Fxzm;
    DtlK["prototype"]["reduce"] = GQAj;
    DtlK["prototype"]["mulTo"] = IdfX;
    DtlK["prototype"]["sqrTo"] = HV_U;

    function JbXZ() {
      return (this["t"] > 0 ? this[0] & 1 : this["s"]) == 0;
    }

    function KkzZ(e, t) {
      if (e > 4294967295 || e < 1) {
        return Ujr_["ONE"];
      }

      var r = VSMf();
      var n = VSMf();
      var i = t["convert"](this);
      var o = knpg(e) - 1;
      i["copyTo"](r);

      while (--o >= 0) {
        t["sqrTo"](r, n);

        if ((e & 1 << o) > 0) {
          t["mulTo"](n, i, r);
        } else {
          var a = r;
          r = n;
          n = a;
        }
      }

      return t["revert"](r);
    }

    function Lqds(e, t) {
      var r;

      if (e < 256 || t["isEven"]()) {
        r = new viog(t);
      } else {
        r = new DtlK(t);
      }

      return this["exp"](e, r);
    }

    Ujr_["prototype"]["copyTo"] = bZgp;
    Ujr_["prototype"]["fromInt"] = cZR_;
    Ujr_["prototype"]["fromString"] = eKl_;
    Ujr_["prototype"]["clamp"] = fepU;
    Ujr_["prototype"]["dlShiftTo"] = mjzz;
    Ujr_["prototype"]["drShiftTo"] = nrgm;
    Ujr_["prototype"]["lShiftTo"] = om_L;
    Ujr_["prototype"]["rShiftTo"] = pyvO;
    Ujr_["prototype"]["subTo"] = qYSE;
    Ujr_["prototype"]["multiplyTo"] = rXQB;
    Ujr_["prototype"]["squareTo"] = sxGt;
    Ujr_["prototype"]["divRemTo"] = txvl;
    Ujr_["prototype"]["invDigit"] = CQqV;
    Ujr_["prototype"]["isEven"] = JbXZ;
    Ujr_["prototype"]["exp"] = KkzZ;
    Ujr_["prototype"]["toString"] = gkRK;
    Ujr_["prototype"]["negate"] = hEZr;
    Ujr_["prototype"]["abs"] = ixSz;
    Ujr_["prototype"]["compareTo"] = jSMX;
    Ujr_["prototype"]["bitLength"] = lPsl;
    Ujr_["prototype"]["mod"] = ua_L;
    Ujr_["prototype"]["modPowInt"] = Lqds;
    Ujr_["ZERO"] = dADS(0);
    Ujr_["ONE"] = dADS(1);

    function MSIW(e, t) {
      return new Ujr_(e, t);
    }

    function NQfg(e, t) {
      if (t < e["length"] + 11) {
        console && console["error"] && console["error"]("Message too long for RSA");
        return null;
      }

      var r = [];
      var n = e["length"] - 1;

      while (n >= 0 && t > 0) {
        var i = e["charCodeAt"](n--);

        if (i < 128) {
          r[--t] = i;
        } else {
          if (i > 127 && i < 2048) {
            r[--t] = i & 63 | 128;
            r[--t] = i >> 6 | 192;
          } else {
            r[--t] = i & 63 | 128;
            r[--t] = i >> 6 & 63 | 128;
            r[--t] = i >> 12 | 224;
          }
        }
      }

      r[--t] = 0;
      var o = new TRqR();
      var a = [];

      while (t > 2) {
        a[0] = 0;

        while (a[0] == 0) o["nextBytes"](a);

        r[--t] = a[0];
      }

      r[--t] = 2;
      r[--t] = 0;
      return new Ujr_(r);
    }

    function OmEf() {
      this["n"] = null;
      this["e"] = 0;
      this["d"] = null;
      this["p"] = null;
      this["q"] = null;
      this["dmp1"] = null;
      this["dmq1"] = null;
      this["coeff"] = null;
      var e = "00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81";
      var t = "10001";
      this["setPublic"](e, t);
    }

    function PZTE(e, t) {
      if (e != null && t != null && e["length"] > 0 && t["length"] > 0) {
        this["n"] = MSIW(e, 16);
        this["e"] = parseInt(t, 16);
      } else {
        console && console["error"] && console["error"]("Invalid RSA public key");
      }
    }

    function QSVV(e) {
      return e["modPowInt"](this["e"], this["n"]);
    }

    function Rh_O(e) {
      var t = NQfg(e, this["n"]["bitLength"]() + 7 >> 3);

      if (t == null) {
        return null;
      }

      var r = this["doPublic"](t);

      if (r == null) {
        return null;
      }

      var n = r["toString"](16);

      if ((n["length"] & 1) == 0) {
        return n;
      } else {
        return "0" + n;
      }
    }

    OmEf["prototype"]["doPublic"] = QSVV;
    OmEf["prototype"]["setPublic"] = PZTE;
    OmEf["prototype"]["encrypt"] = Rh_O;
    return OmEf;
  }();
function K(e) {
    function IYVd(e, t) {
      return e << t | e >>> 32 - t;
    }

    function Ju_k(e, t) {
      var r;
      var n;
      var i;
      var o;
      var a;
      i = e & 2147483648;
      o = t & 2147483648;
      r = e & 1073741824;
      n = t & 1073741824;
      a = (e & 1073741823) + (t & 1073741823);

      if (r & n) {
        return a ^ 2147483648 ^ i ^ o;
      }

      if (r | n) {
        if (a & 1073741824) {
          return a ^ 3221225472 ^ i ^ o;
        } else {
          return a ^ 1073741824 ^ i ^ o;
        }
      } else {
        return a ^ i ^ o;
      }
    }

    function F(e, t, r) {
      return e & t | ~e & r;
    }

    function G(e, t, r) {
      return e & r | t & ~r;
    }

    function H(e, t, r) {
      return e ^ t ^ r;
    }

    function I(e, t, r) {
      return t ^ (e | ~r);
    }

    function FF(e, t, r, n, i, o, a) {
      e = Ju_k(e, Ju_k(Ju_k(F(t, r, n), i), a));
      return Ju_k(IYVd(e, o), t);
    }

    function GG(e, t, r, n, i, o, a) {
      e = Ju_k(e, Ju_k(Ju_k(G(t, r, n), i), a));
      return Ju_k(IYVd(e, o), t);
    }

    function HH(e, t, r, n, i, o, a) {
      e = Ju_k(e, Ju_k(Ju_k(H(t, r, n), i), a));
      return Ju_k(IYVd(e, o), t);
    }

    function II(e, t, r, n, i, o, a) {
      e = Ju_k(e, Ju_k(Ju_k(I(t, r, n), i), a));
      return Ju_k(IYVd(e, o), t);
    }

    function KHAi(e) {
      var t;
      var r = e["length"];
      var n = r + 8;
      var i = (n - n % 64) / 64;
      var o = (i + 1) * 16;
      var a = Array(o - 1);
      var s = 0;
      var u = 0;

      while (u < r) {
        t = (u - u % 4) / 4;
        s = u % 4 * 8;
        a[t] = a[t] | e["charCodeAt"](u) << s;
        u++;
      }

      t = (u - u % 4) / 4;
      s = u % 4 * 8;
      a[t] = a[t] | 128 << s;
      a[o - 2] = r << 3;
      a[o - 1] = r >>> 29;
      return a;
    }

    function LXjf(e) {
      var t = "";
      var r = "";
      var n;
      var i;

      for (i = 0; i <= 3; i++) {
        n = e >>> i * 8 & 255;
        r = "0" + n["toString"](16);
        t = t + r["substr"](r["length"] - 2, 2);
      }

      return t;
    }

    function MRMR(e) {
      e = e["replace"](/\r\n/g, "\n");
      var t = "";

      for (var r = 0; r < e["length"]; r++) {
        var n = e["charCodeAt"](r);

        if (n < 128) {
          t += String["fromCharCode"](n);
        } else {
          if (n > 127 && n < 2048) {
            t += String["fromCharCode"](n >> 6 | 192);
            t += String["fromCharCode"](n & 63 | 128);
          } else {
            t += String["fromCharCode"](n >> 12 | 224);
            t += String["fromCharCode"](n >> 6 & 63 | 128);
            t += String["fromCharCode"](n & 63 | 128);
          }
        }
      }

      return t;
    }

    var t = [];
    var r;
    var n;
    var i;
    var o;
    var a;
    var s;
    var u;
    var c;

    var _;

    var f = 7;
    var l = 12;
    var h = 17;
    var v = 22;
    var d = 5;
    var p = 9;
    var g = 14;
    var m = 20;
    var b = 4;
    var y = 11;
    var w = 16;
    var x = 23;
    var E = 6;
    var S = 10;
    var C = 15;
    var T = 21;
    e = MRMR(e);
    t = KHAi(e);
    s = 1732584193;
    u = 4023233417;
    c = 2562383102;
    _ = 271733878;

    for (r = 0; r < t["length"]; r += 16) {
      n = s;
      i = u;
      o = c;
      a = _;
      s = FF(s, u, c, _, t[r + 0], f, 3614090360);
      _ = FF(_, s, u, c, t[r + 1], l, 3905402710);
      c = FF(c, _, s, u, t[r + 2], h, 606105819);
      u = FF(u, c, _, s, t[r + 3], v, 3250441966);
      s = FF(s, u, c, _, t[r + 4], f, 4118548399);
      _ = FF(_, s, u, c, t[r + 5], l, 1200080426);
      c = FF(c, _, s, u, t[r + 6], h, 2821735955);
      u = FF(u, c, _, s, t[r + 7], v, 4249261313);
      s = FF(s, u, c, _, t[r + 8], f, 1770035416);
      _ = FF(_, s, u, c, t[r + 9], l, 2336552879);
      c = FF(c, _, s, u, t[r + 10], h, 4294925233);
      u = FF(u, c, _, s, t[r + 11], v, 2304563134);
      s = FF(s, u, c, _, t[r + 12], f, 1804603682);
      _ = FF(_, s, u, c, t[r + 13], l, 4254626195);
      c = FF(c, _, s, u, t[r + 14], h, 2792965006);
      u = FF(u, c, _, s, t[r + 15], v, 1236535329);
      s = GG(s, u, c, _, t[r + 1], d, 4129170786);
      _ = GG(_, s, u, c, t[r + 6], p, 3225465664);
      c = GG(c, _, s, u, t[r + 11], g, 643717713);
      u = GG(u, c, _, s, t[r + 0], m, 3921069994);
      s = GG(s, u, c, _, t[r + 5], d, 3593408605);
      _ = GG(_, s, u, c, t[r + 10], p, 38016083);
      c = GG(c, _, s, u, t[r + 15], g, 3634488961);
      u = GG(u, c, _, s, t[r + 4], m, 3889429448);
      s = GG(s, u, c, _, t[r + 9], d, 568446438);
      _ = GG(_, s, u, c, t[r + 14], p, 3275163606);
      c = GG(c, _, s, u, t[r + 3], g, 4107603335);
      u = GG(u, c, _, s, t[r + 8], m, 1163531501);
      s = GG(s, u, c, _, t[r + 13], d, 2850285829);
      _ = GG(_, s, u, c, t[r + 2], p, 4243563512);
      c = GG(c, _, s, u, t[r + 7], g, 1735328473);
      u = GG(u, c, _, s, t[r + 12], m, 2368359562);
      s = HH(s, u, c, _, t[r + 5], b, 4294588738);
      _ = HH(_, s, u, c, t[r + 8], y, 2272392833);
      c = HH(c, _, s, u, t[r + 11], w, 1839030562);
      u = HH(u, c, _, s, t[r + 14], x, 4259657740);
      s = HH(s, u, c, _, t[r + 1], b, 2763975236);
      _ = HH(_, s, u, c, t[r + 4], y, 1272893353);
      c = HH(c, _, s, u, t[r + 7], w, 4139469664);
      u = HH(u, c, _, s, t[r + 10], x, 3200236656);
      s = HH(s, u, c, _, t[r + 13], b, 681279174);
      _ = HH(_, s, u, c, t[r + 0], y, 3936430074);
      c = HH(c, _, s, u, t[r + 3], w, 3572445317);
      u = HH(u, c, _, s, t[r + 6], x, 76029189);
      s = HH(s, u, c, _, t[r + 9], b, 3654602809);
      _ = HH(_, s, u, c, t[r + 12], y, 3873151461);
      c = HH(c, _, s, u, t[r + 15], w, 530742520);
      u = HH(u, c, _, s, t[r + 2], x, 3299628645);
      s = II(s, u, c, _, t[r + 0], E, 4096336452);
      _ = II(_, s, u, c, t[r + 7], S, 1126891415);
      c = II(c, _, s, u, t[r + 14], C, 2878612391);
      u = II(u, c, _, s, t[r + 5], T, 4237533241);
      s = II(s, u, c, _, t[r + 12], E, 1700485571);
      _ = II(_, s, u, c, t[r + 3], S, 2399980690);
      c = II(c, _, s, u, t[r + 10], C, 4293915773);
      u = II(u, c, _, s, t[r + 1], T, 2240044497);
      s = II(s, u, c, _, t[r + 8], E, 1873313359);
      _ = II(_, s, u, c, t[r + 15], S, 4264355552);
      c = II(c, _, s, u, t[r + 6], C, 2734768916);
      u = II(u, c, _, s, t[r + 13], T, 1309151649);
      s = II(s, u, c, _, t[r + 4], E, 4149444226);
      _ = II(_, s, u, c, t[r + 11], S, 3174756917);
      c = II(c, _, s, u, t[r + 2], C, 718787259);
      u = II(u, c, _, s, t[r + 9], T, 3951481745);
      s = Ju_k(s, n);
      u = Ju_k(u, i);
      c = Ju_k(c, o);
      _ = Ju_k(_, a);
    }

    var A = LXjf(s) + LXjf(u) + LXjf(c) + LXjf(_);
    return A["toLowerCase"]();
  }
function $(e, t) {
    var r = t["slice"](-2);
    var n = [];

    for (var i = 0; i < r["length"]; i++) {
      var o = r["charCodeAt"](i);
      n[i] = o > 57 ? o - 87 : o - 48;
    }

    r = n[0] * 36 + n[1];
    var a = Math["round"](e) + r;
    t = t["slice"](0, -2);
    var s = [[], [], [], [], []];
    var u = {};
    var c = 0;

    var _;

    i = 0;

    for (var f = t["length"]; i < f; i++) {
      _ = t["charAt"](i);

      if (!u[_]) {
        u[_] = 1;
        s[c]["push"](_);
        c++;
        c = c == 5 ? 0 : c;
      }
    }

    var l = a;
    var h;
    var v = 4;
    var d = "";
    var p = [1, 2, 5, 10, 50];

    while (l > 0) {
      if (l - p[v] >= 0) {
        h = parseInt(Math["random"]() * s[v]["length"], 10);
        d = d + s[v][h];
        l = l - p[v];
      } else {
        s["splice"](v, 1);
        p["splice"](v, 1);
        v = v - 1;
      }
    }

    return d;
  }
  function angq(e) {
    this["wrTn"] = e || [];
  }
  angq["prototype"] = {
    "ofuT": function (e) {
        var r = this["wrTn"];

        if (r["map"]) {
          return new angq(r["map"](e));
        }

        var n = [];
        i = 0;
        o = r["length"];

        for (void 0; i < o; i = i + 1) {
          var i;
          var o;
          n[i] = e(r[i], i, this);
        }

        return new angq(n);
      }
  }


t = {
    "tdRx": "move",
    "HdHJ": false,
    "mouseEventsEP": {"v":"7.8.4","te":false,"me":true,"tm":{"a":1635086183303,"b":1635086184371,"c":1635086184372,"d":0,"e":0,"f":1635086183306,"g":1635086183414,"h":1635086183414,"i":1635086183414,"j":1635086183583,"k":1635086183486,"l":1635086183584,"m":1635086184360,"n":1635086184362,"o":1635086184380,"p":1635086184687,"q":1635086184687,"r":1635086184750,"s":1635086185635,"t":1635086185635,"u":1635086185636},"td":-1},
    "wqgt": function () {
        try {
        var s = 0.9928485576923077
        var u = parseInt(this["last_x"] / s)
        // var u = t ? window["lastPoint"]["x"] : e["sFrT"]() / s - window["JfVF"];  // last point of cursor on x axis
        // var u = 167.19569033351485
        // var c = t ? window["lastPoint"]["y"] : window["KMUI"] - e["tDai"]() / s;  // last point of cursor on y axis
        // var c = -7.050420676714509
        // window["QPWo"] = oe() - window["Ibbj"];  // passtime
        // window["QPWo"] = 1618
        // window["LxVe"]["nlsk"]([Math["round"](u), Math["round"](c), window["QPWo"]]); // append last coordinates and time
    
          var _ = u;
        //   console.log(this["wrnn"])
        
        
          var f = this["LxVe"]["pMye"](this["LxVe"]["Umdc"](), this["wrnn"]["c"], this["wrnn"]["s"]);
          // actually sending the request  (x_axis_end_point, stringified_perturbed_track, passtime) in original script, here returning the payload to send the request
          return this["pFyY"](_, f, this["QPWo"]);  
        } catch (e) {
            console.log(e)
          n["xfjg"](e);
        }
        return window;
      },
      "quyY": function (){
        let time = new Date().getTime() - 3500;
        events = {"v":"7.8.4","te":false,"me":true,"tm":{"a":time + getRandomInt(-100, 100),"b":time + getRandomInt(-100, 100),"c":time + getRandomInt(-100, 100),"d":0,"e":0,"f":time + getRandomInt(-100, 100),"g":time + getRandomInt(-100, 100),"h":time + getRandomInt(-100, 100),"i":time + getRandomInt(-100, 100),"j":time + getRandomInt(-100, 100),"k":time + getRandomInt(-100, 100),"l":time + getRandomInt(-100, 100),"m":time + getRandomInt(-100, 100),"n":time + getRandomInt(-100, 100),"o":time + getRandomInt(-100, 100),"p":time + getRandomInt(-100, 100),"q":time + getRandomInt(-100, 100),"r":time + getRandomInt(-100, 100),"s":time + getRandomInt(-100, 100),"t":time + getRandomInt(-100, 100),"u":time + getRandomInt(-100, 100)},"td":-1}
        return events;
      },
      "pFyY": function (e, t, r) {
        var i = this["wrnn"]; // gb, full_gb interesting
        var o = {
          "lang": "en",  // en
          "userresponse": $(e, i["challenge"]),  // userresponse  userresponse(x_axis_end_point, challenge)
          "passtime": r,  // passtime
          "imgload": getRandomInt(140, 200),  // values: 415, 367, 99, 391, 376
          "aa": t,  // encoded track
          "ep": this["quyY"]()  // get touch events and so on  // this is not important
        };
      
        o["rp"] = K(i["gt"] + i["challenge"]["slice"](0, 32) + o["passtime"]);
    
        var _ = this["rdgJ"]();
    
        var f = te["encrypt"](xe["stringify"](o), this["skuf"]());
    
        var l = d["VIIJ"](f);
        var n = parseInt(Math["random"]() * 1e4) + new Date()["valueOf"]()
    
        var h = {
          "gt": i["gt"],
          "challenge": i["challenge"],
          "lang": "en",
          "pt": 0,
          "client_type": "web",
          "w": l + _, 
          "callback": "geetest_" + n
        };
    
        return h;
    
      },
      "skuf": function () {
        var t = ne();
        return function (e) {
          if (e === true) {
            t = ne();
          }
    
          return t;
        };
      }(),
      "rdgJ": function (e) {
        var r = new Q()["encrypt"](this["skuf"](e));
    
        while (!r || r["length"] !== 256) {
          r = new Q()["encrypt"](this["skuf"](true));
        }
    
        return r;
      },
      "LxVe":{
          "Umdc":function () {  // to string
            function e(e) {
              var t = [];
              var r = 0;
              var n;
              var i;
              var o;
              a = 0;
              s = e["length"] - 1;
          
              for (void 0; a < s; a++) {
                var a;
                var s;
                n = Math["round"](e[a + 1][0] - e[a][0]);
                i = Math["round"](e[a + 1][1] - e[a][1]);
                o = Math["round"](e[a + 1][2] - e[a][2]);
          
                if (n == 0 && i == 0 && o == 0) {
                  continue;
                }
          
                if (n == 0 && i == 0) {
                  r += o;
                } else {
                  t["push"]([n, i, o + r]);
                  r = 0;
                }
              }
          
              if (r !== 0) {
                t["push"]([n, i, r]);
              }
          
              return t;
            }
          
            function r(e) {
              var t = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr";
              var r = t["length"];
              var n = "";
              var i = Math["abs"](e);
              var o = parseInt(i / r);
          
              if (o >= r) {
                o = r - 1;
              }
          
              if (o) {
                n = t["charAt"](o);
              }
          
              i = i % r;
              var a = "";
          
              if (e < 0) {
                a += "!";
              }
          
              if (n) {
                a += "$";
              }
          
              return a + n + t["charAt"](i);
            }
          
            function n(e) {
              var t = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]];
              var r = "stuvwxyz~";
              n = 0;
              i = t["length"];
          
              for (void 0; n < i; n++) {
                var n;
                var i;
          
                if (e[0] == t[n][0] && e[1] == t[n][1]) {
                  return r[n];
                }
              }
          
              return 0;
            }
          
            var t = e(this["MEOT"]);
            var i = [];
            var o = [];
            var a = [];
            new angq(t)["ofuT"](function (e) {
                var t = n(e);
        
                if (!t) {
                  i["push"](r(e[0]));
                  o["push"](r(e[1]));
                } else {
                  o["push"](t);
                }
        
                a["push"](r(e[2]));
              });
        
            return i["join"]("") + "!!" + o["join"]("") + "!!" + a["join"]("");
          },
          "pMye": function (e, t, r) {
            if (!t || !r) {
              return e;
            }
        
            var n = 0;
            var i = 2;
            var o;
            var a = e;
            var s = t[0];
            var u = t[2];
            var c = t[4];
        
            while (o = r["substr"](n, i)) {
              n += i;
        
              var _ = parseInt(o, 16);
        
              var f = String["fromCharCode"](_);
              var l = (s * _ * _ + u * _ + c) % e["length"];
              a = a["substr"](0, l) + f + a["substr"](l);
            }
        
            return a;
          }
      }
    }

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
    // console.log(reSlicedImg)
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

    (async () => {
	try {
        const requestHeaders = {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
        }
        //     const client = got.extend({
        //         prefixUrl : "https://2captcha.com",
        //         headers: requestHeaders
        //     })
        // const response = await client.get("demo/geetest");
        // console.log(response.body)
        //     const gtRe = /gt: '(.*?)'/;
        //     const gt = gtRe.exec(response.body)[1]
        //     const challRe = /challenge: '(.*?)'/;
        //     const challenge = challRe.exec(response.body)[1]
        //     const apiServRe = /apiServer='(.*?)'/;
        // const apiServer = apiServRe.exec(response.body)[1] ? apiServRe.exec(response.body)[1] : "api.geetest.com";
        const apiServer = "api-na.geetest.com";
        var v = parseInt(Math["random"]() * 1e4) + new Date()["valueOf"]()
        const gt = "1e505deed3832c02c96ca5abe70df9ab"
        const challenge = "854a1eb9d4a8e60aec377769709c466a"
        var geetestParametersInit = {
            gt: gt,
            challenge: challenge,
            lang: "en",
            pt: 0,
            client_type: "web",
            callback: "geetest_" + v
        }
        
        // const geetestClientGet1 = await got(`https://${apiServer}/get.php`,{headers:requestHeaders, searchParams: geetestParametersInit});
        const geetestClientGet1 = await axios.get(`https://${apiServer}/get.php`, {headers:requestHeaders, params: geetestParametersInit});
        console.log(geetestClientGet1.data)
        console.log(geetestParametersInit)

        v = parseInt(Math["random"]() * 1e4) + new Date()["valueOf"]()
        geetestParametersInit = {
            "gt": gt,
            "challenge": challenge,
            "lang": "en",
            "pt": 0,
            "client_type": "web",
            "callback": "geetest_" + v
            
        }
        
        const geetestClientAjax = await axios.get(`https://${apiServer}/ajax.php`,{headers:requestHeaders, params: geetestParametersInit});
        console.log(geetestClientAjax.data)

        v = parseInt(Math["random"]() * 1e4) + new Date()["valueOf"]()
        geetestParametersInit = {
            "is_next": true,
            "type": "slide3",
            "gt": gt,
            "challenge": challenge,
            "lang": "en",
            "https": false,
            "protocol": "https://",
            "offline": false,
            "product": "embed",
            "api_server": "api.geetest.com",
            "isPC": true,
            "autoReset": true,
            "width": "100%",
            "callback": "geetest_" + v
        }
        console.log(challenge)
        
        const start = new Date().getTime();
        const geetestClientGet2 = await axios.get(`https://${apiServer}/get.php`, {headers: requestHeaders, params: geetestParametersInit});
        const infoRe = /geetest_\d*\((.*?)\)/
        const geetestInfo = JSON.parse(infoRe.exec(geetestClientGet2.data)[1])

        // const geetestInfo = {
        //   "api_server": "https://api-na.geetest.com/",
        //   "benchmark": false,
        //   "bg": "pictures/gt/3a701c386/bg/744db6cc3.jpg",
        //   "c": [12, 58, 98, 36, 43, 95, 62, 15, 12],
        //   "challenge": "70b081ed750c7514d5ba7debf7fdcfe25o",
        //   "clean": false,
        //   "feedback": "",
        //   "fullbg": "pictures/gt/3a701c386/3a701c386.jpg",
        //   "fullpage": false,
        //   "gct_path": "/static/js/gct.0672213be1c3e65af0a9fd841157a005.js",
        //   "gt": "1e505deed3832c02c96ca5abe70df9ab",
        //   "height": 160,
        //   "hide_delay": 800,
        //   "https": true,
        //   "i18n_labels": {cancel: "Zrušit", close: "Zavřít", error: "Chyba, zavřete a zkuste to znovu.",},
        //   "id": "a70b081ed750c7514d5ba7debf7fdcfe2",
        //   "link": "",
        //   "logo": false,
        //   "mobile": true,
        //   "product": "embed",
        //   "s": "35304e54",
        //   "show_delay": 250,
        //   "show_voice": true,
        //   "slice": "pictures/gt/3a701c386/slice/744db6cc3.png",
        //   "so": 0,
        //   "static_servers": ["static.geetest.com/", "dn-staticdown.qbox.me/"],
        //   "template": "",
        //   "theme": "ant",
        //   "theme_version": "1.2.6",
        //   "type": "multilink",
        //   "version": "6.0.9",
        //   "width": "100%",
        //   "xpos": 0,
        //   }



        // const geetestInfo = {
        //   "api_server": "https://api.geetest.com/",
        //   "benchmark": false,
        //   "bg": "pictures/gt/530b6808c/bg/eba246f4d.jpg",
        //   "c": [12, 58, 98, 36, 43, 95, 62, 15, 12],
        //   "challenge": "9f4f553882b54aba13c6e04b581d7287hs",
        //   "clean": false,
        //   "feedback": "https://www.geetest.com/contact/#report",
        //   "fullbg": "pictures/gt/530b6808c/530b6808c.jpg",
        //   "fullpage": false,
        //   "gct_path": "/static/js/gct.27f3539d947d42cb6aa031e5e4d7637d.js",
        //   "gt": "25ead7c884e4813af35141b0b741f2e3",
        //   "height": 160,
        //   "hide_delay": 800,
        //   "https": true,
        //   "i18n_labels": {cancel: "Cancel", close: "Close", error: "Error, Close and try again.",},
        //   "id": "a9f4f553882b54aba13c6e04b581d7287",
        //   "link": "",
        //   "logo": true,
        //   "mobile": true,
        //   "product": "embed",
        //   "s": "39703475",
        //   "show_delay": 250,
        //   "slice": "pictures/gt/530b6808c/slice/eba246f4d.png",
        //   "so": 0,
        //   "static_servers": ["static.geetest.com/", "dn-staticdown.qbox.me/"],
        //   "template": "",
        //   "theme": "ant",
        //   "theme_version": "1.2.6",
        //   "type": "multilink",
        //   "version": "6.0.9",
        //   "width": "100%",
        //   }

        fullBg = getImage(`https://${geetestInfo["static_servers"][0]}${geetestInfo["fullbg"]}`);
        bg = getImage(`https://${geetestInfo["static_servers"][0]}${geetestInfo["bg"]}`);
        
        const fullBgData = await fullBg;
        const bgData = await bg;
        const distance = (await getDistance(fullBgData, bgData)) - 6
        // console.log("distance")
        // console.log(distance)



        sqrt3 = Math.sqrt(3)
        sqrt5 = Math.sqrt(5)


        function getRandomInt (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function wind_mouse(start_x, start_y, dest_x, dest_y, G_0=9, W_0=1, M_0=2, D_0=12){
            // default:    start_x, start_y, dest_x, dest_y, G_0=9, W_0=3, M_0=15, D_0=12

            // WindMouse algorithm. Calls the move_mouse kwarg with each new step.
            // Released under the terms of the GPLv3 license.
            // G_0 - magnitude of the gravitational force
            // W_0 - magnitude of the wind force fluctuations
            // M_0 - maximum step size (velocity clip threshold)
            // D_0 - distance where wind behavior changes from random to damped


            let current_x = start_x
            let current_y = start_y
            let current_time = getRandomInt(110, 280);
            v_x = v_y = W_x = W_y = 0
            
            points.push(Array(getRandomInt(-5, -60), getRandomInt(-5, -60), 0))
            points.push(Array(0,0,0))

            while ((dist = Math.hypot(dest_x-start_x, dest_y-start_y)) >= 1) {
                W_mag = Math.min(W_0, dist)
                if (dist >= D_0) {
                    W_x = W_x/sqrt3 + (2*Math.random()-1)*W_mag/sqrt5
                    W_y = W_y/sqrt3 + (2*Math.random()-1)*W_mag/sqrt5
                } else{
                    W_x /= sqrt3
                    W_y /= sqrt3
                    if (M_0 < 3) {
                        M_0 = Math.random()*3 + 3
                    } else {
                        M_0 /= sqrt5
                    }
                }
                v_x += W_x + G_0*(dest_x-start_x)/dist
                v_y += W_y + G_0*(dest_y-start_y)/dist
                v_mag = Math.hypot(v_x, v_y)
                if (v_mag > M_0) {
                    v_clip = M_0/2 + Math.random()*M_0/2
                    v_x = (v_x/v_mag) * v_clip
                    v_y = (v_y/v_mag) * v_clip
                }
                start_x += v_x
                // start_y += v_y
                start_y += 0
                move_x = Number(Math.round(start_x))
                move_y = Number(Math.round(start_y))
                if (current_x != move_x || current_y != move_y) {
                    points.push(Array(current_x=move_x,current_y=move_y, current_time += getRandomInt(5, 40)))
                    // points.push(Array(current_x=Math.round(move_x/MUL),current_y=move_y, current_time += getRandomInt(5, 70)))
                }
            }
            passtime = current_time + getRandomInt(200, 400);
            points[points.length -1][2] = passtime;
            return [current_x,current_y]
        }

        points = Array();

        const [x_axis, y_axis] = wind_mouse(0,0,distance,0)

        // points = Array();
        // points = await mouse.generateMouse(distance);
        // passtime = 0;

        t["LxVe"]["MEOT"] = points;
        // t["LxVe"]["MEOT"] = points[0];
        t["QPWo"] = points[points.length - 1][2];
        // t["QPWo"] = points[1];
        t["wrnn"] = geetestInfo;
        t["last_x"] = x_axis
        // t["last_x"] = points[0][points[0].length - 1][0];
        
        encoded_payload = t["wqgt"]();

        // console.log(encoded_payload)

        const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
        await sleep(points[points.length -1][2]);
        console.log(JSON.stringify(points))
        console.log(points[points.length - 1][2])

        // const resultResponse = await got(`https://api.geetest.com/ajax.php`,{headers:requestHeaders, searchParams: encoded_payload});
        // https://login.in.meizu.com/ has api.geetest.com one of few
        const resultResponse = await axios.get(`https://api-na.geetest.com/ajax.php`,{headers:requestHeaders, params: encoded_payload});
        console.log(resultResponse.data)
        // console.log(resultResponse.headers)
        // console.log(JSON.stringify(points))

        console.log(new Date().getTime() - start)
        // this["LxVe"]["MEOT"]

    } catch (error) {
        console.log(error)
	}
})()

