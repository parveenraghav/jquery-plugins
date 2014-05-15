;(function($, doc, win) {
	"use strict";
  var name = 'js-mnSlideTop';
  var mbCssState =[] ;
  var tilCssState =[] ;
  var getFirstPosition = 0;
  function mnSlideTop(el, options) {	
    this.$el = $(el);
    this.$el.data(name, this);
    this.defaults = {
		width: '80',
		height:'82',
		titleHeight: '9',
		titleHtml:'',
		titleContent:'mn slide top',
		url:'test.html',
		onComplete:$.noop,
		skin:'slideTopSkin',
		before:$.noop,
		reverseComplete:$.noop,
		opacity:'0.8',
		oDuration:'600',
		showOn:'click',
		beforeAjax:$.noop,
		mainTop:'15',
		mTitleTop:'3',
		afterContentAppend:$.noop,
		ajaxCall:true,
		innerHtmlId:"",
		attrHref:false,
		close:'titleClose',
		maxWidth:'1400',
		maxHeight:'800',
		minWidth:'900',
		hasClose:true,
		closeFunc:$.noop,
        imgLoader:'/img/site_content/slideTopLoader.gif'
        
    };
    var meta = this.$el.data(name + '-options');
    this.options = $.extend({},this.defaults, options, meta);	
    this.init();
	
  }

  mnSlideTop.prototype={

		init:function(){
			var self =this,el= self.$el;
			$(self.$el).on(self.options.showOn,function(e){

					if ( $.isFunction( self.options.before) ) {
						self.options.before.call( this );
	    			}
	    			if($('.overlayWrapper').length<1){
					$('body').css({'overflow':'hidden','padding-right':'10px'});
					}
					 e.preventDefault();
                       if(self.options.attrHref==true)
                         self.options.url=el.attr('href');
				
					self.popUpStucture()


			})

		},
		popUpStucture:function(){
			var self =this, el= self.$el;

			if($('.overlayWrapper').length>0){
				el.getZindex = parseInt($('.overlayWrapper').css('z-index'));
			}
			
			var oWrapper = '<div class="overlayWrapper"></div>', 
				mOver 	 = '<div class="slideTopOverlay"></div>'+
						   '<div class="topSlideMainBlock"><div class="tsBlockInner"></div></div>'+
						   '<div class="topSliderTitleBlock"></div>',
				tHtml =    '<div class="titleBlockInner"><h2><div class="titleContent"></div></h2><a href="javascript:void(0)" class="titleClose"><span class="closeIcon"></span></a></div>';
				
			
			$('body').prepend(oWrapper).find('.overlayWrapper').first().prepend(mOver).find('.topSliderTitleBlock').prepend(tHtml)
			.addClass(self.options.skin).css({'top':(-self.options.titleHeight-20)+'%'}).find('.titleBlockInner').append(self.options.titleHtml).find('.titleContent').append(self.options.titleContent)
			.end().end().prev('.topSlideMainBlock').addClass(self.options.skin).css({'top':(-self.options.height-20)+'%'});


			self.cssApply();
			self.contentAppend();
			
			$('.overlayWrapper').first().css('z-index',el.getZindex+1).attr('popLevel','level-'+$('.overlayWrapper').length);
        	$('.overlayWrapper').first().on('click','.'+self.options.close, function(e){
 				if(self.options.hasClose== true){
					e.stopPropagation();
					self.popUpAnimationReverse();
					$('#'+self.options.innerHtmlId).html(el.innerDada);
				}else{
					if ( $.isFunction( self.options.closeFunc) ) {
						  self.options.closeFunc.call( self, e );
					}
				}
				
			})
            
            $(document).keyup(function(e) {
                 if(e.keyCode==27) {  
                      $('.overlayWrapper').first().find('.'+self.options.close).trigger('click');
                   }
             });

			var elmStyle = [self.options.mainTop,self.options.width,el.positionLeft,self.options.height+'%'];
			mbCssState.push(elmStyle);
			var tiltleEleStyle = [self.options.mTitleTop,self.options.width,el.positionLeft,self.options.titleHeight];
			tilCssState.push(tiltleEleStyle);

			
		},
		getElement:function(){
			var self =this, el= self.$el;
			el.olyWrapperFirst =$('.overlayWrapper').first()
			el.mainBlock=el.olyWrapperFirst.find('.topSlideMainBlock');
			el.titleBlock =el.olyWrapperFirst.find('.topSliderTitleBlock');
			el.overlayDiv=el.olyWrapperFirst.find('.slideTopOverlay');
			el.mainBlockInner=el.olyWrapperFirst.find('.tsBlockInner');
			el.positionLeft = (100-parseInt(self.options.width))/2;
			el.WindowWidth = $(window).width();

		},
		cssApply:function(){
			var self =this, el= self.$el;
			self.getElement()
			
			if(el.WindowWidth>self.options.maxWidth || el.WindowWidth<self.options.minWidth){
				el.mbTop = (self.options.maxHeight*self.options.mainTop)/100;
				el.tTop = (self.options.maxHeight*self.options.mTitleTop)/100;
				el.mbWidth = (parseInt(parseInt(self.options.maxWidth)+40)*self.options.width)/100;
				el.mbHeight = (self.options.maxHeight*self.options.height)/100;
				el.tHeight = (self.options.maxHeight*self.options.titleHeight)/100;
				el.posLeft = ($(window).width()-el.mbWidth)/2;

				el.mainBlock.css({'width':el.mbWidth,'left':el.posLeft,'height':el.mbHeight});
				el.titleBlock.css({'width':el.mbWidth,'left':el.posLeft,'height':el.tHeight});
               
			}else{
               
				el.mbTop = self.options.mainTop +'%';
				el.tTop = self.options.mTitleTop+'%';

				el.mainBlock.css({'width':self.options.width+'%','height':self.options.height+'%','left':el.positionLeft+'%'})
				el.titleBlock.css({'width':self.options.width+'%','height':self.options.titleHeight+'%','left':el.positionLeft+'%'});
			}

			self.popUpAnimation();
			self.titleLineHeightApply();

		},
		titleLineHeightApply:function(){
			var self =this, el= self.$el;
			var tilHeight = $('.topSliderTitleBlock').height()
			$('.titleContent').css({'line-height':tilHeight+'px'})
		},
		contentAppend:function(){
				var self =this, el= self.$el;
					if ( $.isFunction( self.options.afterContentAppend) ) {
						self.options.afterContentAppend.call( this );
	    			}
		},
		cssafter1600:function(){
				var self =this, el= self.$el;
				el.WindowWidth = $(window).width();
				self.scrollContent();
				
				if(el.WindowWidth>self.options.maxWidth || el.WindowWidth<self.options.minWidth){
					$('.overlayWrapper').each(function(){

						var mainW =$(this).children('.topSlideMainBlock').width();
						var mainH = $(this).children('.topSlideMainBlock').height();
						var mainT = $(this).children('.topSlideMainBlock').position().top;
						var mainL =	($(window).width()-mainW)/2;
						var mainTiileW =$(this).children('.topSliderTitleBlock').width();
						var mainTiileH =$(this).children('.topSliderTitleBlock').height();
						var mainTiileT =$(this).children('.topSliderTitleBlock').position().top;

						$(this).children('.topSlideMainBlock').css({'width':mainW,'height':mainH,'top':mainT,'left':mainL});
						$(this).children('.topSliderTitleBlock').css({'width':mainTiileW,'height':mainTiileH,'top':mainTiileT,'left':mainL});
						
					})
					
				}else{
					$('.overlayWrapper').each(function(){

							var elmStyle =$(this).attr('popLevel');
							var arrIndex=parseInt(elmStyle.replace('level-',''))-1;
							var arrIndexM= mbCssState[arrIndex];
							var arrIndexT= tilCssState[arrIndex];
							$(this).children('.topSlideMainBlock').css({'top':arrIndexM[0]+'%','width':arrIndexM[1]+'%','left':arrIndexM[2]+'%','height':arrIndexM[3]})
							$(this).children('.topSliderTitleBlock').css({'top':arrIndexT[0]+'%','width':arrIndexT[1]+'%','left':arrIndexT[2]+'%','height':arrIndexT[3]+'%'})
							var mBlockH = $(this).children('.topSlideMainBlock').height();
							var conHeight =$(this).find('.tsBlockInner').outerHeight();
							if(conHeight>mBlockH){
								$(this).children('.topSlideMainBlock').css('height',conHeight)
							}
						})
					}
		},
		conHeightCheck:function(){
				var self =this, el= self.$el;
				self.getElement()
				var mainBlockH = el.mainBlock.height();
				var contentHeight =el.mainBlockInner.outerHeight();
               	if(contentHeight>mainBlockH){
					el.mainBlock.css('height',contentHeight);
					el.overlayDiv.css('height',contentHeight+150);
				}

		},
		scrollContent:function(){
			var self =this, el= self.$el;
			getFirstPosition=0;
			if($('.overlayWrapper').length<1) return;
			var firstElem=$('.overlayWrapper').get(0);

			 firstElem.onscroll=function(){
				el.oScrollTop = $(this).scrollTop();
				if(getFirstPosition==0){
					el.titleL =$(this).find('.topSliderTitleBlock').position().left;					
					el.titleT =parseInt($(this).find('.topSliderTitleBlock').css('top'));
					el.titleW =$(this).find('.topSliderTitleBlock').width();
					el.titleBlockHeight = $(this).find('.topSliderTitleBlock').height();
					el.mBlockTop  = (parseInt($(this).find('.topSlideMainBlock').css('top')))-el.titleBlockHeight;
					getFirstPosition=1;
				}
				if(el.oScrollTop>=el.titleT){
					$(this).find('.topSliderTitleBlock').css({'position':'fixed','top':'0','left':el.titleL,'width':el.titleW});
					$(this).find('.titleBlockInner').css({'opacity':'0.9'});
				}else{
					$(this).find('.topSliderTitleBlock').css({'position':'absolute','top':el.titleT,'left':el.titleL});
					$(this).find('.titleBlockInner').css({'opacity':''});
				}

				if(el.oScrollTop>el.mBlockTop){
						if($('.setFixPosition:first').length >0){
							$('.setFixPosition:first').css({'position':'fixed','top':el.titleBlockHeight,'left':el.titleL,'width':el.titleW,'z-index':'1','opacity':'0.9'});
						}
						
					}else{
						if($('.setFixPosition:first').length >0){
							$('.setFixPosition:first').css({'position':'absolute','top':0,'left':0,'width':'100%'});
						}
						
					}
			}
		
			
			
		},

		updateOverlay:function(){
			var self =this, el= self.$el;
			$('.slideTopOverlay').each(function(){
				var windowH = $(window).height();
				var $thisH = $(this).outerHeight();
				var $contH =$(this).next('.topSlideMainBlock ').outerHeight();
				if(windowH>$thisH){
					$(this).css('height','100%')
				}
				else{
					$(this).css('height',$contH+150);
                    
				}

			})
		},
		popUpAnimation:function(){
			var self =this, el= self.$el;
				el.overlayDiv.animate({opacity:self.options.opacity},200,function(){
					el.mainBlock.animate({top:el.mbTop},400,function(){
						el.titleBlock.animate({top:el.tTop},100,function(){
							//el.overlayDiv.animate({opacity:0},100);
							//console.log(el.overlayDiv);
							//el.overlayDiv.click();
                            el.olyWrapperFirst.find(el.mainBlockInner).html("<div style='text-align:center; margin-top:10%;'><img style='left: 50%; top: 50%;' src='" + self.options.imgLoader + "' /></div>");
                            
							if(self.options.ajaxCall==true){
								if ( $.isFunction( self.options.beforeAjax) ) {
						  			self.options.beforeAjax.call( el );
								}
							$.ajax({
						  		url: self.options.url,
						  		cache: false
							}).done(function(htmldata) {
								htmldata='<a href="javascript:void(0)" class="popup-focus" ></a>'+htmldata;
								el.olyWrapperFirst.find(el.mainBlockInner).html(htmldata);
						  		self.conHeightCheck();
						  		self.scrollContent();

						  		if ( $.isFunction( self.options.onComplete ) ) {
						  			self.options.onComplete.call( el );
    							}
    							el.mainBlock.find('a.popup-focus').focus();
    							

							});
						}else{
								if ( $.isFunction( self.options.beforeAjax) ) {
						  			self.options.beforeAjax.call( el );
								}
								el.innerDada  = $('#'+self.options.innerHtmlId).html();
								 $('#'+self.options.innerHtmlId).empty();
								el.olyWrapperFirst.find(el.mainBlockInner).html(el.innerDada);

								self.conHeightCheck();
						  		self.scrollContent();

						  		if ( $.isFunction( self.options.onComplete ) ) {
						  			self.options.onComplete.call( el );
    							}

						}
						
						});
					
					})
				})
		},
		popUpAnimationReverse:function(){
			var self =this, el= self.$el;
			el.currentHeight = el.mainBlock.height();
			el.titleBlock.animate({'top':(-self.options.titleHeight-20)+'%'},100,function(){
				$(this).remove();
				el.mainBlock.animate({'top':-el.currentHeight},300,function(){
					$(this).remove();
					el.overlayDiv.animate({opacity:0},self.options.oDuration,function(){
						$(this).remove();
						el.olyWrapperFirst.remove();
						getFirstPosition=0;
						if($('.overlayWrapper').length==0){
							$('body').css({'overflow':'','padding-right':''});
						}
						
						if ( $.isFunction( self.options.reverseComplete) ) {
							self.options.reverseComplete.call( this );
    					}
					})
				})
			})
		},
		update:function(){
			var self =this, el= self.$el;
			self.titleLineHeightApply();/*--- update title text line height---*/
			self.cssafter1600()
			self.scrollContent();
			self.updateOverlay();


			//self.contentAppend();

		}

 }
  
  $.fn.mnSlideTop = function(options,callback) {
    return this.each(function() {
	   if (undefined == $(this).data('mnSlideTop')) {
			var plugin = new mnSlideTop(this, options);
			$(this).data('mnSlideTop', plugin);
		}
    });
  };
})(jQuery, document, window);



