(function($){
	/* EyeSite Plugin */
	var opts = {
			list: [16, 20, 24],
			ltext: [
				'Сброс',
				'Крупный',
				'Большой'
			],
			text: {
				norm: 'Версия для слабовидящих',
				reset: 'Полная версия'
			}
		},
		
		EyeSite = function(){
			var self = this,
				toggle,
				data;
			self.element = $("body");
			if ($('a.eye', self.element).length ) {
				self.button = $($('a.eye', self.element)[0]).addClass('eye-plugin-button');
			} else {
				self.button = $("<a></a>", {
					class: 'eye-plugin-button',
					/*jshint scripturl:true*/
					href: 'javascript:;'
				}).append($('<i></i>', {
					class: 'koms-eye'
				}));
				self.element.prepend(self.button);
			}
			
			self.button.wrap($('<div></div>', {
				class: 'eye-plugin'
			}));
			
			self.parent = $('div.eye-plugin', self.element);
			
			if($('span', self.button).length){
				self.toggleText = $($('span', self.button)[0]);
			} else {
				self.toggleText = $('<span></span>');
				self.button.append(self.toggleText);
			}
			self.toggleText.text(opts.text.norm);
			self.list = $('<ul></ul>', {
				class: 'eye-plugin-list'
			});
			$.each(opts.list, function(index, item){
				self.list.append($('<li></li>', {
					class: 'eye-plugin-list-item'
				}).append($('<a></a>', {
					class: 'eye-plugin-list-item-link',
					title: opts.ltext[index],
					text: 'Aa',
					/*jshint scripturl:true*/
					href: 'javascript:;'
				}).attr({
					'data-index': index
				})));
			});
			self.parent.append(self.list);
			self.button.on('click', self.toggleStatus.bind(self));
			$(self.list).on('click', 'a', self.toggleSize.bind(self));
			/*jshint expr:true*/
			self.size = self.getSize();
			/*jshint -W018 */
			self.status = (self.size == 16) ? false : self.getStatus();
			self.setCookie('eye_status', self.status);
			self.setCookie('eye_size', self.size);
			/*jshint expr:true*/
			self.parent[self.status ? 'addClass' : 'removeClass']('eye-open');
			
		};
		
		EyeSite.prototype.toggleStatus = function(e){
			e.preventDefault();
			var self = this;
			self.status = !self.getStatus();
			/*jshint expr:true*/
			self.parent[self.status ? 'addClass' : 'removeClass']('eye-open');
			self.setCookie('eye_status', self.status);
			self.getSize();
			self.status ? self.toggleText.text(opts.text.reset) : self.toggleText.text(opts.text.norm);
			return !1;
		};
		
		EyeSite.prototype.toggleSize = function(e){
			var self = this,
				$el = $(e.target),
				iz = parseInt(opts.list[$el.attr('data-index')]) || 16;
			self.setCookie('eye_size', iz);
			self.getSize();
		};
		
		EyeSite.prototype.getStatus = function() {
			var self = this;
			self.status = String($.cookie('eye_status')) == "true" || false;
			self.getSize();
			/*jshint expr:true */
			self.status ? self.toggleText.text(opts.text.reset) : self.toggleText.text(opts.text.norm);
			return self.status;
		};
		
		EyeSite.prototype.getSize = function(){
			var self = this,
				size = parseInt($.cookie('eye_size')) || 16;
				self.size = 16;
				for(var i = 1; i < opts.list.length; ++i){
					if(size==opts.list[i]){
						self.size = opts.list[i];
					}
				}
				$('a[data-index]', self.list).each(function(index, item){
					var $this = $(item),
						iz = opts.list[$this.attr('data-index')],
						/*jshint expr:true */
						method = iz == self.size ? 'addClass' : 'removeClass';
					$this[method]('eye-size');
					self.element.removeClass('eye-' + iz);
					if(self.status){
						iz == 16 && (method = 'removeClass');
						self.element[method]('eye-' + iz);
					}
				});
				return self.size;
		};
		
		EyeSite.prototype.setCookie = function(name, value){
			var date = new Date(),
				expires;
			date.setMonth(date.getMonth()+1);
			expires = date.getTime();
			$.cookie( name, value, {
				expires: date,
				path: '/',
			});
		};
		
		new EyeSite();
}(jQuery));