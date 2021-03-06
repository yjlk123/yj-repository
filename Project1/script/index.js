/*
* @Author: yj
* @Date:   2018-03-25 18:23:20
* @Last Modified by:   yj
* @Last Modified time: 2018-06-08 12:31:34
*/

/**
index.thml对应的js文件
*/

function $(id) {
    //判断id的类型,注意是传入的id,而非classname
    return typeof id === 'string'?document.getElementById(id):id;
}

var i = 0;

//图片的鼠标点击事件
function objclick(){
      //通过点击图片实现展示方式的切换
	if(this.className == 'textpic'){
		this.className = 'textpicchange';//注意removeClass和addClass不生效，不是属于js的函数
	}
	else{
		this.className = 'textpic';
	}
}

//当网页加载完毕
function createFirstpageArea(){
	//判断是否加载
	//if(checkWillLoad()){//此处判断是否加载的函数时不对的，是recommend.js里的函数，并不通用
		//创造假数据，后期完善数据库后从数据库里取数据
		var firstpageData = {'firstpageInfo':[{'userImg':'101.jpg','userName':'analyser','textImg':'9s.jpg','textContent':'比格line：“策划一个惊天！大型！恶作剧！'},
							{'userImg':'102.jpg','userName':'analyser','textImg':'3s.jpg','textContent':'来自和绑红丝带买不到于是放弃了肩饰…就这样吧上个滤镜剩下交给摄影师！！'},
							{'userImg':'103.jpg','userName':'analyser','textImg':'1s.jpg','textContent':'比格line：“策划一个惊天！大型！恶作剧！'},
							{'userImg':'101.jpg','userName':'analyser','textImg':'7s.jpg','textContent':'比格line：“策划一个惊天！大型！恶作剧！'}
							]};


		//将sessionStorage里的内容插入数组中/////////////////////问题：宽度比其他的较小
            var article = sessionStorage.getItem("articleRel");
            if(article !== "" && article !== null){
                  firstpageData.firstpageInfo.unshift({'userImg':'102.jpg','userName':'analyser','textImg':'default.jpg','textContent':article});//向数组添加数据可以直接这样加变量
            }



            //动态加载数据
		for(var i = 0; i<firstpageData.firstpageInfo.length; i++){
			//创建最外层盒子
			var newArea = document.createElement('div');
			newArea.className = 'firstpagedisarea';
            $('firstpagedis').appendChild(newArea);

            //创建用户信息的盒子
            var newUserInfo = document.createElement('div');
            newUserInfo.className = 'firstpageuserarea';
            newArea.appendChild(newUserInfo);
            //创建用户的头像的Img
            var newFirstpageUser = document.createElement('img');
            newFirstpageUser.className = 'firstpageuser';
            newFirstpageUser.src = 'images/' + firstpageData.firstpageInfo[i].userImg;
            newUserInfo.appendChild(newFirstpageUser);

            //创建文章的盒子
            var newTextArea = document.createElement('div');
            newTextArea.className = 'firstpagetextarea';
            newArea.appendChild(newTextArea);
            //创建文章图片的盒子
            var newTextPic = document.createElement('div');
            newTextPic.className = 'textpic';
	      newTextArea.appendChild(newTextPic);
	      //为图片动态循环添加鼠标点击事件
            newTextPic.onclick = objclick;
        
            //创建文章图片的img
            var newTextPicImg = document.createElement('img');
            newTextPicImg.src = 'images/' + firstpageData.firstpageInfo[i].textImg;
            newTextPic.appendChild(newTextPicImg);

            //创建文章内容的盒子
            var newTextContextArea = document.createElement('div');
            newTextContextArea.className = 'textpic';
            newTextArea.appendChild(newTextContextArea);
            //创建文章内容的span
            var newTextContextSpan = document.createElement('span');
            newTextContextSpan.className = 'textcontent';
            newTextContextSpan.innerHTML = firstpageData.firstpageInfo[i].textContent;
            newTextContextArea.appendChild(newTextContextSpan);            

		}
	//}

}	

//网页加载后调用函数
addLoadEvent(createFirstpageArea);