//cookie的写入，查看，修改，删除
let cookiefun = {
    //写入+修改
    set(key, value, day) {
        let date = new Date();
        date.setDate(date.getDate() + 30);
        document.cookie = key + "=" + value + ";expires=" + date;
    },
    //查询
    get(key) {
        let arr = document.cookie.split("; ");
        var o = {};
        arr.forEach(item => {
            let key = item.split("=")[0];
            let value = item.split("=")[1];
            o[key] = value;
        })
        return o?o[key]:o;
    },
   //删除
    remove(key){
        if(this.get(key)){
            document.cookie = key + "= 21;expires=" + new Date(1999-01-01);
            return true;
        }
        else{
            return false;
        }
    }

}
//设置读取node
function $(selelctor) {
    if (document.querySelectorAll(selelctor).length === 1) {
        return document.querySelectorAll(selelctor)[0];
    }
    return document.querySelectorAll(selelctor);
}

//随机颜色
function getRandomColor() {
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var result = "#";
    for (var i = 0; i < 6; i++) {
        var index = Math.floor(Math.random() * 16)
        result = result + arr[index];
    }
    return result;
}

//node节点列表绑定事件
function bindEvent(list, event, fn) {
    for (var i = 0; i < list.length; i++) {
        list[i][event] = fn;
    }
}

//随机验证码
function verifyCode(n) {
    let count = n || 4;
    let arr = ["q", "a", "z", "w", "s", "x", "e", "d", "c", "r", "f", "v", "t", "g", "b", "y", "h", "n", "u", "j", "m", "i", "k", "o", "l", "p", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let result = [];
    for (let i = 1; i <= count; i++) {
        let index = Math.floor(Math.random() * arr.length)
        result = result + arr[index];
    }
    return result;
}

//淡出删除动画
function fadeOut(obj, speed, callback) {
    if (speed === "slow") { s = 0.02 }
    if (speed === "normal" || speed === undefined) { s = 0.03 }
    if (speed === "fast") { s = 0.04 }
    obj.style.opacity = 1;
    let out = setInterval(() => {
        let o = obj.style.opacity;
        if (o <= 0) {
            clearInterval(out);
            obj.remove();
            if (callback) { callback() }
            return;
        }
        obj.style.opacity = o - s;
    }, 16)
}

//淡入
function fadeIn(obj, speed, callback) {
    if (speed === "slow") { s = 0.02 }
    if (speed === "normal" || speed === undefined) { s = 0.03 }
    if (speed === "fast") { s = 0.04 }
    obj.style.opacity = 0;
    obj.style.display = "block";
    let out = setInterval(() => {
        let o = obj.style.opacity;
        if (o >= 1) {
            clearInterval(out);
            if (callback) { callback() }
            return;
        }
        obj.style.opacity = o + s;
    }, 16)
}
//ajax函数
function ajax(url, fn) {
    http.open("get", url);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            response = JSON.parse(http.responseText)[0];
            fn();
        }
    }
}
