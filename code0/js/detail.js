$(function(){
	//鼠标hover在头部购物车图标时出现前往购物车的div框
	$("li.shoppingcart").hover(function(){
		$("div.gotocart").css("display","block");
	},function(){
		$("div.gotocart").css("display","none");
	});

	$("div.gotocart").hover(function(){
		$(this).css("display","block");
	},function(){
		$(this).css("display","none");
	});


	var num = 1 ;
	var _id = "";
	var name = null;
	

	//点击加入购物车,设置cookie并且页面头上的购物车数量改变，结算div:display:block
	ajax("get","../json/details.json","",function(data){
		var cartsArr = JSON.parse(data)[1].carts;
		
			$("div.cartBtn").on("click",function(){

				for(var i = 0; i < cartsArr.length; i++){
				//alert("ss")
					if($("div.cartBtn").attr("index") == 0){
						//$.cookie("goods","[{id:"+ cartsArr[1]._id + "," + "num:" + num + "}]");
						_id = cartsArr[0]._id;
						name = cartsArr[0].name;
						price = cartsArr[0].price;
					}else if($("div.cartBtn").attr("index") == 1){
						_id = cartsArr[1]._id;
						name = cartsArr[1].name;
						price = cartsArr[1].price;
					}
				}
				num = $("div.countNum").find("input").val() ? $("div.countNum").find("input").val() : parseInt($("div.countNum").find("input").attr("placeholder"));
				$("div.shoppingInfo").find("span.num").html(num);
				$("div.childNav").find("ul.links").find("li.shoppingcart").find("div.cart").find("span.count").html(num);
				//结算div:display:block
				$("div.childNav").find("div.gotopay").css("display","block");
				//$.cookie("goods","[{id:" + _id + "num:" + num"}]");
				$.cookie("goods","[{id:"+ _id + "," + "num:" + num + "}]",{expires:7});
				$.cookie("iNow",$(this).attr("index"),{expires:7});
			});

		
//alert($.cookie('goods'));

	});
	ajax("get","../json/details.json","",function(data){
		//当成功添加购物车后，点击结算直接跳转购物车
	
		$("div.gotopay").on("click",function(){
			//alert($.cookie("iNow"));
			var url = "carts.html";
			var str1 = $.cookie("iNow");
			var str2 = $.cookie("goods");
			var str = str1 + str2;
			url += "? shopCart = " + str1 + "&" + "info = " + str2; 
			//alert(url)//carts.html? shopCart = 1&info = {id:P98826315,num:5}
			open(url,"shopCart")
		})
	
	//点击div框里的“前往购物车”，可以跳转至购物车页面
	
		/*$("div.gotocart").find("a").on("click",function(){
			//alert($.cookie('goods'));
			var url = carts.html;
			var str = $.cookie("goods");
			url += "? shopCart = " + str;
			alert(url) 
			open(url,"shopCart")
		});*/
	})
	
		
	
	

	//添加点击切换图片的功能---4个小图片
	$("ul.smallerPic").find("li").on("click",function(){
		$("ul.smallerPic").find("li").attr("class","")
		$(this).attr("class","active");
		var str1 = $(this).find("img").attr("src")
		$("div.biggerPic").find("img").attr("src",str1.replace("82","504"))
	});

	//添加点击切换图片的功能---2个颜色btn
	$("div.color").find("ul").find("li").on("click",function(){
		$("div.color").find("ul").find("li").attr("class","");
		$(this).attr("class","active");
		iNow = $(this).index();
		if(iNow == 0){
			$("div.biggerPic").find("img").attr("src","../images/details/zr7_b1_504.jpg");
			//给购物车按钮添加index属性
			$("div.cartBtn").attr("index",iNow);
		}else if(iNow == 1){
			$("div.biggerPic").find("img").attr("src","../images/details/zr7_w1_504.jpg");
			$("div.cartBtn").attr("index",iNow);
		}
	});
	//添加点击增减按钮对数量加减1的功能
	$("div.add_minus").find("em.add").on("click",function(){
		var num1 = parseInt($("div.countNum").find("input").attr("placeholder"));
		var num2 = $("div.countNum").find("input").val();
		if(num2 == ""){//没有输入数字时：
			$("div.countNum").find("input").val(num1 + 1);	
		}else{
			$("div.countNum").find("input").val(parseInt(num2) + 1)
		}
	});
	$("div.add_minus").find("em.minus").on("click",function(){
		//var num1 = parseInt($("div.countNum").find("input").attr("placeholder"));
		var num2 = $("div.countNum").find("input").val();
			if(parseInt(num2) > 1){
				$("div.countNum").find("input").val(parseInt(num2) - 1);
			}
	});
	

	//获取推荐产品JSON数据
	
	ajax("get","../json/details.json","",function(data){
		
		var newArr = JSON.parse(data);
			var recArr = newArr[0].rec;
			for(var i = 0; i < recArr.length; i++){
				var recA = $("<a><i></i><img/><h5></h5><div></div></a>");
				recA.appendTo($("#recPro"));
				recA.attr("class","outer")
				recA.find("img").attr("src",recArr[i].img);
				recA.find("i").html(recArr[i].price);
				recA.find("h5").html(recArr[i].name);

				var checkP = $("<p></p>");
				checkP.appendTo(recA.find("div"));

				var checkA = $("<a></a>");
				checkA.appendTo(recA.find("div"));
				checkA.html("查看详情");
				checkA.attr("href",recArr[i].checkMore)
			}
	});
			
			
	
	//给subNav右边的导航图添加运动
	$("div.subNav").find("div.wrap1").find("div.subNav_right").find("a").hover(function(){
		$(this).find("img.on").css("display","block");
		$(this).find("img.normal").css("display","none")
	},function(){
		$(this).find("img.on").css("display","none");
		$(this).find("img.normal").css("display","block")
	});
})





