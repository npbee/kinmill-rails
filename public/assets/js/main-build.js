!function t(e,n,i){function r(s,a){if(!n[s]){if(!e[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){var n=e[s][1][t];return r(n?n:t)},u,u.exports,t,e,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(t,e){var n=function(t,e){var n=e||"12px arial",i=document.createElement("div");i.style.position="absolute",i.style.float="left",i.style.whiteSpace="nowrap",i.style.visibility="hidden",i.style.fontSize=n,i.innerHTML=t,document.body.appendChild(i);var r=i.offsetWidth;return document.body.removeChild(i),r};e.exports=n},{}],2:[function(t,e){var n=function(){return{init:t("./init"),slabify:t("./slabify"),verifyString:t("./verify-string"),getItemWidth:t("./get-item-width")}};e.exports=n},{"./get-item-width":1,"./init":3,"./slabify":5,"./verify-string":6}],3:[function(t,e){function n(t){var e=t||{};if(this.settings={selector:e.selector||".js-vanilla-slab",maxFontSize:e.maxFontSize||300,minWordsPerLine:e.minWordsPerLine||2,maxWordsPerLine:e.maxWordsPerLine||5,minCharsPerLine:e.minCharsPerLine||20,buffer:e.buffer||.95,raf:e.raf||!0,postTweak:e.postTweak===!1?!1:!0,delayCheck:e.postCheck||!1},!document.querySelector(this.settings.selector))return void console.log('Element with class of "'+this.settings.selector+'" not found on page.');var n=document.querySelectorAll(this.settings.selector);this.targets=[];var r=parseInt(window.getComputedStyle(n[0],null).getPropertyValue("font-size")||n[0].currentStyle.fontSize,10);this.original_font_size=r;for(var o=0;o<n.length;o++){var s=n[o],a=s.innerHTML.split(" ");this.targets.push({element:s,words:a,id:s.textContent,lines:""}),this.slabify(s,a),i("resize",this.slabify,300,e.raf,this,[s,a])}}var i=t("../utils/debounce");e.exports=n},{"../utils/debounce":7}],4:[function(t,e){function n(t,e,n){t.style.fontSize=n,t.style.wordSpacing="normal",t.style.letterSpacing="normal",t.style.display="inline";var r=t.parentNode;r.style.float="none";var o=r.offsetWidth,s=t.offsetWidth,a=o/s,c=n*a*e.buffer;t.style.fontSize=Math.min(e.maxFontSize,c)+"px";var u=t.textContent.split(" ").length>1,l=o-t.offsetWidth;if(l>0&&e.postTweak)if(u){{var d=Math.floor(l/(t.textContent.split(" ").length-1)*e.buffer);10*Math.round(d/10)}t.style.wordSpacing=d}else t.style.letterSpacing=l/t.innerHTML.split("").length.toPrecision(3);e.postCheck&&setTimeout(function(){i(t,e,n,o)},300),t.style.display="block"}function i(t,e,i,r){t.style.display="inline",t.style.whiteSpace="nowrap",t.offsetWidth>r&&n(t,e,i),t.style.display="block",t.style.whiteSpace="normal"}e.exports=n},{}],5:[function(t,e){var n=t("./set-font"),i=function(t,e){{var i=this.settings,r=t.parentNode,o=r.offsetWidth-(parseInt(window.getComputedStyle(r,null).getPropertyValue("padding-left"),10)+parseInt(window.getComputedStyle(r,null).getPropertyValue("padding-right"),10));Math.min(o/i.buffer)}t.style.lineHeight=1;for(var s=[],a=0;a<this.targets.length;a++){var c=this.targets[a];for(var u in c)c[u]===t.textContent&&(c.lines=s)}var l="",d="",h=Math.max(this.settings.minCharsPerLine,Math.floor(o/(this.original_font_size*i.buffer)));this.chars_per_line=h;for(var p=0;p<e.length;p++){var f=p===e.length-1;d=l+e[p]+" ";var g=this.verifyString(l),m=this.verifyString(d);(f||g||m)&&(f||g||!m)?!f&&g&&m?l=d:f||!g||m?f&&g&&!m?(s.push(l.trim()),s.push(e[p])):s.push(d.trim()):(s.push(l.trim()),l=""+e[p]+" "):l=d}t.innerHTML="";for(var v=0;v<s.length;v++){var E=document.createElement("span");E.innerHTML=s[v],t.appendChild(E),n(E,this.settings,this.original_font_size)}};e.exports=i},{"./set-font":4}],6:[function(t,e){var n=function(t){var e=t.trim().split(" ").length,n=t.length;return e>=this.settings.minWordsPerLine&&e<=this.settings.maxWordsPerLine&&n<=this.chars_per_line};e.exports=n},{}],7:[function(t,e){function n(t,e,n,i,r,o){function s(){function n(){a||s(i),a=!0}function i(){a=!1,e.apply(r,o)}var s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,a=!1;window.addEventListener(t,function(){n()})}function a(){function i(){e.apply(r,o)}var s;window.addEventListener(t,function(){s&&clearTimeout(s),s=setTimeout(i,n||300)},!1)}return i?s():a()}e.exports=n},{}],8:[function(t){var e=(t("./libs/picturefill"),t("./utils/features")),n=(t("vanilla-slab"),t("./libs/fitter-happier-text")),i=document.querySelectorAll(".headline");n(i,{baseline:16,paddingX:1.1});var r=(t("./modules/nav").init(),t("./modules/carousel"));e.csstransforms3d&&r();var o=t("./libs/fastclick");e.touch&&o(document.body);var s=t("./libs/echo");s.init({offset:100,throttle:250})},{"./libs/echo":10,"./libs/fastclick":11,"./libs/fitter-happier-text":12,"./libs/picturefill":14,"./modules/carousel":15,"./modules/nav":17,"./utils/features":20,"vanilla-slab":2}],9:[function(t){var e=t("./utils/dom_ready");e(function(){t("./app")})},{"./app":8,"./utils/dom_ready":19}],10:[function(t,e){window.Echo=function(t,e){"use strict";var n,i,r,o=[],s=function(i){var r=i.getBoundingClientRect();return(r.top>=0&&r.left>=0&&r.top)<=(t.innerHeight||e.documentElement.clientHeight)+parseInt(n)},a=function(){for(var t=o.length;t--;){var e=o[t];s(e)&&(e.src=e.getAttribute("data-echo"),o.splice(t,1))}},c=function(){clearTimeout(r),r=setTimeout(a,i)},u=function(r){var s=e.querySelectorAll("[data-echo]"),a=r||{};n=a.offset||0,i=a.throttle||250;for(var u=0;u<s.length;u++)o.push(s[u]);c(),e.addEventListener?t.addEventListener("scroll",c,!1):t.attachEvent("onscroll",c)};return{init:u,render:c}}(window,document),"undefined"!=typeof define&&define.amd?define(function(){"use strict";return Echo}):"undefined"!=typeof e&&e.exports?e.exports=Echo:window.Echo=Echo},{}],11:[function(t,e){function n(t){"use strict";var e,i=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=t,!t||!t.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return n.prototype.onClick.apply(i,arguments)},this.onMouse=function(){return n.prototype.onMouse.apply(i,arguments)},this.onTouchStart=function(){return n.prototype.onTouchStart.apply(i,arguments)},this.onTouchMove=function(){return n.prototype.onTouchMove.apply(i,arguments)},this.onTouchEnd=function(){return n.prototype.onTouchEnd.apply(i,arguments)},this.onTouchCancel=function(){return n.prototype.onTouchCancel.apply(i,arguments)},n.notNeeded(t)||(this.deviceIsAndroid&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,i){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,n.hijacked||n,i):r.call(t,e,n,i)},t.addEventListener=function(e,n,i){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),i):r.call(t,e,n,i)}),"function"==typeof t.onclick&&(e=t.onclick,t.addEventListener("click",function(t){e(t)},!1),t.onclick=null))}n.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,n.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),n.prototype.deviceIsIOS4=n.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),n.prototype.deviceIsIOSWithBadTarget=n.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),n.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},n.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":case"select":return!0;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},n.prototype.sendClick=function(t,e){"use strict";var n,i;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),i=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent("click",!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},n.prototype.focus=function(t){"use strict";var e;this.deviceIsIOS&&t.setSelectionRange?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},n.prototype.updateScrollParent=function(t){"use strict";var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},n.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},n.prototype.onTouchStart=function(t){"use strict";var e,n,i;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],this.deviceIsIOS){if(i=window.getSelection(),i.rangeCount&&!i.isCollapsed)return!0;if(!this.deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<200&&t.preventDefault(),!0},n.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},n.prototype.onTouchMove=function(t){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},n.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},n.prototype.onTouchEnd=function(t){"use strict";var e,n,i,r,o,s=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.lastClickTime=t.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(o=t.changedTouches[0],s=document.elementFromPoint(o.pageX-window.pageXOffset,o.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),i=s.tagName.toLowerCase(),"label"===i){if(e=this.findControl(s)){if(this.focus(s),this.deviceIsAndroid)return!1;s=e}}else if(this.needsFocus(s))return t.timeStamp-n>100||this.deviceIsIOS&&window.top!==window&&"input"===i?(this.targetElement=null,!1):(this.focus(s),this.deviceIsIOS4&&"select"===i||(this.targetElement=null,t.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(r=s.fastClickScrollParent,r&&r.fastClickLastScrollTop!==r.scrollTop)?!0:(this.needsClick(s)||(t.preventDefault(),this.sendClick(s,t)),!1)},n.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},n.prototype.onMouse=function(t){"use strict";return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},n.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},n.prototype.destroy=function(){"use strict";var t=this.layer;this.deviceIsAndroid&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},n.notNeeded=function(t){"use strict";var e;if("undefined"==typeof window.ontouchstart)return!0;if(/Chrome\/[0-9]+/.test(navigator.userAgent)){if(!n.prototype.deviceIsAndroid)return!0;if(e=document.querySelector("meta[name=viewport]"),e&&-1!==e.content.indexOf("user-scalable=no"))return!0}return"none"===t.style.msTouchAction?!0:!1},n.attach=function(t){"use strict";return new n(t)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return n}):"undefined"!=typeof e&&e.exports?(e.exports=n.attach,e.exports.FastClick=n):window.FastClick=n},{}],12:[function(t,e,n){(function(i){!function(t){if("object"==typeof n)e.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var r;"undefined"!=typeof window?r=window:"undefined"!=typeof i?r=i:"undefined"!=typeof self&&(r=self),r.fitterHappierText=t()}}(function(){return function e(n,i,r){function o(a,c){if(!i[a]){if(!n[a]){var u="function"==typeof t&&t;if(!c&&u)return u(a,!0);if(s)return s(a,!0);throw new Error("Cannot find module '"+a+"'")}var l=i[a]={exports:{}};n[a][0].call(l.exports,function(t){var e=n[a][1][t];return o(e?e:t)},l,l.exports,e,n,i,r)}return i[a].exports}for(var s="function"==typeof t&&t,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e){e.exports=function(t,e){for(var e=e||{},n=e.baseline||16,i=e.paddingY||0,r=e.paddingX||0,o=e.doc||document,s=0;s<t.length;s++){var a,c,u=t[s].textContent,l=o.createElementNS("http://www.w3.org/2000/svg","svg"),d=o.createElementNS("http://www.w3.org/2000/svg","text");d.textContent=u,d.setAttribute("x","50%"),d.setAttribute("y",n),d.setAttribute("font-family","inherit"),d.setAttribute("font-size","1rem"),d.setAttribute("font-weight","inherit"),d.setAttribute("style","text-anchor:middle");for(var h=0;h<t[s].attributes.length;h++)l.setAttribute(t[s].attributes[h].name,t[s].attributes[h].value);l.setAttribute("width","100%"),l.setAttribute("style","max-height:100%"),l.setAttribute("fill","currentcolor"),l.setAttribute("overflow","visible"),l.appendChild(d),t[s].parentNode.replaceChild(l,t[s]),a=d.offsetWidth||d.getComputedTextLength(),c=d.offsetHeight||24,l.setAttribute("viewBox","0 0 "+(a+2*r)+" "+(c+i))}}},{}]},{},[1])(1)})}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],13:[function(t,e){!function(t,n){"use strict";function i(){if(!r.READY){r.event.determineEventTypes();for(var t in r.gestures)r.gestures.hasOwnProperty(t)&&r.detection.register(r.gestures[t]);r.event.onTouch(r.DOCUMENT,r.EVENT_MOVE,r.detection.detect),r.event.onTouch(r.DOCUMENT,r.EVENT_END,r.detection.detect),r.READY=!0}}var r=function(t,e){return new r.Instance(t,e||{})};r.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},r.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,r.HAS_TOUCHEVENTS="ontouchstart"in t,r.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,r.NO_MOUSEEVENTS=r.HAS_TOUCHEVENTS&&navigator.userAgent.match(r.MOBILE_REGEX),r.EVENT_TYPES={},r.DIRECTION_DOWN="down",r.DIRECTION_LEFT="left",r.DIRECTION_UP="up",r.DIRECTION_RIGHT="right",r.POINTER_MOUSE="mouse",r.POINTER_TOUCH="touch",r.POINTER_PEN="pen",r.EVENT_START="start",r.EVENT_MOVE="move",r.EVENT_END="end",r.DOCUMENT=document,r.plugins={},r.READY=!1,r.Instance=function(t,e){var n=this;return i(),this.element=t,this.enabled=!0,this.options=r.utils.extend(r.utils.extend({},r.defaults),e||{}),this.options.stop_browser_behavior&&r.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),r.event.onTouch(t,r.EVENT_START,function(t){n.enabled&&r.detection.startDetect(n,t)}),this},r.Instance.prototype={on:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.addEventListener(n[i],e,!1);return this},off:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.removeEventListener(n[i],e,!1);return this},trigger:function(t,e){var n=r.DOCUMENT.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e;var i=this.element;return r.utils.hasParent(e.target,i)&&(i=e.target),i.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var o=null,s=!1,a=!1;r.event={bindDom:function(t,e,n){for(var i=e.split(" "),r=0;i.length>r;r++)t.addEventListener(i[r],n,!1)},onTouch:function(t,e,n){var i=this;this.bindDom(t,r.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();if(!u.match(/mouse/)||!a){(u.match(/touch/)||u.match(/pointerdown/)||u.match(/mouse/)&&1===c.which)&&(s=!0),u.match(/touch|pointer/)&&(a=!0);var l=0;s&&(r.HAS_POINTEREVENTS&&e!=r.EVENT_END?l=r.PointerEvent.updatePointer(e,c):u.match(/touch/)?l=c.touches.length:a||(l=u.match(/up/)?0:1),l>0&&e==r.EVENT_END?e=r.EVENT_MOVE:l||(e=r.EVENT_END),l||null===o?o=c:c=o,n.call(r.detection,i.collectEventData(t,e,c)),r.HAS_POINTEREVENTS&&e==r.EVENT_END&&(l=r.PointerEvent.updatePointer(e,c))),l||(o=null,s=!1,a=!1,r.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=r.HAS_POINTEREVENTS?r.PointerEvent.getEvents():r.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],r.EVENT_TYPES[r.EVENT_START]=t[0],r.EVENT_TYPES[r.EVENT_MOVE]=t[1],r.EVENT_TYPES[r.EVENT_END]=t[2]},getTouchList:function(t){return r.HAS_POINTEREVENTS?r.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,n){var i=this.getTouchList(n,e),o=r.POINTER_TOUCH;return(n.type.match(/mouse/)||r.PointerEvent.matchType(r.POINTER_MOUSE,n))&&(o=r.POINTER_MOUSE),{center:r.utils.getCenter(i),timeStamp:(new Date).getTime(),target:n.target,touches:i,eventType:e,pointerType:o,srcEvent:n,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return r.detection.stopDetect()}}}},r.PointerEvent={pointers:{},getTouchList:function(){var t=this,e=[];return Object.keys(t.pointers).sort().forEach(function(n){e.push(t.pointers[n])}),e},updatePointer:function(t,e){return t==r.EVENT_END?this.pointers={}:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e),Object.keys(this.pointers).length},matchType:function(t,e){if(!e.pointerType)return!1;var n={};return n[r.POINTER_MOUSE]=e.pointerType==e.MSPOINTER_TYPE_MOUSE||e.pointerType==r.POINTER_MOUSE,n[r.POINTER_TOUCH]=e.pointerType==e.MSPOINTER_TYPE_TOUCH||e.pointerType==r.POINTER_TOUCH,n[r.POINTER_PEN]=e.pointerType==e.MSPOINTER_TYPE_PEN||e.pointerType==r.POINTER_PEN,n[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},r.utils={extend:function(t,e,i){for(var r in e)t[r]!==n&&i||(t[r]=e[r]);return t},hasParent:function(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1},getCenter:function(t){for(var e=[],n=[],i=0,r=t.length;r>i;i++)e.push(t[i].pageX),n.push(t[i].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,i=e.pageX-t.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,e){var n=Math.abs(t.pageX-e.pageX),i=Math.abs(t.pageY-e.pageY);return n>=i?t.pageX-e.pageX>0?r.DIRECTION_LEFT:r.DIRECTION_RIGHT:t.pageY-e.pageY>0?r.DIRECTION_UP:r.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,i=e.pageY-t.pageY;return Math.sqrt(n*n+i*i)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==r.DIRECTION_UP||t==r.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,e){var n,i=["webkit","khtml","moz","ms","o",""];if(e&&t.style){for(var r=0;i.length>r;r++)for(var o in e)e.hasOwnProperty(o)&&(n=o,i[r]&&(n=i[r]+n.substring(0,1).toUpperCase()+n.substring(1)),t.style[n]=e[o]);"none"==e.userSelect&&(t.onselectstart=function(){return!1})}}},r.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:r.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,i=this.gestures.length;i>n;n++){var o=this.gestures[n];if(!this.stopped&&e[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==r.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=r.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var n=0,i=t.touches.length;i>n;n++)e.touches.push(r.utils.extend({},t.touches[n]))}var o=t.timeStamp-e.timeStamp,s=t.center.pageX-e.center.pageX,a=t.center.pageY-e.center.pageY,c=r.utils.getVelocity(o,s,a);return r.utils.extend(t,{deltaTime:o,deltaX:s,deltaY:a,velocityX:c.x,velocityY:c.y,distance:r.utils.getDistance(e.center,t.center),angle:r.utils.getAngle(e.center,t.center),direction:r.utils.getDirection(e.center,t.center),scale:r.utils.getScale(e.touches,t.touches),rotation:r.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var e=t.defaults||{};return e[t.name]===n&&(e[t.name]=!0),r.utils.extend(r.defaults,e,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},r.gestures=r.gestures||{},r.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case r.EVENT_START:clearTimeout(this.timer),r.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==r.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case r.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case r.EVENT_END:clearTimeout(this.timer)}}},r.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==r.EVENT_END){var n=r.detection.previous,i=!1;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n&&"tap"==n.name&&t.timeStamp-n.lastEvent.timeStamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance&&(e.trigger("doubletap",t),i=!0),(!i||e.options.tap_always)&&(r.detection.current.name="tap",e.trigger(r.detection.current.name,t))}}},r.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==r.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},r.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,e){if(r.detection.current.name!=this.name&&this.triggered)return e.trigger(this.name+"end",t),this.triggered=!1,n;if(!(e.options.drag_max_touches>0&&t.touches.length>e.options.drag_max_touches))switch(t.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:if(t.distance<e.options.drag_min_distance&&r.detection.current.name!=this.name)return;r.detection.current.name=this.name,(r.detection.current.lastEvent.drag_locked_to_axis||e.options.drag_lock_to_axis&&e.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var i=r.detection.current.lastEvent.direction;t.drag_locked_to_axis&&i!==t.direction&&(t.direction=r.utils.isVertical(i)?0>t.deltaY?r.DIRECTION_UP:r.DIRECTION_DOWN:0>t.deltaX?r.DIRECTION_LEFT:r.DIRECTION_RIGHT),this.triggered||(e.trigger(this.name+"start",t),this.triggered=!0),e.trigger(this.name,t),e.trigger(this.name+t.direction,t),(e.options.drag_block_vertical&&r.utils.isVertical(t.direction)||e.options.drag_block_horizontal&&!r.utils.isVertical(t.direction))&&t.preventDefault();break;case r.EVENT_END:this.triggered&&e.trigger(this.name+"end",t),this.triggered=!1}}},r.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,e){if(r.detection.current.name!=this.name&&this.triggered)return e.trigger(this.name+"end",t),this.triggered=!1,n;if(!(2>t.touches.length))switch(e.options.transform_always_block&&t.preventDefault(),t.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:var i=Math.abs(1-t.scale),o=Math.abs(t.rotation);if(e.options.transform_min_scale>i&&e.options.transform_min_rotation>o)return;r.detection.current.name=this.name,this.triggered||(e.trigger(this.name+"start",t),this.triggered=!0),e.trigger(this.name,t),o>e.options.transform_min_rotation&&e.trigger("rotate",t),i>e.options.transform_min_scale&&(e.trigger("pinch",t),e.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case r.EVENT_END:this.triggered&&e.trigger(this.name+"end",t),this.triggered=!1}}},r.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,e){return e.options.prevent_mouseevents&&t.pointerType==r.POINTER_MOUSE?(t.stopDetect(),n):(e.options.prevent_default&&t.preventDefault(),t.eventType==r.EVENT_START&&e.trigger(this.name,t),n)}},r.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==r.EVENT_END&&e.trigger(this.name,t)}},"object"==typeof e&&"object"==typeof e.exports?e.exports=r:(t.Hammer=r,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return r}))}(this)},{}],14:[function(){!function(t){"use strict";t.picturefill=function(){for(var e=t.document.getElementsByTagName("span"),n=0,i=e.length;i>n;n++)if(null!==e[n].getAttribute("data-picture")){for(var r=e[n].getElementsByTagName("span"),o=[],s=0,a=r.length;a>s;s++){var c=r[s].getAttribute("data-media");(!c||t.matchMedia&&t.matchMedia(c).matches)&&o.push(r[s])}var u=e[n].getElementsByTagName("img")[0];if(o.length){var l=o.pop();if(u&&"NOSCRIPT"!==u.parentNode.nodeName){if(l===u.parentNode)continue}else u=t.document.createElement("img"),u.alt=e[n].getAttribute("data-alt");u.src=l.getAttribute("data-src"),l.appendChild(u),u.removeAttribute("width"),u.removeAttribute("height")}else u&&u.parentNode.removeChild(u)}},t.addEventListener?(t.addEventListener("resize",t.picturefill,!1),t.addEventListener("DOMContentLoaded",function(){t.picturefill(),t.removeEventListener("load",t.picturefill,!1)},!1),t.addEventListener("load",t.picturefill,!1)):t.attachEvent&&t.attachEvent("onload",t.picturefill),t.picturefill()}(window)},{}],15:[function(t,e){function n(){function t(t){o+=t,n.style.webkitTransform="rotateY("+o+"deg)",n.style.mozTransform="rotateY("+o+"deg)",n.style.msTransform="rotateY("+o+"deg)",n.style.oTransform="rotateY("+o+"deg)",n.style.transform="rotateY("+o+"deg)"}function e(){n.style.webkitTransform="rotateY(0deg)",n.style.mozTransform="rotateY(0deg)",n.style.msTransform="rotateY(0deg)",n.style.oTransform="rotateY(0deg)",n.style.transform="rotateY(0deg)"}var n=document.getElementById("carousel"),r=document.getElementById("carousel__control"),o=0;r&&r.addEventListener("click",function(e){e.preventDefault(),t(120)},!1),i.desk.addListener(e)}var i=(t("../libs/hammer"),t("../utils/breakpoint"));e.exports=n},{"../libs/hammer":13,"../utils/breakpoint":18}],16:[function(t,e){var n=t("../../libs/hammer"),i={init:function(){for(var t=document.getElementById("toggle-container"),e=document.getElementById("nav-container"),n=["click","dragright","dragleft"],i=n.length,r=0;i>r;r++)this.handleEvents(t,e,n[r])},handleEvents:function(t,e,n){switch(n){case"click":t.addEventListener("click",function(n){e.classList.contains("nav--open")?i.close(t,e):i.open(t,e),n.preventDefault()});break;case"dragright":i.doHammer(t,"drag_block_vertical","dragright",open,t,e);break;case"dragleft":for(var r=document.getElementById("content"),o=[t,e,r],s=o.length,a=0;s>a;a++)i.doHammer(o[a],"drag_block_vertical","dragleft",close,t,e);break;case"tap":i.doHammer(r,"drag_block_vertical","tap",close,t,e)}},open:function(t,e){t.classList.remove("nav--closed"),t.classList.add("nav--open"),e.classList.remove("nav--closed"),e.classList.add("nav--open")},close:function(t,e){t.classList.remove("nav--open"),t.classList.add("nav--closed"),e.classList.add("nav--closed"),e.classList.remove("nav--open")},doHammer:function(t,e,i,r,o,s){n(t,{}).on(i,function(t){t.preventDefault(),r(o,s)})}};e.exports=i},{"../../libs/hammer":13}],17:[function(t,e){var n=t("./events"),i={init:function(){n.init()}};e.exports=i},{"./events":16}],18:[function(t,e,n){n.desk=window.matchMedia("(min-width: 940px)")},{}],19:[function(t,e){function n(t){function e(){"complete"===document.readyState&&(i=!0),i?(clearTimeout(n),t()):n=setTimeout(e,100)}var n,i=!1;e()}e.exports=n},{}],20:[function(t,e,n){var i=["csstransforms3d","touch"];i.forEach(function(t){n[t]=Modernizr[t]})},{}]},{},[9]);