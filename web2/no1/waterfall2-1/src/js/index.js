// ajax('get', 'http://localhost/web/ajax/waterfall2-1/src/js/data.txt', addDom, 'cpage=1', true);
// function addDom(data) {
//     // data = JSON.parse(data);
//     console.log(JSON.parse(data));
// }

//立即执行函数
(function (){
    var oLi = document.getElementsByClassName('box'),
    //加锁   判断是否进行滚动了以免加载太多数据
        flag = false,
        num = 1,
        initWidth = 200;
    //入口函数
    function getData(){
        if(!flag) {
            flag = true;
            ajax('GET', 'http://localhost/web/ajax/waterfall2-1/src/js/data.txt', addDom, 'cpage=' + num, true);
            num++;
        }
    }
    //执行init函数
    getData();
    function addDom(data) {
        var dataList = JSON.parse(data);
        console.log(dataList); 
        //只有当数据页是存在的时候才能进行处理
        if (dataList.length > 0) {
            dataList.forEach(function (ele, index){

                var minIndex = getMinList(oLi);
                // console.log(minIndex);
                var oItem = document.createElement('div'),
                    oImg = new Image(),
                    oP = document.createElement('p'),
                    oCont = document.createElement('div');
                    oCont.className = '.cont';
    
                    oItem.className = 'item';
                    oImg.src = ele.preview;
    
                    //等比例缩放的原则控制加载回来后长度过长
                    //——height/width = h/200_——height = h*width/200
                    oImg.height = ele.height*initWidth / ele.width;
                    oCont.style.height = ele.height*initWidth / ele.width;
    
                    oP.innerText = ele.title;
    
                    //如果图片加载失败了
                    oImg = onerror = function() {
                        this.style.width = '202px';
                        oImg.height = ele.height*initWidth / ele.width + 2; 
                        this.style.margin = '-1px';
                    }
    
                    oCont.appendChild(oImg);
    
                    oItem.appendChild(oCont);
                    oItem.appendChild(oP);
                    
                    oLi[minIndex].appendChild(oItem);
            });
        }
        //成功获取一次的请求数据后，锁变为false 
        flag = false;
    }
    function getMinList(dom) {
        var minHeight = dom[0].offsetHeight,
           i = 1,
           index = 0;
       for(; i < dom.length; i++) {
           var minH = dom[i].offsetHeight;
           if(minHeight > minH) {
               //而使用offsetHeight这个方法会重新计算性能，整个页面重新布局，所以不用这个
               //会十分损耗性能——所以减少使用次数——用其他的变量代替
               // minHeight = dom[i].offsetHeight;
               minHeight = minH;
               index = i;
           }
       } 
       return index; 
    }
    // 监听滚轮事件
    window.onscroll = function() {
        //浏览器的方法兼容(获取滚动条的高度和显示区域的高度)
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        //文档高度_——找最短的防止空白过长
        var pageHeight = oLi[getMinList(oLi)].offsetHeight;

        if(scrollHeight + clientHeight > pageHeight){
            getData();
            //有很多问题
            //——1.数据加载需要时间，如果这期间下拉请求一次，可能请求多次一次回来几百条数据
            //——所以需要加一个锁x


        }
    }

})()

// 总结：
// 写完dom——ajax函数 
//不太明白——视频看到2分整  但是知识点很混乱——需要完全重新看的一章
