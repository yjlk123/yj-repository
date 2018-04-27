/*
* @Author: yj
* @Date:   2018-04-22 11:29:35
* @Last Modified by:   yj
* @Last Modified time: 2018-04-27 10:32:34
*/


function Chart(){
    this.abtn = document.querySelectorAll('input');//将（所有的，不止一个）button关联到this.abtn上
    this.ogood_num = document.querySelector('.goods_num');//商品总数（只有一个这个类的元素）
    this.opricetal = document.querySelector('.pricetal');//总计（只有一个这个类的元素）
    this.totalnum = 0;//商品总数
};

 //小计:  商品数量 * 商品单价
Chart.prototype.getsubtotal = function(goodsnum,unitprice){
    return parseInt(goodsnum) * parseFloat(unitprice);//注意函数parseInt的用法
};

// 计算商品的总计花费
Chart.prototype.gettotal = function(){
    var asubtotal = document.querySelectorAll('.subtal');
    var res = 0;
    for(var i=0,len=asubtotal.length;i<len;i++){
        res += parseFloat(asubtotal[i].innerHTML);
    };   
    return res;//记得返回
};


// 点击“+”号按钮触发的购物车商品数量，花费，最大价格的变动
Chart.prototype.plus = function(obtn){
    var onum = obtn.parentNode.querySelector('.num');
    var n = parseInt(onum.innerHTML);
    onum.innerHTML = ++n ;//其实单独的每一栏的数据只是在模型中显示的数据而已，并没有存入对象中，对象是用于记录总体的
    this.totalnum++;//this 是oChart实例
    //alert("11111");//true
    alert(this);//true ,因为调用该函数的是 ：that.plus(this); 这句，而这句里的that是指的oChart 
    var oUnit = obtn.parentNode.parentNode.parentNode.querySelector('.unit');
    var osubtotal = obtn.parentNode.parentNode.parentNode.querySelector('.subtal');
    osubtotal.innerHTML = this.getsubtotal(onum.innerHTML,oUnit.innerHTML);//通过调用原型里的函数，来计算小计
    this.ogood_num.innerHTML = this.totalnum;//接下来这三句就是对象里的那三个和元素关联了的成员变量,注意使用innerHTML写入模式中
    this.opricetal.innerHTML = this.gettotal();
};

// 点击“-”号按钮触发的购物车商品数量，花费，最大价格的变动
 Chart.prototype.minus = function(obtn){
    var onum = obtn.parentNode.querySelector('.num');
    if(parseInt(onum.innerHTML)>0){//做减法前先判断
        var n = parseInt(onum.innerHTML);
        onum.innerHTML = --n ;
        this.totalnum--;
        var oUnit = obtn.parentNode.parentNode.parentNode.querySelector('.unit');
        var osubtotal = obtn.parentNode.parentNode.parentNode.querySelector('.subtal');
        osubtotal.innerHTML = this.getsubtotal(onum.innerHTML,oUnit.innerHTML);
        this.ogood_num.innerHTML = this.totalnum;
        this.opricetal.innerHTML = this.gettotal();
    }  
};

// 获取已买商品的总计数量
Chart.prototype.getNumbertal = function(){
     var anum = document.querySelectorAll('.num');
     var res_num = 0;
     for(var i =0;i<anum.length;i++){
         res_num += parseInt( anum[i].innerHTML ) ;
     }
     return res_num ;
}

// 删除按钮触发的购物车商品数量，花费，最大价格的变动
Chart.prototype.del = function(obtn){
    var odel = obtn.parentNode.parentNode;
    var oparent = odel.parentNode;
    oparent.removeChild(odel);
    this.ogood_num.innerHTML = this.getNumbertal();
    this.opricetal.innerHTML = this.gettotal();
    this.ordersort();//删除了一项之后就得重新排序
}

// 购物车序号重新排序
Chart.prototype.ordersort = function(){
    var aorder = document.querySelectorAll('.order');
    for(var i=0,len=aorder.length;i<len;i++){
        aorder[i].innerHTML = i+1;
    }
}

// 绑定“+”，“-”，删除按钮的点击事件
Chart.prototype.bind = function(){
    var that = this ;
    //alert(this === window);//false
    for(var i=0;i<this.abtn.length;i++){
        if(i%2 !=0){
            this.abtn[i].onclick = function(){
                that.plus(this);
                //alert(this);//输出：[object HTMLInputElement]，即此时的this是button元素
                //alert(that);//Chart
            }
        }else{
             this.abtn[i].onclick = function(){
                that.minus(this);
            }
        }
    };
    var delbtn = document.querySelectorAll('.del');
    for(var i=0;i<delbtn.length;i++){
        delbtn[i].onclick = function(){
            that.del(this);//that为对象实例，this为当前按钮元素，注意调用的函数参数是obtn,这里传入this,理解其中的联系
        }
    }
};
   

function shoppingChart(){
    var oChart = new Chart();
    oChart.bind();
}

window.onload = shoppingChart;//注意这里不是立即调用