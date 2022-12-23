parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"MgTz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getMousePos=exports.lerp=exports.ease=void 0;var t=function(t,n,e){return(1-e)*t+e*n};exports.lerp=t;var n=function(t){return{x:t.clientX,y:t.clientY}};exports.getMousePos=n;var e={exponentialIn:function(t){return 0==t?t:Math.pow(2,10*(t-1))},exponentialOut:function(t){return 1==t?t:1-Math.pow(2,-10*t)},exponentialInOut:function(t){return 0==t||1==t?t:t<.5?.5*Math.pow(2,20*t-10):-.5*Math.pow(2,10-20*t)+1},sineOut:function(t){return Math.sin(1.5707963267948966*t)},circularInOut:function(t){return t<.5?.5*(1-Math.sqrt(1-4*t*t)):.5*(Math.sqrt((3-2*t)*(2*t-1))+1)},cubicIn:function(t){return t*t*t},cubicOut:function(t){var n=t-1;return n*n*n+1},cubicInOut:function(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1},quadraticOut:function(t){return-t*(t-2)},quarticOut:function(t){return Math.pow(t-1,3)*(1-t)+1}};exports.ease=e;
},{}],"i0CD":[function(require,module,exports) {
"use strict";var t=require("./utils");function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var s=document.querySelector(".scrollToTopBtn"),a=document.documentElement;function o(){var t=a.scrollHeight-a.clientHeight;a.scrollTop/t>.4?s.classList.add("showBtn"):s.classList.remove("showBtn")}function r(){a.scrollTo({top:0,behavior:"smooth"})}s.addEventListener("click",r),document.addEventListener("scroll",o);var h=function(){function i(t){e(this,i),this.elm=t,this.path=t.querySelectorAll("path"),this.numPoints=2,this.duration=600,this.delayPointsArray=[],this.delayPointsMax=0,this.delayPerPath=200,this.timeStart=Date.now(),this.isOpened=!1,this.isAnimating=!1}return n(i,[{key:"toggle",value:function(){this.isAnimating=!0;for(var t=0;t<this.numPoints;t++)this.delayPointsArray[t]=0;!1===this.isOpened?this.open():this.close()}},{key:"open",value:function(){this.isOpened=!0,this.elm.classList.add("is-opened"),this.timeStart=Date.now(),this.renderLoop()}},{key:"close",value:function(){this.isOpened=!1,this.elm.classList.remove("is-opened"),this.timeStart=Date.now(),this.renderLoop()}},{key:"updatePath",value:function(e){for(var i=[],n=0;n<this.numPoints;n++){var s=this.isOpened?1==n?t.ease.cubicOut:t.ease.cubicInOut:1==n?t.ease.cubicInOut:t.ease.cubicOut;i[n]=100*s(Math.min(Math.max(e-this.delayPointsArray[n],0)/this.duration,1))}var a="";a+=this.isOpened?"M 0 0 V ".concat(i[0]," "):"M 0 ".concat(i[0]," ");for(n=0;n<this.numPoints-1;n++){var o=(n+1)/(this.numPoints-1)*100,r=o-1/(this.numPoints-1)*100/2;a+="C ".concat(r," ").concat(i[n]," ").concat(r," ").concat(i[n+1]," ").concat(o," ").concat(i[n+1]," ")}return a+=this.isOpened?"V 0 H 0":"V 100 H 0"}},{key:"render",value:function(){if(this.isOpened)for(var t=0;t<this.path.length;t++)this.path[t].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*t)));else for(t=0;t<this.path.length;t++)this.path[t].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*(this.path.length-t-1))))}},{key:"renderLoop",value:function(){var t=this;this.render(),Date.now()-this.timeStart<this.duration+this.delayPerPath*(this.path.length-1)+this.delayPointsMax?requestAnimationFrame(function(){t.renderLoop()}):this.isAnimating=!1}}]),i}();!function(){var t=document.querySelector(".hamburger"),e=document.querySelectorAll(".global-menu__item"),i=document.querySelector(".shape-overlays"),n=new h(i);t.addEventListener("click",function(){if(n.isAnimating)return!1;if(n.toggle(),!0===n.isOpened){t.classList.add("is-opened-navi"),document.body.classList.add("preview-open");for(var i=0;i<e.length;i++)e[i].classList.add("is-opened")}else{t.classList.remove("is-opened-navi"),document.body.classList.remove("preview-open");for(i=0;i<e.length;i++)e[i].classList.remove("is-opened")}})}();
},{"./utils":"MgTz"}]},{},["i0CD"], null)
//# sourceMappingURL=menu.0183af65.js.map