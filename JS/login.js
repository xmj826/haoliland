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
                    window.location.href="http://192.168.31.37/Holiland/html/index.html";
                }
                else {
                    alert("用户名或密码错误")
                }
            }
        }
    })