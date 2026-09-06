/*!
 * 应用入口模块（index-DJrtCu9i.js）
 * 角色：Vue 3 运行时 + 应用启动 + 全局状态仓库（useUserStore）+ 路由/Toast 组合式函数
 *       + 编译后 SFC 渲染辅助（createElementBlock 等）+ 通用工具
 * 说明：本文件主要为框架级运行时（第三方打包产物），按已还原的语义名对其导出 API 作注释。
 * 来源：assets/index-DJrtCu9i.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
const __vite__mapDeps = (depIndexes, zz0 = __vite__mapDeps, zz1 = zz0.f || (zz0.f = ["assets/ScreenPage-D-8ErF3w.js","assets/useTallySocket-Bnuwbx53.js","assets/tally-DC36h0vE.js","assets/ScreenPage-DXdZRHQT.css","assets/TallyActivitiesPage-Ck1JhJya.js","assets/TallyActivitiesPage-Cm0F3HF2.css","assets/PageHeader-BWL8GUHB.js","assets/PageHeader-B_6p6X3N.css","assets/PageFooter-BK6at51a.js","assets/PageFooter-DRmqTZ73.css","assets/TallyActivityEditPage-DFD129SB.js","assets/TallyActivityEditPage-ZYDNOPki.css","assets/TallyControlPage-CBBTMqC8.js","assets/TallyControlPage-Dx3I3Pka.css","assets/PageBreadcrumb-BfFUydNi.js","assets/PageBreadcrumb-BZ4ELK69.css"])) => depIndexes.map(val1 => zz1[val1]);
(function () {
  const val = document.createElement("link").relList;
  if (val && val.supports && val.supports("modulepreload")) return;
  for (const zz2 of document.querySelectorAll('link[rel="modulepreload"]')) zz5(zz2);
  new MutationObserver(val1 => {
    for (const zz3 of val1) if (zz3.type === "childList") for (const val_tdz0 of zz3.addedNodes) val_tdz0.tagName === "LINK" && val_tdz0.rel === "modulepreload" && zz5(val_tdz0);
  }).observe(document, {
    childList: !0,
    subtree: !0
  });
  function zz4(val1) {
    const obj1 = {};
    return val1.integrity && (obj1.integrity = val1.integrity), val1.referrerPolicy && (obj1.referrerPolicy = val1.referrerPolicy), val1.crossOrigin === "use-credentials" ? obj1.credentials = "include" : val1.crossOrigin === "anonymous" ? obj1.credentials = "omit" : obj1.credentials = "same-origin", obj1;
  }
  function zz5(val1) {
    if (val1.ep) return;
    val1.ep = !0;
    const val2 = zz4(val1);
    fetch(val1.href, val2);
  }
})();
function zz6(val) {
  const val2 = Object.create(null);
  for (const val_tdz1 of val.split(",")) val2[val_tdz1] = 1;
  return val1 => val1 in val2;
}
const ke = {},
  Sn = [],
  Pt = () => {},
  Bl = () => !1,
  ir = val => val.charCodeAt(0) === 111 && val.charCodeAt(1) === 110 && (val.charCodeAt(2) > 122 || val.charCodeAt(2) < 97),
  Po = val => val.startsWith("onUpdate:"),
  Ve = Object.assign,
  Io = (val, val2) => {
    const val3 = val.indexOf(val2);
    val3 > -1 && val.splice(val3, 1);
  },
  cu = Object.prototype.hasOwnProperty,
  Se = (val, val2) => cu.call(val, val2),
  ce = Array.isArray,
  Rn = val => ms(val) === "[object Map]",
  Bn = val => ms(val) === "[object Set]",
  ci = val => ms(val) === "[object Date]",
  me = val => typeof val == "function",
  Le = val => typeof val == "string",
  vt = val => typeof val == "symbol",
  Te = val => val !== null && typeof val == "object",
  $l = val => (Te(val) || me(val)) && me(val.then) && me(val.catch),
  Fl = Object.prototype.toString,
  ms = val => Fl.call(val),
  uu = val => ms(val).slice(8, -1),
  Vl = val => ms(val) === "[object Object]",
  lr = val => Le(val) && val !== "NaN" && val[0] !== "-" && "" + parseInt(val, 10) === val,
  Qn = zz6(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  ar = val => {
    const val2 = Object.create(null);
    return val1 => val2[val1] || (val2[val1] = val(val1));
  },
  du = /-\w/g,
  mt = ar(val => val.replace(du, val1 => val1.slice(1).toUpperCase())),
  fu = /\B([A-Z])/g,
  sn = ar(val => val.replace(fu, "-$1").toLowerCase()),
  cr = ar(val => val.charAt(0).toUpperCase() + val.slice(1)),
  Mr = ar(val => val ? `on${cr(val)}` : ""),
  Zt = (val, val2) => !Object.is(val, val2),
  $s = (val, ...val2) => {
    for (let num = 0; num < val.length; num++) val[num](...val2);
  },
  Hl = (val, val2, val3, zz7 = !1) => {
    Object.defineProperty(val, val2, {
      configurable: !0,
      enumerable: !1,
      writable: zz7,
      value: val3
    });
  },
  ur = val => {
    const float = parseFloat(val);
    return isNaN(float) ? val : float;
  },
  pu = val => {
    const val2 = Le(val) ? Number(val) : NaN;
    return isNaN(val2) ? val : val2;
  };
let ui;
const dr = () => ui || (ui = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function zz8(val) {
  if (ce(val)) {
    const obj1 = {};
    for (let num = 0; num < val.length; num++) {
      const val1 = val[num],
        val2 = Le(val1) ? zz10(val1) : zz8(val1);
      if (val2) for (const zz9 in val2) obj1[zz9] = val2[zz9];
    }
    return obj1;
  } else if (Le(val) || Te(val)) return val;
}
const mu = /;(?![^(]*\))/g,
  hu = /:([^]+)/,
  gu = /\/\*[^]*?\*\//g;
function zz10(val) {
  const obj1 = {};
  return val.replace(gu, "").split(mu).forEach(val1 => {
    if (val1) {
      const val2 = val1.split(hu);
      val2.length > 1 && (obj1[val2[0].trim()] = val2[1].trim());
    }
  }), obj1;
}
function zz11(val) {
  let text = "";
  if (Le(val)) text = val;else if (ce(val)) for (let num = 0; num < val.length; num++) {
    const val1 = zz11(val[num]);
    val1 && (text += val1 + " ");
  } else if (Te(val)) for (const val_tdz2 in val) val[val_tdz2] && (text += val_tdz2 + " ");
  return text.trim();
}
const yu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  bu = zz6(yu);
function zz12(val) {
  return !!val || val === "";
}
function zz13(val, val2) {
  if (val.length !== val2.length) return !1;
  let val3 = !0;
  for (let num = 0; val3 && num < val.length; num++) val3 = zz14(val[num], val2[num]);
  return val3;
}
function zz14(val, val2) {
  if (val === val2) return !0;
  let val3 = ci(val),
    val4 = ci(val2);
  if (val3 || val4) return val3 && val4 ? val.getTime() === val2.getTime() : !1;
  if (val3 = vt(val), val4 = vt(val2), val3 || val4) return val === val2;
  if (val3 = ce(val), val4 = ce(val2), val3 || val4) return val3 && val4 ? zz13(val, val2) : !1;
  if (val3 = Te(val), val4 = Te(val2), val3 || val4) {
    if (!val3 || !val4) return !1;
    const val1 = Object.keys(val).length,
      val5 = Object.keys(val2).length;
    if (val1 !== val5) return !1;
    for (const val_tdz3 in val) {
      const val6 = val.hasOwnProperty(val_tdz3),
        val7 = val2.hasOwnProperty(val_tdz3);
      if (val6 && !val7 || !val6 && val7 || !zz14(val[val_tdz3], val2[val_tdz3])) return !1;
    }
  }
  return String(val) === String(val2);
}
function zz15(val, val2) {
  return val.findIndex(val1 => zz14(val1, val2));
}
const ql = val => !!(val && val.__v_isRef === !0),
  toDisplayString = val => Le(val) ? val : val == null ? "" : ce(val) || Te(val) && (val.toString === Fl || !me(val.toString)) ? ql(val) ? toDisplayString(val.value) : JSON.stringify(val, jl, 2) : String(val),
  jl = (val, val2) => ql(val2) ? jl(val, val2.value) : Rn(val2) ? {
    [`Map(${val2.size})`]: [...val2.entries()].reduce((val1, [zz16, zz17], val5) => (val1[Lr(zz16, val5) + " =>"] = zz17, val1), {})
  } : Bn(val2) ? {
    [`Set(${val2.size})`]: [...val2.values()].map(val1 => Lr(val1))
  } : vt(val2) ? Lr(val2) : Te(val2) && !ce(val2) && !Vl(val2) ? String(val2) : val2,
  Lr = (val, zz18 = "") => {
    var val3;
    return vt(val) ? `Symbol(${(val3 = val.description) != null ? val3 : zz18})` : val;
  };
let We;
class zz19 {
  constructor(zz20 = !1) {
    this.detached = zz20, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = We, !zz20 && We && (this.index = (We.scopes || (We.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let val, val2;
      if (this.scopes) for (val = 0, val2 = this.scopes.length; val < val2; val++) this.scopes[val].pause();
      for (val = 0, val2 = this.effects.length; val < val2; val++) this.effects[val].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let val, val2;
      if (this.scopes) for (val = 0, val2 = this.scopes.length; val < val2; val++) this.scopes[val].resume();
      for (val = 0, val2 = this.effects.length; val < val2; val++) this.effects[val].resume();
    }
  }
  run(val) {
    if (this._active) {
      const val1 = We;
      try {
        return We = this, val();
      } finally {
        We = val1;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = We, We = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (We = this.prevScope, this.prevScope = void 0);
  }
  stop(val) {
    if (this._active) {
      this._active = !1;
      let val1, val2;
      for (val1 = 0, val2 = this.effects.length; val1 < val2; val1++) this.effects[val1].stop();
      for (this.effects.length = 0, val1 = 0, val2 = this.cleanups.length; val1 < val2; val1++) this.cleanups[val1]();
      if (this.cleanups.length = 0, this.scopes) {
        for (val1 = 0, val2 = this.scopes.length; val1 < val2; val1++) this.scopes[val1].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !val) {
        const val3 = this.parent.scopes.pop();
        val3 && val3 !== this && (this.parent.scopes[this.index] = val3, val3.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function zz21(val) {
  return new zz19(val);
}
function zz22() {
  return We;
}
function zz23(val, zz24 = !1) {
  We && We.cleanups.push(val);
}
let Pe;
const Nr = new WeakSet();
class zz25 {
  constructor(val) {
    this.fn = val, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, We && We.active && We.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Nr.has(this) && (Nr.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || zz26(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, zz40(this), zz30(this);
    const val = Pe,
      val2 = gt;
    Pe = this, gt = !0;
    try {
      return this.fn();
    } finally {
      zz31(this), Pe = val, gt = val2, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let val = this.deps; val; val = val.nextDep) zz34(val);
      this.deps = this.depsTail = void 0, zz40(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Nr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    zz32(this) && this.run();
  }
  get dirty() {
    return zz32(this);
  }
}
let Ql = 0,
  Jn,
  Yn;
function zz26(val, zz27 = !1) {
  if (val.flags |= 8, zz27) {
    val.next = Yn, Yn = val;
    return;
  }
  val.next = Jn, Jn = val;
}
function zz28() {
  Ql++;
}
function zz29() {
  if (--Ql > 0) return;
  if (Yn) {
    let val1 = Yn;
    for (Yn = void 0; val1;) {
      const val2 = val1.next;
      val1.next = void 0, val1.flags &= -9, val1 = val2;
    }
  }
  let val;
  for (; Jn;) {
    let val1 = Jn;
    for (Jn = void 0; val1;) {
      const val2 = val1.next;
      if (val1.next = void 0, val1.flags &= -9, val1.flags & 1) try {
        val1.trigger();
      } catch (val3) {
        val || (val = val3);
      }
      val1 = val2;
    }
  }
  if (val) throw val;
}
function zz30(val) {
  for (let val_tdz4 = val.deps; val_tdz4; val_tdz4 = val_tdz4.nextDep) val_tdz4.version = -1, val_tdz4.prevActiveLink = val_tdz4.dep.activeLink, val_tdz4.dep.activeLink = val_tdz4;
}
function zz31(val) {
  let val2,
    val3 = val.depsTail,
    val4 = val3;
  for (; val4;) {
    const val1 = val4.prevDep;
    val4.version === -1 ? (val4 === val3 && (val3 = val1), zz34(val4), zz37(val4)) : val2 = val4, val4.dep.activeLink = val4.prevActiveLink, val4.prevActiveLink = void 0, val4 = val1;
  }
  val.deps = val2, val.depsTail = val3;
}
function zz32(val) {
  for (let val_tdz5 = val.deps; val_tdz5; val_tdz5 = val_tdz5.nextDep) if (val_tdz5.dep.version !== val_tdz5.version || val_tdz5.dep.computed && (zz33(val_tdz5.dep.computed) || val_tdz5.dep.version !== val_tdz5.version)) return !0;
  return !!val._dirty;
}
function zz33(val) {
  if (val.flags & 4 && !(val.flags & 16) || (val.flags &= -17, val.globalVersion === os) || (val.globalVersion = os, !val.isSSR && val.flags & 128 && (!val.deps && !val._dirty || !zz32(val)))) return;
  val.flags |= 2;
  const val2 = val.dep,
    val3 = Pe,
    val4 = gt;
  Pe = val, gt = !0;
  try {
    zz30(val);
    const val1 = val.fn(val._value);
    (val2.version === 0 || Zt(val1, val._value)) && (val.flags |= 128, val._value = val1, val2.version++);
  } catch (val1) {
    throw val2.version++, val1;
  } finally {
    Pe = val3, gt = val4, zz31(val), val.flags &= -3;
  }
}
function zz34(val, zz35 = !1) {
  const {
    dep: val3,
    prevSub: val4,
    nextSub: val5
  } = val;
  if (val4 && (val4.nextSub = val5, val.prevSub = void 0), val5 && (val5.prevSub = val4, val.nextSub = void 0), val3.subs === val && (val3.subs = val4, !val4 && val3.computed)) {
    val3.computed.flags &= -5;
    for (let zz36 = val3.computed.deps; zz36; zz36 = zz36.nextDep) zz34(zz36, !0);
  }
  !zz35 && ! --val3.sc && val3.map && val3.map.delete(val3.key);
}
function zz37(val) {
  const {
    prevDep: val2,
    nextDep: val3
  } = val;
  val2 && (val2.nextDep = val3, val.prevDep = void 0), val3 && (val3.prevDep = val2, val.nextDep = void 0);
}
let gt = !0;
const ea = [];
function zz38() {
  ea.push(gt), gt = !1;
}
function zz39() {
  const val = ea.pop();
  gt = val === void 0 ? !0 : val;
}
function zz40(val) {
  const {
    cleanup: val2
  } = val;
  if (val.cleanup = void 0, val2) {
    const val1 = Pe;
    Pe = void 0;
    try {
      val2();
    } finally {
      Pe = val1;
    }
  }
}
let os = 0;
class zz41 {
  constructor(val, val2) {
    this.sub = val, this.dep = val2, this.version = val2.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class zz42 {
  constructor(val) {
    this.computed = val, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(val) {
    if (!Pe || !gt || Pe === this.computed) return;
    let val2 = this.activeLink;
    if (val2 === void 0 || val2.sub !== Pe) val2 = this.activeLink = new zz41(Pe, this), Pe.deps ? (val2.prevDep = Pe.depsTail, Pe.depsTail.nextDep = val2, Pe.depsTail = val2) : Pe.deps = Pe.depsTail = val2, zz44(val2);else if (val2.version === -1 && (val2.version = this.version, val2.nextDep)) {
      const val1 = val2.nextDep;
      val1.prevDep = val2.prevDep, val2.prevDep && (val2.prevDep.nextDep = val1), val2.prevDep = Pe.depsTail, val2.nextDep = void 0, Pe.depsTail.nextDep = val2, Pe.depsTail = val2, Pe.deps === val2 && (Pe.deps = val1);
    }
    return val2;
  }
  trigger(val) {
    this.version++, os++, this.notify(val);
  }
  notify(val) {
    zz28();
    try {
      for (let zz43 = this.subs; zz43; zz43 = zz43.prevSub) zz43.sub.notify() && zz43.sub.dep.notify();
    } finally {
      zz29();
    }
  }
}
function zz44(val) {
  if (val.dep.sc++, val.sub.flags & 4) {
    const val1 = val.dep.computed;
    if (val1 && !val.dep.subs) {
      val1.flags |= 20;
      for (let zz45 = val1.deps; zz45; zz45 = zz45.nextDep) zz44(zz45);
    }
    const val2 = val.dep.subs;
    val2 !== val && (val.prevSub = val2, val2 && (val2.nextSub = val)), val.dep.subs = val;
  }
}
const Gs = new WeakMap(),
  fn = Symbol(""),
  io = Symbol(""),
  is = Symbol("");
function zz46(val, val2, val3) {
  if (gt && Pe) {
    let val1 = Gs.get(val);
    val1 || Gs.set(val, val1 = new Map());
    let val4 = val1.get(val3);
    val4 || (val1.set(val3, val4 = new zz42()), val4.map = val1, val4.key = val3), val4.track();
  }
}
function zz47(val, val2, val3, val4, val5, val6) {
  const val7 = Gs.get(val);
  if (!val7) {
    os++;
    return;
  }
  const fn1 = val1 => {
    val1 && val1.trigger();
  };
  if (zz28(), val2 === "clear") val7.forEach(fn1);else {
    const val1 = ce(val),
      val8 = val1 && lr(val3);
    if (val1 && val3 === "length") {
      const val9 = Number(val4);
      val7.forEach((val10, val11) => {
        (val11 === "length" || val11 === is || !vt(val11) && val11 >= val9) && fn1(val10);
      });
    } else switch ((val3 !== void 0 || val7.has(void 0)) && fn1(val7.get(val3)), val8 && fn1(val7.get(is)), val2) {
      case "add":
        val1 ? val8 && fn1(val7.get("length")) : (fn1(val7.get(fn)), Rn(val) && fn1(val7.get(io)));
        break;
      case "delete":
        val1 || (fn1(val7.get(fn)), Rn(val) && fn1(val7.get(io)));
        break;
      case "set":
        Rn(val) && fn1(val7.get(fn));
        break;
    }
  }
  zz29();
}
function zz48(val, val2) {
  const val3 = Gs.get(val);
  return val3 && val3.get(val2);
}
function zz49(val) {
  const val2 = zz80(val);
  return val2 === val ? val2 : (zz46(val2, "iterate", is), zz78(val) ? val2 : val2.map(yt));
}
function zz50(val) {
  return zz46(val = zz80(val), "iterate", is), val;
}
function zz51(val, val2) {
  return zz77(val) ? zz76(val) ? Pn(yt(val2)) : Pn(val2) : yt(val2);
}
const Au = {
  __proto__: null,
  [Symbol.iterator]() {
    return zz52(this, Symbol.iterator, val => zz51(this, val));
  },
  concat(...val) {
    return zz49(this).concat(...val.map(val1 => ce(val1) ? zz49(val1) : val1));
  },
  entries() {
    return zz52(this, "entries", val => (val[1] = zz51(this, val[1]), val));
  },
  every(val, val2) {
    return zz53(this, "every", val, val2, void 0, arguments);
  },
  filter(val, val2) {
    return zz53(this, "filter", val, val2, val1 => val1.map(val3 => zz51(this, val3)), arguments);
  },
  find(val, val2) {
    return zz53(this, "find", val, val2, val1 => zz51(this, val1), arguments);
  },
  findIndex(val, val2) {
    return zz53(this, "findIndex", val, val2, void 0, arguments);
  },
  findLast(val, val2) {
    return zz53(this, "findLast", val, val2, val1 => zz51(this, val1), arguments);
  },
  findLastIndex(val, val2) {
    return zz53(this, "findLastIndex", val, val2, void 0, arguments);
  },
  forEach(val, val2) {
    return zz53(this, "forEach", val, val2, void 0, arguments);
  },
  includes(...val) {
    return zz55(this, "includes", val);
  },
  indexOf(...val) {
    return zz55(this, "indexOf", val);
  },
  join(val) {
    return zz49(this).join(val);
  },
  lastIndexOf(...val) {
    return zz55(this, "lastIndexOf", val);
  },
  map(val, val2) {
    return zz53(this, "map", val, val2, void 0, arguments);
  },
  pop() {
    return zz56(this, "pop");
  },
  push(...val) {
    return zz56(this, "push", val);
  },
  reduce(val, ...val2) {
    return zz54(this, "reduce", val, val2);
  },
  reduceRight(val, ...val2) {
    return zz54(this, "reduceRight", val, val2);
  },
  shift() {
    return zz56(this, "shift");
  },
  some(val, val2) {
    return zz53(this, "some", val, val2, void 0, arguments);
  },
  splice(...val) {
    return zz56(this, "splice", val);
  },
  toReversed() {
    return zz49(this).toReversed();
  },
  toSorted(val) {
    return zz49(this).toSorted(val);
  },
  toSpliced(...val) {
    return zz49(this).toSpliced(...val);
  },
  unshift(...val) {
    return zz56(this, "unshift", val);
  },
  values() {
    return zz52(this, "values", val => zz51(this, val));
  }
};
function zz52(val, val2, val3) {
  const val4 = zz50(val),
    val5 = val4[val2]();
  return val4 !== val && !zz78(val) && (val5._next = val5.next, val5.next = () => {
    const val1 = val5._next();
    return val1.done || (val1.value = val3(val1.value)), val1;
  }), val5;
}
const Su = Array.prototype;
function zz53(val, val2, val3, val4, val5, val6) {
  const val7 = zz50(val),
    val8 = val7 !== val && !zz78(val),
    val9 = val7[val2];
  if (val9 !== Su[val2]) {
    const val1 = val9.apply(val, val6);
    return val8 ? yt(val1) : val1;
  }
  let val10 = val3;
  val7 !== val && (val8 ? val10 = function (val1, val12) {
    return val3.call(this, zz51(val, val1), val12, val);
  } : val3.length > 2 && (val10 = function (val1, val12) {
    return val3.call(this, val1, val12, val);
  }));
  const val11 = val9.call(val7, val10, val4);
  return val8 && val5 ? val5(val11) : val11;
}
function zz54(val, val2, val3, val4) {
  const val5 = zz50(val);
  let val6 = val3;
  return val5 !== val && (zz78(val) ? val3.length > 3 && (val6 = function (val1, val7, val8) {
    return val3.call(this, val1, val7, val8, val);
  }) : val6 = function (val1, val7, val8) {
    return val3.call(this, val1, zz51(val, val7), val8, val);
  }), val5[val2](val6, ...val4);
}
function zz55(val, val2, val3) {
  const val4 = zz80(val);
  zz46(val4, "iterate", is);
  const val5 = val4[val2](...val3);
  return (val5 === -1 || val5 === !1) && zz79(val3[0]) ? (val3[0] = zz80(val3[0]), val4[val2](...val3)) : val5;
}
function zz56(val, val2, zz57 = []) {
  zz38(), zz28();
  const val4 = zz80(val)[val2].apply(val, zz57);
  return zz29(), zz39(), val4;
}
const Ru = zz6("__proto__,__v_isRef,__isVue"),
  na = new Set(Object.getOwnPropertyNames(Symbol).filter(val => val !== "arguments" && val !== "caller").map(val => Symbol[val]).filter(vt));
function zz58(val) {
  vt(val) || (val = String(val));
  const val2 = zz80(this);
  return zz46(val2, "has", val), val2.hasOwnProperty(val);
}
class zz59 {
  constructor(zz60 = !1, zz61 = !1) {
    this._isReadonly = zz60, this._isShallow = zz61;
  }
  get(val, val2, val3) {
    if (val2 === "__v_skip") return val.__v_skip;
    const val4 = this._isReadonly,
      val5 = this._isShallow;
    if (val2 === "__v_isReactive") return !val4;
    if (val2 === "__v_isReadonly") return val4;
    if (val2 === "__v_isShallow") return val5;
    if (val2 === "__v_raw") return val3 === (val4 ? val5 ? $u : la : val5 ? ia : oa).get(val) || Object.getPrototypeOf(val) === Object.getPrototypeOf(val3) ? val : void 0;
    const val6 = ce(val);
    if (!val4) {
      let val1;
      if (val6 && (val1 = Au[val2])) return val1;
      if (val2 === "hasOwnProperty") return zz58;
    }
    const val7 = Reflect.get(val, val2, zz82(val) ? val : val3);
    if ((vt(val2) ? na.has(val2) : Ru(val2)) || (val4 || zz46(val, "get", val2), val5)) return val7;
    if (zz82(val7)) {
      const val1 = val6 && lr(val2) ? val7 : val7.value;
      return val4 && Te(val1) ? zz74(val1) : val1;
    }
    return Te(val7) ? val4 ? zz74(val7) : zz72(val7) : val7;
  }
}
class zz62 extends zz59 {
  constructor(zz63 = !1) {
    super(!1, zz63);
  }
  set(val, val2, val3, val4) {
    let val5 = val[val2];
    const val6 = ce(val) && lr(val2);
    if (!this._isShallow) {
      const val1 = zz77(val5);
      if (!zz78(val3) && !zz77(val3) && (val5 = zz80(val5), val3 = zz80(val3)), !val6 && zz82(val5) && !zz82(val3)) return val1 || (val5.value = val3), !0;
    }
    const val7 = val6 ? Number(val2) < val.length : Se(val, val2),
      val8 = Reflect.set(val, val2, val3, zz82(val) ? val : val4);
    return val === zz80(val4) && (val7 ? Zt(val3, val5) && zz47(val, "set", val2, val3) : zz47(val, "add", val2, val3)), val8;
  }
  deleteProperty(val, val2) {
    const val3 = Se(val, val2);
    val[val2];
    const property = Reflect.deleteProperty(val, val2);
    return property && val3 && zz47(val, "delete", val2, void 0), property;
  }
  has(val, val2) {
    const val3 = Reflect.has(val, val2);
    return (!vt(val2) || !na.has(val2)) && zz46(val, "has", val2), val3;
  }
  ownKeys(val) {
    return zz46(val, "iterate", ce(val) ? "length" : fn), Reflect.ownKeys(val);
  }
}
class zz64 extends zz59 {
  constructor(zz65 = !1) {
    super(!0, zz65);
  }
  set(val, val2) {
    return !0;
  }
  deleteProperty(val, val2) {
    return !0;
  }
}
const Ou = new zz62(),
  Pu = new zz64(),
  Iu = new zz62(!0);
const lo = val => val,
  Rs = val => Reflect.getPrototypeOf(val);
function zz66(val, val2, val3) {
  return function (...val1) {
    const val4 = this.__v_raw,
      val5 = zz80(val4),
      val6 = Rn(val5),
      val7 = val === "entries" || val === Symbol.iterator && val6,
      val8 = val === "keys" && val6,
      val9 = val4[val](...val1),
      val10 = val3 ? lo : val2 ? Pn : yt;
    return !val2 && zz46(val5, "iterate", val8 ? io : fn), {
      next() {
        const {
          value: val11,
          done: val12
        } = val9.next();
        return val12 ? {
          value: val11,
          done: val12
        } : {
          value: val7 ? [val10(val11[0]), val10(val11[1])] : val10(val11),
          done: val12
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function zz67(val) {
  return function (...val1) {
    return val === "delete" ? !1 : val === "clear" ? void 0 : this;
  };
}
function zz68(val, val2) {
  const obj1 = {
    get(val1) {
      const val3 = this.__v_raw,
        val4 = zz80(val3),
        val5 = zz80(val1);
      val || (Zt(val1, val5) && zz46(val4, "get", val1), zz46(val4, "get", val5));
      const {
          has: val6
        } = Rs(val4),
        val7 = val2 ? lo : val ? Pn : yt;
      if (val6.call(val4, val1)) return val7(val3.get(val1));
      if (val6.call(val4, val5)) return val7(val3.get(val5));
      val3 !== val4 && val3.get(val1);
    },
    get size() {
      const val1 = this.__v_raw;
      return !val && zz46(zz80(val1), "iterate", fn), val1.size;
    },
    has(val1) {
      const val3 = this.__v_raw,
        val4 = zz80(val3),
        val5 = zz80(val1);
      return val || (Zt(val1, val5) && zz46(val4, "has", val1), zz46(val4, "has", val5)), val1 === val5 ? val3.has(val1) : val3.has(val1) || val3.has(val5);
    },
    forEach(val1, val3) {
      const val4 = this,
        val5 = val4.__v_raw,
        val6 = zz80(val5),
        val7 = val2 ? lo : val ? Pn : yt;
      return !val && zz46(val6, "iterate", fn), val5.forEach((val8, val9) => val1.call(val3, val7(val8), val7(val9), val4));
    }
  };
  return Ve(obj1, val ? {
    add: zz67("add"),
    set: zz67("set"),
    delete: zz67("delete"),
    clear: zz67("clear")
  } : {
    add(val1) {
      !val2 && !zz78(val1) && !zz77(val1) && (val1 = zz80(val1));
      const val3 = zz80(this);
      return Rs(val3).has.call(val3, val1) || (val3.add(val1), zz47(val3, "add", val1, val1)), this;
    },
    set(val1, val3) {
      !val2 && !zz78(val3) && !zz77(val3) && (val3 = zz80(val3));
      const val4 = zz80(this),
        {
          has: val5,
          get: val6
        } = Rs(val4);
      let val7 = val5.call(val4, val1);
      val7 || (val1 = zz80(val1), val7 = val5.call(val4, val1));
      const val8 = val6.call(val4, val1);
      return val4.set(val1, val3), val7 ? Zt(val3, val8) && zz47(val4, "set", val1, val3) : zz47(val4, "add", val1, val3), this;
    },
    delete(val1) {
      const val3 = zz80(this),
        {
          has: val4,
          get: val5
        } = Rs(val3);
      let val6 = val4.call(val3, val1);
      val6 || (val1 = zz80(val1), val6 = val4.call(val3, val1)), val5 && val5.call(val3, val1);
      const val7 = val3.delete(val1);
      return val6 && zz47(val3, "delete", val1, void 0), val7;
    },
    clear() {
      const val1 = zz80(this),
        val3 = val1.size !== 0,
        val4 = val1.clear();
      return val3 && zz47(val1, "clear", void 0, void 0), val4;
    }
  }), ["keys", "values", "entries", Symbol.iterator].forEach(val1 => {
    obj1[val1] = zz66(val1, val, val2);
  }), obj1;
}
function zz69(val, val2) {
  const val3 = zz68(val, val2);
  return (val1, val4, val5) => val4 === "__v_isReactive" ? !val : val4 === "__v_isReadonly" ? val : val4 === "__v_raw" ? val1 : Reflect.get(Se(val3, val4) && val4 in val1 ? val3 : val1, val4, val5);
}
const Nu = {
    get: zz69(!1, !1)
  },
  Du = {
    get: zz69(!1, !0)
  },
  Bu = {
    get: zz69(!0, !1)
  };
const oa = new WeakMap(),
  ia = new WeakMap(),
  la = new WeakMap(),
  $u = new WeakMap();
function zz70(val) {
  switch (val) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function zz71(val) {
  return val.__v_skip || !Object.isExtensible(val) ? 0 : zz70(uu(val));
}
function zz72(val) {
  return zz77(val) ? val : zz75(val, !1, Ou, Nu, oa);
}
function zz73(val) {
  return zz75(val, !1, Iu, Du, ia);
}
function zz74(val) {
  return zz75(val, !0, Pu, Bu, la);
}
function zz75(val, val2, val3, val4, val5) {
  if (!Te(val) || val.__v_raw && !(val2 && val.__v_isReactive)) return val;
  const val6 = zz71(val);
  if (val6 === 0) return val;
  const val7 = val5.get(val);
  if (val7) return val7;
  const proxy = new Proxy(val, val6 === 2 ? val4 : val3);
  return val5.set(val, proxy), proxy;
}
function zz76(val) {
  return zz77(val) ? zz76(val.__v_raw) : !!(val && val.__v_isReactive);
}
function zz77(val) {
  return !!(val && val.__v_isReadonly);
}
function zz78(val) {
  return !!(val && val.__v_isShallow);
}
function zz79(val) {
  return val ? !!val.__v_raw : !1;
}
function zz80(val) {
  const val2 = val && val.__v_raw;
  return val2 ? zz80(val2) : val;
}
function zz81(val) {
  return !Se(val, "__v_skip") && Object.isExtensible(val) && Hl(val, "__v_skip", !0), val;
}
const yt = val => Te(val) ? zz72(val) : val,
  Pn = val => Te(val) ? zz74(val) : val;
function zz82(val) {
  return val ? val.__v_isRef === !0 : !1;
}
function zz83(val) {
  return zz85(val, !1);
}
function zz84(val) {
  return zz85(val, !0);
}
function zz85(val, val2) {
  return zz82(val) ? val : new zz86(val, val2);
}
class zz86 {
  constructor(val, val2) {
    this.dep = new zz42(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = val2 ? val : zz80(val), this._value = val2 ? val : yt(val), this.__v_isShallow = val2;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(val) {
    const val2 = this._rawValue,
      val3 = this.__v_isShallow || zz78(val) || zz77(val);
    val = val3 ? val : zz80(val), Zt(val, val2) && (this._rawValue = val, this._value = val3 ? val : yt(val), this.dep.trigger());
  }
}
function zz87(val) {
  return zz82(val) ? val.value : val;
}
const qu = {
  get: (val, val2, val3) => val2 === "__v_raw" ? val : zz87(Reflect.get(val, val2, val3)),
  set: (val, val2, val3, val4) => {
    const val5 = val[val2];
    return zz82(val5) && !zz82(val3) ? (val5.value = val3, !0) : Reflect.set(val, val2, val3, val4);
  }
};
function zz88(val) {
  return zz76(val) ? val : new Proxy(val, qu);
}
function zz89(val) {
  const val2 = ce(val) ? new Array(val.length) : {};
  for (const val_tdz6 in val) val2[val_tdz6] = zz91(val_tdz6, val_tdz6);
  return val2;
}
class zz90 {
  constructor(val, val2, val3) {
    this._object = val, this._key = val2, this._defaultValue = val3, this.__v_isRef = !0, this._value = void 0, this._raw = zz80(val);
    let val4 = !0,
      val5 = val;
    if (!ce(val) || !lr(String(val2))) do val4 = !zz79(val5) || zz78(val5); while (val4 && (val5 = val5.__v_raw));
    this._shallow = val4;
  }
  get value() {
    let val = this._object[this._key];
    return this._shallow && (val = zz87(val)), this._value = val === void 0 ? this._defaultValue : val;
  }
  set value(val) {
    if (this._shallow && zz82(this._raw[this._key])) {
      const val1 = this._object[this._key];
      if (zz82(val1)) {
        val1.value = val;
        return;
      }
    }
    this._object[this._key] = val;
  }
  get dep() {
    return zz48(this._raw, this._key);
  }
}
function zz91(val, val2, val3) {
  return new zz90(val, val2, val3);
}
class zz92 {
  constructor(val, val2, val3) {
    this.fn = val, this.setter = val2, this._value = void 0, this.dep = new zz42(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = os - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !val2, this.isSSR = val3;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && Pe !== this) return zz26(this, !0), !0;
  }
  get value() {
    const val = this.dep.track();
    return zz33(this), val && (val.version = this.dep.version), this._value;
  }
  set value(val) {
    this.setter && this.setter(val);
  }
}
function zz93(val, val2, zz94 = !1) {
  let val4, val5;
  return me(val) ? val4 = val : (val4 = val.get, val5 = val.set), new zz92(val4, val5, zz94);
}
const ks = {},
  zs = new WeakMap();
let an;
function zz95(val, zz96 = !1, zz97 = an) {
  if (zz97) {
    let val1 = zs.get(zz97);
    val1 || zs.set(zz97, val1 = []), val1.push(val);
  }
}
function zz98(val, val2, zz99 = ke) {
  const {
      immediate: val4,
      deep: val5,
      once: val6,
      scheduler: val7,
      augmentJob: val8,
      call: val9
    } = zz99,
    fn1 = val1 => val5 ? val1 : zz78(val1) || val5 === !1 || val5 === 0 ? zz101(val1, 1) : zz101(val1);
  let val10,
    val11,
    val12,
    val13,
    val14 = !1,
    val15 = !1;
  if (zz82(val) ? (val11 = () => val.value, val14 = zz78(val)) : zz76(val) ? (val11 = () => fn1(val), val14 = !0) : ce(val) ? (val15 = !0, val14 = val.some(val1 => zz76(val1) || zz78(val1)), val11 = () => val.map(val1 => {
    if (zz82(val1)) return val1.value;
    if (zz76(val1)) return fn1(val1);
    if (me(val1)) return val9 ? val9(val1, 2) : val1();
  })) : me(val) ? val2 ? val11 = val9 ? () => val9(val, 2) : val : val11 = () => {
    if (val12) {
      zz38();
      try {
        val12();
      } finally {
        zz39();
      }
    }
    const val1 = an;
    an = val10;
    try {
      return val9 ? val9(val, 3, [val13]) : val(val13);
    } finally {
      an = val1;
    }
  } : val11 = Pt, val2 && val5) {
    const val1 = val11,
      val18 = val5 === !0 ? 1 / 0 : val5;
    val11 = () => zz101(val1(), val18);
  }
  const val16 = zz22(),
    fn2 = () => {
      val10.stop(), val16 && val16.active && Io(val16.effects, val10);
    };
  if (val6 && val2) {
    const val1 = val2;
    val2 = (...val18) => {
      val1(...val18), fn2();
    };
  }
  let val17 = val15 ? new Array(val.length).fill(ks) : ks;
  const fn3 = val1 => {
    if (!(!(val10.flags & 1) || !val10.dirty && !val1)) if (val2) {
      const val18 = val10.run();
      if (val5 || val14 || (val15 ? val18.some((val19, val20) => Zt(val19, val17[val20])) : Zt(val18, val17))) {
        val12 && val12();
        const val19 = an;
        an = val10;
        try {
          const list = [val18, val17 === ks ? void 0 : val15 && val17[0] === ks ? [] : val17, val13];
          val17 = val18, val9 ? val9(val2, 3, list) : val2(...list);
        } finally {
          an = val19;
        }
      }
    } else val10.run();
  };
  return val8 && val8(fn3), val10 = new zz25(val11), val10.scheduler = val7 ? () => val7(fn3, !1) : fn3, val13 = val1 => zz95(val1, !1, val10), val12 = val10.onStop = () => {
    const val1 = zs.get(val10);
    if (val1) {
      if (val9) val9(val1, 4);else for (const zz100 of val1) zz100();
      zs.delete(val10);
    }
  }, val2 ? val4 ? fn3(!0) : val17 = val10.run() : val7 ? val7(fn3.bind(null, !0), !0) : val10.run(), fn2.pause = val10.pause.bind(val10), fn2.resume = val10.resume.bind(val10), fn2.stop = fn2, fn2;
}
function zz101(val, zz102 = 1 / 0, val3) {
  if (zz102 <= 0 || !Te(val) || val.__v_skip || (val3 = val3 || new Map(), (val3.get(val) || 0) >= zz102)) return val;
  if (val3.set(val, zz102), zz102--, zz82(val)) zz101(val.value, zz102, val3);else if (ce(val)) for (let num = 0; num < val.length; num++) zz101(val[num], zz102, val3);else if (Bn(val) || Rn(val)) val.forEach(val1 => {
    zz101(val1, zz102, val3);
  });else if (Vl(val)) {
    for (const val_tdz7 in val) zz101(val[val_tdz7], zz102, val3);
    for (const val_tdz8 of Object.getOwnPropertySymbols(val)) Object.prototype.propertyIsEnumerable.call(val_tdz8, val_tdz8) && zz101(val_tdz8[val_tdz8], zz102, val3);
  }
  return val;
}
function zz103(val, val2, val3, val4) {
  try {
    return val4 ? val(...val4) : val();
  } catch (val1) {
    zz105(val1, val2, val3);
  }
}
function zz104(val, val2, val3, val4) {
  if (me(val)) {
    const val1 = zz103(val, val2, val3, val4);
    return val1 && $l(val1) && val1.catch(val5 => {
      zz105(val5, val2, val3);
    }), val1;
  }
  if (ce(val)) {
    const list = [];
    for (let num = 0; num < val.length; num++) list.push(zz104(val[num], val2, val3, val4));
    return list;
  }
}
function zz105(val, val2, val3, zz106 = !0) {
  const val5 = val2 ? val2.vnode : null,
    {
      errorHandler: val6,
      throwUnhandledErrorInProduction: val7
    } = val2 && val2.appContext.config || ke;
  if (val2) {
    let val1 = val2.parent;
    const val8 = val2.proxy,
      text = `https://vuejs.org/error-reference/#runtime-${val3}`;
    for (; val1;) {
      const val9 = val1.ec;
      if (val9) {
        for (let num = 0; num < val9.length; num++) if (val9[num](val, val8, text) === !1) return;
      }
      val1 = val1.parent;
    }
    if (val6) {
      zz38(), zz103(val6, null, 10, [val, val8, text]), zz39();
      return;
    }
  }
  zz107(val, val3, val5, zz106, val7);
}
function zz107(val, val2, val3, zz108 = !0, zz109 = !1) {
  if (zz109) throw val;
  console.error(val);
}
const et = [];
let Tt = -1;
const Tn = [];
let Qt = null,
  Cn = 0;
const da = Promise.resolve();
let Qs = null;
function zz110(val) {
  const val2 = Qs || da;
  return val ? val2.then(this ? val.bind(this) : val) : val2;
}
function zz111(val) {
  let val2 = Tt + 1,
    etLength = et.length;
  for (; val2 < etLength;) {
    const val1 = val2 + etLength >>> 1,
      val4 = et[val1],
      val5 = ls(val4);
    val5 < val || val5 === val && val4.flags & 2 ? val2 = val1 + 1 : etLength = val1;
  }
  return val2;
}
function zz112(val) {
  if (!(val.flags & 1)) {
    const val1 = ls(val),
      val2 = et[et.length - 1];
    !val2 || !(val.flags & 2) && val1 >= ls(val2) ? et.push(val) : et.splice(zz111(val1), 0, val), val.flags |= 1, zz113();
  }
}
function zz113() {
  Qs || (Qs = da.then(zz118));
}
function zz114(val) {
  ce(val) ? Tn.push(...val) : Qt && val.id === -1 ? Qt.splice(Cn + 1, 0, val) : val.flags & 1 || (Tn.push(val), val.flags |= 1), zz113();
}
function zz115(val, val2, zz116 = Tt + 1) {
  for (; zz116 < et.length; zz116++) {
    const val1 = et[zz116];
    if (val1 && val1.flags & 2) {
      if (val && val1.id !== val.uid) continue;
      et.splice(zz116, 1), zz116--, val1.flags & 4 && (val1.flags &= -2), val1(), val1.flags & 4 || (val1.flags &= -2);
    }
  }
}
function zz117(val) {
  if (Tn.length) {
    const val1 = [...new Set(Tn)].sort((val2, val3) => ls(val2) - ls(val3));
    if (Tn.length = 0, Qt) {
      Qt.push(...val1);
      return;
    }
    for (Qt = val1, Cn = 0; Cn < Qt.length; Cn++) {
      const QtCn = Qt[Cn];
      QtCn.flags & 4 && (QtCn.flags &= -2), QtCn.flags & 8 || QtCn(), QtCn.flags &= -2;
    }
    Qt = null, Cn = 0;
  }
}
const ls = val => val.id == null ? val.flags & 2 ? -1 : 1 / 0 : val.id;
function zz118(val) {
  try {
    for (Tt = 0; Tt < et.length; Tt++) {
      const etTt = et[Tt];
      etTt && !(etTt.flags & 8) && (etTt.flags & 4 && (etTt.flags &= -2), zz103(etTt, etTt.i, etTt.i ? 15 : 14), etTt.flags & 4 || (etTt.flags &= -2));
    }
  } finally {
    for (; Tt < et.length; Tt++) {
      const etTt = et[Tt];
      etTt && (etTt.flags &= -2);
    }
    Tt = -1, et.length = 0, zz117(), Qs = null, (et.length || Tn.length) && zz118();
  }
}
let Ke = null,
  ha = null;
function zz119(val) {
  const val2 = Ke;
  return Ke = val, ha = val && val.type.__scopeId || null, val2;
}
function zz120(val, zz121 = Ke, val3) {
  if (!zz121 || val._n) return val;
  const fn1 = (...val1) => {
    fn1._d && zz283(-1);
    const val4 = zz119(zz121);
    let val5;
    try {
      val5 = val(...val1);
    } finally {
      zz119(val4), fn1._d && zz283(1);
    }
    return val5;
  };
  return fn1._n = !0, fn1._c = !0, fn1._d = !0, fn1;
}
function zz122(val, val2) {
  if (Ke === null) return val;
  const val3 = zz335(Ke),
    val4 = val.dirs || (val.dirs = []);
  for (let num = 0; num < val2.length; num++) {
    let [val1, val5, val6, val7 = ke] = val2[num];
    val1 && (me(val1) && (val1 = {
      mounted: val1,
      updated: val1
    }), val1.deep && zz101(val5), val4.push({
      dir: val1,
      instance: val3,
      value: val5,
      oldValue: void 0,
      arg: val6,
      modifiers: val7
    }));
  }
  return val;
}
function zz123(val, val2, val3, val4) {
  const val5 = val.dirs,
    val6 = val2 && val2.dirs;
  for (let num = 0; num < val5.length; num++) {
    const val1 = val5[num];
    val6 && (val1.oldValue = val6[num].value);
    let val7 = val1.dir[val4];
    val7 && (zz38(), zz104(val7, val3, 8, [val.el, val1, val, val2]), zz39());
  }
}
function zz124(val, val2) {
  if (Qe) {
    let QeProvides = Qe.provides;
    const val3 = Qe.parent && Qe.parent.provides;
    val3 === QeProvides && (QeProvides = Qe.provides = Object.create(val3)), QeProvides[val] = val2;
  }
}
function zz125(val, val2, zz126 = !1) {
  const val4 = wr();
  if (val4 || pn) {
    let val1 = pn ? pn._context.provides : val4 ? val4.parent == null || val4.ce ? val4.vnode.appContext && val4.vnode.appContext.provides : val4.parent.provides : void 0;
    if (val1 && val in val1) return val1[val];
    if (arguments.length > 1) return zz126 && me(val2) ? val2.call(val4 && val4.proxy) : val2;
  }
}
function zz127() {
  return !!(wr() || pn);
}
const td = Symbol.for("v-scx"),
  nd = () => zz125(td);
function zz128(val, val2, val3) {
  return zz129(val, val2, val3);
}
function zz129(val, val2, zz130 = ke) {
  const {
      immediate: val4,
      deep: val5,
      flush: val6,
      once: val7
    } = zz130,
    val8 = Ve({}, zz130),
    val9 = val2 && val4 || !val2 && val6 !== "post";
  let val10;
  if (ds) {
    if (val6 === "sync") {
      const val1 = nd();
      val10 = val1.__watcherHandles || (val1.__watcherHandles = []);
    } else if (!val9) {
      const fn1 = () => {};
      return fn1.stop = Pt, fn1.resume = Pt, fn1.pause = Pt, fn1;
    }
  }
  const val11 = Qe;
  val8.call = (val1, val14, val15) => zz104(val1, val11, val14, val15);
  let val12 = !1;
  val6 === "post" ? val8.scheduler = val1 => {
    Xe(val1, val11 && val11.suspense);
  } : val6 !== "sync" && (val12 = !0, val8.scheduler = (val1, val14) => {
    val14 ? val1() : zz112(val1);
  }), val8.augmentJob = val1 => {
    val2 && (val1.flags |= 4), val12 && (val1.flags |= 2, val11 && (val1.id = val11.uid, val1.i = val11));
  };
  const val13 = zz98(val, val2, val8);
  return ds && (val10 ? val10.push(val13) : val9 && val13()), val13;
}
function zz131(val, val2, val3) {
  const val4 = this.proxy,
    val5 = Le(val) ? val.includes(".") ? zz132(val4, val) : () => val4[val] : val.bind(val4, val4);
  let val6;
  me(val2) ? val6 = val2 : (val6 = val2.handler, val3 = val2);
  const val7 = ws(this),
    val8 = zz129(val5, val6.bind(val4), val3);
  return val7(), val8;
}
function zz132(val, val2) {
  const val3 = val2.split(".");
  return () => {
    let val1 = val;
    for (let num = 0; num < val3.length && val1; num++) val1 = val1[val3[num]];
    return val1;
  };
}
const ya = Symbol("_vte"),
  ba = val => val.__isTeleport,
  Xn = val => val && (val.disabled || val.disabled === ""),
  mi = val => val && (val.defer || val.defer === ""),
  hi = val => typeof SVGElement < "u" && val instanceof SVGElement,
  gi = val => typeof MathMLElement == "function" && val instanceof MathMLElement,
  co = (val, val2) => {
    const val3 = val && val.to;
    return Le(val3) ? val2 ? val2(val3) : null : val3;
  },
  wa = {
    name: "Teleport",
    __isTeleport: !0,
    process(val, val2, val3, val4, val5, val6, val7, val8, val9, val10) {
      const {
          mc: val11,
          pc: val12,
          pbc: val13,
          o: {
            insert: val14,
            querySelector: val15,
            createText: val16,
            createComment: val17
          }
        } = val10,
        val18 = Xn(val2.props);
      let {
        shapeFlag: val19,
        children: val20,
        dynamicChildren: val21
      } = val2;
      if (val == null) {
        const val1 = val2.el = val16(""),
          val22 = val2.anchor = val16("");
        val14(val1, val3, val4), val14(val22, val3, val4);
        const fn1 = (val23, val24) => {
            val19 & 16 && val11(val20, val23, val24, val5, val6, val7, val8, val9);
          },
          fn2 = () => {
            const val23 = val2.target = co(val2.props, val15),
              val24 = zz147(val23, val2, val16, val14);
            val23 && (val7 !== "svg" && hi(val23) ? val7 = "svg" : val7 !== "mathml" && gi(val23) && (val7 = "mathml"), val5 && val5.isCE && (val5.ce._teleportTargets || (val5.ce._teleportTargets = new Set())).add(val23), val18 || (fn1(val23, val24), zz146(val2, !1)));
          };
        val18 && (fn1(val3, val22), zz146(val2, !0)), mi(val2.props) ? (val2.el.__isMounted = !1, Xe(() => {
          fn2(), delete val2.el.__isMounted;
        }, val6)) : fn2();
      } else {
        if (mi(val2.props) && val.el.__isMounted === !1) {
          Xe(() => {
            wa.process(val, val2, val3, val4, val5, val6, val7, val8, val9, val10);
          }, val6);
          return;
        }
        val2.el = val.el, val2.targetStart = val.targetStart;
        const val1 = val2.anchor = val.anchor,
          val22 = val2.target = val.target,
          val23 = val2.targetAnchor = val.targetAnchor,
          val24 = Xn(val.props),
          val25 = val24 ? val3 : val22,
          val26 = val24 ? val1 : val23;
        if (val7 === "svg" || hi(val22) ? val7 = "svg" : (val7 === "mathml" || gi(val22)) && (val7 = "mathml"), val21 ? (val13(val.dynamicChildren, val21, val25, val5, val6, val7, val8), zz273(val, val2, !0)) : val9 || val12(val, val2, val25, val26, val5, val6, val7, val8, !1), val18) val24 ? val2.props && val.props && val2.props.to !== val.props.to && (val2.props.to = val.props.to) : zz135(val2, val3, val1, val10, 1);else if ((val2.props && val2.props.to) !== (val.props && val.props.to)) {
          const val27 = val2.target = co(val2.props, val15);
          val27 && zz135(val2, val27, null, val10, 0);
        } else val24 && zz135(val2, val22, val23, val10, 1);
        zz146(val2, val18);
      }
    },
    remove(val, val2, val3, {
      um: zz133,
      o: {
        remove: zz134
      }
    }, val6) {
      const {
        shapeFlag: val7,
        children: val8,
        anchor: val9,
        targetStart: val10,
        targetAnchor: val11,
        target: val12,
        props: val13
      } = val;
      if (val12 && (zz134(val10), zz134(val11)), val6 && zz134(val9), val7 & 16) {
        const val1 = val6 || !Xn(val13);
        for (let num = 0; num < val8.length; num++) {
          const val14 = val8[num];
          zz133(val14, val2, val3, val1, !!val14.dynamicChildren);
        }
      }
    },
    move: zz135,
    hydrate: zz139
  };
function zz135(val, val2, val3, {
  o: {
    insert: zz136
  },
  m: zz137
}, zz138 = 2) {
  zz138 === 0 && zz136(val.targetAnchor, val2, val3);
  const {
      el: val7,
      anchor: val8,
      shapeFlag: val9,
      children: val10,
      props: val11
    } = val,
    val12 = zz138 === 2;
  if (val12 && zz136(val7, val2, val3), (!val12 || Xn(val11)) && val9 & 16) for (let num = 0; num < val10.length; num++) zz137(val10[num], val2, val3, 2);
  val12 && zz136(val8, val2, val3);
}
function zz139(val, val2, val3, val4, val5, val6, {
  o: {
    nextSibling: zz140,
    parentNode: zz141,
    querySelector: zz142,
    insert: zz143,
    createText: zz144
  }
}, val12) {
  function zz145(val1, val15, val16, val17) {
    val15.anchor = val12(zz140(val1), val15, zz141(val1), val3, val4, val5, val6), val15.targetStart = val16, val15.targetAnchor = val17;
  }
  const val13 = val2.target = co(val2.props, zz142),
    val14 = Xn(val2.props);
  if (val13) {
    const val1 = val13._lpa || val13.firstChild;
    if (val2.shapeFlag & 16) if (val14) zz145(val, val2, val1, val1 && zz140(val1));else {
      val2.anchor = zz140(val);
      let val15 = val1;
      for (; val15;) {
        if (val15 && val15.nodeType === 8) {
          if (val15.data === "teleport start anchor") val2.targetStart = val15;else if (val15.data === "teleport anchor") {
            val2.targetAnchor = val15, val13._lpa = val2.targetAnchor && zz140(val2.targetAnchor);
            break;
          }
        }
        val15 = zz140(val15);
      }
      val2.targetAnchor || zz147(val13, val2, zz144, zz143), val12(val1 && zz140(val1), val2, val13, val3, val4, val5, val6);
    }
    zz146(val2, val14);
  } else val14 && val2.shapeFlag & 16 && zz145(val, val2, val, zz140(val));
  return val2.anchor && zz140(val2.anchor);
}
const Teleport = wa;
function zz146(val, val2) {
  const val3 = val.ctx;
  if (val3 && val3.ut) {
    let val1, val4;
    for (val2 ? (val1 = val.el, val4 = val.anchor) : (val1 = val.targetStart, val4 = val.targetAnchor); val1 && val1 !== val4;) val1.nodeType === 1 && val1.setAttribute("data-v-owner", val3.uid), val1 = val1.nextSibling;
    val3.ut();
  }
}
function zz147(val, val2, val3, val4) {
  const val5 = val2.targetStart = val3(""),
    val6 = val2.targetAnchor = val3("");
  return val5[ya] = val6, val && (val4(val5, val), val4(val6, val)), val6;
}
const Nt = Symbol("_leaveCb"),
  Ps = Symbol("_enterCb");
/* 组件挂载后生命周期钩子 */
function zz148() {
  const obj1 = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map()
  };
  return onMounted(() => {
    obj1.isMounted = !0;
  }), directiveBum(() => {
    obj1.isUnmounting = !0;
  }), obj1;
}
const dt = [Function, Array],
  xa = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: dt,
    onEnter: dt,
    onAfterEnter: dt,
    onEnterCancelled: dt,
    onBeforeLeave: dt,
    onLeave: dt,
    onAfterLeave: dt,
    onLeaveCancelled: dt,
    onBeforeAppear: dt,
    onAppear: dt,
    onAfterAppear: dt,
    onAppearCancelled: dt
  },
  Ca = val => {
    const val2 = val.subTree;
    return val2.component ? Ca(val2.component) : val2;
  },
  od = {
    name: "BaseTransition",
    props: xa,
    setup(val, {
      slots: zz149
    }) {
      const val3 = wr(),
        val4 = zz148();
      return () => {
        const val1 = zz149.default && zz156(zz149.default(), !0);
        if (!val1 || !val1.length) return;
        const val5 = zz150(val1),
          val6 = zz80(val),
          {
            mode: val7
          } = val6;
        if (val4.isLeaving) return zz153(val5);
        const val8 = zz154(val5);
        if (!val8) return zz153(val5);
        let val9 = zz152(val8, val6, val4, val3, val11 => val9 = val11);
        val8.type !== ze && zz155(val8, val9);
        let val10 = val3.subTree && zz154(val3.subTree);
        if (val10 && val10.type !== ze && !zz289(val10, val8) && Ca(val3).type !== ze) {
          let val11 = zz152(val10, val6, val4, val3);
          if (zz155(val10, val11), val7 === "out-in" && val8.type !== ze) return val4.isLeaving = !0, val11.afterLeave = () => {
            val4.isLeaving = !1, val3.job.flags & 8 || val3.update(), delete val11.afterLeave, val10 = void 0;
          }, zz153(val5);
          val7 === "in-out" && val8.type !== ze ? val11.delayLeave = (val12, val13, val14) => {
            const val15 = zz151(val4, val10);
            val15[String(val10.key)] = val10, val12[Nt] = () => {
              val13(), val12[Nt] = void 0, delete val9.delayedLeave, val10 = void 0;
            }, val9.delayedLeave = () => {
              val14(), delete val9.delayedLeave, val10 = void 0;
            };
          } : val10 = void 0;
        } else val10 && (val10 = void 0);
        return val5;
      };
    }
  };
function zz150(val) {
  let val2 = val[0];
  if (val.length > 1) {
    for (const val_tdz9 of val) if (val_tdz9.type !== ze) {
      val2 = val_tdz9;
      break;
    }
  }
  return val2;
}
const id = od;
function zz151(val, val2) {
  const {
    leavingVNodes: val3
  } = val;
  let val4 = val3.get(val2.type);
  return val4 || (val4 = Object.create(null), val3.set(val2.type, val4)), val4;
}
function zz152(val, val2, val3, val4, val5) {
  const {
      appear: val6,
      mode: val7,
      persisted: val20 = !1,
      onBeforeEnter: val8,
      onEnter: val9,
      onAfterEnter: val10,
      onEnterCancelled: val11,
      onBeforeLeave: val12,
      onLeave: val13,
      onAfterLeave: val14,
      onLeaveCancelled: val15,
      onBeforeAppear: val16,
      onAppear: val17,
      onAfterAppear: val18,
      onAppearCancelled: val19
    } = val2,
    val21 = String(val.key),
    val22 = zz151(val3, val),
    fn1 = (val1, val23) => {
      val1 && zz104(val1, val4, 9, val23);
    },
    fn2 = (val1, val23) => {
      const val24 = val23[1];
      fn1(val1, val23), ce(val1) ? val1.every(val25 => val25.length <= 1) && val24() : val1.length <= 1 && val24();
    },
    obj1 = {
      mode: val7,
      persisted: val20,
      beforeEnter(val1) {
        let val23 = val8;
        if (!val3.isMounted) if (val6) val23 = val16 || val8;else return;
        val1[Nt] && val1[Nt](!0);
        const val24 = val22[val21];
        val24 && zz289(val, val24) && val24.el[Nt] && val24.el[Nt](), fn1(val23, [val1]);
      },
      enter(val1) {
        let val23 = val9,
          val24 = val10,
          val25 = val11;
        if (!val3.isMounted) if (val6) val23 = val17 || val9, val24 = val18 || val10, val25 = val19 || val11;else return;
        let val26 = !1;
        const val27 = val1[Ps] = val28 => {
          val26 || (val26 = !0, val28 ? fn1(val25, [val1]) : fn1(val24, [val1]), obj1.delayedLeave && obj1.delayedLeave(), val1[Ps] = void 0);
        };
        val23 ? fn2(val23, [val1, val27]) : val27();
      },
      leave(val1, val23) {
        const val24 = String(val.key);
        if (val1[Ps] && val1[Ps](!0), val3.isUnmounting) return val23();
        fn1(val12, [val1]);
        let val25 = !1;
        const val26 = val1[Nt] = val27 => {
          val25 || (val25 = !0, val23(), val27 ? fn1(val15, [val1]) : fn1(val14, [val1]), val1[Nt] = void 0, val22[val24] === val && delete val22[val24]);
        };
        val22[val24] = val, val13 ? fn2(val13, [val1, val26]) : val26();
      },
      clone(val1) {
        const val23 = zz152(val1, val2, val3, val4, val5);
        return val5 && val5(val23), val23;
      }
    };
  return obj1;
}
function zz153(val) {
  if (hr(val)) return val = zz309(val), val.children = null, val;
}
function zz154(val) {
  if (!hr(val)) return ba(val.type) && val.children ? zz150(val.children) : val;
  if (val.component) return val.component.subTree;
  const {
    shapeFlag: val2,
    children: val3
  } = val;
  if (val3) {
    if (val2 & 16) return val3[0];
    if (val2 & 32 && me(val3.default)) return val3.default();
  }
}
function zz155(val, val2) {
  val.shapeFlag & 6 && val.component ? (val.transition = val2, zz155(val.component.subTree, val2)) : val.shapeFlag & 128 ? (val.ssContent.transition = val2.clone(val.ssContent), val.ssFallback.transition = val2.clone(val.ssFallback)) : val.transition = val2;
}
function zz156(val, zz157 = !1, val3) {
  let list = [],
    num = 0;
  for (let zz158 = 0; zz158 < val.length; zz158++) {
    let val1 = val[zz158];
    const val4 = val3 == null ? val1.key : String(val3) + String(val1.key != null ? val1.key : zz158);
    // Vue/flattenChildren：num=keyedFragmentCount、zz158=i、128=PatchFlags.KEYED_FRAGMENT。
    // 反混淆曾把计数器塌陷成循环下标（zz158++），既让稳定 fragment 优化失效，又会跳过一个子节点。
    val1.type === Fragment ? (val1.patchFlag & 128 && num++, list = list.concat(zz156(val1.children, zz157, val4))) : (zz157 || val1.type !== ze) && list.push(val4 != null ? zz309(val1, {
      key: val4
    }) : val1);
  }
  if (num > 1) for (let zz159 = 0; zz159 < list.length; zz159++) list[zz159].patchFlag = -2;
  return list;
}
function zz160(val, val2) {
  return me(val) ? Ve({
    name: val.name
  }, val2, {
    setup: val
  }) : val;
}
function zz161(val) {
  val.ids = [val.ids[0] + val.ids[2]++ + "-", 0, 0];
}
const Ys = new WeakMap();
function zz162(val, val2, val3, val4, zz163 = !1) {
  if (ce(val)) {
    val.forEach((val1, val15) => zz162(val1, val2 && (ce(val2) ? val2[val15] : val2), val3, val4, zz163));
    return;
  }
  if (kn(val4) && !zz163) {
    val4.shapeFlag & 512 && val4.type.__asyncResolved && val4.component.subTree.component && zz162(val, val2, val3, val4.component.subTree);
    return;
  }
  const val6 = val4.shapeFlag & 4 ? zz335(val4.component) : val4.el,
    val7 = zz163 ? null : val6,
    {
      i: val8,
      r: val9
    } = val,
    val10 = val2 && val2.r,
    val11 = val8.refs === ke ? val8.refs = {} : val8.refs,
    val12 = val8.setupState,
    val13 = zz80(val12),
    val14 = val12 === ke ? Bl : val1 => Se(val13, val1);
  if (val10 != null && val10 !== val9) {
    if (zz164(val2), Le(val10)) val11[val10] = null, val14(val10) && (val12[val10] = null);else if (zz82(val10)) {
      val10.value = null;
      const val1 = val2;
      val1.k && (val11[val1.k] = null);
    }
  }
  if (me(val9)) zz103(val9, val8, 12, [val7, val11]);else {
    const val1 = Le(val9),
      val15 = zz82(val9);
    if (val1 || val15) {
      const fn1 = () => {
        if (val.f) {
          const val16 = val1 ? val14(val9) ? val12[val9] : val11[val9] : val9.value;
          if (zz163) ce(val16) && Io(val16, val6);else if (ce(val16)) val16.includes(val6) || val16.push(val6);else if (val1) val11[val9] = [val6], val14(val9) && (val12[val9] = val11[val9]);else {
            const list = [val6];
            val9.value = list, val.k && (val11[val.k] = list);
          }
        } else val1 ? (val11[val9] = val7, val14(val9) && (val12[val9] = val7)) : val15 && (val9.value = val7, val.k && (val11[val.k] = val7));
      };
      if (val7) {
        const fn2 = () => {
          fn1(), Ys.delete(val);
        };
        fn2.id = -1, Ys.set(val, fn2), Xe(fn2, val3);
      } else zz164(val), fn1();
    }
  }
}
function zz164(val) {
  const val2 = Ys.get(val);
  val2 && (val2.flags |= 8, Ys.delete(val));
}
dr().requestIdleCallback;
dr().cancelIdleCallback;
const kn = val => !!val.type.__asyncLoader,
  hr = val => val.type.__isKeepAlive;
function zz165(val, val2) {
  zz167(val, "a", val2);
}
function zz166(val, val2) {
  zz167(val, "da", val2);
}
function zz167(val, val2, zz168 = Qe) {
  const val4 = val.__wdc || (val.__wdc = () => {
    let val1 = zz168;
    for (; val1;) {
      if (val1.isDeactivated) return;
      val1 = val1.parent;
    }
    return val();
  });
  if (zz170(val2, val4, zz168), zz168) {
    let val1 = zz168.parent;
    for (; val1 && val1.parent;) hr(val1.parent.vnode) && zz169(val4, val2, zz168, val1), val1 = val1.parent;
  }
}
function zz169(val, val2, val3, val4) {
  const val5 = zz170(val2, val, val4, !0);
  directiveUm(() => {
    Io(val4[val2], val5);
  }, val3);
}
function zz170(val, val2, zz171 = Qe, zz172 = !1) {
  if (zz171) {
    const val1 = zz171[val] || (zz171[val] = []),
      val5 = val2.__weh || (val2.__weh = (...val6) => {
        zz38();
        const val7 = ws(zz171),
          val8 = zz104(val2, zz171, val, val6);
        return val7(), zz39(), val8;
      });
    return zz172 ? val1.unshift(val5) : val1.push(val5), val5;
  }
}
const qt = val => (val1, zz173 = Qe) => {
    (!ds || val === "sp") && zz170(val, (...val3) => val1(...val3), zz173);
  },
  ud = qt("bm"),
  onMounted = qt("m"),
  dd = qt("bu"),
  ka = qt("u"),
  directiveBum = qt("bum"),
  directiveUm = qt("um"),
  fd = qt("sp"),
  pd = qt("rtg"),
  md = qt("rtc");
function zz174(val, zz175 = Qe) {
  zz170("ec", val, zz175);
}
const Pa = "components";
function zz176(val, val2) {
  return zz178(Pa, val, !0, val2) || val;
}
const Ma = Symbol.for("v-ndc");
function zz177(val) {
  return Le(val) ? zz178(Pa, val, !1) || val : val || Ma;
}
function zz178(val, val2, zz179 = !0, zz180 = !1) {
  const val5 = Ke || Qe;
  if (val5) {
    const val1 = val5.type;
    {
      const val7 = zz336(val1, !1);
      if (val7 && (val7 === val2 || val7 === mt(val2) || val7 === cr(mt(val2)))) return val1;
    }
    const val6 = zz181(val5[val] || val1[val], val2) || zz181(val5.appContext[val], val2);
    return !val6 && zz180 ? val1 : val6;
  }
}
function zz181(val, val2) {
  return val && (val[val2] || val[mt(val2)] || val[cr(mt(val2))]);
}
function zz182(val, val2, val3, val4) {
  let val5;
  const val6 = val3,
    val7 = ce(val);
  if (val7 || Le(val)) {
    const val1 = val7 && zz76(val);
    let val8 = !1,
      val9 = !1;
    val1 && (val8 = !zz78(val), val9 = zz77(val), val = zz50(val)), val5 = new Array(val.length);
    for (let num = 0, val_tdz10 = val.length; num < val_tdz10; num++) val5[num] = val2(val8 ? val9 ? Pn(yt(val[num])) : yt(val[num]) : val[num], num, void 0, val6);
  } else if (typeof val == "number") {
    val5 = new Array(val);
    for (let num = 0; num < val; num++) val5[num] = val2(num + 1, num, void 0, val6);
  } else if (Te(val)) {
    if (val[Symbol.iterator]) val5 = Array.from(val, (val1, val8) => val2(val1, val8, void 0, val6));else {
      const val1 = Object.keys(val);
      val5 = new Array(val1.length);
      for (let num = 0, zz183 = val1.length; num < zz183; num++) {
        const val8 = val1[num];
        val5[num] = val2(val[val8], val8, num, val6);
      }
    }
  } else val5 = [];
  return val5;
}
/* 渲染函数：构建组件模板 DOM 结构 */
function zz184(val, val2, zz185 = {}, val4, val5) {
  if (Ke.ce || Ke.parent && kn(Ke.parent) && Ke.parent.ce) {
    const val1 = Object.keys(zz185).length > 0;
    return val2 !== "default" && (zz185.name = val2), zz280(), zz287(Fragment, null, [createVNode("slot", zz185, val4)], val1 ? -2 : 64);
  }
  let val6 = val[val2];
  val6 && val6._c && (val6._d = !1), zz280();
  const val7 = val6 && zz186(val6(zz185)),
    val8 = zz185.key || val7 && val7.key,
    block = zz287(Fragment, {
      key: (val8 && !vt(val8) ? val8 : `_${val2}`) + (!val7 && val4 ? "_fb" : "")
    }, val7 || [], val7 && val._ === 1 ? 64 : -2);
  return val6 && val6._c && (val6._d = !0), block;
}
function zz186(val) {
  return val.some(val1 => zz288(val1) ? !(val1.type === ze || val1.type === Fragment && !zz186(val1.children)) : !0) ? val : null;
}
const fo = val => val ? zz327(val) ? zz335(val) : fo(val.parent) : null,
  es = Ve(Object.create(null), {
    $: val => val,
    $el: val => val.vnode.el,
    $data: val => val.data,
    $props: val => val.props,
    $attrs: val => val.attrs,
    $slots: val => val.slots,
    $refs: val => val.refs,
    $parent: val => fo(val.parent),
    $root: val => fo(val.root),
    $host: val => val.ce,
    $emit: val => val.emit,
    $options: val => zz203(val),
    $forceUpdate: val => val.f || (val.f = () => {
      zz112(val.update);
    }),
    $nextTick: val => val.n || (val.n = zz110.bind(val.proxy)),
    $watch: val => zz131.bind(val)
  }),
  Fr = (val, val2) => val !== ke && !val.__isScriptSetup && Se(val, val2),
  vd = {
    get({
      _: zz187
    }, val2) {
      if (val2 === "__v_skip") return !0;
      const {
        ctx: val3,
        setupState: val4,
        data: val5,
        props: val6,
        accessCache: val7,
        type: val8,
        appContext: val9
      } = zz187;
      if (val2[0] !== "$") {
        const val1 = val7[val2];
        if (val1 !== void 0) switch (val1) {
          case 1:
            return val4[val2];
          case 2:
            return val5[val2];
          case 4:
            return val3[val2];
          case 3:
            return val6[val2];
        } else {
          if (Fr(val4, val2)) return val7[val2] = 1, val4[val2];
          if (val5 !== ke && Se(val5, val2)) return val7[val2] = 2, val5[val2];
          if (Se(val6, val2)) return val7[val2] = 3, val6[val2];
          if (val3 !== ke && Se(val3, val2)) return val7[val2] = 4, val3[val2];
          po && (val7[val2] = 0);
        }
      }
      const val10 = es[val2];
      let val11, val12;
      if (val10) return val2 === "$attrs" && zz46(zz187.attrs, "get", ""), val10(zz187);
      if ((val11 = val8.__cssModules) && (val11 = val11[val2])) return val11;
      if (val3 !== ke && Se(val3, val2)) return val7[val2] = 4, val3[val2];
      if (val12 = val9.config.globalProperties, Se(val12, val2)) return val12[val2];
    },
    set({
      _: zz188
    }, val2, val3) {
      const {
        data: val4,
        setupState: val5,
        ctx: val6
      } = zz188;
      return Fr(val5, val2) ? (val5[val2] = val3, !0) : val4 !== ke && Se(val4, val2) ? (val4[val2] = val3, !0) : Se(zz188.props, val2) || val2[0] === "$" && val2.slice(1) in zz188 ? !1 : (val6[val2] = val3, !0);
    },
    has({
      _: {
        data: zz189,
        setupState: zz190,
        accessCache: zz191,
        ctx: zz192,
        appContext: zz193,
        props: zz194,
        type: zz195
      }
    }, val8) {
      let val9;
      return !!(zz191[val8] || zz189 !== ke && val8[0] !== "$" && Se(zz189, val8) || Fr(zz190, val8) || Se(zz194, val8) || Se(zz192, val8) || Se(es, val8) || Se(zz193.config.globalProperties, val8) || (val9 = zz195.__cssModules) && val9[val8]);
    },
    defineProperty(val, val2, val3) {
      return val3.get != null ? val._.accessCache[val2] = 0 : Se(val3, "value") && this.set(val, val2, val3.value, null), Reflect.defineProperty(val, val2, val3);
    }
  };
function zz196(val) {
  return ce(val) ? val.reduce((val1, val2) => (val1[val2] = null, val1), {}) : val;
}
let po = !0;
function zz197(val) {
  const val2 = zz203(val),
    val3 = val.proxy,
    val4 = val.ctx;
  po = !1, val2.beforeCreate && zz201(val2.beforeCreate, val, "bc");
  const {
    data: val5,
    computed: val6,
    methods: val7,
    watch: val8,
    provide: val9,
    inject: val10,
    created: val11,
    beforeMount: val12,
    mounted: val13,
    beforeUpdate: val14,
    updated: val15,
    activated: val16,
    deactivated: val17,
    beforeDestroy: val18,
    beforeUnmount: val19,
    destroyed: val20,
    unmounted: val21,
    render: val22,
    renderTracked: val23,
    renderTriggered: val24,
    errorCaptured: val25,
    serverPrefetch: val26,
    expose: val27,
    inheritAttrs: val28,
    components: val29,
    directives: val30,
    filters: val31
  } = val2;
  if (val10 && zz199(val10, val4, null), val7) for (const ae in val7) {
    const val1 = val7[ae];
    me(val1) && (val4[ae] = val1.bind(val3));
  }
  if (val5) {
    const val1 = val5.call(val3, val3);
    Te(val1) && (val.data = zz72(val1));
  }
  if (po = !0, val6) for (const ae in val6) {
    const val1 = val6[ae],
      val32 = me(val1) ? val1.bind(val3, val3) : me(val1.get) ? val1.get.bind(val3, val3) : Pt,
      val33 = !me(val1) && me(val1.set) ? val1.set.bind(val3) : Pt,
      val34 = applyDirectives({
        get: val32,
        set: val33
      });
    Object.defineProperty(val4, ae, {
      enumerable: !0,
      configurable: !0,
      get: () => val34.value,
      set: val35 => val34.value = val35
    });
  }
  if (val8) for (const ae in val8) zz202(val8[ae], val4, val3, ae);
  if (val9) {
    const val1 = me(val9) ? val9.call(val3) : val9;
    Reflect.ownKeys(val1).forEach(val32 => {
      zz124(val32, val1[val32]);
    });
  }
  val11 && zz201(val11, val, "c");
  function zz198(val1, val32) {
    ce(val32) ? val32.forEach(val33 => val1(val33.bind(val3))) : val32 && val1(val32.bind(val3));
  }
  if (zz198(ud, val12), zz198(onMounted, val13), zz198(dd, val14), zz198(ka, val15), zz198(zz165, val16), zz198(zz166, val17), zz198(zz174, val25), zz198(md, val23), zz198(pd, val24), zz198(directiveBum, val19), zz198(directiveUm, val21), zz198(fd, val26), ce(val27)) if (val27.length) {
    const val1 = val.exposed || (val.exposed = {});
    val27.forEach(val32 => {
      Object.defineProperty(val1, val32, {
        get: () => val3[val32],
        set: val33 => val3[val32] = val33,
        enumerable: !0
      });
    });
  } else val.exposed || (val.exposed = {});
  val22 && val.render === Pt && (val.render = val22), val28 != null && (val.inheritAttrs = val28), val29 && (val.components = val29), val30 && (val.directives = val30), val26 && zz161(val);
}
function zz199(val, val2, zz200 = Pt) {
  ce(val) && (val = zz209(val));
  for (const val_tdz11 in val) {
    const val1 = val[val_tdz11];
    let val4;
    Te(val1) ? "default" in val1 ? val4 = zz125(val1.from || val_tdz11, val1.default, !0) : val4 = zz125(val1.from || val_tdz11) : val4 = zz125(val1), zz82(val4) ? Object.defineProperty(val2, val_tdz11, {
      enumerable: !0,
      configurable: !0,
      get: () => val4.value,
      set: val5 => val4.value = val5
    }) : val2[val_tdz11] = val4;
  }
}
function zz201(val, val2, val3) {
  zz104(ce(val) ? val.map(val1 => val1.bind(val2.proxy)) : val.bind(val2.proxy), val2, val3);
}
function zz202(val, val2, val3, val4) {
  let val5 = val4.includes(".") ? zz132(val3, val4) : () => val3[val4];
  if (Le(val)) {
    const val1 = val2[val];
    me(val1) && zz128(val5, val1);
  } else if (me(val)) zz128(val5, val.bind(val3));else if (Te(val)) if (ce(val)) val.forEach(val1 => zz202(val1, val2, val3, val4));else {
    const val1 = me(val.handler) ? val.handler.bind(val3) : val2[val.handler];
    me(val1) && zz128(val5, val1, val);
  }
}
function zz203(val) {
  const val2 = val.type,
    {
      mixins: val3,
      extends: val4
    } = val2,
    {
      mixins: val5,
      optionsCache: val6,
      config: {
        optionMergeStrategies: val7
      }
    } = val.appContext,
    val8 = val6.get(val2);
  let val9;
  return val8 ? val9 = val8 : !val5.length && !val3 && !val4 ? val9 = val2 : (val9 = {}, val5.length && val5.forEach(val1 => zz204(val9, val1, val7, !0)), zz204(val9, val2, val7)), Te(val2) && val6.set(val2, val9), val9;
}
function zz204(val, val2, val3, zz205 = !1) {
  const {
    mixins: val5,
    extends: val6
  } = val2;
  val6 && zz204(val, val6, val3, !0), val5 && val5.forEach(val1 => zz204(val, val1, val3, !0));
  for (const zz206 in val2) if (!(zz205 && zz206 === "expose")) {
    const val1 = wd[zz206] || val3 && val3[zz206];
    val[zz206] = val1 ? val1(val[zz206], val2[zz206]) : val2[zz206];
  }
  return val;
}
const wd = {
  data: zz207,
  props: zz212,
  emits: zz212,
  methods: zz211,
  computed: zz211,
  beforeCreate: zz210,
  created: zz210,
  beforeMount: zz210,
  mounted: zz210,
  beforeUpdate: zz210,
  updated: zz210,
  beforeDestroy: zz210,
  beforeUnmount: zz210,
  destroyed: zz210,
  unmounted: zz210,
  activated: zz210,
  deactivated: zz210,
  errorCaptured: zz210,
  serverPrefetch: zz210,
  components: zz211,
  directives: zz211,
  watch: zz213,
  provide: zz207,
  inject: zz208
};
function zz207(val, val2) {
  return val2 ? val ? function () {
    return Ve(me(val) ? val.call(this, this) : val, me(val2) ? val2.call(this, this) : val2);
  } : val2 : val;
}
function zz208(val, val2) {
  return zz211(zz209(val), zz209(val2));
}
function zz209(val) {
  if (ce(val)) {
    const obj1 = {};
    for (let num = 0; num < val.length; num++) obj1[val[num]] = val[num];
    return obj1;
  }
  return val;
}
function zz210(val, val2) {
  return val ? [...new Set([].concat(val, val2))] : val2;
}
function zz211(val, val2) {
  return val ? Ve(Object.create(null), val, val2) : val2;
}
function zz212(val, val2) {
  return val ? ce(val) && ce(val2) ? [...new Set([...val, ...val2])] : Ve(Object.create(null), zz196(val), zz196(val2 ?? {})) : val2;
}
function zz213(val, val2) {
  if (!val) return val2;
  if (!val2) return val;
  const val3 = Ve(Object.create(null), val);
  for (const zz214 in val2) val3[zz214] = zz210(val3[zz214], val2[zz214]);
  return val3;
}
function zz215() {
  return {
    app: null,
    config: {
      isNativeTag: Bl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let xd = 0;
function zz216(val, val2) {
  return function (val1, zz217 = null) {
    me(val1) || (val1 = Ve({}, val1)), zz217 != null && !Te(zz217) && (zz217 = null);
    const val4 = zz215(),
      weakset = new WeakSet(),
      list = [];
    let val5 = !1;
    const val6 = val4.app = {
      _uid: xd++,
      _component: val1,
      _props: zz217,
      _container: null,
      _context: val4,
      _instance: null,
      version: nf,
      get config() {
        return val4.config;
      },
      set config(val7) {},
      use(val7, ...val8) {
        return weakset.has(val7) || (val7 && me(val7.install) ? (weakset.add(val7), val7.install(val6, ...val8)) : me(val7) && (weakset.add(val7), val7(val6, ...val8))), val6;
      },
      mixin(val7) {
        return val4.mixins.includes(val7) || val4.mixins.push(val7), val6;
      },
      component(val7, val8) {
        return val8 ? (val4.components[val7] = val8, val6) : val4.components[val7];
      },
      directive(val7, val8) {
        return val8 ? (val4.directives[val7] = val8, val6) : val4.directives[val7];
      },
      mount(val7, val8, val9) {
        if (!val5) {
          const val10 = val6._ceVNode || createVNode(val1, zz217);
          return val10.appContext = val4, val9 === !0 ? val9 = "svg" : val9 === !1 && (val9 = void 0), val(val10, val7, val9), val5 = !0, val6._container = val7, val7.__vue_app__ = val6, zz335(val10.component);
        }
      },
      onUnmount(val7) {
        list.push(val7);
      },
      unmount() {
        val5 && (zz104(list, val6._instance, 16), val(null, val6._container), delete val6._container.__vue_app__);
      },
      provide(val7, val8) {
        return val4.provides[val7] = val8, val6;
      },
      runWithContext(val7) {
        const val8 = pn;
        pn = val6;
        try {
          return val7();
        } finally {
          pn = val8;
        }
      }
    };
    return val6;
  };
}
let pn = null;
const Ad = (val, val2) => val2 === "modelValue" || val2 === "model-value" ? val.modelModifiers : val[`${val2}Modifiers`] || val[`${mt(val2)}Modifiers`] || val[`${sn(val2)}Modifiers`];
function zz218(val, val2, ...val3) {
  if (val.isUnmounted) return;
  const val4 = val.vnode.props || ke;
  let val5 = val3;
  const val6 = val2.startsWith("update:"),
    val7 = val6 && Ad(val4, val2.slice(7));
  val7 && (val7.trim && (val5 = val3.map(val1 => Le(val1) ? val1.trim() : val1)), val7.number && (val5 = val3.map(ur)));
  let val8,
    val9 = val4[val8 = Mr(val2)] || val4[val8 = Mr(mt(val2))];
  !val9 && val6 && (val9 = val4[val8 = Mr(sn(val2))]), val9 && zz104(val9, val, 6, val5);
  const val10 = val4[val8 + "Once"];
  if (val10) {
    if (!val.emitted) val.emitted = {};else if (val.emitted[val8]) return;
    val.emitted[val8] = !0, zz104(val10, val, 6, val5);
  }
}
const Rd = new WeakMap();
function zz219(val, val2, zz220 = !1) {
  const val4 = zz220 ? Rd : val2.emitsCache,
    val5 = val4.get(val);
  if (val5 !== void 0) return val5;
  const val6 = val.emits;
  let obj1 = {},
    val7 = !1;
  if (!me(val)) {
    const fn1 = val1 => {
      const val8 = zz219(val1, val2, !0);
      val8 && (val7 = !0, Ve(obj1, val8));
    };
    !zz220 && val2.mixins.length && val2.mixins.forEach(fn1), val.extends && fn1(val.extends), val.mixins && val.mixins.forEach(fn1);
  }
  return !val6 && !val7 ? (Te(val) && val4.set(val, null), null) : (ce(val6) ? val6.forEach(val1 => obj1[val1] = null) : Ve(obj1, val6), Te(val) && val4.set(val, obj1), obj1);
}
function zz221(val, val2) {
  return !val || !ir(val2) ? !1 : (val2 = val2.slice(2).replace(/Once$/, ""), Se(val, val2[0].toLowerCase() + val2.slice(1)) || Se(val, sn(val2)) || Se(val, val2));
}
function zz222(val) {
  const {
      type: val2,
      vnode: val3,
      proxy: val4,
      withProxy: val5,
      propsOptions: [val16],
      slots: val6,
      attrs: val7,
      emit: val8,
      render: val9,
      renderCache: val10,
      props: val11,
      data: val12,
      setupState: val13,
      ctx: val14,
      inheritAttrs: val15
    } = val,
    val17 = zz119(val);
  let val18, val19;
  try {
    if (val3.shapeFlag & 4) {
      const val1 = val5 || val4,
        val21 = val1;
      val18 = zz319(val9.call(val21, val1, val10, val11, val13, val12, val14)), val19 = val7;
    } else {
      const val1 = val2;
      val18 = zz319(val1.length > 1 ? val1(val11, {
        attrs: val7,
        slots: val6,
        emit: val8
      }) : val1(val11, null)), val19 = val2.props ? val7 : Td(val7);
    }
  } catch (val1) {
    ts.length = 0, zz105(val1, val, 1), val18 = createVNode(ze);
  }
  let val20 = val18;
  if (val19 && val15 !== !1) {
    const val1 = Object.keys(val19),
      {
        shapeFlag: val21
      } = val20;
    val1.length && val21 & 7 && (val16 && val1.some(Po) && (val19 = kd(val19, val16)), val20 = zz309(val20, val19, !1, !0));
  }
  return val3.dirs && (val20 = zz309(val20, null, !1, !0), val20.dirs = val20.dirs ? val20.dirs.concat(val3.dirs) : val3.dirs), val3.transition && zz155(val20, val3.transition), val18 = val20, zz119(val17), val18;
}
const Td = val => {
    let val2;
    for (const val_tdz12 in val) (val_tdz12 === "class" || val_tdz12 === "style" || ir(val_tdz12)) && ((val2 || (val2 = {}))[val_tdz12] = val[val_tdz12]);
    return val2;
  },
  kd = (val, val2) => {
    const obj1 = {};
    for (const val_tdz13 in val) (!Po(val_tdz13) || !(val_tdz13.slice(9) in val2)) && (obj1[val_tdz13] = val[val_tdz13]);
    return obj1;
  };
function zz223(val, val2, val3) {
  const {
      props: val4,
      children: val5,
      component: val6
    } = val,
    {
      props: val7,
      children: val8,
      patchFlag: val9
    } = val2,
    val10 = val6.emitsOptions;
  if (val2.dirs || val2.transition) return !0;
  if (val3 && val9 >= 0) {
    if (val9 & 1024) return !0;
    if (val9 & 16) return val4 ? zz224(val4, val7, val10) : !!val7;
    if (val9 & 8) {
      const val1 = val2.dynamicProps;
      for (let num = 0; num < val1.length; num++) {
        const val11 = val1[num];
        if (val7[val11] !== val4[val11] && !zz221(val10, val11)) return !0;
      }
    }
  } else return (val5 || val8) && (!val8 || !val8.$stable) ? !0 : val4 === val7 ? !1 : val4 ? val7 ? zz224(val4, val7, val10) : !0 : !!val7;
  return !1;
}
function zz224(val, val2, val3) {
  const val4 = Object.keys(val2);
  if (val4.length !== Object.keys(val).length) return !0;
  for (let num = 0; num < val4.length; num++) {
    const val1 = val4[num];
    if (val2[val1] !== val[val1] && !zz221(val3, val1)) return !0;
  }
  return !1;
}
function zz225({
  vnode: zz226,
  parent: zz227
}, val3) {
  for (; zz227;) {
    const val1 = zz227.subTree;
    if (val1.suspense && val1.suspense.activeBranch === zz226 && (val1.el = zz226.el), val1 === zz226) (zz226 = zz227.vnode).el = val3, zz227 = zz227.parent;else break;
  }
}
const Va = {},
  Ha = () => Object.create(Va),
  Ua = val => Object.getPrototypeOf(val) === Va;
function zz228(val, val2, val3, zz229 = !1) {
  const obj1 = {},
    val5 = Ha();
  val.propsDefaults = Object.create(null), zz233(val, val2, obj1, val5);
  for (const val_tdz14 in val.propsOptions[0]) val_tdz14 in obj1 || (obj1[val_tdz14] = void 0);
  val3 ? val.props = zz229 ? obj1 : zz73(obj1) : val.type.props ? val.props = obj1 : val.props = val5, val.attrs = val5;
}
function zz230(val, val2, val3, val4) {
  const {
      props: val5,
      attrs: val6,
      vnode: {
        patchFlag: val7
      }
    } = val,
    val8 = zz80(val5),
    [val9] = val.propsOptions;
  let val10 = !1;
  if ((val4 || val7 > 0) && !(val7 & 16)) {
    if (val7 & 8) {
      const val1 = val.vnode.dynamicProps;
      for (let num = 0; num < val1.length; num++) {
        let val11 = val1[num];
        if (zz221(val.emitsOptions, val11)) continue;
        const val12 = val2[val11];
        if (val9) {
          if (Se(val6, val11)) val12 !== val6[val11] && (val6[val11] = val12, val10 = !0);else {
            const val13 = mt(val11);
            val5[val13] = zz235(val9, val8, val13, val12, val, !1);
          }
        } else val12 !== val6[val11] && (val6[val11] = val12, val10 = !0);
      }
    }
  } else {
    zz233(val, val2, val5, val6) && (val10 = !0);
    let val1;
    for (const zz231 in val8) (!val2 || !Se(val2, zz231) && ((val1 = sn(zz231)) === zz231 || !Se(val2, val1))) && (val9 ? val3 && (val3[zz231] !== void 0 || val3[val1] !== void 0) && (val5[zz231] = zz235(val9, val8, zz231, void 0, zz231, !0)) : delete val5[zz231]);
    if (val6 !== val8) for (const zz232 in val6) (!val2 || !Se(val2, zz232)) && (delete val6[zz232], val10 = !0);
  }
  val10 && zz47(val.attrs, "set", "");
}
function zz233(val, val2, val3, val4) {
  const [val5, val6] = val.propsOptions;
  let val7 = !1,
    val8;
  if (val2) for (let zz234 in val2) {
    if (Qn(zz234)) continue;
    const val1 = val2[zz234];
    let val9;
    val5 && Se(val5, val9 = mt(zz234)) ? !val6 || !val6.includes(val9) ? val3[val9] = val1 : (val8 || (val8 = {}))[val9] = val1 : zz221(val.emitsOptions, zz234) || (!(zz234 in val4) || val1 !== val4[zz234]) && (val4[zz234] = val1, val7 = !0);
  }
  if (val6) {
    const val1 = zz80(val3),
      val9 = val8 || ke;
    for (let num = 0; num < val6.length; num++) {
      const val10 = val6[num];
      val3[val10] = zz235(val5, val1, val10, val9[val10], val, !Se(val9, val10));
    }
  }
  return val7;
}
function zz235(val, val2, val3, val4, val5, val6) {
  const val7 = val[val3];
  if (val7 != null) {
    const val1 = Se(val7, "default");
    if (val1 && val4 === void 0) {
      const val8 = val7.default;
      if (val7.type !== Function && !val7.skipFactory && me(val8)) {
        const {
          propsDefaults: val9
        } = val5;
        if (val3 in val9) val4 = val9[val3];else {
          const val10 = ws(val5);
          val4 = val9[val3] = val8.call(null, val2), val10();
        }
      } else val4 = val8;
      val5.ce && val5.ce._setProp(val3, val4);
    }
    val7[0] && (val6 && !val1 ? val4 = !1 : val7[1] && (val4 === "" || val4 === sn(val3)) && (val4 = !0));
  }
  return val4;
}
const Ld = new WeakMap();
function zz236(val, val2, zz237 = !1) {
  const val4 = zz237 ? Ld : val2.propsCache,
    val5 = val4.get(val);
  if (val5) return val5;
  const val6 = val.props,
    obj1 = {},
    list = [];
  let val7 = !1;
  if (!me(val)) {
    const fn1 = val1 => {
      val7 = !0;
      const [val8, val9] = zz236(val1, val2, !0);
      Ve(obj1, val8), val9 && list.push(...val9);
    };
    !zz237 && val2.mixins.length && val2.mixins.forEach(fn1), val.extends && fn1(val.extends), val.mixins && val.mixins.forEach(fn1);
  }
  if (!val6 && !val7) return Te(val) && val4.set(val, Sn), Sn;
  if (ce(val6)) for (let num = 0; num < val6.length; num++) {
    const val1 = mt(val6[num]);
    zz239(val1) && (obj1[val1] = ke);
  } else if (val6) for (const zz238 in val6) {
    const val1 = mt(zz238);
    if (zz239(val1)) {
      const val8 = val6[zz238],
        val9 = obj1[val1] = ce(val8) || me(val8) ? {
          type: val8
        } : Ve({}, val8),
        val10 = val9.type;
      let val11 = !1,
        val12 = !0;
      if (ce(val10)) for (let num = 0; num < val10.length; ++num) {
        const val13 = val10[num],
          val14 = me(val13) && val13.name;
        if (val14 === "Boolean") {
          val11 = !0;
          break;
        } else val14 === "String" && (val12 = !1);
      } else val11 = me(val10) && val10.name === "Boolean";
      val9[0] = val11, val9[1] = val12, (val11 || Se(val9, "default")) && list.push(val1);
    }
  }
  const list2 = [obj1, list];
  return Te(val) && val4.set(val, list2), list2;
}
function zz239(val) {
  return val[0] !== "$" && !Qn(val);
}
const jo = val => val === "_" || val === "_ctx" || val === "$stable",
  Ko = val => ce(val) ? val.map(zz319) : [zz319(val)],
  Nd = (val, val2, val3) => {
    if (val2._n) return val2;
    const val4 = zz120((...val1) => Ko(val2(...val1)), val3);
    return val4._c = !1, val4;
  },
  Ka = (val, val2, val3) => {
    const val4 = val._ctx;
    for (const val_tdz15 in val) {
      if (jo(val_tdz15)) continue;
      const val1 = val[val_tdz15];
      if (me(val1)) val2[val_tdz15] = Nd(val_tdz15, val1, val4);else if (val1 != null) {
        const val5 = Ko(val1);
        val2[val_tdz15] = () => val5;
      }
    }
  },
  Wa = (val, val2) => {
    const val3 = Ko(val2);
    val.slots.default = () => val3;
  },
  Ga = (val, val2, val3) => {
    for (const zz240 in val2) (val3 || !jo(zz240)) && (val[zz240] = val2[zz240]);
  },
  Dd = (val, val2, val3) => {
    const val4 = val.slots = Ha();
    if (val.vnode.shapeFlag & 32) {
      const val1 = val2._;
      val1 ? (Ga(val4, val2, val3), val3 && Hl(val4, "_", val1, !0)) : Ka(val2, val4);
    } else val2 && Wa(val, val2);
  },
  Bd = (val, val2, val3) => {
    const {
      vnode: val4,
      slots: val5
    } = val;
    let val6 = !0,
      val7 = ke;
    if (val4.shapeFlag & 32) {
      const val1 = val2._;
      val1 ? val3 && val1 === 1 ? val6 = !1 : Ga(val5, val2, val3) : (val6 = !val2.$stable, Ka(val2, val5)), val7 = val2;
    } else val2 && (Wa(val, val2), val7 = {
      default: 1
    });
    if (val6) for (const zz241 in val5) !jo(zz241) && val7[zz241] == null && delete val5[zz241];
  },
  Xe = zz279;
function zz242(val) {
  return zz243(val);
}
function zz243(val, val2) {
  const val3 = dr();
  val3.__VUE__ = !0;
  const {
      insert: val4,
      remove: val5,
      patchProp: val6,
      createElement: val7,
      createText: val8,
      createComment: val9,
      setText: val10,
      setElementText: val11,
      parentNode: val12,
      nextSibling: val13,
      setScopeId: val15 = Pt,
      insertStaticContent: val14
    } = val,
    fn1 = (val1, val17, val18, zz244 = null, zz245 = null, zz246 = null, zz247 = void 0, zz248 = null, zz249 = !!val17.dynamicChildren) => {
      if (val1 === val17) return;
      val1 && !zz289(val1, val17) && (zz244 = fn29(val1), fn24(val1, zz245, zz246, !0), val1 = null), val17.patchFlag === -2 && (zz249 = !1, val17.dynamicChildren = null);
      const {
        type: val25,
        ref: val26,
        shapeFlag: val27
      } = val17;
      switch (val25) {
        case br:
          fn2(val1, val17, val18, zz244);
          break;
        case ze:
          fn3(val1, val17, val18, zz244);
          break;
        case Hs:
          val1 == null && fn4(val17, val18, zz244, zz247);
          break;
        case Fragment:
          fn14(val1, val17, val18, zz244, zz245, zz246, zz247, zz248, zz249);
          break;
        default:
          val27 & 1 ? fn7(val1, val17, val18, zz244, zz245, zz246, zz247, zz248, zz249) : val27 & 6 ? fn15(val1, val17, val18, zz244, zz245, zz246, zz247, zz248, zz249) : (val27 & 64 || val27 & 128) && val25.process(val1, val17, val18, zz244, zz245, zz246, zz247, zz248, zz249, obj1);
      }
      val26 != null && zz245 ? zz162(val26, val1 && val1.ref, zz246, val17 || val1, !val17) : val26 == null && val1 && val1.ref != null && zz162(val1.ref, null, zz246, val1, !0);
    },
    fn2 = (val1, val17, val18, val19) => {
      if (val1 == null) val4(val17.el = val8(val17.children), val18, val19);else {
        const val20 = val17.el = val1.el;
        val17.children !== val1.children && val10(val20, val17.children);
      }
    },
    fn3 = (val1, val17, val18, val19) => {
      val1 == null ? val4(val17.el = val9(val17.children || ""), val18, val19) : val17.el = val1.el;
    },
    fn4 = (val1, val17, val18, val19) => {
      [val1.el, val1.anchor] = val14(val1.children, val17, val18, val19, val1.el, val1.anchor);
    },
    fn5 = ({
      el: zz250,
      anchor: zz251
    }, val18, val19) => {
      let val20;
      for (; zz250 && zz250 !== zz251;) val20 = val13(zz250), val4(zz250, val18, val19), zz250 = val20;
      val4(zz251, val18, val19);
    },
    fn6 = ({
      el: zz252,
      anchor: zz253
    }) => {
      let val18;
      for (; zz252 && zz252 !== zz253;) val18 = val13(zz252), val5(zz252), zz252 = val18;
      val5(zz253);
    },
    fn7 = (val1, val17, val18, val19, val20, val21, val22, val23, val24) => {
      if (val17.type === "svg" ? val22 = "svg" : val17.type === "math" && (val22 = "mathml"), val1 == null) fn8(val17, val18, val19, val20, val21, val22, val23, val24);else {
        const val25 = val1.el && val1.el._isVueCE ? val1.el : null;
        try {
          val25 && val25._beginPatch(), fn11(val1, val17, val20, val21, val22, val23, val24);
        } finally {
          val25 && val25._endPatch();
        }
      }
    },
    fn8 = (val1, val17, val18, val19, val20, val21, val22, val23) => {
      let val24, val25;
      const {
        props: val26,
        shapeFlag: val27,
        transition: val28,
        dirs: val29
      } = val1;
      if (val24 = val1.el = val7(val1.type, val21, val26 && val26.is, val26), val27 & 8 ? val11(val24, val1.children) : val27 & 16 && fn10(val1.children, val24, null, val19, val20, zz266(val1, val21), val22, val23), val29 && zz123(val1, null, val19, "created"), fn9(val24, val1, val1.scopeId, val22, val19), val26) {
        for (const Oe in val26) Oe !== "value" && !Qn(Oe) && val6(val24, Oe, null, val26[Oe], val21, val19);
        "value" in val26 && val6(val24, "value", null, val26.value, val21), (val25 = val26.onVnodeBeforeMount) && zz324(val25, val19, val1);
      }
      val29 && zz123(val1, null, val19, "beforeMount");
      const val30 = zz272(val20, val28);
      val30 && val28.beforeEnter(val24), val4(val24, val17, val18), ((val25 = val26 && val26.onVnodeMounted) || val30 || val29) && Xe(() => {
        val25 && zz324(val25, val19, val1), val30 && val28.enter(val24), val29 && zz123(val1, null, val19, "mounted");
      }, val20);
    },
    fn9 = (val1, val17, val18, val19, val20) => {
      if (val18 && val15(val1, val18), val19) for (let num = 0; num < val19.length; num++) val15(val1, val19[num]);
      if (val20) {
        let val21 = val20.subTree;
        if (val17 === val21 || Ja(val21.type) && (val21.ssContent === val17 || val21.ssFallback === val17)) {
          const val22 = val20.vnode;
          fn9(val1, val22, val22.scopeId, val22.slotScopeIds, val20.parent);
        }
      }
    },
    fn10 = (val1, val17, val18, val19, val20, val21, val22, val23, zz254 = 0) => {
      for (let zz255 = zz254; zz255 < val1.length; zz255++) {
        const val25 = val1[zz255] = val23 ? zz320(val1[zz255]) : zz319(val1[zz255]);
        fn1(null, val25, val17, val18, val19, val20, val21, val22, val23);
      }
    },
    fn11 = (val1, val17, val18, val19, val20, val21, val22) => {
      const val23 = val17.el = val1.el;
      let {
        patchFlag: val24,
        dynamicChildren: val25,
        dirs: val26
      } = val17;
      val24 |= val1.patchFlag & 16;
      const val27 = val1.props || ke,
        val28 = val17.props || ke;
      let val29;
      if (val18 && zz269(val18, !1), (val29 = val28.onVnodeBeforeUpdate) && zz324(val29, val18, val17, val1), val26 && zz123(val17, val1, val18, "beforeUpdate"), val18 && zz269(val18, !0), (val27.innerHTML && val28.innerHTML == null || val27.textContent && val28.textContent == null) && val11(val23, ""), val25 ? fn12(val1.dynamicChildren, val25, val23, val18, val19, zz266(val17, val20), val21) : val22 || fn20(val1, val17, val23, null, val18, val19, zz266(val17, val20), val21, !1), val24 > 0) {
        if (val24 & 16) fn13(val23, val27, val28, val18, val20);else if (val24 & 2 && val27.class !== val28.class && val6(val23, "class", null, val28.class, val20), val24 & 4 && val6(val23, "style", val27.style, val28.style, val20), val24 & 8) {
          const val30 = val17.dynamicProps;
          for (let Oe = 0; Oe < val30.length; Oe++) {
            const val31 = val30[Oe],
              val32 = val27[val31],
              val33 = val28[val31];
            (val33 !== val32 || val31 === "value") && val6(val23, val31, val32, val33, val20, val18);
          }
        }
        val24 & 1 && val1.children !== val17.children && val11(val23, val17.children);
      } else !val22 && val25 == null && fn13(val23, val27, val28, val18, val20);
      ((val29 = val28.onVnodeUpdated) || val26) && Xe(() => {
        val29 && zz324(val29, val18, val17, val1), val26 && zz123(val17, val1, val18, "updated");
      }, val19);
    },
    fn12 = (val1, val17, val18, val19, val20, val21, val22) => {
      for (let num = 0; num < val17.length; num++) {
        const val23 = val1[num],
          val24 = val17[num],
          val25 = val23.el && (val23.type === Fragment || !zz289(val23, val24) || val23.shapeFlag & 198) ? val12(val23.el) : val18;
        fn1(val23, val24, val25, null, val19, val20, val21, val22, !0);
      }
    },
    fn13 = (val1, val17, val18, val19, val20) => {
      if (val17 !== val18) {
        if (val17 !== ke) for (const zz256 in val17) !Qn(zz256) && !(zz256 in val18) && val6(val1, zz256, val17[zz256], null, val20, val19);
        for (const zz257 in val18) {
          if (Qn(zz257)) continue;
          const val21 = val18[zz257],
            val22 = val17[zz257];
          val21 !== val22 && zz257 !== "value" && val6(val1, zz257, val22, val21, val20, val19);
        }
        "value" in val18 && val6(val1, "value", val17.value, val18.value, val20);
      }
    },
    fn14 = (val1, val17, val18, val19, val20, val21, val22, val23, val24) => {
      const val25 = val17.el = val1 ? val1.el : val8(""),
        val26 = val17.anchor = val1 ? val1.anchor : val8("");
      let {
        patchFlag: val27,
        dynamicChildren: val28,
        slotScopeIds: val29
      } = val17;
      val29 && (val23 = val23 ? val23.concat(val29) : val29), val1 == null ? (val4(val25, val18, val19), val4(val26, val18, val19), fn10(val17.children || [], val18, val26, val20, val21, val22, val23, val24)) : val27 > 0 && val27 & 64 && val28 && val1.dynamicChildren && val1.dynamicChildren.length === val28.length ? (fn12(val1.dynamicChildren, val28, val18, val20, val21, val22, val23), (val17.key != null || val20 && val17 === val20.subTree) && zz273(val1, val17, !0)) : fn20(val1, val17, val18, val26, val20, val21, val22, val23, val24);
    },
    fn15 = (val1, val17, val18, val19, val20, val21, val22, val23, val24) => {
      val17.slotScopeIds = val23, val1 == null ? val17.shapeFlag & 512 ? val20.ctx.activate(val17, val18, val19, val22, val24) : fn16(val17, val18, val19, val20, val21, val22, val24) : fn17(val1, val17, val24);
    },
    fn16 = (val1, val17, val18, val19, val20, val21, val22) => {
      const val23 = val1.component = zz326(val1, val19, val20);
      if (hr(val1) && (val23.ctx.renderer = obj1), zz328(val23, !1, val22), val23.asyncDep) {
        if (val20 && val20.registerDep(val23, fn18, val22), !val1.el) {
          const val24 = val23.subTree = createVNode(ze);
          fn3(null, val24, val17, val18), val1.placeholder = val24.el;
        }
      } else fn18(val23, val1, val17, val18, val20, val21, val22);
    },
    fn17 = (val1, val17, val18) => {
      const val19 = val17.component = val1.component;
      if (zz223(val1, val17, val18)) {
        if (val19.asyncDep && !val19.asyncResolved) {
          fn19(val19, val17, val18);
          return;
        } else val19.next = val17, val19.update();
      } else val17.el = val1.el, val19.vnode = val17;
    },
    fn18 = (val1, val17, val18, val19, val20, val21, val22) => {
      const fn31 = () => {
        if (val1.isMounted) {
          let {
            next: val26,
            bu: val27,
            u: val28,
            parent: val29,
            vnode: val30
          } = val1;
          {
            const val35 = zz276(val1);
            if (val35) {
              val26 && (val26.el = val30.el, fn19(val1, val26, val22)), val35.asyncDep.then(() => {
                val1.isUnmounted || fn31();
              });
              return;
            }
          }
          let val31 = val26,
            val32;
          zz269(val1, !1), val26 ? (val26.el = val30.el, fn19(val1, val26, val22)) : val26 = val30, val27 && $s(val27), (val32 = val26.props && val26.props.onVnodeBeforeUpdate) && zz324(val32, val29, val26, val30), zz269(val1, !0);
          const val33 = zz222(val1),
            val34 = val1.subTree;
          val1.subTree = val33, fn1(val34, val33, val12(val34.el), fn29(val34), val1, val20, val21), val26.el = val33.el, val31 === null && zz225(val1, val33.el), val28 && Xe(val28, val20), (val32 = val26.props && val26.props.onVnodeUpdated) && Xe(() => zz324(val32, val29, val26, val30), val20);
        } else {
          let val26;
          const {
              el: val27,
              props: val28
            } = val17,
            {
              bm: val29,
              m: val30,
              parent: val31,
              root: val32,
              type: val33
            } = val1,
            val34 = kn(val17);
          zz269(val1, !1), val29 && $s(val29), !val34 && (val26 = val28 && val28.onVnodeBeforeMount) && zz324(val26, val31, val17), zz269(val1, !0);
          {
            val32.ce && val32.ce._def.shadowRoot !== !1 && val32.ce._injectChildStyle(val33);
            const val35 = val1.subTree = zz222(val1);
            fn1(null, val35, val18, val19, val1, val20, val21), val17.el = val35.el;
          }
          if (val30 && Xe(val30, val20), !val34 && (val26 = val28 && val28.onVnodeMounted)) {
            const val35 = val17;
            Xe(() => zz324(val26, val31, val35), val20);
          }
          (val17.shapeFlag & 256 || val31 && kn(val31.vnode) && val31.vnode.shapeFlag & 256) && val1.a && Xe(val1.a, val20), val1.isMounted = !0, val17 = val18 = val19 = null;
        }
      };
      val1.scope.on();
      const val23 = val1.effect = new zz25(fn31);
      val1.scope.off();
      const val24 = val1.update = val23.run.bind(val23),
        val25 = val1.job = val23.runIfDirty.bind(val23);
      val25.i = val1, val25.id = val1.uid, val23.scheduler = () => zz112(val25), zz269(val1, !0), val24();
    },
    fn19 = (val1, val17, val18) => {
      val17.component = val1;
      const val19 = val1.vnode.props;
      val1.vnode = val17, val1.next = null, zz230(val1, val17.props, val19, val18), Bd(val1, val17.children, val18), zz38(), zz115(val1), zz39();
    },
    fn20 = (val1, val17, val18, val19, val20, val21, val22, val23, zz258 = !1) => {
      const val25 = val1 && val1.children,
        val26 = val1 ? val1.shapeFlag : 0,
        val27 = val17.children,
        {
          patchFlag: val28,
          shapeFlag: val29
        } = val17;
      if (val28 > 0) {
        if (val28 & 128) {
          fn22(val25, val27, val18, val19, val20, val21, val22, val23, zz258);
          return;
        } else if (val28 & 256) {
          fn21(val25, val27, val18, val19, val20, val21, val22, val23, zz258);
          return;
        }
      }
      val29 & 8 ? (val26 & 16 && fn28(val25, val20, val21), val27 !== val25 && val11(val18, val27)) : val26 & 16 ? val29 & 16 ? fn22(val25, val27, val18, val19, val20, val21, val22, val23, zz258) : fn28(val25, val20, val21, !0) : (val26 & 8 && val11(val18, ""), val29 & 16 && fn10(val27, val18, val19, val20, val21, val22, val23, zz258));
    },
    fn21 = (val1, val17, val18, val19, val20, val21, val22, val23, val24) => {
      val1 = val1 || Sn, val17 = val17 || Sn;
      const val25 = val1.length,
        val26 = val17.length,
        val27 = Math.min(val25, val26);
      let val28;
      for (val28 = 0; val28 < val27; val28++) {
        const val29 = val17[val28] = val24 ? zz320(val17[val28]) : zz319(val17[val28]);
        fn1(val1[val28], val29, val18, null, val20, val21, val22, val23, val24);
      }
      val25 > val26 ? fn28(val1, val20, val21, !0, !1, val27) : fn10(val17, val18, val19, val20, val21, val22, val23, val24, val27);
    },
    fn22 = (val1, val17, val18, val19, val20, val21, val22, val23, val24) => {
      let num = 0;
      const val25 = val17.length;
      let val26 = val1.length - 1,
        val27 = val25 - 1;
      for (; num <= val26 && num <= val27;) {
        const val28 = val1[num],
          val29 = val17[num] = val24 ? zz320(val17[num]) : zz319(val17[num]);
        if (zz289(val28, val29)) fn1(val28, val29, val18, null, val20, val21, val22, val23, val24);else break;
        num++;
      }
      for (; num <= val26 && num <= val27;) {
        const val28 = val1[val26],
          val29 = val17[val27] = val24 ? zz320(val17[val27]) : zz319(val17[val27]);
        if (zz289(val28, val29)) fn1(val28, val29, val18, null, val20, val21, val22, val23, val24);else break;
        val26--, val27--;
      }
      if (num > val26) {
        if (num <= val27) {
          const val28 = val27 + 1,
            val29 = val28 < val25 ? val17[val28].el : val19;
          for (; num <= val27;) fn1(null, val17[num] = val24 ? zz320(val17[num]) : zz319(val17[num]), val18, val29, val20, val21, val22, val23, val24), num++;
        }
      } else if (num > val27) for (; num <= val26;) fn24(val1[num], val20, val21, !0), num++;else {
        const val28 = num,
          val29 = num,
          map = new Map();
        for (num = val29; num <= val27; num++) {
          const val34 = val17[num] = val24 ? zz320(val17[num]) : zz319(val17[num]);
          val34.key != null && map.set(val34.key, num);
        }
        let val30,
          num1 = 0;
        const val31 = val27 - val29 + 1;
        let val32 = !1,
          num2 = 0;
        const array = new Array(val31);
        for (num = 0; num < val31; num++) array[num] = 0;
        for (num = val28; num <= val26; num++) {
          const val34 = val1[num];
          if (num1 >= val31) {
            fn24(val34, val20, val21, !0);
            continue;
          }
          let val35;
          if (val34.key != null) val35 = map.get(val34.key);else for (val30 = val29; val30 <= val27; val30++) if (array[val30 - val29] === 0 && zz289(val34, val17[val30])) {
            val35 = val30;
            break;
          }
          val35 === void 0 ? fn24(val34, val20, val21, !0) : (array[val35 - val29] = num + 1, val35 >= num2 ? num2 = val35 : val32 = !0, fn1(val34, val17[val35], val18, null, val20, val21, val22, val23, val24), num1++);
        }
        const val33 = val32 ? zz275(array) : Sn;
        for (val30 = val33.length - 1, num = val31 - 1; num >= 0; num--) {
          const val34 = val29 + num,
            val35 = val17[val34],
            val36 = val17[val34 + 1],
            val37 = val34 + 1 < val25 ? val36.el || zz278(val36) : val19;
          array[num] === 0 ? fn1(null, val35, val18, val37, val20, val21, val22, val23, val24) : val32 && (val30 < 0 || num !== val33[val30] ? fn23(val35, val18, val37, 2) : val30--);
        }
      }
    },
    fn23 = (val1, val17, val18, val19, zz259 = null) => {
      const {
        el: val21,
        type: val22,
        transition: val23,
        children: val24,
        shapeFlag: val25
      } = val1;
      if (val25 & 6) {
        fn23(val1.component.subTree, val17, val18, val19);
        return;
      }
      if (val25 & 128) {
        val1.suspense.move(val17, val18, val19);
        return;
      }
      if (val25 & 64) {
        val22.move(val1, val17, val18, obj1);
        return;
      }
      if (val22 === Fragment) {
        val4(val21, val17, val18);
        for (let num = 0; num < val24.length; num++) fn23(val24[num], val17, val18, val19);
        val4(val1.anchor, val17, val18);
        return;
      }
      if (val22 === Hs) {
        fn5(val1, val17, val18);
        return;
      }
      if (val19 !== 2 && val25 & 1 && val23) {
        if (val19 === 0) val23.beforeEnter(val21), val4(val21, val17, val18), Xe(() => val23.enter(val21), zz259);else {
          const {
              leave: val26,
              delayLeave: val27,
              afterLeave: val28
            } = val23,
            fn31 = () => {
              val1.ctx.isUnmounted ? val5(val21) : val4(val21, val17, val18);
            },
            fn32 = () => {
              val21._isLeaving && val21[Nt](!0), val26(val21, () => {
                fn31(), val28 && val28();
              });
            };
          val27 ? val27(val21, fn31, fn32) : fn32();
        }
      } else val4(val21, val17, val18);
    },
    fn24 = (val1, val17, val18, zz260 = !1, zz261 = !1) => {
      const {
        type: val21,
        props: val22,
        ref: val23,
        children: val24,
        dynamicChildren: val25,
        shapeFlag: val26,
        patchFlag: val27,
        dirs: val28,
        cacheIndex: val29
      } = val1;
      if (val27 === -2 && (zz261 = !1), val23 != null && (zz38(), zz162(val23, null, val18, val1, !0), zz39()), val29 != null && (val17.renderCache[val29] = void 0), val26 & 256) {
        val17.ctx.deactivate(val1);
        return;
      }
      const val30 = val26 & 1 && val28,
        val31 = !kn(val1);
      let val32;
      if (val31 && (val32 = val22 && val22.onVnodeBeforeUnmount) && zz324(val32, val17, val1), val26 & 6) fn27(val1.component, val18, zz260);else {
        if (val26 & 128) {
          val1.suspense.unmount(val18, zz260);
          return;
        }
        val30 && zz123(val1, null, val17, "beforeUnmount"), val26 & 64 ? val1.type.remove(val1, val17, val18, obj1, zz260) : val25 && !val25.hasOnce && (val21 !== Fragment || val27 > 0 && val27 & 64) ? fn28(val25, val17, val18, !1, !0) : (val21 === Fragment && val27 & 384 || !zz261 && val26 & 16) && fn28(val24, val17, val18), zz260 && fn25(val1);
      }
      (val31 && (val32 = val22 && val22.onVnodeUnmounted) || val30) && Xe(() => {
        val32 && zz324(val32, val17, val1), val30 && zz123(val1, null, val17, "unmounted");
      }, val18);
    },
    fn25 = val1 => {
      const {
        type: val17,
        el: val18,
        anchor: val19,
        transition: val20
      } = val1;
      if (val17 === Fragment) {
        fn26(val18, val19);
        return;
      }
      if (val17 === Hs) {
        fn6(val1);
        return;
      }
      const fn31 = () => {
        val5(val18), val20 && !val20.persisted && val20.afterLeave && val20.afterLeave();
      };
      if (val1.shapeFlag & 1 && val20 && !val20.persisted) {
        const {
            leave: val21,
            delayLeave: val22
          } = val20,
          fn32 = () => val21(val18, fn31);
        val22 ? val22(val1.el, fn31, fn32) : fn32();
      } else fn31();
    },
    fn26 = (val1, val17) => {
      let val18;
      for (; val1 !== val17;) val18 = val13(val1), val5(val1), val1 = val18;
      val5(val17);
    },
    fn27 = (val1, val17, val18) => {
      const {
        bum: val19,
        scope: val20,
        job: val21,
        subTree: val22,
        um: val23,
        m: val24,
        a: val25
      } = val1;
      zz277(val24), zz277(val25), val19 && $s(val19), val20.stop(), val21 && (val21.flags |= 8, fn24(val22, val1, val17, val18)), val23 && Xe(val23, val17), Xe(() => {
        val1.isUnmounted = !0;
      }, val17);
    },
    fn28 = (val1, val17, val18, zz262 = !1, zz263 = !1, zz264 = 0) => {
      for (let zz265 = zz264; zz265 < val1.length; zz265++) fn24(val1[zz265], val17, val18, zz262, zz263);
    },
    fn29 = val1 => {
      if (val1.shapeFlag & 6) return fn29(val1.component.subTree);
      if (val1.shapeFlag & 128) return val1.suspense.next();
      const val17 = val13(val1.anchor || val1.el),
        val18 = val17 && val17[ya];
      return val18 ? val13(val18) : val17;
    };
  let val16 = !1;
  const fn30 = (val1, val17, val18) => {
      let val19;
      val1 == null ? val17._vnode && (fn24(val17._vnode, null, null, !0), val19 = val17._vnode.component) : fn1(val17._vnode || null, val1, val17, null, null, null, val18), val17._vnode = val1, val16 || (val16 = !0, zz115(val19), zz117(), val16 = !1);
    },
    obj1 = {
      p: fn1,
      um: fn24,
      m: fn23,
      r: fn25,
      mt: fn16,
      mc: fn10,
      pc: fn20,
      pbc: fn12,
      n: fn29,
      o: val
    };
  return {
    render: fn30,
    hydrate: void 0,
    createApp: zz216(fn30)
  };
}
function zz266({
  type: zz267,
  props: zz268
}, val3) {
  return val3 === "svg" && zz267 === "foreignObject" || val3 === "mathml" && zz267 === "annotation-xml" && zz268 && zz268.encoding && zz268.encoding.includes("html") ? void 0 : val3;
}
/* 事件处理函数：on */
function zz269({
  effect: zz270,
  job: zz271
}, val3) {
  val3 ? (zz270.flags |= 32, zz271.flags |= 4) : (zz270.flags &= -33, zz271.flags &= -5);
}
function zz272(val, val2) {
  return (!val || val && !val.pendingBranch) && val2 && !val2.persisted;
}
function zz273(val, val2, zz274 = !1) {
  const val4 = val.children,
    val5 = val2.children;
  if (ce(val4) && ce(val5)) for (let num = 0; num < val4.length; num++) {
    const val1 = val4[num];
    let val6 = val5[num];
    val6.shapeFlag & 1 && !val6.dynamicChildren && ((val6.patchFlag <= 0 || val6.patchFlag === 32) && (val6 = val5[num] = zz320(val5[num]), val6.el = val1.el), !zz274 && val6.patchFlag !== -2 && zz273(val1, val6)), val6.type === br && (val6.patchFlag !== -1 ? val6.el = val1.el : val6.__elIndex = num + (val.type === Fragment ? 1 : 0)), val6.type === ze && !val6.el && (val6.el = val1.el);
  }
}
function zz275(val) {
  const val2 = val.slice(),
    list = [0];
  let val3, val4, val5, val6, val7;
  const val8 = val.length;
  for (val3 = 0; val3 < val8; val3++) {
    const val1 = val[val3];
    if (val1 !== 0) {
      if (val4 = list[list.length - 1], val[val4] < val1) {
        val2[val3] = val4, list.push(val3);
        continue;
      }
      for (val5 = 0, val6 = list.length - 1; val5 < val6;) val7 = val5 + val6 >> 1, val[list[val7]] < val1 ? val5 = val7 + 1 : val6 = val7;
      val1 < val[list[val5]] && (val5 > 0 && (val2[val3] = list[val5 - 1]), list[val5] = val3);
    }
  }
  for (val5 = list.length, val6 = list[val5 - 1]; val5-- > 0;) list[val5] = val6, val6 = val2[val6];
  return list;
}
function zz276(val) {
  const val2 = val.subTree.component;
  if (val2) return val2.asyncDep && !val2.asyncResolved ? val2 : zz276(val2);
}
function zz277(val) {
  if (val) for (let num = 0; num < val.length; num++) val[num].flags |= 8;
}
function zz278(val) {
  if (val.placeholder) return val.placeholder;
  const val2 = val.component;
  return val2 ? zz278(val2.subTree) : null;
}
const Ja = val => val.__isSuspense;
function zz279(val, val2) {
  val2 && val2.pendingBranch ? ce(val) ? val2.effects.push(...val) : val2.effects.push(val) : zz114(val);
}
const Fragment = Symbol.for("v-fgt"),
  br = Symbol.for("v-txt"),
  ze = Symbol.for("v-cmt"),
  Hs = Symbol.for("v-stc"),
  ts = [];
let ct = null;
function zz280(zz281 = !1) {
  ts.push(ct = zz281 ? null : []);
}
function zz282() {
  ts.pop(), ct = ts[ts.length - 1] || null;
}
let cs = 1;
function zz283(val, zz284 = !1) {
  cs += val, val < 0 && ct && zz284 && (ct.hasOnce = !0);
}
function zz285(val) {
  return val.dynamicChildren = cs > 0 ? ct || Sn : null, zz282(), cs > 0 && ct && ct.push(val), val;
}
function zz286(val, val2, val3, val4, val5, val6) {
  return zz285(zz294(val, val2, val3, val4, val5, val6, !0));
}
function zz287(val, val2, val3, val4, val5) {
  return zz285(createVNode(val, val2, val3, val4, val5, !0));
}
function zz288(val) {
  return val ? val.__v_isVNode === !0 : !1;
}
function zz289(val, val2) {
  return val.type === val2.type && val.key === val2.key;
}
const Xa = ({
    key: zz290
  }) => zz290 ?? null,
  Us = ({
    ref: zz291,
    ref_key: zz292,
    ref_for: zz293
  }) => (typeof zz291 == "number" && (zz291 = "" + zz291), zz291 != null ? Le(zz291) || zz82(zz291) || me(zz291) ? {
    i: Ke,
    r: zz291,
    k: zz292,
    f: !!zz293
  } : zz291 : null);
function zz294(val, zz295 = null, zz296 = null, zz297 = 0, zz298 = null, zz299 = val === Fragment ? 0 : 1, zz300 = !1, zz301 = !1) {
  const obj1 = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: val,
    props: zz295,
    key: zz295 && Xa(zz295),
    ref: zz295 && Us(zz295),
    scopeId: ha,
    slotScopeIds: null,
    children: zz296,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: zz299,
    patchFlag: zz297,
    dynamicProps: zz298,
    dynamicChildren: null,
    appContext: null,
    ctx: Ke
  };
  return zz301 ? (zz321(obj1, zz296), zz299 & 128 && val.normalize(obj1)) : zz296 && (obj1.shapeFlag |= Le(zz296) ? 8 : 16), cs > 0 && !zz300 && ct && (obj1.patchFlag > 0 || zz299 & 6) && obj1.patchFlag !== 32 && ct.push(obj1), obj1;
}
const createVNode = zz302;
function zz302(val, zz303 = null, zz304 = null, zz305 = 0, zz306 = null, zz307 = !1) {
  if ((!val || val === Ma) && (val = ze), zz288(val)) {
    const val1 = zz309(val, zz303, !0);
    return zz304 && zz321(val1, zz304), cs > 0 && !zz307 && ct && (val1.shapeFlag & 6 ? ct[ct.indexOf(val)] = val1 : ct.push(val1)), val1.patchFlag = -2, val1;
  }
  if (zz338(val) && (val = val.__vccOpts), zz303) {
    zz303 = zz308(zz303);
    let {
      class: val1,
      style: val8
    } = zz303;
    val1 && !Le(val1) && (zz303.class = zz11(val1)), Te(val8) && (zz79(val8) && !ce(val8) && (val8 = Ve({}, val8)), zz303.style = zz8(val8));
  }
  const val7 = Le(val) ? 1 : Ja(val) ? 128 : ba(val) ? 64 : Te(val) ? 4 : me(val) ? 2 : 0;
  return zz294(val, zz303, zz304, zz305, zz306, val7, zz307, !0);
}
function zz308(val) {
  return val ? zz79(val) || Ua(val) ? Ve({}, val) : val : null;
}
function zz309(val, val2, zz310 = !1, zz311 = !1) {
  const {
      props: val5,
      ref: val6,
      patchFlag: val7,
      children: val8,
      transition: val9
    } = val,
    val10 = val2 ? zz322(val5 || {}, val2) : val5,
    obj1 = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: val.type,
      props: val10,
      key: val10 && Xa(val10),
      ref: val2 && val2.ref ? zz310 && val6 ? ce(val6) ? val6.concat(Us(val2)) : [val6, Us(val2)] : Us(val2) : val6,
      scopeId: val.scopeId,
      slotScopeIds: val.slotScopeIds,
      children: val8,
      target: val.target,
      targetStart: val.targetStart,
      targetAnchor: val.targetAnchor,
      staticCount: val.staticCount,
      shapeFlag: val.shapeFlag,
      patchFlag: val2 && val.type !== Fragment ? val7 === -1 ? 16 : val7 | 16 : val7,
      dynamicProps: val.dynamicProps,
      dynamicChildren: val.dynamicChildren,
      appContext: val.appContext,
      dirs: val.dirs,
      transition: val9,
      component: val.component,
      suspense: val.suspense,
      ssContent: val.ssContent && zz309(val.ssContent),
      ssFallback: val.ssFallback && zz309(val.ssFallback),
      placeholder: val.placeholder,
      el: val.el,
      anchor: val.anchor,
      ctx: val.ctx,
      ce: val.ce
    };
  return val9 && zz311 && zz155(obj1, val9.clone(obj1)), obj1;
}
function zz312(zz313 = " ", zz314 = 0) {
  return createVNode(br, null, zz313, zz314);
}
function zz315(val, val2) {
  const vNode = createVNode(Hs, null, val);
  return vNode.staticCount = val2, vNode;
}
/* 渲染函数：构建组件模板 DOM 结构 */
function zz316(zz317 = "", zz318 = !1) {
  return zz318 ? (zz280(), zz287(ze, null, zz317)) : createVNode(ze, null, zz317);
}
function zz319(val) {
  return val == null || typeof val == "boolean" ? createVNode(ze) : ce(val) ? createVNode(Fragment, null, val.slice()) : zz288(val) ? zz320(val) : createVNode(br, null, String(val));
}
function zz320(val) {
  return val.el === null && val.patchFlag !== -1 || val.memo ? val : zz309(val);
}
function zz321(val, val2) {
  let num = 0;
  const {
    shapeFlag: val3
  } = val;
  if (val2 == null) val2 = null;else if (ce(val2)) num = 16;else if (typeof val2 == "object") {
    if (val3 & 65) {
      const val1 = val2.default;
      val1 && (val1._c && (val1._d = !1), zz321(val, val1()), val1._c && (val1._d = !0));
      return;
    } else {
      num = 32;
      const val1 = val2._;
      !val1 && !Ua(val2) ? val2._ctx = Ke : val1 === 3 && Ke && (Ke.slots._ === 1 ? val2._ = 1 : (val2._ = 2, val.patchFlag |= 1024));
    }
  } else me(val2) ? (val2 = {
    default: val2,
    _ctx: Ke
  }, num = 32) : (val2 = String(val2), val3 & 64 ? (num = 16, val2 = [zz312(val2)]) : num = 8);
  val.children = val2, val.shapeFlag |= num;
}
function zz322(...val) {
  const obj1 = {};
  for (let num = 0; num < val.length; num++) {
    const val1 = val[num];
    for (const zz323 in val1) if (zz323 === "class") obj1.class !== val1.class && (obj1.class = zz11([obj1.class, val1.class]));else if (zz323 === "style") obj1.style = zz8([obj1.style, val1.style]);else if (ir(zz323)) {
      const val2 = obj1[zz323],
        val3 = val1[zz323];
      val3 && val2 !== val3 && !(ce(val2) && val2.includes(val3)) && (obj1[zz323] = val2 ? [].concat(val2, val3) : val3);
    } else zz323 !== "" && (obj1[zz323] = val1[zz323]);
  }
  return obj1;
}
function zz324(val, val2, val3, zz325 = null) {
  zz104(val, val2, 7, [val3, zz325]);
}
const Gd = zz215();
let zd = 0;
function zz326(val, val2, val3) {
  const val4 = val.type,
    val5 = (val2 ? val2.appContext : val.appContext) || Gd,
    obj1 = {
      uid: zd++,
      vnode: val,
      type: val4,
      parent: val2,
      appContext: val5,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new zz19(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: val2 ? val2.provides : Object.create(val5.provides),
      ids: val2 ? val2.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: zz236(val4, val5),
      emitsOptions: zz219(val4, val5),
      emit: null,
      emitted: null,
      propsDefaults: ke,
      inheritAttrs: val4.inheritAttrs,
      ctx: ke,
      data: ke,
      props: ke,
      attrs: ke,
      slots: ke,
      refs: ke,
      setupState: ke,
      setupContext: null,
      suspense: val3,
      suspenseId: val3 ? val3.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return obj1.ctx = {
    _: obj1
  }, obj1.root = val2 ? val2.root : obj1, obj1.emit = zz218.bind(null, obj1), val.ce && val.ce(obj1), obj1;
}
let Qe = null;
const wr = () => Qe || Ke;
let er, go;
{
  const val = dr(),
    fn1 = (val1, val2) => {
      let val3;
      return (val3 = val[val1]) || (val3 = val[val1] = []), val3.push(val2), val4 => {
        val3.length > 1 ? val3.forEach(val5 => val5(val4)) : val3[0](val4);
      };
    };
  er = fn1("__VUE_INSTANCE_SETTERS__", val1 => Qe = val1), go = fn1("__VUE_SSR_SETTERS__", val1 => ds = val1);
}
const ws = val => {
    const val2 = Qe;
    return er(val), val.scope.on(), () => {
      val.scope.off(), er(val2);
    };
  },
  Ti = () => {
    Qe && Qe.scope.off(), er(null);
  };
function zz327(val) {
  return val.vnode.shapeFlag & 4;
}
let ds = !1;
function zz328(val, zz329 = !1, zz330 = !1) {
  zz329 && go(zz329);
  const {
      props: val4,
      children: val5
    } = val.vnode,
    val6 = zz327(val);
  zz228(val, val4, val6, zz329), Dd(val, val5, zz330 || zz329);
  const val7 = val6 ? zz331(val, zz329) : void 0;
  return zz329 && go(!1), val7;
}
function zz331(val, val2) {
  const val3 = val.type;
  val.accessCache = Object.create(null), val.proxy = new Proxy(val.ctx, vd);
  const {
    setup: val4
  } = val3;
  if (val4) {
    zz38();
    const val1 = val.setupContext = val4.length > 1 ? zz334(val) : null,
      val5 = ws(val),
      val6 = zz103(val4, val, 0, [val.props, val1]),
      val7 = $l(val6);
    if (zz39(), val5(), (val7 || val.sp) && !kn(val) && zz161(val), val7) {
      if (val6.then(Ti, Ti), val2) return val6.then(val8 => {
        zz332(val, val8);
      }).catch(val8 => {
        zz105(val8, val, 0);
      });
      val.asyncDep = val6;
    } else zz332(val, val6);
  } else zz333(val);
}
function zz332(val, val2, val3) {
  me(val2) ? val.type.__ssrInlineRender ? val.ssrRender = val2 : val.render = val2 : Te(val2) && (val.setupState = zz88(val2)), zz333(val);
}
function zz333(val, val2, val3) {
  const val4 = val.type;
  val.render || (val.render = val4.render || Pt);
  {
    const val1 = ws(val);
    zz38();
    try {
      zz197(val);
    } finally {
      zz39(), val1();
    }
  }
}
const Xd = {
  get(val, val2) {
    return zz46(val, "get", ""), val[val2];
  }
};
function zz334(val) {
  const fn1 = val1 => {
    val.exposed = val1 || {};
  };
  return {
    attrs: new Proxy(val.attrs, Xd),
    slots: val.slots,
    emit: val.emit,
    expose: fn1
  };
}
function zz335(val) {
  return val.exposed ? val.exposeProxy || (val.exposeProxy = new Proxy(zz88(zz81(val.exposed)), {
    get(val1, val2) {
      if (val2 in val1) return val1[val2];
      if (val2 in es) return es[val2](val);
    },
    has(val1, val2) {
      return val2 in val1 || val2 in es;
    }
  })) : val.proxy;
}
function zz336(val, zz337 = !0) {
  return me(val) ? val.displayName || val.name : val.name || zz337 && val.__name;
}
function zz338(val) {
  return me(val) && "__vccOpts" in val;
}
const applyDirectives = (val, val2) => zz93(val, val2, ds);
function zz339(val, val2, val3) {
  try {
    zz283(-1);
    const argumentsLength = arguments.length;
    return argumentsLength === 2 ? Te(val2) && !ce(val2) ? zz288(val2) ? createVNode(val, null, [val2]) : createVNode(val, val2) : createVNode(val, null, val2) : (argumentsLength > 3 ? val3 = Array.prototype.slice.call(arguments, 2) : argumentsLength === 3 && zz288(val3) && (val3 = [val3]), createVNode(val, val2, val3));
  } finally {
    zz283(1);
  }
}
const nf = "3.5.26";
let vo;
const Oi = typeof window < "u" && window.trustedTypes;
if (Oi) try {
  vo = Oi.createPolicy("vue", {
    createHTML: val => val
  });
} catch {}
const tc = vo ? val => vo.createHTML(val) : val => val,
  sf = "http://www.w3.org/2000/svg",
  rf = "http://www.w3.org/1998/Math/MathML",
  Lt = typeof document < "u" ? document : null,
  Pi = Lt && Lt.createElement("template"),
  of = {
    insert: (val, val2, val3) => {
      val2.insertBefore(val, val3 || null);
    },
    remove: val => {
      const val2 = val.parentNode;
      val2 && val2.removeChild(val);
    },
    createElement: (val, val2, val3, val4) => {
      const val5 = val2 === "svg" ? Lt.createElementNS(sf, val) : val2 === "mathml" ? Lt.createElementNS(rf, val) : val3 ? Lt.createElement(val, {
        is: val3
      }) : Lt.createElement(val);
      return val === "select" && val4 && val4.multiple != null && val5.setAttribute("multiple", val4.multiple), val5;
    },
    createText: val => Lt.createTextNode(val),
    createComment: val => Lt.createComment(val),
    setText: (val, val2) => {
      val.nodeValue = val2;
    },
    setElementText: (val, val2) => {
      val.textContent = val2;
    },
    parentNode: val => val.parentNode,
    nextSibling: val => val.nextSibling,
    querySelector: val => Lt.querySelector(val),
    setScopeId(val, val2) {
      val.setAttribute(val2, "");
    },
    insertStaticContent(val, val2, val3, val4, val5, val6) {
      const val7 = val3 ? val3.previousSibling : val2.lastChild;
      if (val5 && (val5 === val6 || val5.nextSibling)) for (; val2.insertBefore(val5.cloneNode(!0), val3), !(val5 === val6 || !(val5 = val5.nextSibling)););else {
        Pi.innerHTML = tc(val4 === "svg" ? `<svg>${val}</svg>` : val4 === "mathml" ? `<math>${val}</math>` : val);
        const PiContent = Pi.content;
        if (val4 === "svg" || val4 === "mathml") {
          const val8 = PiContent.firstChild;
          for (; val8.firstChild;) PiContent.appendChild(val8.firstChild);
          PiContent.removeChild(val8);
        }
        val2.insertBefore(PiContent, val3);
      }
      return [val7 ? val7.nextSibling : val2.firstChild, val3 ? val3.previousSibling : val2.lastChild];
    }
  },
  jt = "transition",
  Un = "animation",
  In = Symbol("_vtc"),
  nc = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  },
  sc = Ve({}, xa, nc),
  lf = val => (val.displayName = "Transition", val.props = sc, val),
  withSlots = lf((val, {
    slots: zz340
  }) => zz339(id, zz342(val), zz340)),
  ln = (val, zz341 = []) => {
    ce(val) ? val.forEach(val1 => val1(...zz341)) : val && val(...zz341);
  },
  Ii = val => val ? ce(val) ? val.some(val1 => val1.length > 1) : val.length > 1 : !1;
function zz342(val) {
  const obj1 = {};
  for (const val_tdz16 in val) val_tdz16 in nc || (obj1[val_tdz16] = val[val_tdz16]);
  if (val.css === !1) return obj1;
  const {
      name: val4 = "v",
      type: val2,
      duration: val3,
      enterFromClass: val5 = `${val4}-enter-from`,
      enterActiveClass: val6 = `${val4}-enter-active`,
      enterToClass: val7 = `${val4}-enter-to`,
      appearFromClass: val8 = val5,
      appearActiveClass: val9 = val6,
      appearToClass: val10 = val7,
      leaveFromClass: val11 = `${val4}-leave-from`,
      leaveActiveClass: val12 = `${val4}-leave-active`,
      leaveToClass: val13 = `${val4}-leave-to`
    } = val,
    val14 = zz343(val3),
    val15 = val14 && val14[0],
    val16 = val14 && val14[1],
    {
      onBeforeEnter: val17,
      onEnter: val18,
      onEnterCancelled: val19,
      onLeave: val20,
      onLeaveCancelled: val21,
      onBeforeAppear: val22 = val17,
      onAppear: val23 = val18,
      onAppearCancelled: val24 = val19
    } = obj1,
    fn1 = (val1, val25, val26, val27) => {
      val1._enterCancelled = val27, zz346(val1, val25 ? val10 : val7), zz346(val1, val25 ? val9 : val6), val26 && val26();
    },
    fn2 = (val1, val25) => {
      val1._isLeaving = !1, zz346(val1, val11), zz346(val1, val13), zz346(val1, val12), val25 && val25();
    },
    fn3 = val1 => (val25, val26) => {
      const val27 = val1 ? val23 : val18,
        fn4 = () => fn1(val25, val1, val26);
      ln(val27, [val25, fn4]), zz347(() => {
        zz346(val25, val1 ? val8 : val5), zz345(val25, val1 ? val10 : val7), Ii(val27) || zz348(val25, val2, val15, fn4);
      });
    };
  return Ve(obj1, {
    onBeforeEnter(val1) {
      ln(val17, [val1]), zz345(val1, val5), zz345(val1, val6);
    },
    onBeforeAppear(val1) {
      ln(val22, [val1]), zz345(val1, val8), zz345(val1, val9);
    },
    onEnter: fn3(!1),
    onAppear: fn3(!0),
    onLeave(val1, val25) {
      val1._isLeaving = !0;
      const fn4 = () => fn2(val1, val25);
      zz345(val1, val11), val1._enterCancelled ? (zz345(val1, val12), zz352(val1)) : (zz352(val1), zz345(val1, val12)), zz347(() => {
        val1._isLeaving && (zz346(val1, val11), zz345(val1, val13), Ii(val20) || zz348(val1, val2, val16, fn4));
      }), ln(val20, [val1, fn4]);
    },
    onEnterCancelled(val1) {
      fn1(val1, !1, void 0, !0), ln(val19, [val1]);
    },
    onAppearCancelled(val1) {
      fn1(val1, !0, void 0, !0), ln(val24, [val1]);
    },
    onLeaveCancelled(val1) {
      fn2(val1), ln(val21, [val1]);
    }
  });
}
function zz343(val) {
  if (val == null) return null;
  if (Te(val)) return [zz344(val.enter), zz344(val.leave)];
  {
    const val1 = zz344(val);
    return [val1, val1];
  }
}
function zz344(val) {
  return pu(val);
}
function zz345(val, val2) {
  val2.split(/\s+/).forEach(val1 => val1 && val.classList.add(val1)), (val[In] || (val[In] = new Set())).add(val2);
}
function zz346(val, val2) {
  val2.split(/\s+/).forEach(val1 => val1 && val.classList.remove(val1));
  const val3 = val[In];
  val3 && (val3.delete(val2), val3.size || (val[In] = void 0));
}
function zz347(val) {
  requestAnimationFrame(() => {
    requestAnimationFrame(val);
  });
}
let cf = 0;
function zz348(val, val2, val3, val4) {
  const val5 = val._endId = ++cf,
    fn1 = () => {
      val5 === val._endId && val4();
    };
  if (val3 != null) return setTimeout(fn1, val3);
  const {
    type: val6,
    timeout: val7,
    propCount: val8
  } = zz349(val, val2);
  if (!val6) return val4();
  const val9 = val6 + "end";
  let num = 0;
  const fn2 = () => {
      val.removeEventListener(val9, fn3), fn1();
    },
    fn3 = val1 => {
      val1.target === val && ++num >= val8 && fn2();
    };
  setTimeout(() => {
    num < val8 && fn2();
  }, val7 + 1), val.addEventListener(val9, fn3);
}
function zz349(val, val2) {
  const computedStyle = window.getComputedStyle(val),
    fn1 = val1 => (computedStyle[val1] || "").split(", "),
    val4 = fn1(`${jt}Delay`),
    val5 = fn1(`${jt}Duration`),
    val6 = zz350(val4, val5),
    val7 = fn1(`${Un}Delay`),
    val8 = fn1(`${Un}Duration`),
    val9 = zz350(val7, val8);
  let val10 = null,
    num = 0,
    num2 = 0;
  val2 === jt ? val6 > 0 && (val10 = jt, num = val6, num2 = val5.length) : val2 === Un ? val9 > 0 && (val10 = Un, num = val9, num2 = val8.length) : (num = Math.max(val6, val9), val10 = num > 0 ? val6 > val9 ? jt : Un : null, num2 = val10 ? val10 === jt ? val5.length : val8.length : 0);
  const val11 = val10 === jt && /\b(?:transform|all)(?:,|$)/.test(fn1(`${jt}Property`).toString());
  return {
    type: val10,
    timeout: num,
    propCount: num2,
    hasTransform: val11
  };
}
function zz350(val, val2) {
  for (; val.length < val2.length;) val = val.concat(val);
  return Math.max(...val2.map((val1, val3) => zz351(val1) + zz351(val[val3])));
}
function zz351(val) {
  return val === "auto" ? 0 : Number(val.slice(0, -1).replace(",", ".")) * 1e3;
}
function zz352(val) {
  return (val ? val.ownerDocument : document).body.offsetHeight;
}
function zz353(val, val2, val3) {
  const val4 = val[In];
  val4 && (val2 = (val2 ? [val2, ...val4] : [...val4]).join(" ")), val2 == null ? val.removeAttribute("class") : val3 ? val.setAttribute("class", val2) : val.className = val2;
}
const tr = Symbol("_vod"),
  ic = Symbol("_vsh"),
  modalShowDef = {
    name: "show",
    beforeMount(val, {
      value: zz354
    }, {
      transition: zz355
    }) {
      val[tr] = val.style.display === "none" ? "" : val.style.display, zz355 && zz354 ? zz355.beforeEnter(val) : zz362(val, zz354);
    },
    mounted(val, {
      value: zz356
    }, {
      transition: zz357
    }) {
      zz357 && zz356 && zz357.enter(val);
    },
    updated(val, {
      value: zz358,
      oldValue: zz359
    }, {
      transition: zz360
    }) {
      !zz358 != !zz359 && (zz360 ? zz358 ? (zz360.beforeEnter(val), zz362(val, !0), zz360.enter(val)) : zz360.leave(val, () => {
        zz362(val, !1);
      }) : zz362(val, zz358));
    },
    beforeUnmount(val, {
      value: zz361
    }) {
      zz362(val, zz361);
    }
  };
function zz362(val, val2) {
  val.style.display = val2 ? val[tr] : "none", val[ic] = !val2;
}
const df = Symbol(""),
  ff = /(?:^|;)\s*display\s*:/;
function zz363(val, val2, val3) {
  const val4 = val.style,
    val5 = Le(val3);
  let val6 = !1;
  if (val3 && !val5) {
    if (val2) if (Le(val2)) for (const zz364 of val2.split(";")) {
      const val1 = zz364.slice(0, zz364.indexOf(":")).trim();
      val3[val1] == null && zz367(val4, val1, "");
    } else for (const zz365 in val2) val3[zz365] == null && zz367(val4, zz365, "");
    for (const zz366 in val3) zz366 === "display" && (val6 = !0), zz367(val4, zz366, val3[zz366]);
  } else if (val5) {
    if (val2 !== val3) {
      const val1 = val4[df];
      val1 && (val3 += ";" + val1), val4.cssText = val3, val6 = ff.test(val3);
    }
  } else val2 && val.removeAttribute("style");
  tr in val && (val[tr] = val6 ? val4.display : "", val[ic] && (val4.display = "none"));
}
const Bi = /\s*!important$/;
function zz367(val, val2, val3) {
  if (ce(val3)) val3.forEach(val1 => zz367(val, val2, val1));else if (val3 == null && (val3 = ""), val2.startsWith("--")) val.setProperty(val2, val3);else {
    const val1 = zz368(val, val2);
    Bi.test(val3) ? val.setProperty(sn(val1), val3.replace(Bi, ""), "important") : val[val1] = val3;
  }
}
const $i = ["Webkit", "Moz", "ms"],
  jr = {};
function zz368(val, val2) {
  const val3 = jr[val2];
  if (val3) return val3;
  let val4 = mt(val2);
  if (val4 !== "filter" && val4 in val) return jr[val2] = val4;
  val4 = cr(val4);
  for (let num = 0; num < $i.length; num++) {
    const val1 = $i[num] + val4;
    if (val1 in val) return jr[val2] = val1;
  }
  return val2;
}
const Fi = "http://www.w3.org/1999/xlink";
function zz369(val, val2, val3, val4, val5, zz370 = bu(val2)) {
  val4 && val2.startsWith("xlink:") ? val3 == null ? val.removeAttributeNS(Fi, val2.slice(6, val2.length)) : val.setAttributeNS(Fi, val2, val3) : val3 == null || zz370 && !zz12(val3) ? val.removeAttribute(val2) : val.setAttribute(val2, zz370 ? "" : vt(val3) ? String(val3) : val3);
}
function zz371(val, val2, val3, val4, val5) {
  if (val2 === "innerHTML" || val2 === "textContent") {
    val3 != null && (val[val2] = val2 === "innerHTML" ? tc(val3) : val3);
    return;
  }
  const val6 = val.tagName;
  if (val2 === "value" && val6 !== "PROGRESS" && !val6.includes("-")) {
    const val1 = val6 === "OPTION" ? val.getAttribute("value") || "" : val.value,
      val8 = val3 == null ? val.type === "checkbox" ? "on" : "" : String(val3);
    (val1 !== val8 || !("_value" in val)) && (val.value = val8), val3 == null && val.removeAttribute(val2), val._value = val3;
    return;
  }
  let val7 = !1;
  if (val3 === "" || val3 == null) {
    const val1 = typeof val[val2];
    val1 === "boolean" ? val3 = zz12(val3) : val3 == null && val1 === "string" ? (val3 = "", val7 = !0) : val1 === "number" && (val3 = 0, val7 = !0);
  }
  try {
    val[val2] = val3;
  } catch {}
  val7 && val.removeAttribute(val5 || val2);
}
function zz372(val, val2, val3, val4) {
  val.addEventListener(val2, val3, val4);
}
function zz373(val, val2, val3, val4) {
  val.removeEventListener(val2, val3, val4);
}
const Ui = Symbol("_vei");
function zz374(val, val2, val3, val4, zz375 = null) {
  const val6 = val[Ui] || (val[Ui] = {}),
    val7 = val6[val2];
  if (val4 && val7) val7.value = val4;else {
    const [val1, val8] = zz376(val2);
    if (val4) {
      const val9 = val6[val2] = zz377(val4, zz375);
      zz372(val, val1, val9, val8);
    } else val7 && (zz373(val, val1, val7, val8), val6[val2] = void 0);
  }
}
const qi = /(?:Once|Passive|Capture)$/;
function zz376(val) {
  let val2;
  if (qi.test(val)) {
    val2 = {};
    let val1;
    for (; val1 = val.match(qi);) val = val.slice(0, val.length - val1[0].length), val2[val1[0].toLowerCase()] = !0;
  }
  return [val[2] === ":" ? val.slice(3) : sn(val.slice(2)), val2];
}
let Kr = 0;
const yf = Promise.resolve(),
  bf = () => Kr || (yf.then(() => Kr = 0), Kr = Date.now());
function zz377(val, val2) {
  const fn1 = val1 => {
    if (!val1._vts) val1._vts = Date.now();else if (val1._vts <= fn1.attached) return;
    zz104(zz378(val1, fn1.value), val2, 5, [val1]);
  };
  return fn1.value = val, fn1.attached = bf(), fn1;
}
function zz378(val, val2) {
  if (ce(val2)) {
    const val1 = val.stopImmediatePropagation;
    return val.stopImmediatePropagation = () => {
      val1.call(val), val._stopped = !0;
    }, val2.map(val3 => val4 => !val4._stopped && val3 && val3(val4));
  } else return val2;
}
const ji = val => val.charCodeAt(0) === 111 && val.charCodeAt(1) === 110 && val.charCodeAt(2) > 96 && val.charCodeAt(2) < 123,
  Ef = (val, val2, val3, val4, val5, val6) => {
    const val7 = val5 === "svg";
    val2 === "class" ? zz353(val, val4, val7) : val2 === "style" ? zz363(val, val3, val4) : ir(val2) ? Po(val2) || zz374(val, val2, val3, val4, val6) : (val2[0] === "." ? (val2 = val2.slice(1), !0) : val2[0] === "^" ? (val2 = val2.slice(1), !1) : zz379(val, val2, val4, val7)) ? (zz371(val, val2, val4), !val.tagName.includes("-") && (val2 === "value" || val2 === "checked" || val2 === "selected") && zz369(val, val2, val4, val7, val6, val2 !== "value")) : val._isVueCE && (/[A-Z]/.test(val2) || !Le(val4)) ? zz371(val, mt(val2), val4, val6, val2) : (val2 === "true-value" ? val._trueValue = val4 : val2 === "false-value" && (val._falseValue = val4), zz369(val, val2, val4, val7));
  };
function zz379(val, val2, val3, val4) {
  if (val4) return !!(val2 === "innerHTML" || val2 === "textContent" || val2 in val && ji(val2) && me(val3));
  if (val2 === "spellcheck" || val2 === "draggable" || val2 === "translate" || val2 === "autocorrect" || val2 === "sandbox" && val.tagName === "IFRAME" || val2 === "form" || val2 === "list" && val.tagName === "INPUT" || val2 === "type" && val.tagName === "TEXTAREA") return !1;
  if (val2 === "width" || val2 === "height") {
    const val1 = val.tagName;
    if (val1 === "IMG" || val1 === "VIDEO" || val1 === "CANVAS" || val1 === "SOURCE") return !1;
  }
  return ji(val2) && Le(val3) ? !1 : val2 in val;
}
const lc = new WeakMap(),
  ac = new WeakMap(),
  nr = Symbol("_moveCb"),
  Ki = Symbol("_enterCb"),
  Cf = val => (delete val.props.mode, val),
  Af = Cf({
    name: "TransitionGroup",
    props: Ve({}, sc, {
      tag: String,
      moveClass: String
    }),
    setup(val, {
      slots: zz380
    }) {
      const val3 = wr(),
        val4 = zz148();
      let val5, val6;
      return ka(() => {
        if (!val5.length) return;
        const val1 = val.moveClass || `${val.name || "v"}-move`;
        if (!zz384(val5[0].el, val3.vnode.el, val1)) {
          val5 = [];
          return;
        }
        val5.forEach(zz381), val5.forEach(zz382);
        const val7 = val5.filter(zz383);
        zz352(val3.vnode.el), val7.forEach(val8 => {
          const val9 = val8.el,
            val10 = val9.style;
          zz345(val9, val1), val10.transform = val10.webkitTransform = val10.transitionDuration = "";
          const val11 = val9[nr] = val12 => {
            val12 && val12.target !== val9 || (!val12 || val12.propertyName.endsWith("transform")) && (val9.removeEventListener("transitionend", val11), val9[nr] = null, zz346(val9, val1));
          };
          val9.addEventListener("transitionend", val11);
        }), val5 = [];
      }), () => {
        const val1 = zz80(val),
          val7 = zz342(val1);
        let val8 = val1.tag || Fragment;
        if (val5 = [], val6) for (let num = 0; num < val6.length; num++) {
          const val9 = val6[num];
          val9.el && val9.el instanceof Element && (val5.push(val9), zz155(val9, zz152(val9, val7, val4, val3)), lc.set(val9, {
            left: val9.el.offsetLeft,
            top: val9.el.offsetTop
          }));
        }
        val6 = zz380.default ? zz156(zz380.default()) : [];
        for (let num = 0; num < val6.length; num++) {
          const val9 = val6[num];
          val9.key != null && zz155(val9, zz152(val9, val7, val4, val3));
        }
        return createVNode(val8, null, val6);
      };
    }
  }),
  TransitionGroup = Af;
function zz381(val) {
  const val2 = val.el;
  val2[nr] && val2[nr](), val2[Ki] && val2[Ki]();
}
function zz382(val) {
  ac.set(val, {
    left: val.el.offsetLeft,
    top: val.el.offsetTop
  });
}
function zz383(val) {
  const val2 = lc.get(val),
    val3 = ac.get(val),
    val4 = val2.left - val3.left,
    val5 = val2.top - val3.top;
  if (val4 || val5) {
    const val1 = val.el.style;
    return val1.transform = val1.webkitTransform = `translate(${val4}px,${val5}px)`, val1.transitionDuration = "0s", val;
  }
}
function zz384(val, val2, val3) {
  const val4 = val.cloneNode(),
    val5 = val[In];
  val5 && val5.forEach(val1 => {
    val1.split(/\s+/).forEach(val8 => val8 && val4.classList.remove(val8));
  }), val3.split(/\s+/).forEach(val1 => val1 && val4.classList.add(val1)), val4.style.display = "none";
  const val6 = val2.nodeType === 1 ? val2 : val2.parentNode;
  val6.appendChild(val4);
  const {
    hasTransform: val7
  } = zz349(val4);
  return val6.removeChild(val4), val7;
}
const nn = val => {
  const val2 = val.props["onUpdate:modelValue"] || !1;
  return ce(val2) ? val1 => $s(val2, val1) : val2;
};
function zz385(val) {
  val.target.composing = !0;
}
function zz386(val) {
  const val2 = val.target;
  val2.composing && (val2.composing = !1, val2.dispatchEvent(new Event("input")));
}
const pt = Symbol("_assign");
function zz387(val, val2, val3) {
  return val2 && (val = val.trim()), val3 && (val = ur(val)), val;
}
const vModelText = {
    created(val, {
      modifiers: {
        lazy: zz388,
        trim: zz389,
        number: zz390
      }
    }, val5) {
      val[pt] = nn(val5);
      const val6 = zz390 || val5.props && val5.props.type === "number";
      zz372(val, zz388 ? "change" : "input", val1 => {
        val1.target.composing || val[pt](zz387(val.value, zz389, val6));
      }), (zz389 || val6) && zz372(val, "change", () => {
        val.value = zz387(val.value, zz389, val6);
      }), zz388 || (zz372(val, "compositionstart", zz385), zz372(val, "compositionend", zz386), zz372(val, "change", zz386));
    },
    mounted(val, {
      value: zz391
    }) {
      val.value = zz391 ?? "";
    },
    beforeUpdate(val, {
      value: zz392,
      oldValue: zz393,
      modifiers: {
        lazy: zz394,
        trim: zz395,
        number: zz396
      }
    }, val7) {
      if (val[pt] = nn(val7), val.composing) return;
      const val8 = (zz396 || val.type === "number") && !/^0\d/.test(val.value) ? ur(val.value) : val.value,
        val9 = zz392 ?? "";
      val8 !== val9 && (document.activeElement === val && val.type !== "range" && (zz394 && zz392 === zz393 || zz395 && val.value.trim() === val9) || (val.value = val9));
    }
  },
  deepWatchOptions = {
    deep: !0,
    created(val, val2, val3) {
      val[pt] = nn(val3), zz372(val, "change", () => {
        const val1 = val._modelValue,
          val4 = zz408(val),
          val5 = val.checked,
          val6 = val[pt];
        if (ce(val1)) {
          const val7 = zz15(val1, val4),
            val8 = val7 !== -1;
          if (val5 && !val8) val6(val1.concat(val4));else if (!val5 && val8) {
            const list = [...val1];
            list.splice(val7, 1), val6(list);
          }
        } else if (Bn(val1)) {
          const set = new Set(val1);
          val5 ? set.add(val4) : set.delete(val4), val6(set);
        } else val6(zz409(val, val5));
      });
    },
    mounted: zz397,
    beforeUpdate(val, val2, val3) {
      val[pt] = nn(val3), zz397(val, val2, val3);
    }
  };
function zz397(val, {
  value: zz398,
  oldValue: zz399
}, val4) {
  val._modelValue = zz398;
  let val5;
  if (ce(zz398)) val5 = zz15(zz398, val4.props.value) > -1;else if (Bn(zz398)) val5 = zz398.has(val4.props.value);else {
    if (zz398 === zz399) return;
    val5 = zz14(zz398, zz409(val, !0));
  }
  val.checked !== val5 && (val.checked = val5);
}
const directiveCreated = {
    created(val, {
      value: zz400
    }, val3) {
      val.checked = zz14(zz400, val3.props.value), val[pt] = nn(val3), zz372(val, "change", () => {
        val[pt](zz408(val));
      });
    },
    beforeUpdate(val, {
      value: zz401,
      oldValue: zz402
    }, val4) {
      val[pt] = nn(val4), zz401 !== zz402 && (val.checked = zz14(zz401, val4.props.value));
    }
  },
  deepDirectiveOptions = {
    deep: !0,
    created(val, {
      value: zz403,
      modifiers: {
        number: zz404
      }
    }, val4) {
      const val5 = Bn(zz403);
      zz372(val, "change", () => {
        const val1 = Array.prototype.filter.call(val.options, val6 => val6.selected).map(val6 => zz404 ? ur(zz408(val6)) : zz408(val6));
        val[pt](val.multiple ? val5 ? new Set(val1) : val1 : val1[0]), val._assigning = !0, zz110(() => {
          val._assigning = !1;
        });
      }), val[pt] = nn(val4);
    },
    mounted(val, {
      value: zz405
    }) {
      zz407(val, zz405);
    },
    beforeUpdate(val, val2, val3) {
      val[pt] = nn(val3);
    },
    updated(val, {
      value: zz406
    }) {
      val._assigning || zz407(val, zz406);
    }
  };
function zz407(val, val2) {
  const val3 = val.multiple,
    val4 = ce(val2);
  if (!(val3 && !val4 && !Bn(val2))) {
    for (let num = 0, val_tdz17 = val.options.length; num < val_tdz17; num++) {
      const val1 = val.options[num],
        val5 = zz408(val1);
      if (val3) {
        if (val4) {
          const val6 = typeof val5;
          val6 === "string" || val6 === "number" ? val1.selected = val2.some(val7 => String(val7) === String(val5)) : val1.selected = zz15(val2, val5) > -1;
        } else val1.selected = val2.has(val5);
      } else if (zz14(zz408(val1), val2)) {
        val.selectedIndex !== num && (val.selectedIndex = num);
        return;
      }
    }
    !val3 && val.selectedIndex !== -1 && (val.selectedIndex = -1);
  }
}
function zz408(val) {
  return "_value" in val ? val._value : val.value;
}
function zz409(val, val2) {
  const val3 = val2 ? "_trueValue" : "_falseValue";
  return val3 in val ? val[val3] : val2;
}
const directiveHooks = {
  created(val, val2, val3) {
    zz411(val, val2, val3, null, "created");
  },
  mounted(val, val2, val3) {
    zz411(val, val2, val3, null, "mounted");
  },
  beforeUpdate(val, val2, val3, val4) {
    zz411(val, val2, val3, val4, "beforeUpdate");
  },
  updated(val, val2, val3, val4) {
    zz411(val, val2, val3, val4, "updated");
  }
};
function zz410(val, val2) {
  switch (val) {
    case "SELECT":
      return deepDirectiveOptions;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (val2) {
        case "checkbox":
          return deepWatchOptions;
        case "radio":
          return directiveCreated;
        default:
          return vModelText;
      }
  }
}
function zz411(val, val2, val3, val4, val5) {
  const val6 = zz410(val.tagName, val3.props && val3.props.type)[val5];
  val6 && val6(val, val2, val3, val4);
}
const Df = ["ctrl", "shift", "alt", "meta"],
  Bf = {
    stop: val => val.stopPropagation(),
    prevent: val => val.preventDefault(),
    self: val => val.target !== val.currentTarget,
    ctrl: val => !val.ctrlKey,
    shift: val => !val.shiftKey,
    alt: val => !val.altKey,
    meta: val => !val.metaKey,
    left: val => "button" in val && val.button !== 0,
    middle: val => "button" in val && val.button !== 1,
    right: val => "button" in val && val.button !== 2,
    exact: (val, val2) => Df.some(val1 => val[`${val1}Key`] && !val2.includes(val1))
  },
  withModifiers = (val, val2) => {
    const val3 = val._withMods || (val._withMods = {}),
      val4 = val2.join(".");
    return val3[val4] || (val3[val4] = (val1, ...val5) => {
      for (let num = 0; num < val2.length; num++) {
        const val6 = Bf[val2[num]];
        if (val6 && val6(val1, val2)) return;
      }
      return val(val1, ...val5);
    });
  },
  $f = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  },
  withKeys = (val, val2) => {
    const val3 = val._withKeys || (val._withKeys = {}),
      val4 = val2.join(".");
    return val3[val4] || (val3[val4] = val1 => {
      if (!("key" in val1)) return;
      const val5 = sn(val1.key);
      if (val2.some(val6 => val6 === val5 || $f[val6] === val5)) return val(val1);
    });
  },
  Ff = Ve({
    patchProp: Ef
  }, of);
let Ji;
function zz412() {
  return Ji || (Ji = zz242(Ff));
}
const Hf = (...val) => {
  const app = zz412().createApp(...val),
    {
      mount: val3
    } = app;
  return app.mount = val1 => {
    const val4 = zz414(val1);
    if (!val4) return;
    const val5 = app._component;
    !me(val5) && !val5.render && !val5.template && (val5.template = val4.innerHTML), val4.nodeType === 1 && (val4.textContent = "");
    const val6 = val3(val4, !1, zz413(val4));
    return val4 instanceof Element && (val4.removeAttribute("v-cloak"), val4.setAttribute("data-v-app", "")), val6;
  }, app;
};
function zz413(val) {
  if (val instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && val instanceof MathMLElement) return "mathml";
}
function zz414(val) {
  return Le(val) ? document.querySelector(val) : val;
}
let uc;
const Er = val => uc = val,
  dc = Symbol();
function zz415(val) {
  return val && typeof val == "object" && Object.prototype.toString.call(val) === "[object Object]" && typeof val.toJSON != "function";
}
var ss;
(function (val) {
  val.direct = "direct", val.patchObject = "patch object", val.patchFunction = "patch function";
})(ss || (ss = {}));
function zz416() {
  const val = zz21(!0),
    val2 = val.run(() => zz83({}));
  let list = [],
    list2 = [];
  const val3 = zz81({
    install(val1) {
      Er(val3), val3._a = val1, val1.provide(dc, val3), val1.config.globalProperties.$pinia = val3, list2.forEach(val4 => list.push(val4)), list2 = [];
    },
    use(val1) {
      return this._a ? list.push(val1) : list2.push(val1), this;
    },
    _p: list,
    _a: null,
    _e: val,
    _s: new Map(),
    state: val2
  });
  return val3;
}
const fc = () => {};
function zz417(val, val2, val3, zz418 = fc) {
  val.add(val2);
  const fn1 = () => {
    val.delete(val2) && zz418();
  };
  return !val3 && zz22() && zz23(fn1), fn1;
}
function zz419(val, ...val2) {
  val.forEach(val1 => {
    val1(...val2);
  });
}
const Kf = val => val(),
  Xi = Symbol(),
  Wr = Symbol();
function zz420(val, val2) {
  val instanceof Map && val2 instanceof Map ? val2.forEach((val1, val3) => val.set(val3, val1)) : val instanceof Set && val2 instanceof Set && val2.forEach(val.add, val);
  for (const zz421 in val2) {
    if (!val2.hasOwnProperty(zz421)) continue;
    const val1 = val2[zz421],
      val3 = val[zz421];
    zz415(val3) && zz415(val1) && val.hasOwnProperty(zz421) && !zz82(val1) && !zz76(val1) ? val[zz421] = zz420(val3, val1) : val[zz421] = val1;
  }
  return val;
}
const Wf = Symbol();
function zz422(val) {
  return !zz415(val) || !Object.prototype.hasOwnProperty.call(val, Wf);
}
const {
  assign: Gt
} = Object;
function zz423(val) {
  return !!(zz82(val) && val.effect);
}
function zz424(val, val2, val3, val4) {
  const {
      state: val5,
      actions: val6,
      getters: val7
    } = val2,
    val8 = val3.state.value[val];
  let val9;
  function zz425() {
    val8 || (val3.state.value[val] = val5 ? val5() : {});
    const val1 = zz89(val3.state.value[val]);
    return Gt(val1, val6, Object.keys(val7 || {}).reduce((val10, val11) => (val10[val11] = zz81(applyDirectives(() => {
      Er(val3);
      const val12 = val3._s.get(val);
      return val7[val11].call(val12, val12);
    })), val10), {}));
  }
  return val9 = zz426(val, zz425, val2, val3, val4, !0), val9;
}
function zz426(val, val2, zz427 = {}, val4, val5, val6) {
  let val7;
  const val8 = Gt({
      actions: {}
    }, zz427),
    obj1 = {
      deep: !0
    };
  let val9,
    val10,
    set = new Set(),
    set2 = new Set(),
    val11;
  const val12 = val4.state.value[val];
  !val6 && !val12 && (val4.state.value[val] = {}), zz83({});
  let val13;
  function zz428(val1) {
    let val17;
    val9 = val10 = !1, typeof val1 == "function" ? (val1(val4.state.value[val]), val17 = {
      type: ss.patchFunction,
      storeId: val,
      events: val11
    }) : (zz420(val4.state.value[val], val1), val17 = {
      type: ss.patchObject,
      payload: val1,
      storeId: val,
      events: val11
    });
    const val18 = val13 = Symbol();
    zz110().then(() => {
      val13 === val18 && (val9 = !0);
    }), val10 = !0, zz419(set, val17, val4.state.value[val]);
  }
  const val14 = val6 ? function () {
    const {
        state: val1
      } = zz427,
      val17 = val1 ? val1() : {};
    this.$patch(val18 => {
      Gt(val18, val17);
    });
  } : fc;
  function zz429() {
    val7.stop(), set.clear(), set2.clear(), val4._s.delete(val);
  }
  const fn1 = (val1, zz430 = "") => {
      if (Xi in val1) return val1[Wr] = zz430, val1;
      const zz431 = function () {
        Er(val4);
        const val18 = Array.from(arguments),
          set1 = new Set(),
          set3 = new Set();
        function zz432(val20) {
          set1.add(val20);
        }
        function zz433(val20) {
          set3.add(val20);
        }
        zz419(set2, {
          args: val18,
          name: zz431[Wr],
          store: val15,
          after: zz432,
          onError: zz433
        });
        let val19;
        try {
          val19 = val1.apply(this && this.$id === val ? this : val15, val18);
        } catch (val20) {
          throw zz419(set3, val20), val20;
        }
        return val19 instanceof Promise ? val19.then(val20 => (zz419(set1, val20), val20)).catch(val20 => (zz419(set3, val20), Promise.reject(val20))) : (zz419(set1, val19), val19);
      };
      return zz431[Xi] = !0, zz431[Wr] = zz430, zz431;
    },
    obj2 = {
      _p: val4,
      $id: val,
      $onAction: zz417.bind(null, set2),
      $patch: zz428,
      $reset: val14,
      $subscribe(val1, zz434 = {}) {
        const val18 = zz417(set, val1, zz434.detached, () => val19()),
          val19 = val7.run(() => zz128(() => val4.state.value[val], val20 => {
            (zz434.flush === "sync" ? val10 : val9) && val1({
              storeId: val,
              type: ss.direct,
              events: val11
            }, val20);
          }, Gt({}, obj1, zz434)));
        return val18;
      },
      $dispose: zz429
    },
    val15 = zz72(obj2);
  val4._s.set(val, val15);
  const val16 = (val4._a && val4._a.runWithContext || Kf)(() => val4._e.run(() => (val7 = zz21()).run(() => val2({
    action: fn1
  }))));
  for (const val_pcKey in val16) {
    const val1 = val16[val_pcKey];
    if (zz82(val1) && !zz423(val1) || zz76(val1)) val6 || (val12 && zz422(val1) && (zz82(val1) ? val1.value = val12[val_pcKey] : zz420(val1, val12[val_pcKey])), val4.state.value[val][val_pcKey] = val1);else if (typeof val1 == "function") {
      const val17 = fn1(val1, val_pcKey);
      val16[val_pcKey] = val17, val8.actions[val_pcKey] = val1;
    }
  }
  return Gt(val15, val16), Gt(zz80(val15), val16), Object.defineProperty(val15, "$state", {
    get: () => val4.state.value[val],
    set: val1 => {
      zz428(val17 => {
        Gt(val17, val1);
      });
    }
  }), val4._p.forEach(val1 => {
    Gt(val15, val7.run(() => val1({
      store: val15,
      app: val4._a,
      pinia: val4,
      options: val8
    })));
  }), val12 && val6 && zz427.hydrate && zz427.hydrate(val15.$state, val12), val9 = !0, val10 = !0, val15;
}
function zz435(val, val2, val3) {
  let val4;
  const val5 = typeof val2 == "function";
  val4 = val5 ? val3 : val2;
  function zz436(val1, val6) {
    const val7 = zz127();
    return val1 = val1 || (val7 ? zz125(dc, null) : null), val1 && Er(val1), val1 = uc, val1._s.has(val) || (val5 ? zz426(val, val2, val4, val1) : zz424(val, val4, val1)), val1._s.get(val);
  }
  return zz436.$id = val, zz436;
}
const An = typeof document < "u";
function zz437(val) {
  return typeof val == "object" || "displayName" in val || "props" in val || "__vccOpts" in val;
}
function zz438(val) {
  return val.__esModule || val[Symbol.toStringTag] === "Module" || val.default && zz437(val.default);
}
const Ae = Object.assign;
// vue-router applyToParams(fn, params)：val=fn(转换函数)、val2=params、zz440=key、val1=value
function zz439(val, val2) {
  const obj1 = {};
  for (const zz440 in val2) {
    const val1 = val2[zz440];
    obj1[zz440] = wt(val1) ? val1.map(val) : val(val1);
  }
  return obj1;
}
const rs = () => {},
  wt = Array.isArray;
function zz441(val, val2) {
  const obj1 = {};
  for (const val_tdz18 in val) obj1[val_tdz18] = val_tdz18 in val2 ? val2[val_tdz18] : val[val_tdz18];
  return obj1;
}
const hc = /#/g,
  Xf = /&/g,
  Zf = /\//g,
  ep = /=/g,
  tp = /\?/g,
  gc = /\+/g,
  np = /%5B/g,
  sp = /%5D/g,
  vc = /%5E/g,
  rp = /%60/g,
  yc = /%7B/g,
  op = /%7C/g,
  bc = /%7D/g,
  ip = /%20/g;
function zz442(val) {
  return val == null ? "" : encodeURI("" + val).replace(op, "|").replace(np, "[").replace(sp, "]");
}
function zz443(val) {
  return zz442(val).replace(yc, "{").replace(bc, "}").replace(vc, "^");
}
function zz444(val) {
  return zz442(val).replace(gc, "%2B").replace(ip, "+").replace(hc, "%23").replace(Xf, "%26").replace(rp, "`").replace(yc, "{").replace(bc, "}").replace(vc, "^");
}
function zz445(val) {
  return zz444(val).replace(ep, "%3D");
}
function zz446(val) {
  return zz442(val).replace(hc, "%23").replace(tp, "%3F");
}
function zz447(val) {
  return zz446(val).replace(Zf, "%2F");
}
function zz448(val) {
  if (val == null) return null;
  try {
    return decodeURIComponent("" + val);
  } catch {}
  return "" + val;
}
const dp = /\/$/,
  fp = val => val.replace(dp, "");
function zz449(val, val2, zz450 = "/") {
  let val4,
    obj1 = {},
    text = "",
    text2 = "";
  const val5 = val2.indexOf("#");
  let val6 = val2.indexOf("?");
  return val6 = val5 >= 0 && val6 > val5 ? -1 : val6, val6 >= 0 && (val4 = val2.slice(0, val6), text = val2.slice(val6, val5 > 0 ? val5 : val2.length), obj1 = val(text.slice(1))), val5 >= 0 && (val4 = val4 || val2.slice(0, val5), text2 = val2.slice(val5, val2.length)), val4 = zz459(val4 ?? val2, zz450), {
    fullPath: val4 + text + text2,
    path: val4,
    query: obj1,
    hash: zz448(text2)
  };
}
function zz451(val, val2) {
  const val3 = val2.query ? val(val2.query) : "";
  return val2.path + (val3 && "?") + val3 + (val2.hash || "");
}
function zz452(val, val2) {
  return !val2 || !val.toLowerCase().startsWith(val2.toLowerCase()) ? val : val.slice(val2.length) || "/";
}
function zz453(val, val2, val3) {
  const val4 = val2.matched.length - 1,
    val5 = val3.matched.length - 1;
  return val4 > -1 && val4 === val5 && zz454(val2.matched[val4], val3.matched[val5]) && zz455(val2.params, val3.params) && val(val2.query) === val(val3.query) && val2.hash === val3.hash;
}
function zz454(val, val2) {
  return (val.aliasOf || val) === (val2.aliasOf || val2);
}
function zz455(val, val2) {
  if (Object.keys(val).length !== Object.keys(val2).length) return !1;
  for (var zz456 in val) if (!zz457(val[zz456], val2[zz456])) return !1;
  return !0;
}
function zz457(val, val2) {
  return wt(val) ? zz458(val, val2) : wt(val2) ? zz458(val2, val) : val?.valueOf() === val2?.valueOf();
}
function zz458(val, val2) {
  return wt(val2) ? val.length === val2.length && val.every((val1, val3) => val1 === val2[val3]) : val.length === 1 && val[0] === val2;
}
function zz459(val, val2) {
  if (val.startsWith("/")) return val;
  if (!val) return val2;
  const val3 = val2.split("/"),
    val4 = val.split("/"),
    val5 = val4[val4.length - 1];
  (val5 === ".." || val5 === ".") && val4.push("");
  let val6 = val3.length - 1,
    val7,
    val8;
  for (val7 = 0; val7 < val4.length; val7++) if (val8 = val4[val7], val8 !== ".") if (val8 === "..") val6 > 1 && val6--;else break;
  return val3.slice(0, val6).join("/") + "/" + val4.slice(val7).join("/");
}
const Kt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let Eo = function (val) {
    return val.pop = "pop", val.push = "push", val;
  }({}),
  Qr = function (val) {
    return val.back = "back", val.forward = "forward", val.unknown = "", val;
  }({});
function zz460(val) {
  if (!val) if (An) {
    const selector = document.querySelector("base");
    val = selector && selector.getAttribute("href") || "/", val = val.replace(/^\w+:\/\/[^\/]+/, "");
  } else val = "/";
  return val[0] !== "/" && val[0] !== "#" && (val = "/" + val), fp(val);
}
const yp = /^[^#]+#/;
function zz461(val, val2) {
  return val.replace(yp, "#") + val2;
}
function zz462(val, val2) {
  const boundingClientRect = document.documentElement.getBoundingClientRect(),
    boundingClientRect2 = val.getBoundingClientRect();
  return {
    behavior: val2.behavior,
    left: boundingClientRect2.left - boundingClientRect.left - (val2.left || 0),
    top: boundingClientRect2.top - boundingClientRect.top - (val2.top || 0)
  };
}
const xr = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function zz463(val) {
  let val2;
  if ("el" in val) {
    const val1 = val.el,
      val3 = typeof val1 == "string" && val1.startsWith("#"),
      val4 = typeof val1 == "string" ? val3 ? document.getElementById(val1.slice(1)) : document.querySelector(val1) : val1;
    if (!val4) return;
    val2 = zz462(val4, val);
  } else val2 = val;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(val2) : window.scrollTo(val2.left != null ? val2.left : window.scrollX, val2.top != null ? val2.top : window.scrollY);
}
function zz464(val, val2) {
  return (history.state ? history.state.position - val2 : -1) + val;
}
const xo = new Map();
function zz465(val, val2) {
  xo.set(val, val2);
}
function zz466(val) {
  const val2 = xo.get(val);
  return xo.delete(val), val2;
}
function zz467(val) {
  return typeof val == "string" || val && typeof val == "object";
}
function zz468(val) {
  return typeof val == "string" || typeof val == "symbol";
}
let Ne = function (val) {
  return val[val.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", val[val.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", val[val.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", val[val.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", val[val.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", val;
}({});
const Ec = Symbol("");
Ne.MATCHER_NOT_FOUND + "", Ne.NAVIGATION_GUARD_REDIRECT + "", Ne.NAVIGATION_ABORTED + "", Ne.NAVIGATION_CANCELLED + "", Ne.NAVIGATION_DUPLICATED + "";
function zz469(val, val2) {
  return Ae(new Error(), {
    type: val,
    [Ec]: !0
  }, val2);
}
function zz470(val, val2) {
  return val instanceof Error && Ec in val && (val2 == null || !!(val.type & val2));
}
const Ap = ["params", "query", "hash"];
function zz471(val) {
  if (typeof val == "string") return val;
  if (val.path != null) return val.path;
  const obj1 = {};
  for (const zz472 of Ap) zz472 in zz472 && (obj1[zz472] = zz472[zz472]);
  return JSON.stringify(obj1, null, 2);
}
function zz473(val) {
  const obj1 = {};
  if (val === "" || val === "?") return obj1;
  const val2 = (val[0] === "?" ? val.slice(1) : val).split("&");
  for (let num = 0; num < val2.length; ++num) {
    const val1 = val2[num].replace(gc, " "),
      val3 = val1.indexOf("="),
      val4 = zz448(val3 < 0 ? val1 : val1.slice(0, val3)),
      val5 = val3 < 0 ? null : zz448(val1.slice(val3 + 1));
    if (val4 in obj1) {
      let val6 = obj1[val4];
      wt(val6) || (val6 = obj1[val4] = [val6]), val6.push(val5);
    } else obj1[val4] = val5;
  }
  return obj1;
}
function zz474(val) {
  let text = "";
  for (let val_tdz19 in val) {
    const val1 = val[val_tdz19];
    if (val_tdz19 = zz445(val_tdz19), val1 == null) {
      val1 !== void 0 && (text += (text.length ? "&" : "") + val_tdz19);
      continue;
    }
    (wt(val1) ? val1.map(val2 => val2 && zz444(val2)) : [val1 && zz444(val1)]).forEach(val2 => {
      val2 !== void 0 && (text += (text.length ? "&" : "") + val_tdz19, val2 != null && (text += "=" + val2));
    });
  }
  return text;
}
function zz475(val) {
  const obj1 = {};
  for (const val_tdz20 in val) {
    const val1 = val[val_tdz20];
    val1 !== void 0 && (obj1[val_tdz20] = wt(val1) ? val1.map(val2 => val2 == null ? null : "" + val2) : val1 == null ? val1 : "" + val1);
  }
  return obj1;
}
const kp = Symbol(""),
  rl = Symbol(""),
  Cr = Symbol(""),
  Jo = Symbol(""),
  Co = Symbol("");
function zz476() {
  let list = [];
  function zz477(val) {
    return list.push(val), () => {
      const val1 = list.indexOf(val);
      val1 > -1 && list.splice(val1, 1);
    };
  }
  function zz478() {
    list = [];
  }
  return {
    add: zz477,
    list: () => list.slice(),
    reset: zz478
  };
}
function zz479(val, val2, val3, val4, val5, zz480 = val1 => val1()) {
  const val7 = val4 && (val4.enterCallbacks[val5] = val4.enterCallbacks[val5] || []);
  return () => new Promise((val1, val8) => {
    const fn1 = val11 => {
        val11 === !1 ? val8(zz469(Ne.NAVIGATION_ABORTED, {
          from: val3,
          to: val2
        })) : val11 instanceof Error ? val8(val11) : zz467(val11) ? val8(zz469(Ne.NAVIGATION_GUARD_REDIRECT, {
          from: val2,
          to: val11
        })) : (val7 && val4.enterCallbacks[val5] === val7 && typeof val11 == "function" && val7.push(val11), val1());
      },
      val9 = zz480(() => val.call(val4 && val4.instances[val5], val2, val3, fn1));
    let val10 = Promise.resolve(val9);
    val.length < 3 && (val10 = val10.then(fn1)), val10.catch(val11 => val8(val11));
  });
}
function zz481(val, val2, val3, val4, zz482 = val1 => val1()) {
  const list = [];
  for (const val_tdz21 of val) for (const val_tdz22 in val_tdz21.components) {
    let val1 = val_tdz21.components[val_tdz22];
    if (!(val2 !== "beforeRouteEnter" && !val_tdz21.instances[val_tdz22])) if (zz437(val1)) {
      const val6 = (val1.__vccOpts || val1)[val2];
      val6 && list.push(zz479(val6, val3, val4, val_tdz21, val_tdz22, zz482));
    } else {
      let val6 = val1();
      list.push(() => val6.then(val7 => {
        if (!val7) throw new Error(`Couldn't resolve component "${val_tdz22}" at "${val_tdz21.path}"`);
        const val8 = zz438(val7) ? val7.default : val7;
        val_tdz21.mods[val_tdz22] = val7, val_tdz21.components[val_tdz22] = val8;
        const val9 = (val8.__vccOpts || val8)[val2];
        return val9 && zz479(val9, val3, val4, val_tdz21, val_tdz22, zz482)();
      }));
    }
  }
  return list;
}
function zz483(val, val2) {
  const list = [],
    list2 = [],
    list3 = [],
    val3 = Math.max(val2.matched.length, val.matched.length);
  for (let num = 0; num < val3; num++) {
    const val1 = val2.matched[num];
    val1 && (val.matched.find(val5 => zz454(val5, val1)) ? list2.push(val1) : list.push(val1));
    const val4 = val.matched[num];
    val4 && (val2.matched.find(val5 => zz454(val5, val4)) || list3.push(val4));
  }
  return [list, list2, list3];
}
let Pp = () => location.protocol + "//" + location.host;
function zz484(val, val2) {
  const {
      pathname: val3,
      search: val4,
      hash: val5
    } = val2,
    val6 = val.indexOf("#");
  if (val6 > -1) {
    let val1 = val5.includes(val.slice(val6)) ? val.slice(val6).length : 1,
      val7 = val5.slice(val1);
    return val7[0] !== "/" && (val7 = "/" + val7), zz452(val7, "");
  }
  return zz452(val3, val) + val4 + val5;
}
function zz485(val, val2, val3, val4) {
  let list = [],
    list2 = [],
    val5 = null;
  const fn1 = ({
    state: zz486
  }) => {
    const val6 = zz484(val, location),
      val7 = val3.value,
      val8 = val2.value;
    let num = 0;
    if (zz486) {
      if (val3.value = val6, val2.value = zz486, val5 && val5 === val7) {
        val5 = null;
        return;
      }
      num = val8 ? zz486.position - val8.position : 0;
    } else val4(val6);
    list.forEach(val9 => {
      val9(val3.value, val7, {
        delta: num,
        type: Eo.pop,
        direction: num ? num > 0 ? Qr.forward : Qr.back : Qr.unknown
      });
    });
  };
  function zz487() {
    val5 = val3.value;
  }
  function zz488(val1) {
    list.push(val1);
    const zz489 = () => {
      const val6 = list.indexOf(val1);
      val6 > -1 && list.splice(val6, 1);
    };
    return list2.push(zz489), zz489;
  }
  function zz490() {
    if (document.visibilityState === "hidden") {
      const {
        history: val1
      } = window;
      if (!val1.state) return;
      val1.replaceState(Ae({}, val1.state, {
        scroll: xr()
      }), "");
    }
  }
  function zz491() {
    for (const zz492 of list2) zz492();
    list2 = [], window.removeEventListener("popstate", fn1), window.removeEventListener("pagehide", zz490), document.removeEventListener("visibilitychange", zz490);
  }
  return window.addEventListener("popstate", fn1), window.addEventListener("pagehide", zz490), document.addEventListener("visibilitychange", zz490), {
    pauseListeners: zz487,
    listen: zz488,
    destroy: zz491
  };
}
function zz493(val, val2, val3, zz494 = !1, zz495 = !1) {
  return {
    back: val,
    current: val2,
    forward: val3,
    replaced: zz494,
    position: window.history.length,
    scroll: zz495 ? xr() : null
  };
}
function zz496(val) {
  const {
      history: val2,
      location: val3
    } = window,
    obj1 = {
      value: zz484(val, val3)
    },
    obj2 = {
      value: val2.state
    };
  obj2.value || zz497(obj1.value, {
    back: null,
    current: obj1.value,
    forward: null,
    position: val2.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function zz497(val1, val4, val5) {
    const val6 = val.indexOf("#"),
      val7 = val6 > -1 ? (val3.host && document.querySelector("base") ? val : val.slice(val6)) + val1 : Pp() + val + val1;
    try {
      val2[val5 ? "replaceState" : "pushState"](val4, "", val7), obj2.value = val4;
    } catch (val8) {
      console.error(val8), val3[val5 ? "replace" : "assign"](val7);
    }
  }
  function zz498(val1, val4) {
    zz497(val1, Ae({}, val2.state, zz493(obj2.value.back, val1, obj2.value.forward, !0), val4, {
      position: obj2.value.position
    }), !0), obj1.value = val1;
  }
  function zz499(val1, val4) {
    const val5 = Ae({}, obj2.value, val2.state, {
      forward: val1,
      scroll: xr()
    });
    zz497(val5.current, val5, !0), zz497(val1, Ae({}, zz493(obj1.value, val1, null), {
      position: val5.position + 1
    }, val4), !1), obj1.value = val1;
  }
  return {
    location: obj1,
    state: obj2,
    push: zz499,
    replace: zz498
  };
}
function zz500(val) {
  val = zz460(val);
  const val2 = zz496(val),
    val3 = zz485(val, val2.state, val2.location, val2.replace);
  function zz501(val1, zz502 = !0) {
    zz502 || val3.pauseListeners(), history.go(val1);
  }
  const val4 = Ae({
    location: "",
    base: val,
    go: zz501,
    createHref: zz461.bind(null, val)
  }, val2, val3);
  return Object.defineProperty(val4, "location", {
    enumerable: !0,
    get: () => val2.location.value
  }), Object.defineProperty(val4, "state", {
    enumerable: !0,
    get: () => val2.state.value
  }), val4;
}
let un = function (val) {
  return val[val.Static = 0] = "Static", val[val.Param = 1] = "Param", val[val.Group = 2] = "Group", val;
}({});
var Fe = function (val) {
  return val[val.Static = 0] = "Static", val[val.Param = 1] = "Param", val[val.ParamRegExp = 2] = "ParamRegExp", val[val.ParamRegExpEnd = 3] = "ParamRegExpEnd", val[val.EscapeNext = 4] = "EscapeNext", val;
}(Fe || {});
const Np = {
    type: un.Static,
    value: ""
  },
  Dp = /[a-zA-Z0-9_]/;
function zz503(val) {
  if (!val) return [[]];
  if (val === "/") return [[Np]];
  if (!val.startsWith("/")) throw new Error(`Invalid path "${val}"`);
  function zz504(val1) {
    throw new Error(`ERR (${FeStatic})/"${text}": ${val1}`);
  }
  let FeStatic = Fe.Static,
    val3 = FeStatic;
  const list = [];
  let val4;
  function zz505() {
    val4 && list.push(val4), val4 = [];
  }
  let num = 0,
    val5,
    text = "",
    text2 = "";
  function zz506() {
    text && (FeStatic === Fe.Static ? val4.push({
      type: un.Static,
      value: text
    }) : FeStatic === Fe.Param || FeStatic === Fe.ParamRegExp || FeStatic === Fe.ParamRegExpEnd ? (val4.length > 1 && (val5 === "*" || val5 === "+") && zz504(`A repeatable param (${text}) must be alone in its segment. eg: '/:ids+.`), val4.push({
      type: un.Param,
      value: text,
      regexp: text2,
      repeatable: val5 === "*" || val5 === "+",
      optional: val5 === "*" || val5 === "?"
    })) : zz504("Invalid state to consume buffer"), text = "");
  }
  function zz507() {
    text += val5;
  }
  for (; num < val.length;) {
    if (val5 = val[num++], val5 === "\\" && FeStatic !== Fe.ParamRegExp) {
      val3 = FeStatic, FeStatic = Fe.EscapeNext;
      continue;
    }
    switch (FeStatic) {
      case Fe.Static:
        val5 === "/" ? (text && zz506(), zz505()) : val5 === ":" ? (zz506(), FeStatic = Fe.Param) : zz507();
        break;
      case Fe.EscapeNext:
        zz507(), FeStatic = val3;
        break;
      case Fe.Param:
        val5 === "(" ? FeStatic = Fe.ParamRegExp : Dp.test(val5) ? zz507() : (zz506(), FeStatic = Fe.Static, val5 !== "*" && val5 !== "?" && val5 !== "+" && num--);
        break;
      case Fe.ParamRegExp:
        val5 === ")" ? text2[text2.length - 1] == "\\" ? text2 = text2.slice(0, -1) + val5 : FeStatic = Fe.ParamRegExpEnd : text2 += val5;
        break;
      case Fe.ParamRegExpEnd:
        zz506(), FeStatic = Fe.Static, val5 !== "*" && val5 !== "?" && val5 !== "+" && num--, text2 = "";
        break;
      default:
        zz504("Unknown state");
        break;
    }
  }
  return FeStatic === Fe.ParamRegExp && zz504(`Unfinished custom RegExp for param "${text}"`), zz506(), zz505(), list;
}
const il = "[^/]+?",
  $p = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
  };
var Ze = function (val) {
  return val[val._multiplier = 10] = "_multiplier", val[val.Root = 90] = "Root", val[val.Segment = 40] = "Segment", val[val.SubSegment = 30] = "SubSegment", val[val.Static = 40] = "Static", val[val.Dynamic = 20] = "Dynamic", val[val.BonusCustomRegExp = 10] = "BonusCustomRegExp", val[val.BonusWildcard = -50] = "BonusWildcard", val[val.BonusRepeatable = -20] = "BonusRepeatable", val[val.BonusOptional = -8] = "BonusOptional", val[val.BonusStrict = .7000000000000001] = "BonusStrict", val[val.BonusCaseSensitive = .25] = "BonusCaseSensitive", val;
}(Ze || {});
const Fp = /[.+*?^${}()[\]/\\]/g;
function zz508(val, val2) {
  const val3 = Ae({}, $p, val2),
    list = [];
  let val4 = val3.start ? "^" : "";
  const list2 = [];
  for (const val_tdz23 of val) {
    const val1 = val_tdz23.length ? [] : [Ze.Root];
    val3.strict && !val_tdz23.length && (val4 += "/");
    for (let num = 0; num < val_tdz23.length; num++) {
      const val5 = val_tdz23[num];
      let val6 = Ze.Segment + (val3.sensitive ? Ze.BonusCaseSensitive : 0);
      if (val5.type === un.Static) num || (val4 += "/"), val4 += val5.value.replace(Fp, "\\$&"), val6 += Ze.Static;else if (val5.type === un.Param) {
        const {
          value: val7,
          repeatable: val8,
          optional: val9,
          regexp: val10
        } = val5;
        list2.push({
          name: val7,
          repeatable: val8,
          optional: val9
        });
        const val11 = val10 || il;
        if (val11 !== il) {
          val6 += Ze.BonusCustomRegExp;
          try {
            `${val11}`;
          } catch (val13) {
            throw new Error(`Invalid custom RegExp for param "${val7}" (${val11}): ` + val13.message);
          }
        }
        let val12 = val8 ? `((?:${val11})(?:/(?:${val11}))*)` : `(${val11})`;
        num || (val12 = val9 && val_tdz23.length < 2 ? `(?:/${val12})` : "/" + val12), val9 && (val12 += "?"), val4 += val12, val6 += Ze.Dynamic, val9 && (val6 += Ze.BonusOptional), val8 && (val6 += Ze.BonusRepeatable), val11 === ".*" && (val6 += Ze.BonusWildcard);
      }
      val1.push(val6);
    }
    list.push(val1);
  }
  if (val3.strict && val3.end) {
    const val1 = list.length - 1;
    list[val1][list[val1].length - 1] += Ze.BonusStrict;
  }
  val3.strict || (val4 += "/?"), val3.end ? val4 += "$" : val3.strict && !val4.endsWith("/") && (val4 += "(?:/|$)");
  const regexp = new RegExp(val4, val3.sensitive ? "" : "i");
  function zz509(val1) {
    const val5 = val1.match(regexp),
      obj1 = {};
    if (!val5) return null;
    for (let num = 1; num < val5.length; num++) {
      const val6 = val5[num] || "",
        val7 = list2[num - 1];
      obj1[val7.name] = val6 && val7.repeatable ? val6.split("/") : val6;
    }
    return obj1;
  }
  function zz510(val1) {
    let text = "",
      val5 = !1;
    for (const val_tdz24 of val) {
      (!val5 || !text.endsWith("/")) && (text += "/"), val5 = !1;
      for (const val_tdz25 of val_tdz24) if (val_tdz25.type === un.Static) text += val_tdz25.value;else if (val_tdz25.type === un.Param) {
        const {
            value: val6,
            repeatable: val7,
            optional: val8
          } = val_tdz25,
          val9 = val6 in val1 ? val1[val6] : "";
        if (wt(val9) && !val7) throw new Error(`Provided param "${val6}" is an array but it is not repeatable (* or + modifiers)`);
        const val10 = wt(val9) ? val9.join("/") : val9;
        if (!val10) if (val8) val_tdz24.length < 2 && (text.endsWith("/") ? text = text.slice(0, -1) : val5 = !0);else throw new Error(`Missing required param "${val6}"`);
        text += val10;
      }
    }
    return text || "/";
  }
  return {
    re: regexp,
    score: list,
    keys: list2,
    parse: zz509,
    stringify: zz510
  };
}
function zz511(val, val2) {
  let num = 0;
  for (; num < val.length && num < val2.length;) {
    const val1 = val2[num] - val[num];
    if (val1) return val1;
    num++;
  }
  return val.length < val2.length ? val.length === 1 && val[0] === Ze.Static + Ze.Segment ? -1 : 1 : val.length > val2.length ? val2.length === 1 && val2[0] === Ze.Static + Ze.Segment ? 1 : -1 : 0;
}
function zz512(val, val2) {
  let num = 0;
  const val3 = val.score,
    val4 = val2.score;
  for (; num < val3.length && num < val4.length;) {
    const val1 = zz511(val3[num], val4[num]);
    if (val1) return val1;
    num++;
  }
  if (Math.abs(val4.length - val3.length) === 1) {
    if (zz513(val3)) return 1;
    if (zz513(val4)) return -1;
  }
  return val4.length - val3.length;
}
function zz513(val) {
  const val2 = val[val.length - 1];
  return val.length > 0 && val2[val2.length - 1] < 0;
}
const Up = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function zz514(val, val2, val3) {
  const val4 = zz508(zz503(val.path), val3),
    val5 = Ae(val4, {
      record: val,
      parent: val2,
      children: [],
      alias: []
    });
  return val2 && !val5.record.aliasOf == !val2.record.aliasOf && val2.children.push(val5), val5;
}
function zz515(val, val2) {
  const list = [],
    map = new Map();
  val2 = zz441(Up, val2);
  function zz516(val1) {
    return map.get(val1);
  }
  function zz517(val1, val3, val4) {
    const val5 = !val4,
      val6 = zz527(val1);
    val6.aliasOf = val4 && val4.record;
    const val7 = zz441(val2, val1),
      list1 = [val6];
    if ("alias" in val1) {
      const val10 = typeof val1.alias == "string" ? [val1.alias] : val1.alias;
      for (const zz518 of val10) list1.push(zz527(Ae({}, val6, {
        components: val4 ? val4.record.components : val6.components,
        path: zz518,
        aliasOf: val4 ? val4.record : val6
      })));
    }
    let val8, val9;
    for (const zz519 of list1) {
      const {
        path: val10
      } = zz519;
      if (val3 && val10[0] !== "/") {
        const val11 = val3.record.path,
          val12 = val11[val11.length - 1] === "/" ? "" : "/";
        zz519.path = val3.record.path + (val10 && val12 + val10);
      }
      if (val8 = zz514(zz519, val3, val7), val4 ? val4.alias.push(val8) : (val9 = val9 || val8, val9 !== val8 && val9.alias.push(val8), val5 && val1.name && !zz529(val8) && zz520(val1.name)), zz533(val8) && zz522(val8), val6.children) {
        const val11 = val6.children;
        for (let num = 0; num < val11.length; num++) zz517(val11[num], val8, val4 && val4.children[num]);
      }
      val4 = val4 || val8;
    }
    return val9 ? () => {
      zz520(val9);
    } : rs;
  }
  function zz520(val1) {
    if (zz468(val1)) {
      const val3 = map.get(val1);
      val3 && (map.delete(val1), list.splice(list.indexOf(val3), 1), val3.children.forEach(zz520), val3.alias.forEach(zz520));
    } else {
      const val3 = list.indexOf(val1);
      val3 > -1 && (list.splice(val3, 1), val1.record.name && map.delete(val1.record.name), val1.children.forEach(zz520), val1.alias.forEach(zz520));
    }
  }
  function zz521() {
    return list;
  }
  function zz522(val1) {
    const val3 = zz531(val1, list);
    list.splice(val3, 0, val1), val1.record.name && !zz529(val1) && map.set(val1.record.name, val1);
  }
  function zz523(val1, val3) {
    let val4,
      obj1 = {},
      val5,
      val6;
    if ("name" in val1 && val1.name) {
      if (val4 = map.get(val1.name), !val4) throw zz469(Ne.MATCHER_NOT_FOUND, {
        location: val1
      });
      val6 = val4.record.name, obj1 = Ae(zz525(val3.params, val4.keys.filter(val8 => !val8.optional).concat(val4.parent ? val4.parent.keys.filter(val8 => val8.optional) : []).map(val8 => val8.name)), val1.params && zz525(val1.params, val4.keys.map(val8 => val8.name))), val5 = val4.stringify(obj1);
    } else if (val1.path != null) val5 = val1.path, val4 = list.find(val8 => val8.re.test(val5)), val4 && (obj1 = val4.parse(val5), val6 = val4.record.name);else {
      if (val4 = val3.name ? map.get(val3.name) : list.find(val8 => val8.re.test(val3.path)), !val4) throw zz469(Ne.MATCHER_NOT_FOUND, {
        location: val1,
        currentLocation: val3
      });
      val6 = val4.record.name, obj1 = Ae({}, val3.params, val1.params), val5 = val4.stringify(obj1);
    }
    const list1 = [];
    let val7 = val4;
    for (; val7;) list1.unshift(val7.record), val7 = val7.parent;
    return {
      name: val6,
      path: val5,
      params: obj1,
      matched: list1,
      meta: zz530(list1)
    };
  }
  val.forEach(val1 => zz517(val1));
  function zz524() {
    list.length = 0, map.clear();
  }
  return {
    addRoute: zz517,
    resolve: zz523,
    removeRoute: zz520,
    clearRoutes: zz524,
    getRoutes: zz521,
    getRecordMatcher: zz516
  };
}
function zz525(val, val2) {
  const obj1 = {};
  for (const zz526 of val2) zz526 in zz526 && (obj1[zz526] = zz526[zz526]);
  return obj1;
}
function zz527(val) {
  const obj1 = {
    path: val.path,
    redirect: val.redirect,
    name: val.name,
    meta: val.meta || {},
    aliasOf: val.aliasOf,
    beforeEnter: val.beforeEnter,
    props: zz528(val),
    children: val.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: "components" in val ? val.components || null : val.component && {
      default: val.component
    }
  };
  return Object.defineProperty(obj1, "mods", {
    value: {}
  }), obj1;
}
function zz528(val) {
  const obj1 = {},
    val2 = val.props || !1;
  if ("component" in val) obj1.default = val2;else for (const val_tdz26 in val.components) obj1[val_tdz26] = typeof val2 == "object" ? val2[val_tdz26] : val2;
  return obj1;
}
function zz529(val) {
  for (; val;) {
    if (val.record.aliasOf) return !0;
    val = val.parent;
  }
  return !1;
}
function zz530(val) {
  return val.reduce((val1, val2) => Ae(val1, val2.meta), {});
}
function zz531(val, val2) {
  let num = 0,
    val3 = val2.length;
  for (; num !== val3;) {
    const val1 = num + val3 >> 1;
    zz512(val, val2[val1]) < 0 ? val3 = val1 : num = val1 + 1;
  }
  const val4 = zz532(val);
  return val4 && (val3 = val2.lastIndexOf(val4, val3 - 1)), val3;
}
function zz532(val) {
  let val2 = val;
  for (; val2 = val2.parent;) if (zz533(val2) && zz512(val, val2) === 0) return val2;
}
function zz533({
  record: zz534
}) {
  return !!(zz534.name || zz534.components && Object.keys(zz534.components).length || zz534.redirect);
}
function zz535(val) {
  const val2 = zz125(Cr),
    val3 = zz125(Jo),
    val4 = applyDirectives(() => {
      const val1 = zz87(val.to);
      return val2.resolve(val1);
    }),
    val5 = applyDirectives(() => {
      const {
          matched: val1
        } = val4.value,
        {
          length: val8
        } = val1,
        val9 = val1[val8 - 1],
        val10 = val3.matched;
      if (!val9 || !val10.length) return -1;
      const val11 = val10.findIndex(zz454.bind(null, val9));
      if (val11 > -1) return val11;
      const val12 = zz543(val1[val8 - 2]);
      return val8 > 1 && zz543(val9) === val12 && val10[val10.length - 1].path !== val12 ? val10.findIndex(zz454.bind(null, val1[val8 - 2])) : val11;
    }),
    val6 = applyDirectives(() => val5.value > -1 && zz541(val3.params, val4.value.params)),
    val7 = applyDirectives(() => val5.value > -1 && val5.value === val3.matched.length - 1 && zz455(val3.params, val4.value.params));
  function zz536(zz537 = {}) {
    if (zz540(zz537)) {
      const val8 = val2[zz87(val.replace) ? "replace" : "push"](zz87(val.to)).catch(rs);
      return val.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => val8), val8;
    }
    return Promise.resolve();
  }
  return {
    route: val4,
    href: applyDirectives(() => val4.value.href),
    isActive: val6,
    isExactActive: val7,
    navigate: zz536
  };
}
function zz538(val) {
  return val.length === 1 ? val[0] : val;
}
const Jp = zz160({
    name: "RouterLink",
    compatConfig: {
      MODE: 3
    },
    props: {
      to: {
        type: [String, Object],
        required: !0
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      },
      viewTransition: Boolean
    },
    useLink: zz535,
    setup(val, {
      slots: zz539
    }) {
      const val3 = zz72(zz535(val)),
        {
          options: val4
        } = zz125(Cr),
        val5 = applyDirectives(() => ({
          [pl(val.activeClass, val4.linkActiveClass, "router-link-active")]: val3.isActive,
          [pl(val.exactActiveClass, val4.linkExactActiveClass, "router-link-exact-active")]: val3.isExactActive
        }));
      return () => {
        const val1 = zz539.default && zz538(zz539.default(val3));
        return val.custom ? val1 : zz339("a", {
          "aria-current": val3.isExactActive ? val.ariaCurrentValue : null,
          href: val3.href,
          onClick: val3.navigate,
          class: val5.value
        }, val1);
      };
    }
  }),
  Yp = Jp;
function zz540(val) {
  if (!(val.metaKey || val.altKey || val.ctrlKey || val.shiftKey) && !val.defaultPrevented && !(val.button !== void 0 && val.button !== 0)) {
    if (val.currentTarget && val.currentTarget.getAttribute) {
      const attribute = val.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(attribute)) return;
    }
    return val.preventDefault && val.preventDefault(), !0;
  }
}
function zz541(val, val2) {
  for (const zz542 in val2) {
    const val1 = val2[zz542],
      val3 = val[zz542];
    if (typeof val1 == "string") {
      if (val1 !== val3) return !1;
    } else if (!wt(val3) || val3.length !== val1.length || val1.some((val4, val5) => val4.valueOf() !== val3[val5].valueOf())) return !1;
  }
  return !0;
}
function zz543(val) {
  return val ? val.aliasOf ? val.aliasOf.path : val.path : "";
}
const pl = (val, val2, val3) => val ?? val2 ?? val3,
  em = zz160({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: {
      MODE: 3
    },
    setup(val, {
      attrs: zz544,
      slots: zz545
    }) {
      const val4 = zz125(Co),
        val5 = applyDirectives(() => val.route || val4.value),
        val6 = zz125(rl, 0),
        val7 = applyDirectives(() => {
          let val1 = zz87(val6);
          const {
            matched: val9
          } = val5.value;
          let val10;
          for (; (val10 = val9[val1]) && !val10.components;) val1++;
          return val1;
        }),
        val8 = applyDirectives(() => val5.value.matched[val7.value]);
      zz124(rl, applyDirectives(() => val7.value + 1)), zz124(kp, val8), zz124(Co, val5);
      const refVal = zz83();
      return zz128(() => [refVal.value, val8.value, val.name], ([zz546, zz547, zz548], [zz549, zz550, zz551]) => {
        zz547 && (zz547.instances[zz548] = zz546, zz550 && zz550 !== zz547 && zz546 && zz546 === zz549 && (zz547.leaveGuards.size || (zz547.leaveGuards = zz550.leaveGuards), zz547.updateGuards.size || (zz547.updateGuards = zz550.updateGuards))), zz546 && zz547 && (!zz550 || !zz454(zz547, zz550) || !zz549) && (zz547.enterCallbacks[zz548] || []).forEach(val14 => val14(zz546));
      }, {
        flush: "post"
      }), () => {
        const val1 = val5.value,
          val9 = val.name,
          val10 = val8.value,
          val11 = val10 && val10.components[val9];
        if (!val11) return zz552(zz545.default, {
          Component: val11,
          route: val1
        });
        const val12 = val10.props[val9],
          val13 = val12 ? val12 === !0 ? val1.params : typeof val12 == "function" ? val12(val1) : val12 : null,
          val14 = zz339(val11, Ae({}, val13, zz544, {
            onVnodeUnmounted: val15 => {
              val15.component.isUnmounted && (val10.instances[val9] = null);
            },
            ref: refVal
          }));
        return zz552(zz545.default, {
          Component: val14,
          route: val1
        }) || val14;
      };
    }
  });
function zz552(val, val2) {
  if (!val) return null;
  const val3 = val(val2);
  return val3.length === 1 ? val3[0] : val3;
}
const tm = em;
function zz553(val) {
  const val2 = zz515(val.routes, val),
    val3 = val.parseQuery || zz473,
    val4 = val.stringifyQuery || zz474,
    val5 = val.history,
    val6 = zz476(),
    val7 = zz476(),
    val8 = zz476(),
    val9 = zz84(Kt);
  let val10 = Kt;
  An && val.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const val11 = zz439.bind(null, val1 => "" + val1),
    val12 = zz439.bind(null, zz447),
    val13 = zz439.bind(null, zz448);
  function zz554(val1, val19) {
    let val20, val21;
    return zz468(val1) ? (val20 = val2.getRecordMatcher(val1), val21 = val19) : val21 = val1, val2.addRoute(val21, val20);
  }
  function zz555(val1) {
    const recordMatcher = val2.getRecordMatcher(val1);
    recordMatcher && val2.removeRoute(recordMatcher);
  }
  function zz556() {
    return val2.getRoutes().map(val1 => val1.record);
  }
  function zz557(val1) {
    return !!val2.getRecordMatcher(val1);
  }
  function zz558(val1, val19) {
    if (val19 = Ae({}, val19 || val9.value), typeof val1 == "string") {
      const val24 = zz449(val3, val1, val19.path),
        val25 = val2.resolve({
          path: val24.path
        }, val19),
        zz559 = val5.createHref(val24.fullPath);
      return Ae(val24, val25, {
        params: val13(val25.params),
        hash: zz448(val24.hash),
        redirectedFrom: void 0,
        href: zz559
      });
    }
    let val20;
    if (val1.path != null) val20 = Ae({}, val1, {
      path: zz449(val3, val1.path, val19.path).path
    });else {
      const val24 = Ae({}, val1.params);
      for (const zz560 in val24) val24[zz560] == null && delete val24[zz560];
      val20 = Ae({}, val1, {
        params: val12(val24)
      }), val19.params = val12(val19.params);
    }
    const val21 = val2.resolve(val20, val19),
      we = val1.hash || "";
    val21.params = val11(val13(val21.params));
    const val22 = zz451(val4, Ae({}, val1, {
        hash: zz443(we),
        path: val21.path
      })),
      href = val5.createHref(val22);
    return Ae({
      fullPath: val22,
      hash: we,
      query: val4 === zz474 ? zz475(val1.query) : val1.query || {}
    }, val21, {
      redirectedFrom: void 0,
      href: href
    });
  }
  function zz561(val1) {
    return typeof val1 == "string" ? zz449(val3, val1, val9.value.path) : Ae({}, val1);
  }
  function zz562(val1, val19) {
    if (val10 !== val1) return zz469(Ne.NAVIGATION_CANCELLED, {
      from: val19,
      to: val1
    });
  }
  function zz563(val1) {
    return zz566(val1);
  }
  function zz564(val1) {
    return zz563(Ae(zz561(val1), {
      replace: !0
    }));
  }
  function zz565(val1, val19) {
    const val20 = val1.matched[val1.matched.length - 1];
    if (val20 && val20.redirect) {
      const {
        redirect: val21
      } = val20;
      let we = typeof val21 == "function" ? val21(val1, val19) : val21;
      return typeof we == "string" && (we = we.includes("?") || we.includes("#") ? we = zz561(we) : {
        path: we
      }, we.params = {}), Ae({
        query: val1.query,
        hash: val1.hash,
        params: we.path != null ? {} : val1.params
      }, we);
    }
  }
  function zz566(val1, val19) {
    const val20 = val10 = zz558(val1),
      val21 = val9.value,
      we = val1.state,
      val22 = val1.force,
      val23 = val1.replace === !0,
      val24 = zz565(val20, val21);
    if (val24) return zz566(Ae(zz561(val24), {
      state: typeof val24 == "object" ? Ae({}, we, val24.state) : we,
      force: val22,
      replace: val23
    }), val19 || val20);
    const val25 = val20;
    val25.redirectedFrom = val19;
    let val26;
    return !val22 && zz453(val4, val21, val20) && (val26 = zz469(Ne.NAVIGATION_DUPLICATED, {
      to: val25,
      from: val21
    }), zz583(val21, val21, !0, !1)), (val26 ? Promise.resolve(val26) : zz569(val25, val21)).catch(val27 => zz470(val27) ? zz470(val27, Ne.NAVIGATION_GUARD_REDIRECT) ? val27 : zz580(val27) : zz578(val27, val25, val21)).then(val27 => {
      if (val27) {
        if (zz470(val27, Ne.NAVIGATION_GUARD_REDIRECT)) return zz566(Ae({
          replace: val23
        }, zz561(val27.to), {
          state: typeof val27.to == "object" ? Ae({}, we, val27.to.state) : we,
          force: val22
        }), val19 || val25);
      } else val27 = zz576(val25, val21, !0, val23, we);
      return zz575(val25, val21, val27), val27;
    });
  }
  function zz567(val1, val19) {
    const val20 = zz562(val1, val19);
    return val20 ? Promise.reject(val20) : Promise.resolve();
  }
  function zz568(val1) {
    const val19 = set.values().next().value;
    return val19 && typeof val19.runWithContext == "function" ? val19.runWithContext(val1) : val1();
  }
  function zz569(val1, val19) {
    let val20;
    const [val21, we, val22] = zz483(val1, val19);
    val20 = zz481(val21.reverse(), "beforeRouteLeave", val1, val19);
    for (const zz570 of val21) zz570.leaveGuards.forEach(val24 => {
      val20.push(zz479(val24, val1, val19));
    });
    const val23 = zz567.bind(null, val1, val19);
    return val20.push(val23), zz584(val20).then(() => {
      val20 = [];
      for (const zz571 of val6.list()) val20.push(zz479(zz571, val1, val19));
      return val20.push(val23), zz584(val20);
    }).then(() => {
      val20 = zz481(we, "beforeRouteUpdate", val1, val19);
      for (const zz572 of we) zz572.updateGuards.forEach(val24 => {
        val20.push(zz479(val24, val1, val19));
      });
      return val20.push(val23), zz584(val20);
    }).then(() => {
      val20 = [];
      for (const zz573 of val22) if (zz573.beforeEnter) if (wt(zz573.beforeEnter)) for (const val_tdz27 of zz573.beforeEnter) val20.push(zz479(val_tdz27, val1, val19));else val20.push(zz479(zz573.beforeEnter, val1, val19));
      return val20.push(val23), zz584(val20);
    }).then(() => (val1.matched.forEach(val24 => val24.enterCallbacks = {}), val20 = zz481(val22, "beforeRouteEnter", val1, val19, zz568), val20.push(val23), zz584(val20))).then(() => {
      val20 = [];
      for (const zz574 of val7.list()) val20.push(zz479(zz574, val1, val19));
      return val20.push(val23), zz584(val20);
    }).catch(val24 => zz470(val24, Ne.NAVIGATION_CANCELLED) ? val24 : Promise.reject(val24));
  }
  function zz575(val1, val19, val20) {
    val8.list().forEach(val21 => zz568(() => val21(val1, val19, val20)));
  }
  function zz576(val1, val19, val20, val21, we) {
    const val22 = zz562(val1, val19);
    if (val22) return val22;
    const val23 = val19 === Kt,
      val24 = An ? history.state : {};
    val20 && (val21 || val23 ? val5.replace(val1.fullPath, Ae({
      scroll: val23 && val24 && val24.scroll
    }, we)) : val5.push(val1.fullPath, we)), val9.value = val1, zz583(val1, val19, val20, val23), zz580();
  }
  let val14;
  function zz577() {
    val14 || (val14 = val5.listen((val1, val19, val20) => {
      if (!obj1.listening) return;
      const val21 = zz558(val1),
        we = zz565(val21, obj1.currentRoute.value);
      if (we) {
        zz566(Ae(we, {
          replace: !0,
          force: !0
        }), val21).catch(rs);
        return;
      }
      val10 = val21;
      const val22 = val9.value;
      An && zz465(zz464(val22.fullPath, val20.delta), xr()), zz569(val21, val22).catch(val23 => zz470(val23, Ne.NAVIGATION_ABORTED | Ne.NAVIGATION_CANCELLED) ? val23 : zz470(val23, Ne.NAVIGATION_GUARD_REDIRECT) ? (zz566(Ae(zz561(val23.to), {
        force: !0
      }), val21).then(val24 => {
        zz470(val24, Ne.NAVIGATION_ABORTED | Ne.NAVIGATION_DUPLICATED) && !val20.delta && val20.type === Eo.pop && val5.go(-1, !1);
      }).catch(rs), Promise.reject()) : (val20.delta && val5.go(-val20.delta, !1), zz578(val23, val21, val22))).then(val23 => {
        val23 = val23 || zz576(val21, val22, !1), val23 && (val20.delta && !zz470(val23, Ne.NAVIGATION_CANCELLED) ? val5.go(-val20.delta, !1) : val20.type === Eo.pop && zz470(val23, Ne.NAVIGATION_ABORTED | Ne.NAVIGATION_DUPLICATED) && val5.go(-1, !1)), zz575(val21, val22, val23);
      }).catch(rs);
    }));
  }
  let val15 = zz476(),
    val16 = zz476(),
    val17;
  function zz578(val1, val19, val20) {
    zz580(val1);
    const val21 = val16.list();
    return val21.length ? val21.forEach(we => we(val1, val19, val20)) : console.error(val1), Promise.reject(val1);
  }
  function zz579() {
    return val17 && val9.value !== Kt ? Promise.resolve() : new Promise((val1, val19) => {
      val15.add([val1, val19]);
    });
  }
  function zz580(val1) {
    return val17 || (val17 = !val1, zz577(), val15.list().forEach(([zz581, zz582]) => val1 ? zz582(val1) : zz581()), val15.reset()), val1;
  }
  function zz583(val1, val19, val20, val21) {
    const {
      scrollBehavior: we
    } = val;
    if (!An || !we) return Promise.resolve();
    const val22 = !val20 && zz466(zz464(val1.fullPath, 0)) || (val21 || !val20) && history.state && history.state.scroll || null;
    return zz110().then(() => we(val1, val19, val22)).then(val23 => val23 && zz463(val23)).catch(val23 => zz578(val23, val1, val19));
  }
  const fn1 = val1 => val5.go(val1);
  let val18;
  const set = new Set(),
    obj1 = {
      currentRoute: val9,
      listening: !0,
      addRoute: zz554,
      removeRoute: zz555,
      clearRoutes: val2.clearRoutes,
      hasRoute: zz557,
      getRoutes: zz556,
      resolve: zz558,
      options: val,
      push: zz563,
      replace: zz564,
      go: fn1,
      back: () => fn1(-1),
      forward: () => fn1(1),
      beforeEach: val6.add,
      beforeResolve: val7.add,
      afterEach: val8.add,
      onError: val16.add,
      isReady: zz579,
      install(val1) {
        val1.component("RouterLink", Yp), val1.component("RouterView", tm), val1.config.globalProperties.$router = obj1, Object.defineProperty(val1.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => zz87(val9)
        }), An && !val18 && val9.value === Kt && (val18 = !0, zz563(val5.location).catch(val20 => {}));
        const obj2 = {};
        for (const le in Kt) Object.defineProperty(obj2, le, {
          get: () => val9.value[le],
          enumerable: !0
        });
        val1.provide(Cr, obj1), val1.provide(Jo, zz73(obj2)), val1.provide(Co, val9);
        const val19 = val1.unmount;
        set.add(val1), val1.unmount = function () {
          set.delete(val1), set.size < 1 && (val10 = Kt, val14 && val14(), val14 = null, val9.value = Kt, val18 = !1, val17 = !1), val19();
        };
      }
    };
  function zz584(val1) {
    return val1.reduce((val19, val20) => val19.then(() => zz568(val20)), Promise.resolve());
  }
  return obj1;
}
function zz585() {
  return zz125(Cr);
}
function zz586(val) {
  return zz125(Jo);
}
function zz587(val, val2) {
  return function () {
    return val.apply(val2, arguments);
  };
}
const {
    toString: sm
  } = Object.prototype,
  {
    getPrototypeOf: Xo
  } = Object,
  {
    iterator: Ar,
    toStringTag: Rc
  } = Symbol,
  Sr = (val => val1 => {
    const val2 = sm.call(val1);
    return val[val2] || (val[val2] = val2.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  _t = val => (val = val.toLowerCase(), val1 => Sr(val1) === val),
  Rr = val => val1 => typeof val1 === val,
  {
    isArray: $n
  } = Array,
  Dn = Rr("undefined");
function zz588(val) {
  return val !== null && !Dn(val) && val.constructor !== null && !Dn(val.constructor) && st(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const Tc = _t("ArrayBuffer");
function zz589(val) {
  let val2;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? val2 = ArrayBuffer.isView(val) : val2 = val && val.buffer && Tc(val.buffer), val2;
}
const om = Rr("string"),
  st = Rr("function"),
  kc = Rr("number"),
  Es = val => val !== null && typeof val == "object",
  im = val => val === !0 || val === !1,
  js = val => {
    if (Sr(val) !== "object") return !1;
    const val2 = Xo(val);
    return (val2 === null || val2 === Object.prototype || Object.getPrototypeOf(val2) === null) && !(Rc in val) && !(Ar in val);
  },
  lm = val => {
    if (!Es(val) || zz588(val)) return !1;
    try {
      return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
    } catch {
      return !1;
    }
  },
  am = _t("Date"),
  cm = _t("File"),
  um = _t("Blob"),
  dm = _t("FileList"),
  fm = val => Es(val) && st(val.pipe),
  pm = val => {
    let val2;
    return val && (typeof FormData == "function" && val instanceof FormData || st(val.append) && ((val2 = Sr(val)) === "formdata" || val2 === "object" && st(val.toString) && val.toString() === "[object FormData]"));
  },
  mm = _t("URLSearchParams"),
  [hm, gm, vm, ym] = ["ReadableStream", "Request", "Response", "Headers"].map(_t),
  bm = val => val.trim ? val.trim() : val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function zz590(val, val2, {
  allOwnKeys: zz591 = !1
} = {}) {
  if (val === null || typeof val > "u") return;
  let val4, val5;
  if (typeof val != "object" && (val = [val]), $n(val)) for (val4 = 0, val5 = val.length; val4 < val5; val4++) val2.call(null, val[val4], val4, val);else {
    if (zz588(val)) return;
    const val1 = zz591 ? Object.getOwnPropertyNames(val) : Object.keys(val),
      val6 = val1.length;
    let val7;
    for (val4 = 0; val4 < val6; val4++) val7 = val1[val4], val2.call(null, val[val7], val7, val);
  }
}
function zz592(val, val2) {
  if (zz588(val)) return null;
  val2 = val2.toLowerCase();
  const val3 = Object.keys(val);
  let val4 = val3.length,
    val5;
  for (; val4-- > 0;) if (val5 = val3[val4], val2 === val5.toLowerCase()) return val5;
  return null;
}
const dn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global,
  Pc = val => !Dn(val) && val !== dn;
function zz593() {
  const {
      caseless: val,
      skipUndefined: val2
    } = Pc(this) && this || {},
    obj1 = {},
    fn1 = (val1, val3) => {
      const val4 = val && zz592(obj1, val3) || val3;
      js(obj1[val4]) && js(val1) ? obj1[val4] = zz593(obj1[val4], val1) : js(val1) ? obj1[val4] = zz593({}, val1) : $n(val1) ? obj1[val4] = val1.slice() : (!val2 || !Dn(val1)) && (obj1[val4] = val1);
    };
  for (let num = 0, argumentsLength = arguments.length; num < argumentsLength; num++) arguments[num] && zz590(arguments[num], fn1);
  return obj1;
}
const wm = (val, val2, val3, {
    allOwnKeys: zz594
  } = {}) => (zz590(val2, (val1, val5) => {
    val3 && st(val1) ? val[val5] = zz587(val1, val3) : val[val5] = val1;
  }, {
    allOwnKeys: zz594
  }), val),
  _m = val => (val.charCodeAt(0) === 65279 && (val = val.slice(1)), val),
  Em = (val, val2, val3, val4) => {
    val.prototype = Object.create(val2.prototype, val4), val.prototype.constructor = val, Object.defineProperty(val, "super", {
      value: val2.prototype
    }), val3 && Object.assign(val.prototype, val3);
  },
  xm = (val, val2, val3, val4) => {
    let val5, val6, val7;
    const obj1 = {};
    if (val2 = val2 || {}, val == null) return val2;
    do {
      for (val5 = Object.getOwnPropertyNames(val), val6 = val5.length; val6-- > 0;) val7 = val5[val6], (!val4 || val4(val7, val, val2)) && !obj1[val7] && (val2[val7] = val[val7], obj1[val7] = !0);
      val = val3 !== !1 && Xo(val);
    } while (val && (!val3 || val3(val, val2)) && val !== Object.prototype);
    return val2;
  },
  Cm = (val, val2, val3) => {
    val = String(val), (val3 === void 0 || val3 > val.length) && (val3 = val.length), val3 -= val2.length;
    const val4 = val.indexOf(val2, val3);
    return val4 !== -1 && val4 === val3;
  },
  Am = val => {
    if (!val) return null;
    if ($n(val)) return val;
    let val2 = val.length;
    if (!kc(val2)) return null;
    const array = new Array(val2);
    for (; val2-- > 0;) array[val2] = val[val2];
    return array;
  },
  Sm = (val => val1 => val && val1 instanceof val)(typeof Uint8Array < "u" && Xo(Uint8Array)),
  Rm = (val, val2) => {
    const val3 = (val && val[Ar]).call(val);
    let val4;
    for (; (val4 = val3.next()) && !val4.done;) {
      const val1 = val4.value;
      val2.call(val, val1[0], val1[1]);
    }
  },
  Tm = (val, val2) => {
    let val3;
    const list = [];
    for (; (val3 = val.exec(val2)) !== null;) list.push(val3);
    return list;
  },
  km = _t("HTMLFormElement"),
  Om = val => val.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (val1, val2, val3) {
    return val2.toUpperCase() + val3;
  }),
  hl = (({
    hasOwnProperty: zz595
  }) => (val1, val2) => zz595.call(val1, val2))(Object.prototype),
  Pm = _t("RegExp"),
  Ic = (val, val2) => {
    const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(val),
      obj1 = {};
    zz590(ownPropertyDescriptors, (val1, val4) => {
      let val5;
      (val5 = val2(val1, val4, val)) !== !1 && (obj1[val4] = val5 || val1);
    }), Object.defineProperties(val, obj1);
  },
  Im = val => {
    Ic(val, (val1, val2) => {
      if (st(val) && ["arguments", "caller", "callee"].indexOf(val2) !== -1) return !1;
      const val3 = val[val2];
      if (st(val3)) {
        if (val1.enumerable = !1, "writable" in val1) {
          val1.writable = !1;
          return;
        }
        val1.set || (val1.set = () => {
          throw Error("Can not rewrite read-only method '" + val2 + "'");
        });
      }
    });
  },
  Mm = (val, val2) => {
    const obj1 = {},
      fn1 = val1 => {
        val1.forEach(val3 => {
          obj1[val3] = !0;
        });
      };
    return $n(val) ? fn1(val) : fn1(String(val).split(val2)), obj1;
  },
  Lm = () => {},
  Nm = (val, val2) => val != null && Number.isFinite(val = +val) ? val : val2;
function zz596(val) {
  return !!(val && st(val.append) && val[Rc] === "FormData" && val[Ar]);
}
const Bm = val => {
    const array = new Array(10),
      fn1 = (val1, val2) => {
        if (Es(val1)) {
          if (array.indexOf(val1) >= 0) return;
          if (zz588(val1)) return val1;
          if (!("toJSON" in val1)) {
            array[val2] = val1;
            const val3 = $n(val1) ? [] : {};
            return zz590(val1, (val4, val5) => {
              const val6 = fn1(val4, val2 + 1);
              !Dn(val6) && (val3[val5] = val6);
            }), array[val2] = void 0, val3;
          }
        }
        return val1;
      };
    return fn1(val, 0);
  },
  $m = _t("AsyncFunction"),
  Fm = val => val && (Es(val) || st(val)) && st(val.then) && st(val.catch),
  Mc = ((val, val2) => val ? setImmediate : val2 ? ((val1, val3) => (dn.addEventListener("message", ({
    source: zz597,
    data: zz598
  }) => {
    zz597 === dn && zz598 === val1 && val3.length && val3.shift()();
  }, !1), val4 => {
    val3.push(val4), dn.postMessage(val1, "*");
  }))(`axios@${Math.random()}`, []) : val1 => setTimeout(val1))(typeof setImmediate == "function", st(dn.postMessage)),
  Vm = typeof queueMicrotask < "u" ? queueMicrotask.bind(dn) : typeof process < "u" && process.nextTick || Mc,
  Hm = val => val != null && st(val[Ar]),
  typePredicates = {
    isArray: $n,
    isArrayBuffer: Tc,
    isBuffer: zz588,
    isFormData: pm,
    isArrayBufferView: zz589,
    isString: om,
    isNumber: kc,
    isBoolean: im,
    isObject: Es,
    isPlainObject: js,
    isEmptyObject: lm,
    isReadableStream: hm,
    isRequest: gm,
    isResponse: vm,
    isHeaders: ym,
    isUndefined: Dn,
    isDate: am,
    isFile: cm,
    isBlob: um,
    isRegExp: Pm,
    isFunction: st,
    isStream: fm,
    isURLSearchParams: mm,
    isTypedArray: Sm,
    isFileList: dm,
    forEach: zz590,
    merge: zz593,
    extend: wm,
    trim: bm,
    stripBOM: _m,
    inherits: Em,
    toFlatObject: xm,
    kindOf: Sr,
    kindOfTest: _t,
    endsWith: Cm,
    toArray: Am,
    forEachEntry: Rm,
    matchAll: Tm,
    isHTMLForm: km,
    hasOwnProperty: hl,
    hasOwnProp: hl,
    reduceDescriptors: Ic,
    freezeMethods: Im,
    toObjectSet: Mm,
    toCamelCase: Om,
    noop: Lm,
    toFiniteNumber: Nm,
    findKey: zz592,
    global: dn,
    isContextDefined: Pc,
    isSpecCompliantForm: zz596,
    toJSONObject: Bm,
    isAsyncFn: $m,
    isThenable: Fm,
    setImmediate: Mc,
    asap: Vm,
    isIterable: Hm
  };
function zz599(val, val2, val3, val4, val5) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = val, this.name = "AxiosError", val2 && (this.code = val2), val3 && (this.config = val3), val4 && (this.request = val4), val5 && (this.response = val5, this.status = val5.status ? val5.status : null);
}
typePredicates.inherits(zz599, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: typePredicates.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Lc = zz599.prototype,
  Nc = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(val => {
  Nc[val] = {
    value: val
  };
});
Object.defineProperties(zz599, Nc);
Object.defineProperty(Lc, "isAxiosError", {
  value: !0
});
zz599.from = (val, val2, val3, val4, val5, val6) => {
  const val7 = Object.create(Lc);
  typePredicates.toFlatObject(val, val7, function (val1) {
    return val1 !== Error.prototype;
  }, val1 => val1 !== "isAxiosError");
  const val8 = val && val.message ? val.message : "Error",
    val9 = val2 == null && val ? val.code : val2;
  return zz599.call(val7, val8, val9, val3, val4, val5), val && val7.cause == null && Object.defineProperty(val7, "cause", {
    value: val,
    configurable: !0
  }), val7.name = val && val.name || "Error", val6 && Object.assign(val7, val6), val7;
};
const Um = null;
function zz600(val) {
  return typePredicates.isPlainObject(val) || typePredicates.isArray(val);
}
function zz601(val) {
  return typePredicates.endsWith(val, "[]") ? val.slice(0, -2) : val;
}
function zz602(val, val2, val3) {
  return val ? val.concat(val2).map(function (val1, val4) {
    return val1 = zz601(val1), !val3 && val4 ? "[" + val1 + "]" : val1;
  }).join(val3 ? "." : "") : val2;
}
function zz603(val) {
  return typePredicates.isArray(val) && !val.some(zz600);
}
const jm = typePredicates.toFlatObject(typePredicates, {}, null, function (val) {
  return /^is[A-Z]/.test(val);
});
function zz604(val, val2, val3) {
  if (!typePredicates.isObject(val)) throw new TypeError("target must be an object");
  val2 = val2 || new FormData(), val3 = typePredicates.toFlatObject(val3, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function (val1, val10) {
    return !typePredicates.isUndefined(val10[val1]);
  });
  const val4 = val3.metaTokens,
    val5 = val3.visitor || zz606,
    val6 = val3.dots,
    val7 = val3.indexes,
    val8 = (val3.Blob || typeof Blob < "u" && Blob) && typePredicates.isSpecCompliantForm(val2);
  if (!typePredicates.isFunction(val5)) throw new TypeError("visitor must be a function");
  function zz605(val1) {
    if (val1 === null) return "";
    if (typePredicates.isDate(val1)) return val1.toISOString();
    if (typePredicates.isBoolean(val1)) return val1.toString();
    if (!val8 && typePredicates.isBlob(val1)) throw new zz599("Blob is not supported. Use a Buffer instead.");
    return typePredicates.isArrayBuffer(val1) || typePredicates.isTypedArray(val1) ? val8 && typeof Blob == "function" ? new Blob([val1]) : Buffer.from(val1) : val1;
  }
  function zz606(val1, val10, val11) {
    let val12 = val1;
    if (val1 && !val11 && typeof val1 == "object") {
      if (typePredicates.endsWith(val10, "{}")) val10 = val4 ? val10 : val10.slice(0, -2), val1 = JSON.stringify(val1);else if (typePredicates.isArray(val1) && zz603(val1) || (typePredicates.isFileList(val1) || typePredicates.endsWith(val10, "[]")) && (val12 = typePredicates.toArray(val1))) return val10 = zz601(val10), val12.forEach(function (val13, val14) {
        !(typePredicates.isUndefined(val13) || val13 === null) && val2.append(val7 === !0 ? zz602([val10], val14, val6) : val7 === null ? val10 : val10 + "[]", zz605(val13));
      }), !1;
    }
    return zz600(val1) ? !0 : (val2.append(zz602(val11, val10, val6), zz605(val1)), !1);
  }
  const list = [],
    val9 = Object.assign(jm, {
      defaultVisitor: zz606,
      convertValue: zz605,
      isVisitable: zz600
    });
  function zz607(val1, val10) {
    if (!typePredicates.isUndefined(val1)) {
      if (list.indexOf(val1) !== -1) throw Error("Circular reference detected in " + val10.join("."));
      list.push(val1), typePredicates.forEach(val1, function (val11, val12) {
        (!(typePredicates.isUndefined(val11) || val11 === null) && val5.call(val2, val11, typePredicates.isString(val12) ? val12.trim() : val12, val10, val9)) === !0 && zz607(val11, val10 ? val10.concat(val12) : [val12]);
      }), list.pop();
    }
  }
  if (!typePredicates.isObject(val)) throw new TypeError("data must be an object");
  return zz607(val), val2;
}
function zz608(val) {
  const obj1 = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(val).replace(/[!'()~]|%20|%00/g, function (val1) {
    return obj1[val1];
  });
}
function zz609(val, val2) {
  this._pairs = [], val && zz604(val, this, val2);
}
const Bc = zz609.prototype;
Bc.append = function (val, val2) {
  this._pairs.push([val, val2]);
};
Bc.toString = function (val) {
  const val2 = val ? function (val1) {
    return val.call(this, val1, zz608);
  } : zz608;
  return this._pairs.map(function (val1) {
    return val2(val1[0]) + "=" + val2(val1[1]);
  }, "").join("&");
};
function zz610(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function zz611(val, val2, val3) {
  if (!val2) return val;
  const val4 = val3 && val3.encode || zz610;
  typePredicates.isFunction(val3) && (val3 = {
    serialize: val3
  });
  const val5 = val3 && val3.serialize;
  let val6;
  if (val5 ? val6 = val5(val2, val3) : val6 = typePredicates.isURLSearchParams(val2) ? val2.toString() : new zz609(val2, val3).toString(val4), val6) {
    const val1 = val.indexOf("#");
    val1 !== -1 && (val = val.slice(0, val1)), val += (val.indexOf("?") === -1 ? "?" : "&") + val6;
  }
  return val;
}
class zz612 {
  constructor() {
    this.handlers = [];
  }
  use(val, val2, val3) {
    return this.handlers.push({
      fulfilled: val,
      rejected: val2,
      synchronous: val3 ? val3.synchronous : !1,
      runWhen: val3 ? val3.runWhen : null
    }), this.handlers.length - 1;
  }
  eject(val) {
    this.handlers[val] && (this.handlers[val] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(val) {
    typePredicates.forEach(this.handlers, function (val1) {
      val1 !== null && val(val1);
    });
  }
}
const Fc = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  Wm = typeof URLSearchParams < "u" ? URLSearchParams : zz609,
  Gm = typeof FormData < "u" ? FormData : null,
  zm = typeof Blob < "u" ? Blob : null,
  Qm = {
    isBrowser: !0,
    classes: {
      URLSearchParams: Wm,
      FormData: Gm,
      Blob: zm
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  },
  ei = typeof window < "u" && typeof document < "u",
  Ro = typeof navigator == "object" && navigator || void 0,
  Jm = ei && (!Ro || ["ReactNative", "NativeScript", "NS"].indexOf(Ro.product) < 0),
  Ym = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function",
  Xm = ei && window.location.href || "http://localhost",
  Zm = Object.freeze(Object.defineProperty({
    __proto__: null,
    hasBrowserEnv: ei,
    hasStandardBrowserEnv: Jm,
    hasStandardBrowserWebWorkerEnv: Ym,
    navigator: Ro,
    origin: Xm
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Je = {
    ...Zm,
    ...Qm
  };
function zz613(val, val2) {
  return zz604(val, new Je.classes.URLSearchParams(), {
    visitor: function (val1, val3, val4, val5) {
      return Je.isNode && typePredicates.isBuffer(val1) ? (this.append(val3, val1.toString("base64")), !1) : val5.defaultVisitor.apply(this, arguments);
    },
    ...val2
  });
}
function zz614(val) {
  return typePredicates.matchAll(/\w+|\[(\w*)]/g, val).map(val1 => val1[0] === "[]" ? "" : val1[1] || val1[0]);
}
function zz615(val) {
  const obj1 = {},
    val2 = Object.keys(val);
  let val3;
  const val4 = val2.length;
  let val5;
  for (val3 = 0; val3 < val4; val3++) val5 = val2[val3], obj1[val5] = val[val5];
  return obj1;
}
function zz616(val) {
  function zz617(val1, val2, val3, val4) {
    let val5 = val1[val4++];
    if (val5 === "__proto__") return !0;
    const val6 = Number.isFinite(+val5),
      val7 = val4 >= val1.length;
    return val5 = !val5 && typePredicates.isArray(val3) ? val3.length : val5, val7 ? (typePredicates.hasOwnProp(val3, val5) ? val3[val5] = [val3[val5], val2] : val3[val5] = val2, !val6) : ((!val3[val5] || !typePredicates.isObject(val3[val5])) && (val3[val5] = []), zz617(val1, val2, val3[val5], val4) && typePredicates.isArray(val3[val5]) && (val3[val5] = zz615(val3[val5])), !val6);
  }
  if (typePredicates.isFormData(val) && typePredicates.isFunction(val.entries)) {
    const obj1 = {};
    return typePredicates.forEachEntry(val, (val1, val2) => {
      zz617(zz614(val1), val2, obj1, 0);
    }), obj1;
  }
  return null;
}
function zz618(val, val2, val3) {
  if (typePredicates.isString(val)) try {
    return (val2 || JSON.parse)(val), typePredicates.trim(val);
  } catch (val1) {
    if (val1.name !== "SyntaxError") throw val1;
  }
  return (val3 || JSON.stringify)(val);
}
const Cs = {
  transitional: Fc,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function (val, val2) {
    const val3 = val2.getContentType() || "",
      val4 = val3.indexOf("application/json") > -1,
      val5 = typePredicates.isObject(val);
    if (val5 && typePredicates.isHTMLForm(val) && (val = new FormData(val)), typePredicates.isFormData(val)) return val4 ? JSON.stringify(zz616(val)) : val;
    if (typePredicates.isArrayBuffer(val) || typePredicates.isBuffer(val) || typePredicates.isStream(val) || typePredicates.isFile(val) || typePredicates.isBlob(val) || typePredicates.isReadableStream(val)) return val;
    if (typePredicates.isArrayBufferView(val)) return val.buffer;
    if (typePredicates.isURLSearchParams(val)) return val2.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), val.toString();
    let val6;
    if (val5) {
      if (val3.indexOf("application/x-www-form-urlencoded") > -1) return zz613(val, this.formSerializer).toString();
      if ((val6 = typePredicates.isFileList(val)) || val3.indexOf("multipart/form-data") > -1) {
        const val1 = this.env && this.env.FormData;
        return zz604(val6 ? {
          "files[]": val
        } : val, val1 && new val1(), this.formSerializer);
      }
    }
    return val5 || val4 ? (val2.setContentType("application/json", !1), zz618(val)) : val;
  }],
  transformResponse: [function (val) {
    const val2 = this.transitional || Cs.transitional,
      val3 = val2 && val2.forcedJSONParsing,
      val4 = this.responseType === "json";
    if (typePredicates.isResponse(val) || typePredicates.isReadableStream(val)) return val;
    if (val && typePredicates.isString(val) && (val3 && !this.responseType || val4)) {
      const val1 = !(val2 && val2.silentJSONParsing) && val4;
      try {
        return JSON.parse(val, this.parseReviver);
      } catch (val5) {
        if (val1) throw val5.name === "SyntaxError" ? zz599.from(val5, zz599.ERR_BAD_RESPONSE, this, null, this.response) : val5;
      }
    }
    return val;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Je.classes.FormData,
    Blob: Je.classes.Blob
  },
  validateStatus: function (val) {
    return val >= 200 && val < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
typePredicates.forEach(["delete", "get", "head", "post", "put", "patch"], val => {
  Cs.headers[val] = {};
});
const rh = typePredicates.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
  oh = val => {
    const obj1 = {};
    let val2, val3, val4;
    return val && val.split(`
`).forEach(function (val1) {
      val4 = val1.indexOf(":"), val2 = val1.substring(0, val4).trim().toLowerCase(), val3 = val1.substring(val4 + 1).trim(), !(!val2 || obj1[val2] && rh[val2]) && (val2 === "set-cookie" ? obj1[val2] ? obj1[val2].push(val3) : obj1[val2] = [val3] : obj1[val2] = obj1[val2] ? obj1[val2] + ", " + val3 : val3);
    }), obj1;
  },
  bl = Symbol("internals");
function zz619(val) {
  return val && String(val).trim().toLowerCase();
}
function zz620(val) {
  return val === !1 || val == null ? val : typePredicates.isArray(val) ? val.map(zz620) : String(val);
}
function zz621(val) {
  const val2 = Object.create(null),
    val3 = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let val4;
  for (; val4 = val3.exec(val);) val2[val4[1]] = val4[2];
  return val2;
}
const lh = val => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(val.trim());
function zz622(val, val2, val3, val4, val5) {
  if (typePredicates.isFunction(val4)) return val4.call(this, val2, val3);
  if (val5 && (val2 = val3), !!typePredicates.isString(val2)) {
    if (typePredicates.isString(val4)) return val2.indexOf(val4) !== -1;
    if (typePredicates.isRegExp(val4)) return val4.test(val2);
  }
}
function zz623(val) {
  return val.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (val1, val2, val3) => val2.toUpperCase() + val3);
}
function zz624(val, val2) {
  const val3 = typePredicates.toCamelCase(" " + val2);
  ["get", "set", "has"].forEach(val1 => {
    Object.defineProperty(val, val1 + val3, {
      value: function (val4, val5, val6) {
        return this[val1].call(this, val2, val4, val5, val6);
      },
      configurable: !0
    });
  });
}
let rt = class {
  constructor(val) {
    val && this.set(val);
  }
  set(val, val2, val3) {
    const val4 = this;
    function zz625(val1, val5, val6) {
      const val7 = zz619(val5);
      if (!val7) throw new Error("header name must be a non-empty string");
      const val8 = typePredicates.findKey(val4, val7);
      (!val8 || val4[val8] === void 0 || val6 === !0 || val6 === void 0 && val4[val8] !== !1) && (val4[val8 || val5] = zz620(val1));
    }
    const fn1 = (val1, val5) => typePredicates.forEach(val1, (val6, val7) => zz625(val6, val7, val5));
    if (typePredicates.isPlainObject(val) || val instanceof this.constructor) fn1(val, val2);else if (typePredicates.isString(val) && (val = val.trim()) && !lh(val)) fn1(oh(val), val2);else if (typePredicates.isObject(val) && typePredicates.isIterable(val)) {
      let obj1 = {},
        val1,
        val5;
      for (const val_tdz28 of val) {
        if (!typePredicates.isArray(val_tdz28)) throw TypeError("Object iterator must return a key-value pair");
        obj1[val5 = val_tdz28[0]] = (val1 = obj1[val5]) ? typePredicates.isArray(val1) ? [...val1, val_tdz28[1]] : [val1, val_tdz28[1]] : val_tdz28[1];
      }
      fn1(obj1, val2);
    } else val != null && zz625(val2, val, val3);
    return this;
  }
  get(val, val2) {
    if (val = zz619(val), val) {
      const val1 = typePredicates.findKey(this, val);
      if (val1) {
        const val3 = this[val1];
        if (!val2) return val3;
        if (val2 === !0) return zz621(val3);
        if (typePredicates.isFunction(val2)) return val2.call(this, val3, val1);
        if (typePredicates.isRegExp(val2)) return val2.exec(val3);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(val, val2) {
    if (val = zz619(val), val) {
      const val1 = typePredicates.findKey(this, val);
      return !!(val1 && this[val1] !== void 0 && (!val2 || zz622(this, this[val1], val1, val2)));
    }
    return !1;
  }
  delete(val, val2) {
    const val3 = this;
    let val4 = !1;
    function zz626(val1) {
      if (val1 = zz619(val1), val1) {
        const val5 = typePredicates.findKey(val3, val1);
        val5 && (!val2 || zz622(val3, val3[val5], val5, val2)) && (delete val3[val5], val4 = !0);
      }
    }
    return typePredicates.isArray(val) ? val.forEach(zz626) : zz626(val), val4;
  }
  clear(val) {
    const val2 = Object.keys(this);
    let val3 = val2.length,
      val4 = !1;
    for (; val3--;) {
      const val1 = val2[val3];
      (!val || zz622(this, this[val1], val1, val, !0)) && (delete this[val1], val4 = !0);
    }
    return val4;
  }
  normalize(val) {
    const val2 = this,
      obj1 = {};
    return typePredicates.forEach(this, (val1, val3) => {
      const val4 = typePredicates.findKey(obj1, val3);
      if (val4) {
        val2[val4] = zz620(val1), delete val2[val3];
        return;
      }
      const val5 = val ? zz623(val3) : String(val3).trim();
      val5 !== val3 && delete val2[val3], val2[val5] = zz620(val1), obj1[val5] = !0;
    }), this;
  }
  concat(...val) {
    return this.constructor.concat(this, ...val);
  }
  toJSON(val) {
    const val2 = Object.create(null);
    return typePredicates.forEach(this, (val1, val3) => {
      val1 != null && val1 !== !1 && (val2[val3] = val && typePredicates.isArray(val1) ? val1.join(", ") : val1);
    }), val2;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([zz627, zz628]) => zz627 + ": " + zz628).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(val) {
    return val instanceof this ? val : new this(val);
  }
  static concat(val, ...val2) {
    const inst = new this(val);
    return val2.forEach(val1 => inst.set(val1)), inst;
  }
  static accessor(val) {
    const val2 = (this[bl] = this[bl] = {
        accessors: {}
      }).accessors,
      val3 = this.prototype;
    function zz629(val1) {
      const val4 = zz619(val1);
      val2[val4] || (zz624(val3, val1), val2[val4] = !0);
    }
    return typePredicates.isArray(val) ? val.forEach(zz629) : zz629(val), this;
  }
};
rt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
typePredicates.reduceDescriptors(rt.prototype, ({
  value: zz630
}, val2) => {
  let val3 = val2[0].toUpperCase() + val2.slice(1);
  return {
    get: () => zz630,
    set(val1) {
      this[val3] = val1;
    }
  };
});
typePredicates.freezeMethods(rt);
function zz631(val, val2) {
  const val3 = this || Cs,
    val4 = val2 || val3,
    val5 = rt.from(val4.headers);
  let val6 = val4.data;
  return typePredicates.forEach(val, function (val1) {
    val6 = val1.call(val3, val6, val5.normalize(), val2 ? val2.status : void 0);
  }), val5.normalize(), val6;
}
function zz632(val) {
  return !!(val && val.__CANCEL__);
}
function zz633(val, val2, val3) {
  zz599.call(this, val ?? "canceled", zz599.ERR_CANCELED, val2, val3), this.name = "CanceledError";
}
typePredicates.inherits(zz633, zz599, {
  __CANCEL__: !0
});
function zz634(val, val2, val3) {
  const val4 = val3.config.validateStatus;
  !val3.status || !val4 || val4(val3.status) ? val(val3) : val2(new zz599("Request failed with status code " + val3.status, [zz599.ERR_BAD_REQUEST, zz599.ERR_BAD_RESPONSE][Math.floor(val3.status / 100) - 4], val3.config, val3.request, val3));
}
function zz635(val) {
  const val2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(val);
  return val2 && val2[1] || "";
}
function zz636(val, val2) {
  val = val || 10;
  const array = new Array(val),
    array2 = new Array(val);
  let num = 0,
    num2 = 0,
    val3;
  return val2 = val2 !== void 0 ? val2 : 1e3, function (val1) {
    const val4 = Date.now(),
      array2Num2 = array2[num2];
    val3 || (val3 = val4), array[num] = val1, array2[num] = val4;
    let val6 = num2,
      num1 = 0;
    for (; val6 !== num;) num1 += array[val6++], val6 = val6 % val;
    if (num = (num + 1) % val, num === num2 && (num2 = (num2 + 1) % val), val4 - val3 < val2) return;
    const val7 = array2Num2 && val4 - array2Num2;
    return val7 ? Math.round(num1 * 1e3 / val7) : void 0;
  };
}
function zz637(val, val2) {
  let num = 0,
    val3 = 1e3 / val2,
    val4,
    val5;
  const fn1 = (val1, zz638 = Date.now()) => {
    num = zz638, val4 = null, val5 && (clearTimeout(val5), val5 = null), val(...val1);
  };
  return [(...val1) => {
    const val6 = Date.now(),
      val7 = val6 - num;
    val7 >= val3 ? fn1(val1, val6) : (val4 = val1, val5 || (val5 = setTimeout(() => {
      val5 = null, fn1(val4);
    }, val3 - val7)));
  }, () => val4 && fn1(val4)];
}
const sr = (val, val2, zz639 = 3) => {
    let num = 0;
    const val4 = zz636(50, 250);
    return zz637(val1 => {
      const val5 = val1.loaded,
        val6 = val1.lengthComputable ? val1.total : void 0,
        val7 = val5 - num,
        val8 = val4(val7),
        val9 = val5 <= val6;
      num = val5;
      const obj1 = {
        loaded: val5,
        total: val6,
        progress: val6 ? val5 / val6 : void 0,
        bytes: val7,
        rate: val8 || void 0,
        estimated: val8 && val6 && val9 ? (val6 - val5) / val8 : void 0,
        event: val1,
        lengthComputable: val6 != null,
        [val2 ? "download" : "upload"]: !0
      };
      val(obj1);
    }, zz639);
  },
  wl = (val, val2) => {
    const val3 = val != null;
    return [val1 => val2[0]({
      lengthComputable: val3,
      total: val,
      loaded: val1
    }), val2[1]];
  },
  _l = val => (...val1) => typePredicates.asap(() => val(...val1)),
  ph = Je.hasStandardBrowserEnv ? ((val, val2) => val1 => (val1 = new URL(val1, Je.origin), val.protocol === val1.protocol && val.host === val1.host && (val2 || val.port === val1.port)))(new URL(Je.origin), Je.navigator && /(msie|trident)/i.test(Je.navigator.userAgent)) : () => !0,
  mh = Je.hasStandardBrowserEnv ? {
    write(val, val2, val3, val4, val5, val6, val7) {
      if (typeof document > "u") return;
      const list = [`${val}=${encodeURIComponent(val2)}`];
      typePredicates.isNumber(val3) && list.push(`expires=${new Date(val3).toUTCString()}`), typePredicates.isString(val4) && list.push(`path=${val4}`), typePredicates.isString(val5) && list.push(`domain=${val5}`), val6 === !0 && list.push("secure"), typePredicates.isString(val7) && list.push(`SameSite=${val7}`), document.cookie = list.join("; ");
    },
    read(val) {
      if (typeof document > "u") return null;
      const val2 = document.cookie.match(new RegExp("(?:^|; )" + val + "=([^;]*)"));
      return val2 ? decodeURIComponent(val2[1]) : null;
    },
    remove(val) {
      this.write(val, "", Date.now() - 864e5, "/");
    }
  } : {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };
function zz640(val) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(val);
}
function zz641(val, val2) {
  return val2 ? val.replace(/\/?\/$/, "") + "/" + val2.replace(/^\/+/, "") : val;
}
function zz642(val, val2, val3) {
  let val4 = !zz640(val2);
  return val && (val4 || val3 == !1) ? zz641(val, val2) : val2;
}
const El = val => val instanceof rt ? {
  ...val
} : val;
function zz643(val, val2) {
  val2 = val2 || {};
  const obj1 = {};
  function zz644(val1, val3, val4, val5) {
    return typePredicates.isPlainObject(val1) && typePredicates.isPlainObject(val3) ? typePredicates.merge.call({
      caseless: val5
    }, val1, val3) : typePredicates.isPlainObject(val3) ? typePredicates.merge({}, val3) : typePredicates.isArray(val3) ? val3.slice() : val3;
  }
  function zz645(val1, val3, val4, val5) {
    if (typePredicates.isUndefined(val3)) {
      if (!typePredicates.isUndefined(val1)) return zz644(void 0, val1, val4, val5);
    } else return zz644(val1, val3, val4, val5);
  }
  function zz646(val1, val3) {
    if (!typePredicates.isUndefined(val3)) return zz644(void 0, val3);
  }
  function zz647(val1, val3) {
    if (typePredicates.isUndefined(val3)) {
      if (!typePredicates.isUndefined(val1)) return zz644(void 0, val1);
    } else return zz644(void 0, val3);
  }
  function zz648(val1, val3, val4) {
    if (val4 in val2) return zz644(val1, val3);
    if (val4 in val) return zz644(void 0, val1);
  }
  const obj2 = {
    url: zz646,
    method: zz646,
    data: zz646,
    baseURL: zz647,
    transformRequest: zz647,
    transformResponse: zz647,
    paramsSerializer: zz647,
    timeout: zz647,
    timeoutMessage: zz647,
    withCredentials: zz647,
    withXSRFToken: zz647,
    adapter: zz647,
    responseType: zz647,
    xsrfCookieName: zz647,
    xsrfHeaderName: zz647,
    onUploadProgress: zz647,
    onDownloadProgress: zz647,
    decompress: zz647,
    maxContentLength: zz647,
    maxBodyLength: zz647,
    beforeRedirect: zz647,
    transport: zz647,
    httpAgent: zz647,
    httpsAgent: zz647,
    cancelToken: zz647,
    socketPath: zz647,
    responseEncoding: zz647,
    validateStatus: zz648,
    headers: (val1, val3, val4) => zz645(El(val1), El(val3), val4, !0)
  };
  return typePredicates.forEach(Object.keys({
    ...val,
    ...val2
  }), function (val1) {
    const val3 = obj2[val1] || zz645,
      val4 = val3(val[val1], val2[val1], val1);
    typePredicates.isUndefined(val4) && val3 !== zz648 || (obj1[val1] = val4);
  }), obj1;
}
const jc = val => {
    const val2 = zz643({}, val);
    let {
      data: val3,
      withXSRFToken: val4,
      xsrfHeaderName: val5,
      xsrfCookieName: val6,
      headers: val7,
      auth: val8
    } = val2;
    if (val2.headers = val7 = rt.from(val7), val2.url = zz611(zz642(val2.baseURL, val2.url, val2.allowAbsoluteUrls), val.params, val.paramsSerializer), val8 && val7.set("Authorization", "Basic " + btoa((val8.username || "") + ":" + (val8.password ? unescape(encodeURIComponent(val8.password)) : ""))), typePredicates.isFormData(val3)) {
      if (Je.hasStandardBrowserEnv || Je.hasStandardBrowserWebWorkerEnv) val7.setContentType(void 0);else if (typePredicates.isFunction(val3.getHeaders)) {
        const headers = val3.getHeaders(),
          list = ["content-type", "content-length"];
        Object.entries(headers).forEach(([zz649, zz650]) => {
          list.includes(zz649.toLowerCase()) && val7.set(zz649, zz650);
        });
      }
    }
    if (Je.hasStandardBrowserEnv && (val4 && typePredicates.isFunction(val4) && (val4 = val4(val2)), val4 || val4 !== !1 && ph(val2.url))) {
      const val1 = val5 && val6 && mh.read(val6);
      val1 && val7.set(val5, val1);
    }
    return val2;
  },
  vh = typeof XMLHttpRequest < "u",
  yh = vh && function (val) {
    return new Promise(function (val1, val2) {
      const val3 = jc(val);
      let val4 = val3.data;
      const val5 = rt.from(val3.headers).normalize();
      let {
          responseType: val6,
          onUploadProgress: val7,
          onDownloadProgress: val8
        } = val3,
        val9,
        val10,
        val11,
        val12,
        val13;
      function zz651() {
        val12 && val12(), val13 && val13(), val3.cancelToken && val3.cancelToken.unsubscribe(val9), val3.signal && val3.signal.removeEventListener("abort", val9);
      }
      let xmlhttprequest = new XMLHttpRequest();
      xmlhttprequest.open(val3.method.toUpperCase(), val3.url, !0), xmlhttprequest.timeout = val3.timeout;
      function zz652() {
        if (!xmlhttprequest) return;
        const val15 = rt.from("getAllResponseHeaders" in xmlhttprequest && xmlhttprequest.getAllResponseHeaders()),
          obj1 = {
            data: !val6 || val6 === "text" || val6 === "json" ? xmlhttprequest.responseText : xmlhttprequest.response,
            status: xmlhttprequest.status,
            statusText: xmlhttprequest.statusText,
            headers: val15,
            config: val,
            request: xmlhttprequest
          };
        zz634(function (val16) {
          val1(val16), zz651();
        }, function (val16) {
          val2(val16), zz651();
        }, obj1), xmlhttprequest = null;
      }
      "onloadend" in xmlhttprequest ? xmlhttprequest.onloadend = zz652 : xmlhttprequest.onreadystatechange = function () {
        !xmlhttprequest || xmlhttprequest.readyState !== 4 || xmlhttprequest.status === 0 && !(xmlhttprequest.responseURL && xmlhttprequest.responseURL.indexOf("file:") === 0) || setTimeout(zz652);
      }, xmlhttprequest.onabort = function () {
        xmlhttprequest && (val2(new zz599("Request aborted", zz599.ECONNABORTED, val, xmlhttprequest)), xmlhttprequest = null);
      }, xmlhttprequest.onerror = function (val15) {
        const val16 = val15 && val15.message ? val15.message : "Network Error",
          ge1 = new zz599(val16, zz599.ERR_NETWORK, val, xmlhttprequest);
        ge1.event = val15 || null, val2(ge1), xmlhttprequest = null;
      }, xmlhttprequest.ontimeout = function () {
        let val15 = val3.timeout ? "timeout of " + val3.timeout + "ms exceeded" : "timeout exceeded";
        const val16 = val3.transitional || Fc;
        val3.timeoutErrorMessage && (val15 = val3.timeoutErrorMessage), val2(new zz599(val15, val16.clarifyTimeoutError ? zz599.ETIMEDOUT : zz599.ECONNABORTED, val, xmlhttprequest)), xmlhttprequest = null;
      }, val4 === void 0 && val5.setContentType(null), "setRequestHeader" in xmlhttprequest && typePredicates.forEach(val5.toJSON(), function (val15, val16) {
        xmlhttprequest.setRequestHeader(val16, val15);
      }), typePredicates.isUndefined(val3.withCredentials) || (xmlhttprequest.withCredentials = !!val3.withCredentials), val6 && val6 !== "json" && (xmlhttprequest.responseType = val3.responseType), val8 && ([val11, val13] = sr(val8, !0), xmlhttprequest.addEventListener("progress", val11)), val7 && xmlhttprequest.upload && ([val10, val12] = sr(val7), xmlhttprequest.upload.addEventListener("progress", val10), xmlhttprequest.upload.addEventListener("loadend", val12)), (val3.cancelToken || val3.signal) && (val9 = val15 => {
        xmlhttprequest && (val2(!val15 || val15.type ? new zz633(null, val, xmlhttprequest) : val15), xmlhttprequest.abort(), xmlhttprequest = null);
      }, val3.cancelToken && val3.cancelToken.subscribe(val9), val3.signal && (val3.signal.aborted ? val9() : val3.signal.addEventListener("abort", val9)));
      const val14 = zz635(val3.url);
      if (val14 && Je.protocols.indexOf(val14) === -1) {
        val2(new zz599("Unsupported protocol " + val14 + ":", zz599.ERR_BAD_REQUEST, val));
        return;
      }
      xmlhttprequest.send(val4 || null);
    });
  },
  bh = (val, val2) => {
    const {
      length: val3
    } = val = val ? val.filter(Boolean) : [];
    if (val2 || val3) {
      let abortcontroller = new AbortController(),
        val1;
      const fn1 = function (val6) {
        if (!val1) {
          val1 = !0, fn2();
          const val7 = val6 instanceof Error ? val6 : this.reason;
          abortcontroller.abort(val7 instanceof zz599 ? val7 : new zz633(val7 instanceof Error ? val7.message : val7));
        }
      };
      let val4 = val2 && setTimeout(() => {
        val4 = null, fn1(new zz599(`timeout ${val2} of ms exceeded`, zz599.ETIMEDOUT));
      }, val2);
      const fn2 = () => {
        val && (val4 && clearTimeout(val4), val4 = null, val.forEach(val6 => {
          val6.unsubscribe ? val6.unsubscribe(fn1) : val6.removeEventListener("abort", fn1);
        }), val = null);
      };
      val.forEach(val6 => val6.addEventListener("abort", fn1));
      const {
        signal: val5
      } = abortcontroller;
      return val5.unsubscribe = () => typePredicates.asap(fn2), val5;
    }
  },
  wh = function* (val, val2) {
    let val3 = val.byteLength;
    if (val3 < val2) {
      yield val;
      return;
    }
    let num = 0,
      val4;
    for (; num < val3;) val4 = num + val2, yield val.slice(num, val4), num = val4;
  },
  _h = async function* (val, val2) {
    for await (const val_tdz29 of Eh(val)) yield* wh(val_tdz29, val2);
  },
  Eh = async function* (val) {
    if (val[Symbol.asyncIterator]) {
      yield* val;
      return;
    }
    const reader = val.getReader();
    try {
      for (;;) {
        const {
          done: val1,
          value: val3
        } = await reader.read();
        if (val1) break;
        yield val3;
      }
    } finally {
      await reader.cancel();
    }
  },
  xl = (val, val2, val3, val4) => {
    const val5 = _h(val, val2);
    let num = 0,
      val6,
      fn1 = val1 => {
        val6 || (val6 = !0, val4 && val4(val1));
      };
    return new ReadableStream({
      async pull(val1) {
        try {
          const {
            done: val7,
            value: val8
          } = await val5.next();
          if (val7) {
            fn1(), val1.close();
            return;
          }
          let val9 = val8.byteLength;
          if (val3) {
            let val10 = num += val9;
            val3(val10);
          }
          val1.enqueue(new Uint8Array(val8));
        } catch (val7) {
          throw fn1(val7), val7;
        }
      },
      cancel(val1) {
        return fn1(val1), val5.return();
      }
    }, {
      highWaterMark: 2
    });
  },
  Cl = 64 * 1024,
  {
    isFunction: Ls
  } = typePredicates,
  xh = (({
    Request: zz653,
    Response: zz654
  }) => ({
    Request: zz653,
    Response: zz654
  }))(typePredicates.global),
  {
    ReadableStream: Al,
    TextEncoder: Sl
  } = typePredicates.global,
  Rl = (val, ...val2) => {
    try {
      return !!val(...val2);
    } catch {
      return !1;
    }
  },
  Ch = val => {
    val = typePredicates.merge.call({
      skipUndefined: !0
    }, xh, val);
    const {
        fetch: val2,
        Request: val3,
        Response: val4
      } = val,
      val5 = val2 ? Ls(val2) : typeof fetch == "function",
      val6 = Ls(val3),
      val7 = Ls(val4);
    if (!val5) return !1;
    const val8 = val5 && Ls(Al),
      val9 = val5 && (typeof Sl == "function" ? (val1 => val12 => val1.encode(val12))(new Sl()) : async val1 => new Uint8Array(await new val3(val1).arrayBuffer())),
      val10 = val6 && val8 && Rl(() => {
        let val1 = !1;
        const val12 = new val3(Je.origin, {
          body: new Al(),
          method: "POST",
          get duplex() {
            return val1 = !0, "half";
          }
        }).headers.has("Content-Type");
        return val1 && !val12;
      }),
      val11 = val7 && val8 && Rl(() => typePredicates.isReadableStream(new val4("").body)),
      obj1 = {
        stream: val11 && (val1 => val1.body)
      };
    val5 && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(val1 => {
      !obj1[val1] && (obj1[val1] = (val12, val13) => {
        let val14 = val12 && val12[val1];
        if (val14) return val14.call(val12);
        throw new zz599(`Response type '${val1}' is not supported`, zz599.ERR_NOT_SUPPORT, val13);
      });
    });
    const fn1 = async val1 => {
        if (val1 == null) return 0;
        if (typePredicates.isBlob(val1)) return val1.size;
        if (typePredicates.isSpecCompliantForm(val1)) return (await new val3(Je.origin, {
          method: "POST",
          body: val1
        }).arrayBuffer()).byteLength;
        if (typePredicates.isArrayBufferView(val1) || typePredicates.isArrayBuffer(val1)) return val1.byteLength;
        if (typePredicates.isURLSearchParams(val1) && (val1 = val1 + ""), typePredicates.isString(val1)) return (await val9(val1)).byteLength;
      },
      fn2 = async (val1, val12) => {
        const val13 = typePredicates.toFiniteNumber(val1.getContentLength());
        return val13 ?? fn1(val12);
      };
    return async val1 => {
      let {
          url: val12,
          method: val13,
          data: val14,
          signal: val15,
          cancelToken: val16,
          timeout: val17,
          onDownloadProgress: val18,
          onUploadProgress: val19,
          responseType: val20,
          headers: val21,
          withCredentials: val23 = "same-origin",
          fetchOptions: val22
        } = jc(val1),
        val24 = val2 || fetch;
      val20 = val20 ? (val20 + "").toLowerCase() : "text";
      let val25 = bh([val15, val16 && val16.toAbortSignal()], val17),
        val26 = null;
      const val27 = val25 && val25.unsubscribe && (() => {
        val25.unsubscribe();
      });
      let val28;
      try {
        if (val19 && val10 && val13 !== "get" && val13 !== "head" && (val28 = await fn2(val21, val14)) !== 0) {
          let val33 = new val3(val12, {
              method: "POST",
              body: val14,
              duplex: "half"
            }),
            val34;
          if (typePredicates.isFormData(val14) && (val34 = val33.headers.get("content-type")) && val21.setContentType(val34), val33.body) {
            const [val35, val36] = wl(val28, sr(_l(val19)));
            val14 = xl(val33.body, Cl, val35, val36);
          }
        }
        typePredicates.isString(val23) || (val23 = val23 ? "include" : "omit");
        const val29 = val6 && "credentials" in val3.prototype,
          obj2 = {
            ...val22,
            signal: val25,
            method: val13.toUpperCase(),
            headers: val21.normalize().toJSON(),
            body: val14,
            duplex: "half",
            credentials: val29 ? val23 : void 0
          };
        val26 = val6 && new val3(val12, obj2);
        let val30 = await (val6 ? val24(val26, val22) : val24(val12, obj2));
        const val31 = val11 && (val20 === "stream" || val20 === "response");
        if (val11 && (val18 || val31 && val27)) {
          const obj3 = {};
          ["status", "statusText", "headers"].forEach(val36 => {
            obj3[val36] = val30[val36];
          });
          const val33 = typePredicates.toFiniteNumber(val30.headers.get("content-length")),
            [val34, val35] = val18 && wl(val33, sr(_l(val18), !0)) || [];
          val30 = new val4(xl(val30.body, Cl, val34, () => {
            val35 && val35(), val27 && val27();
          }), obj3);
        }
        val20 = val20 || "text";
        let val32 = await obj1[typePredicates.findKey(obj1, val20) || "text"](val30, val1);
        return !val31 && val27 && val27(), await new Promise((val33, val34) => {
          zz634(val33, val34, {
            data: val32,
            headers: rt.from(val30.headers),
            status: val30.status,
            statusText: val30.statusText,
            config: val1,
            request: val26
          });
        });
      } catch (val29) {
        throw val27 && val27(), val29 && val29.name === "TypeError" && /Load failed|fetch/i.test(val29.message) ? Object.assign(new zz599("Network Error", zz599.ERR_NETWORK, val1, val26), {
          cause: val29.cause || val29
        }) : zz599.from(val29, val29 && val29.code, val1, val26);
      }
    };
  },
  Ah = new Map(),
  Kc = val => {
    let val2 = val && val.env || {};
    const {
        fetch: val3,
        Request: val4,
        Response: val5
      } = val2,
      list = [val4, val5, val3];
    let val6 = list.length,
      val7 = val6,
      val8,
      val9,
      val10 = Ah;
    for (; val7--;) val8 = list[val7], val9 = val10.get(val8), val9 === void 0 && val10.set(val8, val9 = val7 ? new Map() : Ch(val2)), val10 = val9;
    return val9;
  };
Kc();
const ti = {
  http: Um,
  xhr: yh,
  fetch: {
    get: Kc
  }
};
typePredicates.forEach(ti, (val, val2) => {
  if (val) {
    try {
      Object.defineProperty(val, "name", {
        value: val2
      });
    } catch {}
    Object.defineProperty(val, "adapterName", {
      value: val2
    });
  }
});
const Tl = val => `- ${val}`,
  Sh = val => typePredicates.isFunction(val) || val === null || val === !1;
function zz655(val, val2) {
  val = typePredicates.isArray(val) ? val : [val];
  const {
    length: val3
  } = val;
  let val4, val5;
  const obj1 = {};
  for (let num = 0; num < val3; num++) {
    val4 = val[num];
    let val1;
    if (val5 = val4, !Sh(val4) && (val5 = ti[(val1 = String(val4)).toLowerCase()], val5 === void 0)) throw new zz599(`Unknown adapter '${val1}'`);
    if (val5 && (typePredicates.isFunction(val5) || (val5 = val5.get(val2)))) break;
    obj1[val1 || "#" + num] = val5;
  }
  if (!val5) {
    const val1 = Object.entries(obj1).map(([zz656, zz657]) => `adapter ${zz656} ` + (zz657 === !1 ? "is not supported by the environment" : "is not available in the build"));
    let val6 = val3 ? val1.length > 1 ? `since :
` + val1.map(Tl).join(`
`) : " " + Tl(val1[0]) : "as no adapter specified";
    throw new zz599("There is no suitable adapter to dispatch the request " + val6, "ERR_NOT_SUPPORT");
  }
  return val5;
}
const Wc = {
  getAdapter: zz655,
  adapters: ti
};
function zz658(val) {
  if (val.cancelToken && val.cancelToken.throwIfRequested(), val.signal && val.signal.aborted) throw new zz633(null, val);
}
function zz659(val) {
  return zz658(val), val.headers = rt.from(val.headers), val.data = zz631.call(val, val.transformRequest), ["post", "put", "patch"].indexOf(val.method) !== -1 && val.headers.setContentType("application/x-www-form-urlencoded", !1), Wc.getAdapter(val.adapter || Cs.adapter, val)(val).then(function (val1) {
    return zz658(val), val1.data = zz631.call(val, val.transformResponse, val1), val1.headers = rt.from(val1.headers), val1;
  }, function (val1) {
    return zz632(val1) || (zz658(val), val1 && val1.response && (val1.response.data = zz631.call(val, val.transformResponse, val1.response), val1.response.headers = rt.from(val1.response.headers))), Promise.reject(val1);
  });
}
const Gc = "1.13.2",
  kr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((val, val2) => {
  kr[val] = function (val1) {
    return typeof val1 === val || "a" + (val2 < 1 ? "n " : " ") + val;
  };
});
const Ol = {};
kr.transitional = function (val, val2, val3) {
  function zz660(val1, val4) {
    return "[Axios v" + Gc + "] Transitional option '" + val1 + "'" + val4 + (val3 ? ". " + val3 : "");
  }
  return (val1, val4, val5) => {
    if (val === !1) throw new zz599(zz660(val4, " has been removed" + (val2 ? " in " + val2 : "")), zz599.ERR_DEPRECATED);
    return val2 && !Ol[val4] && (Ol[val4] = !0, console.warn(zz660(val4, " has been deprecated since v" + val2 + " and will be removed in the near future"))), val ? val(val1, val4, val5) : !0;
  };
};
kr.spelling = function (val) {
  return (val1, val2) => (console.warn(`${val2} is likely a misspelling of ${val}`), !0);
};
function zz661(val, val2, val3) {
  if (typeof val != "object") throw new zz599("options must be an object", zz599.ERR_BAD_OPTION_VALUE);
  const val4 = Object.keys(val);
  let val5 = val4.length;
  for (; val5-- > 0;) {
    const val1 = val4[val5],
      val6 = val2[val1];
    if (val6) {
      const val7 = val[val1],
        val8 = val7 === void 0 || val6(val7, val1, val);
      if (val8 !== !0) throw new zz599("option " + val1 + " must be " + val8, zz599.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (val3 !== !0) throw new zz599("Unknown option " + val1, zz599.ERR_BAD_OPTION);
  }
}
const Ws = {
    assertOptions: zz661,
    validators: kr
  },
  St = Ws.validators;
let mn = class {
  constructor(val) {
    this.defaults = val || {}, this.interceptors = {
      request: new zz612(),
      response: new zz612()
    };
  }
  async request(val, val2) {
    try {
      return await this._request(val, val2);
    } catch (val1) {
      if (val1 instanceof Error) {
        let obj1 = {};
        Error.captureStackTrace ? Error.captureStackTrace(obj1) : obj1 = new Error();
        const val3 = obj1.stack ? obj1.stack.replace(/^.+\n/, "") : "";
        try {
          val1.stack ? val3 && !String(val1.stack).endsWith(val3.replace(/^.+\n.+\n/, "")) && (val1.stack += `
` + val3) : val1.stack = val3;
        } catch {}
      }
      throw val1;
    }
  }
  _request(val, val2) {
    typeof val == "string" ? (val2 = val2 || {}, val2.url = val) : val2 = val || {}, val2 = zz643(this.defaults, val2);
    const {
      transitional: val3,
      paramsSerializer: val4,
      headers: val5
    } = val2;
    val3 !== void 0 && Ws.assertOptions(val3, {
      silentJSONParsing: St.transitional(St.boolean),
      forcedJSONParsing: St.transitional(St.boolean),
      clarifyTimeoutError: St.transitional(St.boolean)
    }, !1), val4 != null && (typePredicates.isFunction(val4) ? val2.paramsSerializer = {
      serialize: val4
    } : Ws.assertOptions(val4, {
      encode: St.function,
      serialize: St.function
    }, !0)), val2.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? val2.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : val2.allowAbsoluteUrls = !0), Ws.assertOptions(val2, {
      baseUrl: St.spelling("baseURL"),
      withXsrfToken: St.spelling("withXSRFToken")
    }, !0), val2.method = (val2.method || this.defaults.method || "get").toLowerCase();
    let val6 = val5 && typePredicates.merge(val5.common, val5[val2.method]);
    val5 && typePredicates.forEach(["delete", "get", "head", "post", "put", "patch", "common"], val1 => {
      delete val5[val1];
    }), val2.headers = rt.concat(val6, val5);
    const list = [];
    let val7 = !0;
    this.interceptors.request.forEach(function (val1) {
      typeof val1.runWhen == "function" && val1.runWhen(val2) === !1 || (val7 = val7 && val1.synchronous, list.unshift(val1.fulfilled, val1.rejected));
    });
    const list2 = [];
    this.interceptors.response.forEach(function (val1) {
      list2.push(val1.fulfilled, val1.rejected);
    });
    let val8,
      num = 0,
      val9;
    if (!val7) {
      const list1 = [zz659.bind(this), void 0];
      for (list1.unshift(...list), list1.push(...list2), val9 = list1.length, val8 = Promise.resolve(val2); num < val9;) val8 = val8.then(list1[num++], list1[num++]);
      return val8;
    }
    val9 = list.length;
    let val10 = val2;
    for (; num < val9;) {
      const val1 = list[num++],
        val11 = list[num++];
      try {
        val10 = val1(val10);
      } catch (val12) {
        val11.call(this, val12);
        break;
      }
    }
    try {
      val8 = zz659.call(this, val10);
    } catch (val1) {
      return Promise.reject(val1);
    }
    for (num = 0, val9 = list2.length; num < val9;) val8 = val8.then(list2[num++], list2[num++]);
    return val8;
  }
  getUri(val) {
    val = zz643(this.defaults, val);
    const val2 = zz642(val.baseURL, val.url, val.allowAbsoluteUrls);
    return zz611(val2, val.params, val.paramsSerializer);
  }
};
typePredicates.forEach(["delete", "get", "head", "options"], function (val) {
  mn.prototype[val] = function (val1, val2) {
    return this.request(zz643(val2 || {}, {
      method: val,
      url: val1,
      data: (val2 || {}).data
    }));
  };
});
typePredicates.forEach(["post", "put", "patch"], function (val) {
  function zz662(val1) {
    return function (val2, val3, val4) {
      return this.request(zz643(val4 || {}, {
        method: val,
        headers: val1 ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: val2,
        data: val3
      }));
    };
  }
  mn.prototype[val] = zz662(), mn.prototype[val + "Form"] = zz662(!0);
});
let kh = class zc {
  constructor(val) {
    if (typeof val != "function") throw new TypeError("executor must be a function.");
    let val2;
    this.promise = new Promise(function (val1) {
      val2 = val1;
    });
    const val3 = this;
    this.promise.then(val1 => {
      if (!val3._listeners) return;
      let val4 = val3._listeners.length;
      for (; val4-- > 0;) val3._listeners[val4](val1);
      val3._listeners = null;
    }), this.promise.then = val1 => {
      let val4;
      const val5 = new Promise(val6 => {
        val3.subscribe(val6), val4 = val6;
      }).then(val1);
      return val5.cancel = function () {
        val3.unsubscribe(val4);
      }, val5;
    }, val(function (val1, val4, val5) {
      val3.reason || (val3.reason = new zz633(val1, val4, val5), val2(val3.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(val) {
    if (this.reason) {
      val(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(val) : this._listeners = [val];
  }
  unsubscribe(val) {
    if (!this._listeners) return;
    const val2 = this._listeners.indexOf(val);
    val2 !== -1 && this._listeners.splice(val2, 1);
  }
  toAbortSignal() {
    const abortcontroller = new AbortController(),
      fn1 = val => {
        abortcontroller.abort(val);
      };
    return this.subscribe(fn1), abortcontroller.signal.unsubscribe = () => this.unsubscribe(fn1), abortcontroller.signal;
  }
  static source() {
    let val;
    return {
      token: new zc(function (val1) {
        val = val1;
      }),
      cancel: val
    };
  }
};
function zz663(val) {
  return function (val1) {
    return val.apply(null, val1);
  };
}
function zz664(val) {
  return typePredicates.isObject(val) && val.isAxiosError === !0;
}
const To = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(To).forEach(([zz665, zz666]) => {
  To[zz666] = zz665;
});
function zz667(val) {
  const mn1 = new mn(val),
    val2 = zz587(mn.prototype.request, mn1);
  return typePredicates.extend(val2, mn.prototype, mn1, {
    allOwnKeys: !0
  }), typePredicates.extend(val2, mn1, null, {
    allOwnKeys: !0
  }), val2.create = function (val1) {
    return zz667(zz643(val, val1));
  }, val2;
}
const axiosLib = zz667(Cs);
axiosLib.Axios = mn;
axiosLib.CanceledError = zz633;
axiosLib.CancelToken = kh;
axiosLib.isCancel = zz632;
axiosLib.VERSION = Gc;
axiosLib.toFormData = zz604;
axiosLib.AxiosError = zz599;
axiosLib.Cancel = axiosLib.CanceledError;
axiosLib.all = function (val) {
  return Promise.all(val);
};
axiosLib.spread = zz663;
axiosLib.isAxiosError = zz664;
axiosLib.mergeConfig = zz643;
axiosLib.AxiosHeaders = rt;
axiosLib.formToJSON = val => zz616(typePredicates.isHTMLForm(val) ? new FormData(val) : val);
axiosLib.getAdapter = Wc.getAdapter;
axiosLib.HttpStatusCode = To;
axiosLib.default = axiosLib;
const {
    Axios: dy,
    AxiosError: fy,
    CanceledError: py,
    isCancel: my,
    CancelToken: hy,
    VERSION: gy,
    all: vy,
    Cancel: yy,
    isAxiosError: by,
    spread: wy,
    toFormData: _y,
    AxiosHeaders: Ey,
    HttpStatusCode: xy,
    formToJSON: Cy,
    getAdapter: Ay,
    mergeConfig: Sy
  } = axiosLib,
  Ih = "/api/v2",
  http = axiosLib.create({
    baseURL: Ih,
    timeout: 15e3,
    headers: {
      "Content-Type": "application/json"
    }
  });
http.interceptors.request.use(val => {
  const item = localStorage.getItem("token");
  return item && val.headers && (val.headers.Authorization = `Bearer ${item}`), val;
}, val => Promise.reject(val));
http.interceptors.response.use(val => val, val => (val.response?.status === 401 && window.dispatchEvent(new CustomEvent("auth:token-expired")), Promise.reject(val)));
function zz668(val, val2) {
  return http.post("/auth/register", {
    username: val,
    password: val2
  });
}
function zz669(val, val2) {
  return http.post("/auth/login", {
    loginType: "normal",
    username: val,
    password: val2
  });
}
function zz670() {
  return http.get("/campus/captcha");
}
function zz671(val, val2, val3, val4) {
  return http.post("/auth/login", {
    loginType: "campus",
    campusAccount: val,
    campusPassword: val2,
    captchaCode: val3,
    jsessionId: val4
  });
}
function zz672() {
  return http.get("/auth/qq/authorize-url");
}
function zz673(val, val2) {
  return http.post("/auth/qq-login", {
    code: val,
    state: val2
  });
}
function zz674(val, val2, val3) {
  return http.post("/auth/qq-bind", {
    username: val,
    password: val2,
    qqData: val3
  });
}
function zz675(val, val2, val3) {
  return http.post("/auth/qq-register", {
    username: val,
    password: val2,
    qqData: val3
  });
}
function zz676() {
  return http.get("/permissions/my");
}
function zz677() {
  return http.get("/user/profile");
}
function zz678(val) {
  return http.put("/user/profile", val);
}
function zz679() {
  return http.get("/campus/captcha");
}
function zz680() {
  return http.get("/user/campus-binding");
}
function zz681(val) {
  return http.post("/user/bind-campus", val);
}
function zz682(val) {
  return http.post("/user/rebind-campus", val);
}
function zz683() {
  return http.delete("/user/unbind-campus");
}
function zz684() {
  return http.get("/user/qq-binding");
}
function zz685() {
  return http.get("/user/qq/authorize-url");
}
function zz686(val) {
  return http.post("/user/bind-qq", val);
}
function zz687() {
  return http.delete("/user/unbind-qq");
}
function zz688() {
  return http.get("/user/has-password");
}
function zz689(val) {
  return http.put("/user/password", val);
}
function zz690(val) {
  const formdata = new FormData();
  return formdata.append("file", val), http.post("/user/avatar", formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz691(val) {
  return http.get(`/user/users/${val}/avatar`);
}
function zz692() {
  return http.get("/user/privacy-settings");
}
function zz693(val) {
  return http.put("/user/privacy-settings", val);
}
function zz694(val) {
  return http.get(`/user/users/${val}/profile`);
}
function zz695(val, val2) {
  return http.post("/sms/send", {
    phoneNumber: val,
    purpose: val2
  });
}
function zz696(val, val2) {
  return http.post("/sms/login", {
    phoneNumber: val,
    code: val2
  });
}
function zz697(val, val2) {
  return http.post("/sms/bind", {
    phoneNumber: val,
    code: val2
  });
}
function zz698() {
  return http.delete("/sms/unbind");
}
function zz699() {
  return http.get("/sms/binding");
}
const eo = "token",
  to = "user",
  no = "expiresAt",
  so = "campusInfo",
  Ns = "permissions",
  useUserStore = zz435("user", () => {
    const refVal = zz83(null),
      refVal2 = zz83(null),
      refVal3 = zz83(null),
      refVal4 = zz83(null),
      refVal5 = zz83(null),
      refVal6 = zz83(null),
      refVal7 = zz83(null),
      refVal8 = zz83(null),
      refVal9 = zz83([]),
      refVal10 = zz83(!1),
      refVal11 = zz83(!1),
      refVal12 = zz83(null),
      text = "loginRedirect",
      refVal13 = zz83(sessionStorage.getItem(text)),
      val = applyDirectives(() => !refVal.value || !refVal3.value ? !1 : Date.now() < refVal3.value);
    function zz700(val1) {
      return refVal9.value.includes(val1);
    }
    const val2 = applyDirectives(() => zz700("ticket.manage")),
      val3 = applyDirectives(() => zz700("campaign.manage")),
      val4 = applyDirectives(() => zz700("rating.manage")),
      val5 = applyDirectives(() => zz700("message.manage")),
      val6 = applyDirectives(() => zz700("user.manage")),
      val7 = applyDirectives(() => zz700("banner.manage")),
      val8 = applyDirectives(() => zz700("museum.manage")),
      val9 = applyDirectives(() => zz700("debate.manage")),
      val10 = applyDirectives(() => zz700("tally.manage")),
      val11 = applyDirectives(() => zz700("voices.manage"));
    function zz701() {
      const item = localStorage.getItem(eo),
        item2 = localStorage.getItem(to),
        item3 = localStorage.getItem(no),
        item4 = localStorage.getItem(so),
        item5 = localStorage.getItem(Ns);
      if (item && item2 && item3) {
        const val16 = Number(item3);
        Date.now() < val16 ? (refVal.value = item, refVal2.value = JSON.parse(item2), refVal3.value = val16, item4 && (refVal4.value = JSON.parse(item4)), item5 ? (refVal9.value = JSON.parse(item5), refVal10.value = !0) : zz712()) : zz703();
      }
    }
    function zz702() {
      refVal.value && localStorage.setItem(eo, refVal.value), refVal2.value && localStorage.setItem(to, JSON.stringify(refVal2.value)), refVal3.value && localStorage.setItem(no, String(refVal3.value)), refVal4.value && localStorage.setItem(so, JSON.stringify(refVal4.value)), refVal9.value.length > 0 && localStorage.setItem(Ns, JSON.stringify(refVal9.value));
    }
    function zz703() {
      localStorage.removeItem(eo), localStorage.removeItem(to), localStorage.removeItem(no), localStorage.removeItem(so), localStorage.removeItem(Ns), localStorage.removeItem("vx-identity");
    }
    function zz704(val1) {
      refVal.value = val1.token, refVal2.value = val1.user, refVal3.value = val1.expiresAt * 1e3, refVal4.value = val1.campusInfo ?? null, zz702(), zz712();
    }
    async function zz705(val1, val12) {
      const val13 = await zz669(val1, val12);
      return val13.data.code === 200 && zz704(val13.data.data), val13.data;
    }
    async function zz706(val1, val12) {
      const val13 = await zz668(val1, val12);
      return val13.data.code === 200 && zz704(val13.data.data), val13.data;
    }
    async function zz707(val1, val12, val13, val14) {
      const val15 = await zz671(val1, val12, val13, val14);
      return val15.data.code === 200 && zz704(val15.data.data), val15.data;
    }
    async function zz708(val1, val12) {
      const val13 = await zz673(val1, val12);
      return val13.data.code === 200 && "token" in val13.data.data && zz704(val13.data.data), val13.data;
    }
    async function zz709(val1, val12, val13) {
      const val14 = await zz674(val1, val12, val13);
      return val14.data.code === 200 && zz704(val14.data.data), val14.data;
    }
    async function zz710(val1, val12, val13) {
      const val14 = await zz675(val1, val12, val13);
      return val14.data.code === 200 && zz704(val14.data.data), val14.data;
    }
    function zz711() {
      refVal.value = null, refVal2.value = null, refVal3.value = null, refVal4.value = null, refVal5.value = null, refVal6.value = null, refVal7.value = null, refVal8.value = null, refVal9.value = [], refVal10.value = !1, zz703();
    }
    async function zz712() {
      if (!(refVal10.value || !refVal.value)) try {
        const val1 = await zz676();
        val1.data.code === 200 && (refVal9.value = val1.data.data.permissions, refVal10.value = !0, localStorage.setItem(Ns, JSON.stringify(refVal9.value)));
      } catch (val1) {
        console.error("Failed to fetch permissions:", val1);
      }
    }
    async function zz713() {
      const val1 = await zz677();
      return val1.data.code === 200 && (refVal5.value = val1.data.data), val1.data;
    }
    async function zz714(val1) {
      const val12 = await zz678(val1);
      return val12.data.code === 200 && (refVal5.value = val12.data.data, refVal2.value && (val1.nickname !== void 0 && (refVal2.value.nickname = val1.nickname), val1.gender !== void 0 && (refVal2.value.gender = val1.gender), val1.signature !== void 0 && (refVal2.value.signature = val1.signature), val1.birthdate !== void 0 && (refVal2.value.birthdate = val1.birthdate), zz702())), val12.data;
    }
    async function zz715() {
      const val1 = await zz680();
      return val1.data.code === 200 && (refVal6.value = val1.data.data), val1.data;
    }
    async function zz716(val1, val12, val13, val14) {
      const val15 = await zz681({
        campusAccount: val1,
        campusPassword: val12,
        captchaCode: val13,
        jsessionId: val14
      });
      return val15.data.code === 200 && (refVal6.value = val15.data.data), val15.data;
    }
    async function zz717(val1, val12, val13, val14) {
      const val15 = await zz682({
        campusAccount: val1,
        campusPassword: val12,
        captchaCode: val13,
        jsessionId: val14
      });
      return val15.data.code === 200 && (refVal6.value = val15.data.data), val15.data;
    }
    async function zz718() {
      const val1 = await zz683();
      return val1.data.code === 200 && (refVal6.value = {
        isBound: !1
      }, refVal4.value = null, zz702()), val1.data;
    }
    async function zz719() {
      const val1 = await zz684();
      return val1.data.code === 200 && (refVal7.value = val1.data.data), val1.data;
    }
    async function zz720() {
      return zz685();
    }
    async function zz721(val1, val12) {
      const val13 = await zz686({
        code: val1,
        state: val12
      });
      return val13.data.code === 200 && (refVal7.value = val13.data.data), val13.data;
    }
    async function zz722() {
      const val1 = await zz687();
      return val1.data.code === 200 && (refVal7.value = {
        isBound: !1
      }), val1.data;
    }
    async function zz723(val1, val12) {
      const val13 = await zz696(val1, val12);
      return val13.data.code === 200 && zz704(val13.data.data), val13.data;
    }
    async function zz724() {
      const val1 = await zz699();
      return val1.data.code === 200 && (refVal8.value = val1.data.data), val1.data;
    }
    async function zz725(val1, val12) {
      const val13 = await zz697(val1, val12);
      return val13.data.code === 200 && (await zz724()), val13.data;
    }
    async function zz726() {
      const val1 = await zz698();
      return val1.data.code === 200 && (refVal8.value = {
        bound: !1
      }), val1.data;
    }
    function zz727(val1) {
      refVal12.value = val1 ?? null, refVal11.value = !0;
    }
    function zz728() {
      refVal11.value = !1, refVal12.value = null;
    }
    function zz729(val1) {
      refVal13.value = val1, val1 ? sessionStorage.setItem(text, val1) : sessionStorage.removeItem(text);
    }
    function zz730() {
      const refVal13Value = refVal13.value;
      return refVal13.value = null, sessionStorage.removeItem(text), refVal13Value;
    }
    return {
      token: refVal,
      user: refVal2,
      expiresAt: refVal3,
      campusInfo: refVal4,
      profile: refVal5,
      campusBinding: refVal6,
      qqBinding: refVal7,
      phoneBinding: refVal8,
      permissions: refVal9,
      showLoginModal: refVal11,
      loginModalMessage: refVal12,
      redirectRoute: refVal13,
      isLoggedIn: val,
      canManageTickets: val2,
      canManageCampaigns: val3,
      canManageRating: val4,
      canManageMessages: val5,
      canManageUsers: val6,
      canManageBanners: val7,
      canManageMuseum: val8,
      canManageDebate: val9,
      canManageTally: val10,
      canManageVoices: val11,
      restoreSession: zz701,
      login: zz705,
      register: zz706,
      loginByCampus: zz707,
      qqLogin: zz708,
      qqBind: zz709,
      qqRegister: zz710,
      logout: zz711,
      hasPermission: zz700,
      fetchPermissions: zz712,
      fetchProfile: zz713,
      updateProfile: zz714,
      fetchCampusBinding: zz715,
      bindCampus: zz716,
      rebindCampus: zz717,
      unbindCampus: zz718,
      fetchQQBinding: zz719,
      getQQBindAuthorizeUrl: zz720,
      bindQQ: zz721,
      unbindQQ: zz722,
      smsLogin: zz723,
      fetchPhoneBinding: zz724,
      bindPhone: zz725,
      unbindPhone: zz726,
      openLoginModal: zz727,
      closeLoginModal: zz728,
      setRedirectRoute: zz729,
      consumeRedirectRoute: zz730
    };
  }),
  On = zz83([]);
let sg = 0;
function zz731(val, zz732 = "info", zz733 = 3e3) {
  const val4 = ++sg;
  On.value.push({
    id: val4,
    message: val,
    type: zz732
  }), setTimeout(() => {
    On.value = On.value.filter(val1 => val1.id !== val4);
  }, zz733);
}
function zz734(val) {
  On.value = On.value.filter(val1 => val1.id !== val);
}
function zz735() {
  return {
    toasts: On,
    show: zz731,
    close: zz734,
    success: val => zz731(val, "success"),
    warning: val => zz731(val, "warning"),
    error: val => zz731(val, "error"),
    info: val => zz731(val, "info")
  };
}
const og = {
    class: "privacy-modal"
  },
  ig = {
    class: "privacy-header"
  },
  lg = {
    class: "privacy-footer"
  },
  ag = zz160({
    __name: "PrivacyPolicyModal",
    props: {
      show: {
        type: Boolean
      }
    },
    emits: ["close"],
    setup(val, {
      emit: zz736
    }) {
      const val3 = zz736;
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (zz280(), zz287(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "modal"
      }, {
        default: zz120(() => [val.show ? (zz280(), zz286("div", {
          key: 0,
          class: "privacy-overlay",
          onClick: val4[2] || (val4[2] = withModifiers(val5 => val3("close"), ["self"]))
        }, [zz294("div", og, [zz294("div", ig, [val4[3] || (val4[3] = zz294("h3", {
          class: "privacy-title"
        }, "隐私政策", -1)), zz294("button", {
          class: "privacy-close",
          onClick: val4[0] || (val4[0] = val5 => val3("close"))
        }, "×")]), val4[4] || (val4[4] = zz294("div", {
          class: "privacy-body"
        }, [zz294("p", {
          class: "privacy-update"
        }, "最后更新日期：2026年4月17日"), zz294("p", null, ' 厦门一中学生社区（以下简称"本平台"）是由学生自主运营的非官方校园社区，与厦门一中及其校园网平台无隶属关系。我们重视您的隐私，本政策说明我们如何收集、使用和保护您的个人信息。 '), zz294("h4", null, "一、我们收集的信息"), zz294("p", null, "根据您使用的登录方式，我们可能收集以下信息："), zz294("ul", null, [zz294("li", null, [zz294("strong", null, "普通注册："), zz312("用户名、密码（加密存储）")]), zz294("li", null, [zz294("strong", null, "校园网登录："), zz312("学号、姓名、班级等校园网返回的基本信息")]), zz294("li", null, [zz294("strong", null, "QQ 登录："), zz312("QQ 昵称、头像、OpenID")]), zz294("li", null, [zz294("strong", null, "手机号登录："), zz312("手机号码")])]), zz294("h4", null, "二、信息的用途"), zz294("ul", null, [zz294("li", null, "完成注册和登录流程"), zz294("li", null, "验证您的学生身份"), zz294("li", null, "在社区内展示您选择公开的信息（如昵称、班级）"), zz294("li", null, "维护平台安全，防止滥用")]), zz294("h4", null, "三、关于校园网登录"), zz294("p", null, [zz312(" 当您使用校园网方式登录时，您的校园网密码仅用于实时验证身份，验证完成后"), zz294("strong", null, "不会被保存"), zz312("。我们"), zz294("strong", null, "不会"), zz312("使用您的校园网账号进行登录以外的任何操作。 ")]), zz294("h4", null, "四、信息安全"), zz294("ul", null, [zz294("li", null, "账号密码经过加密处理后存储"), zz294("li", null, "网络传输使用 HTTPS 加密"), zz294("li", null, "数据库访问严格限制权限"), zz294("li", null, "本平台不向任何第三方出售或共享您的个人信息")]), zz294("h4", null, "五、您的权利"), zz294("ul", null, [zz294("li", null, "您可以随时在设置中解绑校园网、QQ 或手机号"), zz294("li", null, "您可以自主设置个人资料的可见范围"), zz294("li", null, "您可以联系管理员申请删除账号及所有相关数据")]), zz294("h4", null, "六、政策变更"), zz294("p", null, "本隐私政策可能会不时更新。重大变更时我们会通过平台公告通知您。继续使用本平台即表示您同意更新后的政策。")], -1)), zz294("div", lg, [zz294("button", {
          class: "btn-confirm",
          onClick: val4[1] || (val4[1] = val5 => val3("close"))
        }, "我已了解")])])])) : zz316("", !0)]),
        _: 1
      })]));
    }
  }),
  withScopeId = (val, val2) => {
    const val3 = val.__vccOpts || val;
    for (const [zz737, val1] of val2) val3[zz737] = val1;
    return val3;
  },
  cg = withScopeId(ag, [["__scopeId", "data-v-d1bbdaaf"]]),
  ug = {
    class: "login-modal"
  },
  dg = {
    class: "modal-header"
  },
  fg = {
    class: "modal-title"
  },
  pg = ["disabled"],
  mg = {
    key: "login",
    class: "modal-body"
  },
  hg = {
    class: "form-group"
  },
  gg = ["disabled"],
  vg = {
    class: "form-group"
  },
  yg = {
    class: "password-input-wrapper"
  },
  bg = ["type", "disabled"],
  wg = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  _g = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Eg = ["disabled"],
  xg = {
    class: "login-footer"
  },
  Cg = ["disabled"],
  Ag = {
    class: "login-social"
  },
  Sg = ["disabled"],
  Rg = {
    key: "sms",
    class: "modal-body"
  },
  Tg = {
    class: "form-group"
  },
  kg = ["disabled"],
  Og = {
    class: "form-group"
  },
  Pg = {
    class: "sms-code-row"
  },
  Ig = ["disabled"],
  Mg = ["disabled"],
  Lg = ["disabled"],
  Ng = {
    class: "login-footer"
  },
  Dg = ["disabled"],
  Bg = {
    key: "register",
    class: "modal-body"
  },
  $g = {
    class: "form-group"
  },
  Fg = ["disabled"],
  Vg = {
    class: "form-group"
  },
  Hg = {
    class: "password-input-wrapper"
  },
  Ug = ["type", "disabled"],
  qg = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  jg = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Kg = {
    class: "form-group"
  },
  Wg = {
    class: "password-input-wrapper"
  },
  Gg = ["type", "disabled"],
  zg = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Qg = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Jg = ["disabled"],
  Yg = {
    class: "login-footer"
  },
  Xg = ["disabled"],
  Zg = {
    key: "campus",
    class: "modal-body"
  },
  ev = {
    class: "form-group"
  },
  tv = ["disabled"],
  nv = {
    class: "form-group"
  },
  sv = {
    class: "password-input-wrapper"
  },
  rv = ["type", "disabled"],
  ov = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  iv = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  lv = {
    class: "form-group"
  },
  av = {
    class: "captcha-row"
  },
  cv = ["disabled"],
  uv = ["src"],
  dv = {
    key: 1,
    class: "captcha-loading"
  },
  fv = {
    key: 2,
    class: "captcha-placeholder"
  },
  pv = ["disabled"],
  mv = {
    class: "privacy-agreement"
  },
  hv = zz160({
    __name: "LoginModal",
    props: {
      show: {
        type: Boolean
      },
      message: {}
    },
    emits: ["close"],
    setup(val, {
      emit: zz738
    }) {
      const val3 = val,
        val4 = zz738,
        useRouter1 = zz585(),
        useUserStore1 = useUserStore(),
        useToast1 = zz735(),
        refVal = zz83("login"),
        refVal2 = zz83("login"),
        refVal3 = zz83("right"),
        obj1 = {
          login: 0,
          sms: 1,
          register: 2,
          campus: 3
        };
      function zz739(val1) {
        const val7 = obj1[refVal.value],
          val8 = obj1[val1];
        refVal3.value = val8 > val7 ? "right" : "left", refVal2.value = refVal.value, refVal.value = val1;
      }
      const refVal4 = zz83(null),
        refVal5 = zz83({
          left: "0px",
          width: "0px"
        });
      function zz740() {
        zz110(() => {
          if (!refVal4.value) return;
          const selector = refVal4.value.querySelector(".login-tab.active");
          selector && (refVal5.value = {
            left: `${selector.offsetLeft}px`,
            width: `${selector.offsetWidth}px`
          });
        });
      }
      const refVal6 = zz83({
          username: "",
          password: ""
        }),
        refVal7 = zz83({
          username: "",
          password: "",
          confirmPassword: ""
        }),
        refVal8 = zz83({
          studentId: "",
          password: "",
          captchaCode: "",
          jsessionId: ""
        }),
        refVal9 = zz83({
          phoneNumber: "",
          code: ""
        }),
        refVal10 = zz83(!1),
        refVal11 = zz83(!1),
        refVal12 = zz83(0);
      let val5 = null;
      const refVal13 = zz83(""),
        refVal14 = zz83(!1),
        refVal15 = zz83(!1),
        refVal16 = zz83(!1),
        refVal17 = zz83(!1),
        refVal18 = zz83(!1),
        refVal19 = zz83(!1);
      zz128(() => val3.show, val1 => {
        val1 && (zz740(), refVal.value === "campus" && zz741());
      }), zz128(refVal, val1 => {
        zz740(), val1 === "campus" && val3.show && zz741();
      });
      let val6 = null;
      function zz741() {
        return val6 || (refVal14.value = !0, val6 = (async () => {
          try {
            const val1 = await zz670();
            val1.data.code === 200 ? (refVal13.value = val1.data.data.captchaImage, refVal8.value.jsessionId = val1.data.data.jsessionId, refVal8.value.captchaCode = "") : useToast1.error(val1.data.message || "获取验证码失败");
          } catch {
            useToast1.error("网络错误，请稍后重试");
          } finally {
            refVal14.value = !1, val6 = null;
          }
        })(), val6);
      }
      async function zz742() {
        const {
          username: val1,
          password: val7
        } = refVal6.value;
        if (!val1 || !val7) {
          useToast1.warning("请填写用户名和密码");
          return;
        }
        refVal10.value = !0;
        try {
          const val8 = await useUserStore1.login(val1, val7);
          val8.code === 200 ? (val8.data.isNewUser ? useToast1.success("欢迎！建议您前往设置页修改用户名") : useToast1.success("登录成功"), zz748()) : useToast1.error(val8.message || "登录失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal10.value = !1;
        }
      }
      async function zz743() {
        const {
          username: val1,
          password: val7,
          confirmPassword: val8
        } = refVal7.value;
        if (!val1 || !val7) {
          useToast1.warning("请填写用户名和密码");
          return;
        }
        if (val7 !== val8) {
          useToast1.warning("两次密码输入不一致");
          return;
        }
        if (val7.length < 6) {
          useToast1.warning("密码至少 6 位");
          return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(val1)) {
          useToast1.warning("用户名只能包含英文字母、数字和下划线");
          return;
        }
        refVal10.value = !0;
        try {
          const val9 = await useUserStore1.register(val1, val7);
          val9.code === 200 ? (useToast1.success("注册成功"), zz748()) : useToast1.error(val9.message || "注册失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal10.value = !1;
        }
      }
      async function zz744() {
        const {
          studentId: val1,
          password: val7,
          captchaCode: val8,
          jsessionId: val9
        } = refVal8.value;
        if (!val1 || !val7) {
          useToast1.warning("请填写学号和密码");
          return;
        }
        if (!val8) {
          useToast1.warning("请输入验证码");
          return;
        }
        refVal10.value = !0;
        try {
          const val10 = await useUserStore1.loginByCampus(val1, val7, val8, val9);
          val10.code === 200 ? (val10.data.isNewUser ? useToast1.success("欢迎！建议您前往设置页修改用户名") : useToast1.success("登录成功"), zz748()) : (useToast1.error(val10.message || "登录失败"), zz741());
        } catch {
          useToast1.error("网络错误，请稍后重试"), zz741();
        } finally {
          refVal10.value = !1;
        }
      }
      async function zz745() {
        const {
          phoneNumber: val1
        } = refVal9.value;
        if (!val1) {
          useToast1.warning("请输入手机号");
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(val1)) {
          useToast1.warning("请输入正确的手机号");
          return;
        }
        refVal11.value = !0;
        try {
          const smsCode = await zz695(val1, "login");
          smsCode.data.code === 200 ? (useToast1.success("验证码已发送"), refVal12.value = smsCode.data.data.cooldownSeconds || 60, val5 = setInterval(() => {
            refVal12.value--, refVal12.value <= 0 && val5 && (clearInterval(val5), val5 = null);
          }, 1e3)) : useToast1.error(smsCode.data.message || "发送失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal11.value = !1;
        }
      }
      async function zz746() {
        const {
          phoneNumber: val1,
          code: val7
        } = refVal9.value;
        if (!val1) {
          useToast1.warning("请输入手机号");
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(val1)) {
          useToast1.warning("请输入正确的手机号");
          return;
        }
        if (!val7) {
          useToast1.warning("请输入验证码");
          return;
        }
        if (!/^\d{6}$/.test(val7)) {
          useToast1.warning("验证码为6位数字");
          return;
        }
        refVal10.value = !0;
        try {
          const val8 = await useUserStore1.smsLogin(val1, val7);
          val8.code === 200 ? (val8.data.isNewUser ? useToast1.success("欢迎！建议您前往设置页修改用户名") : useToast1.success("登录成功"), zz748()) : useToast1.error(val8.message || "登录失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal10.value = !1;
        }
      }
      async function zz747() {
        refVal10.value = !0, useUserStore1.redirectRoute || useUserStore1.setRedirectRoute(useRouter1.currentRoute.value.fullPath);
        try {
          const val1 = await zz672();
          val1.data.code === 200 ? window.location.href = val1.data.data.authorizeUrl : useToast1.error(val1.data.message || "获取授权链接失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal10.value = !1;
        }
      }
      function zz748() {
        val4("close");
        const val1 = useUserStore1.consumeRedirectRoute();
        val1 && useRouter1.push(val1);
      }
      function zz749() {
        refVal10.value || (useUserStore1.setRedirectRoute(null), val4("close"));
      }
      return zz128(() => val3.message, val1 => {
        val1 && useToast1.info(val1);
      }, {
        immediate: !0
      }), onMounted(() => {
        zz740();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val7) => (zz280(), zz286(Fragment, null, [(zz280(), zz287(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "modal"
      }, {
        default: zz120(() => [val.show ? (zz280(), zz286("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz749, ["self"])
        }, [zz294("div", ug, [zz294("div", dg, [zz294("h3", fg, toDisplayString(refVal.value === "register" ? "注册账号" : "登录"), 1), zz294("button", {
          class: "modal-close",
          disabled: refVal10.value,
          onClick: zz749
        }, " × ", 8, pg)]), refVal.value !== "register" ? (zz280(), zz286("div", {
          key: 0,
          ref_key: "tabsRef",
          ref: refVal4,
          class: "login-tabs"
        }, [zz294("div", {
          class: "login-tabs-slider",
          style: zz8(refVal5.value)
        }, null, 4), zz294("button", {
          class: zz11(["login-tab", {
            active: refVal.value === "login"
          }]),
          onClick: val7[0] || (val7[0] = val8 => zz739("login"))
        }, " 密码登录 ", 2), zz294("button", {
          class: zz11(["login-tab", {
            active: refVal.value === "sms"
          }]),
          onClick: val7[1] || (val7[1] = val8 => zz739("sms"))
        }, " 短信登录 ", 2), zz294("button", {
          class: zz11(["login-tab", {
            active: refVal.value === "campus"
          }]),
          onClick: val7[2] || (val7[2] = val8 => zz739("campus"))
        }, " 校园网 ", 2)], 512)) : zz316("", !0), createVNode(withSlots, {
          name: "tab-slide-" + refVal3.value,
          mode: "out-in"
        }, {
          default: zz120(() => [refVal.value === "login" ? (zz280(), zz286("div", mg, [zz294("div", hg, [val7[22] || (val7[22] = zz294("label", {
            class: "form-label"
          }, "用户名", -1)), zz122(zz294("input", {
            "onUpdate:modelValue": val7[3] || (val7[3] = val8 => refVal6.value.username = val8),
            type: "text",
            class: "form-input",
            placeholder: "请输入用户名",
            disabled: refVal10.value,
            onKeyup: withKeys(zz742, ["enter"])
          }, null, 40, gg), [[vModelText, refVal6.value.username]])]), zz294("div", vg, [val7[25] || (val7[25] = zz294("label", {
            class: "form-label"
          }, "密码", -1)), zz294("div", yg, [zz122(zz294("input", {
            "onUpdate:modelValue": val7[4] || (val7[4] = val8 => refVal6.value.password = val8),
            type: refVal15.value ? "text" : "password",
            class: "form-input",
            placeholder: "请输入密码",
            disabled: refVal10.value,
            onKeyup: withKeys(zz742, ["enter"])
          }, null, 40, bg), [[directiveHooks, refVal6.value.password]]), zz294("button", {
            type: "button",
            class: "password-toggle",
            onClick: val7[5] || (val7[5] = val8 => refVal15.value = !refVal15.value),
            tabindex: "-1"
          }, [refVal15.value ? (zz280(), zz286("svg", wg, [...(val7[23] || (val7[23] = [zz294("path", {
            d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          }, null, -1), zz294("line", {
            x1: "1",
            y1: "1",
            x2: "23",
            y2: "23"
          }, null, -1)]))])) : (zz280(), zz286("svg", _g, [...(val7[24] || (val7[24] = [zz294("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          }, null, -1), zz294("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, null, -1)]))]))])])]), zz294("button", {
            class: "btn btn-primary btn-block btn-touch",
            disabled: refVal10.value,
            onClick: zz742
          }, toDisplayString(refVal10.value ? "登录中..." : "登录"), 9, Eg), zz294("div", xg, [val7[26] || (val7[26] = zz294("span", {
            class: "login-footer-text"
          }, "没有账号？", -1)), zz294("button", {
            class: "btn btn-link",
            disabled: refVal10.value,
            onClick: val7[6] || (val7[6] = val8 => zz739("register"))
          }, " 立即注册 ", 8, Cg)]), val7[28] || (val7[28] = zz294("div", {
            class: "login-divider"
          }, [zz294("span", null, "其他登录方式")], -1)), zz294("div", Ag, [zz294("button", {
            class: "social-btn social-btn-qq",
            disabled: refVal10.value,
            title: "QQ登录",
            onClick: zz747
          }, [...(val7[27] || (val7[27] = [zz294("svg", {
            viewBox: "0 0 24 24",
            class: "social-icon"
          }, [zz294("path", {
            fill: "currentColor",
            d: "M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29.43 2.213 0 6.29.256 6.29-.43 0-.687-1.77-1.182-1.77-1.182 2.085-1.77 1.905-3.967 1.905-3.967.846 1.588 1.633 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
          })], -1)]))], 8, Sg)])])) : refVal.value === "sms" ? (zz280(), zz286("div", Rg, [zz294("div", Tg, [val7[29] || (val7[29] = zz294("label", {
            class: "form-label"
          }, "手机号", -1)), zz122(zz294("input", {
            "onUpdate:modelValue": val7[7] || (val7[7] = val8 => refVal9.value.phoneNumber = val8),
            type: "tel",
            class: "form-input",
            placeholder: "请输入手机号",
            maxlength: "11",
            disabled: refVal10.value
          }, null, 8, kg), [[vModelText, refVal9.value.phoneNumber]])]), zz294("div", Og, [val7[30] || (val7[30] = zz294("label", {
            class: "form-label"
          }, "验证码", -1)), zz294("div", Pg, [zz122(zz294("input", {
            "onUpdate:modelValue": val7[8] || (val7[8] = val8 => refVal9.value.code = val8),
            type: "text",
            class: "form-input sms-code-input",
            placeholder: "6位验证码",
            maxlength: "6",
            disabled: refVal10.value,
            onKeyup: withKeys(zz746, ["enter"])
          }, null, 40, Ig), [[vModelText, refVal9.value.code]]), zz294("button", {
            type: "button",
            class: "sms-send-btn",
            disabled: refVal10.value || refVal11.value || refVal12.value > 0,
            onClick: zz745
          }, toDisplayString(refVal12.value > 0 ? `${refVal12.value}s` : refVal11.value ? "发送中" : "获取验证码"), 9, Mg)])]), zz294("button", {
            class: "btn btn-primary btn-block btn-touch",
            disabled: refVal10.value,
            onClick: zz746
          }, toDisplayString(refVal10.value ? "登录中..." : "登录"), 9, Lg), zz294("div", Ng, [val7[31] || (val7[31] = zz294("span", {
            class: "login-footer-text"
          }, "没有账号？", -1)), zz294("button", {
            class: "btn btn-link",
            disabled: refVal10.value,
            onClick: val7[9] || (val7[9] = val8 => zz739("register"))
          }, " 立即注册 ", 8, Dg)]), val7[32] || (val7[32] = zz294("p", {
            class: "campus-hint"
          }, "首次使用手机号登录将自动创建账号", -1))])) : refVal.value === "register" ? (zz280(), zz286("div", Bg, [zz294("div", $g, [val7[33] || (val7[33] = zz294("label", {
            class: "form-label"
          }, "用户名", -1)), zz122(zz294("input", {
            "onUpdate:modelValue": val7[10] || (val7[10] = val8 => refVal7.value.username = val8),
            type: "text",
            class: "form-input",
            placeholder: "英文字母、数字、下划线",
            disabled: refVal10.value
          }, null, 8, Fg), [[vModelText, refVal7.value.username]])]), zz294("div", Vg, [val7[36] || (val7[36] = zz294("label", {
            class: "form-label"
          }, "密码", -1)), zz294("div", Hg, [zz122(zz294("input", {
            "onUpdate:modelValue": val7[11] || (val7[11] = val8 => refVal7.value.password = val8),
            type: refVal16.value ? "text" : "password",
            class: "form-input",
            placeholder: "至少 6 位",
            disabled: refVal10.value
          }, null, 8, Ug), [[directiveHooks, refVal7.value.password]]), zz294("button", {
            type: "button",
            class: "password-toggle",
            onClick: val7[12] || (val7[12] = val8 => refVal16.value = !refVal16.value),
            tabindex: "-1"
          }, [refVal16.value ? (zz280(), zz286("svg", qg, [...(val7[34] || (val7[34] = [zz294("path", {
            d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          }, null, -1), zz294("line", {
            x1: "1",
            y1: "1",
            x2: "23",
            y2: "23"
          }, null, -1)]))])) : (zz280(), zz286("svg", jg, [...(val7[35] || (val7[35] = [zz294("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          }, null, -1), zz294("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, null, -1)]))]))])])]), zz294("div", Kg, [val7[39] || (val7[39] = zz294("label", {
            class: "form-label"
          }, "确认密码", -1)), zz294("div", Wg, [zz122(zz294("input", {
            "onUpdate:modelValue": val7[13] || (val7[13] = val8 => refVal7.value.confirmPassword = val8),
            type: refVal17.value ? "text" : "password",
            class: "form-input",
            placeholder: "再次输入密码",
            disabled: refVal10.value,
            onKeyup: withKeys(zz743, ["enter"])
          }, null, 40, Gg), [[directiveHooks, refVal7.value.confirmPassword]]), zz294("button", {
            type: "button",
            class: "password-toggle",
            onClick: val7[14] || (val7[14] = val8 => refVal17.value = !refVal17.value),
            tabindex: "-1"
          }, [refVal17.value ? (zz280(), zz286("svg", zg, [...(val7[37] || (val7[37] = [zz294("path", {
            d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          }, null, -1), zz294("line", {
            x1: "1",
            y1: "1",
            x2: "23",
            y2: "23"
          }, null, -1)]))])) : (zz280(), zz286("svg", Qg, [...(val7[38] || (val7[38] = [zz294("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          }, null, -1), zz294("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, null, -1)]))]))])])]), zz294("button", {
            class: "btn btn-primary btn-block btn-touch",
            disabled: refVal10.value,
            onClick: zz743
          }, toDisplayString(refVal10.value ? "注册中..." : "注册"), 9, Jg), zz294("div", Yg, [val7[40] || (val7[40] = zz294("span", {
            class: "login-footer-text"
          }, "已有账号？", -1)), zz294("button", {
            class: "btn btn-link",
            disabled: refVal10.value,
            onClick: val7[15] || (val7[15] = val8 => zz739("login"))
          }, " 返回登录 ", 8, Xg)])])) : refVal.value === "campus" ? (zz280(), zz286("div", Zg, [zz294("div", ev, [val7[41] || (val7[41] = zz294("label", {
            class: "form-label"
          }, "学号", -1)), zz122(zz294("input", {
            "onUpdate:modelValue": val7[16] || (val7[16] = val8 => refVal8.value.studentId = val8),
            type: "text",
            class: "form-input",
            placeholder: "请输入学号",
            disabled: refVal10.value
          }, null, 8, tv), [[vModelText, refVal8.value.studentId]])]), zz294("div", nv, [val7[44] || (val7[44] = zz294("label", {
            class: "form-label"
          }, "校园网密码", -1)), zz294("div", sv, [zz122(zz294("input", {
            "onUpdate:modelValue": val7[17] || (val7[17] = val8 => refVal8.value.password = val8),
            type: refVal18.value ? "text" : "password",
            class: "form-input",
            placeholder: "请输入校园网密码",
            disabled: refVal10.value
          }, null, 8, rv), [[directiveHooks, refVal8.value.password]]), zz294("button", {
            type: "button",
            class: "password-toggle",
            onClick: val7[18] || (val7[18] = val8 => refVal18.value = !refVal18.value),
            tabindex: "-1"
          }, [refVal18.value ? (zz280(), zz286("svg", ov, [...(val7[42] || (val7[42] = [zz294("path", {
            d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          }, null, -1), zz294("line", {
            x1: "1",
            y1: "1",
            x2: "23",
            y2: "23"
          }, null, -1)]))])) : (zz280(), zz286("svg", iv, [...(val7[43] || (val7[43] = [zz294("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          }, null, -1), zz294("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, null, -1)]))]))])])]), zz294("div", lv, [val7[45] || (val7[45] = zz294("label", {
            class: "form-label"
          }, "验证码", -1)), zz294("div", av, [zz122(zz294("input", {
            "onUpdate:modelValue": val7[19] || (val7[19] = val8 => refVal8.value.captchaCode = val8),
            type: "text",
            class: "form-input captcha-input",
            placeholder: "请输入验证码",
            disabled: refVal10.value,
            onKeyup: withKeys(zz744, ["enter"])
          }, null, 40, cv), [[vModelText, refVal8.value.captchaCode]]), zz294("div", {
            class: zz11(["captcha-image", {
              "is-loading": refVal14.value
            }]),
            onClick: zz741
          }, [refVal13.value && !refVal14.value ? (zz280(), zz286("img", {
            key: 0,
            src: refVal13.value,
            alt: "验证码"
          }, null, 8, uv)) : refVal14.value ? (zz280(), zz286("span", dv, "加载中")) : (zz280(), zz286("span", fv, "点击获取"))], 2)])]), val7[46] || (val7[46] = zz294("div", {
            class: "form-spacer"
          }, null, -1)), zz294("button", {
            class: "btn btn-primary btn-block btn-touch",
            disabled: refVal10.value,
            onClick: zz744
          }, toDisplayString(refVal10.value ? "登录中..." : "登录"), 9, pv), val7[47] || (val7[47] = zz294("p", {
            class: "campus-hint"
          }, "首次使用校园网登录将自动创建账号", -1))])) : zz316("", !0)]),
          _: 1
        }, 8, ["name"]), zz294("p", mv, [val7[48] || (val7[48] = zz312(" 登录或注册即表示您已阅读并同意 ", -1)), zz294("button", {
          class: "privacy-link",
          onClick: val7[20] || (val7[20] = val8 => refVal19.value = !0)
        }, "《隐私政策》")])])])) : zz316("", !0)]),
        _: 1
      })])), createVNode(cg, {
        show: refVal19.value,
        onClose: val7[21] || (val7[21] = val8 => refVal19.value = !1)
      }, null, 8, ["show"])], 64));
    }
  }),
  gv = withScopeId(hv, [["__scopeId", "data-v-b4a1b411"]]),
  vv = {
    class: "toast-container"
  },
  yv = ["onClick"],
  bv = {
    class: "toast-icon"
  },
  wv = {
    class: "toast-message"
  },
  _v = zz160({
    __name: "ToastContainer",
    setup(val) {
      const {
        toasts: useToast1,
        close: useToast2
      } = zz735();
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (zz280(), zz287(Teleport, {
        to: "body"
      }, [zz294("div", vv, [createVNode(TransitionGroup, {
        name: "toast"
      }, {
        default: zz120(() => [(zz280(!0), zz286(Fragment, null, zz182(zz87(useToast1), val3 => (zz280(), zz286("div", {
          key: val3.id,
          class: zz11(["toast", "toast-" + val3.type]),
          onClick: val4 => zz87(useToast2)(val3.id)
        }, [zz294("span", bv, [val3.type === "success" ? (zz280(), zz286(Fragment, {
          key: 0
        }, [zz312("✓")], 64)) : val3.type === "warning" ? (zz280(), zz286(Fragment, {
          key: 1
        }, [zz312("!")], 64)) : val3.type === "error" ? (zz280(), zz286(Fragment, {
          key: 2
        }, [zz312("×")], 64)) : (zz280(), zz286(Fragment, {
          key: 3
        }, [zz312("i")], 64))]), zz294("span", wv, toDisplayString(val3.message), 1)], 10, yv))), 128))]),
        _: 1
      })])]));
    }
  }),
  Ev = withScopeId(_v, [["__scopeId", "data-v-32132462"]]),
  xv = zz160({
    __name: "App",
    setup(val) {
      const useRouter1 = zz585(),
        useUserStore1 = useUserStore(),
        refVal = zz83("page-fade");
      onMounted(() => {
        useUserStore1.restoreSession(), window.addEventListener("auth:token-expired", zz752), window.visualViewport?.addEventListener("resize", zz750), document.addEventListener("focusout", zz751);
      }), directiveUm(() => {
        window.removeEventListener("auth:token-expired", zz752), window.visualViewport?.removeEventListener("resize", zz750), document.removeEventListener("focusout", zz751);
      });
      function zz750() {
        const documentActiveElement = document.activeElement;
        if (documentActiveElement instanceof HTMLElement && (documentActiveElement.tagName === "INPUT" || documentActiveElement.tagName === "TEXTAREA" || documentActiveElement.isContentEditable)) return;
        const val2 = document.scrollingElement || document.documentElement,
          val3 = Math.max(0, val2.scrollHeight - window.innerHeight);
        val2.scrollTop > val3 && window.scrollTo(0, val3);
      }
      function zz751() {
        setTimeout(zz750, 80);
      }
      useRouter1.beforeEach((val1, val2) => {
        if (!val2.name) {
          refVal.value = "page-none";
          return;
        }
        const val3 = val1.meta?.level || 1,
          val4 = val2.meta?.level || 1;
        val3 > val4 ? refVal.value = "page-slide-left" : val3 < val4 ? refVal.value = "page-slide-right" : refVal.value = "page-fade";
      });
      function zz752() {
        useUserStore1.openLoginModal("登录已过期，请重新登录");
      }
      function zz753() {
        useUserStore1.closeLoginModal();
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => {
        const val3 = zz176("router-view");
        return zz280(), zz286(Fragment, null, [createVNode(val3, null, {
          default: zz120(({
            Component: zz754,
            route: zz755
          }) => [createVNode(withSlots, {
            name: refVal.value
          }, {
            default: zz120(() => [(zz280(), zz287(zz177(zz754), {
              key: zz755.path
            }))]),
            _: 2
          }, 1032, ["name"])]),
          _: 1
        }), createVNode(gv, {
          show: zz87(useUserStore1).showLoginModal,
          message: zz87(useUserStore1).loginModalMessage,
          onClose: zz753
        }, null, 8, ["show", "message"]), createVNode(Ev)], 64);
      };
    }
  }),
  Cv = "modulepreload",
  Av = function (val) {
    return (val[0]==="/"||/^[a-z]+:/i.test(val))?val:new URL(val,document.baseURI).pathname;
  },
  Pl = {},
  local_zbd0 = function (val, val2, val3) {
    let val4 = Promise.resolve();
    if (val2 && val2.length > 0) {
      let zz756 = function (val6) {
        return Promise.all(val6.map(val7 => Promise.resolve(val7).then(val8 => ({
          status: "fulfilled",
          value: val8
        }), val8 => ({
          status: "rejected",
          reason: val8
        }))));
      };
      document.getElementsByTagName("link");
      const selector = document.querySelector("meta[property=csp-nonce]"),
        val5 = selector?.nonce || selector?.getAttribute("nonce");
      val4 = zz756(val2.map(val6 => {
        if (val6 = Av(val6), val6 in Pl) return;
        Pl[val6] = !0;
        const val7 = val6.endsWith(".css"),
          val8 = val7 ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${val6}"]${val8}`)) return;
        const element = document.createElement("link");
        if (element.rel = val7 ? "stylesheet" : Cv, val7 || (element.as = "script"), element.crossOrigin = "", element.href = val6, val5 && element.setAttribute("nonce", val5), document.head.appendChild(element), val7) return new Promise((val10, val11) => {
          element.addEventListener("load", val10), element.addEventListener("error", () => val11(new Error(`Unable to preload CSS for ${val6}`)));
        });
      }));
    }
    function zz757(val1) {
      const event = new Event("vite:preloadError", {
        cancelable: !0
      });
      if (event.payload = val1, window.dispatchEvent(event), !event.defaultPrevented) throw val1;
    }
    return val4.then(val1 => {
      for (const zz758 of val1 || []) zz758.status === "rejected" && zz757(zz758.reason);
      return val().catch(zz757);
    });
  };
let ko = {},
  Jc;
function zz759(zz760 = {}) {
  ko = {
    animate: !0,
    allowClose: !0,
    overlayClickBehavior: "close",
    overlayOpacity: .7,
    smoothScroll: !1,
    disableActiveInteraction: !1,
    showProgress: !1,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...zz760
  };
}
function zz761(val) {
  return val ? ko[val] : ko;
}
function zz762(val) {
  Jc = val;
}
function zz763() {
  return Jc;
}
let rr = {};
function zz764(val, val2) {
  rr[val] = val2;
}
function zz765(val) {
  var val2;
  (val2 = rr[val]) == null || val2.call(rr);
}
function zz766() {
  rr = {};
}
function zz767(val, val2, val3, val4) {
  return (val /= val4 / 2) < 1 ? val3 / 2 * val * val + val2 : -val3 / 2 * (--val * (val - 2) - 1) + val2;
}
function zz768(val) {
  const text = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return val.flatMap(val1 => {
    const val2 = val1.matches(text),
      val3 = Array.from(val1.querySelectorAll(text));
    return [...(val2 ? [val1] : []), ...val3];
  }).filter(val1 => getComputedStyle(val1).pointerEvents !== "none" && zz772(val1));
}
function zz769(val) {
  if (!val || zz771(val)) return;
  const val2 = zz761("smoothScroll"),
    val3 = val.offsetHeight > window.innerHeight;
  val.scrollIntoView({
    behavior: !val2 || zz770(val) ? "auto" : "smooth",
    inline: "center",
    block: val3 ? "start" : "center"
  });
}
function zz770(val) {
  if (!val || !val.parentElement) return;
  const val2 = val.parentElement;
  return val2.scrollHeight > val2.clientHeight;
}
function zz771(val) {
  const boundingClientRect = val.getBoundingClientRect();
  return boundingClientRect.top >= 0 && boundingClientRect.left >= 0 && boundingClientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && boundingClientRect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function zz772(val) {
  return !!(val.offsetWidth || val.offsetHeight || val.getClientRects().length);
}
let or = {};
function zz773(val, val2) {
  or[val] = val2;
}
function zz774(val) {
  return val ? or[val] : or;
}
function zz775() {
  or = {};
}
function zz776(val, val2, val3, val4) {
  let val5 = zz774("__activeStagePosition");
  const val6 = val5 || val3.getBoundingClientRect(),
    boundingClientRect = val4.getBoundingClientRect(),
    val8 = zz767(val, val6.x, boundingClientRect.x - val6.x, val2),
    val9 = zz767(val, val6.y, boundingClientRect.y - val6.y, val2),
    val10 = zz767(val, val6.width, boundingClientRect.width - val6.width, val2),
    val11 = zz767(val, val6.height, boundingClientRect.height - val6.height, val2);
  val5 = {
    x: val8,
    y: val9,
    width: val10,
    height: val11
  }, zz780(val5), zz773("__activeStagePosition", val5);
}
function zz777(val) {
  if (!val) return;
  const boundingClientRect = val.getBoundingClientRect(),
    obj1 = {
      x: boundingClientRect.x,
      y: boundingClientRect.y,
      width: boundingClientRect.width,
      height: boundingClientRect.height
    };
  zz773("__activeStagePosition", obj1), zz780(obj1);
}
function zz778() {
  const val = zz774("__activeStagePosition"),
    val2 = zz774("__overlaySvg");
  if (!val) return;
  if (!val2) {
    console.warn("No stage svg found.");
    return;
  }
  const windowInnerWidth = window.innerWidth,
    windowInnerHeight = window.innerHeight;
  val2.setAttribute("viewBox", `0 0 ${windowInnerWidth} ${windowInnerHeight}`);
}
function zz779(val) {
  const val2 = zz781(val);
  document.body.appendChild(val2), zz792(val2, val1 => {
    val1.target.tagName === "path" && zz765("overlayClick");
  }), zz773("__overlaySvg", val2);
}
function zz780(val) {
  const val2 = zz774("__overlaySvg");
  if (!val2) {
    zz779(val);
    return;
  }
  const val3 = val2.firstElementChild;
  if (val3?.tagName !== "path") throw new Error("no path element found in stage svg");
  val3.setAttribute("d", zz782(val));
}
function zz781(val) {
  const windowInnerWidth = window.innerWidth,
    windowInnerHeight = window.innerHeight,
    elementNS = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  elementNS.classList.add("driver-overlay", "driver-overlay-animated"), elementNS.setAttribute("viewBox", `0 0 ${windowInnerWidth} ${windowInnerHeight}`), elementNS.setAttribute("xmlSpace", "preserve"), elementNS.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), elementNS.setAttribute("version", "1.1"), elementNS.setAttribute("preserveAspectRatio", "xMinYMin slice"), elementNS.style.fillRule = "evenodd", elementNS.style.clipRule = "evenodd", elementNS.style.strokeLinejoin = "round", elementNS.style.strokeMiterlimit = "2", elementNS.style.zIndex = "10000", elementNS.style.position = "fixed", elementNS.style.top = "0", elementNS.style.left = "0", elementNS.style.width = "100%", elementNS.style.height = "100%";
  const elementNS2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return elementNS2.setAttribute("d", zz782(val)), elementNS2.style.fill = zz761("overlayColor") || "rgb(0,0,0)", elementNS2.style.opacity = `${zz761("overlayOpacity")}`, elementNS2.style.pointerEvents = "auto", elementNS2.style.cursor = "auto", elementNS.appendChild(elementNS2), elementNS;
}
function zz782(val) {
  const windowInnerWidth = window.innerWidth,
    windowInnerHeight = window.innerHeight,
    val4 = zz761("stagePadding") || 0,
    val5 = zz761("stageRadius") || 0,
    val6 = val.width + val4 * 2,
    val7 = val.height + val4 * 2,
    val8 = Math.min(val5, val6 / 2, val7 / 2),
    val9 = Math.floor(Math.max(val8, 0)),
    val10 = val.x - val4 + val9,
    val11 = val.y - val4,
    val12 = val6 - val9 * 2,
    val13 = val7 - val9 * 2;
  return `M${windowInnerWidth},0L0,0L0,${windowInnerHeight}L${windowInnerWidth},${windowInnerHeight}L${windowInnerWidth},0Z
    M${val10},${val11} h${val12} a${val9},${val9} 0 0 1 ${val9},${val9} v${val13} a${val9},${val9} 0 0 1 -${val9},${val9} h-${val12} a${val9},${val9} 0 0 1 -${val9},-${val9} v-${val13} a${val9},${val9} 0 0 1 ${val9},-${val9} z`;
}
function zz783() {
  const val = zz774("__overlaySvg");
  val && val.remove();
}
function zz784() {
  const elementById = document.getElementById("driver-dummy-element");
  if (elementById) return elementById;
  let element = document.createElement("div");
  return element.id = "driver-dummy-element", element.style.width = "0", element.style.height = "0", element.style.pointerEvents = "none", element.style.opacity = "0", element.style.position = "fixed", element.style.top = "50%", element.style.left = "50%", document.body.appendChild(element), element;
}
function zz785(val) {
  const {
    element: val2
  } = val;
  let val3 = typeof val2 == "function" ? val2() : typeof val2 == "string" ? document.querySelector(val2) : val2;
  val3 || (val3 = zz784()), zz787(val3, val);
}
function zz786() {
  const val = zz774("__activeElement"),
    val2 = zz774("__activeStep");
  val && (zz777(val), zz778(), zz800(val, val2));
}
function zz787(val, val2) {
  var val3;
  const val4 = Date.now(),
    val5 = zz774("__activeStep"),
    val6 = zz774("__activeElement") || val,
    val7 = !val6 || val6 === val,
    val8 = val.id === "driver-dummy-element",
    val9 = val6.id === "driver-dummy-element",
    val10 = zz761("animate"),
    val11 = val2.onHighlightStarted || zz761("onHighlightStarted"),
    val12 = val2?.onHighlighted || zz761("onHighlighted"),
    val13 = val5?.onDeselected || zz761("onDeselected"),
    val14 = zz761(),
    val15 = zz774();
  !val7 && val13 && val13(val9 ? void 0 : val6, val5, {
    config: val14,
    state: val15,
    driver: zz763()
  }), val11 && val11(val8 ? void 0 : val, val2, {
    config: val14,
    state: val15,
    driver: zz763()
  });
  const val16 = !val7 && val10;
  let val17 = !1;
  zz795(), zz773("previousStep", val5), zz773("previousElement", val6), zz773("activeStep", val2), zz773("activeElement", val);
  const fn1 = () => {
    if (zz774("__transitionCallback") !== fn1) return;
    const val1 = Date.now() - val4,
      val18 = 400 - val1 <= 400 / 2;
    val2.popover && val18 && !val17 && val16 && (zz796(val, val2), val17 = !0), zz761("animate") && val1 < 400 ? zz776(val1, 400, val6, val) : (zz777(val), val12 && val12(val8 ? void 0 : val, val2, {
      config: zz761(),
      state: zz774(),
      driver: zz763()
    }), zz773("__transitionCallback", void 0), zz773("__previousStep", val5), zz773("__previousElement", val6), zz773("__activeStep", val2), zz773("__activeElement", val)), window.requestAnimationFrame(fn1);
  };
  zz773("__transitionCallback", fn1), window.requestAnimationFrame(fn1), zz769(val), !val16 && val2.popover && zz796(val, val2), val6.classList.remove("driver-active-element", "driver-no-interaction"), val6.removeAttribute("aria-haspopup"), val6.removeAttribute("aria-expanded"), val6.removeAttribute("aria-controls"), ((val3 = val2.disableActiveInteraction) != null ? val3 : zz761("disableActiveInteraction")) && val.classList.add("driver-no-interaction"), val.classList.add("driver-active-element"), val.setAttribute("aria-haspopup", "dialog"), val.setAttribute("aria-expanded", "true"), val.setAttribute("aria-controls", "driver-popover-content");
}
function zz788() {
  var val;
  (val = document.getElementById("driver-dummy-element")) == null || val.remove(), document.querySelectorAll(".driver-active-element").forEach(val1 => {
    val1.classList.remove("driver-active-element", "driver-no-interaction"), val1.removeAttribute("aria-haspopup"), val1.removeAttribute("aria-expanded"), val1.removeAttribute("aria-controls");
  });
}
function zz789() {
  const val = zz774("__resizeTimeout");
  val && window.cancelAnimationFrame(val), zz773("__resizeTimeout", window.requestAnimationFrame(zz786));
}
function zz790(val) {
  var val2;
  if (!zz774("isInitialized") || !(val.key === "Tab" || val.keyCode === 9)) return;
  const val3 = zz774("__activeElement"),
    val4 = (val2 = zz774("popover")) == null ? void 0 : val2.wrapper,
    val5 = zz768([...(val4 ? [val4] : []), ...(val3 ? [val3] : [])]),
    val6 = val5[0],
    val7 = val5[val5.length - 1];
  if (val.preventDefault(), val.shiftKey) {
    const val1 = val5[val5.indexOf(document.activeElement) - 1] || val7;
    val1?.focus();
  } else {
    const val1 = val5[val5.indexOf(document.activeElement) + 1] || val6;
    val1?.focus();
  }
}
function zz791(val) {
  var val2;
  ((val2 = zz761("allowKeyboardControl")) == null || val2) && (val.key === "Escape" ? zz765("escapePress") : val.key === "ArrowRight" ? zz765("arrowRightPress") : val.key === "ArrowLeft" && zz765("arrowLeftPress"));
}
function zz792(val, val2, val3) {
  const fn1 = (val1, val4) => {
    const val5 = val1.target;
    val.contains(val5) && ((!val3 || val3(val5)) && (val1.preventDefault(), val1.stopPropagation(), val1.stopImmediatePropagation()), val4?.(val1));
  };
  document.addEventListener("pointerdown", fn1, !0), document.addEventListener("mousedown", fn1, !0), document.addEventListener("pointerup", fn1, !0), document.addEventListener("mouseup", fn1, !0), document.addEventListener("click", val1 => {
    fn1(val1, val2);
  }, !0);
}
function zz793() {
  window.addEventListener("keyup", zz791, !1), window.addEventListener("keydown", zz790, !1), window.addEventListener("resize", zz789), window.addEventListener("scroll", zz789);
}
function zz794() {
  window.removeEventListener("keyup", zz791), window.removeEventListener("resize", zz789), window.removeEventListener("scroll", zz789);
}
function zz795() {
  const val = zz774("popover");
  val && (val.wrapper.style.display = "none");
}
function zz796(val, val2) {
  var val3, val4;
  let val5 = zz774("popover");
  val5 && document.body.removeChild(val5.wrapper), val5 = zz803(), document.body.appendChild(val5.wrapper);
  const {
    title: val6,
    description: val7,
    showButtons: val8,
    disableButtons: val9,
    showProgress: val10,
    nextBtnText: val11 = zz761("nextBtnText") || "Next &rarr;",
    prevBtnText: val12 = zz761("prevBtnText") || "&larr; Previous",
    progressText: val13 = zz761("progressText") || "{current} of {total}"
  } = val2.popover || {};
  val5.nextButton.innerHTML = val11, val5.previousButton.innerHTML = val12, val5.progress.innerHTML = val13, val6 ? (val5.title.innerHTML = val6, val5.title.style.display = "block") : val5.title.style.display = "none", val7 ? (val5.description.innerHTML = val7, val5.description.style.display = "block") : val5.description.style.display = "none";
  const val14 = val8 || zz761("showButtons"),
    val15 = val10 || zz761("showProgress") || !1,
    val16 = val14?.includes("next") || val14?.includes("previous") || val15;
  val5.closeButton.style.display = val14.includes("close") ? "block" : "none", val16 ? (val5.footer.style.display = "flex", val5.progress.style.display = val15 ? "block" : "none", val5.nextButton.style.display = val14.includes("next") ? "block" : "none", val5.previousButton.style.display = val14.includes("previous") ? "block" : "none") : val5.footer.style.display = "none";
  const val17 = val9 || zz761("disableButtons") || [];
  val17 != null && val17.includes("next") && (val5.nextButton.disabled = !0, val5.nextButton.classList.add("driver-popover-btn-disabled")), val17 != null && val17.includes("previous") && (val5.previousButton.disabled = !0, val5.previousButton.classList.add("driver-popover-btn-disabled")), val17 != null && val17.includes("close") && (val5.closeButton.disabled = !0, val5.closeButton.classList.add("driver-popover-btn-disabled"));
  const val18 = val5.wrapper;
  val18.style.display = "block", val18.style.left = "", val18.style.top = "", val18.style.bottom = "", val18.style.right = "", val18.id = "driver-popover-content", val18.setAttribute("role", "dialog"), val18.setAttribute("aria-labelledby", "driver-popover-title"), val18.setAttribute("aria-describedby", "driver-popover-description");
  const val19 = val5.arrow;
  val19.className = "driver-popover-arrow";
  const val20 = ((val3 = val2.popover) == null ? void 0 : val3.popoverClass) || zz761("popoverClass") || "";
  val18.className = `driver-popover ${val20}`.trim(), zz792(val5.wrapper, val1 => {
    var val24, val25, val26;
    const val27 = val1.target,
      val28 = ((val24 = val2.popover) == null ? void 0 : val24.onNextClick) || zz761("onNextClick"),
      val29 = ((val25 = val2.popover) == null ? void 0 : val25.onPrevClick) || zz761("onPrevClick"),
      val30 = ((val26 = val2.popover) == null ? void 0 : val26.onCloseClick) || zz761("onCloseClick");
    if (val27.closest(".driver-popover-next-btn")) return val28 ? val28(val, val2, {
      config: zz761(),
      state: zz774(),
      driver: zz763()
    }) : zz765("nextClick");
    if (val27.closest(".driver-popover-prev-btn")) return val29 ? val29(val, val2, {
      config: zz761(),
      state: zz774(),
      driver: zz763()
    }) : zz765("prevClick");
    if (val27.closest(".driver-popover-close-btn")) return val30 ? val30(val, val2, {
      config: zz761(),
      state: zz774(),
      driver: zz763()
    }) : zz765("closeClick");
  }, val1 => !(val5 != null && val5.description.contains(val1)) && !(val5 != null && val5.title.contains(val1)) && typeof val1.className == "string" && val1.className.includes("driver-popover")), zz773("popover", val5);
  const val21 = ((val4 = val2.popover) == null ? void 0 : val4.onPopoverRender) || zz761("onPopoverRender");
  val21 && val21(val5, {
    config: zz761(),
    state: zz774(),
    driver: zz763()
  }), zz800(val, val2), zz769(val18);
  const val22 = val.classList.contains("driver-dummy-element"),
    val23 = zz768([val18, ...(val22 ? [] : [val])]);
  val23.length > 0 && val23[0].focus();
}
function zz797() {
  const val = zz774("popover");
  if (!(val != null && val.wrapper)) return;
  const boundingClientRect = val.wrapper.getBoundingClientRect(),
    val3 = zz761("stagePadding") || 0,
    val4 = zz761("popoverOffset") || 0;
  return {
    width: boundingClientRect.width + val3 + val4,
    height: boundingClientRect.height + val3 + val4,
    realWidth: boundingClientRect.width,
    realHeight: boundingClientRect.height
  };
}
function zz798(val, val2) {
  const {
    elementDimensions: val3,
    popoverDimensions: val4,
    popoverPadding: val5,
    popoverArrowDimensions: val6
  } = val2;
  return val === "start" ? Math.max(Math.min(val3.top - val5, window.innerHeight - val4.realHeight - val6.width), val6.width) : val === "end" ? Math.max(Math.min(val3.top - val4?.realHeight + val3.height + val5, window.innerHeight - val4?.realHeight - val6.width), val6.width) : val === "center" ? Math.max(Math.min(val3.top + val3.height / 2 - val4?.realHeight / 2, window.innerHeight - val4?.realHeight - val6.width), val6.width) : 0;
}
function zz799(val, val2) {
  const {
    elementDimensions: val3,
    popoverDimensions: val4,
    popoverPadding: val5,
    popoverArrowDimensions: val6
  } = val2;
  return val === "start" ? Math.max(Math.min(val3.left - val5, window.innerWidth - val4.realWidth - val6.width), val6.width) : val === "end" ? Math.max(Math.min(val3.left - val4?.realWidth + val3.width + val5, window.innerWidth - val4?.realWidth - val6.width), val6.width) : val === "center" ? Math.max(Math.min(val3.left + val3.width / 2 - val4?.realWidth / 2, window.innerWidth - val4?.realWidth - val6.width), val6.width) : 0;
}
function zz800(val, val2) {
  const val3 = zz774("popover");
  if (!val3) return;
  const {
      align: val4 = "start",
      side: val5 = "left"
    } = val2?.popover || {},
    val6 = val4,
    val7 = val.id === "driver-dummy-element" ? "over" : val5,
    val8 = zz761("stagePadding") || 0,
    val9 = zz797(),
    boundingClientRect = val3.arrow.getBoundingClientRect(),
    boundingClientRect2 = val.getBoundingClientRect(),
    val12 = boundingClientRect2.top - val9.height;
  let val13 = val12 >= 0;
  const val14 = window.innerHeight - (boundingClientRect2.bottom + val9.height);
  let val15 = val14 >= 0;
  const val16 = boundingClientRect2.left - val9.width;
  let val17 = val16 >= 0;
  const val18 = window.innerWidth - (boundingClientRect2.right + val9.width);
  let val19 = val18 >= 0;
  const val20 = !val13 && !val15 && !val17 && !val19;
  let val21 = val7;
  if (val7 === "top" && val13 ? val19 = val17 = val15 = !1 : val7 === "bottom" && val15 ? val19 = val17 = val13 = !1 : val7 === "left" && val17 ? val19 = val13 = val15 = !1 : val7 === "right" && val19 && (val17 = val13 = val15 = !1), val7 === "over") {
    const val1 = window.innerWidth / 2 - val9.realWidth / 2,
      val22 = window.innerHeight / 2 - val9.realHeight / 2;
    val3.wrapper.style.left = `${val1}px`, val3.wrapper.style.right = "auto", val3.wrapper.style.top = `${val22}px`, val3.wrapper.style.bottom = "auto";
  } else if (val20) {
    const val1 = window.innerWidth / 2 - val9?.realWidth / 2,
      num = 10;
    val3.wrapper.style.left = `${val1}px`, val3.wrapper.style.right = "auto", val3.wrapper.style.bottom = `${num}px`, val3.wrapper.style.top = "auto";
  } else if (val17) {
    const val1 = Math.min(val16, window.innerWidth - val9?.realWidth - boundingClientRect.width),
      val22 = zz798(val6, {
        elementDimensions: boundingClientRect2,
        popoverDimensions: val9,
        popoverPadding: val8,
        popoverArrowDimensions: boundingClientRect
      });
    val3.wrapper.style.left = `${val1}px`, val3.wrapper.style.top = `${val22}px`, val3.wrapper.style.bottom = "auto", val3.wrapper.style.right = "auto", val21 = "left";
  } else if (val19) {
    const val1 = Math.min(val18, window.innerWidth - val9?.realWidth - boundingClientRect.width),
      val22 = zz798(val6, {
        elementDimensions: boundingClientRect2,
        popoverDimensions: val9,
        popoverPadding: val8,
        popoverArrowDimensions: boundingClientRect
      });
    val3.wrapper.style.right = `${val1}px`, val3.wrapper.style.top = `${val22}px`, val3.wrapper.style.bottom = "auto", val3.wrapper.style.left = "auto", val21 = "right";
  } else if (val13) {
    const val1 = Math.min(val12, window.innerHeight - val9.realHeight - boundingClientRect.width);
    let val22 = zz799(val6, {
      elementDimensions: boundingClientRect2,
      popoverDimensions: val9,
      popoverPadding: val8,
      popoverArrowDimensions: boundingClientRect
    });
    val3.wrapper.style.top = `${val1}px`, val3.wrapper.style.left = `${val22}px`, val3.wrapper.style.bottom = "auto", val3.wrapper.style.right = "auto", val21 = "top";
  } else if (val15) {
    const val1 = Math.min(val14, window.innerHeight - val9?.realHeight - boundingClientRect.width);
    let val22 = zz799(val6, {
      elementDimensions: boundingClientRect2,
      popoverDimensions: val9,
      popoverPadding: val8,
      popoverArrowDimensions: boundingClientRect
    });
    val3.wrapper.style.left = `${val22}px`, val3.wrapper.style.bottom = `${val1}px`, val3.wrapper.style.top = "auto", val3.wrapper.style.right = "auto", val21 = "bottom";
  }
  val20 ? val3.arrow.classList.add("driver-popover-arrow-none") : zz801(val6, val21, val);
}
function zz801(val, val2, val3) {
  const val4 = zz774("popover");
  if (!val4) return;
  const boundingClientRect = val3.getBoundingClientRect(),
    val6 = zz797(),
    val7 = val4.arrow,
    val8 = val6.width,
    windowInnerWidth = window.innerWidth,
    val10 = boundingClientRect.width,
    val11 = boundingClientRect.left,
    val12 = val6.height,
    windowInnerHeight = window.innerHeight,
    val14 = boundingClientRect.top,
    val15 = boundingClientRect.height;
  val7.className = "driver-popover-arrow";
  let val16 = val2,
    val17 = val;
  if (val2 === "top" ? (val11 + val10 <= 0 ? (val16 = "right", val17 = "end") : val11 + val10 - val8 <= 0 && (val16 = "top", val17 = "start"), val11 >= windowInnerWidth ? (val16 = "left", val17 = "end") : val11 + val8 >= windowInnerWidth && (val16 = "top", val17 = "end")) : val2 === "bottom" ? (val11 + val10 <= 0 ? (val16 = "right", val17 = "start") : val11 + val10 - val8 <= 0 && (val16 = "bottom", val17 = "start"), val11 >= windowInnerWidth ? (val16 = "left", val17 = "start") : val11 + val8 >= windowInnerWidth && (val16 = "bottom", val17 = "end")) : val2 === "left" ? (val14 + val15 <= 0 ? (val16 = "bottom", val17 = "end") : val14 + val15 - val12 <= 0 && (val16 = "left", val17 = "start"), val14 >= windowInnerHeight ? (val16 = "top", val17 = "end") : val14 + val12 >= windowInnerHeight && (val16 = "left", val17 = "end")) : val2 === "right" && (val14 + val15 <= 0 ? (val16 = "bottom", val17 = "start") : val14 + val15 - val12 <= 0 && (val16 = "right", val17 = "start"), val14 >= windowInnerHeight ? (val16 = "top", val17 = "start") : val14 + val12 >= windowInnerHeight && (val16 = "right", val17 = "end")), !val16) val7.classList.add("driver-popover-arrow-none");else {
    val7.classList.add(`driver-popover-arrow-side-${val16}`), val7.classList.add(`driver-popover-arrow-align-${val17}`);
    const zz802 = val3.getBoundingClientRect(),
      boundingClientRect2 = val7.getBoundingClientRect(),
      val19 = zz761("stagePadding") || 0,
      val20 = zz802.left - val19 < window.innerWidth && zz802.right + val19 > 0 && zz802.top - val19 < window.innerHeight && zz802.bottom + val19 > 0;
    val2 === "bottom" && val20 && (boundingClientRect2.x > zz802.x && boundingClientRect2.x + boundingClientRect2.width < zz802.x + zz802.width ? val4.wrapper.style.transform = "translateY(0)" : (val7.classList.remove(`driver-popover-arrow-align-${val17}`), val7.classList.add("driver-popover-arrow-none"), val4.wrapper.style.transform = `translateY(-${val19 / 2}px)`));
  }
}
function zz803() {
  const element = document.createElement("div");
  element.classList.add("driver-popover");
  const element2 = document.createElement("div");
  element2.classList.add("driver-popover-arrow");
  const element3 = document.createElement("header");
  element3.id = "driver-popover-title", element3.classList.add("driver-popover-title"), element3.style.display = "none", element3.innerText = "Popover Title";
  const element4 = document.createElement("div");
  element4.id = "driver-popover-description", element4.classList.add("driver-popover-description"), element4.style.display = "none", element4.innerText = "Popover description is here";
  const element5 = document.createElement("button");
  element5.type = "button", element5.classList.add("driver-popover-close-btn"), element5.setAttribute("aria-label", "Close"), element5.innerHTML = "&times;";
  const element6 = document.createElement("footer");
  element6.classList.add("driver-popover-footer");
  const element7 = document.createElement("span");
  element7.classList.add("driver-popover-progress-text"), element7.innerText = "";
  const element8 = document.createElement("span");
  element8.classList.add("driver-popover-navigation-btns");
  const element9 = document.createElement("button");
  element9.type = "button", element9.classList.add("driver-popover-prev-btn"), element9.innerHTML = "&larr; Previous";
  const element10 = document.createElement("button");
  return element10.type = "button", element10.classList.add("driver-popover-next-btn"), element10.innerHTML = "Next &rarr;", element8.appendChild(element9), element8.appendChild(element10), element6.appendChild(element7), element6.appendChild(element8), element.appendChild(element5), element.appendChild(element2), element.appendChild(element3), element.appendChild(element4), element.appendChild(element6), {
    wrapper: element,
    arrow: element2,
    title: element3,
    description: element4,
    footer: element6,
    previousButton: element9,
    nextButton: element10,
    closeButton: element5,
    footerButtons: element8,
    progress: element7
  };
}
function zz804() {
  var val;
  const val2 = zz774("popover");
  val2 && ((val = val2.wrapper.parentElement) == null || val.removeChild(val2.wrapper));
}
function zz805(zz806 = {}) {
  zz759(zz806);
  function zz807() {
    zz761("allowClose") && zz817();
  }
  function zz808() {
    const val1 = zz761("overlayClickBehavior");
    if (zz761("allowClose") && val1 === "close") {
      zz817();
      return;
    }
    if (typeof val1 == "function") {
      const val2 = zz774("__activeStep"),
        val3 = zz774("__activeElement");
      val1(val3, val2, {
        config: zz761(),
        state: zz774(),
        driver: zz763()
      });
      return;
    }
    val1 === "nextStep" && zz809();
  }
  function zz809() {
    const val1 = zz774("activeIndex"),
      val2 = zz761("steps") || [];
    if (typeof val1 > "u") return;
    const val3 = val1 + 1;
    val2[val3] ? zz815(val3) : zz817();
  }
  function zz810() {
    const val1 = zz774("activeIndex"),
      val2 = zz761("steps") || [];
    if (typeof val1 > "u") return;
    const val3 = val1 - 1;
    val2[val3] ? zz815(val3) : zz817();
  }
  function zz811(val1) {
    (zz761("steps") || [])[val1] ? zz815(val1) : zz817();
  }
  function zz812() {
    var val1;
    if (zz774("__transitionCallback")) return;
    const val2 = zz774("activeIndex"),
      val3 = zz774("__activeStep"),
      val4 = zz774("__activeElement");
    if (typeof val2 > "u" || typeof val3 > "u" || typeof zz774("activeIndex") > "u") return;
    const val5 = ((val1 = val3.popover) == null ? void 0 : val1.onPrevClick) || zz761("onPrevClick");
    if (val5) return val5(val4, val3, {
      config: zz761(),
      state: zz774(),
      driver: zz763()
    });
    zz810();
  }
  function zz813() {
    var val1;
    if (zz774("__transitionCallback")) return;
    const val2 = zz774("activeIndex"),
      val3 = zz774("__activeStep"),
      val4 = zz774("__activeElement");
    if (typeof val2 > "u" || typeof val3 > "u") return;
    const val5 = ((val1 = val3.popover) == null ? void 0 : val1.onNextClick) || zz761("onNextClick");
    if (val5) return val5(val4, val3, {
      config: zz761(),
      state: zz774(),
      driver: zz763()
    });
    zz809();
  }
  function zz814() {
    zz774("isInitialized") || (zz773("isInitialized", !0), document.body.classList.add("driver-active", zz761("animate") ? "driver-fade" : "driver-simple"), zz793(), zz764("overlayClick", zz808), zz764("escapePress", zz807), zz764("arrowLeftPress", zz812), zz764("arrowRightPress", zz813));
  }
  function zz815(zz816 = 0) {
    var val2, val3, val4, val5, val6, val7, val8, val9;
    const val10 = zz761("steps");
    if (!val10) {
      console.error("No steps to drive through"), zz817();
      return;
    }
    if (!val10[zz816]) {
      zz817();
      return;
    }
    zz773("__activeOnDestroyed", document.activeElement), zz773("activeIndex", zz816);
    const val11 = val10[zz816],
      val12 = val10[zz816 + 1],
      val13 = val10[zz816 - 1],
      val14 = ((val2 = val11.popover) == null ? void 0 : val2.doneBtnText) || zz761("doneBtnText") || "Done",
      val15 = zz761("allowClose"),
      val16 = typeof ((val3 = val11.popover) == null ? void 0 : val3.showProgress) < "u" ? (val4 = val11.popover) == null ? void 0 : val4.showProgress : zz761("showProgress"),
      val17 = (((val5 = val11.popover) == null ? void 0 : val5.progressText) || zz761("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${zz816 + 1}`).replace("{{total}}", `${val10.length}`),
      val18 = ((val6 = val11.popover) == null ? void 0 : val6.showButtons) || zz761("showButtons"),
      val19 = ["next", "previous", ...(val15 ? ["close"] : [])].filter(val23 => !(val18 != null && val18.length) || val18.includes(val23)),
      val20 = ((val7 = val11.popover) == null ? void 0 : val7.onNextClick) || zz761("onNextClick"),
      val21 = ((val8 = val11.popover) == null ? void 0 : val8.onPrevClick) || zz761("onPrevClick"),
      val22 = ((val9 = val11.popover) == null ? void 0 : val9.onCloseClick) || zz761("onCloseClick");
    zz785({
      ...val11,
      popover: {
        showButtons: val19,
        nextBtnText: val12 ? void 0 : val14,
        disableButtons: [...(val13 ? [] : ["previous"])],
        showProgress: val16,
        progressText: val17,
        onNextClick: val20 || (() => {
          val12 ? zz815(zz816 + 1) : zz817();
        }),
        onPrevClick: val21 || (() => {
          zz815(zz816 - 1);
        }),
        onCloseClick: val22 || (() => {
          zz817();
        }),
        ...(val11?.popover || {})
      }
    });
  }
  function zz817(zz818 = !0) {
    const val2 = zz774("__activeElement"),
      val3 = zz774("__activeStep"),
      val4 = zz774("__activeOnDestroyed"),
      val5 = zz761("onDestroyStarted");
    if (zz818 && val5) {
      const val8 = !val2 || val2?.id === "driver-dummy-element";
      val5(val8 ? void 0 : val2, val3, {
        config: zz761(),
        state: zz774(),
        driver: zz763()
      });
      return;
    }
    const val6 = val3?.onDeselected || zz761("onDeselected"),
      val7 = zz761("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), zz794(), zz804(), zz788(), zz783(), zz766(), zz775(), val2 && val3) {
      const val8 = val2.id === "driver-dummy-element";
      val6 && val6(val8 ? void 0 : val2, val3, {
        config: zz761(),
        state: zz774(),
        driver: zz763()
      }), val7 && val7(val8 ? void 0 : val2, val3, {
        config: zz761(),
        state: zz774(),
        driver: zz763()
      });
    }
    val4 && val4.focus();
  }
  const obj1 = {
    isActive: () => zz774("isInitialized") || !1,
    refresh: zz789,
    drive: (zz819 = 0) => {
      zz814(), zz815(zz819);
    },
    setConfig: zz759,
    setSteps: val1 => {
      zz775(), zz759({
        ...zz761(),
        steps: val1
      });
    },
    getConfig: zz761,
    getState: zz774,
    getActiveIndex: () => zz774("activeIndex"),
    isFirstStep: () => zz774("activeIndex") === 0,
    isLastStep: () => {
      const val1 = zz761("steps") || [],
        val2 = zz774("activeIndex");
      return val2 !== void 0 && val2 === val1.length - 1;
    },
    getActiveStep: () => zz774("activeStep"),
    getActiveElement: () => zz774("activeElement"),
    getPreviousElement: () => zz774("previousElement"),
    getPreviousStep: () => zz774("previousStep"),
    moveNext: zz809,
    movePrevious: zz810,
    moveTo: zz811,
    hasNextStep: () => {
      const val1 = zz761("steps") || [],
        val2 = zz774("activeIndex");
      return val2 !== void 0 && !!val1[val2 + 1];
    },
    hasPreviousStep: () => {
      const val1 = zz761("steps") || [],
        val2 = zz774("activeIndex");
      return val2 !== void 0 && !!val1[val2 - 1];
    },
    highlight: val1 => {
      zz814(), zz785({
        ...val1,
        popover: val1.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...val1.popover
        } : void 0
      });
    },
    destroy: () => {
      zz817(!1);
    }
  };
  return zz762(obj1), obj1;
}
const As = {
    HOME_COMMUNITY_ENTRY: 1,
    COMMUNITY_EXPLORE: 2,
    MINOR_SECTION_INTRO: 3,
    MINOR_SECTION_FEEDBACK: 4,
    MINOR_SECTION_CLICK: 5,
    RATING_LIST_INTRO: 6,
    RATING_LIST_FEEDBACK: 7,
    RATING_ITEM_CARD: 8,
    RATING_ITEM_STARS: 9,
    RATING_DETAIL_FEEDBACK: 10,
    COMMUNITY_HOT: 11,
    COMMUNITY_RANDOM: 12,
    COMMUNITY_REFRESH: 13,
    COMMUNITY_COLLECTION: 14,
    COMMUNITY_FINAL: 15,
    COMPLETED: 100
  },
  Ss = "scoring-tour-step",
  Ir = "scoring-tour-completed",
  wn = zz83(As.HOME_COMMUNITY_ENTRY),
  _n = zz83(!1),
  Ot = zz83(null);
function zz820() {
  if (localStorage.getItem(Ir) === "true") {
    _n.value = !0;
    return;
  }
  const item = localStorage.getItem(Ss);
  if (item) {
    const int = parseInt(item, 10);
    isNaN(int) || (wn.value = int);
  }
}
function zz821(val) {
  wn.value = val, localStorage.setItem(Ss, val.toString());
}
function zz822() {
  _n.value = !0, localStorage.setItem(Ir, "true"), localStorage.removeItem(Ss), Ot.value && (Ot.value.destroy(), Ot.value = null);
}
function zz823() {
  _n.value = !1, wn.value = As.HOME_COMMUNITY_ENTRY, localStorage.removeItem(Ir), localStorage.removeItem(Ss);
}
function zz824(zz825 = As.HOME_COMMUNITY_ENTRY) {
  _n.value = !1, wn.value = zz825, localStorage.removeItem(Ir), localStorage.setItem(Ss, zz825.toString());
}
function zz826(val) {
  return Ot.value && Ot.value.destroy(), Ot.value = zz805({
    showProgress: !1,
    animate: !0,
    allowClose: !1,
    allowKeyboardControl: !1,
    disableActiveInteraction: !0,
    overlayColor: "rgba(0, 0, 0, 0.6)",
    stagePadding: 8,
    stageRadius: 8,
    popoverClass: "scoring-tour-popover",
    nextBtnText: "我知道了",
    doneBtnText: "完成",
    showButtons: ["next"],
    ...val
  }), Ot.value;
}
function zz827(val, val2, val3, val4) {
  const val5 = zz826({
    nextBtnText: val4?.nextBtnText ?? "我知道了",
    disableActiveInteraction: !(val4?.allowInteraction ?? !1)
  });
  return val5.highlight({
    element: val,
    popover: {
      title: val2,
      description: val3,
      side: val4?.side ?? "bottom",
      align: val4?.align ?? "center",
      onNextClick: val4?.onNextClick,
      onPopoverRender: val4?.showSkipButton ? val1 => {
        const element = document.createElement("button");
        element.className = "tour-skip-btn", element.textContent = "我想自己探索，退出向导", element.onclick = () => {
          zz822(), zz829();
        }, val1.wrapper.appendChild(element);
      } : void 0
    }
  }), val5;
}
function zz828(val, val2, val3) {
  const val4 = zz826({
    nextBtnText: val3?.doneBtnText ?? "开始体验"
  });
  return val4.highlight({
    popover: {
      title: val,
      description: val2,
      onNextClick: val3?.onNextClick
    }
  }), val4;
}
function zz829() {
  Ot.value && (Ot.value.destroy(), Ot.value = null);
}
function zz830() {
  return zz820(), !_n.value;
}
function zz831() {
  return wn.value;
}
function zz832() {
  return !_n.value && wn.value === As.RATING_ITEM_STARS;
}
function zz833() {
  return {
    currentStep: wn,
    isCompleted: _n,
    TourStep: As,
    initTourState: zz820,
    saveStep: zz821,
    completeTour: zz822,
    resetTour: zz823,
    forceStartTour: zz824,
    createDriver: zz826,
    highlightElement: zz827,
    showCenteredPopover: zz828,
    destroyDriver: zz829,
    shouldStartTour: zz830,
    getCurrentStep: zz831,
    isInStarRatingTour: zz832
  };
}
async function zz834(val) {
  return (await http.get("/banners", {
    params: {
      position: val?.position
    }
  })).data.data;
}
async function zz835(val) {
  return (await http.get("/admin/banners", {
    params: val
  })).data.data;
}
async function zz836(val) {
  return (await http.post("/admin/banners", val)).data.data;
}
async function zz837(val, val2) {
  return (await http.put(`/admin/banners/${val}`, val2)).data.data;
}
async function zz838(val) {
  await http.delete(`/admin/banners/${val}`);
}
async function zz839(val) {
  return (await http.post(`/admin/banners/${val}/toggle-status`)).data.data;
}
const local_r1 = {
    class: "home"
  },
  local_o1 = {
    class: "header"
  },
  local_i1 = {
    class: "header-container"
  },
  local_l1 = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  local_a1 = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  local_c1 = {
    class: "nav-links"
  },
  local_u1 = {
    class: "header-right"
  },
  local_d1 = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  local_f1 = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  local_p1 = {
    class: "content-wrapper"
  },
  local_m1 = {
    class: "desktop-sidebar"
  },
  local_h1 = {
    key: 0,
    class: "sidebar-user-info"
  },
  local_g1 = {
    class: "sidebar-user-name"
  },
  obj = {
    key: 0,
    class: "sidebar-user-signature"
  },
  local_y1 = {
    key: 1,
    class: "sidebar-user-status"
  },
  local_b1 = {
    key: 1,
    class: "sidebar-user-info"
  },
  local_w1 = {
    class: "sidebar-scroll-content"
  },
  _1 = {
    key: 0,
    class: "sidebar-nav-section"
  },
  E1 = {
    class: "sidebar-nav"
  },
  local_x1 = {
    key: 1,
    class: "sidebar-nav-section"
  },
  C1 = {
    class: "sidebar-nav"
  },
  A1 = {
    class: "main-content-area"
  },
  S1 = {
    key: 0,
    class: "mobile-menu"
  },
  R1 = {
    key: 0,
    class: "drawer-user-info"
  },
  T1 = {
    class: "drawer-user-name"
  },
  local_k1 = {
    key: 0,
    class: "drawer-user-signature"
  },
  O1 = {
    key: 1,
    class: "drawer-user-status"
  },
  P1 = {
    key: 1,
    class: "drawer-user-info"
  },
  I1 = {
    class: "drawer-scroll-content"
  },
  M1 = {
    class: "drawer-nav-section"
  },
  L1 = {
    class: "drawer-nav"
  },
  N1 = {
    key: 0,
    class: "drawer-nav-section"
  },
  D1 = {
    class: "drawer-nav"
  },
  B1 = {
    key: 1,
    class: "drawer-settings-section"
  },
  $1 = {
    class: "drawer-nav"
  },
  F1 = {
    class: "main"
  },
  V1 = {
    class: "banner-section"
  },
  H1 = {
    class: "banner-container"
  },
  U1 = {
    class: "banner-carousel"
  },
  local_q1 = ["onClick"],
  local_j1 = {
    class: "banner-overlay"
  },
  K1 = {
    class: "banner-text"
  },
  W1 = {
    class: "banner-title"
  },
  G1 = {
    key: 0,
    class: "banner-desc"
  },
  local_z1 = {
    key: 1,
    class: "banner-content banner-gradient"
  },
  Q1 = {
    class: "banner-text"
  },
  J1 = {
    class: "banner-title"
  },
  Y1 = {
    key: 0,
    class: "banner-desc"
  },
  X1 = {
    key: 0,
    class: "banner-dots"
  },
  Z1 = ["onClick"],
  ey = {
    class: "entry-section"
  },
  ty = {
    class: "entry-container"
  },
  ny = {
    class: "secondary-entries"
  },
  sy = zz160({
    __name: "HomePage",
    setup(val) {
      const useRouter1 = zz585(),
        useUserStore1 = useUserStore(),
        useToast1 = zz735(),
        {
          shouldStartTour: val2,
          getCurrentStep: val3,
          TourStep: val4,
          saveStep: val5,
          highlightElement: val6,
          destroyDriver: val7
        } = zz833(),
        refVal = zz83(document.documentElement.classList.contains("dark")),
        refVal2 = zz83(!1),
        refVal3 = zz83(0);
      let val8 = null;
      const refVal4 = zz83([]),
        refVal5 = zz83(!1),
        list = [{
          id: 1,
          title: "欢迎来到厦门一中学生社区",
          description: "在这里发现校园生活的无限可能",
          imageUrl: "",
          linkUrl: "/community",
          linkType: "internal",
          position: "home",
          sortOrder: 0,
          status: 1,
          startTime: null,
          endTime: null,
          createdBy: 1,
          createdAt: "",
          updatedAt: ""
        }];
      async function zz840() {
        refVal5.value = !0;
        try {
          const val1 = await zz834({
            position: "home"
          });
          val1 && val1.length > 0 ? refVal4.value = val1 : refVal4.value = list;
        } catch (val1) {
          console.error("Failed to load banners:", val1), refVal4.value = list;
        } finally {
          refVal5.value = !1;
        }
      }
      function zz841(val1) {
        refVal3.value = val1, zz844();
      }
      function zz842(val1) {
        val1.linkType === "none" || !val1.linkUrl || (val1.linkType === "internal" ? useRouter1.push(val1.linkUrl) : window.open(val1.linkUrl, "_blank"));
      }
      function zz843() {
        val8 = setInterval(() => {
          refVal3.value = (refVal3.value + 1) % refVal4.value.length;
        }, 5e3);
      }
      function zz844() {
        val8 && clearInterval(val8), zz843();
      }
      const refVal6 = zz83(!1),
        refVal7 = zz83({
          nav: !0,
          admin: !0,
          account: !0
        });
      function zz845(val1) {
        refVal7.value[val1] = !refVal7.value[val1];
      }
      onMounted(async () => {
        await zz840(), zz843(), val2() && val3() === val4.HOME_COMMUNITY_ENTRY && setTimeout(() => {
          zz846();
        }, 500);
      }), directiveUm(() => {
        val8 && clearInterval(val8), val7();
      });
      function zz846() {
        val6("#tour-community-entry", "评分社区", "这是评分社区入口，你可以在这里为校园里的各种事物打分、发表评论，和同学们分享你的看法。", {
          side: "top",
          nextBtnText: "进入看看",
          showSkipButton: !0,
          onNextClick: () => {
            val5(val4.COMMUNITY_EXPLORE), val7(), useRouter1.push("/community");
          }
        });
      }
      function zz847() {
        refVal.value = !refVal.value, document.documentElement.classList.toggle("dark", refVal.value);
      }
      function zz848() {
        useUserStore1.openLoginModal();
      }
      function zz849() {
        refVal6.value = !0, refVal2.value = !1;
      }
      function zz850() {
        useUserStore1.logout(), refVal6.value = !1, useToast1.success("已退出登录");
      }
      function zz851() {
        refVal6.value = !1;
      }
      function zz852() {
        useUserStore1.isLoggedIn ? useRouter1.push("/profile") : useUserStore1.openLoginModal();
      }
      function zz853(val1) {
        refVal2.value = !1, useRouter1.push(val1);
      }
      function zz854() {
        refVal2.value = !refVal2.value;
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val9) => {
        const val10 = zz176("router-link");
        return zz280(), zz286("div", local_r1, [zz294("header", local_o1, [zz294("div", local_i1, [zz294("button", {
          class: "mobile-menu-btn",
          onClick: zz854
        }, [refVal2.value ? (zz280(), zz286("svg", local_a1, [...(val9[24] || (val9[24] = [zz294("line", {
          x1: "18",
          y1: "6",
          x2: "6",
          y2: "18"
        }, null, -1), zz294("line", {
          x1: "6",
          y1: "6",
          x2: "18",
          y2: "18"
        }, null, -1)]))])) : (zz280(), zz286("svg", local_l1, [...(val9[23] || (val9[23] = [zz294("line", {
          x1: "3",
          y1: "12",
          x2: "21",
          y2: "12"
        }, null, -1), zz294("line", {
          x1: "3",
          y1: "6",
          x2: "21",
          y2: "6"
        }, null, -1), zz294("line", {
          x1: "3",
          y1: "18",
          x2: "21",
          y2: "18"
        }, null, -1)]))]))]), val9[32] || (val9[32] = zz294("div", {
          class: "header-center"
        }, [zz294("h1", {
          class: "header-title"
        }, "厦门一中学生社区")], -1)), zz294("nav", local_c1, [createVNode(val10, {
          to: "/",
          class: "nav-link active"
        }, {
          default: zz120(() => [...(val9[25] || (val9[25] = [zz312("首页", -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/ticket",
          class: "nav-link"
        }, {
          default: zz120(() => [...(val9[26] || (val9[26] = [zz312("活动抢票", -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/ringtone",
          class: "nav-link"
        }, {
          default: zz120(() => [...(val9[27] || (val9[27] = [zz312("宿舍铃声", -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/grade",
          class: "nav-link"
        }, {
          default: zz120(() => [...(val9[28] || (val9[28] = [zz312("分数查询", -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/community",
          class: "nav-link"
        }, {
          default: zz120(() => [...(val9[29] || (val9[29] = [zz312("评分社区", -1)]))]),
          _: 1
        })]), zz294("div", local_u1, [zz294("button", {
          class: "theme-toggle-btn",
          onClick: zz847,
          title: "切换主题"
        }, [refVal.value ? (zz280(), zz286("svg", local_d1, [...(val9[30] || (val9[30] = [zz315('<circle cx="12" cy="12" r="5" data-v-bcb35f36></circle><line x1="12" y1="1" x2="12" y2="3" data-v-bcb35f36></line><line x1="12" y1="21" x2="12" y2="23" data-v-bcb35f36></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-v-bcb35f36></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-v-bcb35f36></line><line x1="1" y1="12" x2="3" y2="12" data-v-bcb35f36></line><line x1="21" y1="12" x2="23" y2="12" data-v-bcb35f36></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-v-bcb35f36></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-v-bcb35f36></line>', 9)]))])) : (zz280(), zz286("svg", local_f1, [...(val9[31] || (val9[31] = [zz294("path", {
          d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        }, null, -1)]))]))]), zz87(useUserStore1).isLoggedIn ? (zz280(), zz286("button", {
          key: 0,
          class: "user-name-btn",
          onClick: zz852
        }, toDisplayString(zz87(useUserStore1).user?.nickname), 1)) : (zz280(), zz286("button", {
          key: 1,
          class: "btn btn-primary btn-sm desktop-only",
          onClick: zz848
        }, "登录"))])])]), zz294("div", local_p1, [zz294("aside", local_m1, [zz294("div", {
          class: "sidebar-user-section",
          onClick: zz852
        }, [zz87(useUserStore1).isLoggedIn ? (zz280(), zz286("div", local_h1, [zz294("span", local_g1, toDisplayString(zz87(useUserStore1).user?.nickname), 1), zz87(useUserStore1).user?.signature ? (zz280(), zz286("span", obj, toDisplayString(zz87(useUserStore1).user.signature), 1)) : (zz280(), zz286("span", local_y1, "点击查看个人中心"))])) : (zz280(), zz286("div", local_b1, [val9[33] || (val9[33] = zz294("span", {
          class: "sidebar-user-name"
        }, "游客", -1)), zz294("button", {
          class: "sidebar-login-btn",
          onClick: withModifiers(zz848, ["stop"])
        }, "点击登录")]))]), zz294("div", local_w1, [zz87(useUserStore1).canManageTickets || zz87(useUserStore1).canManageCampaigns || zz87(useUserStore1).canManageRating || zz87(useUserStore1).canManageMessages || zz87(useUserStore1).canManageUsers || zz87(useUserStore1).canManageBanners || zz87(useUserStore1).canManageMuseum || zz87(useUserStore1).canManageVoices ? (zz280(), zz286("div", _1, [val9[47] || (val9[47] = zz294("div", {
          class: "sidebar-section-header"
        }, [zz294("span", {
          class: "sidebar-section-title"
        }, "管理后台")], -1)), zz294("nav", E1, [zz87(useUserStore1).canManageTickets ? (zz280(), zz287(val10, {
          key: 0,
          to: "/admin/tickets",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[34] || (val9[34] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          })])], -1), zz294("span", null, "票务管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz287(val10, {
          key: 1,
          to: "/admin/dorm",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[35] || (val9[35] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M12 3l9 4H3l9-4z"
          })])], -1), zz294("span", null, "宿舍管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz287(val10, {
          key: 2,
          to: "/admin/campaigns",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[36] || (val9[36] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M9 18V5l12-2v13"
          }), zz294("circle", {
            cx: "6",
            cy: "18",
            r: "3"
          }), zz294("circle", {
            cx: "18",
            cy: "16",
            r: "3"
          })])], -1), zz294("span", null, "活动管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz287(val10, {
          key: 3,
          to: "/admin/music-download",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[37] || (val9[37] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
          }), zz294("polyline", {
            points: "7 10 12 15 17 10"
          }), zz294("line", {
            x1: "12",
            y1: "15",
            x2: "12",
            y2: "3"
          })])], -1), zz294("span", null, "歌曲下载", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageRating ? (zz280(), zz287(val10, {
          key: 4,
          to: "/admin/rating",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[38] || (val9[38] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("polygon", {
            points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          })])], -1), zz294("span", null, "评分社区", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageMessages ? (zz280(), zz287(val10, {
          key: 5,
          to: "/admin/messages",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[39] || (val9[39] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          })])], -1), zz294("span", null, "消息管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz287(val10, {
          key: 6,
          to: "/admin/qqmusic",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[40] || (val9[40] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M9 18V5l12-2v13"
          }), zz294("circle", {
            cx: "6",
            cy: "18",
            r: "3"
          }), zz294("circle", {
            cx: "18",
            cy: "16",
            r: "3"
          })])], -1), zz294("span", null, "QQ音乐管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageUsers ? (zz280(), zz287(val10, {
          key: 7,
          to: "/admin/campus",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[41] || (val9[41] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          }), zz294("circle", {
            cx: "9",
            cy: "7",
            r: "4"
          }), zz294("path", {
            d: "M23 21v-2a4 4 0 0 0-3-3.87"
          }), zz294("path", {
            d: "M16 3.13a4 4 0 0 1 0 7.75"
          })])], -1), zz294("span", null, "校园网管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageBanners ? (zz280(), zz287(val10, {
          key: 8,
          to: "/admin/banners",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[42] || (val9[42] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("rect", {
            x: "2",
            y: "3",
            width: "20",
            height: "14",
            rx: "2",
            ry: "2"
          }), zz294("line", {
            x1: "8",
            y1: "21",
            x2: "16",
            y2: "21"
          }), zz294("line", {
            x1: "12",
            y1: "17",
            x2: "12",
            y2: "21"
          })])], -1), zz294("span", null, "轮播图管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageMuseum ? (zz280(), zz287(val10, {
          key: 9,
          to: "/admin/museum",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[43] || (val9[43] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }), zz294("polyline", {
            points: "12 6 12 12 16 14"
          })])], -1), zz294("span", null, "时间线管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageDebate ? (zz280(), zz287(val10, {
          key: 10,
          to: "/admin/debate",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[44] || (val9[44] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          })])], -1), zz294("span", null, "辩论赛管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageVoices ? (zz280(), zz287(val10, {
          key: 11,
          to: "/admin/voices",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[45] || (val9[45] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M4 20 l1.2 -4.2 L16.6 4.4 a2 2 0 0 1 2.8 0 l0.2 0.2 a2 2 0 0 1 0 2.8 L8.2 18.8 Z"
          }), zz294("path", {
            d: "M14.5 6.5 l3 3"
          })])], -1), zz294("span", null, "跨代留声管理", -1)]))]),
          _: 1
        })) : zz316("", !0), zz87(useUserStore1).canManageTally ? (zz280(), zz287(val10, {
          key: 12,
          to: "/admin/tally",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[46] || (val9[46] = [zz294("div", {
            class: "sidebar-nav-icon admin"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M3 3v18h18"
          }), zz294("path", {
            d: "M7 14v4"
          }), zz294("path", {
            d: "M12 10v8"
          }), zz294("path", {
            d: "M17 6v12"
          })])], -1), zz294("span", null, "实时唱票", -1)]))]),
          _: 1
        })) : zz316("", !0)])])) : zz316("", !0), zz87(useUserStore1).isLoggedIn ? (zz280(), zz286("div", local_x1, [val9[51] || (val9[51] = zz294("div", {
          class: "sidebar-section-header"
        }, [zz294("span", {
          class: "sidebar-section-title"
        }, "我的账户")], -1)), zz294("nav", C1, [createVNode(val10, {
          to: "/profile",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[48] || (val9[48] = [zz294("div", {
            class: "sidebar-nav-icon"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
          }), zz294("circle", {
            cx: "12",
            cy: "7",
            r: "4"
          })])], -1), zz294("span", null, "个人中心", -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/messages",
          class: "sidebar-nav-item"
        }, {
          default: zz120(() => [...(val9[49] || (val9[49] = [zz294("div", {
            class: "sidebar-nav-icon messages"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("path", {
            d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          }), zz294("path", {
            d: "M13.73 21a2 2 0 0 1-3.46 0"
          })])], -1), zz294("span", null, "我的消息", -1)]))]),
          _: 1
        }), zz294("button", {
          class: "sidebar-nav-item logout-item",
          onClick: zz849
        }, [...(val9[50] || (val9[50] = [zz315('<div class="sidebar-nav-icon logout" data-v-bcb35f36><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bcb35f36><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" data-v-bcb35f36></path><polyline points="16 17 21 12 16 7" data-v-bcb35f36></polyline><line x1="21" y1="12" x2="9" y2="12" data-v-bcb35f36></line></svg></div><span data-v-bcb35f36>退出登录</span>', 2)]))])])])) : zz316("", !0)]), val9[52] || (val9[52] = zz294("div", {
          class: "sidebar-footer"
        }, [zz294("p", {
          class: "sidebar-brand"
        }, "厦门一中学生社区"), zz294("p", {
          class: "sidebar-credit"
        }, "designed by 23届玄学狗狗")], -1))]), zz294("div", A1, [createVNode(withSlots, {
          name: "menu-fade"
        }, {
          default: zz120(() => [refVal2.value ? (zz280(), zz286("div", {
            key: 0,
            class: "mobile-menu-overlay",
            onClick: zz854
          })) : zz316("", !0)]),
          _: 1
        }), createVNode(withSlots, {
          name: "menu-slide"
        }, {
          default: zz120(() => [refVal2.value ? (zz280(), zz286("div", S1, [zz294("div", {
            class: "drawer-user-section",
            onClick: zz852
          }, [zz87(useUserStore1).isLoggedIn ? (zz280(), zz286("div", R1, [zz294("span", T1, toDisplayString(zz87(useUserStore1).user?.nickname), 1), zz87(useUserStore1).user?.signature ? (zz280(), zz286("span", local_k1, toDisplayString(zz87(useUserStore1).user.signature), 1)) : (zz280(), zz286("span", O1, "点击查看个人中心"))])) : (zz280(), zz286("div", P1, [val9[53] || (val9[53] = zz294("span", {
            class: "drawer-user-name"
          }, "游客", -1)), zz294("button", {
            class: "drawer-login-btn",
            onClick: withModifiers(zz848, ["stop"])
          }, "点击登录")]))]), zz294("div", I1, [zz294("div", M1, [zz294("button", {
            class: "drawer-section-header",
            onClick: val9[0] || (val9[0] = val11 => zz845("nav"))
          }, [val9[55] || (val9[55] = zz294("span", {
            class: "drawer-section-title"
          }, "导航", -1)), (zz280(), zz286("svg", {
            class: zz11(["drawer-section-arrow", {
              collapsed: !refVal7.value.nav
            }]),
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [...(val9[54] || (val9[54] = [zz294("polyline", {
            points: "6 9 12 15 18 9"
          }, null, -1)]))], 2))]), createVNode(withSlots, {
            name: "collapse"
          }, {
            default: zz120(() => [zz122(zz294("nav", L1, [zz294("a", {
              class: "drawer-nav-item active",
              onClick: val9[1] || (val9[1] = val11 => zz853("/"))
            }, [...(val9[56] || (val9[56] = [zz294("div", {
              class: "drawer-nav-icon"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            }), zz294("polyline", {
              points: "9 22 9 12 15 12 15 22"
            })])], -1), zz294("span", null, "首页", -1)]))]), zz294("a", {
              class: "drawer-nav-item",
              onClick: val9[2] || (val9[2] = val11 => zz853("/ticket"))
            }, [...(val9[57] || (val9[57] = [zz294("div", {
              class: "drawer-nav-icon"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("rect", {
              x: "3",
              y: "4",
              width: "18",
              height: "18",
              rx: "2",
              ry: "2"
            }), zz294("line", {
              x1: "16",
              y1: "2",
              x2: "16",
              y2: "6"
            }), zz294("line", {
              x1: "8",
              y1: "2",
              x2: "8",
              y2: "6"
            }), zz294("line", {
              x1: "3",
              y1: "10",
              x2: "21",
              y2: "10"
            })])], -1), zz294("span", null, "活动抢票", -1)]))]), zz294("a", {
              class: "drawer-nav-item",
              onClick: val9[3] || (val9[3] = val11 => zz853("/ringtone"))
            }, [...(val9[58] || (val9[58] = [zz294("div", {
              class: "drawer-nav-icon"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            }), zz294("path", {
              d: "M13.73 21a2 2 0 0 1-3.46 0"
            })])], -1), zz294("span", null, "宿舍铃声", -1)]))]), zz294("a", {
              class: "drawer-nav-item",
              onClick: val9[4] || (val9[4] = val11 => zz853("/grade"))
            }, [...(val9[59] || (val9[59] = [zz294("div", {
              class: "drawer-nav-icon"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            }), zz294("polyline", {
              points: "14 2 14 8 20 8"
            }), zz294("line", {
              x1: "16",
              y1: "13",
              x2: "8",
              y2: "13"
            }), zz294("line", {
              x1: "16",
              y1: "17",
              x2: "8",
              y2: "17"
            }), zz294("polyline", {
              points: "10 9 9 9 8 9"
            })])], -1), zz294("span", null, "分数查询", -1)]))]), zz294("a", {
              class: "drawer-nav-item",
              onClick: val9[5] || (val9[5] = val11 => zz853("/community"))
            }, [...(val9[60] || (val9[60] = [zz294("div", {
              class: "drawer-nav-icon"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("polygon", {
              points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            })])], -1), zz294("span", null, "评分社区", -1)]))])], 512), [[modalShowDef, refVal7.value.nav]])]),
            _: 1
          })]), zz87(useUserStore1).canManageTickets || zz87(useUserStore1).canManageCampaigns || zz87(useUserStore1).canManageRating || zz87(useUserStore1).canManageMessages || zz87(useUserStore1).canManageUsers || zz87(useUserStore1).canManageBanners || zz87(useUserStore1).canManageMuseum ? (zz280(), zz286("div", N1, [zz294("button", {
            class: "drawer-section-header",
            onClick: val9[6] || (val9[6] = val11 => zz845("admin"))
          }, [val9[62] || (val9[62] = zz294("span", {
            class: "drawer-section-title"
          }, "管理", -1)), (zz280(), zz286("svg", {
            class: zz11(["drawer-section-arrow", {
              collapsed: !refVal7.value.admin
            }]),
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [...(val9[61] || (val9[61] = [zz294("polyline", {
            points: "6 9 12 15 18 9"
          }, null, -1)]))], 2))]), createVNode(withSlots, {
            name: "collapse"
          }, {
            default: zz120(() => [zz122(zz294("nav", D1, [zz87(useUserStore1).canManageTickets ? (zz280(), zz286("a", {
              key: 0,
              class: "drawer-nav-item",
              onClick: val9[7] || (val9[7] = val11 => zz853("/admin/tickets"))
            }, [...(val9[63] || (val9[63] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            })])], -1), zz294("span", null, "票务管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz286("a", {
              key: 1,
              class: "drawer-nav-item",
              onClick: val9[8] || (val9[8] = val11 => zz853("/admin/dorm"))
            }, [...(val9[64] || (val9[64] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M12 3l9 4H3l9-4z"
            })])], -1), zz294("span", null, "宿舍管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz286("a", {
              key: 2,
              class: "drawer-nav-item",
              onClick: val9[9] || (val9[9] = val11 => zz853("/admin/campaigns"))
            }, [...(val9[65] || (val9[65] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M9 18V5l12-2v13"
            }), zz294("circle", {
              cx: "6",
              cy: "18",
              r: "3"
            }), zz294("circle", {
              cx: "18",
              cy: "16",
              r: "3"
            })])], -1), zz294("span", null, "活动管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz286("a", {
              key: 3,
              class: "drawer-nav-item",
              onClick: val9[10] || (val9[10] = val11 => zz853("/admin/music-download"))
            }, [...(val9[66] || (val9[66] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
            }), zz294("polyline", {
              points: "7 10 12 15 17 10"
            }), zz294("line", {
              x1: "12",
              y1: "15",
              x2: "12",
              y2: "3"
            })])], -1), zz294("span", null, "歌曲下载", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageRating ? (zz280(), zz286("a", {
              key: 4,
              class: "drawer-nav-item",
              onClick: val9[11] || (val9[11] = val11 => zz853("/admin/rating"))
            }, [...(val9[67] || (val9[67] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("polygon", {
              points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            })])], -1), zz294("span", null, "评分社区", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageMessages ? (zz280(), zz286("a", {
              key: 5,
              class: "drawer-nav-item",
              onClick: val9[12] || (val9[12] = val11 => zz853("/admin/messages"))
            }, [...(val9[68] || (val9[68] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            })])], -1), zz294("span", null, "消息管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageCampaigns ? (zz280(), zz286("a", {
              key: 6,
              class: "drawer-nav-item",
              onClick: val9[13] || (val9[13] = val11 => zz853("/admin/qqmusic"))
            }, [...(val9[69] || (val9[69] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M9 18V5l12-2v13"
            }), zz294("circle", {
              cx: "6",
              cy: "18",
              r: "3"
            }), zz294("circle", {
              cx: "18",
              cy: "16",
              r: "3"
            })])], -1), zz294("span", null, "QQ音乐管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageUsers ? (zz280(), zz286("a", {
              key: 7,
              class: "drawer-nav-item",
              onClick: val9[14] || (val9[14] = val11 => zz853("/admin/campus"))
            }, [...(val9[70] || (val9[70] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            }), zz294("circle", {
              cx: "9",
              cy: "7",
              r: "4"
            }), zz294("path", {
              d: "M23 21v-2a4 4 0 0 0-3-3.87"
            }), zz294("path", {
              d: "M16 3.13a4 4 0 0 1 0 7.75"
            })])], -1), zz294("span", null, "校园网管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageBanners ? (zz280(), zz286("a", {
              key: 8,
              class: "drawer-nav-item",
              onClick: val9[15] || (val9[15] = val11 => zz853("/admin/banners"))
            }, [...(val9[71] || (val9[71] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("rect", {
              x: "2",
              y: "3",
              width: "20",
              height: "14",
              rx: "2",
              ry: "2"
            }), zz294("line", {
              x1: "8",
              y1: "21",
              x2: "16",
              y2: "21"
            }), zz294("line", {
              x1: "12",
              y1: "17",
              x2: "12",
              y2: "21"
            })])], -1), zz294("span", null, "轮播图管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageMuseum ? (zz280(), zz286("a", {
              key: 9,
              class: "drawer-nav-item",
              onClick: val9[16] || (val9[16] = val11 => zz853("/admin/museum"))
            }, [...(val9[72] || (val9[72] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("circle", {
              cx: "12",
              cy: "12",
              r: "10"
            }), zz294("polyline", {
              points: "12 6 12 12 16 14"
            })])], -1), zz294("span", null, "时间线管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageDebate ? (zz280(), zz286("a", {
              key: 10,
              class: "drawer-nav-item",
              onClick: val9[17] || (val9[17] = val11 => zz853("/admin/debate"))
            }, [...(val9[73] || (val9[73] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            })])], -1), zz294("span", null, "辩论赛管理", -1)]))])) : zz316("", !0), zz87(useUserStore1).canManageTally ? (zz280(), zz286("a", {
              key: 11,
              class: "drawer-nav-item",
              onClick: val9[18] || (val9[18] = val11 => zz853("/admin/tally"))
            }, [...(val9[74] || (val9[74] = [zz294("div", {
              class: "drawer-nav-icon admin"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M3 3v18h18"
            }), zz294("path", {
              d: "M7 14v4"
            }), zz294("path", {
              d: "M12 10v8"
            }), zz294("path", {
              d: "M17 6v12"
            })])], -1), zz294("span", null, "实时唱票", -1)]))])) : zz316("", !0)], 512), [[modalShowDef, refVal7.value.admin]])]),
            _: 1
          })])) : zz316("", !0), zz87(useUserStore1).isLoggedIn ? (zz280(), zz286("div", B1, [zz294("button", {
            class: "drawer-section-header",
            onClick: val9[19] || (val9[19] = val11 => zz845("account"))
          }, [val9[76] || (val9[76] = zz294("span", {
            class: "drawer-section-title"
          }, "账户", -1)), (zz280(), zz286("svg", {
            class: zz11(["drawer-section-arrow", {
              collapsed: !refVal7.value.account
            }]),
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [...(val9[75] || (val9[75] = [zz294("polyline", {
            points: "6 9 12 15 18 9"
          }, null, -1)]))], 2))]), createVNode(withSlots, {
            name: "collapse"
          }, {
            default: zz120(() => [zz122(zz294("div", $1, [zz294("a", {
              class: "drawer-nav-item",
              onClick: val9[20] || (val9[20] = val11 => zz853("/profile"))
            }, [...(val9[77] || (val9[77] = [zz294("div", {
              class: "drawer-nav-icon"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
            }), zz294("circle", {
              cx: "12",
              cy: "7",
              r: "4"
            })])], -1), zz294("span", null, "个人中心", -1)]))]), zz294("a", {
              class: "drawer-nav-item",
              onClick: val9[21] || (val9[21] = val11 => zz853("/messages"))
            }, [...(val9[78] || (val9[78] = [zz294("div", {
              class: "drawer-nav-icon messages"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            }), zz294("path", {
              d: "M13.73 21a2 2 0 0 1-3.46 0"
            })])], -1), zz294("span", null, "我的消息", -1)]))]), zz294("button", {
              class: "drawer-settings-item",
              onClick: zz849
            }, [...(val9[79] || (val9[79] = [zz294("div", {
              class: "drawer-nav-icon logout"
            }, [zz294("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [zz294("path", {
              d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
            }), zz294("polyline", {
              points: "16 17 21 12 16 7"
            }), zz294("line", {
              x1: "21",
              y1: "12",
              x2: "9",
              y2: "12"
            })])], -1), zz294("span", null, "退出登录", -1)]))])], 512), [[modalShowDef, refVal7.value.account]])]),
            _: 1
          })])) : zz316("", !0)]), val9[80] || (val9[80] = zz294("div", {
            class: "drawer-footer"
          }, [zz294("p", {
            class: "drawer-brand"
          }, "厦门一中学生社区"), zz294("p", {
            class: "drawer-credit"
          }, "designed by 23届玄学狗狗")], -1))])) : zz316("", !0)]),
          _: 1
        }), zz294("main", F1, [zz294("section", V1, [zz294("div", H1, [zz294("div", U1, [(zz280(!0), zz286(Fragment, null, zz182(refVal4.value, (val11, val12) => (zz280(), zz286("div", {
          key: val11.id,
          class: zz11(["banner-slide", {
            active: refVal3.value === val12
          }]),
          onClick: val13 => zz842(val11)
        }, [val11.imageUrl ? (zz280(), zz286("div", {
          key: 0,
          class: "banner-content banner-image",
          style: zz8({
            backgroundImage: `url(${val11.imageUrl})`
          })
        }, [zz294("div", local_j1, [zz294("div", K1, [zz294("h3", W1, toDisplayString(val11.title), 1), val11.description ? (zz280(), zz286("p", G1, toDisplayString(val11.description), 1)) : zz316("", !0)])])], 4)) : (zz280(), zz286("div", local_z1, [zz294("div", Q1, [zz294("h3", J1, toDisplayString(val11.title), 1), val11.description ? (zz280(), zz286("p", Y1, toDisplayString(val11.description), 1)) : zz316("", !0)])]))], 10, local_q1))), 128))]), refVal4.value.length > 1 ? (zz280(), zz286("div", X1, [(zz280(!0), zz286(Fragment, null, zz182(refVal4.value, (val11, val12) => (zz280(), zz286("button", {
          key: val12,
          class: zz11(["banner-dot", {
            active: refVal3.value === val12
          }]),
          onClick: val13 => zz841(val12)
        }, null, 10, Z1))), 128))])) : zz316("", !0)])]), zz294("section", ey, [zz294("div", ty, [createVNode(val10, {
          to: "/ticket",
          class: "entry-card entry-card-ticket"
        }, {
          default: zz120(() => [...(val9[81] || (val9[81] = [zz294("div", {
            class: "entry-icon"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [zz294("rect", {
            x: "3",
            y: "4",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
          }), zz294("line", {
            x1: "16",
            y1: "2",
            x2: "16",
            y2: "6"
          }), zz294("line", {
            x1: "8",
            y1: "2",
            x2: "8",
            y2: "6"
          }), zz294("line", {
            x1: "3",
            y1: "10",
            x2: "21",
            y2: "10"
          })])], -1), zz294("div", {
            class: "entry-content"
          }, [zz294("h3", {
            class: "entry-title"
          }, "活动票务"), zz294("p", {
            class: "entry-desc"
          }, "在线抢票，不再错过精彩活动")], -1), zz294("div", {
            class: "entry-arrow"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("polyline", {
            points: "9 18 15 12 9 6"
          })])], -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/community",
          id: "tour-community-entry",
          class: "entry-card entry-card-community"
        }, {
          default: zz120(() => [...(val9[82] || (val9[82] = [zz294("div", {
            class: "entry-icon"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [zz294("polygon", {
            points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          })])], -1), zz294("div", {
            class: "entry-content"
          }, [zz294("h3", {
            class: "entry-title"
          }, "评分社区"), zz294("p", {
            class: "entry-desc"
          }, "在这里给食堂、考试、甚至教学楼打分……")], -1), zz294("div", {
            class: "entry-arrow"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("polyline", {
            points: "9 18 15 12 9 6"
          })])], -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/ringtone",
          class: "entry-card entry-card-ringtone"
        }, {
          default: zz120(() => [...(val9[83] || (val9[83] = [zz294("div", {
            class: "entry-icon"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [zz294("path", {
            d: "M9 18V5l12-2v13"
          }), zz294("circle", {
            cx: "6",
            cy: "18",
            r: "3"
          }), zz294("circle", {
            cx: "18",
            cy: "16",
            r: "3"
          })])], -1), zz294("div", {
            class: "entry-content"
          }, [zz294("h3", {
            class: "entry-title"
          }, "宿舍铃声"), zz294("p", {
            class: "entry-desc"
          }, "给宿舍铃声投稿和投票！")], -1), zz294("div", {
            class: "entry-arrow"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("polyline", {
            points: "9 18 15 12 9 6"
          })])], -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/voices",
          class: "entry-card entry-card-voices"
        }, {
          default: zz120(() => [...(val9[84] || (val9[84] = [zz294("div", {
            class: "entry-icon"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [zz294("path", {
            d: "M4 20 l1.2 -4.2 L16.6 4.4 a2 2 0 0 1 2.8 0 l0.2 0.2 a2 2 0 0 1 0 2.8 L8.2 18.8 Z"
          }), zz294("path", {
            d: "M14.5 6.5 l3 3"
          })])], -1), zz294("div", {
            class: "entry-content"
          }, [zz294("h3", {
            class: "entry-title"
          }, "跨代留声"), zz294("p", {
            class: "entry-desc"
          }, "匿名出卷、答卷，和另一代人聊聊")], -1), zz294("div", {
            class: "entry-arrow"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [zz294("polyline", {
            points: "9 18 15 12 9 6"
          })])], -1)]))]),
          _: 1
        }), zz294("div", ny, [createVNode(val10, {
          to: "/grade",
          class: "secondary-card secondary-card-grade"
        }, {
          default: zz120(() => [...(val9[85] || (val9[85] = [zz294("div", {
            class: "secondary-icon"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [zz294("path", {
            d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          }), zz294("polyline", {
            points: "14 2 14 8 20 8"
          }), zz294("line", {
            x1: "16",
            y1: "13",
            x2: "8",
            y2: "13"
          }), zz294("line", {
            x1: "16",
            y1: "17",
            x2: "8",
            y2: "17"
          })])], -1), zz294("span", {
            class: "secondary-label"
          }, "成绩查询", -1)]))]),
          _: 1
        }), createVNode(val10, {
          to: "/wall",
          class: "secondary-card secondary-card-wall"
        }, {
          default: zz120(() => [...(val9[86] || (val9[86] = [zz294("div", {
            class: "secondary-icon"
          }, [zz294("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [zz294("rect", {
            x: "3",
            y: "3",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
          }), zz294("line", {
            x1: "3",
            y1: "9",
            x2: "21",
            y2: "9"
          }), zz294("line", {
            x1: "9",
            y1: "21",
            x2: "9",
            y2: "9"
          })])], -1), zz294("span", {
            class: "secondary-label"
          }, "厦一万能墙", -1)]))]),
          _: 1
        })])])])]), val9[87] || (val9[87] = zz315('<footer class="footer" data-v-bcb35f36><div class="footer-container" data-v-bcb35f36><div class="footer-links" data-v-bcb35f36><a href="#" data-v-bcb35f36>关于我们</a><a href="#" data-v-bcb35f36>使用条款</a><a href="#" data-v-bcb35f36>隐私政策</a><a href="#" data-v-bcb35f36>帮助中心</a></div><p class="copyright" data-v-bcb35f36>© 2026 厦门一中学生社区 · designed by 23届玄学狗狗</p><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="icp-link" data-v-bcb35f36>闽ICP备2024074144号-4</a></div></footer>', 1))])]), createVNode(withSlots, {
          name: "modal-fade"
        }, {
          default: zz120(() => [refVal6.value ? (zz280(), zz286("div", {
            key: 0,
            class: "modal-overlay",
            onClick: zz851
          }, [createVNode(withSlots, {
            name: "modal-scale"
          }, {
            default: zz120(() => [refVal6.value ? (zz280(), zz286("div", {
              key: 0,
              class: "modal-content",
              onClick: val9[22] || (val9[22] = withModifiers(() => {}, ["stop"]))
            }, [val9[88] || (val9[88] = zz294("h3", {
              class: "modal-title"
            }, "确认退出", -1)), val9[89] || (val9[89] = zz294("p", {
              class: "modal-message"
            }, "确定要退出登录吗？", -1)), zz294("div", {
              class: "modal-actions"
            }, [zz294("button", {
              class: "modal-btn cancel",
              onClick: zz851
            }, "取消"), zz294("button", {
              class: "modal-btn confirm",
              onClick: zz850
            }, "确定")])])) : zz316("", !0)]),
            _: 1
          })])) : zz316("", !0)]),
          _: 1
        })]);
      };
    }
  }),
  ry = withScopeId(sy, [["__scopeId", "data-v-bcb35f36"]]);
function zz855(val) {
  val.beforeEach((val1, val2) => {
    const useUserStore1 = useUserStore();
    return val1.meta.requiresAuth && !useUserStore1.isLoggedIn ? (useUserStore1.setRedirectRoute(val1.fullPath), useUserStore1.openLoginModal(), !1) : !0;
  });
}
const ri = zz553({
  history: zz500(),
  scrollBehavior(val, val2, val3) {
    return val3 || {
      top: 0
    };
  },
  routes: [{
    path: "/",
    name: "home",
    /* 移植改动：整站镜像裁剪为唱票单业务后，首页不再保留聚合入口，直接重定向到活动管理页 */
    redirect: "/admin/tally",
    meta: {
      level: 1,
      title: "首页"
    }
  }, {
    /* 公开大屏：无需登录，浏览器直接打开 /tally/screen/:id 即可投屏 */
    path: "/tally/screen/:id",
    name: "tally-screen",
    component: () => local_zbd0(() => import("./ScreenPage-D-8ErF3w.js"), __vite__mapDeps([0, 1, 2, 3])),
    meta: {
      level: 1,
      title: "实时唱票"
    }
  }, {
    /* 活动管理页：列表 / 新建 / 改状态 / 删除 / 复制大屏链接 */
    path: "/admin/tally",
    name: "admin-tally",
    component: () => local_zbd0(() => import("./TallyActivitiesPage-Ck1JhJya.js"), __vite__mapDeps([4, 5, 6, 7, 8, 9, 14, 15, 2])),
    meta: {
      requiresAuth: !0,
      level: 2,
      title: "实时唱票管理",
      parent: "home"
    }
  }, {
    /* 活动配置页：改名 / 改状态 / 候选人增删改 */
    path: "/admin/tally/activities/:id/edit",
    name: "admin-tally-edit",
    component: () => local_zbd0(() => import("./TallyActivityEditPage-DFD129SB.js"), __vite__mapDeps([10, 11, 6, 7, 8, 9, 14, 15, 2])),
    meta: {
      requiresAuth: !0,
      level: 3,
      title: "配置活动",
      parent: "admin-tally"
    }
  }, {
    /* 唱票控制台：录票 / 撤销 / 操作日志 / 大屏入口 */
    path: "/admin/tally/activities/:id/control",
    name: "admin-tally-control",
    component: () => local_zbd0(() => import("./TallyControlPage-CBBTMqC8.js"), __vite__mapDeps([12, 13, 6, 7, 2, 1])),
    meta: {
      requiresAuth: !0,
      level: 3,
      title: "唱票控制台",
      parent: "admin-tally"
    }
  }, {
    /* 兜底：其余镜像路由一律回落活动管理页，避免访问到已被裁剪掉的 chunk（404） */
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/admin/tally",
    meta: {
      level: 1,
      title: "页面未找到"
    }
  }]
});
zz855(ri);
function zz856(val) {
  const list = [];
  let val2 = val;
  for (; val2;) {
    const val1 = ri.getRoutes().find(val3 => val3.name === val2);
    if (val1 && val1.meta?.title) list.unshift({
      title: val1.meta.title,
      path: val1.path
    }), val2 = val1.meta.parent;else break;
  }
  return list;
}
const oi = Hf(xv),
  iy = zz416();
oi.use(iy);
oi.use(ri);
oi.mount("#app");
/* index 运行时导出（已语义化） */
export { zz184 as withScope, directiveHooks, zz72 as cloneIfRaw, modalShowDef, http, zz833 as appProvider, Fragment, zz110 as nextTick, zz287 as createBlock, zz176 as resolveAsset, TransitionGroup, Teleport, zz694 as getUserProfile, withKeys, zz691 as getUserAvatar, deepWatchOptions, directiveCreated, zz690 as buildFormData, zz692 as getPrivacySettings, zz693 as updatePrivacySettings, withSlots, zz679 as getCaptcha, zz688 as getUserHasPassword, zz695 as sendSmsCode, zz689 as updateUserPassword, zz686 as bindUserQq, deepDirectiveOptions, withScopeId, createVNode, zz856 as resolveList, zz835 as getAdminBanners, zz837 as updateAdminBanner, zz836 as createAdminBanner, zz838 as deleteAdminBanner, zz839 as toggleAdminBannerStatus, directiveBum, axiosLib, zz294 as createElementVNode, zz286 as createElementBlock, zz160 as defineComponent, zz87 as unref, zz182 as renderList, zz312 as createTextVNode, zz315 as createVNodeWrapper, zz735 as useToast, zz585 as useRouter, zz316 as createCommentVNode, zz280 as openBlock, applyDirectives, zz11 as normalizeClass, onMounted, zz8 as resolveRaw, zz586 as inject, zz83 as ref, directiveUm, toDisplayString, useUserStore, zz120 as toDisplayValue, zz128 as watch, withModifiers, zz122 as withDirectives, vModelText };