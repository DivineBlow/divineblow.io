// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/noise.min.js":[function(require,module,exports) {
var define;
!function () {
  "use strict";

  var r = .5 * (Math.sqrt(3) - 1),
      e = (3 - Math.sqrt(3)) / 6,
      t = 1 / 6,
      a = (Math.sqrt(5) - 1) / 4,
      o = (5 - Math.sqrt(5)) / 20;

  function i(r) {
    var e;
    e = "function" == typeof r ? r : r ? function () {
      var r = 0,
          e = 0,
          t = 0,
          a = 1,
          o = (i = 4022871197, function (r) {
        r = r.toString();

        for (var e = 0; e < r.length; e++) {
          var t = .02519603282416938 * (i += r.charCodeAt(e));
          t -= i = t >>> 0, i = (t *= i) >>> 0, i += 4294967296 * (t -= i);
        }

        return 2.3283064365386963e-10 * (i >>> 0);
      });
      var i;
      r = o(" "), e = o(" "), t = o(" ");

      for (var n = 0; n < arguments.length; n++) {
        (r -= o(arguments[n])) < 0 && (r += 1), (e -= o(arguments[n])) < 0 && (e += 1), (t -= o(arguments[n])) < 0 && (t += 1);
      }

      return o = null, function () {
        var o = 2091639 * r + 2.3283064365386963e-10 * a;
        return r = e, e = t, t = o - (a = 0 | o);
      };
    }(r) : Math.random, this.p = n(e), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512);

    for (var t = 0; t < 512; t++) {
      this.perm[t] = this.p[255 & t], this.permMod12[t] = this.perm[t] % 12;
    }
  }

  function n(r) {
    var e,
        t = new Uint8Array(256);

    for (e = 0; e < 256; e++) {
      t[e] = e;
    }

    for (e = 0; e < 255; e++) {
      var a = e + ~~(r() * (256 - e)),
          o = t[e];
      t[e] = t[a], t[a] = o;
    }

    return t;
  }

  i.prototype = {
    grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
    noise2D: function noise2D(t, a) {
      var o,
          i,
          n = this.permMod12,
          f = this.perm,
          s = this.grad3,
          v = 0,
          h = 0,
          l = 0,
          u = (t + a) * r,
          d = Math.floor(t + u),
          p = Math.floor(a + u),
          M = (d + p) * e,
          m = t - (d - M),
          c = a - (p - M);
      m > c ? (o = 1, i = 0) : (o = 0, i = 1);
      var y = m - o + e,
          w = c - i + e,
          g = m - 1 + 2 * e,
          A = c - 1 + 2 * e,
          x = 255 & d,
          q = 255 & p,
          D = .5 - m * m - c * c;

      if (D >= 0) {
        var S = 3 * n[x + f[q]];
        v = (D *= D) * D * (s[S] * m + s[S + 1] * c);
      }

      var U = .5 - y * y - w * w;

      if (U >= 0) {
        var b = 3 * n[x + o + f[q + i]];
        h = (U *= U) * U * (s[b] * y + s[b + 1] * w);
      }

      var F = .5 - g * g - A * A;

      if (F >= 0) {
        var N = 3 * n[x + 1 + f[q + 1]];
        l = (F *= F) * F * (s[N] * g + s[N + 1] * A);
      }

      return 70 * (v + h + l);
    },
    noise3D: function noise3D(r, e, a) {
      var o,
          i,
          n,
          f,
          s,
          v,
          h,
          l,
          u,
          d,
          p = this.permMod12,
          M = this.perm,
          m = this.grad3,
          c = (r + e + a) * (1 / 3),
          y = Math.floor(r + c),
          w = Math.floor(e + c),
          g = Math.floor(a + c),
          A = (y + w + g) * t,
          x = r - (y - A),
          q = e - (w - A),
          D = a - (g - A);
      x >= q ? q >= D ? (s = 1, v = 0, h = 0, l = 1, u = 1, d = 0) : x >= D ? (s = 1, v = 0, h = 0, l = 1, u = 0, d = 1) : (s = 0, v = 0, h = 1, l = 1, u = 0, d = 1) : q < D ? (s = 0, v = 0, h = 1, l = 0, u = 1, d = 1) : x < D ? (s = 0, v = 1, h = 0, l = 0, u = 1, d = 1) : (s = 0, v = 1, h = 0, l = 1, u = 1, d = 0);

      var S = x - s + t,
          U = q - v + t,
          b = D - h + t,
          F = x - l + 2 * t,
          N = q - u + 2 * t,
          C = D - d + 2 * t,
          P = x - 1 + .5,
          T = q - 1 + .5,
          _ = D - 1 + .5,
          j = 255 & y,
          k = 255 & w,
          z = 255 & g,
          B = .6 - x * x - q * q - D * D;

      if (B < 0) o = 0;else {
        var E = 3 * p[j + M[k + M[z]]];
        o = (B *= B) * B * (m[E] * x + m[E + 1] * q + m[E + 2] * D);
      }
      var G = .6 - S * S - U * U - b * b;
      if (G < 0) i = 0;else {
        var H = 3 * p[j + s + M[k + v + M[z + h]]];
        i = (G *= G) * G * (m[H] * S + m[H + 1] * U + m[H + 2] * b);
      }
      var I = .6 - F * F - N * N - C * C;
      if (I < 0) n = 0;else {
        var J = 3 * p[j + l + M[k + u + M[z + d]]];
        n = (I *= I) * I * (m[J] * F + m[J + 1] * N + m[J + 2] * C);
      }
      var K = .6 - P * P - T * T - _ * _;
      if (K < 0) f = 0;else {
        var L = 3 * p[j + 1 + M[k + 1 + M[z + 1]]];
        f = (K *= K) * K * (m[L] * P + m[L + 1] * T + m[L + 2] * _);
      }
      return 32 * (o + i + n + f);
    },
    noise4D: function noise4D(r, e, t, i) {
      var n,
          f,
          s,
          v,
          h,
          l,
          u,
          d,
          p,
          M,
          m,
          c,
          y,
          w,
          g,
          A,
          x,
          q = this.perm,
          D = this.grad4,
          S = (r + e + t + i) * a,
          U = Math.floor(r + S),
          b = Math.floor(e + S),
          F = Math.floor(t + S),
          N = Math.floor(i + S),
          C = (U + b + F + N) * o,
          P = r - (U - C),
          T = e - (b - C),
          _ = t - (F - C),
          j = i - (N - C),
          k = 0,
          z = 0,
          B = 0,
          E = 0;

      P > T ? k++ : z++, P > _ ? k++ : B++, P > j ? k++ : E++, T > _ ? z++ : B++, T > j ? z++ : E++, _ > j ? B++ : E++;
      var G = P - (l = k >= 3 ? 1 : 0) + o,
          H = T - (u = z >= 3 ? 1 : 0) + o,
          I = _ - (d = B >= 3 ? 1 : 0) + o,
          J = j - (p = E >= 3 ? 1 : 0) + o,
          K = P - (M = k >= 2 ? 1 : 0) + 2 * o,
          L = T - (m = z >= 2 ? 1 : 0) + 2 * o,
          O = _ - (c = B >= 2 ? 1 : 0) + 2 * o,
          Q = j - (y = E >= 2 ? 1 : 0) + 2 * o,
          R = P - (w = k >= 1 ? 1 : 0) + 3 * o,
          V = T - (g = z >= 1 ? 1 : 0) + 3 * o,
          W = _ - (A = B >= 1 ? 1 : 0) + 3 * o,
          X = j - (x = E >= 1 ? 1 : 0) + 3 * o,
          Y = P - 1 + 4 * o,
          Z = T - 1 + 4 * o,
          $ = _ - 1 + 4 * o,
          rr = j - 1 + 4 * o,
          er = 255 & U,
          tr = 255 & b,
          ar = 255 & F,
          or = 255 & N,
          ir = .6 - P * P - T * T - _ * _ - j * j;
      if (ir < 0) n = 0;else {
        var nr = q[er + q[tr + q[ar + q[or]]]] % 32 * 4;
        n = (ir *= ir) * ir * (D[nr] * P + D[nr + 1] * T + D[nr + 2] * _ + D[nr + 3] * j);
      }
      var fr = .6 - G * G - H * H - I * I - J * J;
      if (fr < 0) f = 0;else {
        var sr = q[er + l + q[tr + u + q[ar + d + q[or + p]]]] % 32 * 4;
        f = (fr *= fr) * fr * (D[sr] * G + D[sr + 1] * H + D[sr + 2] * I + D[sr + 3] * J);
      }
      var vr = .6 - K * K - L * L - O * O - Q * Q;
      if (vr < 0) s = 0;else {
        var hr = q[er + M + q[tr + m + q[ar + c + q[or + y]]]] % 32 * 4;
        s = (vr *= vr) * vr * (D[hr] * K + D[hr + 1] * L + D[hr + 2] * O + D[hr + 3] * Q);
      }
      var lr = .6 - R * R - V * V - W * W - X * X;
      if (lr < 0) v = 0;else {
        var ur = q[er + w + q[tr + g + q[ar + A + q[or + x]]]] % 32 * 4;
        v = (lr *= lr) * lr * (D[ur] * R + D[ur + 1] * V + D[ur + 2] * W + D[ur + 3] * X);
      }
      var dr = .6 - Y * Y - Z * Z - $ * $ - rr * rr;
      if (dr < 0) h = 0;else {
        var pr = q[er + 1 + q[tr + 1 + q[ar + 1 + q[or + 1]]]] % 32 * 4;
        h = (dr *= dr) * dr * (D[pr] * Y + D[pr + 1] * Z + D[pr + 2] * $ + D[pr + 3] * rr);
      }
      return 27 * (n + f + s + v + h);
    }
  }, i._buildPermutationTable = n, "undefined" != typeof define && define.amd && define(function () {
    return i;
  }), "undefined" != typeof exports ? exports.SimplexNoise = i : "undefined" != typeof window && (window.SimplexNoise = i), "undefined" != typeof module && (module.exports = i);
}();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50165" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/noise.min.js"], null)
//# sourceMappingURL=/noise.min.52f5b1a0.js.map