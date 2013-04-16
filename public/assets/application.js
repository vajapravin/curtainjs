/*
* Curtain.js - Create an unique page transitioning system
* ---
* Version: 2
* Copyright 2011, Victor Coulon (http://victorcoulon.fr)
* Released under the MIT Licence
*/
(function(t,e,n,i){function s(e,n){this.element=e,this.options=t.extend({},r,n),this._defaults=r,this._name=o,this._ignoreHashChange=!1,this.init()}var o="curtain",r={scrollSpeed:400,bodyHeight:0,linksArray:[],mobile:!1,scrollButtons:{},controls:null,curtainLinks:".curtain-links",enableKeys:!0,easing:"swing",disabled:!1,nextSlide:function(){},prevSlide:function(){}};s.prototype={init:function(){var i=this;this.$element=t(this.element),this.$li=t(this.element).find(">li"),this.$liLength=this.$li.length,i.$windowHeight=t(e).height(),i.$elDatas={},i.$document=t(n),i.$window=t(e),i.webkit=navigator.userAgent.indexOf("Chrome")>-1||navigator.userAgent.indexOf("Safari")>-1,t.Android=navigator.userAgent.match(/Android/i),t.iPhone=navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i),t.iPad=navigator.userAgent.match(/iPad/i),t.iOs4=/OS [1-4]_[0-9_]+ like Mac OS X/i.test(navigator.userAgent),(t.iPhone||t.iPad||t.Android||i.options.disabled)&&(this.options.mobile=!0,this.$li.css({position:"relative"}),this.$element.find(".fixed").css({position:"absolute"})),this.scrollEl=this.options.mobile?this.$element:t.browser.mozilla||t.browser.msie?t("html"):t("body"),i.options.controls&&(i.options.scrollButtons.up=t(i.options.controls).find('[href="#up"]'),i.options.scrollButtons.down=t(i.options.controls).find('[href="#down"]'),t.iOs4||!t.iPhone&&!t.iPad||(i.$element.css({position:"fixed",top:0,left:0,right:0,bottom:0,"-webkit-overflow-scrolling":"touch",overflow:"auto"}),t(i.options.controls).css({position:"absolute"})));var s=function(){i.setDimensions(),i.$li.eq(0).addClass("current"),i.setCache(),i.options.mobile||i.$li.eq(1).length&&i.$li.eq(1).nextAll().addClass("hidden"),i.setEvents(),i.setLinks(),i.isHashIsOnList(location.hash.substring(1))};i.$element.find("img").length?i.imageLoaded(s):s()},scrollToPosition:function(e){var n=null,s=this;if(s.scrollEl.is(":animated"))return!1;if("up"===e||"down"==e){var o="up"===e?s.$current.prev():s.$current.next();if(s.$step){s.$current.find(".current-step").length||s.$step.eq(0).addClass("current-step");var r="up"===e?s.$current.find(".current-step").prev(".step"):s.$current.find(".current-step").next(".step");r.length&&(n=s.options.mobile?r.position().top+s.$elDatas[s.$current.index()]["data-position"]:r.position().top+s.$elDatas[s.$current.index()]["data-position"])}n=n||(s.$elDatas[o.index()]===i?null:s.$elDatas[o.index()]["data-position"]),null!==n&&s.scrollEl.animate({scrollTop:n},s.options.scrollSpeed,s.options.easing)}else if("top"===e)s.scrollEl.animate({scrollTop:0},s.options.scrollSpeed,s.options.easing);else if("bottom"===e)s.scrollEl.animate({scrollTop:s.options.bodyHeight},s.options.scrollSpeed,s.options.easing);else{var a=t("#"+e).index(),l=Math.abs(s.currentIndex-a)*4*this.options.scrollSpeed/s.$liLength;s.scrollEl.animate({scrollTop:s.$elDatas[a]["data-position"]||null},s.options.scrollSpeed>=l?s.options.scrollSpeed:l,this.options.easing)}},scrollEvent:function(){var e=this,n=e.$document.scrollTop();e.currentP>n&&e.currentIndex>0?(e._ignoreHashChange=!0,e.$current.prev().attr("id")&&e.setHash(e.$current.prev().attr("id")),e.$current.removeClass("current").css(e.webkit?{"-webkit-transform":"translateY(0px) translateZ(0)"}:{marginTop:0}).nextAll().addClass("hidden").end().prev().addClass("current").removeClass("hidden"),e.setCache(),e.options.prevSlide()):e.currentP+e.currentHeight>n?(e.webkit?e.$current.css({"-webkit-transform":"translateY("+-(n-e.currentP)+"px) translateZ(0)"}):e.$current.css({marginTop:-(n-e.currentP)}),e.$fixedLength&&(parseInt(e.$fixed.attr("data-top"),10),n+e.$windowHeight>=e.currentP+e.currentHeight?e.$fixed.css({position:"fixed"}):e.$fixed.css({position:"absolute",marginTop:Math.abs(n-e.currentP)})),e.$stepLength&&t.each(e.$step,function(i,s){return n+5>=t(s).position().top+e.currentP&&t(s).position().top+e.currentP+t(s).height()>=n+5&&!t(s).hasClass("current-step")?(e.$step.removeClass("current-step"),t(s).addClass("current-step"),!1):void 0}),e.parallaxBg&&e.$current.css({"background-position-y":n*e.parallaxBg}),e.$fade.length&&e.$fade.css({opacity:1-n/e.$fade.attr("data-fade")}),e.$slowScroll.length&&e.$slowScroll.css({"margin-top":n/e.$slowScroll.attr("data-slow-scroll")})):(e._ignoreHashChange=!0,e.$current.next().attr("id")&&e.setHash(e.$current.next().attr("id")),e.$current.removeClass("current").addClass("hidden").next("li").addClass("current").next("li").removeClass("hidden"),e.setCache(),e.options.nextSlide())},scrollMobileEvent:function(){var e=this,n=e.$element.scrollTop();e.currentP>n+10&&e.currentIndex>0?(e._ignoreHashChange=!0,e.$current.prev().attr("id")&&e.setHash(e.$current.prev().attr("id")),e.$current.removeClass("current").prev().addClass("current"),e.setCache(),e.options.prevSlide()):e.currentP+e.currentHeight>n+10?e.$stepLength&&t.each(e.$step,function(i,s){n>=t(s).position().top+e.currentP&&t(s).position().top+e.currentP+t(s).outerHeight()>=n&&(t(s).hasClass("current-step")||(e.$step.removeClass("current-step"),t(s).addClass("current-step")))}):(e._ignoreHashChange=!0,e.$current.next().attr("id")&&e.setHash(e.$current.next().attr("id")),e.$current.removeClass("current").next().addClass("current"),e.setCache(),e.options.nextSlide())},setDimensions:function(){var e=this,n=0,i=!1,s=null;e.$windowHeight=e.$window.height(),this.$li.each(function(o){var r=t(this);if(i=r.hasClass("cover"),i?(r.css({height:e.$windowHeight,zIndex:999-o}).attr("data-height",e.$windowHeight).attr("data-position",n),e.$elDatas[r.index()]={"data-height":parseInt(e.$windowHeight,10),"data-position":parseInt(n,10)},n+=e.$windowHeight):(s=r.outerHeight()<=e.$windowHeight?e.$windowHeight:r.outerHeight(),r.css({minHeight:s,zIndex:999-o}).attr("data-height",s).attr("data-position",n),e.$elDatas[r.index()]={"data-height":parseInt(s,10),"data-position":parseInt(n,10)},n+=s),r.find(".fixed").length){var a=r.find(".fixed").css("top");r.find(".fixed").attr("data-top",a)}}),this.options.mobile||this.setBodyHeight()},setEvents:function(){var n=this;t(e).on("resize",function(){n.setDimensions()}),n.options.mobile?n.$element.on("scroll",function(){n.scrollMobileEvent()}):n.$window.on("scroll",function(){n.scrollEvent()}),n.options.enableKeys&&n.$document.on("keydown",function(t){return 38===t.keyCode||37===t.keyCode?(n.scrollToPosition("up"),t.preventDefault(),!1):40===t.keyCode||39===t.keyCode?(n.scrollToPosition("down"),t.preventDefault(),!1):36===t.keyCode?(n.scrollToPosition("top"),t.preventDefault(),!1):35===t.keyCode?(n.scrollToPosition("bottom"),t.preventDefault(),!1):void 0}),n.options.scrollButtons&&(n.options.scrollButtons.up&&n.options.scrollButtons.up.on("click",function(t){t.preventDefault(),n.scrollToPosition("up")}),n.options.scrollButtons.down&&n.options.scrollButtons.down.on("click",function(t){t.preventDefault(),n.scrollToPosition("down")})),n.options.curtainLinks&&t(n.options.curtainLinks).on("click",function(e){e.preventDefault();var i=t(this).attr("href");if(!n.isHashIsOnList(i.substring(1))&&s)return!1;var s=n.$elDatas[t(i).index()]["data-position"]||null;return s&&n.scrollEl.animate({scrollTop:s},n.options.scrollSpeed,n.options.easing),!1}),n.$window.on("hashchange",function(){n._ignoreHashChange===!1&&n.isHashIsOnList(location.hash.substring(1)),n._ignoreHashChange=!1})},setBodyHeight:function(){var e=0;for(var n in this.$elDatas){var i=this.$elDatas[n];e+=i["data-height"]}this.options.bodyHeight=e,t("body").height(e)},setLinks:function(){var e=this;this.$li.each(function(){var n=t(this).attr("id")||0;e.options.linksArray.push(n)})},setHash:function(e){el=t("[href=#"+e+"]"),el.parent().siblings("li").removeClass("active"),el.parent().addClass("active"),history.pushState?history.pushState(null,null,"#"+e):location.hash=e},setCache:function(){var t=this;t.$current=t.$element.find(".current"),t.$fixed=t.$current.find(".fixed"),t.$fixedLength=t.$fixed.length,t.$step=t.$current.find(".step"),t.$stepLength=t.$step.length,t.currentIndex=t.$current.index(),t.currentP=t.$elDatas[t.currentIndex]["data-position"],t.currentHeight=t.$elDatas[t.currentIndex]["data-height"],t.parallaxBg=t.$current.attr("data-parallax-background"),t.$fade=t.$current.find("[data-fade]"),t.$slowScroll=t.$current.find("[data-slow-scroll]")},isHashIsOnList:function(e){var n=this;t.each(n.options.linksArray,function(t,i){return i===e?(n.scrollToPosition(e),!1):void 0})},readyElement:function(t,e){var n=setInterval(function(){t.length&&(e(t.length),clearInterval(n))},60)},imageLoaded:function(e){var n=this,s=n.$element.find("img"),o=s.length,r="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";s.bind("load.imgloaded",function(){(0>=--o&&this.src!==r||t(this).not(":visible"))&&(s.unbind("load.imgloaded"),e.call(s,this))}).each(function(){if(this.complete||this.complete===i){var t=this.src;this.src=r,this.src=t}})}},t.fn[o]=function(e){return this.each(function(){t.data(this,"plugin_"+o)||t.data(this,"plugin_"+o,new s(this,e))})}})(jQuery,window,document);