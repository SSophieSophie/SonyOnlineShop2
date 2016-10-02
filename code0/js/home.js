window.onload = function(){
	/*---------scrollNav-------*/
	$(window).on("scroll",function(){
		var scrollTop = $(window).scrollTop();
		if(parseInt(scrollTop) >= 300){
			$("div.scrollNav").css({display:"block",position:"fixed",top:"0px",zIndex:50})
		}else{
			$("div.scrollNav").css({display:"none"})
		}
	})

	/*---------banner-------*/
	
	var timer1 = null;
	var iNow = 0;
	var viewWidth = $(window).width();
	if(viewWidth <= 1210){
		viewWidth = 1210
	}else{
		viewWidth = $(window).width();
	}
	var aLi1 = $("<li><a><img/></a></li>");
	aLi1.find("img").attr("src","images/images_home/banner/kv_ylxd.jpg");
	aLi1.appendTo($("#bannerDiv").find("ul"));
	$("#bannerDiv").find("a").find("img").css("width",viewWidth);
	$("#bannerDiv").find("ul").css("width",viewWidth * 4 + "px")
	//alert(viewWidth +","+ $("#bannerDiv").find("a").find("img").css("width") + "," + $("#bannerDiv").find("ul").css("width"))
		//点击下面三个切换按钮，跳转到对应图片
		$("#btn").find("a").on("click",function(){
			clearInterval(timer1)
			iNow = $(this).index();
			tab();

		});
		
		var timer1 = setInterval(move,2000)

		function tab(){
			$("#btn").find("a").attr("class","");
			$("#btn").find("a").eq(iNow).attr("class","active");
			if(iNow == 3){
				iNow = 0;
				$("#btn").find("a").eq(0).attr("class","active");
			}
			$("#bannerDiv").find("ul").animate({left:- iNow * viewWidth},function(){
				if(iNow == 3){
					iNow = 0;
					$("#bannerDiv").find("ul").css("left", 0);
				}
			});
		}
		function move(){
			iNow ++
			tab();
		}

		act_getData();
		/*----------activity JSON部分--------*/
		function act_getData(){
			ajax("get","json/activity.json","",function(data){
				var oDiv0 = document.getElementById("activity_div0"); 
				var act_oUl = document.createElement("ul");
					act_oUl.className = "act_ul";
					oDiv0.appendChild(act_oUl);
				
				var act_arr = JSON.parse(data).act_data;
				for(var i = 0; i < act_arr.length; i++){
					var act_aLi = document.createElement("li");
					act_oUl.appendChild(act_aLi);
					var newAct_arr = act_arr[i].pic;
					for(var j = 0; j < newAct_arr.length; j++){
						var act_a = document.createElement("a");
						act_aLi.appendChild(act_a);
						var act_img = document.createElement("img");
						act_a.appendChild(act_img);
						act_img.src = newAct_arr[j].img_link;
					}	
				}
				/*----------activity 运动部分--------*/
				var divBtn1 = document.getElementById("activity_btn");
				var aA1 = divBtn1.getElementsByTagName("a");
				var left1 = document.getElementById("left1");
				var right1 = document.getElementById("right1");
				var iNow1 = 0;
				var imgWidth1 = 1210;
				var iSpeed1 = - imgWidth1;
				
				act_oUl.style.width = act_aLi.length * imgWidth1 * 2 + "px";
				act_oUl.innerHTML += act_oUl.innerHTML;

				for(var i = 0; i < aA1.length; i++){
			 		aA1[i].index = i;
			 		addEvent(aA1[i],"click",changeColor1);
			 	};
			 	function changeColor1(){
			 		for(var i = 0; i < aA1.length; i++){
			 			aA1[i].className = "";
			 		}
			 		this.className = "active";
			 		startMove(act_oUl,{left:- this.index * imgWidth1})
			 	};

				addEvent(left1,"click",left1Click)
				function left1Click(){
				 	clearInterval(timer2);
				 	iSpeed1 = Math.abs(iSpeed1);
				 	toRun1();
				};
				
				addEvent(right1,"click",right1Click)
				function right1Click(){
				 	clearInterval(timer2);
				 	iSpeed1 = - Math.abs(iSpeed1);
				 	toRun1();
				 };
				var timer2 = setInterval(toRun1,3000)
				function toRun1(){
					if(iNow1 == 2){
						iNow1 = 0;
					}else{
						iNow1++;
					}
					for(var i = 0; i < aA1.length; i++){
						aA1[i].className = "";
					}
					aA1[iNow1].className = "active";
					if(act_oUl.offsetLeft < - act_oUl.offsetWidth / 2){
						act_oUl.style.left = 0;
					}else if(act_oUl.offsetLeft > 0){
						act_oUl.style.left = - act_oUl.offsetWidth / 2 +"px"; 
					}
					startMove(act_oUl,{left:act_oUl.offsetLeft + iSpeed1})
				}
					
					});
				}
		

	//获取新品部分JSON数据
	ajax("get","json/new_product.json","",function(data){
		var np_oDiv = document.getElementById("np_div")
		var np_arr = JSON.parse(data).np_data;
		for(var i = 0; i < np_arr.length; i++){
			var np_a = document.createElement("a");
			np_oDiv.appendChild(np_a)
			np_a.href = np_arr[i].hyperLink;
			var np_img = document.createElement("img");
			np_img.src = np_arr[i].link;
			np_a.appendChild(np_img);
			var np_oDiv1 = document.createElement("div");
			np_a.appendChild(np_oDiv1);

			var np0_h4 = document.createElement("h4");
			np_oDiv1.appendChild(np0_h4);
			np0_h4.innerHTML = np_arr[i].title_1;
			
			var np1_h4 = document.createElement("h4");
			np1_h4.innerHTML = np_arr[i].title_2;
			np_oDiv1.appendChild(np1_h4);

			var np_p1 = document.createElement("p");
			np_p1.innerHTML = np_arr[i].title_3;
			np_oDiv1.appendChild(np_p1);

			var np_p2 = document.createElement("p");
			np_p2.innerHTML = np_arr[i].title_4;
			np_oDiv1.appendChild(np_p2);

			var np_span = document.createElement("span");
			np_span.innerHTML = np_arr[i].price;
			np_oDiv1.appendChild(np_span);
		}
		
	})

	//获取数码产品VIDEO部分数据
	ajax("get","json/video1.json","",function(data){
		var vi_arr0 = JSON.parse(data);
		for(var i = 0; i < vi_arr0.length; i++){
			//创建left大块div
			var vi_oDiv = $("<div></div>");
			$("#v_div").append(vi_oDiv);
			vi_oDiv.attr("class","outer3")
			$("#v_div").find("div.outer3").eq(0).attr("class","outer3 vd_left");
			$("#v_div").find("div.outer3").eq(1).attr("class","outer3 vd_right");

			var vi_arr1 = vi_arr0[i]._data1;
			for(var j = 0; j < vi_arr1.length; j++){
				var vi_oDiv1 = $("<div></div>");
				vi_oDiv1.appendTo(vi_oDiv);
				vi_oDiv1.attr("class","inner3");
				$("#v_div").find("div.outer3").find("div.inner3").eq(1).attr("class","inner3 vdr_right1")
				
				var vi_arr2 = vi_arr1[j].inner;
				for(var k = 0; k < vi_arr2.length; k++){
					var vi_a = $("<a><div><p></p><span></span></div><i></i><img/></a>")
					vi_a.appendTo(vi_oDiv1);
					vi_a.attr("class",vi_arr2[k].className);
					vi_a.css({"position":"relative","display":"block"});
					vi_a.find("div").css({"position":"absolute","left":"21px","top":"21px"});
					vi_a.find("div").attr("class","pab_div");
					//创建标题
					vi_a.find("div").find("p").html(vi_arr2[k].name);
					//创建描述
					var vi_arr3 = vi_arr2[k].title;
					for(var l = 0; l < vi_arr3.length; l++){
						var vi_h4 = $("<h4></h4>");
						vi_h4.insertBefore(vi_a.find("span"));
						vi_h4.html(vi_arr2[k].title);
					};					
					//创建价格
					vi_a.find("div").find("span").html(vi_arr2[k].price);
					//插入图片
					vi_a.find("img").attr("src",vi_arr2[k].imglink);
					vi_a.find("img").css("position","absolute");
					//插入标签
					vi_a.find("i").css("background","url(" + vi_arr2[k].lable1 + ") no-repeat");
				}
			}
		}
		$("#v_div").find("a").css("overflow","hidden");

		//左边所有图片缩放
		var au_aA1 = $(".vd_left").find("a");

		au_aA1.eq(0).hover(function(){
			au_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0});
		});

		au_aA1.eq(1).hover(function(){
			au_aA1.eq(1).find("img").animate({width:330,height:266,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(1).find("img").animate({width:320,height:256,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(2).hover(function(){
			au_aA1.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(3).hover(function(){
			au_aA1.eq(3).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(3).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(4).hover(function(){
			au_aA1.eq(4).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(4).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边小块div移动
		var au_aA2 = $(".vdr_right1").find("a");

		au_aA2.eq(0).hover(function(){
			au_aA2.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA2.eq(1).hover(function(){
			au_aA2.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边大块移动
		var au_aA3 = $("#v_div").find("div.vd_right").find("a");
		au_aA3.eq(2).hover(function(){
			au_aA3.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0});
		});

		au_aA3.eq(3).hover(function(){
			au_aA3.eq(3).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(3).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(4).hover(function(){
			au_aA3.eq(4).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(4).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(5).hover(function(){
			au_aA3.eq(5).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(5).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
	
		});				
	});
	
	//通过JSON获取audio部分数据
	ajax("get","json/audio1.json","",function(data){
		var v_arr0 = JSON.parse(data);
		for(var i = 0; i < v_arr0.length; i++){
			
			//创建left大块div
			var vd_oDiv = $("<div></div>");
			$("#a_div").append(vd_oDiv);
			vd_oDiv.attr("class","outer2")
			$("#a_div").find("div.outer2").eq(0).attr("class","outer2 vd_left");
			$("#a_div").find("div.outer2").eq(1).attr("class","outer2 vd_right");

			var v_arr1 = v_arr0[i]._data4;
			for(var j = 0; j < v_arr1.length; j++){
				var vd_oDiv1 = $("<div></div>");
				vd_oDiv1.appendTo(vd_oDiv);
				vd_oDiv1.attr("class","inner2");
				$("#a_div").find("div.outer2").find("div.inner2").eq(1).attr("class","inner2 vdr_right1")
				
				var v_arr2 = v_arr1[j].inner;
				for(var k = 0; k < v_arr2.length; k++){
					var vd_a = $("<a><div><p></p><h4></h4><span></span></div><i></i><img/></a>")
					vd_a.appendTo(vd_oDiv1);
					vd_a.attr("class",v_arr2[k].className);
					vd_a.css({"position":"relative","display":"block"});
					vd_a.find("div").css({"position":"absolute","left":"21px","top":"21px"});
					vd_a.find("div").attr("class","pab_div");
					//创建标题
					vd_a.find("div").find("p").html(v_arr2[k].name);
					//创建描述
					vd_a.find("div").find("h4").html(v_arr2[k].title);
					//创建价格
					vd_a.find("div").find("span").html(v_arr2[k].price);
					//插入图片
					vd_a.find("img").attr("src",v_arr2[k].imglink);
					vd_a.find("img").css("position","absolute");
					//插入标签
					vd_a.find("i").css("background","url(" + v_arr2[k].lable1 + ") no-repeat");

				}
			}

		}
		
		$("#a_div").find("a").css("overflow","hidden");

		//左边所有图片缩放
		var au_aA1 = $("#a_div").find(".vd_left").find("a");

		au_aA1.eq(0).hover(function(){
			au_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0});
		});

		au_aA1.eq(1).hover(function(){
			au_aA1.eq(1).find("img").animate({width:610,height:304,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(1).find("img").animate({width:600,height:294,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(2).hover(function(){
			au_aA1.eq(2).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(2).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(3).hover(function(){
			au_aA1.eq(3).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(3).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(4).hover(function(){
			au_aA1.eq(4).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(4).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边小块div移动
		var au_aA2 = $(".vdr_right1").find("a");

		au_aA2.eq(0).hover(function(){
			au_aA2.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA2.eq(1).hover(function(){
			au_aA2.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边大块移动
		var au_aA3 = $("#a_div").find(".vd_right").find("a");
		au_aA3.eq(2).hover(function(){
			au_aA3.eq(2).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(2).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0});
		});

		au_aA3.eq(3).hover(function(){
			au_aA3.eq(3).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(3).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(4).hover(function(){
			au_aA3.eq(4).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(4).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(5).hover(function(){
			au_aA3.eq(5).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(5).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
	
		});				

	});
	
	ajax("get","json/tv1.json","",function(data){
		var tv_arr0 = JSON.parse(data);
		for(var i = 0; i < tv_arr0.length; i++){
			var tv_oDiv = $("<div></div>");
			tv_oDiv.appendTo($("#tv_div"));
			tv_oDiv.attr("class","outer1")
			$("#tv_div").find("div.outer1").eq(0).attr("class","outer1 tv_left");
			$("#tv_div").find("div.outer1").eq(1).attr("class","outer1 tv1_right");
			$("#tv_div").find("div.outer1").eq(2).attr("class","outer1 tv2_right");
			var tv_arr1 = tv_arr0[i]._data7;
			for(var j = 0; j < tv_arr1.length; j++){
				var tv_oDiv1 = $("<div></div>");
				tv_oDiv1.appendTo(tv_oDiv);
				tv_oDiv1.attr("class","inner1");
				//alert(tv_oDiv1.find("div.inner1").size())
				$("#tv_div").find("div.outer1").find("div.inner1").eq(1).attr("class","inner1 tv1_left")
				var tv_arr2 = tv_arr1[j].inner;
				for(var k = 0; k < tv_arr2.length; k++){
					var tv_a = $("<a><img/><div><p></p><span></span></div><i></i></a>");
					tv_a.appendTo(tv_oDiv1);
					tv_a.css("display","block");
					tv_a.attr("class",tv_arr2[k].className);
					tv_a.find("img").attr("src",tv_arr2[k].imglink);
					tv_a.find("div").attr("class","tva_div")
					tv_a.find("div").css({"position":"absolute","left":"20px","top":"20px"})
					tv_a.find("p").html(tv_arr2[k].name);
					tv_a.find("span").html(tv_arr2[k].price);

					var tv_arr3 = tv_arr2[k].title;
					for(var l = 0; l < tv_arr3.length; l++){
						var tv_h4 = $("<h4></h4>");
						tv_h4.insertBefore(tv_a.find("div").find("span"));
						tv_h4.html(tv_arr3[l].des)
					}
					tv_a.find("i").css({"background":"url(" + tv_arr2[k].lable1 + ") no-repeat left center"});
				}
			}

			$("#tv_div").find("a").find("img").eq(1).css({"right":"10px","bottom":"10px"});
			$("#tv_div").find("div.tv1_left").find("img").css({"right":"10px","bottom":"10px"});
			$("#tv_div").find("div.tv1_right").find("img").css({"right":"10px","bottom":"10px"});
			$("#tv_div").find("a.tv_right7").find("img").eq(0).css({"right":"10px","bottom":"10px"});
			$("#tv_div").find("a.tv_right8").find("img").eq(0).css({"right":"10px","bottom":"10px"});
			$("#tv_div").find("a").css("position","relative");
			$("#tv_div").find("a").find("img").css("position","absolute");
			$("#tv_div").find("a").find("i").css({"position":"absolute","display":"block"});
		}		
		
		//左边1,2 移动
		var tv_aA1 = $(".tv_left").find("a");

		tv_aA1.eq(0).hover(function(){
			tv_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
		});

		tv_aA1.eq(1).hover(function(){
			tv_aA1.eq(1).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA1.eq(1).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		//左边3,4
		var tv_aA2 = $(".tv1_left").find("a");

		tv_aA2.eq(0).hover(function(){
			tv_aA2.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA2.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		tv_aA2.eq(1).hover(function(){
			tv_aA2.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA2.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//中间1,2,3,4
		var tv_aA3 = $(".tv1_right").find("a");

		tv_aA3.eq(0).hover(function(){
			tv_aA3.eq(0).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(0).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
		});

		tv_aA3.eq(1).hover(function(){
			tv_aA3.eq(1).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(1).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		tv_aA3.eq(2).hover(function(){
			tv_aA3.eq(2).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(2).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		tv_aA3.eq(3).hover(function(){
			tv_aA3.eq(3).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(3).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});
		//右边 5,6,7,8
		var tv_aA4 = $(".tv2_right").find("a");
		tv_aA4.eq(0).hover(function(){
			tv_aA4.eq(0).find("img").animate({width:305,height:305,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA4.eq(0).find("img").animate({width:295,height:295,marginTop:0,marginLeft:0})
		});

		tv_aA4.eq(3).hover(function(){
			tv_aA4.eq(3).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA4.eq(3).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		tv_aA4.eq(2).hover(function(){
			tv_aA4.eq(2).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA4.eq(2).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});
	});

	//智能手机部分
	ajax("get","json/phone1.json","",function(data){
		var ph_arr0 = JSON.parse(data);
		//生成左右两大部分
		for(var i = 0; i < ph_arr0.length; i++){
			var ph_oDiv = $("<div></div>");
			ph_oDiv.attr("class","outer")
			$("#s_div").append(ph_oDiv);
			$("#s_div").find("div.outer").eq(0).attr("class","outer ph_left");
			$("#s_div").find("div.outer").eq(1).attr("class","outer ph_right");
			
			var ph_arr1 = ph_arr0[i]._data11;
			for(var j = 0; j < ph_arr1.length; j++){
				var ph_oDiv1 = $("<div></div>");
				ph_oDiv1.appendTo(ph_oDiv);
				ph_oDiv1.attr("class","inner");
				$("div.inner").eq(2).attr("class","inner ph1_right");
				
				var ph_arr2 = ph_arr1[j].right1;
				for(var k = 0; k < ph_arr2.length; k++){

					var ph_a = $("<a><img/><div><p></p><span></span></div></a>");
					ph_a.appendTo(ph_oDiv1);
					ph_a.attr("class",ph_arr2[k].className);
					//添加图片
					ph_a.find("img").attr("src",ph_arr2[k].imglink);
					ph_a.find("p").html(ph_arr2[k].name);
					ph_a.find("span").html(ph_arr2[k].price);

					var ph_arr3 = ph_arr2[k].title;
					for(var l = 0; l < ph_arr3.length; l++){
						var ph_h4 = $("<h4></h4>");
						ph_h4.insertBefore(ph_a.find("div").find("span"));
						ph_h4.html(ph_arr3[l].des)
					}					
				}
			}
		}
		$("#s_div").find("a.ph_right2").find("img").eq(0).css({"right":"10px","bottom":"10px"});

		$("#s_div").find("a.ph_right3").find("img").eq(0).css({"right":"10px","bottom":"10px"});

		$("#s_div").find("a.ph_right4").find("img").eq(0).css({"right":"10px","bottom":"10px"});

		$("#s_div").find("a").css({"display":"block","overflow":"hidden","position":"relative"});
		
		$("#s_div").find("a").find("img").css("position","absolute");
		$("#s_div").find("a").find("div").css({"position":"absolute","left":"20px","top":"20px"});
		

		//左边添加图片缩放
		var ph_aA1 = $(".ph_left").find("a");

		ph_aA1.eq(0).hover(function(){
			ph_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
		});

		//右边第一张添加图片缩放
		var ph_aA2 = $(".ph_right").find("a");

		ph_aA2.eq(0).hover(function(){
			ph_aA2.eq(0).find("img").animate({width:610,height:305,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA2.eq(0).find("img").animate({width:600,height:295,marginTop:0,marginLeft:0})
		});

		//右边第2,3张
		var ph_aA3 = $(".ph1_right").find("a"); 
		ph_aA3.eq(0).hover(function(){
			ph_aA3.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA3.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		ph_aA3.eq(1).hover(function(){
			ph_aA3.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA3.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		//右边第4张
		var ph_aA4 = $("a.ph_right4");
		ph_aA4.eq(0).hover(function(){
			ph_aA4.eq(0).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA4.eq(0).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
		});
	});

	ajax("get","json/club.json","",function(data){
		var c_oDiv = $("<div></div>");
		$("#c_div").append(c_oDiv);
		c_oDiv.attr("class","c_left"); 

		var c_arr1 = JSON.parse(data)._data15;
		for(var i = 0; i < c_arr1.length; i++){
			var c_a = $("<a></a>");
			c_a.appendTo(c_oDiv);
			c_a.attr("class",c_arr1[i].className);

			var c_img = $("<img/>");
			c_img.appendTo(c_a);
			c_img.attr("src",c_arr1[i].imglink);

			
		}


		var c_oDiv1 = $("<div></div>");
		$("#c_div").append(c_oDiv1);
		c_oDiv1.attr("class","c_right");

		var c_arr2 = JSON.parse(data)._data16;
		for(var i = 0; i < c_arr2.length; i++){
			var c_a = $("<a></a>");
			c_a.appendTo(c_oDiv1);
			c_a.attr("class",c_arr2[i].className);

			var c_img = $("<img/>");
			c_img.appendTo(c_a);
			c_img.attr("src",c_arr2[i].imglink)
		}

		$("#c_div").find("a").css("display","block");
		$("#c_div").find("a").css("overflow","hidden");

		//左边所有的运动
		var c_aA1 = $(".c_left").find("a");
		c_aA1.eq(0).hover(function(){
			c_aA1.eq(0).find("img").animate({width:610,height:305,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(0).find("img").animate({width:600,height:295,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(1).hover(function(){
			c_aA1.eq(1).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(1).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(2).hover(function(){
			c_aA1.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(3).hover(function(){
			c_aA1.eq(3).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(3).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(4).hover(function(){
			c_aA1.eq(4).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(4).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		var c_aA2 = $(".c_right").find("a");
		c_aA2.eq(0).hover(function(){
			c_aA2.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA2.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
		});

		c_aA2.eq(1).hover(function(){
			c_aA2.eq(1).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA2.eq(1).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA2.eq(2).hover(function(){
			c_aA2.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA2.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});
	});

	//公关文部分
	ajax("get","json/pr.json","",function(data){
		var pr_arr = JSON.parse(data)._data17;
		for(var i = 0; i < pr_arr.length; i++){
			var pr_a = $("<a><img/><p></p><span></span></a>");
			pr_a.appendTo($(".pr").find(".wrap").find(".essay"));
			pr_a.css("float","left")
			pr_a.find("img").attr("src",pr_arr[i].imglink);
			pr_a.find("p").html(pr_arr[i].name);
			pr_a.attr("class",pr_arr[i].className);
			pr_a.find("span").html(pr_arr[i].des);
			pr_a.attr("href","#");
		}
	});
	 //给公关部分添加事件
	 $(".pr").find(".others").find("a").hover(function(){
	 	$(this).find("img.on").css("display","block");
	 	$(this).find("img.normal").css("display","none");
	 },function(){
	 	$(this).find("img.on").css("display","none");
	 	$(this).find("img.normal").css("display","block");
	 });

	 //获取NEWs新闻通知部分的数据
	 ajax("get","json/news.json","",function(data){
	 	var n_oUl = $("<ul></ul>");
	 	n_oUl.appendTo($("div.news").find("div.news_titles"));
	 	var n_arr = JSON.parse(data)._data18;
	 	for(var i = 0; i < n_arr.length; i++){
	 		var n_aLi = $("<li><p></p><a></a></li>");
	 		n_aLi.appendTo(n_oUl);
	 		n_aLi.find("p").html(n_arr[i].date);
	 		n_aLi.find("a").html(n_arr[i].title);
	 		n_aLi.find("a").attr("href",n_arr[i].link)
	 	}
	 });

//给侧边栏添加运动
			//首先一直在正中间 离浏览器右边框75px
			$(window).on("scroll",function(){
				var side_viewHeight = $(window).height();
				var nodeHeight = $("ul.sideBar").height();
				var scrollTop = $(window).scrollTop();
				if(scrollTop >= 2032){
					$("ul.sideBar").css({display:"block"});
					//$("ul.sideBar").css({position:"sticky",right:"75px", top:"50%", marginTop:"-109px"})
					$("ul.sideBar").animate({right:75, top:parseInt(scrollTop + (side_viewHeight - nodeHeight) / 2 )});
					if(scrollTop >= 2032 && scrollTop < 3626){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(0).find("div").css("display","block");
					}else if(scrollTop >= 3626 && scrollTop < 5270){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(1).find("div").css("display","block");
					}else if(scrollTop >= 5270 && scrollTop < 6610){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(2).find("div").css("display","block");
					}else if(scrollTop >= 6610 && scrollTop < 7540){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(3).find("div").css("display","block");
					}else if(scrollTop >= 7540 && scrollTop < 8830){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(4).find("div").css("display","block");
					}
				}else{
					$("ul.sideBar").css({display:"none"});
				}
			});
}











	
