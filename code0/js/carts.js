$(function(){
	//根据cookie生成产品
	//alert(location.search)// ? shopCart = 1&info = id:P98826315,num:5
	alert($.cookie("goods"))
	var price = 0;
	var subtotal = 0; 
	var num = 0;
	ajax("get","../json/details.json","",function(data){
		var str = decodeURIComponent(location.search);//? shopCart = 1&info = id:P98826315,num:5
		var arr0 = str.split("&");
		var value = [];
		for(var i = 0; i < arr0.length; i++){
			var newArr0 = arr0[i].split("=");
			value.push(newArr0[1]);
		}	
		
		$.cookie("iNow",JSON.stringify(value[0]));
		//alert($.cookie("iNow")) //"1"
		$.cookie("goods",JSON.stringify(value[1]));
		//alert($.cookie("goods"))//" id:P98826315,num:5"
		var str1 = JSON.parse($.cookie("goods"));
		var arr1 = str1.split(",");
		//alert(typeof(str1));
		var value1 = [];
		for(var i = 0; i < arr1.length; i++){
			var newArr1 = arr1[i].split(":");
			value1.push(newArr1[1]);
		}
		num = parseInt(value1[1]);
		
		var str0 = $.cookie("iNow");
		//alert(str0)
		var index = parseInt(JSON.parse(str0));
		var cartsArr = JSON.parse(data)[1].carts;
		var oDiv = $("<div><input/><em></em><h3></h3><span></span><div></div></div>")
		oDiv.appendTo($("#goodsList"));
		oDiv.attr("class","goods")
		oDiv.find("input").attr("type","checkbox");
		oDiv.find("input").attr("checked","checked");
		oDiv.find("em").html("选择结算");
		oDiv.find("h3").html(cartsArr[index].name);
		oDiv.find("span").html(cartsArr[index]._id);
		oDiv.find("div").css("marginTop","7px");
		oDiv.find("div").attr("class","mainDiv");
		var Lfdiv = $("<div><img/></div>");
		var Rtdiv = $("<div></div>");
		Rtdiv.attr("class","rightDiv");
		
		var RtdivTop = $("<div><a>我可用的优惠代码<i></i></a><br/><input/><div></div></div>");
		oDiv.find("div.mainDiv").append(Lfdiv);
		Rtdiv.appendTo(oDiv.find("div.mainDiv"));
		oDiv.find("div.rightDiv").append(RtdivTop);
		Lfdiv.attr("class","leftDiv");
		Lfdiv.find("img").attr("src",cartsArr[index].cartImg);
		Lfdiv.find("img").css({width:"162px",height:"120px",marginTop:"14px"})
		RtdivTop.attr("class","rTopDiv");
		RtdivTop.find("input").attr("type","text");
		RtdivTop.find("input").attr("class","proCode")
		RtdivTop.find("div").attr("class","btns");
		var btnDiv = $("<div><span></span><input/><span></span><p></p></div>");
		btnDiv.appendTo("div.btns");
		btnDiv.find("span").eq(0).attr("class","add");
		btnDiv.find("span").eq(1).attr("class","minus");
		btnDiv.find("input").attr("placeholder",num);

		var priceP = $("<p><i>价格：</i><span></span><em></em><i>小计：</i><span></span></p>");
		priceP.appendTo(Rtdiv);
		var price0 = cartsArr[index].price.replace("RMB","");
		price = price0.replace(",","");
		priceP.find("span").eq(0).html(cartsArr[index].price);
		priceP.find("span").eq(0).attr("class","price");
		var subtotal = parseFloat(price) * num;		
		priceP.find("span").eq(1).html("RMB" + subtotal);
		priceP.find("span").eq(1).attr("class","subtotal");

		//给加减按钮添加事件
		//添加点击增减按钮对数量加减1的功能
		$("div.btns").find("span.add").on("click",function(){
			var num1 = parseInt($("div.btns").find("input").attr("placeholder"));
			var num2 = $("div.btns").find("input").val();
			if(num2 == ""){//没有输入数字时：
				$("div.btns").find("input").val(num1 + 1);	
				var num3 = $("div.btns").find("input").val();
				$("#goodsNum").html(num3);
				subtotal = price * num3;
				$("div.rightDiv").find("p").find("span.subtotal").html("RMB" + subtotal)
				$("#totalPrice").html(subtotal);
				$("dd.summary").find("span.RMB").find("em").html(subtotal);
			}else{
				$("div.btns").find("input").val(parseInt(num2) + 1);
				var num3 = $("div.btns").find("input").val();
				$("#goodsNum").html(num3);
				subtotal = price * num3;
				$("div.rightDiv").find("p").find("span.subtotal").html("RMB" + subtotal)
				$("#totalPrice").html(subtotal);
				$("dd.summary").find("span.RMB").find("em").html(subtotal);
			}


		});
		$("div.btns").find("span.minus").on("click",function(){
			//var num1 = parseInt($("div.countNum").find("input").attr("placeholder"));
			var num2 = $("div.btns").find("input").val();
				if(parseInt(num2) > 1){
				$("div.btns").find("input").val(parseInt(num2) - 1);
					//右边order部分数据相应改变
				var num3 = $("div.btns").find("input").val();
				$("#goodsNum").html(num3);
				subtotal = price * num3;
				$("#totalPrice").html(subtotal);
				$("div.rightDiv").find("p").find("span.subtotal").html("RMB" + subtotal)
				$("dd.summary").find("span.RMB").find("em").html(subtotal);

				}
		});


		//右边order部分数据相应改变
		$("#goodsNum").html(num);
		$("#totalPrice").html(subtotal);
		$("dd.summary").find("span.RMB").find("em").html(subtotal);

		//给删除按钮添加事件
		$("div.btns").find("p").on("click",function(){
			$("div.goods").remove();
			$.cookie("goods","");
			$.cookie("iNow","");
			//右边order部分数据相应改变
			$("#goodsNum").html("");
			$("#totalPrice").html("");
			$("dd.summary").find("span.RMB").find("em").html("");
			//var substr = str.substring(0,str.length);
			//alert(substr)
			//str.replace(substr,"");
			//alert(str)
		});
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



