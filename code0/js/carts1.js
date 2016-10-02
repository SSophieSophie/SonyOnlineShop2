$(function(){
	//根据cookie生成产品
	//alert(location.search)// ? shopCart = 1&info = id:P98826315,num:5
	//alert($.cookie("goods"))
	//var price = 0;
	//var subtotal = 0; 
	//var num = 0;
	ajax("get","../json/details.json","",function(data){
		getList();
		function getList(){
			var cartsArr = JSON.parse(data)[1].carts;
			//1,每次添加之前，先把之前的产品删除，重新从cookie里加载
			$("#goodsList").find("div.goods").remove();
			//2,获取cookie
			var str = $.cookie("goods");
			var arr = eval(str);
			for(var i = 0; i < arr.length; i++){
				//获取cookie生成div块，class=good
				var oDiv = $("<div><input/><em></em><h3></h3><span></span><div></div></div>")
				oDiv.appendTo($("#goodsList"));
				oDiv.attr("class","goods")
				oDiv.find("input").attr("type","checkbox");
				oDiv.find("input").attr("checked","checked");
				oDiv.find("em").html("选择结算");
				oDiv.find("h3").html(cartsArr[arr[i].id].name);
				oDiv.find("span").html(cartsArr[arr[i].id].code);
				oDiv.find("div").css("marginTop","7px");
				oDiv.find("div").attr("class","mainDiv");
				//获取cookie生成左边部分div
				var Lfdiv = $("<div><img/></div>");
				oDiv.find("div.mainDiv").append(Lfdiv);
				Lfdiv.attr("class","leftDiv");
				Lfdiv.find("img").attr("src",cartsArr[arr[i].id].cartImg);
				Lfdiv.find("img").css({width:"162px",height:"120px",marginTop:"14px"});
				//获取cookie生成右边部分div
				var Rtdiv = $("<div></div>");
				Rtdiv.attr("class","rightDiv");
					//1,获取cookie生成右边top部分div
				var RtdivTop = $("<div><a>我可用的优惠代码<i></i></a><br/><input/></div>");
				Rtdiv.appendTo(oDiv.find("div.mainDiv"));
				oDiv.find("div.rightDiv").append(RtdivTop);
				
				RtdivTop.attr("class","rTopDiv");
				RtdivTop.find("input").attr("type","text");
				RtdivTop.find("input").attr("class","proCode")
							//2，获取cookie生成top右边的button部分
				var btnDiv = $("<div><span></span><input/><span></span><p></p></div>");
				btnDiv.appendTo(RtdivTop);
				btnDiv.attr("class","btns");
				//btnDiv.attr("id",arr[i].id);
				btnDiv.find("span").eq(0).attr("class","add");
				btnDiv.find("span").eq(1).attr("class","minus");
				btnDiv.find("input").attr("value",arr[i].num);
				btnDiv.find("span").attr("id",arr[i].id);
				btnDiv.find("p").attr("id",arr[i].id);
					//3,获取cookie生成右边bottom部分p
				var priceP = $("<p><i>价格：</i><span></span><em></em><i>小计：</i><span></span></p>");
				priceP.appendTo(Rtdiv);
				var price0 = cartsArr[arr[i].id].price.replace("RMB","");
				var price = price0.replace(",","");
				//alert(price)
					//价格改变
				priceP.find("span").eq(0).html(cartsArr[arr[i].id].price);
				priceP.find("span").eq(0).attr("class","price");
				var subtotal = parseFloat(price) * parseInt(arr[i].num);		
				priceP.find("span").eq(1).html("RMB" + subtotal);
				priceP.find("span").eq(1).attr("class","subtotal");

			}
			//给加减按钮添加事件
			//添加点击增减按钮对数量加减1的功能
			$("span.add").on("click",function(){
				var index = $(this).attr("id")
				var btn_num = $("div.btns").eq(index).find("input").val();
				$("div.btns").eq(index).find("input").val(parseInt(btn_num) + 1);
				arr[index].num = $("div.btns").eq(index).find("input").val();	
				var cookieStr = JSON.stringify(arr);
				$.cookie("goods",cookieStr);
				getNum();

			});
			$("span.minus").on("click",function(){
				var index = $(this).attr("id");
				var btn_num = $("div.btns").eq(index).find("input").val();
				if(parseInt(btn_num) > 1){
					$("div.btns").eq(index).find("input").val(parseInt(btn_num) - 1);
					arr[index].num = $("div.btns").eq(index).find("input").val();
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods",cookieStr)
				}
				getNum();
			});

			
			//获取cookie总数量
			function getNum(){
				var str1 = $.cookie("goods");
				if(str1){
					var arr1 = eval(str1);
					var sc_num = 0;
					for(var j in arr1){
						sc_num += Number(arr[j].num);
					}
					$("#goodsNum").html(sc_num);
					var price0 = cartsArr[arr1[j].id].price.replace("RMB","");
					var price = price0.replace(",","");
					var subtotal = parseFloat(price) * parseInt(sc_num);
					//alert(subtotal)
					$("#totalPrice").html(subtotal);
					$("dd.summary").find("span.RMB").find("em").html(subtotal);
				}
			}
			getNum();
			//给删除按钮添加事件
			$("div.btns").find("p").on("click",function(){
				var index = $(this).attr("id");
				//删除节点
				$("div.goods").eq(index).remove();
				//删除其他cookie
				$.cookie("first","");
				//删除cookie
				var str2 = $.cookie("goods");
				var arr2 = eval(str2);
				for(var k = 0; k < arr2.length; k++){
					if(arr2[k].id == index){
						arr2.splice(k,1);
					}
					var cookieStr = JSON.stringify(arr2);
					$.cookie("goods",cookieStr);
				}
				//右边order部分数据相应改变
				getNum();
			});
		}		
	});

	//给购物车右边订单order添加移动——> 随着页面滚动，
	//始终在离窗口上方86px的位置,直到滚动到距cartsInfo下面70px
	$(window).on("scroll",function(){

		var scrollTop = $(window).scrollTop();
		var viewHeight = $(window).height();
		var totalHeight = $("div.totalPay").height();
		var nodeHeight = $("div.order").height();
		if(scrollTop <= totalHeight - 70){
			$("div.order").animate({top:scrollTop + parseInt((viewHeight - nodeHeight) / 2)})
		}
	});
	
})



