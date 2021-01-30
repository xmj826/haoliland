//读取是否登录
let phone = document.querySelector(".login a");
if (sessionStorage.getItem("phone")) {
    document.querySelectorAll(".login a")[1].remove();
    phone.innerHTML = "您好!" + sessionStorage.getItem("phone");
    phone.href = ""
}
let add = document.querySelector(".add");
let sub = document.querySelector(".sub");
let count = document.querySelector(".count");
let cart = document.querySelector(".cart");
let popup = document.querySelector(".popup h3");
let goon = document.querySelector(".goon")
add.onclick = function () {
    count.innerHTML = Number(count.innerHTML) + 1;
}
sub.onclick = function () {
    if (count.innerHTML > 1) {
        count.innerHTML = Number(count.innerHTML) - 1;
    }
    else {
        count.innerHTML = 1;
    }
}
// cart.onclick = function () {
//     document.querySelector(".popup").style.display = "block";
// }
popup.onclick = function () {
    document.querySelector(".popup").style.display = "none";
}
goon.onclick = function () {
    document.querySelector(".popup").style.display = "none";
}


let id = window.location.search.slice(4, );
let http = new XMLHttpRequest();
http.open("get", `http://192.168.31.37:8080/description?id=` + id);
http.send();
http.onreadystatechange = function () {
    if (http.readyState === 4) {
        detail = JSON.parse(http.responseText)[0];
        $(".leftImg").attr("src", detail.mainImg);
        $(".right-box img").attr("src", detail.assistantImg);
        $(".middle .name").html(detail.name);
        $(".middle .price").html("￥" + detail.price + ".00");
        $(`    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">`).appendTo($(".produce-con"));
        let img = document.querySelectorAll(".produce-con img");
        img[0].src = detail.img1;
        img[1].src = detail.img2;
        img[2].src = detail.img3;
        img[3].src = detail.img4;
        img[4].src = detail.img5;


    }
}
$(".cart").click(function () {
    sessionStorage.setItem("attribute", detail.attribute);
    let name = $(".name").html();
    let attribute = sessionStorage.getItem("attribute");
    let price = $(".price").html().slice(1, );
    let count = $(".count").html();
    let phone = sessionStorage.getItem("phone");
    let img = $(".leftImg").attr("src");
    let http = new XMLHttpRequest();
    http.open("get", `http://192.168.31.37:8080/addcart?name=${name}&attribute=${attribute}&price=${price}&count=${count}&phone=${phone}&img=${img}`);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            document.querySelector(".popup").style.display = "block";
        }
    }
})
