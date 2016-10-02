$(function(){
	//获取所有图片列表信息
	$.ajax({
		url:"../json/promote.json",
		type:"GET",
		success:function(data){
			var arr = eval(data).promote;
			for(var i = 0; i < arr.length; i++){
				var proA = $("<a><img /></a>");
				proA.appendTo($("div.generalInfo"));
				proA.find("img").attr("src",arr[i].imglink);
				proA.attr("href",arr[i].hyperLink)

			}
			
		}
	});
	//alert(document.body.clientHeight)
	//sideBar侧边栏：当滚动栏滑动到486px后出现固定在左侧窗口中间，left:38px
	$(window).on("scroll",function(){
		var scrollTop = $(window).scrollTop();
		
		
		if(parseInt(scrollTop) >= 486){
			$(".sideBar").css({display:"block"});
			//$(".sideBar")
		}else{
			$(".sideBar").css("display","none")
		}
	})
})




