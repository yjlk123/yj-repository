
//first
function Person(){
	this.i = 100;
}

var i = 10;////////////////注意，这里加var与不加的结果并不相同
Person();//相当于一个全局的， i=90; 但不能和下面那种情况看作一样，因为这个全局变量的建立是在函数内部
console.log(i);//是var i = 10 这个
// 1.都加var，在方法内则是局部变量，在方法外则是全局变量。
// 2.在方法内,加var为局部变量，不加var则是全局变量（在执行当前方法之后）



//seventh  //////////////////为啥和first的结果不一样呢？？？？？？
console.log('seventh');
var b=10;
b=60;//这里并不是添加全局的变量了，而是将b的值更改为60，原因是这样不加var的情况下，
//首先会在自己的作用域搜索有没有已经定义了的，有的话就更改，没有的话就是为全局添加一个可以删除的变量
//注意：若交换上面2句的位置，结果不一样，因为这就是两种定义全局变量的方式了。所以建议定义全局变量时加var
console.log(b); //60 输出上一个值不会输出undefined


var var01 = 1;
function funtest() {
 var01 = 0;
 console.log(var01);
 
}
funtest();



//third  /////////////////////为啥与前2个又不一样？
var a = 'hello World';
function bb(){
    var a = 'Bill';
    console.log(a);   
}
bb()   // ' Bill'
console.log(a);    // 'hello world'


var e = 'hello world';
function cc(){
    e = 'Bill';
    console.log(e);
}
cc();   // 'Bill'  虽然定义的一个全局变量，但因为在函数中定义的，所以可以访问它
console.log(e);     // 'Bill'  注意这个的输出



//ninth
var x = 2;
　　function test(){
　　　　this.x = 1;
　　}
var o = new test();
console.log(x);


var01 = 1;
function funtest() {
 console.log(var01);
 var01 = 0;
}


//second
num = 9; 
var mymodule = {
  num: 81,
  getNum: function() { console.log(this.num);}
};

mymodule.getNum(); // 81

var getNumy = mymodule.getNum;
getNumy(); // 9, 因为在这个例子中，"this"指向全局对象

// 创建一个'this'绑定到module的函数
var boundGetNum = getNumy.bind(mymodule);
boundGetNum(); // 81






//fourth
function hh(){
    console.log(al);
    var al = 'hello world';
}
hh();    //undefined   //注意：若上下2个函数同名，则会执行下面这个函数，因为js里的函数没有重写一说


function hb(){
    //console.log(bl);
    bl = 'hello world';
}
//hb();    // 报错：'bl is not defined' ，就算注释掉这句，不调用，也会报错，因为编译就发现的错误


//fifth
var num1 = 1; 
 num2 = 2; 
 //delete num1;  //无法删除，报错
 // delete num2;  删除 
 function model(){ 
        var num1 = 7; // 本地变量 
        num2 = 6;     // window的属性 
        // 匿名函数 
        (function(){ 
               var num = 5; // 本地变量 
               num1 = 9; // 继承作用域（闭包）
               console.log(num1); 
               num3 = 3; // window的属性 
        }())
 } 

model();
console.log(num1);


 //sixth
 //这段报错，测试时可暂时删掉
 /*
 fod();       //TypeError: foo is not a function 输出foo is not a function 原因是：js解析遇到 foo()时会默认当做函数来解析
    var fod = function(){
        console.log("aaa");
    }
*/


 console.log(foo);
    var foo=10;
    console.log(foo);
    function foo(){
        console.log(20);
    }
    console.log(foo);

//上面这段变量提升和函数提升相当于：
// function foo(){
//         console.log(10);
//     }
// var foo;
// console.log(foo);
// foo=10;
// console.log(foo);
// console.log(foo);


//注意： 函数提升在变量提升上面，第一个console.log(foo);
//为什么会输出函数题呢，原因在于 var foo; 并未有赋值只是声明，因此他会调用上面的值




// //eighth  关于bind的用法
// var altwrite = document.write;
// altwrite("hello");
// altwrite.bind(document)("hello");
// //这里为什么出现非法调用？illegal invocation






//原型相关///////////////////////////////////////////////////?
var test = function(){
 }
 var my = function(){
  this.a = function(){
  console.log(this === mytest2);
  }
 }
 var mytest = new my();
 test.prototype = mytest;
 var mytest2 = new test();
 mytest2.a();





