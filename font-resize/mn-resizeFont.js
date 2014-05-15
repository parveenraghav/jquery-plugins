;(function($, doc, win) {
  "use strict";
  var name = 'js-mnFontResize';
  function mnFontResize(el, options) {	
    this.$el = $(el);
    this.$el.data(name, this);
    this.defaults = {
		dWidth		:796,
		dFontSize : 16
		
    };
    var meta = this.$el.data(name + '-options');
    this.options = $.extend({},this.defaults, options, meta);	
    this.init();
	
  }

  mnFontResize.prototype={
		
		init:function(){
			var self =this;
			self.fontResize();
			self.imgResize();
			self.videoResize()
		},
		contWDiff:function(){
			var self =this;
			self.$el.wDiff = parseInt(parseInt(self.$el.width())-self.options.dWidth);
			self.$el.getWPer = ((self.$el.wDiff*100)/self.options.dWidth).toFixed(2);
		},
		fontResize:function(){
			var self =this;
				self.contWDiff();
			 self.$el.fontApply = parseFloat(((self.$el.getWPer/100)*self.options.dFontSize).toFixed(2));
			 self.$el.css('font-size',self.options.dFontSize+self.$el.fontApply+'px');
		},
		imgResize:function(){
				var self =this;
				self.contWDiff();
				self.$el.imgL=self.$el.find('img').length;
			 for(var i=0; i<self.$el.imgL; i++){
			 	self.$el.imgWidth = self.$el.find('img').eq(i).removeAttr('style').width();
			 	self.$el.imgPer = parseInt((self.$el.getWPer/100)*self.$el.imgWidth);
			 	self.$el.find('img').eq(i).css({'width':self.$el.imgWidth+self.$el.imgPer+'px','height':'auto'})
			}
			
		},
		videoResize:function(){
				var self =this;
				self.contWDiff();
				self.$el.videoL=self.$el.find('object').length;
			for(var i=0; i<self.$el.videoL; i++){
			 	self.$el.videoWidth = self.$el.find('embed').eq(i).removeAttr('style').width();
			 	self.$el.videoPer = parseInt((self.$el.getWPer/100)*self.$el.videoWidth);
			 	self.$el.videoHeight = self.$el.find('embed').eq(i).removeAttr('style').height();
			 	self.$el.videoHPer = parseInt((self.$el.getWPer/100)*self.$el.videoHeight);
			 	self.$el.find('embed').eq(i).css({'width':self.$el.videoWidth+self.$el.videoPer+'px','height':self.$el.videoHeight+self.$el.videoHPer+'px'})
			}
			
		},
		update:function(){
			var self =this;
			self.fontResize();
			self.imgResize();
			self.videoResize();
		}
	
		
 }
  
  
  $.fn.mnFontResize = function(options,callback) {
    return this.each(function() {
	   if (undefined == $(this).data('mnFontResize')) {
			var plugin = new mnFontResize(this, options);
			$(this).data('mnFontResize', plugin);
		}
    });
  };

})(jQuery, document, window);


