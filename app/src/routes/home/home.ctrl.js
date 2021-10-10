

// 데이터가 담긴 모델 가져오기

const UserStorage = require('../../models/UserStorage');



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

/*
// 일반적인 컨트롤러 함수 사용법 (* module.exports - 객체, 함수 둘 다 가능 / exports - 함수만 가능)
exports.hello = (req, res) =>{
    res.render("home/index");
};
exports.login = (req, res) =>{
    res.render("home/login");
};
*/

// 객체를 만들고 그 안에 키 : 값 형태로 담기
const output = {
    hello : (req, res) =>{
        res.render("home/index");
    },
    login : (req, res) =>{
        res.render("home/login");
    }
};

/* 모델로 데이터를 넘김.
// 로그인 인증을 위한 더미 데이터 만들기 (테스트용)
const users = {
    id: ["sphinx", "aattitude", "비주얼"],
    pwd: ["1234", "12345", "123456"]
};
*/

// post 메소드를 위해 추가한 컨트롤러 함수
const process = {
    login : (req, res) => {
        //  console.log(req.body);
        //  console.log(req.body.id);
        //  console.log(req.body.pwd);
   
     const id = req.body.id;
     const pwd = req.body.pwd;

    /*
    // UserStorage 클라스를 활용해 인스턴스를 생성하는 방법 모델 UserSorage.js 1번 방법 
    const userStorage = new UserStorage();
    console.log(userStorage.users);
    */

    /*
     // UserStorage의 static(정적메소드)를 활용해 users 객체를 바로 불러오는 방법 모델 UserSorage.js 2번 방법 
    console.log(UserStorage.users);
    */

    //UserStorage의 static(정적메소드)를 활용하면서 users 객체를 은닉화(#users) 하고 
    // 은닉화한 #users를 부르는 함수를 정적 메소드로 추가해 불러오는 3번 방법
    // 여기에 모델 부분 UserStorage.js에 reduce 함수를 활용해 필요한 값을 순회해서 가져오는 것 추가함
    // console.log(UserStorage.getUsers('id', 'pwd')); 

    const users = UserStorage.getUsers('id', 'pwd');

    //  console.log(id, pwd);    

    //     if(users.id.includes(id)){
    //        const idx = users.id.indexOf(id);
    //        if(users.pwd[idx] === pwd) {
    //            return res.json({
    //                success: true,
    //            });
    //        }
    //     }         
    //    return res.json({
    //      success:false,
    //      msg:"로그인에 실패하셨습니다.",
    //       });           
    // 위 코드를 response 객체를 만들어 아래처럼 정리함
   
    /* 데이터 처리 관련이므로 따로 다른 파일로 빼서 작성함

    */
             const response = {};
          if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.pwd[idx] === pwd) {
               response.success = true;
               return res.json(response);               
            }
         }
                  
             response.success = false;
             response.msg = "로그인에 실패하셨습니다.";
             return res.json(response);
    
            
     } 
};

module.exports = {
    output,
    process,
};