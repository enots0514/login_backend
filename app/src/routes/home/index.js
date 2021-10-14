"use stric";

// 라우팅 하려면 기본으로 아래 2개 모듈 필요함
const express = require("express");
const router = express.Router();

// 기존 app를 router로 바꿈
/*
router.get('/', (req, res)=>{
    res.render("index");  
});

router.get('/login', (req, res)=>{
    res.render("login");     
});
*/

// 컨트롤러 분리하기 * 기본 방식
/*
const {hello, login} = require('./home.ctrl.js');
router.get('/', hello);
router.get('/login', login);
*/

// 컨트롤러 분리하기 * 조금 더 세련된 방식
const ctrl = require('./home.ctrl.js');

// '/'로 접속하면 home.ctrl 컨트롤러js로 가서 hello 함수를 실행해라
// '/login'로 접속하면 home.ctrl 컨트롤러js로 가서 login 함수를 실행해라
router.get('/', ctrl.output.hello);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);
router.post('/login', ctrl.process.login);

// 반드시 router라는 명으로 exports 해야 함.
module.exports = router;