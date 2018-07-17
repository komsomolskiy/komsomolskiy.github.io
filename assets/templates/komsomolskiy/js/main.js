/*! komsomolskiy_site v1.0.0 | ISC License | https://github.com/komsomolskiy/site#readme*/
!function(a){var b={list:[16,20,24],ltext:["Сброс","Крупный","Большой"],text:{norm:"Версия для слабовидящих",reset:"Полная версия"}},c=function(){var c=this;c.element=a("body"),a("a.eye",c.element).length?c.button=a(a("a.eye",c.element)[0]).addClass("eye-plugin-button"):(c.button=a("<a></a>",{class:"eye-plugin-button",href:"javascript:;"}).append(a("<i></i>",{class:"koms-eye"})),c.element.prepend(c.button)),c.button.wrap(a("<div></div>",{class:"eye-plugin"})),c.parent=a("div.eye-plugin",c.element),a("span",c.button).length?c.toggleText=a(a("span",c.button)[0]):(c.toggleText=a("<span></span>"),c.button.append(c.toggleText)),c.toggleText.text(b.text.norm),c.list=a("<ul></ul>",{class:"eye-plugin-list"}),a.each(b.list,function(d,e){c.list.append(a("<li></li>",{class:"eye-plugin-list-item"}).append(a("<a></a>",{class:"eye-plugin-list-item-link",title:b.ltext[d],text:"Aa",href:"javascript:;"}).attr({"data-index":d})))}),c.parent.append(c.list),c.button.on("click",c.toggleStatus.bind(c)),a(c.list).on("click","a",c.toggleSize.bind(c)),c.size=c.getSize(),c.status=16!=c.size&&c.getStatus(),c.setCookie("eye_status",c.status),c.setCookie("eye_size",c.size),c.parent[c.status?"addClass":"removeClass"]("eye-open")};c.prototype.toggleStatus=function(a){a.preventDefault();var c=this;return c.status=!c.getStatus(),c.parent[c.status?"addClass":"removeClass"]("eye-open"),c.setCookie("eye_status",c.status),c.getSize(),c.status?c.toggleText.text(b.text.reset):c.toggleText.text(b.text.norm),!1},c.prototype.toggleSize=function(c){var d=this,e=a(c.target),f=parseInt(b.list[e.attr("data-index")])||16;d.setCookie("eye_size",f),d.getSize()},c.prototype.getStatus=function(){var c=this;return c.status="true"==String(a.cookie("eye_status"))||!1,c.getSize(),c.status?c.toggleText.text(b.text.reset):c.toggleText.text(b.text.norm),c.status},c.prototype.getSize=function(){var c=this,d=parseInt(a.cookie("eye_size"))||16;c.size=16;for(var e=1;e<b.list.length;++e)d==b.list[e]&&(c.size=b.list[e]);return a("a[data-index]",c.list).each(function(d,e){var f=a(e),g=b.list[f.attr("data-index")],h=g==c.size?"addClass":"removeClass";f[h]("eye-size"),c.element.removeClass("eye-"+g),c.status&&(16==g&&(h="removeClass"),c.element[h]("eye-"+g))}),c.size},c.prototype.setCookie=function(b,c){var d=new Date;d.setMonth(d.getMonth()+1),d.getTime(),a.cookie(b,c,{expires:d,path:"/"})},new c}(jQuery),function(a){function b(){return this.each(function(){var b=a(this),d=b.data("ps.navsite");d||(d=new c(this),b.data("ps.navsite",d))})}var c=function(b){var c,d=this;return d.element=a(b),c=d.element.data(),d.button=a(c.button,d.element),d.nav=a(c.nav,d.element),d.panel=a(c.panel,d.element),d.button.on("click",d.toggleMenu.bind(d)),a("i",d.nav).on("click",d.toggleSubMenu),a(window).on("resize",function(){d.nav.removeAttr("style"),a("i",d.nav).removeAttr("style")}),d};c.prototype.toggleMenu=function(){var b=this;if(a('.open[data-plugin="navsite"]').each(function(c,d){var e=a(d).data("ps.navsite");e!=b&&e.toggleMenu()}),b.element.hasClass("open")){var c=a("i",b.nav);b.nav.stop().css({height:"auto"}).animate({height:0},500,function(){b.nav.removeAttr("style")}),c.each(function(){var b=a(this),c=b.closest("li"),d=a("> ul",c);c.hasClass("open")&&(d.stop().animate({height:0},500,function(){d.removeAttr("style")}),c.removeClass("open"))}),b.element.removeClass("open")}else{var d=b.nav.stop().css({height:"auto"}).height();b.nav.css({height:0}).animate({height:d},500,function(){b.nav.removeAttr("style")}),b.element.addClass("open")}return b},c.prototype.toggleSubMenu=function(){var b=a(this),c=b.closest("li"),d=a("> ul",c);if(c.hasClass("open"))d.stop().animate({height:0},500,function(){d.removeAttr("style")}),c.removeClass("open");else{var e=d.stop().css({height:"auto"}).height();d.css({height:0}).animate({height:e},500,function(){d.removeAttr("style")}),a("> li",c.closest("ul")).each(function(){var b=a(this),c=a("ul",b);b.hasClass("open")&&(c.stop().css({height:c.height()}).animate({height:0},500,function(){c.removeAttr("style")}),b.removeClass("open"))}),c.addClass("open")}};var d=a.fn.navsite;a.fn.navsite=b,a.fn.navsite.Constructor=c,a.fn.navsite.noConflict=function(){return a.fn.navsite=d,this},a('[data-plugin="navsite"]').each(function(){a(this).navsite()})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue()){if(clearTimeout(c.timeout),c.hoverState="out",!c.options.delay||!c.options.delay.hide)return c.hide();c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)}},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a=this.$element,b=this.options;return a.attr("data-original-title")||("function"==typeof b.title?b.title.call(a[0]):b.title)},c.prototype.getUID=function(a){do{a+=~~(1e6*Math.random())}while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&((c=a(b.currentTarget).data("bs."+this.type))||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this},a('[data-plugin="tooltip"]').tooltip({delay:{show:500,hide:100},trigger:"hover",container:"body"})}(jQuery),function(a){function b(){return this.each(function(){var b=a(this),d=b.data("ps.customselect");d||(d=new c(this),b.data("ps.customselect",d))})}var c=function(b){this.element=b;var c=a(this.element),d=c.children("option").length;c.addClass("select-hidden"),c.wrap('<div class="select"></div>'),c.after('<div class="select-styled"><span></span></div>');var e=c.next("div.select-styled");a("span",e).text(c.children("option").eq(0).text());for(var f=a("<ul />",{class:"select-options"}).insertAfter(e),g=0;g<d;g++)a("<li />",{rel:c.children("option").eq(g).val(),title:c.children("option").eq(g).text()}).append(a("<span />",{text:c.children("option").eq(g).text()})).appendTo(f);var h=f.children("li");e.click(function(b){return b.stopPropagation(),a(this).toggleClass("active"),!1}),h.click(function(b){b.stopPropagation(),a("span",e).text(a(this).text()).removeClass("active");var d=a('option[value="'+a(this).attr("rel")+'"]',c);a("option",c).each(function(){a(this).removeAttr("selected")}),d.attr({selected:"selected"}),c.val(a(this).attr("rel")),c.trigger("change"),e.removeClass("active")}),a(document).click(function(){e.removeClass("active")})},d=a.fn.customselect;a.fn.customselect=b,a.fn.customselect.Constructor=c,a.fn.customselect.noConflict=function(){return a.fn.customselect=d,this},a('[data-plugin="customselect"]').each(function(){a(this).customselect()})}(jQuery),function(a){"use strict";a.fancybox.defaults.transitionEffect="circular",a.fancybox.defaults.transitionDuration=500,a.fancybox.defaults.baseTpl='<div class="fancybox-container map-fancybox" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',window[jQuery.expando]=function(){"undefined"!=typeof google&&a(".map-wrapper-google").addClass("initialize");var b=[],c=[],d=function(b){var c=a('<div><div class="custom-img" style="background-image: url('+b.image+');"></div><div class="custom-content"><div class="custom-header"><button class="btnkoms" data-text="Смотреть фото"><span>Смотреть фото</span></button><h3>'+b.title+'</h3></div><div class="custom-body">'+b.description+"</div></div></div>");return a("button",c).data({data:b.images}).on("click",function(b){b.preventDefault(),b.stopPropagation();var c=a(this).data("data"),d=[];return a.each(c,function(a,b){d.push({src:b.image,opts:{caption:b.title,thumb:b.thumb}})}),a.fancybox.open(d,{wheel:!0,media:{youtube:{params:{autoplay:0}}},thumbs:{autoStart:!0,axis:"x",hideOnClose:!0},mobile:{thumbs:{autoStart:!1,axis:"x",hideOnClose:!0}}}),!1}),a("*",c).hyphenate("ru").hyphenate("en"),c},e=a("<a></a>",{class:"map-pogoda",href:"https://yandex.ru/pogoda/137645",target:"_blank"}).append(a("<img>",{src:"https://info.weather.yandex.net/137645/4_white.ru.png?domain=ru",alt:"Яндекс.Погода"}));if(a("#map").length){initGoogleInfoWindow();var f={lat:53.229669,lng:50.844333},g={center:f,mapTypeId:"hybrid",zoom:16,scrollwheel:!1,mapTypeControl:!0,zoomControl:!0},h=new google.maps.Map(document.getElementById("map"),g);if([{position:f,title:"Администрация сельского поселения Комсомольский",popupContent:'<p class="contentmap">446412, Самарская обл., Кинельский р-н, п. Комсомольский, ул. 50 лет Октября, д. 24</p>'}].forEach(function(a,c){var d={url:"assets/templates/komsomolskiy/images/metka.png",size:new google.maps.Size(48,74),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(24,74)},e=new google.maps.Marker({position:a.position,title:a.title,icon:d}),f=new SnazzyInfoWindow({marker:e,map:h,wrapperClass:"map-window",placement:"top-ks",content:'<div class="map-admin">'+a.popupContent+"</div>",openOnMarkerClick:!0,showCloseButton:!0,closeOnMapClick:!0,closeWhenOthersOpen:!0,padding:"30px",backgroundColor:"rgba(0, 0, 0, 0.7)",border:!1,borderRadius:"5px",shadow:!1,fontColor:"#fff",fontSize:"16px",edgeOffset:{top:10,right:10,bottom:10,left:10}});b.push(f),e.setMap(h)}),h.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(e[0]),"undefined"!=typeof photos&&"[object Array]"===Object.prototype.toString.call(photos)&&photos.length){var i=a("<select></select>",{class:"select-photo"}).append(a('<option disabled="disabled" selected="selected" value="hide">Выберите Галлерею</option>'));a.each(photos,function(e,f){var g={url:"assets/templates/komsomolskiy/images/photo-pinmap.png",size:new google.maps.Size(48,48),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(24,48)},j=new google.maps.Marker({position:f.latlang,title:f.title,icon:g}),k=d(f),l=new SnazzyInfoWindow({marker:j,map:h,wrapperClass:"gallery-window",placement:"top-ks",content:k[0],openOnMarkerClick:!0,showCloseButton:!0,closeOnMapClick:!0,closeWhenOthersOpen:!0,padding:"30px 0px 0px 0px",backgroundColor:"#fff",border:!1,borderRadius:5,maxHeight:430,shadow:!1,fontColor:"#fff",fontSize:"16px",edgeOffset:{top:10,right:10,bottom:10,left:10}}),m=a("<option></option>",{value:e,text:f.title});i.append(m),j.setMap(h),b.push(l),c[e]=j}),i.on("input change",function(d){d.preventDefault();var e=a(this).val(),f=photos[e].latlang;return h.panTo(f),a.each(b,function(a,b){b.close()}),setTimeout(function(){google.maps.event.trigger(c[e],"click")},250),!1});var j=a("<div></div>",{class:"map-control-div"}).append(a("<strong></strong>",{text:"Фотогаллереи"})).append(i);h.controls[google.maps.ControlPosition.TOP_LEFT].push(j[0]),i.customselect()}}},a(".breadcrumbs *, .sitecontent *, .sitebar *, .footer *").hyphenate("ru").hyphenate("en"),a(".carousel-slick").slick({speed:1e3,dots:!1,arrows:!0,slidesToShow:1,autoplay:!0,autoplaySpeed:3e3,fade:!0,prevArrow:'<div class="arrow prev koms-prev"></div>',nextArrow:'<div class="arrow next koms-next"></div>'});!function(){a(".btnkoms").each(function(){var b=a(this).text();a(this).attr({"data-text":b})})}()}(jQuery),function(a){"use strict"}(jQuery);