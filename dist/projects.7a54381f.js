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
})({"node_modules/ev-emitter/ev-emitter.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

},{}],"node_modules/imagesloaded/imagesloaded.js":[function(require,module,exports) {
var define;
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

},{"ev-emitter":"node_modules/ev-emitter/ev-emitter.js"}],"js/projects.js":[function(require,module,exports) {
"use strict";

var _imagesloaded = _interopRequireDefault(require("imagesloaded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

{
  var lineEq = function lineEq(y2, y1, x2, x1, currentVal) {
    // y = mx + b 
    var m = (y2 - y1) / (x2 - x1),
        b = y1 - m * x1;
    return m * currentVal + b;
  };

  var getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomFloat = function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  var setRange = function setRange(obj) {
    for (var k in obj) {
      if (obj[k] == undefined) {
        obj[k] = [0, 0];
      } else if (typeof obj[k] === 'number') {
        obj[k] = [-1 * obj[k], obj[k]];
      }
    }
  }; // from http://www.quirksmode.org/js/events_properties.html#position


  var getMousePos = function getMousePos(e) {
    var posx = 0;
    var posy = 0;
    if (!e) e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    };
  };

  var Item = /*#__PURE__*/function () {
    function Item(el, options) {
      _classCallCheck(this, Item);

      this.DOM = {
        el: el
      };
      this.options = {
        image: {
          translation: {
            x: -10,
            y: -10,
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0
          }
        },
        title: {
          translation: {
            x: 20,
            y: 10,
            z: 0
          }
        },
        text: {
          translation: {
            x: 20,
            y: 50,
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: -20
          }
        },
        deco: {
          translation: {
            x: -20,
            y: 0,
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: 3
          }
        },
        shadow: {
          translation: {
            x: 30,
            y: 20,
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: -2
          },
          reverseAnimation: {
            duration: 2,
            ease: 'Back.easeOut'
          }
        },
        content: {
          translation: {
            x: 5,
            y: 3,
            z: 0
          }
        }
      };
      Object.assign(this.options, options);
      this.DOM.animatable = {};
      this.DOM.animatable.image = this.DOM.el.querySelector('.box__img');
      this.DOM.animatable.title = this.DOM.el.querySelector('.box__title');
      this.DOM.animatable.text = this.DOM.el.querySelector('.box__text');
      this.DOM.animatable.deco = this.DOM.el.querySelector('.box__deco');
      this.DOM.animatable.shadow = this.DOM.el.querySelector('.box__shadow');
      this.DOM.animatable.content = this.DOM.el.querySelector('.box__content');
      this.initEvents();
    }

    _createClass(Item, [{
      key: "initEvents",
      value: function initEvents() {
        var _this = this;

        var enter = false;

        this.mouseenterFn = function () {
          if (enter) {
            enter = false;
          }

          ;
          clearTimeout(_this.mousetime);
          _this.mousetime = setTimeout(function () {
            return enter = true;
          }, 40);
        };

        this.mousemoveFn = function (ev) {
          return requestAnimationFrame(function () {
            if (!enter) return;

            _this.tilt(ev);
          });
        };

        this.mouseleaveFn = function (ev) {
          return requestAnimationFrame(function () {
            if (!enter || !allowTilt) return;
            enter = false;
            clearTimeout(_this.mousetime);

            for (var key in _this.DOM.animatable) {
              if (_this.DOM.animatable[key] == undefined || _this.options[key] == undefined) {
                continue;
              }

              TweenMax.to(_this.DOM.animatable[key], _this.options[key].reverseAnimation != undefined ? _this.options[key].reverseAnimation.duration || 0 : 1.5, {
                ease: _this.options[key].reverseAnimation != undefined ? _this.options[key].reverseAnimation.ease || 'Power2.easeOut' : 'Power2.easeOut',
                x: 0,
                y: 0,
                z: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0
              });
            }
          });
        };

        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
      }
    }, {
      key: "tilt",
      value: function tilt(ev) {
        if (!allowTilt) return;
        var mousepos = getMousePos(ev); // Document scrolls.

        var docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop
        };
        var bounds = this.DOM.el.getBoundingClientRect(); // Mouse position relative to the main element (this.DOM.el).

        var relmousepos = {
          x: mousepos.x - bounds.left - docScrolls.left,
          y: mousepos.y - bounds.top - docScrolls.top
        }; // Movement settings for the animatable elements.

        for (var key in this.DOM.animatable) {
          if (this.DOM.animatable[key] == undefined || this.options[key] == undefined) {
            continue;
          }

          var t = this.options[key] != undefined ? this.options[key].translation || {
            x: 0,
            y: 0,
            z: 0
          } : {
            x: 0,
            y: 0,
            z: 0
          },
              r = this.options[key] != undefined ? this.options[key].rotation || {
            x: 0,
            y: 0,
            z: 0
          } : {
            x: 0,
            y: 0,
            z: 0
          };
          setRange(t);
          setRange(r);
          var transforms = {
            translation: {
              x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
              y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0],
              z: (t.z[1] - t.z[0]) / bounds.height * relmousepos.y + t.z[0]
            },
            rotation: {
              x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
              y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0],
              z: (r.z[1] - r.z[0]) / bounds.width * relmousepos.x + r.z[0]
            }
          };
          TweenMax.to(this.DOM.animatable[key], 1.5, {
            ease: 'Power1.easeOut',
            x: transforms.translation.x,
            y: transforms.translation.y,
            z: transforms.translation.z,
            rotationX: transforms.rotation.x,
            rotationY: transforms.rotation.y,
            rotationZ: transforms.rotation.z
          });
        }
      }
    }]);

    return Item;
  }();

  var Overlay = /*#__PURE__*/function () {
    function Overlay() {
      _classCallCheck(this, Overlay);

      this.DOM = {
        el: document.querySelector('.overlay')
      };
      this.DOM.reveal = this.DOM.el.querySelector('.overlay__reveal');
      this.DOM.items = this.DOM.el.querySelectorAll('.overlay__item');
      this.DOM.close = this.DOM.el.querySelector('.overlay__close');
    }

    _createClass(Overlay, [{
      key: "show",
      value: function show(contentItem) {
        var _this2 = this;

        this.contentItem = contentItem;
        this.DOM.el.classList.add('overlay--open'); // show revealer

        TweenMax.to(this.DOM.reveal, .5, {
          ease: 'Power1.easeInOut',
          x: '0%',
          onComplete: function onComplete() {
            // hide scroll
            document.body.classList.add('preview-open'); // show preview

            _this2.revealItem(contentItem); // hide revealer


            TweenMax.to(_this2.DOM.reveal, .5, {
              delay: 0.2,
              ease: 'Power3.easeOut',
              x: '-100%'
            });
            _this2.DOM.close.style.opacity = 1;
          }
        });
      }
    }, {
      key: "revealItem",
      value: function revealItem() {
        this.contentItem.style.opacity = 1;
        var itemElems = [];
        itemElems.push(this.contentItem.querySelector('.box__shadow'));
        itemElems.push(this.contentItem.querySelector('.box__img'));
        itemElems.push(this.contentItem.querySelector('.box__title'));
        itemElems.push(this.contentItem.querySelector('.box__text'));
        itemElems.push(this.contentItem.querySelector('.box__deco'));

        for (var _i = 0, _itemElems = itemElems; _i < _itemElems.length; _i++) {
          var el = _itemElems[_i];
          if (el == null) continue;
          var bounds = el.getBoundingClientRect();
          var win = {
            width: window.innerWidth,
            height: window.innerHeight
          };
          TweenMax.to(el, lineEq(0.8, 1.2, win.width, 0, Math.abs(bounds.left + bounds.width - win.width)), {
            ease: 'Expo.easeOut',
            delay: 0.2,
            startAt: {
              x: "".concat(lineEq(0, 800, win.width, 0, Math.abs(bounds.left + bounds.width - win.width))),
              y: "".concat(lineEq(-100, 100, win.height, 0, Math.abs(bounds.top + bounds.height - win.height))),
              rotationZ: "".concat(lineEq(5, 30, 0, win.width, Math.abs(bounds.left + bounds.width - win.width)))
            },
            x: 0,
            y: 0,
            rotationZ: 0
          });
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this3 = this;

        this.DOM.el.classList.remove('overlay--open'); // show revealer

        TweenMax.to(this.DOM.reveal, .5, {
          //delay: 0.15,
          ease: 'Power3.easeOut',
          x: '0%',
          onComplete: function onComplete() {
            _this3.DOM.close.style.opacity = 0; // show scroll

            document.body.classList.remove('preview-open'); // hide preview

            _this3.contentItem.style.opacity = 0; // hide revealer

            TweenMax.to(_this3.DOM.reveal, .5, {
              delay: 0,
              ease: 'Power3.easeOut',
              x: '100%'
            });
          }
        });
      }
    }]);

    return Overlay;
  }();

  var Grid = /*#__PURE__*/function () {
    function Grid(el) {
      var _this4 = this;

      _classCallCheck(this, Grid);

      this.DOM = {
        el: el
      };
      this.items = [];
      Array.from(this.DOM.el.querySelectorAll('a.grid__item')).forEach(function (item) {
        var itemObj = new Item(item);

        _this4.items.push(itemObj);

        if (!item.classList.contains('grid__item--noclick')) {
          itemObj.DOM.el.addEventListener('click', function (ev) {
            ev.preventDefault();

            _this4.openItem(document.querySelector(item.getAttribute('href')));
          });
        }
      });
      this.overlay = new Overlay();
      this.overlay.DOM.close.addEventListener('click', function () {
        return _this4.closeItem();
      });
    }

    _createClass(Grid, [{
      key: "openItem",
      value: function openItem(contentItem) {
        if (this.isPreviewOpen) return;
        this.isPreviewOpen = true;
        allowTilt = false;
        this.overlay.show(contentItem); // "explode" grid..

        var _iterator = _createForOfIteratorHelper(this.items),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            for (var key in item.DOM.animatable) {
              var el = item.DOM.animatable[key];

              if (el) {
                var bounds = el.getBoundingClientRect();
                var x = void 0;
                var y = void 0;
                var win = {
                  width: window.innerWidth,
                  height: window.innerHeight
                };

                if (bounds.top + bounds.height / 2 < win.height / 2 - win.height * .1) {
                  //x = getRandomInt(-250,-50);
                  //y = getRandomInt(20,100)*-1;
                  x = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                  y = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                } else if (bounds.top + bounds.height / 2 > win.height / 2 + win.height * .1) {
                  //x = getRandomInt(-250,-50);
                  //y = getRandomInt(20,100);
                  x = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                  y = lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                } else {
                  //x = getRandomInt(300,700)*-1;
                  x = -1 * lineEq(10, 700, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                  y = getRandomInt(-25, 25);
                }

                TweenMax.to(el, 0.4, {
                  ease: 'Power3.easeOut',
                  delay: lineEq(0, 0.3, 0, win.width, Math.abs(bounds.left + bounds.width - win.width)),
                  x: x,
                  y: y,
                  rotationZ: getRandomInt(-10, 10),
                  opacity: 0
                });
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "closeItem",
      value: function closeItem() {
        if (!this.isPreviewOpen) return;
        this.isPreviewOpen = false;
        this.overlay.hide();

        var _iterator2 = _createForOfIteratorHelper(this.items),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;

            for (var key in item.DOM.animatable) {
              var el = item.DOM.animatable[key];

              if (el) {
                var bounds = el.getBoundingClientRect();
                var win = {
                  width: window.innerWidth
                };
                TweenMax.to(el, 0.6, {
                  ease: 'Expo.easeOut',
                  delay: .55 + lineEq(0, 0.2, 0, win.width, Math.abs(bounds.left + bounds.width - win.width)),
                  x: 0,
                  y: 0,
                  rotationZ: 0,
                  opacity: 1
                });
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        allowTilt = true;
      }
    }]);

    return Grid;
  }();

  var allowTilt = true;
  new Grid(document.querySelector('.grid')); // Preload all the images in the page..

  (0, _imagesloaded.default)(document.querySelectorAll('.box__img'), function () {
    return document.body.classList.remove('loading');
  });
}
},{"imagesloaded":"node_modules/imagesloaded/imagesloaded.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53085" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/projects.js"], null)
//# sourceMappingURL=/projects.7a54381f.js.map