//读取是否登录

    let tel = document.querySelector(".login a");
    if (sessionStorage.getItem("phone")) {
        document.querySelectorAll(".login a")[1].remove();
        tel.innerHTML = "您好!" + sessionStorage.getItem("phone");
        tel.href = ""
    }
    else {
        alert("请登录嗷~")
        window.location.href = "http://192.168.31.37/Holiland/html/login.html"
    }


    let phone = sessionStorage.getItem("phone");
    let http = new XMLHttpRequest();
    http.open("get", `http://192.168.31.37:8080/cart?phone=${phone}`);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            detail = JSON.parse(http.responseText);
            if (detail.length) {
                $(".null").remove();
                let cart = document.querySelector(".cart");
                cart.style.display = "block";
                let foot = document.querySelector(".bottom .foot");
                foot.style.display = "block"
                for (let i = 0; i < detail.length; i++) {
                    let newItem = $("#formcart .template").clone(true);
                    newItem = newItem.get()[0];
                    newItem.setAttribute("id", detail[i].id)
                    document.querySelector("tbody").appendChild(newItem);
                    newItem.querySelector(".template img").src = detail[i].img;
                    newItem.querySelector("p").innerHTML = detail[i].name;
                    newItem.querySelector(".attribute").innerHTML = detail[i].attribute;
                    newItem.querySelector(".integral").innerHTML = detail[i].price + "积分";
                    newItem.querySelector(".monovalent").innerHTML = "￥" + detail[i].price + ".00";
                    newItem.querySelector(".count").innerHTML = detail[i].count;
                }
                $("#formcart .template")[0].remove();
            }
            // 总计
            let total = document.querySelector(".count-price");
            //单价
            let monovalent = document.querySelector(".monovalent");
            //小计
            let subtotal = document.querySelectorAll(".subtotal");
            // 全选
            let select = document.querySelector(".foot span");
            //复选框
            let check = document.querySelectorAll("#check");
            //加号
            let add = document.querySelectorAll(".select .add");
            //减号
            let sub = document.querySelectorAll(".select .sub");
            //删除
            let remove = document.querySelectorAll(".remove");
            // //提交按钮
            let next = document.querySelector(".next");
            next.onclick = function () {
                let check = document.querySelectorAll("#check");
                for (let i = 0; i < check.length; i++) {
                    if (check[i].checked) {
                        let id=check[i].parentNode.parentNode.parentNode.parentNode.id
                        let http = new XMLHttpRequest();
                        http.open("get", `http://192.168.31.37:8080/delete?phone=${phone}&id=${id}`);
                        http.send();
                        http.onreadystatechange = function () {
                            if (http.responseText == "success") {
                                alert("购买成功！");
                                window.location.href = "http://192.168.31.37/Holiland/html/shop-cart.html"
                            }
                        } 
                    }

                }

            }
            // 更新小价和总计
            function computed() {
                let c = 0;
                for (let i = 0; i < subtotal.length; i++) {
                    subtotal[i].innerHTML = "￥" + subtotal[i].parentNode.childNodes[7].innerHTML.slice(1, ) * subtotal[i].parentNode.querySelector(".count").innerHTML + ".00";
                    if (subtotal[i].parentNode.querySelector("#check").checked) {
                        c = c + Number(subtotal[i].innerHTML.slice(1, ));
                    }
                }
                total.innerHTML = "总计：￥" + c + ".00"
            }
            computed()
            //全选
            select.onclick = function () {
                for (let i = 0; i < check.length; i++) {
                    check[i].checked = true
                }
                computed();
            }
            //复选框、加号、减号、删除
            for (let i = 0; i < check.length; i++) {
                check[i].onclick = function () {
                    computed()
                }
                add[i].onclick = function () {
                    this.parentNode.querySelector(".count").innerHTML = Number(this.parentNode.querySelector(".count").innerHTML) + 1;
                    computed();
                    let id = this.parentNode.parentNode.parentNode.id;
                    let count = this.parentNode.querySelector(".count").innerHTML;
                    let http = new XMLHttpRequest();
                    http.open("get", `http://192.168.31.37:8080/increase?id=${id}&count=${count}`);
                    http.send();
                    http.onreadystatechange = function () {
                        if (http.responseText == "success") {
                            console.log("添加成功！");
                        }
                    }
                }
                sub[i].onclick = function () {
                    if (this.parentNode.querySelector(".count").innerHTML > 1) {
                        this.parentNode.querySelector(".count").innerHTML = Number(this.parentNode.querySelector(".count").innerHTML) - 1;
                        let id = this.parentNode.parentNode.parentNode.id;
                        let count = this.parentNode.querySelector(".count").innerHTML;
                        let http = new XMLHttpRequest();
                        http.open("get", `http://192.168.31.37:8080/reduce?id=${id}&count=${count}`);
                        http.send();
                        http.onreadystatechange = function () {
                            if (http.responseText == "success") {
                                console.log("减少成功！");
                            }
                        }
                    }
                    else {
                        this.parentNode.querySelector(".count").innerHTML = 1
                    }
                    computed()
                }
                remove[i].onclick = function () {
                    this.parentNode.parentNode.remove();
                    let subtotal = document.querySelectorAll(".subtotal");
                    let total = document.querySelector(".count-price");
                    let c = 0;
                    for (let j = 0; j < subtotal.length; j++) {
                        c = c + Number(subtotal[j].innerHTML.slice(1, ))
                    }
                    total.innerHTML = "总计：￥" + c + ".00";
                    let id = this.parentNode.parentNode.id;
                    let count = this.parentNode.parentNode.querySelector(".count").innerHTML;
                    let http = new XMLHttpRequest();
                    http.open("get", `http://192.168.31.37:8080/cut?id=${id}`);
                    http.send();
                    http.onreadystatechange = function () {
                        if (http.responseText == "success") {
                            console.log("删除成功！");
                        }
                    }
                }
            }

        }
    }

