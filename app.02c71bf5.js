parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QdeU":[function(require,module,exports) {
"use strict";var e=function(e,t){var i=e.documentElement;return{init:function(){t(e).foundation(),t(e).on("click","#start-jr",function(){t(e).foundation("joyride","start")}),i.setAttribute("data-useragent",navigator.userAgent),void 0===window.getComputedStyle(e.body).backgroundBlendMode&&(e.documentElement.className+=" no-background-blend-mode"),t(".portfolio").mixItUp();var a=t(".jumbotron__arrow-down, .top-bar-section a");a.on("click",function(){var e=t(this).attr("href");return t("html, body").animate({scrollTop:t(e).offset().top},800),!1});var s=t("#scroll-to-top"),n=t("#site-intro").offset().top;t(window).scroll(function(){t(this).scrollTop()>n?s.addClass("is-visible"):s.removeClass("is-visible")}),s.on("click",function(){return t("html, body").animate({scrollTop:0},800),!1}),new WOW({mobile:!1,offset:100}).init();var l=t("#skills"),o=t("#funfact"),r=function(e){e.find(".counter").each(function(){var e=t(this);e.waypoint({handler:function(t){"down"===t&&e.hasClass("counter")&&(e.closest("div").find(".meter").css("width",e.data("number")+"%"),e.animateNumber({number:e.data("number")},2e3),e.removeClass("counter"))},offset:"bottom-in-view"})})};r(l),r(o);var m=t("#contact-form"),p=m.closest(".content-wrap");m.submit(function(){return t.ajax({url:"//formspree.io/nguyenmanh1507@gmail.com",method:"POST",data:{name:t("#cf-name").val(),email:t("#cf-email").val(),message:t("#cf-message").val()},beforeSend:function(){p.addClass("is-submit")},success:function(){p.removeClass("is-submit"),m.hide(),t("#modalTitle").text("Thank you! I'll reply you soon."),window.setTimeout(function(){t(".close-reveal-modal").click()},2e3)},dataType:"json"}),!1})}}}(document,jQuery);function t(){var e=new google.maps.StyledMapType([{featureType:"all",elementType:"all",stylers:[{visibility:"simplified"},{saturation:"-100"},{invert_lightness:!0},{lightness:"11"},{gamma:"1.27"}]},{featureType:"administrative.locality",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",elementType:"all",stylers:[{hue:"#ff0000"},{visibility:"simplified"},{invert_lightness:!0},{lightness:"-10"},{gamma:"0.54"},{saturation:"45"}]},{featureType:"poi.business",elementType:"all",stylers:[{visibility:"simplified"},{hue:"#ff0000"},{saturation:"75"},{lightness:"24"},{gamma:"0.70"},{invert_lightness:!0}]},{featureType:"poi.government",elementType:"all",stylers:[{hue:"#ff0000"},{visibility:"simplified"},{invert_lightness:!0},{lightness:"-24"},{gamma:"0.59"},{saturation:"59"}]},{featureType:"poi.medical",elementType:"all",stylers:[{visibility:"simplified"},{invert_lightness:!0},{hue:"#ff0000"},{saturation:"73"},{lightness:"-24"},{gamma:"0.59"}]},{featureType:"poi.park",elementType:"all",stylers:[{lightness:"-41"}]},{featureType:"poi.school",elementType:"all",stylers:[{visibility:"simplified"},{hue:"#ff0000"},{invert_lightness:!0},{saturation:"43"},{lightness:"-16"},{gamma:"0.73"}]},{featureType:"poi.sports_complex",elementType:"all",stylers:[{hue:"#ff0000"},{saturation:"43"},{lightness:"-11"},{gamma:"0.73"},{invert_lightness:!0}]},{featureType:"road",elementType:"all",stylers:[{saturation:"45"},{lightness:"53"},{gamma:"0.67"},{invert_lightness:!0},{hue:"#ff0000"},{visibility:"simplified"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"simplified"},{hue:"#ff0000"},{saturation:"38"},{lightness:"-16"},{gamma:"0.86"}]}],{name:"Styled Map"}),t={zoom:16,scrollwheel:!1,center:{lat:45.478135,lng:9.123812},mapTypeContronlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,"map_style"]}},i=new google.maps.Map(document.getElementById("map-canvas"),t);i.mapTypes.set("map_style",e),i.setMapTypeId("map_style"),s=new google.maps.InfoWindow;var a=new google.maps.Marker({map:i,place:{location:{lat:45.478135,lng:9.123812},query:"San Siro Stadium"},attribution:{source:"Google Maps JavaScript API",webUrl:"https://developers.google.com/maps/"}}),s=new google.maps.InfoWindow({content:"Creative Company"});s.open(i,a)}e.init(),google.maps.event.addDomListener(window,"load",t);
},{}]},{},["QdeU"], null)
//# sourceMappingURL=/app.02c71bf5.js.map