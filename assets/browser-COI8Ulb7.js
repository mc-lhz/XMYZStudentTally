/*!
 * 模块：browser（browser-COI8Ulb7.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/browser-COI8Ulb7.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */

function zz0(val) {
  return val && val.__esModule && Object.prototype.hasOwnProperty.call(val, "default") ? val.default : val;
}
var browserConfig = {},
  local_zb5,
  pt;
function zz1() {
  return pt || (pt = 1, local_zb5 = function () {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), local_zb5;
}
var browserConfig_2 = {},
  browserConfig_3 = {},
  Rt;
function zz2() {
  if (Rt) return browserConfig_3;
  Rt = 1;
  let val;
  const list = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
  return browserConfig_3.getSymbolSize = function (val1) {
    if (!val1) throw new Error('"version" cannot be null or undefined');
    if (val1 < 1 || val1 > 40) throw new Error('"version" should be in range from 1 to 40');
    return val1 * 4 + 17;
  }, browserConfig_3.getSymbolTotalCodewords = function (val1) {
    return list[val1];
  }, browserConfig_3.getBCHDigit = function (val1) {
    let num = 0;
    for (; val1 !== 0;) num++, val1 >>>= 1;
    return num;
  }, browserConfig_3.setToSJISFunction = function (val1) {
    if (typeof val1 != "function") throw new Error('"toSJISFunc" is not a valid function.');
    val = val1;
  }, browserConfig_3.isKanjiModeEnabled = function () {
    return typeof val < "u";
  }, browserConfig_3.toSJIS = function (val1) {
    return val(val1);
  }, browserConfig_3;
}
var browserConfig_4 = {},
  At;
function zz3() {
  return At || (At = 1, function (val) {
    val.L = {
      bit: 1
    }, val.M = {
      bit: 0
    }, val.Q = {
      bit: 3
    }, val.H = {
      bit: 2
    };
    function zz4(val1) {
      if (typeof val1 != "string") throw new Error("Param is not a string");
      switch (val1.toLowerCase()) {
        case "l":
        case "low":
          return val.L;
        case "m":
        case "medium":
          return val.M;
        case "q":
        case "quartile":
          return val.Q;
        case "h":
        case "high":
          return val.H;
        default:
          throw new Error("Unknown EC Level: " + val1);
      }
    }
    val.isValid = function (val1) {
      return val1 && typeof val1.bit < "u" && val1.bit >= 0 && val1.bit < 4;
    }, val.from = function (val1, val2) {
      if (val.isValid(val1)) return val1;
      try {
        return zz4(val1);
      } catch {
        return val2;
      }
    };
  }(browserConfig_4)), browserConfig_4;
}
var browserConst5, Tt;
function zz5() {
  if (Tt) return browserConst5;
  Tt = 1;
  function zz6() {
    this.buffer = [], this.length = 0;
  }
  return zz6.prototype = {
    get: function (val) {
      const val2 = Math.floor(val / 8);
      return (this.buffer[val2] >>> 7 - val % 8 & 1) === 1;
    },
    put: function (val, val2) {
      for (let num = 0; num < val2; num++) this.putBit((val >>> val2 - num - 1 & 1) === 1);
    },
    getLengthInBits: function () {
      return this.length;
    },
    putBit: function (val) {
      const val2 = Math.floor(this.length / 8);
      this.buffer.length <= val2 && this.buffer.push(0), val && (this.buffer[val2] |= 128 >>> this.length % 8), this.length++;
    }
  }, browserConst5 = zz6, browserConst5;
}
var local_zbc0, It;
function zz7() {
  if (It) return local_zbc0;
  It = 1;
  function zz8(val) {
    if (!val || val < 1) throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = val, this.data = new Uint8Array(val * val), this.reservedBit = new Uint8Array(val * val);
  }
  return zz8.prototype.set = function (val, val2, val3, val4) {
    const val5 = val * this.size + val2;
    this.data[val5] = val3, val4 && (this.reservedBit[val5] = !0);
  }, zz8.prototype.get = function (val, val2) {
    return this.data[val * this.size + val2];
  }, zz8.prototype.xor = function (val, val2, val3) {
    this.data[val * this.size + val2] ^= val3;
  }, zz8.prototype.isReserved = function (val, val2) {
    return this.reservedBit[val * this.size + val2];
  }, local_zbc0 = zz8, local_zbc0;
}
var local_zbc1 = {},
  Nt;
function zz9() {
  return Nt || (Nt = 1, function (val) {
    const val2 = zz2().getSymbolSize;
    val.getRowColCoords = function (val1) {
      if (val1 === 1) return [];
      const val3 = Math.floor(val1 / 7) + 2,
        val4 = val2(val1),
        val5 = val4 === 145 ? 26 : Math.ceil((val4 - 13) / (2 * val3 - 2)) * 2,
        list = [val4 - 7];
      for (let num = 1; num < val3 - 1; num++) list[num] = list[num - 1] - val5;
      return list.push(6), list.reverse();
    }, val.getPositions = function (val1) {
      const list = [],
        rowColCoords = val.getRowColCoords(val1),
        val4 = rowColCoords.length;
      // qrcode/AlignmentPattern.getPositions：num=i(外层)、zz10=j(内层)，跳过被定位图形占用的三角。
      for (let num = 0; num < val4; num++) for (let zz10 = 0; zz10 < val4; zz10++) num === 0 && zz10 === 0 || num === 0 && zz10 === val4 - 1 || num === val4 - 1 && zz10 === 0 || list.push([rowColCoords[num], rowColCoords[zz10]]);
      return list;
    };
  }(local_zbc1)), local_zbc1;
}
var tt = {},
  Mt;
function zz11() {
  if (Mt) return tt;
  Mt = 1;
  const val = zz2().getSymbolSize,
    num = 7;
  return tt.getPositions = function (val1) {
    const val2 = val(val1);
    return [[0, 0], [val2 - num, 0], [0, val2 - num]];
  }, tt;
}
var et = {},
  Pt;
function zz12() {
  return Pt || (Pt = 1, function (val) {
    val.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const obj = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    val.isValid = function (val1) {
      return val1 != null && val1 !== "" && !isNaN(val1) && val1 >= 0 && val1 <= 7;
    }, val.from = function (val1) {
      return val.isValid(val1) ? parseInt(val1, 10) : void 0;
    }, val.getPenaltyN1 = function (val1) {
      const val2 = val1.size;
      let num = 0,
        num2 = 0,
        num3 = 0,
        val3 = null,
        val4 = null;
      for (let zz13 = 0; zz13 < val2; zz13++) {
        num2 = num3 = 0, val3 = val4 = null;
        // qrcode/getPenaltyN1：zz13=row、zz14=col、num=points、num2=sameCountCol、num3=sameCountRow。
        // 反混淆曾把 points += ... 塌陷到循环变量上（zz14 += / zz13 +=），
        // 既漏计罚分又让行列游标乱跳；两次 get 的行列相反：get(row,col) 与 get(col,row)。
        for (let zz14 = 0; zz14 < val2; zz14++) {
          let val5 = val1.get(zz13, zz14);
          val5 === val3 ? num2++ : (num2 >= 5 && (num += obj.N1 + (num2 - 5)), val3 = val5, num2 = 1), val5 = val1.get(zz14, zz13), val5 === val4 ? num3++ : (num3 >= 5 && (num += obj.N1 + (num3 - 5)), val4 = val5, num3 = 1);
        }
        num2 >= 5 && (num += obj.N1 + (num2 - 5)), num3 >= 5 && (num += obj.N1 + (num3 - 5));
      }
      return num;
    }, val.getPenaltyN2 = function (val1) {
      const val2 = val1.size;
      let num = 0;
      // qrcode/getPenaltyN2：zz15=row、zz16=col、num=points。
      // 反混淆曾把 row 塌陷成 col、并把 points++ 写成 col++（连计分和推进都错）。
      for (let zz15 = 0; zz15 < val2 - 1; zz15++) for (let zz16 = 0; zz16 < val2 - 1; zz16++) {
        const val3 = val1.get(zz15, zz16) + val1.get(zz15, zz16 + 1) + val1.get(zz15 + 1, zz16) + val1.get(zz15 + 1, zz16 + 1);
        (val3 === 4 || val3 === 0) && num++;
      }
      return num * obj.N2;
    }, val.getPenaltyN3 = function (val1) {
      const val2 = val1.size;
      let num = 0,
        num2 = 0,
        num3 = 0;
      for (let zz17 = 0; zz17 < val2; zz17++) {
        num2 = num3 = 0;
        // qrcode/getPenaltyN3：zz17=row、zz18=col、num=points、num2=bitsCol、num3=bitsRow。
        // 注意两次 get 的行列是反的：get(row,col) 与 get(col,row)。
        // 反混淆曾把 row 塌陷成 col、并把 points++ 写成 col++（会跳过格子）。
        for (let zz18 = 0; zz18 < val2; zz18++) num2 = num2 << 1 & 2047 | val1.get(zz17, zz18), zz18 >= 10 && (num2 === 1488 || num2 === 93) && num++, num3 = num3 << 1 & 2047 | val1.get(zz18, zz17), zz18 >= 10 && (num3 === 1488 || num3 === 93) && num++;
      }
      return num * obj.N3;
    }, val.getPenaltyN4 = function (val1) {
      let num = 0;
      const val2 = val1.data.length;
      // qrcode/getPenaltyN4：num=darkCount 累加器、zz19=i。
      // 反混淆曾把累加器塌陷成循环变量（zz19 += data[zz19]），既算错又乱跳。
      for (let zz19 = 0; zz19 < val2; zz19++) num += val1.data[zz19];
      return Math.abs(Math.ceil(num * 100 / val2 / 5) - 10) * obj.N4;
    };
    function zz20(val1, val2, val3) {
      switch (val1) {
        case val.Patterns.PATTERN000:
          return (val2 + val3) % 2 === 0;
        case val.Patterns.PATTERN001:
          return val2 % 2 === 0;
        case val.Patterns.PATTERN010:
          return val3 % 3 === 0;
        case val.Patterns.PATTERN011:
          return (val2 + val3) % 3 === 0;
        case val.Patterns.PATTERN100:
          return (Math.floor(val2 / 2) + Math.floor(val3 / 3)) % 2 === 0;
        case val.Patterns.PATTERN101:
          return val2 * val3 % 2 + val2 * val3 % 3 === 0;
        case val.Patterns.PATTERN110:
          return (val2 * val3 % 2 + val2 * val3 % 3) % 2 === 0;
        case val.Patterns.PATTERN111:
          return (val2 * val3 % 3 + (val2 + val3) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + val1);
      }
    }
    val.applyMask = function (val1, val2) {
      const val3 = val2.size;
      // qrcode/applyMask：num=col(外层)、zz21=row(内层)，data.xor(row, col, getMaskAt(pattern,row,col))
      // 反混淆曾把外层 col 塌陷成内层 row（num 声明后零引用），只会遮罩对角线。
      for (let num = 0; num < val3; num++) for (let zz21 = 0; zz21 < val3; zz21++) val2.isReserved(zz21, num) || val2.xor(zz21, num, zz20(val1, zz21, num));
    }, val.getBestMask = function (val1, val2) {
      const val3 = Object.keys(val.Patterns).length;
      let num = 0,
        val4 = 1 / 0;
      for (let zz22 = 0; zz22 < val3; zz22++) {
        val2(zz22), val.applyMask(zz22, val1);
        const val5 = val.getPenaltyN1(val1) + val.getPenaltyN2(val1) + val.getPenaltyN3(val1) + val.getPenaltyN4(val1);
        // qrcode/getBestMask：num=bestPattern、val4=lowerPenalty、zz22=p。
        // 反混淆曾把 bestPattern = p 塌陷成 p = p（自赋值空操作），永远返回掩码 0。
        val.applyMask(zz22, val1), val5 < val4 && (val4 = val5, num = zz22);
      }
      return num;
    };
  }(et)), et;
}
var local_zbc2 = {},
  St;
function zz23() {
  if (St) return local_zbc2;
  St = 1;
  const val = zz3(),
    list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81],
    list2 = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
  return local_zbc2.getBlocksCount = function (val1, val2) {
    switch (val2) {
      case val.L:
        return list[(val1 - 1) * 4 + 0];
      case val.M:
        return list[(val1 - 1) * 4 + 1];
      case val.Q:
        return list[(val1 - 1) * 4 + 2];
      case val.H:
        return list[(val1 - 1) * 4 + 3];
      default:
        return;
    }
  }, local_zbc2.getTotalCodewordsCount = function (val1, val2) {
    switch (val2) {
      case val.L:
        return list2[(val1 - 1) * 4 + 0];
      case val.M:
        return list2[(val1 - 1) * 4 + 1];
      case val.Q:
        return list2[(val1 - 1) * 4 + 2];
      case val.H:
        return list2[(val1 - 1) * 4 + 3];
      default:
        return;
    }
  }, local_zbc2;
}
var nt = {},
  local_zbc3 = {},
  bt;
function zz24() {
  if (bt) return local_zbc3;
  bt = 1;
  const uint8array = new Uint8Array(512),
    uint8array2 = new Uint8Array(256);
  return function () {
    let num = 1;
    // qrcode/galoisField initTables()：EXP[i]=x; LOG[x]=i; x<<=1; if(x&0x100) x^=0x11D
    // num=x（GF 元素）、zz25=i（指数）。反混淆曾把 x 整个塌陷进循环变量 zz25，
    // 导致 num 声明后零引用、且循环变量自身被 <<= / ^= 改写：EXP/LOG 表全错
    // → GF.mul 全错 → generateECPolynomial 首项为 0 → Polynomial.mod 无限循环。
    for (let zz25 = 0; zz25 < 255; zz25++) uint8array[zz25] = num, uint8array2[num] = zz25, num <<= 1, num & 256 && (num ^= 285);
    for (let zz26 = 255; zz26 < 512; zz26++) uint8array[zz26] = uint8array[zz26 - 255];
  }(), local_zbc3.log = function (val) {
    if (val < 1) throw new Error("log(" + val + ")");
    return uint8array2[val];
  }, local_zbc3.exp = function (val) {
    return uint8array[val];
  }, local_zbc3.mul = function (val, val2) {
    return val === 0 || val2 === 0 ? 0 : uint8array[uint8array2[val] + uint8array2[val2]];
  }, local_zbc3;
}
var Lt;
function zz27() {
  return Lt || (Lt = 1, function (val) {
    const val2 = zz24();
    val.mul = function (val1, val3) {
      const uint8array = new Uint8Array(val1.length + val3.length - 1);
      // qrcode/Polynomial.mul(p1,p2)：coeff[i+j] ^= GF.mul(p1[i], p2[j])
      // num=i(外层)、zz28=j(内层)。反混淆曾把外层 num 塌陷成内层 zz28，
      // 使 genPoly[0] 算成 0；而 mod() 依赖 divisor[0]===1 消去首项才能推进，
      // 首项永不归零 → slice(0) 不缩短 → mod 无限循环（页面整个卡死）。
      for (let num = 0; num < val1.length; num++) for (let zz28 = 0; zz28 < val3.length; zz28++) uint8array[num + zz28] ^= val2.mul(val1[num], val3[zz28]);
      return uint8array;
    }, val.mod = function (val1, val3) {
      let uint8array = new Uint8Array(val1);
      for (; uint8array.length - val3.length >= 0;) {
        const val4 = uint8array[0];
        for (let zz29 = 0; zz29 < val3.length; zz29++) uint8array[zz29] ^= val2.mul(val3[zz29], val4);
        let num = 0;
        for (; num < uint8array.length && uint8array[num] === 0;) num++;
        uint8array = uint8array.slice(num);
      }
      return uint8array;
    }, val.generateECPolynomial = function (val1) {
      let uint8array = new Uint8Array([1]);
      for (let num = 0; num < val1; num++) uint8array = val.mul(uint8array, new Uint8Array([1, val2.exp(num)]));
      return uint8array;
    };
  }(nt)), nt;
}
var rt, Dt;
function zz30() {
  if (Dt) return rt;
  Dt = 1;
  const val = zz27();
  function zz31(val1) {
    this.genPoly = void 0, this.degree = val1, this.degree && this.initialize(this.degree);
  }
  return zz31.prototype.initialize = function (val1) {
    this.degree = val1, this.genPoly = val.generateECPolynomial(this.degree);
  }, zz31.prototype.encode = function (val1) {
    if (!this.genPoly) throw new Error("Encoder not initialized");
    const uint8array = new Uint8Array(val1.length + this.degree);
    uint8array.set(val1);
    const val2 = val.mod(uint8array, this.genPoly),
      val3 = this.degree - val2.length;
    if (val3 > 0) {
      const uint8array1 = new Uint8Array(this.degree);
      return uint8array1.set(val2, val3), uint8array1;
    }
    return val2;
  }, rt = zz31, rt;
}
var ot = {},
  it = {},
  ut = {},
  qt;
function zz32() {
  return qt || (qt = 1, ut.isValid = function (val) {
    return !isNaN(val) && val >= 1 && val <= 40;
  }), ut;
}
var local_zbc4 = {},
  vt;
function zz33() {
  if (vt) return local_zbc4;
  vt = 1;
  const text = "[0-9]+",
    text2 = "[A-Z $%*+\\-./:]+";
  let text3 = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  text3 = text3.replace(/u/g, "\\u");
  const val = "(?:(?![A-Z0-9 $%*+\\-./:]|" + text3 + `)(?:.|[\r
]))+`;
  local_zbc4.KANJI = new RegExp(text3, "g"), local_zbc4.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), local_zbc4.BYTE = new RegExp(val, "g"), local_zbc4.NUMERIC = new RegExp(text, "g"), local_zbc4.ALPHANUMERIC = new RegExp(text2, "g");
  const regexp = new RegExp("^" + text3 + "$"),
    regexp2 = new RegExp("^" + text + "$"),
    regexp3 = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return local_zbc4.testKanji = function (val1) {
    return regexp.test(val1);
  }, local_zbc4.testNumeric = function (val1) {
    return regexp2.test(val1);
  }, local_zbc4.testAlphanumeric = function (val1) {
    return regexp3.test(val1);
  }, local_zbc4;
}
var _t;
function zz34() {
  return _t || (_t = 1, function (val) {
    const val2 = zz32(),
      val3 = zz33();
    val.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, val.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, val.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, val.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, val.MIXED = {
      bit: -1
    }, val.getCharCountIndicator = function (val1, val4) {
      if (!val1.ccBits) throw new Error("Invalid mode: " + val1);
      if (!val2.isValid(val4)) throw new Error("Invalid version: " + val4);
      return val4 >= 1 && val4 < 10 ? val1.ccBits[0] : val4 < 27 ? val1.ccBits[1] : val1.ccBits[2];
    }, val.getBestModeForData = function (val1) {
      return val3.testNumeric(val1) ? val.NUMERIC : val3.testAlphanumeric(val1) ? val.ALPHANUMERIC : val3.testKanji(val1) ? val.KANJI : val.BYTE;
    }, val.toString = function (val1) {
      if (val1 && val1.id) return val1.id;
      throw new Error("Invalid mode");
    }, val.isValid = function (val1) {
      return val1 && val1.bit && val1.ccBits;
    };
    function zz35(val1) {
      if (typeof val1 != "string") throw new Error("Param is not a string");
      switch (val1.toLowerCase()) {
        case "numeric":
          return val.NUMERIC;
        case "alphanumeric":
          return val.ALPHANUMERIC;
        case "kanji":
          return val.KANJI;
        case "byte":
          return val.BYTE;
        default:
          throw new Error("Unknown mode: " + val1);
      }
    }
    val.from = function (val1, val4) {
      if (val.isValid(val1)) return val1;
      try {
        return zz35(val1);
      } catch {
        return val4;
      }
    };
  }(it)), it;
}
var Ut;
function zz36() {
  return Ut || (Ut = 1, function (val) {
    const val2 = zz2(),
      val3 = zz23(),
      val4 = zz3(),
      val5 = zz34(),
      val6 = zz32(),
      num = 7973,
      bCHDigit = val2.getBCHDigit(num);
    function zz37(val1, val8, val9) {
      for (let zz38 = 1; zz38 <= 40; zz38++) if (val8 <= val.getCapacity(zz38, val9, val1)) return zz38;
    }
    function zz39(val1, val8) {
      return val5.getCharCountIndicator(val1, val8) + 4;
    }
    function zz40(val1, val8) {
      let num1 = 0;
      return val1.forEach(function (val9) {
        const val10 = zz39(val9.mode, val8);
        num1 += val10 + val9.getBitsLength();
      }), num1;
    }
    function zz41(val1, val8) {
      for (let zz42 = 1; zz42 <= 40; zz42++) if (zz40(val1, zz42) <= val.getCapacity(zz42, val8, val5.MIXED)) return zz42;
    }
    val.from = function (val1, val8) {
      return val6.isValid(val1) ? parseInt(val1, 10) : val8;
    }, val.getCapacity = function (val1, val8, val9) {
      if (!val6.isValid(val1)) throw new Error("Invalid QR Code version");
      typeof val9 > "u" && (val9 = val5.BYTE);
      const symbolTotalCodewords = val2.getSymbolTotalCodewords(val1),
        totalCodewordsCount = val3.getTotalCodewordsCount(val1, val8),
        val12 = (symbolTotalCodewords - totalCodewordsCount) * 8;
      if (val9 === val5.MIXED) return val12;
      const val13 = val12 - zz39(val9, val1);
      switch (val9) {
        case val5.NUMERIC:
          return Math.floor(val13 / 10 * 3);
        case val5.ALPHANUMERIC:
          return Math.floor(val13 / 11 * 2);
        case val5.KANJI:
          return Math.floor(val13 / 13);
        case val5.BYTE:
        default:
          return Math.floor(val13 / 8);
      }
    }, val.getBestVersionForData = function (val1, val8) {
      let val9;
      const val10 = val4.from(val8, val4.M);
      if (Array.isArray(val1)) {
        if (val1.length > 1) return zz41(val1, val10);
        if (val1.length === 0) return 1;
        val9 = val1[0];
      } else val9 = val1;
      return zz37(val9.mode, val9.getLength(), val10);
    }, val.getEncodedBits = function (val1) {
      if (!val6.isValid(val1) || val1 < 7) throw new Error("Invalid QR Code version");
      let val8 = val1 << 12;
      for (; val2.getBCHDigit(val8) - bCHDigit >= 0;) val8 ^= num << val2.getBCHDigit(val8) - bCHDigit;
      return val1 << 12 | val8;
    };
  }(ot)), ot;
}
var st = {},
  Ft;
function zz43() {
  if (Ft) return st;
  Ft = 1;
  const val = zz2(),
    num = 1335,
    num2 = 21522,
    bCHDigit = val.getBCHDigit(num);
  return st.getEncodedBits = function (val1, val3) {
    const val4 = val1.bit << 3 | val3;
    let val5 = val4 << 10;
    for (; val.getBCHDigit(val5) - bCHDigit >= 0;) val5 ^= num << val.getBCHDigit(val5) - bCHDigit;
    return (val4 << 10 | val5) ^ num2;
  }, st;
}
var at = {},
  ct,
  kt;
function zz44() {
  if (kt) return ct;
  kt = 1;
  const val = zz34();
  function zz45(val1) {
    this.mode = val.NUMERIC, this.data = val1.toString();
  }
  return zz45.getBitsLength = function (val1) {
    return 10 * Math.floor(val1 / 3) + (val1 % 3 ? val1 % 3 * 3 + 1 : 0);
  }, zz45.prototype.getLength = function () {
    return this.data.length;
  }, zz45.prototype.getBitsLength = function () {
    return zz45.getBitsLength(this.data.length);
  }, zz45.prototype.write = function (val1) {
    let val2, val3, val4;
    for (val2 = 0; val2 + 3 <= this.data.length; val2 += 3) val3 = this.data.substr(val2, 3), val4 = parseInt(val3, 10), val1.put(val4, 10);
    const val5 = this.data.length - val2;
    val5 > 0 && (val3 = this.data.substr(val2), val4 = parseInt(val3, 10), val1.put(val4, val5 * 3 + 1));
  }, ct = zz45, ct;
}
var lt, zt;
function zz46() {
  if (zt) return lt;
  zt = 1;
  const val = zz34(),
    list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
  function zz47(val1) {
    this.mode = val.ALPHANUMERIC, this.data = val1;
  }
  return zz47.getBitsLength = function (val1) {
    return 11 * Math.floor(val1 / 2) + 6 * (val1 % 2);
  }, zz47.prototype.getLength = function () {
    return this.data.length;
  }, zz47.prototype.getBitsLength = function () {
    return zz47.getBitsLength(this.data.length);
  }, zz47.prototype.write = function (val1) {
    let val2;
    for (val2 = 0; val2 + 2 <= this.data.length; val2 += 2) {
      let val3 = list.indexOf(this.data[val2]) * 45;
      val3 += list.indexOf(this.data[val2 + 1]), val1.put(val3, 11);
    }
    this.data.length % 2 && val1.put(list.indexOf(this.data[val2]), 6);
  }, lt = zz47, lt;
}
var ft, Vt;
function zz48() {
  if (Vt) return ft;
  Vt = 1;
  const val = zz34();
  function zz49(val1) {
    this.mode = val.BYTE, typeof val1 == "string" ? this.data = new TextEncoder().encode(val1) : this.data = new Uint8Array(val1);
  }
  return zz49.getBitsLength = function (val1) {
    return val1 * 8;
  }, zz49.prototype.getLength = function () {
    return this.data.length;
  }, zz49.prototype.getBitsLength = function () {
    return zz49.getBitsLength(this.data.length);
  }, zz49.prototype.write = function (val1) {
    for (let num = 0, zz50 = this.data.length; num < zz50; num++) val1.put(this.data[num], 8);
  }, ft = zz49, ft;
}
var dt, Kt;
function zz51() {
  if (Kt) return dt;
  Kt = 1;
  const val = zz34(),
    val2 = zz2();
  function zz52(val1) {
    this.mode = val.KANJI, this.data = val1;
  }
  return zz52.getBitsLength = function (val1) {
    return val1 * 13;
  }, zz52.prototype.getLength = function () {
    return this.data.length;
  }, zz52.prototype.getBitsLength = function () {
    return zz52.getBitsLength(this.data.length);
  }, zz52.prototype.write = function (val1) {
    let val3;
    for (val3 = 0; val3 < this.data.length; val3++) {
      let val4 = val2.toSJIS(this.data[val3]);
      if (val4 >= 33088 && val4 <= 40956) val4 -= 33088;else if (val4 >= 57408 && val4 <= 60351) val4 -= 49472;else throw new Error("Invalid SJIS character: " + this.data[val3] + `
Make sure your charset is UTF-8`);
      val4 = (val4 >>> 8 & 255) * 192 + (val4 & 255), val1.put(val4, 13);
    }
  }, dt = zz52, dt;
}
var gt = {
    exports: {}
  },
  Ht;
function zz53() {
  return Ht || (Ht = 1, function (val) {
    var obj = {
      single_source_shortest_paths: function (val1, val2, val3) {
        var obj1 = {},
          obj2 = {};
        obj2[val2] = 0;
        var val4 = obj.PriorityQueue.make();
        val4.push(val2, 0);
        for (var zz54, zz55, zz56, zz57, zz58, zz59, zz60, zz61, zz62; !val4.empty();) {
          zz54 = val4.pop(), zz55 = zz54.value, zz57 = zz54.cost, zz58 = val1[zz55] || {};
          for (zz56 in zz58) zz58.hasOwnProperty(zz56) && (zz59 = zz58[zz56], zz60 = zz57 + zz59, zz61 = obj2[zz56], zz62 = typeof obj2[zz56] > "u", (zz62 || zz61 > zz60) && (obj2[zz56] = zz60, val4.push(zz56, zz60), obj1[zz56] = zz55));
        }
        if (typeof val3 < "u" && typeof obj2[val3] > "u") {
          var zz63 = ["Could not find a path from ", val2, " to ", val3, "."].join("");
          throw new Error(zz63);
        }
        return obj1;
      },
      extract_shortest_path_from_predecessor_list: function (val1, val2) {
        for (var zz64 = [], zz65 = val2; zz65;) zz64.push(zz65), val1[zz65], zz65 = val1[zz65];
        return zz64.reverse(), zz64;
      },
      find_path: function (val1, val2, val3) {
        var val4 = obj.single_source_shortest_paths(val1, val2, val3);
        return obj.extract_shortest_path_from_predecessor_list(val4, val3);
      },
      PriorityQueue: {
        make: function (val1) {
          var val2 = obj.PriorityQueue,
            obj1 = {},
            val3;
          val1 = val1 || {};
          for (val3 in val2) val2.hasOwnProperty(val3) && (obj1[val3] = val2[val3]);
          return obj1.queue = [], obj1.sorter = val1.sorter || val2.default_sorter, obj1;
        },
        default_sorter: function (val1, val2) {
          return val1.cost - val2.cost;
        },
        push: function (val1, val2) {
          var obj1 = {
            value: val1,
            cost: val2
          };
          this.queue.push(obj1), this.queue.sort(this.sorter);
        },
        pop: function () {
          return this.queue.shift();
        },
        empty: function () {
          return this.queue.length === 0;
        }
      }
    };
    val.exports = obj;
  }(gt)), gt.exports;
}
var Jt;
function zz66() {
  return Jt || (Jt = 1, function (val) {
    const val2 = zz34(),
      val3 = zz44(),
      val4 = zz46(),
      val5 = zz48(),
      val6 = zz51(),
      val7 = zz33(),
      val8 = zz2(),
      val9 = zz53();
    function zz67(val1) {
      return unescape(encodeURIComponent(val1)).length;
    }
    function zz68(val1, val10, val11) {
      const list = [];
      let val12;
      for (; (val12 = val1.exec(val11)) !== null;) list.push({
        data: val12[0],
        index: val12.index,
        mode: val10,
        length: val12[0].length
      });
      return list;
    }
    function zz69(val1) {
      const val10 = zz68(val7.NUMERIC, val2.NUMERIC, val1),
        val11 = zz68(val7.ALPHANUMERIC, val2.ALPHANUMERIC, val1);
      let val12, val13;
      return val8.isKanjiModeEnabled() ? (val12 = zz68(val7.BYTE, val2.BYTE, val1), val13 = zz68(val7.KANJI, val2.KANJI, val1)) : (val12 = zz68(val7.BYTE_KANJI, val2.BYTE, val1), val13 = []), val10.concat(val11, val12, val13).sort(function (val14, val15) {
        return val14.index - val15.index;
      }).map(function (val14) {
        return {
          data: val14.data,
          mode: val14.mode,
          length: val14.length
        };
      });
    }
    function zz70(val1, val10) {
      switch (val10) {
        case val2.NUMERIC:
          return val3.getBitsLength(val1);
        case val2.ALPHANUMERIC:
          return val4.getBitsLength(val1);
        case val2.KANJI:
          return val6.getBitsLength(val1);
        case val2.BYTE:
          return val5.getBitsLength(val1);
      }
    }
    function zz71(val1) {
      return val1.reduce(function (val10, val11) {
        const val12 = val10.length - 1 >= 0 ? val10[val10.length - 1] : null;
        return val12 && val12.mode === val11.mode ? (val10[val10.length - 1].data += val11.data, val10) : (val10.push(val11), val10);
      }, []);
    }
    function zz72(val1) {
      const list = [];
      for (let num = 0; num < val1.length; num++) {
        const val10 = val1[num];
        switch (val10.mode) {
          case val2.NUMERIC:
            list.push([val10, {
              data: val10.data,
              mode: val2.ALPHANUMERIC,
              length: val10.length
            }, {
              data: val10.data,
              mode: val2.BYTE,
              length: val10.length
            }]);
            break;
          case val2.ALPHANUMERIC:
            list.push([val10, {
              data: val10.data,
              mode: val2.BYTE,
              length: val10.length
            }]);
            break;
          case val2.KANJI:
            list.push([val10, {
              data: val10.data,
              mode: val2.BYTE,
              length: zz67(val10.data)
            }]);
            break;
          case val2.BYTE:
            list.push([{
              data: val10.data,
              mode: val2.BYTE,
              length: zz67(val10.data)
            }]);
        }
      }
      return list;
    }
    function zz73(val1, val10) {
      const obj = {},
        obj2 = {
          start: {}
        };
      let list = ["start"];
      for (let num = 0; num < val1.length; num++) {
        const val11 = val1[num],
          list1 = [];
        for (let zz74 = 0; zz74 < val11.length; zz74++) {
          const val12 = val11[zz74],
            // qrcode/buildGraph：节点 key = '' + i + j（num=外层分组下标、zz74=组内下标）。
            // 反混淆曾把外层 num 塌陷成 zz74，导致不同分组共用同一 key 互相覆盖，
            // 最短路径只剩最后一组节点 → 多段文本（如含大小写+数字的 URL）只编码最后一段。
            val13 = "" + num + zz74;
          list1.push(val13), obj[val13] = {
            node: val12,
            lastCount: 0
          }, obj2[val13] = {};
          for (let zz75 = 0; zz75 < list.length; zz75++) {
            const val14 = list[zz75];
            obj[val14] && obj[val14].node.mode === val12.mode ? (obj2[val14][val13] = zz70(obj[val14].lastCount + val12.length, val12.mode) - zz70(obj[val14].lastCount, val12.mode), obj[val14].lastCount += val12.length) : (obj[val14] && (obj[val14].lastCount = val12.length), obj2[val14][val13] = zz70(val12.length, val12.mode) + 4 + val2.getCharCountIndicator(val12.mode, val10));
          }
        }
        list = list1;
      }
      for (let num = 0; num < list.length; num++) obj2[list[num]].end = 0;
      return {
        map: obj2,
        table: obj
      };
    }
    function zz76(val1, val10) {
      let val11;
      const bestModeForData = val2.getBestModeForData(val1);
      if (val11 = val2.from(val10, bestModeForData), val11 !== val2.BYTE && val11.bit < bestModeForData.bit) throw new Error('"' + val1 + '" cannot be encoded with mode ' + val2.toString(val11) + `.
 Suggested mode is: ` + val2.toString(bestModeForData));
      switch (val11 === val2.KANJI && !val8.isKanjiModeEnabled() && (val11 = val2.BYTE), val11) {
        case val2.NUMERIC:
          return new val3(val1);
        case val2.ALPHANUMERIC:
          return new val4(val1);
        case val2.KANJI:
          return new val6(val1);
        case val2.BYTE:
          return new val5(val1);
      }
    }
    val.fromArray = function (val1) {
      return val1.reduce(function (val10, val11) {
        return typeof val11 == "string" ? val10.push(zz76(val11, null)) : val11.data && val10.push(zz76(val11.data, val11.mode)), val10;
      }, []);
    }, val.fromString = function (val1, val10) {
      const val11 = zz69(val1, val8.isKanjiModeEnabled()),
        val12 = zz72(val11),
        val13 = zz73(val12, val10),
        val14 = val9.find_path(val13.map, "start", "end"),
        list = [];
      for (let num = 1; num < val14.length - 1; num++) list.push(val13.table[val14[num]].node);
      return val.fromArray(zz71(list));
    }, val.rawSplit = function (val1) {
      return val.fromArray(zz69(val1, val8.isKanjiModeEnabled()));
    };
  }(at)), at;
}
var Ot;
function zz77() {
  if (Ot) return browserConfig_2;
  Ot = 1;
  const val = zz2(),
    val2 = zz3(),
    val3 = zz5(),
    val4 = zz7(),
    val5 = zz9(),
    val6 = zz11(),
    val7 = zz12(),
    val8 = zz23(),
    val9 = zz30(),
    val10 = zz36(),
    val11 = zz43(),
    val12 = zz34(),
    val13 = zz66();
  function zz78(val1, val14) {
    const val15 = val1.size,
      positions = val6.getPositions(val14);
    for (let num = 0; num < positions.length; num++) {
      const val17 = positions[num][0],
        val18 = positions[num][1];
      // qrcode/setupFinderPattern：zz79=r、zz80=c（-1..7，含 1 圈分隔符）、val17=row、val18=col。
      // 深色条件 = 竖边(r在0..6且c是0或6) || 横边(c在0..6且r是0或6) || 中心3x3(r,c 都在2..4)。
      // 反混淆曾把外层 r 整个塌陷成内层 c，留下 `A || A` 的重复子式（定位图形全画错）。
      for (let zz79 = -1; zz79 <= 7; zz79++) if (!(val17 + zz79 <= -1 || val15 <= val17 + zz79)) for (let zz80 = -1; zz80 <= 7; zz80++) val18 + zz80 <= -1 || val15 <= val18 + zz80 || (zz79 >= 0 && zz79 <= 6 && (zz80 === 0 || zz80 === 6) || zz80 >= 0 && zz80 <= 6 && (zz79 === 0 || zz79 === 6) || zz79 >= 2 && zz79 <= 4 && zz80 >= 2 && zz80 <= 4 ? val1.set(val17 + zz79, val18 + zz80, !0, !0) : val1.set(val17 + zz79, val18 + zz80, !1, !0));
    }
  }
  function zz81(val1) {
    const val14 = val1.size;
    for (let num = 8; num < val14 - 8; num++) {
      const val15 = num % 2 === 0;
      val1.set(num, 6, val15, !0), val1.set(6, num, val15, !0);
    }
  }
  function zz82(val1, val14) {
    const positions = val5.getPositions(val14);
    for (let num = 0; num < positions.length; num++) {
      const val16 = positions[num][0],
        val17 = positions[num][1];
      // qrcode/setupAlignmentPattern：zz83=r、zz84=c（-2..2 的 5x5 图形，边框与中心点为深色）。
      for (let zz83 = -2; zz83 <= 2; zz83++) for (let zz84 = -2; zz84 <= 2; zz84++) zz83 === -2 || zz83 === 2 || zz84 === -2 || zz84 === 2 || zz83 === 0 && zz84 === 0 ? val1.set(val16 + zz83, val17 + zz84, !0, !0) : val1.set(val16 + zz83, val17 + zz84, !1, !0);
    }
  }
  function zz85(val1, val14) {
    const val15 = val1.size,
      encodedBits = val10.getEncodedBits(val14);
    let val17, val18, val19;
    for (let num = 0; num < 18; num++) val17 = Math.floor(num / 3), val18 = num % 3 + val15 - 8 - 3, val19 = (encodedBits >> num & 1) === 1, val1.set(val17, val18, val19, !0), val1.set(val18, val17, val19, !0);
  }
  function zz86(val1, val14, val15) {
    const val16 = val1.size,
      encodedBits = val11.getEncodedBits(val14, val15);
    let val18, val19;
    for (val18 = 0; val18 < 15; val18++) val19 = (encodedBits >> val18 & 1) === 1, val18 < 6 ? val1.set(val18, 8, val19, !0) : val18 < 8 ? val1.set(val18 + 1, 8, val19, !0) : val1.set(val16 - 15 + val18, 8, val19, !0), val18 < 8 ? val1.set(8, val16 - val18 - 1, val19, !0) : val18 < 9 ? val1.set(8, 15 - val18 - 1 + 1, val19, !0) : val1.set(8, 15 - val18 - 1, val19, !0);
    val1.set(val16 - 8, 8, 1, !0);
  }
  function zz87(val1, val14) {
    const val15 = val1.size;
    let val16 = -1,
      val17 = val15 - 1,
      num = 7,
      num2 = 0;
    for (let zz88 = val15 - 1; zz88 > 0; zz88 -= 2) for (zz88 === 6 && zz88--;;) {
      for (let zz89 = 0; zz89 < 2; zz89++) if (!val1.isReserved(val17, zz88 - zz89)) {
        let val18 = !1;
        // qrcode/setupData：num=bitIndex、num2=byteIndex、zz89=c(0..1)、val17=row、zz88=col。
        // 反混淆曾把 bitIndex 塌陷成内层循环变量 zz89，导致 zz89-- 与 zz89=7 直接改写
        // 循环计数器：zz89 在 0↔1 间无限震荡，内层 for 永不退出 → 整个页面卡死。
        num2 < val14.length && (val18 = (val14[num2] >>> num & 1) === 1), val1.set(val17, zz88 - zz89, val18), num--, num === -1 && (num2++, num = 7);
      }
      if (val17 += val16, val17 < 0 || val15 <= val17) {
        val17 -= val16, val16 = -val16;
        break;
      }
    }
  }
  function zz90(val1, val14, val15) {
    const val31 = new val3();
    val15.forEach(function (val20) {
      val31.put(val20.mode.bit, 4), val31.put(val20.getLength(), val12.getCharCountIndicator(val20.mode, val1)), val20.write(val31);
    });
    const symbolTotalCodewords = val.getSymbolTotalCodewords(val1),
      totalCodewordsCount = val8.getTotalCodewordsCount(val1, val14),
      val18 = (symbolTotalCodewords - totalCodewordsCount) * 8;
    for (val31.getLengthInBits() + 4 <= val18 && val31.put(0, 4); val31.getLengthInBits() % 8 !== 0;) val31.putBit(0);
    const val19 = (val18 - val31.getLengthInBits()) / 8;
    for (let num = 0; num < val19; num++) val31.put(num % 2 ? 17 : 236, 8);
    return zz91(val31, val1, val14);
  }
  function zz91(val1, val14, val15) {
    const symbolTotalCodewords = val.getSymbolTotalCodewords(val14),
      totalCodewordsCount = val8.getTotalCodewordsCount(val14, val15),
      val18 = symbolTotalCodewords - totalCodewordsCount,
      blocksCount = val8.getBlocksCount(val14, val15),
      val20 = symbolTotalCodewords % blocksCount,
      val21 = blocksCount - val20,
      val22 = Math.floor(symbolTotalCodewords / blocksCount),
      val23 = Math.floor(val18 / blocksCount),
      val24 = val23 + 1,
      val25 = val22 - val23,
      val91 = new val9(val25);
    let num = 0;
    const array = new Array(blocksCount),
      array2 = new Array(blocksCount);
    let num2 = 0;
    const uint8array = new Uint8Array(val1.buffer);
    for (let zz92 = 0; zz92 < blocksCount; zz92++) {
      const val28 = zz92 < val21 ? val23 : val24;
      array[zz92] = uint8array.slice(num, num + val28), array2[zz92] = val91.encode(array[zz92]), num += val28, num2 = Math.max(num2, val28);
    }
    const uint8array2 = new Uint8Array(symbolTotalCodewords);
    let num3 = 0,
      val26,
      val27;
    for (val26 = 0; val26 < num2; val26++) for (val27 = 0; val27 < blocksCount; val27++) val26 < array[val27].length && (uint8array2[num3++] = array[val27][val26]);
    for (val26 = 0; val26 < val25; val26++) for (val27 = 0; val27 < blocksCount; val27++) uint8array2[num3++] = array2[val27][val26];
    return uint8array2;
  }
  function zz93(val1, val14, val15, val16) {
    let val17;
    if (Array.isArray(val1)) val17 = val13.fromArray(val1);else if (typeof val1 == "string") {
      let val21 = val14;
      if (!val21) {
        const val22 = val13.rawSplit(val1);
        val21 = val10.getBestVersionForData(val22, val15);
      }
      val17 = val13.fromString(val1, val21 || 40);
    } else throw new Error("Invalid data");
    const bestVersionForData = val10.getBestVersionForData(val17, val15);
    if (!bestVersionForData) throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!val14) val14 = bestVersionForData;else if (val14 < bestVersionForData) throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + bestVersionForData + `.
`);
    const val19 = zz90(val14, val15, val17),
      symbolSize = val.getSymbolSize(val14),
      val41 = new val4(symbolSize);
    return zz78(val41, val14), zz81(val41), zz82(val41, val14), zz86(val41, val15, 0), val14 >= 7 && zz85(val41, val14), zz87(val41, val19), isNaN(val16) && (val16 = val7.getBestMask(val41, zz86.bind(null, val41, val15))), val7.applyMask(val16, val41), zz86(val41, val15, val16), {
      modules: val41,
      version: val14,
      errorCorrectionLevel: val15,
      maskPattern: val16,
      segments: val17
    };
  }
  return browserConfig_2.create = function (val1, val14) {
    if (typeof val1 > "u" || val1 === "") throw new Error("No input text");
    let val15 = val2.M,
      val16,
      val17;
    return typeof val14 < "u" && (val15 = val2.from(val14.errorCorrectionLevel, val2.M), val16 = val10.from(val14.version), val17 = val7.from(val14.maskPattern), val14.toSJISFunc && val.setToSJISFunction(val14.toSJISFunc)), zz93(val1, val16, val15, val17);
  }, browserConfig_2;
}
var ht = {},
  mt = {},
  jt;
function zz94() {
  return jt || (jt = 1, function (val) {
    function zz95(val1) {
      if (typeof val1 == "number" && (val1 = val1.toString()), typeof val1 != "string") throw new Error("Color should be defined as hex string");
      let val2 = val1.slice().replace("#", "").split("");
      if (val2.length < 3 || val2.length === 5 || val2.length > 8) throw new Error("Invalid hex color: " + val1);
      (val2.length === 3 || val2.length === 4) && (val2 = Array.prototype.concat.apply([], val2.map(function (val4) {
        return [val4, val4];
      }))), val2.length === 6 && val2.push("F", "F");
      const int = parseInt(val2.join(""), 16);
      return {
        r: int >> 24 & 255,
        g: int >> 16 & 255,
        b: int >> 8 & 255,
        a: int & 255,
        hex: "#" + val2.slice(0, 6).join("")
      };
    }
    val.getOptions = function (val1) {
      val1 || (val1 = {}), val1.color || (val1.color = {});
      const val2 = typeof val1.margin > "u" || val1.margin === null || val1.margin < 0 ? 4 : val1.margin,
        val3 = val1.width && val1.width >= 21 ? val1.width : void 0,
        val4 = val1.scale || 4;
      return {
        width: val3,
        scale: val3 ? 4 : val4,
        margin: val2,
        color: {
          dark: zz95(val1.color.dark || "#000000ff"),
          light: zz95(val1.color.light || "#ffffffff")
        },
        type: val1.type,
        rendererOpts: val1.rendererOpts || {}
      };
    }, val.getScale = function (val1, val2) {
      return val2.width && val2.width >= val1 + val2.margin * 2 ? val2.width / (val1 + val2.margin * 2) : val2.scale;
    }, val.getImageWidth = function (val1, val2) {
      const scale = val.getScale(val1, val2);
      return Math.floor((val1 + val2.margin * 2) * scale);
    }, val.qrToImageData = function (val1, val2, val3) {
      const val4 = val2.modules.size,
        val5 = val2.modules.data,
        scale = val.getScale(val4, val3),
        val7 = Math.floor((val4 + val3.margin * 2) * scale),
        val8 = val3.margin * scale,
        list = [val3.color.light, val3.color.dark];
      // qrcode/qrToImageData：num=i(行)、zz96=j(列)、val9=posDst、val11=iSrc、val12=jSrc。
      // 反混淆曾把行 i 整个塌陷成列 j：像素只会画出一条对角线。
      for (let num = 0; num < val7; num++) for (let zz96 = 0; zz96 < val7; zz96++) {
        let val9 = (num * val7 + zz96) * 4,
          val10 = val3.color.light;
        if (num >= val8 && zz96 >= val8 && num < val7 - val8 && zz96 < val7 - val8) {
          const val11 = Math.floor((num - val8) / scale),
            val12 = Math.floor((zz96 - val8) / scale);
          val10 = list[val5[val11 * val4 + val12] ? 1 : 0];
        }
        val1[val9++] = val10.r, val1[val9++] = val10.g, val1[val9++] = val10.b, val1[val9] = val10.a;
      }
    };
  }(mt)), mt;
}
var Yt;
function zz97() {
  return Yt || (Yt = 1, function (val) {
    const val2 = zz94();
    function zz98(val1, val3, val4) {
      val1.clearRect(0, 0, val3.width, val3.height), val3.style || (val3.style = {}), val3.height = val4, val3.width = val4, val3.style.height = val4 + "px", val3.style.width = val4 + "px";
    }
    function zz99() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    val.render = function (val1, val3, val4) {
      let val5 = val4,
        val6 = val3;
      typeof val5 > "u" && (!val3 || !val3.getContext) && (val5 = val3, val3 = void 0), val3 || (val6 = zz99()), val5 = val2.getOptions(val5);
      const imageWidth = val2.getImageWidth(val1.modules.size, val5),
        context = val6.getContext("2d"),
        imageData = context.createImageData(imageWidth, imageWidth);
      return val2.qrToImageData(imageData.data, val1, val5), zz98(context, val6, imageWidth), context.putImageData(imageData, 0, 0), val6;
    }, val.renderToDataURL = function (val1, val3, val4) {
      let val5 = val4;
      typeof val5 > "u" && (!val3 || !val3.getContext) && (val5 = val3, val3 = void 0), val5 || (val5 = {});
      const val6 = val.render(val1, val3, val5),
        val7 = val5.type || "image/png",
        val8 = val5.rendererOpts || {};
      return val6.toDataURL(val7, val8.quality);
    };
  }(ht)), ht;
}
var wt = {},
  Gt;
function zz100() {
  if (Gt) return wt;
  Gt = 1;
  const val = zz94();
  function zz101(val1, val2) {
    const val3 = val1.a / 255,
      val4 = val2 + '="' + val1.hex + '"';
    return val3 < 1 ? val4 + " " + val2 + '-opacity="' + val3.toFixed(2).slice(1) + '"' : val4;
  }
  function zz102(val1, val2, val3) {
    let val4 = val1 + val2;
    return typeof val3 < "u" && (val4 += " " + val3), val4;
  }
  function zz103(val1, val2, val3) {
    let text = "",
      num = 0,
      val4 = !1,
      num2 = 0;
    for (let zz104 = 0; zz104 < val1.length; zz104++) {
      const val5 = Math.floor(zz104 % val2),
        val6 = Math.floor(zz104 / val2);
      // qrcode/qrToPath：num=moveBy、num2=lineLength、val4=newRow、zz104=i(循环下标)。
      // 反混淆曾把 moveBy 塌陷成 zz104，其中 `zz104 = 0` 会把循环下标清零 → SVG 渲染无限循环。
      !val5 && !val4 && (val4 = !0), val1[zz104] ? (num2++, zz104 > 0 && val5 > 0 && val1[zz104 - 1] || (text += val4 ? zz102("M", val5 + val3, .5 + val6 + val3) : zz102("m", num, 0), num = 0, val4 = !1), val5 + 1 < val2 && val1[zz104 + 1] || (text += zz102("h", num2), num2 = 0)) : num++;
    }
    return text;
  }
  return wt.render = function (val1, val2, val3) {
    const options = val.getOptions(val2),
      val5 = val1.modules.size,
      val6 = val1.modules.data,
      val7 = val5 + options.margin * 2,
      val8 = options.color.light.a ? "<path " + zz101(options.color.light, "fill") + ' d="M0 0h' + val7 + "v" + val7 + 'H0z"/>' : "",
      val9 = "<path " + zz101(options.color.dark, "stroke") + ' d="' + zz103(val6, val5, options.margin) + '"/>',
      val10 = 'viewBox="0 0 ' + val7 + " " + val7 + '"',
      val11 = '<svg xmlns="http://www.w3.org/2000/svg" ' + (options.width ? 'width="' + options.width + '" height="' + options.width + '" ' : "") + val10 + ' shape-rendering="crispEdges">' + val8 + val9 + `</svg>
`;
    return typeof val3 == "function" && val3(null, val11), val11;
  }, wt;
}
var Qt;
function zz105() {
  if (Qt) return browserConfig;
  Qt = 1;
  const val = zz1(),
    val2 = zz77(),
    val3 = zz97(),
    val4 = zz100();
  function zz106(val1, val5, val6, val7, val8) {
    const val9 = [].slice.call(arguments, 1),
      val10 = val9.length,
      val11 = typeof val9[val10 - 1] == "function";
    if (!val11 && !val()) throw new Error("Callback required as last argument");
    if (val11) {
      if (val10 < 2) throw new Error("Too few arguments provided");
      val10 === 2 ? (val8 = val6, val6 = val5, val5 = val7 = void 0) : val10 === 3 && (val5.getContext && typeof val8 > "u" ? (val8 = val7, val7 = void 0) : (val8 = val7, val7 = val6, val6 = val5, val5 = void 0));
    } else {
      if (val10 < 1) throw new Error("Too few arguments provided");
      return val10 === 1 ? (val6 = val5, val5 = val7 = void 0) : val10 === 2 && !val5.getContext && (val7 = val6, val6 = val5, val5 = void 0), new Promise(function (val12, val13) {
        try {
          const val14 = val2.create(val6, val7);
          val12(val1(val14, val5, val7));
        } catch (val14) {
          val13(val14);
        }
      });
    }
    try {
      const val12 = val2.create(val6, val7);
      val8(null, val1(val12, val5, val7));
    } catch (val12) {
      val8(val12);
    }
  }
  return browserConfig.create = val2.create, browserConfig.toCanvas = zz106.bind(null, val3.render), browserConfig.toDataURL = zz106.bind(null, val3.renderToDataURL), browserConfig.toString = zz106.bind(null, function (val1, val5, val6) {
    return val4.render(val1, val6);
  }), browserConfig;
}
var Te = zz105();
const mathHelper_zb5 = zz0(Te);
/* index 运行时导出（已语义化） */
export { mathHelper_zb5 };