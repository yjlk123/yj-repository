/*
* @Author: yj
* @Date:   2018-04-05 20:29:14
* @Last Modified by:   yjlk123
* @Last Modified time: 2018-04-26 20:56:29
*/
function Person(sum){
	var namesum = sum+1;
    this.name = namesum;
}

Person.prototype.getInfo = function(){
        console.log(this.name);
    };


var will = new Person(0);
will.getInfo();


console.log('**************************');
//tenth
var test ={
  'a':1,
  'b':function(){
   console.log(this === test);//这里不论是test还是test1,都是true
  }
 }
var test1 = test;
test1.b();//true   注意这个，都指向同一个对象，默认为二者是同一个，所以this===test输出结果是true
//你暂且理解为引用的了，两个都指向一个对象
//你不会认为结果为"false"吧，错了，虽然'test1'的值为'test'  但是'test1'不还是'test'对象么，
//它有新产生对象，你暂且理解为引用的了，两个都指向一个对象，奉上下面一段代码为证

var test2 ={
  'a':1,
  'b':function(){
   console.log(this === test2)//这里不论是test2还是test1,都是true
  }
 }
var test1 = test2;
test2.a = 2;
console.log(test1.a);//2
test1.b();//true




var test3 ={
  'a':1,
  'b':{
   'b1':function(){
    console.log(this === test3);//若改成test3.b，则结果是true
   }
  }
 }
test3.b.b1();//false    
//按照上面的理论，这时"this"不再直接被'test'调用了，而是被'test.b' 调用, 奉上下面一段代码为证


var test5 = function(){
  var innerTest = function(){
   console.log(this === test5);
  }
  innerTest();
 }
test5();

//你不会认为弹出"true"吧，不是按照上面的理论'innerTest'是被'test5'调用的，然后'this'就指向'test5'吗？
//额，错就错在是谁调用的'innerTest', 其实这种函数都是'window'对象调用的，(注意和上一段代码区别,上面的代码是对象，这里是函数，不一样)
//即使你嵌套一千层，调用各个函数的都是'window'对象,奉上下面这段代码为证


//注意，带有window关键字的会报错，不知道是哪里没有调好，所以注释掉了
// var test6 = function(){
//   var innerTest = function(){
//    console.log(this === window);
//    var innerTest1 = function(){
//     console.log(this === window);
//    }
//    innerTest1();
//   }
//   innerTest();
//  }
// test6();

