//读取是否登录
let phone = document.querySelector(".login a");
if (sessionStorage.getItem("phone")) {
    document.querySelectorAll(".login a")[1].remove();
    phone.innerHTML = "您好!" + sessionStorage.getItem("phone");
    phone.href = ""
}
let http = new XMLHttpRequest();
http.open("get", `http://192.168.31.37:8080/list`);
http.send();
http.onreadystatechange = function () {
    if (http.readyState === 4) {
        let detail = JSON.parse(http.responseText);
        for (let i = 0; i < detail.length; i++) {
            let newItem = $(".template").clone(true);
            newItem = newItem.get()[0];
            newItem.querySelector("a").href = "http://192.168.31.37/Holiland/html/description.html?id=" + detail[i].id;
            // console.log(newItem.querySelector("a").src
            newItem.className = "";
            document.querySelector(".project-con ul").appendChild(newItem);
            newItem.querySelector("img").src = detail[i].mainImg;
            newItem.querySelector("p").innerHTML = detail[i].name + "...";
            newItem.querySelector("b").innerHTML = "￥" + detail[i].price + ".00";
        }
    }
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