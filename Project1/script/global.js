/*
* @Author: yj
* @Date:   2018-02-15 09:35:59
* @Last Modified by:   yj
* @Last Modified time: 2018-04-17 21:18:58
*/
/**
页面公共的函数放这个文件里
*/

/*用于文档加载后启动函数*/
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

/*将新的元素添加到指定元素的后面*/
function insertAfter(newElament, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElament);
	}
	else{
		parent.insertBefore(newElament,targetElement.nextSibling);
	}
}

/*为元素添加类*/
function addClass(element, value){
	if(!element.className){
		element.className = value;
	}
	else{
		newClassName = element.className;/*不需要设置变量?还是newClassName是个全局变量？*/
		newClassName+= "";
		newClassName+= value;
		element.className = newClassName;/*这个也需要手动更新*/
	}
}

/*到当前页就凸显导航栏*/
function heightlight(){
	if(!document.getElementsByTagName){/*添加检查是否支持该函数*/
		return false;
	}
	if(!document.getElementById){/*注意不是getElementsById,没有s*//*添加检查是否支持该函数*/
		return false;
	}
	var navs = document.getElementsByTagName('nav');/*标签都是document对象的，所以用document来查找nav*/
	if(navs.length == 0){
		return false;
	}
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	var linkurltag = "recommendtag.html";
	var	linkurldaren = "recommenddaren.html";
	for(var i=0; i<links.length; i++){/*获得导航链接后循环它们*/
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!= -1){
			links[i].className = "here";/*为a添加类*/
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);/*为该页的body添加id:链接的文本内容*/
		}
	}
	
	/*因为导航栏每个页面重写一次的原因而产生的问题，这个解决办法不好*/
	if(window.location.href.indexOf(linkurltag)!= -1){
			links[1].className = "here";/*为a添加类*/
	}
	else if(window.location.href.indexOf(linkurldaren)!= -1){
			links[1].className = "here";/*为a添加类*/
	}
}

//网页加载完毕后即自动执行该函数
addLoadEvent(heightlight);


//原生javascript写ajax
//创建请求对象
function createRequest(){
	try{
		request = new XMLHttpRequest();
	}catch(tryMS){
		try{
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(otherMS){
			try{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(failed){
				request = null;
			}
		}
	}
	return request;
}

//将发送ajax的函数封装为一个工具函数
function ajax(urlTemplate, callBackFunction){
	//创建请求对象
	request = createRequest();
	if(request == null)
	{
		alert("createRequest failed !");
	}
	else
	{
		var url =urlTemplate;// "a.txt?t='+new Date().getTime()"  //加上t='+new Date().getTime()"的目的是为了消除缓存，每次的t的值不一样

		request.open("GET", url, true);
		request.send(null);
		request.onreadystatechange = function(){
			if(request.readyState == 4)
			{
				if(request.status == 200)
				{
					callBackFunction(request.responseText)
				}
				else
				{
					alert(request.status);
				}
			}
		}

	}
}