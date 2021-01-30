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
            console.log(detail[i].id)
            let newItem = $(".template").clone(true);
            newItem = newItem.get()[0];
            newItem.querySelector("a").href = "http://192.168.31.37/Holiland/html/description.html?id=" + detail[i].id;
            // console.log(newItem.querySelector("a").src
            newItem.className = "";
            document.querySelector(".project-con ul").appendChild(newItem);
            newItem.querySelector("img").src = detail[i].mainImg;
            newItem.querySelector("p").innerHTML = detail[i].name + "...";
            newItem.querySelector("b").innerHTML = "￥" + detail[i].price + ".00";
            console.log(newItem);
        }
    }
}