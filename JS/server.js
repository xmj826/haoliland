const express = require("express")();
const mysql = require("mysql");
const port = 8080;


// Node解决跨域问题
express.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})
// mysql链接
let sql = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `123456`,
    database: `haoliland`,
})
sql.connect();




//登录
express.get("/login", (request, response) => {
    let phone = request.query.phone;
    let password = request.query.password;
    sql.query(`SELECT * FROM users WHERE phone="${phone}" AND password="${password}"`, (error, data) => {
        if (error) {
            response.send("error1")
            console.log("error")
        }
        else {
            if (!data.length) {
                response.send("error2");
                console.log("error")
            }
            else {
                response.send("success")
                console.log("success")
            }
        }
    })
})

//注册
express.get("/add", (request, response) => {
    let phone = request.query.phone;
    let password = request.query.password;
    sql.query(`SELECT * FROM users WHERE phone ="${phone}"`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            console.log(data.length)
            if (!data.length) {
                sql.query(`INSERT INTO users (phone,password) VALUES ("${phone}","${password}")`, (error, data) => {
                    if (error) {
                        response.send("error3")
                    }
                    else {
                        response.send("success")
                    }
                })
            }
            else {
                response.send("error2")
            }
        }
    })
})
//产品列表
express.get("/list", (request, response) => {

    sql.query(`SELECT id,name,price,mainImg FROM goods`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send(data);
        }
    })
})
//商品详情
express.get("/description", (request, response) => {
    let id = request.query.id;
    sql.query(`SELECT name,price,mainImg,assistantImg,img1,img2,img3,img4,img5,attribute FROM goods WHERE id ="${id}"`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send(data);
        }
    })
})
//添加到购物车
express.get("/addcart", (request, response) => {
    let id = request.query.id;
    let name = request.query.name;
    let attribute = request.query.attribute;
    let price = request.query.price;
    let count = request.query.count;
    let phone = request.query.phone;
    let img = request.query.img;
    sql.query(`INSERT INTO shopcart VALUES ("", "${name}","${attribute}",${price},${count},"${phone}","${img}")`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send("success")
        }
    })
})
//购物车查询
express.get("/cart", (request, response) => {
    let phone = request.query.phone;
    sql.query(`SELECT * FROM shopcart WHERE phone="${phone}"`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send(data);
        }
    })
})
//增加商品数量
express.get("/increase", (request, response) => {
    let id = request.query.id;
    let count = request.query.count;
    sql.query(`UPDATE shopcart SET count="${count}" WHERE id="${id}"`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send("success");
        }
    })
})
//减少商品数量
express.get("/reduce", (request, response) => {
    let id = request.query.id;
    let count = request.query.count;
    sql.query(`UPDATE shopcart SET count="${count}" WHERE id="${id}"`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send("success");
        }
    })
})
//删除商品
express.get("/cut", (request, response) => {
    let id = request.query.id;
    let count = request.query.count;
    sql.query(`DELETE FROM shopcart WHERE id="${id}"`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send("success");
        }
    })
})
//清空用户已购买
express.get("/delete", (request, response) => {
    let phone = request.query.phone;
    let id = request.query.id;
    sql.query(`DELETE FROM shopcart WHERE phone="${phone}" AND id="${id}"`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send("success");
        }
    })
})

//关于我们
express.get("/about", (request, response) => {
    sql.query(`SELECT * FROM about`, (error, data) => {
        if (error) {
            response.send("error1")
        }
        else {
            response.send(data);
        }
    })
})



express.listen(8080)
console.log("server is running at " + port)
