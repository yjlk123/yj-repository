/*
* @Author: yj
* @Date:   2018-04-05 20:29:14
* @Last Modified by:   yjlk123
* @Last Modified time: 2018-04-05 20:40:06
*/
function Person(name, age){
    this.name = name;
    this.age = age;
    this.getInfo = function(){
        console.log(this.name + " is " + this.age + " years old");
    };
}

var will = new Person("Will", 28);
console.log(will.constructor);
//will.getInfo();