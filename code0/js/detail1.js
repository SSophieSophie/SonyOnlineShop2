$(function(){
	var num = 0;
	var id0 = "";
	var name = null;
	var price = 0;
	//点击加入购物车,设置cookie 
	ajax("get","../json/details.json","",function(data){
		var cartsArr = JSON.parse(data)[1].carts;
		for(var i = 0; i < cartsArr.length; i++){
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
					//给购物车按钮添加id属性
					$("div.cartBtn").attr("id",cartsArr[iNow].id);
				}else if(iNow == 1){
					$("div.biggerPic").find("img").attr("src","../images/details/zr7_w1_504.jpg");
					$("div.cartBtn").attr("id",cartsArr[iNow].id);
				}
			});	
		}					
				
			$("div.cartBtn").on("click",function(){
				num = $("div.countNum").find("input").val() ? $("div.countNum").find("input").val() : parseInt($("div.countNum").find("input").attr("placeholder"));
				//alert(num)
				//$("div.shoppingInfo").find("span.num").html(num);
				var id0 = $(this).attr("id");
				if(id0){
					id0 = $(this).attr("id");
				}else{
					id0 = 0;
				}
				//判断是否第一次加入
				var same = false;
				var first = $.cookie("goods") == null ? true : false;
				if(first){
					$.cookie("goods","[{id:" + id0 + ",num:" + num + "}]");
					$.cookie("first","false");
				}else{
					var str = $.cookie("goods");
					var arr = eval(str);
					for(var j in arr){
						if(arr[j].id == id0){
							arr[j].num = parseInt(arr[j].num) + parseInt(num);//添加数量
							var cookieStr = JSON.stringify(arr);
							$.cookie("goods",cookieStr);
							same = true;
						}
					}
					if(!same){
						var obj = {id:id0,num:num};
						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr);
					}
				}
				getNum();
			});
				
//alert($.cookie("goods"))
				//获取cookie里的数量
				function getNum(){
					var str1 = $.cookie("goods"); 
					if(str1){//如果购物车不为空
						var arr1 = eval(str1);
						var price = 0;
						var sc_num = 0;
						for(var k in arr1){
							sc_num += Number(arr1[k].num);
							var price0 = cartsArr[arr1[k].id].price.replace("RMB","");
							price = price0.replace(",","");
						}
						//alert(sc_num + "," +arr1[k].num + "," + $.cookie("goods"))
						//并且页面头上的购物车数量改变，
						$("div.childNav").find("ul.links").find("li.shoppingcart").find("div.cart").find("span.count").html(sc_num);
						//前往购物车小块里的 数量变化\价格变化
						$("div.shoppingInfo").find("p").find("span.num").html(sc_num);

						$("div.shoppingInfo").find("p").find("span.price").html(sc_num * price);

						//结算div块:display:block
						if(arr1[k] != null){
							$("div.childNav").find("div.gotopay").css("display","block");
						}
					}
				}

			getNum();	

			//鼠标hover在头部购物车图标时出现前往购物车的div框
			$("li.shoppingcart").mouseenter(function(){
				$("div.gotocart").css("display","block");
				addGoods();
			});
			$("li.shoppingcart").mouseleave(function(){
				$("div.gotocart").css("display","none");
			});

			$("div.gotocart").hover(function(){
				$(this).css("display","block");
			},function(){
				$(this).css("display","none");
			});

			function addGoods(){
				var str2 = $.cookie("goods");
				if(str2){
					var arr = eval(str2);
					var html = "";
					for(var m = 0; m < arr.length; m++){
						var price0 = cartsArr[arr[m].id].price.replace("RMB","");
						price2 = price0.replace(",","");
						html += '<li><img src ="' + cartsArr[arr[m].id].img + '"/><div><h5>' + cartsArr[arr[m].id].name + '</h5><p>' + cartsArr[arr[m].id].code  + '</p></div><span>件数：' + arr[m].num + '</span><span>金额：RMB' + arr[m].num * price2 + '</span><a class=' + arr[m].id + '>删除</a></li>'
					}
					$("ul.cartList").html(html);
				}
				$("ul.cartList").find("li").find("a").css("cursor","pointer").on("click",function(){
					//删除节点
					$("ul.cartList").find("li").eq($(this).attr("class")).html("");	
					//删除cookie				
					var arr3 = eval($.cookie("goods"));
					for(var n in arr3){
						if($(this).attr("class") == arr3[n].id){
							arr.splice(n,1);
						}
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr);

					}
					//删除其他cookie
					$.cookie("first",null)
					//购物车内商品总量改变
					getNum();
					//结算div块:display:none
					if(arr3[n] == null){
						$("div.childNav").find("div.gotopay").css("display","none");
					}
				});
			}

			
	});
	ajax("get","../json/details.json","",function(data){
		//当成功添加购物车后，点击结算直接跳转购物车
		if($.cookie("goods")){
			$("div.gotopay").on("click",function(){
			
				var url = "carts.html";
				
				var str2 = $.cookie("goods");
				
				url += "? shopCart = " + str2; 
				//alert(url)//carts.html? shopCart = 1&info = {id:P98826315,num:5}
				open(url,"shopCart")
			})
		}
		
	
	//点击div框里的“前往购物车”，可以跳转至购物车页面
		$("div.gotocart").find("a").on("click",function(){
			//alert($.cookie('goods'));
			var url = carts.html;
			var str = $.cookie("goods");
			url += "? shopCart = " + str;
			//alert(url) 
			open(url,"shopCart")
		});
	})
	
		
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





