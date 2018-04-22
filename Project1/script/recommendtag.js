/*
* @Author: yj
* @Date:   2018-04-22 10:14:34
* @Last Modified by:   yj
* @Last Modified time: 2018-04-22 10:40:01
*/


//测试函数，需删除
function callBackFunctionas(ul){
    alert(ul);
}


//用于测试点击达人标签时，是否能够准确地从服务器获取文本
function testForAjax(){
	//在当前页面的情况下点击达人标签，能够实现从服务器获取文本
	var retage = document.getElementById("retags");
	retage.onclick = function(){ ajax('/php/test.php', callBackFunctionas); };//若带参，正确的调用函数方法如左边
}


//网页加载后调用函数
addLoadEvent(testForAjax);