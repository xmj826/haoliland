let http = new XMLHttpRequest();
http.open("get", `http://192.168.31.37:8080/about`);
http.send();
http.onreadystatechange = function () {
    if (http.readyState === 4) {
        let detail = JSON.parse(http.responseText);
        document.querySelector("#about img").src = detail[0].img
    }
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