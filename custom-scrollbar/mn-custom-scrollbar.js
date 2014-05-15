;(function($, doc, win) {
  "use strict";
  var name = 'js-mnScrollbar';
  	var vhold=0, hhold =0,vflag=0,hflag=0;
  function mnScrollbar(el, options) {	
    this.$el = $(el);
    this.$el.data(name, this);
	this.Base	='<div class="vBaseWrap"><span class="vScroll"></span></div><div class="hBaseWrap"><span class="hScroll"></span></div>';
	this.defaults = {
		
    };
    var meta = this.$el.data(name + '-options');
    this.options = $.extend({},this.defaults, options, meta);	
    this.init();
}

  mnScrollbar.prototype={
		
		init:function(){
			var self =this;
			self.$el.css({'position':'relative','overflow':'hidden'}).prepend(self.Base);
			$(self.Base).hide();
			self.vFrame();
			self.hFrame();
			self.Keydown();
			
			
		},
		vFrameBasic:function(){
			var self =this;
			self.$el.scrlContentH = self.$el.children().last().outerHeight();
			if(self.$el.scrlContentH>self.$el.height()){
				self.$el.scrlH = Math.floor(self.$el.height() /(self.$el.scrlContentH/self.$el.height()));
				self.$el.find('.vBaseWrap').show();
				self.$el.find('.vBaseWrap').css('height',self.$el.height());
				self.$el.find('.vScroll').css('height',self.$el.scrlH);
			}else{
				self.$el.find('.vBaseWrap').hide();
			}
		},
		vFrame:function(){
			var self =this;
			self.vFrameBasic();
			self.vMouseDown();
		},
		vMouseDown:function(){
			var self =this;
			self.mdown = self.$el.find('.vScroll');
			self.$el.find('.vScroll').on('mousedown',function(e){
				vhold=1;
				self.$el.scrTop = self.$el.find('.vScroll').position().top;
				self.$el.mousePosTop = e.pageY;
				self.$el.vBaseTop = self.$el.find('.vBaseWrap').offset().top;
				self.$el.vScrollTop =self.$el.find('.vScroll').offset().top;
				self.$el.vScrollDiff =self.$el.mousePosTop-self.$el.vScrollTop;
				self.$el.vRScrollH =self.$el.find('.vScroll').height()-self.$el.vScrollDiff
				self.$el.sldrBtmPoint =self.$el.vBaseTop+self.$el.height()
				self.vMouseMove();
			})
		},
		vRatio:function(selfThis){
			var self =this;
				if(selfThis){self.$el=selfThis;}
				self.$el.scrlContentH = self.$el.children().last().outerHeight();
				self.$el.vPosTop =self.$el.find('.vScroll').position().top;
				self.$el.remainvBase =self.$el.find('.vBaseWrap').height()-self.$el.find('.vScroll').height();
				self.$el.finalscrCont =self.$el.scrlContentH-self.$el.height()
				self.$el.scrTMrgPer=Math.floor(self.$el.vPosTop*100/self.$el.remainvBase);
				self.$el.scrContPer = self.$el.finalscrCont*self.$el.scrTMrgPer/100;
		},
		vMouseMove:function(){
			var self =this;
			document.body.onmousemove = function(e){
				self.$el.vScrollPos =e.pageY - self.$el.vScrollDiff
				self.$el.pgeYB = e.pageY+self.$el.vRScrollH;
				self.vRatio();
				if(vhold==1 && vflag==0){
					self.$el.mTopF = e.pageY-self.$el.mousePosTop;
					self.$el.find('.vScroll').css('top',self.$el.scrTop+self.$el.mTopF);
					self.$el.children().last().css('marginTop',-self.$el.scrContPer);
				}
				if(self.$el.vScrollPos<self.$el.vBaseTop || self.$el.vPosTop<0){				
					vflag=1;
					self.$el.find('.vScroll').css('top','0');
					self.$el.children().last().css('marginTop','0');
				}else if(self.$el.pgeYB>self.$el.sldrBtmPoint|| self.$el.vPosTop>self.$el.remainvBase){
					vflag=1;
					self.$el.find('.vScroll').css('top',self.$el.remainvBase);
					self.$el.children().last().css('marginTop',-self.$el.scrContPer);
				}else{
					vflag=0;
				}
				if (window.getSelection) {
					window.getSelection().removeAllRanges();
				} else if (document.selection) {
					document.selection.empty();
				}
		
			
		}
			self.vMouseUp();
		
		},
		vMouseUp:function(){
			var self =this;
			$(document).on('mouseup',function(){
				vhold=0;
				document.body.onmousemove=null;
			});
		},
		Keydown:function(){
			var self =this;
			$(document).on('click','.mnScrollbar',function(){
				var keyUp=0, keyDown=0, keyLeft=0, keyRight=0;
				$('.mnScrollbar').removeClass('mnScrollKey');
				$(this).addClass('mnScrollKey');
				$(document).on('keydown', function(e){
					var $this= $('.mnScrollKey');
					if(e.keyCode==40 && keyDown==0){
						keyUp=0;
						e.preventDefault();
						self.vRatio($this);
						$this.find('.vScroll').css('top',$this.vPosTop+1);
						$this.children().last().css('marginTop',-$this.scrContPer);
						if($this.vPosTop>=$this.remainvBase){
							keyDown=1;
							$this.find('.vScroll').css('top',$this.remainvBase);
							$this.children().last().css('marginTop',-$this.scrContPer);
						};
					};
					if(e.keyCode==38 && keyUp==0){
						keyDown=0;
						e.preventDefault();
						self.vRatio($this);
						$this.find('.vScroll').css('top',$this.vPosTop-1);
						$this.children().last().css('marginTop',-$this.scrContPer);
						if($this.vPosTop<0){
							keyUp=1;
							$this.find('.vScroll').css('top','0');
							$this.children().last().css('marginTop','0');
						};
					};
					if(e.keyCode==39 && keyRight==0){
						
						keyLeft=0;
						e.preventDefault();
						self.hRatio($this);
						$this.find('.hScroll').css('left',$this.hPosLeft+1);
						$this.children().last().css('marginLeft',-$this.scrHContPer);
						if($this.hPosLeft>=$this.remainHBase){
							keyRight=1;
						};
					};
					if(e.keyCode==37 && keyLeft==0){
						keyRight=0;
						e.preventDefault();
						self.hRatio($this);
						$this.find('.hScroll').css('left',$this.hPosLeft-1);
						$this.children().last().css('marginLeft',-$this.scrHContPer);
						if($this.hPosLeft<0){
							keyLeft=1;
						};
					};
				
				});
				$('.mnScrollKey').on('DOMMouseScroll mousewheel', function(e){
						var $this= $('.mnScrollKey');
					 if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
						 //scroll down
						 e.preventDefault();
						self.vRatio($this);
						$this.find('.vScroll').css('top',$this.vPosTop+1);
						$this.children().last().css('marginTop',-$this.scrContPer);
						if($this.vPosTop>=$this.remainvBase){
							keyDown=1;
							$this.find('.vScroll').css('top',$this.remainvBase);
							$this.children().last().css('marginTop',-$this.scrContPer);
						};
						
					 }else {
						 //scroll up
						 e.preventDefault();
						self.vRatio($this);
						$this.find('.vScroll').css('top',$this.vPosTop-1);
						$this.children().last().css('marginTop',-$this.scrContPer);
						if($this.vPosTop<0){
							keyUp=1;
							$this.find('.vScroll').css('top','0');
							$this.children().last().css('marginTop','0');
						};
						
					 }
					return false;
				 });
			})
		},
		hFrameBasic:function(){
			var self =this;
			self.$el.scrlContentW = self.$el.children().last().outerWidth();
			if(self.$el.scrlContentW>self.$el.width()){
				self.$el.eleWidth = self.$el.width();
				self.$el.vBaseWrapW = self.$el.find('.vBaseWrap').width();
				self.$el.vBaseDis = self.$el.find('.vBaseWrap').css('display');
				if(self.$el.vBaseDis=='block'){
					self.$el.eleWidth = self.$el.width()-self.$el.vBaseWrapW;
				}else{
					self.$el.eleWidth = self.$el.width();
				}
				self.$el.scrlW = Math.floor(self.$el.eleWidth /(self.$el.scrlContentW/self.$el.eleWidth));
				self.$el.find('.hBaseWrap').show();
				self.$el.find('.hBaseWrap').css('width',self.$el.eleWidth);
				self.$el.find('.hScroll').css('width',self.$el.scrlW);
				
			}else{
				self.$el.find('.hBaseWrap').hide();
			}
		},
		hFrame:function(){
			var self =this;
			self.hFrameBasic();
			self.hMouseDown();
		},
		hMouseDown:function(){
			var self =this;
			self.$el.find('.hScroll').on('mousedown',function(e){
				hhold=1;
				self.$el.scrLeft = self.$el.find('.hScroll').position().left;
				self.$el.mousePosLeft = e.pageX;
				self.$el.hBaseLeft = self.$el.find('.hBaseWrap').offset().left;
				self.$el.hScrollLeft =self.$el.find('.hScroll').offset().left;
				self.$el.hScrollDiff =self.$el.mousePosLeft-self.$el.hScrollLeft;
				self.$el.hRScrollH =self.$el.find('.hScroll').width()-self.$el.hScrollDiff;
				self.$el.sldrRightPoint =self.$el.hBaseLeft+self.$el.find('.hBaseWrap').width();
				self.hMouseMove();
				
			})
		},
		hRatio:function(selfThis){
			var self =this;
				if(selfThis){self.$el=selfThis;}
				self.$el.scrlContentW = self.$el.children().last().outerWidth();
				self.$el.hPosLeft =self.$el.find('.hScroll').position().left;
				self.$el.remainHBase =self.$el.find('.hBaseWrap').width()-self.$el.find('.hScroll').width();
				self.$el.finalscrContH =self.$el.scrlContentW-self.$el.find('.hBaseWrap').width();
				self.$el.scrLMrgPer=Math.floor(self.$el.hPosLeft*100/self.$el.remainHBase);
				self.$el.scrHContPer = self.$el.finalscrContH*self.$el.scrLMrgPer/100;
		},
		hMouseMove:function(){
			var self =this;
			document.body.onmousemove = function(e){
				self.$el.hScrollPos =e.pageX - self.$el.hScrollDiff
				self.$el.pgeXB = e.pageX+self.$el.hRScrollH;
				self.hRatio();
				if(hhold==1 && hflag==0){
					self.$el.mLeftF = e.pageX-self.$el.mousePosLeft;
					self.$el.find('.hScroll').css('left',self.$el.scrLeft+self.$el.mLeftF);
					self.$el.children().last().css('marginLeft',-self.$el.scrHContPer);
				}
				if(self.$el.hScrollPos<self.$el.hBaseLeft || self.$el.hPosLeft<0){				
					hflag=1;
					self.$el.find('.hScroll').css('left','0');
					self.$el.children().last().css('marginLeft','0');
				}else if(self.$el.pgeXB>self.$el.sldrRightPoint|| self.$el.hPosLeft>self.$el.remainHBase){
					hflag=1;
					self.$el.find('.hScroll').css('left',self.$el.remainHBase);
					self.$el.children().last().css('marginLeft',-self.$el.scrHContPer);
				}else{
					hflag=0;
				}
				if (window.getSelection) {
					window.getSelection().removeAllRanges();
				} else if (document.selection) {
					document.selection.empty();
				}
			};
			self.hMouseUp();
		},
		hMouseUp:function(){
			var self =this;
			$(document).on('mouseup',function(){
				hhold=0;
				document.body.onmousemove=null;
			});
		},
		update:function(){
			var self =this;
			self.vFrameBasic();
			self.hFrameBasic();
		}
 }
 
 $.fn.mnScrollbar = function(options,callback) {
    return this.each(function() {
	   if (undefined == $(this).data('mnScrollbar')) {
			var plugin = new mnScrollbar(this, options);
			$(this).data('mnScrollbar', plugin);
			
		}
    });
  };
  
$(document).on('ready',function(){
	$('.mnScrollbar').mnScrollbar();
	
})
})(jQuery, document, window);

	mnScrollUpdate = function (id){
		$(id).data('mnScrollbar').update();
	};
	
$(document).on('click',function(e){
	if(!($(e.target).is('.mnScrollbar')||$(e.target).parents().is('.mnScrollbar'))){
		$('.mnScrollbar').removeClass('mnScrollKey');
		var  obj=$('.mnScrollbar');
		$(document).off('keypress',obj.data('mnScrollbar').Keydown());
		
	}
	
				
});
