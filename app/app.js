
// 모듈
const express = require('express');
const app = express();

// 라우팅
const home = require("./src/routes/home");

// bin/www 모듈화로 보냄
// const port = 3000;

// 웹 세팅
app.set('views', './src/views');
app.set('view engine', 'pug');

// 라우팅 미들웨어 등록
// '/' 기본 홈페이지 url로 들어오면 home 라우팅으로 가라
app.use('/', home);

/* 이 부분을 모듈화함 => bin/www
app.listen(port, () => {
    console.log(`서버 가동: ${port}`)
})
*/

// 모듈화했기에 exports함
module.exports = app;