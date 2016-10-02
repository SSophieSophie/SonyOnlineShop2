


//移除空白节点1
function removeSpaceNodeParent(element){
			//1.遍历当前节点的子节点
	for(var i = 0; i < element.childNodes.length; i++){
		if(element.childNodes[i].nodeType == 3 && /^\s+$/.test(element.childNodes[i].nodeValue)){
			element.removeChild(element.childNodes[i]);
		}
	}
	return element;
}

//移除空白节点2
function removeSpaceChilds1(childs){
			//创建一个空数组,如果是空白跳过,如果不是空白,插入
	var newArray = [];
	for(var i = 0; i < childs.length; i++){
		//\s在JS中是空格
		if(childs[i].nodeType == 3 && /^\s+$/.test(childs[i].nodeValue)){
			continue;
		}	
		newArray.push(childs[i]);
	}
	return newArray;
}

	
//移除空白节点3	
function removeSpaceChilds2(childs){
	for(var i = 0; i < childs.length; i++){
		if(childs[i].nodeType == 3 && /^\s+$/.test(childs[i].nodeValue)){
			childs[i].parentNode.removeChild(childs[i]);
		}
	}
	//alert(childs.length);
	return childs;
}


//创建带内容的节点
function createNodeWithText(NodeType, NodeText){
	var Node = document.createElement(NodeType); //元素节点
		if(NodeText){
			var text = document.createTextNode(NodeText); //文本节点
			Node.appendChild(text);
		}
	return Node;
}

//插入节点
function insertAfter(newElement, oldElement){
			//1.找到oldElement父节点
			var parent = oldElement.parentNode;
			if(parent.lastChild === oldElement){
				parent.appendChild(newElement);
			}else{
				parent.insertBefore(newElement, oldElement.nextSibling);
			}
		}


//随机颜色
function randomColorX(){
	var color = "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255)
				+ "," + Math.round(Math.random() * 255) + ",1)";
	return color;
}


//获取样式
function getStyleValue(elem, type){
			return elem.currentStyle ? elem.currentStyle[type] : getComputedStyle(elem)[type];
	}

/*//获取节点

	function $(str){
		var subStr = str.substring(0, 5);
		if(subStr == "name="){
			return document.getElementsByName(str.substring(5, str.length));
		}else{
			if(str[0] == "#"){
				return document.getElementById(str.substring(1, str.length));
			}else if(str[0] == "."){
				return document.getElementsByClassName(str.substring(1, str.length));
			}else{
				return document.getElementsByTagName(str);
			}
		}
	}*/


//设置Cookie
	function setCookie(name, value, expires, path, domain, isSecure){
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		//判断时间是否存在
		if(expires instanceof Date){
			cookieText += ";expires=" + expires;
		}
		if(path){
			cookieText += ";path=" + path;
		}
		if(domain){
			cookieText += ";domain=" + domain;
		}
		if(isSecure){
			cookieText += ";secure"
		}
		//存储
		document.cookie = cookieText;
	}

//设置Cookie
	function getDateWithNum(num){
		var date = new Date();
		var day = date.getDate() + num;
		date.setDate(day);
		return date;
	}


//设置Cookie
	function getCookie(name){
		var cookie = decodeURIComponent(document.cookie);
		var start = cookie.indexOf(name);
		if(start >= 0){
			var end = cookie.indexOf(";", start);
			if(end == -1){
				end = cookie.length;
			}
		}else{
			return false;
		}

		var subStr = cookie.substring(start, end);
		var arr = subStr.split("=");
		return arr[1];
	}

//设置Cookie
	function removeCookie(name){
		var d = new Date(0);
		document.cookie = encodeURIComponent(name) + "=;expires=" + d;
	}


//生成验证码
	function testStr(n){
		var arr = [];
		for(var i = 0; i < n; i++){
			var num  = parseInt(Math.random() * 100);
			if(num >= 0 && num <= 9){
				arr.push(num);
			}else if(num >= 10 && num <= 35){
				arr.push(String.fromCharCode(num + 87));
			}else if(num >= 65 && num <= 90){
				arr.push(String.fromCharCode(num));
			}else{
				i--;
				continue;
			}
		}
		return arr.join("");
	}

	//跨浏览器兼容的事件
	function addEvent(obj, type, func){
		if(obj.addEventListener){
			obj.addEventListener(type, func, false);
		}else if(obj.attachEvent){
			obj.attachEvent("on" + type, func); //没有办法传递this
		}
	}

	//移除事件
	function removeEvent(obj, type, func){
		if(obj.removeEventListener){
			obj.removeEventListener(type, func);
		}else if(obj.detachEvent){
			obj.detachEvent("on" + type, func);
		}
	}

	//跨浏览器获取目标对象
	function getTarget(even){
		if(even.target){ //W3C
			return even.target;
		}else if(window.event.srcElement){ //IE
			return window.event.srcElement;
		}
	}

	//完美运动
	function startMove(obj, json, func){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){

				var bStop = true; 

				//1.取出该属性的初值
				for(var attr in json){
					var iCur = 0;
					if(attr == "opacity"){
						iCur = parseFloat(getStyle(obj, attr)) * 100;
					}else{
						iCur = parseInt(getStyle(obj, attr))
					}
					var speed = (json[attr] - iCur) / 8;
					//8 缩放系数,缓冲运动效果最好的缩放系数
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(iCur != json[attr]){
						bStop = false;
					}
					if(attr == "opacity"){
						obj.style.filter = "alpha(opacity: " + (iCur + speed) + ")";
						obj.style.opacity = (iCur + speed) / 100;
					}else{
						obj.style[attr] = iCur + speed + "px";
					}
				}
				if(bStop){
					clearInterval(obj.timer);
					if(func){
						func();
					}
				}
			}, 30);
		}


		function getStyle(obj, attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj)[attr];
			}
		}

		function getValue(key){
			//1.首先拿到搜索的那部分,越过?
			var str = location.search.substring(1, location.search.length);
			var arr = str.split("&");
			var values = [];
			for(var i = 0; i < arr.length; i++){
				var newArr = arr[i].split("=");
				values.push(newArr[1]);
			}
			return values;
		}




