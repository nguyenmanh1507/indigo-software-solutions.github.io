parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"IuMp":[function(require,module,exports) {
!function(a,e,t,s){"use strict";Foundation.libs.offcanvas={name:"offcanvas",version:"5.5.3",settings:{open_method:"move",close_on_click:!1},init:function(a,e,t){this.bindings(e,t)},events:function(){var e=this,t=e.S,s="",n="",o="",c="",l="";"move"===this.settings.open_method?(s="move-",n="right",o="left",c="top",l="bottom"):"overlap_single"===this.settings.open_method?(s="offcanvas-overlap-",n="right",o="left",c="top",l="bottom"):"overlap"===this.settings.open_method&&(s="offcanvas-overlap"),t(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(o){e.click_toggle_class(o,s+n),"overlap"!==e.settings.open_method&&t(".left-submenu").removeClass(s+n),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(o){var c=e.get_settings(o),l=t(this).parent();!c.close_on_click||l.hasClass("has-submenu")||l.hasClass("back")?t(this).parent().hasClass("has-submenu")?(o.preventDefault(),t(this).siblings(".left-submenu").toggleClass(s+n)):l.hasClass("back")&&(o.preventDefault(),l.parent().removeClass(s+n)):(e.hide.call(e,s+n,e.get_wrapper(o)),l.parent().removeClass(s+n)),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(n){e.click_toggle_class(n,s+o),"overlap"!==e.settings.open_method&&t(".right-submenu").removeClass(s+o),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(n){var c=e.get_settings(n),l=t(this).parent();!c.close_on_click||l.hasClass("has-submenu")||l.hasClass("back")?t(this).parent().hasClass("has-submenu")?(n.preventDefault(),t(this).siblings(".right-submenu").toggleClass(s+o)):l.hasClass("back")&&(n.preventDefault(),l.parent().removeClass(s+o)):(e.hide.call(e,s+o,e.get_wrapper(n)),l.parent().removeClass(s+o)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".top-off-canvas-toggle",function(n){e.click_toggle_class(n,s+l),"overlap"!==e.settings.open_method&&t(".top-submenu").removeClass(s+l),a(".top-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".top-off-canvas-menu a",function(n){var o=e.get_settings(n),c=t(this).parent();!o.close_on_click||c.hasClass("has-submenu")||c.hasClass("back")?t(this).parent().hasClass("has-submenu")?(n.preventDefault(),t(this).siblings(".top-submenu").toggleClass(s+l)):c.hasClass("back")&&(n.preventDefault(),c.parent().removeClass(s+l)):(e.hide.call(e,s+l,e.get_wrapper(n)),c.parent().removeClass(s+l)),a(".top-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".bottom-off-canvas-toggle",function(n){e.click_toggle_class(n,s+c),"overlap"!==e.settings.open_method&&t(".bottom-submenu").removeClass(s+c),a(".bottom-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".bottom-off-canvas-menu a",function(n){var o=e.get_settings(n),l=t(this).parent();!o.close_on_click||l.hasClass("has-submenu")||l.hasClass("back")?t(this).parent().hasClass("has-submenu")?(n.preventDefault(),t(this).siblings(".bottom-submenu").toggleClass(s+c)):l.hasClass("back")&&(n.preventDefault(),l.parent().removeClass(s+c)):(e.hide.call(e,s+c,e.get_wrapper(n)),l.parent().removeClass(s+c)),a(".bottom-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(c){e.click_remove_class(c,s+o),t(".right-submenu").removeClass(s+o),n&&(e.click_remove_class(c,s+n),t(".left-submenu").removeClass(s+o)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(t){e.click_remove_class(t,s+o),a(".left-off-canvas-toggle").attr("aria-expanded","false"),n&&(e.click_remove_class(t,s+n),a(".right-off-canvas-toggle").attr("aria-expanded","false"))}).on("click.fndtn.offcanvas",".exit-off-canvas",function(n){e.click_remove_class(n,s+c),t(".bottom-submenu").removeClass(s+c),l&&(e.click_remove_class(n,s+l),t(".top-submenu").removeClass(s+c)),a(".bottom-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(t){e.click_remove_class(t,s+c),a(".top-off-canvas-toggle").attr("aria-expanded","false"),l&&(e.click_remove_class(t,s+l),a(".bottom-off-canvas-toggle").attr("aria-expanded","false"))})},toggle:function(a,e){(e=e||this.get_wrapper()).is("."+a)?this.hide(a,e):this.show(a,e)},show:function(a,e){(e=e||this.get_wrapper()).trigger("open.fndtn.offcanvas"),e.addClass(a)},hide:function(a,e){(e=e||this.get_wrapper()).trigger("close.fndtn.offcanvas"),e.removeClass(a)},click_toggle_class:function(a,e){a.preventDefault();var t=this.get_wrapper(a);this.toggle(e,t)},click_remove_class:function(a,e){a.preventDefault();var t=this.get_wrapper(a);this.hide(e,t)},get_settings:function(a){return this.S(a.target).closest("["+this.attr_name()+"]").data(this.attr_name(!0)+"-init")||this.settings},get_wrapper:function(a){var e=this.S(a?a.target:this.scope).closest(".off-canvas-wrap");return 0===e.length&&(e=this.S(".off-canvas-wrap")),e},reflow:function(){}}}(jQuery,window,window.document);
},{}]},{},["IuMp"], null)
//# sourceMappingURL=/foundation.offcanvas.424f9383.js.map