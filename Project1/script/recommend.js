/*
* @Author: yj
* @Date:   2018-03-07 10:14:35
* @Last Modified by:   yj
* @Last Modified time: 2018-05-18 17:00:01
*/
/**
recommend.thml对应的js文件
*/

function $(id) {
    //判断id的类型
    return typeof id === 'string'?document.getElementById(id):id;
}

//测试函数，需删除
function callBackFunctiona(ul){
    alert(ul);
}

/*点击关注按钮后的操作*/
function clickConcernBtn(event){//注意：要传参
    //方法1
    //这种方法对动态生成的不生效
    // var concernBtn = document.getElementsByClassName("concernclick");
    // for(var i = 0;i < concernBtn.length; i++){
    //     concernBtn[i].onclick = function(){
    //         alert(this);
    //    }
    // }
    //setTimeout("clickConcernBtn()",2000);//无限循环不要用，卡到怀疑人生！

    //方法2
    //这种方法对模态框里的按钮不生效
    // window.onclick = function (event){//注意：加上这个若传参就正确，没有传参就无法进入该函数
    //     alert("3");
    //     var objTarget = event.srcElement || event.target;
    //     var objTargetClass = objTarget.className;
    //     if(objTargetClass.indexOf("concernclick") > 0 ){
    //        alert("23");
    //     }
    // }

    var objTarget = event.srcElement || event.target;
    var objTargetClass = objTarget.className;
    if(objTargetClass != ""){//注意：判断的语句写法
       if(objTarget.innerHTML == "关注 +")//objTargetClass.indexOf("concernclick") > 0  //用于判断语句中是否包含有指定的语句
       {
           objTarget.innerHTML = "取消关注";
           //addClass(objTarget,"btn-danger");//注意：只是添加类的话，不会生效，会被之前的btn-default覆盖，需要替换之前的button的类
           var classVal = objTargetClass.replace("btn-default"," btn-inverse");
           objTarget.setAttribute("class",classVal );
        }
        else
        {
            objTarget.innerHTML = "关注 +";
           var classVal = objTargetClass.replace(" btn-inverse","btn-default");
           objTarget.setAttribute("class",classVal );

        }
    }
}




/*模态框的构造函数*/
function ModalBox(eventUserImg,eventUserName,targetUserConcern,eventSrc,eventArticleText){
    /*获取模态框*/  
    this.modal = document.getElementById("myModal");  
    /*获得对图片的点击*/  
    this.eventUserImg = eventUserImg;  
    this.eventUserName = eventUserName;  
    this.eventUserConcern = targetUserConcern;
    this.eventSrc = eventSrc;  
    this.eventArticleText = eventArticleText;  
    /*获得关注按钮*/  
    this.concernBtn = document.getElementById("modal-concern-btn"); 
    /*获得关闭按钮*/  
    this.closeBtn = document.getElementById("closeBtn"); 
}

/*模态框显示*/
ModalBox.prototype.show = function(objEvent) {
    /*获得body,用于之后控制其滚动*/
    var bodyEvent = document.getElementsByTagName("body");//注意这个函数的拼写和用法
    var concernBtnClick = document.getElementsByClassName("modal-concern");
    this.modal.className = "modalShow"; 
    bodyEvent[0].className = "unscroll";//点击图片后未实现让body禁止滚动
    var modalUserImg = document.getElementsByClassName("modal-usericon");
    modalUserImg[0].src = this.eventUserImg;
    var temp = document.getElementsByClassName("modal-img");
    temp[0].src = this.eventSrc;
    var tempText = document.getElementById("modal-textdis");
    tempText.innerHTML = this.eventArticleText;

    //关注按钮根据现有状况显示
    if(this.eventUserConcern == "取消关注")
    {
        concernBtnClick[0].innerHTML = "取消关注";
        var eventConcernClass = concernBtnClick[0].className;
        var classVal = eventConcernClass.replace("btn-success"," btn-inverse");
        concernBtnClick[0].setAttribute("class",classVal );
    }

} 

/*点击模态框里的关注按钮*/  ///////////////////////////////有问题待整改
ModalBox.prototype.concernModalBtnClick = function(event){
    var objTarget = event.srcElement || event.target;
    alert(objTarget);
    objTargetClass = objTarget.className;
    if(objTargetClass != ""){//注意：判断的语句写法
           if(objTarget.innerHTML == "关注 +")//objTargetClass.indexOf("concernclick") > 0  //用于判断语句中是否包含有指定的语句
           {
               objTarget.innerHTML = "取消关注";
               //addClass(objTarget,"btn-danger");//注意：只是添加类的话，不会生效，会被之前的btn-default覆盖，需要替换之前的button的类
               var classVal = objTargetClass.replace("btn-success"," btn-inverse");
               objTarget.setAttribute("class",classVal );
            }
            else
            {
                objTarget.innerHTML = "关注 +";
               var classVal = objTargetClass.replace(" btn-inverse","btn-success");
               objTarget.setAttribute("class",classVal );

            }
        }
}

/*模态框关闭*/  
ModalBox.prototype.close = function() {
    /*获得body,用于之后控制其滚动*/
    var bodyEvent = document.getElementsByTagName("body");//注意这个函数的拼写和用法
    this.modal.className = "modal"; 
    bodyEvent[0].className = ""; //关闭模态框后恢复body的可滚动  
}  


/*当用户点击模态框内容之外的区域，模态框也会关闭*/  
ModalBox.prototype.outsideClick = function() {  
    var modal = this.modal;//注意用法 
    var bodyEvent = document.getElementsByTagName("body");//注意这个函数的拼写和用法 
    window.onclick = function(event) {  //这个区域是以window来触发的，注意区别前面两个函数都是由点击按钮触发
                                        //event是为了兼容性，在IE下，window.event是有效的，所以可以不用传event参数，
                                        //Firefox下没window.event这个对象，event只会通过参数传递进来。
        if(event.target == modal) { //注意判断 
            modal.className = "modal"; 
            bodyEvent[0].className = ""; //关闭模态框后恢复body的可滚动
            //modalInstance = null; 
        }  
    }  
}  

/*点击图片区域展开模态框*/
function clickPic(){
    //获取当前的元素
    var objTarget = event.srcElement || event.target;
    // while (tem.nodeType !=1)//为了兼容浏览器previousSibling方法的不同
    // {
    //     tem = tem.previousSibling;
    // }
    //获取当前元素的用户信息中的图标
    var targetUserImg = objTarget.parentNode.previousSibling.firstChild.src;
    //获取当前元素的用户信息中的用户名
    var targetUserName = objTarget.parentNode.previousSibling.firstChild.nextSibling.innerHTML;
    //获取当前元素的用户信息中的关注按钮
    var targetUserConcern = objTarget.parentNode.previousSibling.firstChild.nextSibling.nextSibling.innerHTML;
    //获取当前元素的图片地址
    var oldSrc = objTarget.src;
    //使用正则表达式将图片的地址换成大一点的图片地址
    var neStr = oldSrc.replace(/.jpg/, "s.jpg");
    var targetSrc = neStr;
    //获取当前元素的文章内容
    var targetArticleText = objTarget.parentNode.nextSibling.firstChild.innerHTML;

    var modalInstance = new ModalBox(targetUserImg,targetUserName,targetUserConcern,targetSrc,targetArticleText);
    modalInstance.show();
    //点击关注按钮，待整改//////////////////////////////////
    modalInstance.concernBtn.onclick = function() {
        //var that = this;  
        //modalInstance.concernModalBtnClick(that); 
    } 
    modalInstance.closeBtn.onclick = function() {  
            modalInstance.close(); 
            //modalInstance = null; 
        } 
    modalInstance.outsideClick(); 
}




/*///////////////////问题，动态加载的方式在窗口小时没反应*/
//当网页加载完毕
function createBox() {
    //瀑布流布局 保证传的参数能够找到父盒子。这句是为静态的盒子实现瀑布流布局，静态盒子一开始是没有布局的
    waterFall('main','box');
    
    //滚动加载盒子
    //window.onscroll = function ()//断点调试时进不去这个函数，因为这个函数是对翻滚页面的反应，而调试时并没有翻滚页面
    //{
            // { 'usernamer':'Food tester','usericons':'202.jpg','img':'4.jpg','content':'来个甜点，轻松好心情'},
            // { 'usernamer':'Food tester','usericons':'203.jpg','img':'15.jpg','content':'帅啊'},
            // { 'usernamer':'Food tester','usericons':'203.jpg','img':'3.jpg','content':'ok'},
            // { 'usernamer':'Food tester','usericons':'204.jpg','img':'12.jpg','content':'铲屎官，你的地盘被朕征用啦！'},
            // { 'usernamer':'Food tester','usericons':'204.jpg','img':'5.jpg','content':'铲屎官，你的地盘被朕征用啦！'},
            // { 'usernamer':'Food tester','usericons':'206.jpg','img':'7.jpg','content':'没错，我就是吃货,铲屎官，你的地盘被朕征用啦！/////////////////////////'}]};


    	
        //判断是否加载
        if (checkWillLoad())//该函数在global.js里面
        {
            //创造假数据,后期实现了后台数据库再从数据库获取真实数据
            var data = {'dataImg':[{ 'usernamer':'Food tester','usericons':'201.jpg','img':'10.jpg','content':'舌尖上的美食舞蹈，你值得拥有'},
            { 'usernamer':'Food tester','usericons':'205.jpg','img':'18.jpg','content':'小迪门岛是丹麦法罗群岛18个岛屿中最小的一座，但是它经常有自己独特的云。'},            
            { 'usernamer':'Food tester','usericons':'205.jpg','img':'16.jpg','content':'你是我的花呀'},
            { 'usernamer':'Food tester','usericons':'205.jpg','img':'15.jpg','content':'好吧暖光系画手根本不会冷下来.....'},
            { 'usernamer':'Food tester','usericons':'205.jpg','img':'6.jpg','content':'卷卷真的好喜欢活力满满的运动场呀～手臂上的皮炎也好啦，开心！！！'},
            { 'usernamer':'Food tester','usericons':'205.jpg','img':'13.jpg','content':'午后与puppy'},
            { 'usernamer':'Food tester','usericons':'205.jpg','img':'17.jpg','content':'我们要懂得一天一天明白自己的平凡，同时也要一天一天愈加相信自己有点不平凡！'},
            { 'usernamer':'Food tester','usericons':'205.jpg','img':'5.jpg','content':'立夏 | 竹杖芒鞋轻胜马，一蓑烟雨任平生。'}]};           
            
            //使用createDocumentFragment提升加载效率
            var oFragment = document.createDocumentFragment();
            //加载数据，先把盒子全建好顺序添加，添完全部的之后再计算布局
            for(var i=0; i<data.dataImg.length; i++)
            {
                //创建最外面的盒子
                var newBox = document.createElement('div');
                newBox.className = 'box img-rounded';

                //创建用户信息的盒子
                var newUser = document.createElement('div');
                newUser.className = 'user';
                newBox.appendChild(newUser);//不能用$('box'),只能用newBox变量，因为是动态生成的类
                //创建用户信息里的图标盒子
                var newUserIcons = document.createElement('img');
                newUserIcons.className = 'usericon';
                newUserIcons.src = 'images/' + data.dataImg[i].usericons;
                newUser.appendChild(newUserIcons);
                //创建用户信息里的用户名盒子
                var newUserName = document.createElement('span');
                newUserName.innerHTML = data.dataImg[i].usernamer;//不能用.text,无效
                newUser.appendChild(newUserName);
                //创建用户信息里的按钮
                var newUserButton = document.createElement('button');
                newUserButton.className = "btn btn-default concern";
                newUserButton.innerHTML = '关注 +';
                newUser.appendChild(newUserButton);
                newUserButton.onclick = clickConcernBtn;//点击关注按钮后的反应

                //创建图片的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                newPic.onclick = clickPic;//注意这里需要给出准确的路径
                //创建img
                var newImg = document.createElement('img');
                newImg.src = 'images/' + data.dataImg[i].img;
                newPic.appendChild(newImg);

                //创建显示文字的盒子
                var newArticleText = document.createElement('div');
                newArticleText.className = 'articletext';
                newBox.appendChild(newArticleText);
                //创建显示文章的p
                var newTextDis = document.createElement('p');
                newTextDis.className = "textdis";
                newTextDis.innerHTML = data.dataImg[i].content;
                newArticleText.appendChild(newTextDis);

                oFragment.appendChild(newBox);

                //var boxHeights = newBox.offsetHeight;///////////////问题：一直是52,原因是图片加载较缓慢，
                                                        //若在firefox就可以实现。解决办法：调用布局函数前先加个延时1秒
            }

            //DocumentFragment中的新元素加载完毕后一次性加入布局中，这样只形成了一次回流，提升加载效率
            $('main').appendChild(oFragment);

            //把刚创建的盒子瀑布流布局
            //加延时的原因：为了解决获取动态加载图片的高度老是不成功的问题，浏览器原因，FireFox并没有问题
            setTimeout("waterFall('main','box')",500);            
        }
    //}

    var retage = document.getElementById("retag");
    retage.onclick = function(){ ajax('/php/test.php', callBackFunctiona); };//若带参想传参，又不想立即调用，正确的调用函数方法如左边
}


//为静态盒子的点击添加事件
function fixedBoxClick(){
    //添加点击事件
    var fixedboxs = document.getElementsByClassName("fixedbox");
    for(var j = 0; j<fixedboxs.length; j++)
    {
        fixedboxs[j].onclick = clickPic;
    }
}

//网页加载后调用函数
addLoadEvent(fixedBoxClick);

//网页加载后调用函数
addLoadEvent(createBox);

//实现瀑布流布局
//规则:从第二行开始的图片,总是拼接在上一行高度最矮的图片后面
function  waterFall(parent,box) {
    //父盒子居中
    //通过父盒子拿到所有的子盒子
    var allBox = $(parent).getElementsByClassName(box);
    //求出盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    //var boxWidth = 290;//当没有预置的卡片时，这些地方需要改
    //求出浏览器的宽度(包括边框的宽高)
    var screenWidtn = document.body.offsetWidth;
    //求出列数 //取整函数取整
    var cols = Math.floor(screenWidtn/boxWidth);
    //父标签居中
    //先求出父标签宽度
    var parentWith = boxWidth * cols +150;
    $(parent).style.width = parentWith + 'px';//设置父元素的宽度为屏幕宽度而不用boxWidth * cols原因是
											    //后者放不下4个box,会导致换行
    //居中
    //$(parent).style.margin = '10 auto';
    
    //子盒子定位
    //创建一个高度数组,存所有的高度
    var heightArr = [];
    //遍历
    for(var i = 0; i < allBox.length ;i++)
    {
        //求出每个盒子的高度
        var boxHeight = allBox[i].offsetHeight;///////////////问题：一直是52
        //第一行的盒子不需要重新定位//每一行的盒子数与列数相同
        if(i<cols)
        {
            //添加第一行所有盒子高度
            heightArr.push(boxHeight);
        }
        else//剩下的盒子都需要瀑布流布局
        {
            //求出最矮的盒子高度
            //alert(this);
            var minBoxHeight = Math.min.apply(this,heightArr);
            //求出最矮盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight,heightArr);
            //alert(minBoxIndex);
            //盒子瀑布流定位  顶部间距就是最矮盒子的高度
            allBox[i].style.position = 'absolute';
            minBoxHeight += 20;
            allBox[i].style.top = minBoxHeight + 'px';
            var allBoxLeft = minBoxIndex * boxWidth + minBoxIndex * 20;  //注意和.box的margin-left属性同步修改       	  
            allBox[i].style.left = allBoxLeft +'px';
            //关键:更新数组最矮高度,使下一个图片在高度数组中总是找最矮高度的图片下面拼接
            boxHeight += 20;
            heightArr[minBoxIndex] += boxHeight;
            //alert(heightArr[minBoxIndex]);
        }
    }
}

//求出最矮盒子对应的索引函数
function getMinBoxIndex(val,arr) {
    for(var i in arr)
    {
        if(val == arr[i])
        {
            return i;
        }
    }
}

//加载更多规则:当浏览器最下方到达图片的高度一半时让其刷新出来
//判断是否符合加载条件
function checkWillLoad() {
    //取出所有盒子
    var allBox = $('main').getElementsByClassName('box');
    //取出最后一个盒子
    var lastBox = allBox[allBox.length - 1];
    //求出最后一个盒子高度的一半 + 内容与浏览器头部的偏离位置
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
    //求出浏览器的高度
    // 注意:JS代码存在浏览器兼容问题 一般分标准模式(按屏幕算document.body.offsetHeight)和混杂模式(按所有内容算)
    var screenHeight =  document.documentElement.clientHeight;
    //页面偏离屏幕的高度
    var scrollTopHeight = document.body.scrollTop;
    //判断
    return lastBoxDis <= screenHeight + scrollTopHeight;
}
