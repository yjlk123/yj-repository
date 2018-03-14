/*
* @Author: yj
* @Date:   2018-03-07 10:14:35
* @Last Modified by:   yj
* @Last Modified time: 2018-03-14 10:11:28
*/
/**
recommend.thml对应的js文件
*/

function $(id) {
    //判断id的类型
    return typeof id === 'string'?document.getElementById(id):id;////////////////////////////////
}

//当网页加载完毕
function createBox() {
    //瀑布流布局 保证传的参数能够找到父盒子
    waterFall('main','box');
    
    //滚动加载盒子
    //window.onscroll = function ()//断点调试时进不去这个函数，因为这个函数是对翻滚页面的反应，而调试时并没有翻滚页面
    //{
    	//alert("1");
        //判断是否加载
        console.log("123");
        if (checkWillLoad())
        {
            //创造假数据
            var data = {'dataImg':[{'img':'2.jpg'},{'img':'3.jpg'},{'img':'5.jpg'},{'img':'5.jpg'},{'img':'6.jpg'},{'img':'3.jpg'}]};
            //加载数据，先把盒子全建好顺序添加，添完全部的之后再计算布局
            for(var i=0; i<data.dataImg.length; i++)
            {
                //创建最外面的盒子
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);
                //创建单个盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                //创建img
                var newImg = document.createElement('img');
                newImg.src = 'images/' + data.dataImg[i].img;
                newPic.appendChild(newImg);
            }
            //把刚创建的盒子瀑布流布局
            waterFall('main','box');
        }
    //}
}

//网页加载后调用函数
//addLoadEvent(createBox);
createBox();
//实现瀑布流布局
//规则:从第二行开始的图片,总是拼接在上一行高度最矮的图片后面
function  waterFall(parent,box) {
    //父盒子居中
    //通过父盒子拿到所有的子盒子
    var allBox = $(parent).getElementsByClassName(box);
    //求出盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    //求出浏览器的宽度(包括边框的宽高)
    var screenWidtn = document.body.offsetWidth;
    //求出列数 //取整函数取整
    var cols = Math.floor( screenWidtn/boxWidth);
    //父标签居中
    //先求出父标签宽度
    $(parent).style.width = boxWidth * cols + 'px';
    //居中
    $(parent).style.margin = '0 auto';
    
    //子盒子定位
    //创建一个高度数组,存所有的高度
    var heightArr = [];
    //遍历
    for(var i = 0; i < allBox.length ;i++)
    {
        //求出每个盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        //第一行的盒子不需要重新定位//每一行的盒子数与列数相同
        if(i<cols)
        {
            //添加第一行所有盒子高度
            heightArr.push(boxHeight);
        }
        else//剩下的盒子都需要瀑布流布局
        {
            //求出最矮的盒子高度
            var minBoxHeight = Math.min.apply(this,heightArr);
            //求出最矮盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight,heightArr);
            //盒子瀑布流定位  顶部间距就是最矮盒子的高度
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidth +'px';
            //关键:更新数组最矮高度,使下一个图片在高度数组中总是找最矮高度的图片下面拼接
            heightArr[minBoxIndex] += boxHeight;
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
