
// 컨트롤러 함수 기본 방식
/*
const hello = (req, res) =>{
    res.render("home/index");
};
const login = (req, res) =>{
    res.render("home/login");
};
module.exports = {hello, login};
// 위는 아래 코드를 축약한 코드임. module.exports = {hello, login};
//   자바스크립트 객체에서 키와 value가 같으면 value를 생략해도 됨(축약 사용법) 
//  module.export = {
//    hello:hello,
//    login:login
//   }
*/

// 컨트롤러 함수 기본 방식 업그레이드 
/*
module.exports.hello = (req, res) =>{
    res.render("home/index");
};
module.exports.login = (req, res) =>{
    res.render("home/login");
};
*/

// 일반적인 컨트롤러 함수 사용법 (* module.exports - 객체, 함수 둘 다 가능 / exports - 함수만 가능)
exports.hello = (req, res) =>{
    res.render("home/index");
};
exports.login = (req, res) =>{
    res.render("home/login");
};