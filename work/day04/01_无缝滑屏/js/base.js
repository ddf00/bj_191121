// 1. 加meta标签
// 2. 挑选一个适配方案
// 3. 禁止移动端事件的默认行为
(function (w) {

    w.swiper = {};
    //wrap:移动端开发时的包裹节点
    function init(wrap) {
        //挑选一个适配方案
        var styleNode = document.createElement("style");
        var w = document.documentElement.clientWidth/16;
        styleNode.innerHTML = `html{font-size:${w}px!important}`;
        document.head.appendChild(styleNode)
        //禁止移动端事件的默认行为
        wrap.addEventListener("touchstart",(ev)=>{
            ev = ev || event;
            ev.preventDefault();
        })
    };
    //arr:当前无缝滑屏需要的图片的地址
    function slide(arr){
        var swiperWrap = document.querySelector(".swiper-wrap");//滑屏区域
        var ulNode = document.createElement("ul");//滑屏元素
        var ponitWrap = document.querySelector(".swiper-wrap > .point-wrap");//小圆点
        var liNode = document.querySelector(".swiper-wrap .list li");
        var styleNode = document.createElement("style");//创建一个style标签
        if(!swiperWrap){
            throw new Error("页面上缺少swiper-wrap这个滑屏区域")
            return ;
        }

        //根据arr动态的去创建滑屏元素
        ulNode.classList.add("list"); // 给ulNode加class的
        for(var i=0;i<arr.length;i++){
            ulNode.innerHTML+="<li><img src="+(arr[i])+"></li>";
        }
        swiperWrap.appendChild(ulNode);
        styleNode.innerHTML=".swiper-wrap .list{width:"+(arr.length)+"00%}";
        styleNode.innerHTML+=".swiper-wrap .list li{width:"+(1/arr.length)*100+"%}";
        document.head.appendChild(styleNode);

        //小圆点相关的逻辑
        if(ponitWrap){
            for(var i=0;i<arr.length;i++){
                if (i==0){
                    ponitWrap.innerHTML+="<span class='active'></span>"
                }else{
                    ponitWrap.innerHTML+="<span></span>"
                }
            }
        }

        //重新渲染滑屏区域的高度
        liNode = document.querySelector(".swiper-wrap .list li");
        //代码执行到第55行时 界面可能还没有渲染成功
        setTimeout(()=>{
            swiperWrap.style.height = liNode.offsetHeight + "px";
        },200)

        //开始滑屏
        move(swiperWrap,ulNode,ponitWrap,arr)
    }
    //滑屏的主体方法
    function move(wrap,node,pWrap,arr){
        /*
            基本逻辑
                1. 拿到滑屏元素一开始的位置
                2. 计算出手指滑动的距离
                3. 将手指滑动的距离给滑屏元素加上
        */
        var eleStartX = 0;
        var touchStartX = 0;
        var touchDisX = 0;
        var index = 0; // 滑屏元素滑动的距离
        wrap.addEventListener("touchstart",function (ev) {
            ev = ev || event;
            node.style.transition = "";

            var touchC = ev.changedTouches[0];
            touchStartX = touchC.clientX;//手指一开始的位置
            eleStartX = node.offsetLeft;//滑屏元素一开始的位置
        })
        wrap.addEventListener("touchmove",function (ev) {
            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var touchNowX = touchC.clientX;//手指的实时位置
            touchDisX = touchNowX - touchStartX;//手指滑动的距离
            node.style.left = eleStartX + touchDisX +"px";
        })
        wrap.addEventListener("touchend",function () {

            //node.offsetLeft 代表了滑屏元素在手指抬起时的实时位置!!!
            //index : 滑屏元素的实时位置 与 视口的比例
            // -0.4 向前滑了0.4个视口的距离  --> 0
            // -0.6 向前滑了0.6个视口的距离  --> -1
            index = Math.round(node.offsetLeft / document.documentElement.clientWidth)

            //判断一下边界情况
            /*if(index < 0){
                index =0
            }else if(index > (arr.length-1)){
                index = arr.length-1
            }*/

            //同步小圆点
            /*if(pWrap){
                var points = pWrap.querySelectorAll("span");
                for(var i=0;i<points.length;i++){
                    points[i].classList.remove("active");
                }
                points[index].classList.add("active");
            }*/


            node.style.transition = ".5s left";
            node.style.left = index*document.documentElement.clientWidth+"px";
        })
    }



    w.swiper.init =init
    w.swiper.slide=slide
})(window)

