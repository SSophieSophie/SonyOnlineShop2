$(function(){
	//获取该部分数据
	$.ajax({
		url:"json/nav1.json",
		type:"GET",
		success:function(data){
			var nav_oUl = $("<ul></ul>");
			nav_oUl.appendTo($("#navMore"));
			var nav_oArr = eval(data);


			var nav_arr1 = nav_oArr[0].nav1;
				for(var j = 0; j < nav_arr1.length; j++){
					var mainBtn = $("<p></p>");
					mainBtn.appendTo($("#navMain"));
					mainBtn.attr("class","divBtn")
					mainBtn.html(nav_arr1[j].btn);

					mainBtn.hover(function(){
						$("#navMain").find("p").attr("class","");
						$(this).attr("class","active");
						$("#navMain").find("div.mainDiv").eq($(this).index()).css("display","block");
					},function(){
						$("#navMain").find("p").attr("class","");
						
						$("#navMain").find("div.mainDiv").eq($(this).index()).css("display","none");
					});
	
				}

				for(var n = 0; n < nav_arr1.length; n++){
					var contentDiv = $("<div><div><h4></h4></div><div></div><ul></ul><a></a><span><strong></strong></span></div>");
					contentDiv.appendTo($("#navMain"));
					contentDiv.attr("class","mainDiv");
					contentDiv.attr("id",nav_arr1[n].id0)
					contentDiv.hover(function(){
						$(this).css("display","block")
					},function(){
						$(this).css("display","none")
					});
					contentDiv.find("div").eq(0).attr("class","titleDiv");
					contentDiv.find("div").eq(1).attr("class","proDiv");
					contentDiv.find("ul").attr("class","where");
					contentDiv.find("h4").css("background","url(" + nav_arr1[n].h4 + ")no-repeat")
					
					if(nav_arr1[n].pic1){
						contentDiv.find("a").attr("href","#");
						contentDiv.find("a").attr("class","pic");
						var img = $("<img/>");
						img.appendTo(contentDiv.find("a.pic"));
						contentDiv.find("a").find("img").attr("src",nav_arr1[n].pic1);
					};

					var proArr = nav_arr1[n].des;
					for(var p = 0; p < proArr.length; p++){
						var proDiv1 = $("<div></div>");
						proDiv1.appendTo(contentDiv.find("div.proDiv"));
						proDiv1.attr("id","div" + p)
						var proArr1 = proArr[p].main1;
						for(var q = 0; q < proArr1.length; q++){
							var proDl = $("<dl></dl>");
							proDl.appendTo(proDiv1);
							proDl.attr("id","dl" + q)
							var proDt = $("<dt><a></a></dt>");
							proDt.appendTo(proDl);
							proDt.find("a").html(proArr1[q].title);
							proDt.find("a").attr("href",proArr1[q].link)
							var proArr2 = proArr1[q].item;
							for(var r = 0; r < proArr2.length; r++){
								var proDD = $("<dd><a></a><em></em></dd>");
								proDD.appendTo(proDl);
								proDD.find("a").html(proArr2[r].name);
								proDD.find("a").hover(function(){
									$(this).css("color","#75a8e7")
								},function(){
									$(this).css("color","#000")
								});
								if(proArr2[r].tag){
									proDD.find("em").html(proArr2[r].tag);
								}
							}
						}

					}
					var menuArr = nav_arr1[n].main5;
					for(var o = 0; o < menuArr.length; o++){
						var aLi = $("<li><a></a></li>");
						aLi.find("a").html(menuArr[o].name);
						aLi.appendTo(contentDiv.find("ul.where"));
					}
					$("#menu12").find("div.proDiv").find("#div0").find("#dl0").find("dd").find("a").attr("href","html/detail.html")
				}

				var nav_arr2 = nav_oArr[1].nav2;

				for(var m = 0; m < nav_arr2.length; m++){
					var nav_aLi = $("<li></li>");
					nav_aLi.appendTo(nav_oUl);

					var n_arr1 = nav_arr2[m].aLi;
					nav_aLi.css({height:"540px",paddingLeft:"13px",borderRight:"1px dotted #ccc",background:"none"})
					for(var j = 0; j < n_arr1.length; j++){
						var n_a = $("<a></a>");
						n_a.appendTo(nav_aLi);
						n_a.html(n_arr1[j].title);
						n_a.css({font:'14px/30px ""',fontWeight:"700",color:"#4c4c4c"})
						n_a.css({display:"block", height:"30px",marginTop:"26px"})
						var n_ul = $("<ul></ul>");
						n_ul.appendTo(nav_aLi);
						n_ul.css({overflow:"hidden"});
						
						var li_arr = n_arr1[j].item;
						for(var k = 0; k < li_arr.length; k++){
					 		var n_li = $("<li><a></a></li>");
					 		n_li.appendTo(n_ul);
					 		n_li.find("a").html(li_arr[k].name);
					 		n_li.find("a").css({font:'12px/24px ""',color:"#000",height:"24px",display:"block",cursor:"pointer"});
					 		n_li.css({height:"24px",background:"none"});
					 		n_li.find("a").hover(function(){
					 			$(this).css("color","#75a8e7")
					 		},function(){
					 			$(this).css("color","#000")
					 		});
						}
					}
				}

				//当鼠标滑动到‘商品分类’和‘商品导航’时的变化
							$("ul.guide").find("li.tab").hover(function(){
								$(this).attr("class","pre tab active");
								$(this).find("i").attr("class","pab on");
								$(this).find("div.tabDiv").css("display","block");


							},function(){
								$(this).attr("class","pre tab");
								$(this).find("i").attr("class","pab normal");		
								$(this).find("div.tabDiv").css("display","none");

	});
		}
	});
	
});





