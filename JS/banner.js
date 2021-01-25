function banner() {
    var liList = $("#imgWrap li");
    var next = $("#next");
    var prev = $("#prev");
    var dotWrap = $("#dotWrap");
    var wrap = $("#wrap");
    // 当前在第几张上
    var n = 0;
    // 当前动画是否正在执行
    var isAnimation = false;

    // 动态生成小圆点
    for (var i = 0; i < liList.length; i++) {
        var span = document.createElement('li')
        span.setAttribute("data-index", i)
        dotWrap.appendChild(span)
        if (i === 0) {
            span.className = "focus"
        }
    }

    var dotList = $("#dotWrap li")

    function changeImg() {
        // 隐藏所有图片 
        for (var i = 0; i < liList.length; i++) {
            liList[i].className = ""
            dotList[i].className = ""
        }

        dotList[n].className = "focus";
        // 显示第n张图片
        liList[n].className = "show";
        liList[n].style.opacity = 0;
        isAnimation = true;
        var fade = setInterval(function () {
            var o = parseFloat(liList[n].style.opacity);
            if (o >= 1) {
                clearInterval(fade);
                isAnimation = false;
                return;
            }
            liList[n].style.opacity = o + 0.02;
        }, 16)

    }


    next.onclick = function () {
        if (isAnimation) {
            return;
        }

        if (n < liList.length - 1) {
            n++
        }
        else {
            n = 0
        }

        changeImg()
    }

    prev.onclick = function () {
        if (isAnimation) {
            return;
        }

        if (n === 0) {
            n = liList.length - 1
        }
        else {
            n--
        }

        changeImg()
    }

    bindEvent(dotList, "onclick", function () {
        if (isAnimation) {
            return;
        }
        n = this.getAttribute("data-index");
        changeImg()
    })




    var autoPlay = setInterval(function () {
        next.click()
    }, 3000)

    wrap.onmouseenter = function () {
        clearInterval(autoPlay)
    }

    wrap.onmouseleave = function () {
        autoPlay = setInterval(function () {
            next.click()
        }, 3000)
    }
}


