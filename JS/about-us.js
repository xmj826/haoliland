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