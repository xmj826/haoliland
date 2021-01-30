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

if(cookie.get("username") && cookie.get("password")){
    window.location.href="http://192.168.31.37/Holiland/html/index.html";
}
let user = document.querySelector(".use .user");
    let psw = document.querySelector(".use .password");
    let sub = $(".sub")
    user.oninput = function () {
        document.querySelectorAll(".use-point")[0].style.display = "block";
        if (/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(this.value)) {
            document.querySelectorAll(".use-point")[0].style.display = "none"
        }
    }
    psw.oninput = function () {
        if ((/^.{6,20}$/).test(this.value)) {
            document.querySelectorAll(".use-point")[1].style.display = "none";
        }
        else {
            document.querySelectorAll(".use-point")[1].style.display = "block";
        }
    }
    sub.click(function(){
        let http = new XMLHttpRequest();
        http.open("get", `http://192.168.31.37:8080/login?phone=${$(".use .user").val()}&password=${$(".use .password").val()}`);
        http.send();
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                if (http.responseText === "success") {
                    sessionStorage.setItem("phone",$(".use .user").val());
                    let rember = document.querySelector("#rember");
                    if(rember.checked){
                        cookie.set("username",$(".user").val(),30)
                        cookie.set("password",$(".password").val(),30)
                    }
                    window.location.href="http://192.168.31.37/Holiland/html/index.html";
                    
                }
                else {
                    alert("用户名或密码错误")
                }
            }
        }
    })