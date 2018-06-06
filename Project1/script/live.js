/*
* @Author: yj
* @Date:   2018-06-06 20:18:26S
* @Last Modified by:   yjlk123
* @Last Modified time: 2018-06-06 23:00:15
*/
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
    var st = retage.value;
    //alert(st);
    window.location.href='index.html?id='+st;
    //alert(window.location);
    var stt = String(window.location);
    //alert(stt);

    };//若带参想传参，又不想立即调用，正确的调用函数方法如左边