parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"qLK9":[function(require,module,exports) {
var define;
var global = arguments[3];
var t,e=arguments[3];!function(e,n){"function"==typeof t&&t.amd?t(n):"object"==typeof module&&module.exports?module.exports=n():e.EvEmitter=n()}("undefined"!=typeof window?window:this,function(){"use strict";function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},i=n[t]=n[t]||[];return-1==i.indexOf(e)&&i.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=n.indexOf(e);return-1!=i&&n.splice(i,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){n=n.slice(0),e=e||[];for(var i=this._onceEvents&&this._onceEvents[t],s=0;s<n.length;s++){var o=n[s];i&&i[o]&&(this.off(t,o),delete i[o]),o.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t});
},{}],"ffUI":[function(require,module,exports) {
var define;
var t;!function(e,i){"use strict";"function"==typeof t&&t.amd?t(["ev-emitter/ev-emitter"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("ev-emitter")):e.imagesLoaded=i(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){"use strict";var i=t.jQuery,o=t.console;function r(t,e){for(var i in e)t[i]=e[i];return t}var s=Array.prototype.slice;function n(t,e,h){if(!(this instanceof n))return new n(t,e,h);var a,m=t;("string"==typeof t&&(m=document.querySelectorAll(t)),m)?(this.elements=(a=m,Array.isArray(a)?a:"object"==typeof a&&"number"==typeof a.length?s.call(a):[a]),this.options=r({},this.options),"function"==typeof e?h=e:r(this.options,e),h&&this.on("always",h),this.getImages(),i&&(this.jqDeferred=new i.Deferred),setTimeout(this.check.bind(this))):o.error("Bad element for imagesLoaded "+(m||t))}n.prototype=Object.create(e.prototype),n.prototype.options={},n.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},n.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&h[e]){for(var i=t.querySelectorAll("img"),o=0;o<i.length;o++){var r=i[o];this.addImage(r)}if("string"==typeof this.options.background){var s=t.querySelectorAll(this.options.background);for(o=0;o<s.length;o++){var n=s[o];this.addElementBackgroundImages(n)}}}};var h={1:!0,9:!0,11:!0};function a(t){this.img=t}function m(t,e){this.url=t,this.element=e,this.img=new Image}return n.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,o=i.exec(e.backgroundImage);null!==o;){var r=o&&o[2];r&&this.addBackground(r,t),o=i.exec(e.backgroundImage)}},n.prototype.addImage=function(t){var e=new a(t);this.images.push(e)},n.prototype.addBackground=function(t,e){var i=new m(t,e);this.images.push(i)},n.prototype.check=function(){var t=this;function e(e,i,o){setTimeout(function(){t.progress(e,i,o)})}this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?this.images.forEach(function(t){t.once("progress",e),t.check()}):this.complete()},n.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&o&&o.log("progress: "+i,t,e)},n.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},a.prototype=Object.create(e.prototype),a.prototype.check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.src)},a.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},a.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},a.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},a.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},m.prototype=Object.create(a.prototype),m.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},m.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},m.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},n.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&((i=e).fn.imagesLoaded=function(t,e){return new n(this,t,e).jqDeferred.promise(i(this))})},n.makeJQueryPlugin(),n});
},{"ev-emitter":"qLK9"}],"k3hP":[function(require,module,exports) {
"use strict";var t=e(require("imagesloaded"));function e(t){return t&&t.__esModule?t:{default:t}}function n(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,l=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){s=!0,r=t},f:function(){try{l||null==n.return||n.return()}finally{if(s)throw r}}}}function i(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function l(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}var s=function(t,e,n,i,o){var a=(t-e)/(n-i);return a*o+(e-a*i)},h=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},u=function(t,e){return(Math.random()*(e-t)+t).toFixed(2)},c=function(t){for(var e in t)null==t[e]?t[e]=[0,0]:"number"==typeof t[e]&&(t[e]=[-1*t[e],t[e]])},d=function(t){var e=0,n=0;return t||(t=window.event),t.pageX||t.pageY?(e=t.pageX,n=t.pageY):(t.clientX||t.clientY)&&(e=t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=t.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:e,y:n}},m=function(){function t(e,n){a(this,t),this.DOM={el:e},this.options={image:{translation:{x:-10,y:-10,z:0},rotation:{x:0,y:0,z:0}},title:{translation:{x:20,y:10,z:0}},text:{translation:{x:20,y:50,z:0},rotation:{x:0,y:0,z:-20}},deco:{translation:{x:-20,y:0,z:0},rotation:{x:0,y:0,z:3}},shadow:{translation:{x:30,y:20,z:0},rotation:{x:0,y:0,z:-2},reverseAnimation:{duration:2,ease:"Back.easeOut"}},content:{translation:{x:5,y:3,z:0}}},Object.assign(this.options,n),this.DOM.animatable={},this.DOM.animatable.image=this.DOM.el.querySelector(".box__img"),this.DOM.animatable.title=this.DOM.el.querySelector(".box__title"),this.DOM.animatable.text=this.DOM.el.querySelector(".box__text"),this.DOM.animatable.deco=this.DOM.el.querySelector(".box__deco"),this.DOM.animatable.shadow=this.DOM.el.querySelector(".box__shadow"),this.DOM.animatable.content=this.DOM.el.querySelector(".box__content"),this.initEvents()}return l(t,[{key:"initEvents",value:function(){var t=this,e=!1;this.mouseenterFn=function(){e&&(e=!1),clearTimeout(t.mousetime),t.mousetime=setTimeout(function(){return e=!0},40)},this.mousemoveFn=function(n){return requestAnimationFrame(function(){e&&t.tilt(n)})},this.mouseleaveFn=function(n){return requestAnimationFrame(function(){if(e&&v)for(var n in e=!1,clearTimeout(t.mousetime),t.DOM.animatable)null!=t.DOM.animatable[n]&&null!=t.options[n]&&TweenMax.to(t.DOM.animatable[n],null!=t.options[n].reverseAnimation?t.options[n].reverseAnimation.duration||0:1.5,{ease:null!=t.options[n].reverseAnimation&&t.options[n].reverseAnimation.ease||"Power2.easeOut",x:0,y:0,z:0,rotationX:0,rotationY:0,rotationZ:0})})},this.DOM.el.addEventListener("mouseenter",this.mouseenterFn),this.DOM.el.addEventListener("mousemove",this.mousemoveFn),this.DOM.el.addEventListener("mouseleave",this.mouseleaveFn)}},{key:"tilt",value:function(t){if(v){var e=d(t),n=document.body.scrollLeft+document.documentElement.scrollLeft,i=document.body.scrollTop+document.documentElement.scrollTop,o=this.DOM.el.getBoundingClientRect(),a=e.x-o.left-n,r=e.y-o.top-i;for(var l in this.DOM.animatable)if(null!=this.DOM.animatable[l]&&null!=this.options[l]){var s=null!=this.options[l]&&this.options[l].translation||{x:0,y:0,z:0},h=null!=this.options[l]&&this.options[l].rotation||{x:0,y:0,z:0};c(s),c(h);var u={translation:{x:(s.x[1]-s.x[0])/o.width*a+s.x[0],y:(s.y[1]-s.y[0])/o.height*r+s.y[0],z:(s.z[1]-s.z[0])/o.height*r+s.z[0]},rotation:{x:(h.x[1]-h.x[0])/o.height*r+h.x[0],y:(h.y[1]-h.y[0])/o.width*a+h.y[0],z:(h.z[1]-h.z[0])/o.width*a+h.z[0]}};TweenMax.to(this.DOM.animatable[l],1.5,{ease:"Power1.easeOut",x:u.translation.x,y:u.translation.y,z:u.translation.z,rotationX:u.rotation.x,rotationY:u.rotation.y,rotationZ:u.rotation.z})}}}}]),t}(),y=function(){function t(){a(this,t),this.DOM={el:document.querySelector(".overlay")},this.DOM.reveal=this.DOM.el.querySelector(".overlay__reveal"),this.DOM.items=this.DOM.el.querySelectorAll(".overlay__item"),this.DOM.close=this.DOM.el.querySelector(".overlay__close")}return l(t,[{key:"show",value:function(t){var e=this;this.contentItem=t,this.DOM.el.classList.add("overlay--open"),TweenMax.to(this.DOM.reveal,.5,{ease:"Power1.easeInOut",x:"0%",onComplete:function(){document.body.classList.add("preview-open"),e.revealItem(t),TweenMax.to(e.DOM.reveal,.5,{delay:.2,ease:"Power3.easeOut",x:"-100%"}),e.DOM.close.style.opacity=1}})}},{key:"revealItem",value:function(){this.contentItem.style.opacity=1;var t=[];t.push(this.contentItem.querySelector(".box__shadow")),t.push(this.contentItem.querySelector(".box__img")),t.push(this.contentItem.querySelector(".box__title")),t.push(this.contentItem.querySelector(".box__text")),t.push(this.contentItem.querySelector(".box__deco"));for(var e=0,n=t;e<n.length;e++){var i=n[e];if(null!=i){var o=i.getBoundingClientRect(),a={width:window.innerWidth,height:window.innerHeight};TweenMax.to(i,s(.8,1.2,a.width,0,Math.abs(o.left+o.width-a.width)),{ease:"Expo.easeOut",delay:.2,startAt:{x:"".concat(s(0,800,a.width,0,Math.abs(o.left+o.width-a.width))),y:"".concat(s(-100,100,a.height,0,Math.abs(o.top+o.height-a.height))),rotationZ:"".concat(s(5,30,0,a.width,Math.abs(o.left+o.width-a.width)))},x:0,y:0,rotationZ:0})}}}},{key:"hide",value:function(){var t=this;this.DOM.el.classList.remove("overlay--open"),TweenMax.to(this.DOM.reveal,.5,{ease:"Power3.easeOut",x:"0%",onComplete:function(){t.DOM.close.style.opacity=0,document.body.classList.remove("preview-open"),t.contentItem.style.opacity=0,TweenMax.to(t.DOM.reveal,.5,{delay:0,ease:"Power3.easeOut",x:"100%"})}})}}]),t}(),f=function(){function t(e){var n=this;a(this,t),this.DOM={el:e},this.items=[],Array.from(this.DOM.el.querySelectorAll("a.grid__item")).forEach(function(t){var e=new m(t);n.items.push(e),t.classList.contains("grid__item--noclick")||e.DOM.el.addEventListener("click",function(e){e.preventDefault(),n.openItem(document.querySelector(t.getAttribute("href")))})}),this.overlay=new y,this.overlay.DOM.close.addEventListener("click",function(){return n.closeItem()})}return l(t,[{key:"openItem",value:function(t){if(!this.isPreviewOpen){this.isPreviewOpen=!0,v=!1,this.overlay.show(t);var e,i=n(this.items);try{for(i.s();!(e=i.n()).done;){var o=e.value;for(var a in o.DOM.animatable){var r=o.DOM.animatable[a];if(r){var l=r.getBoundingClientRect(),u=void 0,c=void 0,d={width:window.innerWidth,height:window.innerHeight};l.top+l.height/2<d.height/2-.1*d.height?(u=-1*s(20,600,0,d.width,Math.abs(l.left+l.width-d.width)),c=-1*s(20,600,0,d.width,Math.abs(l.left+l.width-d.width))):l.top+l.height/2>d.height/2+.1*d.height?(u=-1*s(20,600,0,d.width,Math.abs(l.left+l.width-d.width)),c=s(20,600,0,d.width,Math.abs(l.left+l.width-d.width))):(u=-1*s(10,700,0,d.width,Math.abs(l.left+l.width-d.width)),c=h(-25,25)),TweenMax.to(r,.4,{ease:"Power3.easeOut",delay:s(0,.3,0,d.width,Math.abs(l.left+l.width-d.width)),x:u,y:c,rotationZ:h(-10,10),opacity:0})}}}}catch(m){i.e(m)}finally{i.f()}}}},{key:"closeItem",value:function(){if(this.isPreviewOpen){this.isPreviewOpen=!1,this.overlay.hide();var t,e=n(this.items);try{for(e.s();!(t=e.n()).done;){var i=t.value;for(var o in i.DOM.animatable){var a=i.DOM.animatable[o];if(a){var r=a.getBoundingClientRect(),l={width:window.innerWidth};TweenMax.to(a,.6,{ease:"Expo.easeOut",delay:.55+s(0,.2,0,l.width,Math.abs(r.left+r.width-l.width)),x:0,y:0,rotationZ:0,opacity:1})}}}}catch(h){e.e(h)}finally{e.f()}v=!0}}}]),t}(),v=!0;new f(document.querySelector(".grid")),(0,t.default)(document.querySelectorAll(".box__img"),function(){return document.body.classList.remove("loading")});
},{"imagesloaded":"ffUI"}]},{},["k3hP"], null)
//# sourceMappingURL=projects.ade7e5e7.js.map