let express = require("express")();
let mysql = require("mysql");
let port = 8080;


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
    let username = request.query.username;
    let password = request.query.password;
    sql.query(`SELECT * FROM users WHERE phone="${phone}" AND password="${password}"`, (error, data) => {
        if (error) {
            response.send("error1")
            console.log(error)
        }
        else {
            if (!data.length) {
                response.send("error2");
                console.log(error)
            }
            else {
                response.send("success")
                console.log(success)
            }
        }
    })
})