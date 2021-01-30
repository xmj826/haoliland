let img = document.querySelector(".test-img");
let arr1 = ["../images/identifying code/01.png", "../images/identifying code/02.png", "../images/identifying code/03.png", "../images/identifying code/04.png", "../images/identifying code/05.png"];
let arr2 = ["8R8C", "iG22", "yiPT", "s6sn", "LYW6"];
let n = parseInt(Math.random() * 4);
img.src = arr1[n]
let phone = document.querySelector(".telephone");
let code = document.querySelector(".test");
let password = document.querySelector(".password");
let confirm = document.querySelector(".confirm");
phone.oninput = function () {
    document.querySelector("#telephone").style.display = "block";
    if (/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(this.value)) {
        document.querySelector("#telephone").style.display = "none"
    }
}
code.oninput = function () {
    document.querySelector("#text-code").style.display = "block";
    if (this.value == arr2[n]) {
        document.querySelector("#text-code").style.display = "none"
    }
}
password.oninput = function () {
    document.querySelector("#psw").style.display = "block";
    if ((/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,20}$/).test(this.value)) {
        document.querySelector("#psw").style.display = "none"
    }
}
confirm.oninput = function () {
    document.querySelector("#psw-again").style.display = "block";
    if (this.value == password.value) {
        document.querySelector("#psw-again").style.display = "none"
    }
}
let sub = $(".sub");
sub.click(function () {
    if (document.querySelector("#text-code").style.display == "none" && document.querySelector("#psw").style.display == "none" && document.querySelector("#psw-again").style.display == "none" && code.value && password.value && phone.value && confirm.value) {
        let http = new XMLHttpRequest();
        http.open("get", `http://192.168.31.37:8080/add?phone=${$(".telephone").val()}&password=${$(".password").val()}`);
        http.send();
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                if (http.responseText === "success") {
                    sessionStorage.setItem("phone", $(".telephone").val());
                    alert("注册成功！");
                    sessionStorage.setItem("phone",$(".telephone").val());
                    window.location.href = "http://192.168.31.37/Holiland/html/index.html";
                }
                if (http.responseText === "error2") {
                    alert("该电话已注册");
                }
            }
        }
    }

})