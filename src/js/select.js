(function($){
	/* Select Plugin */
	
	var CustomSelect = function(element){
		this.element = element;
		var $this = $(this.element),
			numberOfOptions = $this .children('option').length;
		
		$this.addClass('select-hidden'); 
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"><span></span></div>');
		
		var $styledSelect = $this.next('div.select-styled');
		$('span', $styledSelect).text($this.children('option').eq(0).text());
	  
		var $list = $('<ul />', {
			'class': 'select-options'
		}).insertAfter($styledSelect);
	  
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				rel: $this.children('option').eq(i).val(),
				title: $this.children('option').eq(i).text()
			}).append(
				$('<span />', {
					text: $this.children('option').eq(i).text()
				})
			).appendTo($list);
		}
	  
		var $listItems = $list.children('li');

	 
	  
		$styledSelect.click(function(e) {
			e.stopPropagation();
			$(this).toggleClass('active');
			return !1;
			/*
			if($('.select-options').is(':visible')) {
				e.stopPropagation();
				$('span', $styledSelect).text($(this).text()).removeClass('active');
				//$list.hide();
				$styledSelect.removeClass('active');
			} else {
				e.stopPropagation();
				$('div.select-styled.active').each(function(){
					$(this).removeClass('active');//.next('ul.select-options').hide();
				});
				$(this).toggleClass('active');//.next('ul.select-options').toggle();
			}
			*/
		});
	  
		$listItems.click(function(e) {
			e.stopPropagation();
			$('span', $styledSelect).text($(this).text()).removeClass('active');
			var $option = $('option[value="' + $(this).attr('rel') + '"]', $this);
			$('option', $this).each(function(){
				$(this).removeAttr('selected');
			});
			$option.attr({
				'selected': 'selected'
			});
			$this.val($(this).attr('rel'));
			$this.trigger('change');
			//$list.hide();
			$styledSelect.removeClass('active');
		});
		
		$(document).click(function() {
			$styledSelect.removeClass('active');
			//$list.hide();
		});
	};
	
	function Plugin() {
		return this.each(function () {
			var $this   = $(this),
				data    = $this.data('ps.customselect');
			if (!data){
				data = new CustomSelect(this);
				$this.data('ps.customselect', data);
			}
		});
	}
	
	var old 						= $.fn.customselect;
	$.fn.customselect				= Plugin;
	$.fn.customselect.Constructor 	= CustomSelect;
	$.fn.customselect.noConflict 	= function () {
		$.fn.customselect = old;
		return this;
	};
	
	$('[data-plugin="customselect"]').each(function(){
		$(this).customselect();
	});
	
}(jQuery));