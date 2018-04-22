console.log("hello world");

function Person(){
	this.i = 100;
}

var i = 10;////////////////注意，这里加var与不加的结果并不相同
Person();
console.log(i);


var x = 2;
　　function test(){
　　　　this.x = 1;
　　}
　　var o = new test();
console.log(x);



