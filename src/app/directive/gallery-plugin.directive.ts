import { Directive, ElementRef, OnInit, AfterContentInit, Input } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[appGalleryPlugin]'
})
export class GalleryPluginDirective {
  
  @Input() dirName:string = "";

  constructor(private elementRef: ElementRef) {}

  ngOnInit(){}

  ngAfterContentInit(){
  		var gallerifficIns = jQuery(this.elementRef.nativeElement).find('.photosite-navigation').galleriffic({
  	          imageContainerSel: jQuery(this.elementRef.nativeElement).find(".slideshow"),
  	          controlsContainerSel:  jQuery(this.elementRef.nativeElement).find(".controls"),
  	          navControlsContainerSel:  jQuery(this.elementRef.nativeElement).find(".nav"),
  	          captionContainerSel: jQuery(this.elementRef.nativeElement).find(".caption-container"),
  	          enableTopPager:true,
  	          maxPagesToShow: 4,
  	          numThumbs: 15,
              playLinkText: 'Play Slideshow',
              pauseLinkText:'Pause Slideshow',
              prevLinkText:'&lsaquo;Previous Photo',
              nextLinkText:'Next Photo &rsaquo;'
  	    });
  }

}
