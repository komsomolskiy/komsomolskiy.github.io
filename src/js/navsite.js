(function($){
	/* NavSite Plugin */
	var NavSite = function(element){
		var self = this,
			data;
		self.element = $(element);
		data = self.element.data();
		self.button = $(data.button, self.element);
		self.nav = $(data.nav, self.element);
		self.panel = $(data.panel, self.element);
		self.button.on('click', self.toggleMenu.bind(self));
		$('i', self.nav).on('click', self.toggleSubMenu);
		$(window).on('resize', function(){
			self.nav.removeAttr('style');
			$('i', self.nav).removeAttr('style');
		});
		return self;
	};
	
	NavSite.prototype.toggleMenu = function(){
		var self = this;
		$('.open[data-plugin="navsite"]').each(function(i, item){
			var data = $(item).data('ps.navsite');
			/*jshint expr:true */
			(data != self) && data.toggleMenu();
		});
		if(self.element.hasClass('open')){
			var i = $('i', self.nav);
			self.nav.stop().css({height : 'auto'}).animate({
				height: 0
			}, 500, function(){
				self.nav.removeAttr('style');
			});
			i.each(function(){
				var icon = $(this),
					li = icon.closest('li'),
					ul = $('> ul', li);
				if(li.hasClass('open')){
					ul.stop().animate({
						height: 0
					}, 500, function(){
						ul.removeAttr('style');
					});
					li.removeClass('open');
				}
			});
			self.element.removeClass('open');
		} else {
			var height = self.nav.stop().css({height: 'auto'}).height();
			self.nav.css({height: 0}).animate({
				height: height
			}, 500, function(){
				self.nav.removeAttr('style');
			});
			self.element.addClass('open');
		}
		return self;
	};
	
	NavSite.prototype.toggleSubMenu = function(){
		var icon = $(this),
			li = icon.closest('li'),
			ul = $('> ul', li);
		if(li.hasClass('open')){
			ul.stop().animate({
				height: 0
			}, 500, function(){
				ul.removeAttr('style');
			});
			li.removeClass('open');
		}else{
			var height = ul.stop().css({height: 'auto'}).height();
			ul.css({height: 0}).animate({
				height: height
			}, 500, function(){
				ul.removeAttr('style');
			});
			$('> li', li.closest('ul')).each(function(){
				var $this = $(this),
					subul = $('ul', $this);
				if($this.hasClass('open')){
					subul.stop().css({height: subul.height()}).animate({
						height: 0
					}, 500, function(){
						subul.removeAttr('style');
					});
					$this.removeClass('open');
				}
			});
			li.addClass('open');
		}
	};
	
	function Plugin() {
		return this.each(function () {
			var $this   = $(this),
				data    = $this.data('ps.navsite');
			if (!data){
				data = new NavSite(this);
				$this.data('ps.navsite', data);
			}
		});
	}
	
	var old 					= $.fn.navsite;
	$.fn.navsite				= Plugin;
	$.fn.navsite.Constructor 	= NavSite;
	$.fn.navsite.noConflict 	= function () {
		$.fn.navsite = old;
		return this;
	};
	
	$('[data-plugin="navsite"]').each(function(){
		$(this).navsite();
	});
}(jQuery));