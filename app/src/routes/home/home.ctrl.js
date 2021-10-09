





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


// 로그인 인증을 위한 더미 데이터 만들기 (테스트용)
const users = {
    id: ["sphinx", "aattitude", "비주얼"],
    pwd: ["1234", "12345", "123456"]
};

// post 메소드를 위해 추가한 컨트롤러 함수
const process = {
    login : (req, res) => {
        //  console.log(req.body);
        //  console.log(req.body.id);
        //  console.log(req.body.pwd);
   
     const id = req.body.id;
     const pwd = req.body.pwd;
    //  console.log(id, pwd);    

        if(users.id.includes(id)){
           const idx = users.id.indexOf(id);
           if(users.pwd[idx] === pwd) {
               return res.json({
                   success: true,
               });
           }
        }
         
       return res.json({
         success:false,
         msg:"로그인에 실패하셨습니다.",
          });           
       
    }
};

module.exports = {
    output,
    process,
};