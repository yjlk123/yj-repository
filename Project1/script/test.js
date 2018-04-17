/*
* @Author: yj
* @Date:   2018-04-05 20:29:14
* @Last Modified by:   yjlk123
* @Last Modified time: 2018-04-06 10:55:13
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

var wi = new Person(7);
wi.getInfo();
