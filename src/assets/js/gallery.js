function initGallery(targetGallery,currentFolderNm){
	// Initialize Minimal Galleriffic Gallery
	if(typeof window[currentFolderNm] == "undefined"){
		var gallerifficIns = targetGallery.find('.photosite-navigation').galleriffic({
			imageContainerSel:       '#slideshow',
			ssControlsContainerSel:  '#'+ currentFolderNm + 'controls',
			navControlsContainerSel: '#'+ currentFolderNm + 'nav',
			captionContainerSel:      '#'+ currentFolderNm + 'caption',
		});
		window[currentFolderNm] = gallerifficIns;
		window.currentGallery = currentFolderNm;
	}
}

/*var $imageGroup = $(".thumb > img");
$imageGroup.eq($imageGroup.length - 1).on('load',function(){
    initGallery();
});
$imageGroup.on('load',function(){
    $(this).css({"height":"auto"});
});

function callByIndex(index){
	var sourcePath = $imageGroup.eq(index).data("src");
	$imageGroup.eq(index).attr("src",sourcePath);
	$imageGroup.eq(index).on('load',function(){
		if(index + 1 < $imageGroup.length) callByIndex(index+1);
	});
}*/

function compileGalleryData(e){
	//console.log(e);
	var currentFolderNm = $(e.currentTarget).data("dirname");
	//check subfolder or not
	/*var rawData = $(".allAllbumns").data("items");
	$.each(rawData,function(key,value){
	});*/
	var targetGallery = $("[callid = '"+ currentFolderNm + "']");
	$("[callid]").hide();
	$(".allAllbumns > li,.groupPermission").hide(); 
	$("[callid = '"+ currentFolderNm +"']").show();
	targetGallery.find('div.photosite-navigation').css({'width' : '300px', 'float' : 'left'});
	$('div.photosite-content').css('display', 'block');	
	initGallery(targetGallery,currentFolderNm);
}

function fillterSecondLayerLinks(e){
	var currentDirNm = $(e.currentTarget).data("dirname");
	$("[firstLayerCallId],[firstlayerid],.groupPermission").hide();
	var targetLinks = $("[firstLayerCallId = '"+ currentDirNm + "']");
	targetLinks.show();
}

function getCurrentParentDir(){
	var currentDirLength = window.currentGallery.split("dash").length;
	return  window.currentGallery.split("dash")[currentDirLength-2];
}

function backToDefault(e){
	if($(".allAllbumns > li[firstlayerid]").length){
		if($(".allAllbumns >li[firstlayerid]").is(":visible")){
			window.location.href= "/api/photosite/"; 
		}else{
			if($(".allAllbumns >li[firstlayercallid]").is(":visible")){
				$(".allAllbumns > li[firstlayercallid]").hide(); 
				$(".allAllbumns > li[firstlayerid]").show(); 
				$(".groupPermission").show(); 
			}else{
				$(".allAllbumns > li,[callid],div.photosite-content,.groupPermission").hide(); 
				var currentTargetntGallery = getCurrentParentDir();
				var targetLinks = $("[firstlayercallid = '"+ currentTargetntGallery + "']");
				targetLinks.show();
			}
		}
	}else{
		if($(".allAllbumns >li").is(":visible")){
			window.location.href= "/api/photosite/"; 
		}else{
			$("[callid],div.photosite-content").hide();
			$(".allAllbumns > li").show(); 
			$(".groupPermission").show(); 
		}
	}	
}

jQuery(function($){
	$(".galleryFolder").click(compileGalleryData);
	$(".firstLayerLink").click(fillterSecondLayerLinks);
	$(".backBtn").click(backToDefault);

	var $addGroupBtn = $(".addGroupBtn");
	$addGroupBtn.click(function(){
		$("#addGroupName").show(function(){
			$addGroupBtn.hide();
		});
	});	

});