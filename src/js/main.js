(function($){
	"use strict";
	$.fancybox.defaults.transitionEffect = "circular";
	$.fancybox.defaults.transitionDuration = 500;
	$.fancybox.defaults.baseTpl = '<div class="fancybox-container map-fancybox" role="dialog" tabindex="-1">' +
		'<div class="fancybox-bg"></div>' +
			'<div class="fancybox-inner">' +
				'<div class="fancybox-infobar">' +
					"<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" +
				"</div>" +
				'<div class="fancybox-toolbar">{{buttons}}</div>' +
				'<div class="fancybox-navigation">{{arrows}}</div>' +
				'<div class="fancybox-stage"></div>' +
				'<div class="fancybox-caption"></div>' +
			"</div>" +
		"</div>";
	window[jQuery.expando] = function(){
		if(typeof google != 'undefined'){
			$('.map-wrapper-google').addClass('initialize');
		}
		var infoWin = [],
			markers = [],
			createContent = function(data){
				var container = $('<div>' +
						'<div class="custom-img" style="background-image: url('+data.image+');">' +
						'</div>' +
						'<div class="custom-content">' +
							'<div class="custom-header">' + 
								'<button class="btnkoms" data-text="Смотреть фото">' +
									'<span>Смотреть фото</span>' +
								'</button>' +
								'<h3>' + data.title + '</h3>' +
							'</div>' +
							'<div class="custom-body">' + data.description + '</div>' +
						'</div>'+
					'</div>'),
					$btn = $('button', container);
					$btn.data({
						data: data.images
					}).on('click', function(e){
						e.preventDefault();
						e.stopPropagation();
						var data = $(this).data('data'),
							items = [];
						$.each(data, function(index, item){
							items.push({
								src: item.image,
								opts: {
									caption: item.title,
									thumb: item.thumb
								}
							});
						});
						$.fancybox.open(items, {
							wheel: true,
							media : {
								youtube : {
									params : {
										autoplay : 0
									}
								}
							},
							thumbs : {
								autoStart: true,
								axis: "x",
								hideOnClose: true,
							},
							mobile : {
								thumbs: {
									autoStart: false,
									axis: "x",
									hideOnClose: true,
								}
							}
						});
						return !1;
					});
				$('*', container).hyphenate('ru').hyphenate('en');
				return container;
			},
			pogoda = $('<a></a>', {
					class: "map-pogoda",
					href: "https://yandex.ru/pogoda/137645",
					target: "_blank"
				}).append(
					$('<img>', {
						src: "https://info.weather.yandex.net/137645/4_white.ru.png?domain=ru",
						alt: "Яндекс.Погода"
					})
				);
		if($('#map').length){
			initGoogleInfoWindow();
			var myLatLng = {lat: 53.229669, lng: 50.844333},
				myMapOptions = {
					center: myLatLng,
					mapTypeId: 'hybrid',
					zoom: 16,
					scrollwheel: false,
					mapTypeControl: true,
					zoomControl: true,
					//draggable: draggable,,
				},
				map = new google.maps.Map(document.getElementById("map"), myMapOptions),
				locations = [
					{
						position: myLatLng,
						title: 'Администрация сельского поселения Комсомольский',
						popupContent: '<p class="contentmap">446412, Самарская обл., Кинельский р-н, п. Комсомольский, ул. 50 лет Октября, д. 24</p>',
					}
				];
			
			locations.forEach( function( element, index ){
				var image = {
						url: 'assets/templates/komsomolskiy/images/metka.png',
						size: new google.maps.Size(48, 74),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(24, 74)
					},
					marker = new google.maps.Marker({
						position: element.position,
						title: element.title,
						icon: image
					}),
					infowindow = new SnazzyInfoWindow({
						marker: marker,
						map: map,
						wrapperClass: 'map-window',
						placement: 'top-ks',
						content: '<div class="map-admin">'+element.popupContent+'</div>',
						openOnMarkerClick: true,
						showCloseButton: true,
						closeOnMapClick: true,
						closeWhenOthersOpen: true,
						padding: '30px',
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
						border: false,
						borderRadius: '5px',
						shadow: false,
						fontColor: '#fff',
						fontSize: '16px',
						edgeOffset: {
							top: 10,
							right: 10,
							bottom: 10,
							left: 10
						}
					});
					infoWin.push(infowindow);
				marker.setMap(map);
			});
			map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(pogoda[0]);
			if(typeof photos != "undefined"){
				if(Object.prototype.toString.call(photos) === '[object Array]'){
					if(photos.length){
						var $options = $("<select></select>", {
							class: 'select-photo'
						}).append($('<option disabled="disabled" selected="selected" value="hide">Выберите Галлерею</option>'));
						$.each(photos, function(index, item){
							var image = {
								url: 'assets/templates/komsomolskiy/images/photo-pinmap.png',
								size: new google.maps.Size(48, 48),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(24, 48)
							},
							marker = new google.maps.Marker({
								position: item.latlang,
								title: item.title,
								icon: image
							}),
							content = createContent(item),
							infowindow = new SnazzyInfoWindow({
								marker: marker,
								map: map,
								wrapperClass: 'gallery-window',
								placement: 'top-ks',
								content: content[0],
								openOnMarkerClick: true,
								showCloseButton: true,
								closeOnMapClick: true,
								closeWhenOthersOpen: true,
								padding: '30px 0px 0px 0px',
								backgroundColor: '#fff',
								border: false,
								borderRadius: 5,
								maxHeight: 430,
								shadow: false,
								fontColor: '#fff',
								fontSize: '16px',
								edgeOffset: {
									top: 10,
									right: 10,
									bottom: 10,
									left: 10
								}
							}),
							$option = $("<option></option>", {
								value: index,
								text: item.title
							});
							$options.append($option);
							marker.setMap(map);
							infoWin.push(infowindow);
							markers[index] = marker;
						});
						$options.on('input change', function(e){
							e.preventDefault();
							var val = $(this).val(),
								latlang = photos[val].latlang;
							map.panTo(latlang);
							$.each(infoWin, function(i, iw){
								iw.close();
							});
							setTimeout(function(){
								google.maps.event.trigger(markers[val],"click");
							}, 250);
							return !1;
						});
						var controlDiv = $("<div></div>", {
								class :'map-control-div'
							}).append($("<strong></strong>", {
								text: 'Фотогаллереи'
							})).append($options);
						map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv[0]);
						$options.customselect();
					}
				}
			}
		}
	};
	$('.breadcrumbs *, .sitecontent *, .sitebar *, .footer *').hyphenate('ru').hyphenate('en');
	$('.carousel-slick').slick({
		speed: 1000,
		dots: false,
		arrows: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
		prevArrow: '<div class="arrow prev koms-prev"></div>',
		nextArrow: '<div class="arrow next koms-next"></div>'
	});
	var buttonInit = function(){
		$('.btnkoms').each(function(){
			var text = $(this).text();
			$(this).attr({
				'data-text': text
			});
		});
	};
	buttonInit();
}(jQuery));

(function($){
	"use strict";
	
}(jQuery));