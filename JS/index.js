//聊天框
let ul = document.querySelectorAll(".content ul")[0];
let input = document.querySelectorAll(".bottom .foot input")[0];
let button = document.querySelectorAll(".bottom .foot button")[0];
let content = document.querySelector(".content");
let c = document.querySelector(".c");
let u = document.querySelector(".u");
button.onclick = function () {
    if (!input.value) { alert("请输入文字~") }
    else {
        var sendUl = ul.cloneNode(true);
        content.appendChild(sendUl);
        sendUl.querySelector(".receive").className = "send";
        sendUl.querySelector(".send").getElementsByTagName("span")[0].className = "";
        if (input.value.length > 14) {
            console.log(input.value.length)
            sendUl.querySelector(".send").getElementsByTagName("span")[0].style.width = "250px";
        }
        sendUl.querySelector(".send").getElementsByTagName("span")[0].innerHTML = input.value;
        input.value = "";
    }
    var message = sendUl.querySelector(".send").getElementsByTagName("span")[0].innerHTML
    let http = new XMLHttpRequest();
    http.open("get", "http://www.tuling123.com/openapi/api?key=1c99470a8a8354e248a4c229234d14af&info=" + message);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            let newReceive = ul.cloneNode(true);
            content.appendChild(newReceive);
            newReceive.querySelector(".receive").getElementsByTagName("span")[0].innerHTML = http.responseText.split(",")[1].split(":")[1].replace(/[\{\}\"]/g, "");
            content.scrollTop = content.scrollHeight; //滚动条随内容滚动
        }
    }
    content.scrollTop = content.scrollHeight; //滚动条随内容滚动
    document.onkeyup = function (event) {
        if (event.keyCode === 13) {
            button.click();
        }
    }
}



//打开
let chatbox = document.querySelectorAll(".window")[0]
let chat = document.querySelector(".chat");
chat.onclick = function () {
    chatbox.style.bottom = "0";
    chatbox.style.right = "30px";
}
// 关闭
let cancel = document.querySelector("#cancel");
cancel.onclick = function () {
    chatbox.style.bottom = "44444444444444px";
    chatbox.style.right = "44444444444444px";
}
//读取是否登录
let phone = document.querySelector(".login a");
if(sessionStorage.getItem("phone")){
    document.querySelectorAll(".login a")[1].remove();
    phone.innerHTML = "您好!" + sessionStorage.getItem("phone");
    phone.href = ""
}
//cookie的写入，查看，修改，删除
let cookie = {
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
    }
}
//30天内免登录
if(cookie.get("username") && cookie.get("password")){
    document.querySelectorAll(".login a")[1].remove();
    phone.innerHTML = "您好!" + cookie.get("username");
    phone.href = ""
}