/*
* @Author: yj
* @Date:   2018-06-06 20:18:26S
* @Last Modified by:   yj
* @Last Modified time: 2018-06-08 12:00:48
*/

//test url传参


//var temp = window.location;
//alert(temp);
//var t = String(temp);//temp是个对象，必须转换成字符串才能使用split方法
//alert(t);

//var st = "12?3";

//alert(t.split('?')[1]);//split的用法注意，将字符串按?分割成了2部分，所以t.split('?')是数组名，代表输出所有的数组内容,
//所以输出的内容是将?变成了,而已
//alert(t);//split不改变原数组

//document.getElementById("s").innerHTML = temp.split('=');





var retage = document.getElementById("articleedit");
var tagBtn = document.getElementById("release");

tagBtn.onclick = function(){ 
    var articleStr = retage.value;
    //方法1：点击发送到首页的按钮后将内容放在url后面传到首页:
    //window.location.href='index.html?id='+st;
    //var stt = String(window.location);

	//方法2：用sessionStorage试试
	sessionStorage.setItem("articleRel", articleStr);
	retage.value = "";

    }