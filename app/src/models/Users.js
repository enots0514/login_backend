'use strict';
// 이 파일은 모델 데이터를 처리하는 컨트롤러 함수를 담음.
// 기존 라우트 폴더에 있던 home.ctrl.js에서 모델 데이터를 처리하는 컨트롤러 함수 부분을 이곳으로 빼온다.
// 즉, 로그인을 눌렀을 때 반응하는 post 처리 부분에 해당한다. 

// 모델 데이터 require
// 27 프로미스 변환때 코드 심플을 위해 설명 빼고 아래에 다시 정리함
// const UserStorage = require("./UserStorage"); 

// class User {
//     constructor(body){
//         this.body = body;
//         // this.속성 = 속성값
//     }
 
/* home.ctrl.js 즉, 라우트에 있는 컨트롤러 함수에서 const user = new User(req.body);는
  여기있는 클라스의 인스턴스를 생성하는데 
  constructor(body)의 body에 req.body가 들어가고,
    this.body = body;에 의해 req.body의 값이 this.body라는 변수에 담긴다.

    쉽게 이해하며 constructor(name)일 때 new로 생성한 인스턴스 user('sphinx')하면
     this.name = name 에 의해 this.name에 sphinx가 담긴다. 
     이에 의해 user.name하면 sphinx가 나온다.
     
    즉, 위에서 user.body를 하면 req.body의 값을 반환한다.

    참고, constructor(name)     this.age = name  하고 
          user('sphinx') 한 후 user.age 하면 sphinx가 나온다.
          즉, constructor 안의 name은 인스턴스의 매개변수를 받아 값을 설정하고
          this.age는 값을 받는 인스턴스의 키로 age이다.
          이는 객체에서 키 : 값 형태로 프로퍼티 age는 키이고,
          constructor(name)의 매개변수 name에 인스턴스(매개변수 값)이 값이 되는 것이다.
     여기서 알아두어야 할 포인트는     
          this.name =name을 this.age=name 처럼 같은 명칭을 사용하지 않아도 된다. 
*/

 /* 27 프로미스로 변환하면서 코드 심플을 위해 설명 빼고 아래에 다시 정리함
     login(){
        // const users  = UserStorage.getUsers("id", "pwd");
        // 위 코드와 동일함. 구조분해할당 사용함.
        // const {id, pwd}  = UserStorage.getUsers("id", "pwd");
        // console.log(id, pwd);

        // 위의 getUsers("id", "pwd") 메소드는 모든 아이디와 pwd 값을 배열로 받기 때문에 
        // 기존에는 받은 아이디 순서와 pwd 순서를 체크하는 방식을 사용했다.
        // 이를 조금 더 수정하기 위해 새로운 정적 메소드를 데이터를 담은 모델에 추가한다.
       // 그리고 이를 여기서 받아서 활용한다.

        // const body = this.body;
        // this.body가 자주 사용되므로 심플하게 body라는 변수에 담아 사용하는 게 심플함
        // 여기서는 일단 학습을 위해 this.body 사용함 

        // const {id, pwd}  = UserStorage.getUserInfo(this.body.id);
        // 26에 의해 아래 처럼 바꿈
        UserStorage.getUserInfo(this.body.id);
       
        // 기존 라우트에서 처리했던 로그인 했을 때 post 처리 컨트롤러 함수 부분을 리팩토링함
        // 아래 this.body.id / this.body.pwd는 단순히 input에 입력한 데이터 값을 의미함.
        // id, pwd는 그 입력한  this.body.id를 UserStorage.getUserInfo()에 넣어 
        // 처리한 결과인 userInfo을 받음. userIfo에는 올바른 id값과 pwd값이 들어있음.
        // 처음부터 틀린 아이디를 입력하면 입력한 아이디가 userIfo에 없으므로 false값이 되서
        // if   -  else에 의해 else 구문으로 이동함.
        //  this.body.id는 입력값, id, pwd는 그 입력값을 처리한  DB에 저장된 값이다.

     /?   26 하면서 잠시 주석 처리함.
      if(id){
        if(id === this.body.id && pwd === this.body.pwd) {
            // console.log(`아이이1 => ${id} , ${pwd}  `)
            return {success:true};
            // 아이디와 비번 일치함
        }
        // console.log(`아이이2 => ${id} , ${pwd}  `)
        // console.log(`아이이2body => ${this.body.id} , ${this.body.pwd}  `)
         return{ success:false, msg:"비밀번호가 틀렸습니다."};
          // 아이디는 있는데 비번이 틀림
     

      }

      
    //   console.log(`아이이3 => ${id} , ${pwd}  `)
    //   console.log(`아이이3body => ${this.body.id} , ${this.body.pwd}  `)
      return {success: false, msg: "존재하지 않는 아이디입니다."};
         // 첫 if문에 걸림. 아이디가 존재하지 않음.

        
    }
  */
    const UserStorage = require("./UserStorage"); 

    class User {
        constructor(body){
            this.body = body;
            // this.속성 = 속성값
        }

    async login(){
    const {id, pwd} = await UserStorage.getUserInfo(this.body.id);
      if(id){
        if(id === this.body.id && pwd === this.body.pwd) {
            // console.log(`아이이1 => ${id} , ${pwd}  `)
            return {success:true};
            // 아이디와 비번 일치함
         }
        // console.log(`아이이2 => ${id} , ${pwd}  `)
        // console.log(`아이이2body => ${this.body.id} , ${this.body.pwd}  `)
         return{ success:false, msg:"비밀번호가 틀렸습니다."};
          // 아이디는 있는데 비번이 틀림
     

      }
      return {success: false, msg: "존재하지 않는 아이디입니다."};
    }

    /*
    async register(){
      const response = await UserStorage.save(this.body);
      // 역시 저장하는데 시간이 필요하므로 await 추가함 28에서
      return response;
    }
    */
    // try catch 추가
    // UserStorage.js 파일에서 회원가입 및 save 함수가 결국 
    // async register()안에 있으므로 여기서 try catch로 에러처리를 하는 게 심플하다
    async register(){
      try{
        const response = await UserStorage.save(this.body);        
        return response;
      }
       catch(err) { 
         return {success:false, msg:err };
       }
    }
}


module.exports = User;