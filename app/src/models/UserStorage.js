

/* 1) 클라스를 활용해 컨트롤러 함수에서 인스턴스를 불러와 활용하는 방법 
class UserStorage {

    // const users = {
    //     id: ["sphinx", "aattitude", "비주얼"],
    //     pwd: ["1234", "12345", "123456"]
    // };
    // 클라스 안에 객체를 담을 때는 const 같은 변수가 필요 없음.
    users = {
        id: ["sphinx", "aattitude", "비주얼"],
        pwd: ["1234", "12345", "123456"]
    };  

}
*/ 

/*
// 2)인스턴스 생성없이 클라스 자체의 정적메서드를 통해 users를 불러오는 방법
// 컨트롤러 함수에서 UserStorage.users로 값을 받을 수 있다.
class UserStorage {
    
   static users = {
        id: ["sphinx", "aattitude", "비주얼"],
        pwd: ["1234", "12345", "123456"]
    };  

}
*/

/*
// 3) 정적메소드를 사용하되 은닉화(public -> private) 해서 사용하기
//  은닉화할 객체에 # 붙임 
// 은익화한 객체를 불러올 정적메소드를 추가함 
class UserStorage {
    
    static #users = {
         id: ["sphinx", "aattitude", "비주얼"],
         pwd: ["1234", "12345", "123456"]         
     };  
 
   static getUsers(){
       return this.#users;
   }

 }
*/

// 데이터베이스의 파일을 불러오기 위해 fs 모듈이 필요함
// const fs = require("fs");

const fs = require("fs").promises;
// fs모듈도 지원하는 프로미스 사용하기

// 3번 방법에 추가함
//  class UserStorage {
// 위 문구만 아래 코드에 너무 떨어져 있어서 아래쪽으로 위치 이동함 

  /* 이 부분은 /26/ 데이터 파일로 저장하기에 의해 databasw/nabi/users.json으로 옮김 
    static #users = {
         id: ["sphinx", "aattitude", "비주얼"],
         pwd: ["1234", "12345", "123456"],
         name:["스핑크스", "애티튜드", "visual"]
         // name 필드를 추가함.
     };  
  */

     /* 이 부분은 /21/ 에 의해 삭제함. 
     아래  static getUserInfo(id) 함수로 리팩토링함.

   static getUsers(...fields){
    //    console.log(filelds)
      const users = this.#users;
    
      const newUsers = fields.reduce((newUser, field) => {
        if(users.hasOwnProperty(field)) {
            newUser[field] = users[field];
            // console.log(typeof(users[field])); 
            // let vhom = users[field]
            // console.log(Array.isArray(vhom));
            // console.log(`newUser[field] => ${newUser[field]}`); 
            // console.log(Array.isArray(newUser[field])); 
        }
        //    console.log(`newUser => ${newUser}`);
           return newUser;         
      }, {});
    //   console.log(newUsers);
      return newUsers;
    };

    */
    /*
     reduce((초기값, 배열요소값) => { 함수}, 초기값 대체 ) 해서 배열로 담음
    ...fields 모든 매개변수를 fields로 받아서 
    초기값(newUser)은 {빈객체}로 하고 매개변수('id', 'pwd' 등)를 field로 받아서 모든 데이터를 순회함
    이때 원래 객체의 매개변수(field)가 있다면 (여기서는 id, pwd 등을 받음)
    키는 newUser[field]로,  값은 users[field]로 해서 (필드 키를 순회해서 값을 배열로 담는다.)
    이를  newUsers에 초기값으로 설정한 빈객체{}에 담는다.
    (받은 매개변수와 순회한 매개변수 값을 객체형식으로 반환한다.)
    즉, newUsers에는 { field : [ field를 순회한 값],
                      field : [ field를 순회한 값]} 으로 담기게 된다. 
    이후 return newUser; 를 통해 id 필드로 순회한 결과인 위의 객체를 초기값으로 돌려주어
    이 초기값에 이후 존재하는 필드(여기서는 pwd 매개변수)를 같은 방식으로 키, 값 형태로 추가한다. 

    만약에 초기값을 [빈배열]로 설정하면  
    newUsers에는 [ field : [ field를 순회한 값],
                      field : [ field를 순회한 값] ] 이렇게 배열이 담기게 된다.                  
   */

// class UserStorage {                     
//      static getUserInfo(id) {
//       //  const users = this.#users;
//       // 데이터를 따로 database에 저장함
//       // 따라서 아래 fs모듈로 불러옴
//       // 26 데이터 불러오기에서 추가함
//       // fs.readFile("./") 이 위치는 app.js(메인파일)가 있는 위치를 가리킴(주의 요망)
//       // UserStorage.js가 있는 위치가 아니라 app.js 위치를 기본으로 함.
//        fs.readFile("./src/databases/users.json", (err, data) => {
//          if(err) throw err;
//         //  console.log(JSON.parse(data))
//          //json 파일이므로 파싱해야 함
//           const users = JSON.parse(data);

//           const idx = users.id.indexOf(id);
//            const userKeys = Object.keys(users);
//            const userInfo = userKeys.reduce((newUser, info) => {
//             newUser[info] = users[info][idx];
//             return newUser;
//         }, {});
                     
//              return userInfo;
//          });
//       }
//       /* 26 fs 모듈에 의해 scope를 고려해 fs 안으로 이동함.
//        const idx = users.id.indexOf(id);
//       //  console.log(`idx => ${idx}`);
//       //  indexOf에서 O는 대문자임(주의 요망)
//        const userKeys = Object.keys(users);
//        //users 객체의 키값들만 리스트로 만듬 // ==> [id, pwd, name]
       
//         // 이 키값(userKeys)이 담긴 배열을 reduce 함수에 의해 초기값(newUser)은 빈객체로 설정하고
//         // 이후 info에 [id, pwd, name]이 순차적으로 들어감.
//         // newUser[info]가 키가 되고 users[info][idx]의 값이 값으로 들어가는 객체가 
//         // {id : [ ]  }
//         // return newUser에 의해 순회됨.
       
//        const userInfo = userKeys.reduce((newUser, info) => {
//         newUser[info] = users[info][idx];
//         // console.log(`newUserINfo => ${users[info]}`)
//         // console.log(`newUserINfoIdx => ${users[info][idx]}`)
//         return newUser;
//     }, {});
       
//       //  const userInfo = Object.keys(users).reduce((newUser, info) => {
//       //        newUser[info] = users[info][idx];
//       //        return newUser;
//       //    }, {});
//         // console.log(`userInfo => ${userInfo}`);
//         // console.dir(userInfo);
//          return userInfo;
//      };    
//    */

//      // 모델/users.js의 register()에서 저장한 this.body를 userInfo로 받는다.
//      static save(userInfo){
//       //  const users = this.#users;
//        users.id.push(userInfo.id);
//        users.name.push(userInfo.name);
//        users.pwd.push(userInfo.pwd);
//         //  console.log(users)
//         return {success: true};
//      }
//  }

// 위 코드를 다시 프로미스로 변환함.
// 기존 설명은 위를 참조하고 코드를 심플하게 보기 위해 기존 설명을 삭제함

 class UserStorage {   
  
  static #getUserInfoFunc(data, id){
    const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userKeys = Object.keys(users);
        const userInfo = userKeys.reduce((newUser, info) => {
           newUser[info] = users[info][idx];
           return newUser;
       }, {});
          // console.log(userInfo);          
            return userInfo;
  }
  
  static getUserInfo(id) {
   
  //  console.log(fs.readFile("./src/databases/users.json"));
  // Promise { <pending> } 반환한다.

  // fs모듈로 받아온 값을 반환한다.
 return fs
    .readFile("./src/databases/users.json")
    .then((data) => {
        
       /* 아래 코드를 r가독성을 위해 은닉화된 함수로 전환
         private한 객체나 함수는 항상 맨 위에 놓음(코드 컨벤션임)
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userKeys = Object.keys(users);
        const userInfo = userKeys.reduce((newUser, info) => {
           newUser[info] = users[info][idx];
           return newUser;
       }, {});
          // console.log(userInfo);          
            return userInfo;
        */

           return this.#getUserInfoFunc(data, id); 
        })
        // .catch((err) => { console.error(err) });
        // 매개변수가 동일하면 생략 가능함
        .catch(console.error);
    }
        
    // 28에서 static save(userInfo)를 활용하기 위해 복원함
    // 그러면서 fs 모듈을 사용해야 하므로 전환함

   static #getUsersFuc(data, isAll, fields){
     const users = JSON.parse(data);
     //버퍼 데이터를 파싱해서 받을 있는 데이터로 전환해 users 변수에 담음
     // 이 프라이빗 함수는 원래 아래 static getUsers(...fields) 함수 안에 있는 코드를 빼온 것임을 상기하자
    
    if(isAll) return users;
    // isAll이 true이면 바로 리턴함. /save 함수 수정하면서 추가함
     const newUsers = fields.reduce((newUser, field) => {
      if(users.hasOwnProperty(field)) {
          newUser[field] = users[field];             
      }          
         return newUser;         
    }, {});
       return newUsers;
  }
   

    // static getUsers(...fields){
      static getUsers(isAll, ...fields){
        // 아래 저장하는 함수에서 await this.getUsers(true) true를 사용하기 위해 isAll 매개변수 추가함
        // const users = this.#users;
      return fs.readFile("./src/databases/users.json")
                .then((data) => {
                  // 여기 data는 버퍼 데이터이므로 파싱이 필요함(위 프라이빗 함수에서 처리)
                  return this.#getUsersFuc(data, isAll, fields);
                })
                .catch(console.error);

      /*#getUsersFuc() 프라이빗 함수로 바꿈
        const newUsers = fields.reduce((newUser, field) => {
          if(users.hasOwnProperty(field)) {
              newUser[field] = users[field];             
          }          
             return newUser;         
        }, {});
           return newUsers;
      }
     */
    }

  static async save(userInfo){
 
    /* 28에 의해 삭제함 / 데이터를 database 폴더에 json으로 저장했으므로
      회원 가입하는 데이터도 그쪽에 저장되어야 하므로
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.pwd.push(userInfo.pwd);
     //  console.log(users)
     return {success: true};
     */
  //  fs.writeFile("저장할 경로", 저장할 데이터)
  //  const data = "a";
  // 회원명단이 있는 user.json에 기존 자료가 사라지고 새 데이터만 저장되므로
  // 기존 회원명단 데이터를 불러온 후에 거기에 입력한 뉴회원데이터를 더해서 저장해야 한다.
  // 이를 위해 /21/에 의해 리팩토링되면서 삭제했던 함수를 복원해서 활용함
    // const data = await this.getUsers("id", "pwd", "name");
    // console.log(users);
    // 여기서 promise <pending> 이 나온다. 
    // 즉, 아직 프로미스가 결과값을 받지 못 한 상태이므로 await를 추가한다
    // console.log(users);
    // const data = await this.getUsers("id", "pwd", "name");
    // 위에서 모든 데이터를 받을 경우에는 true라고 쓰면 됨.
    const users = await this.getUsers(true);
    // console.log(data);
    if(users.id.includes(userInfo.id)){
      // 회원가입한 데이터 아이디가 기존 저장된 유저명단 아이디에 있으면 에러 반환
      // console.log(users); // 기존 회원리스트
      // console.log(userInfo); // 새로 입력한 값
      //  return new Error("이미 존재하는 아이디입니다.");
       // 이러면 models/Users.js의 async register()의 try catch에서 try 안(response)으로 들어간다.
       // 따라서 throw를 해줘야 catch(err) 로 들어가게 된다.(**중요)
      //  throw Error("이미 존재하는 아이디입니다.");
       // 그런데 위 처럼 하면 err가 객체로 들어간다.
       // 따라서 그냥 문자열로 throw하면 스트링으로 받는다. (** 사소하지만 중요함)
       throw ("이미 존재하는 아이디입니다.");
     }
     // 회원가입한 데이터 아이디가 기존 저장된 유저명단 아이디에 없으면 저장해라
     users.id.push(userInfo.id);
     users.name.push(userInfo.name);
     users.pwd.push(userInfo.pwd);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
  // JSON.stringify(data) 서버에 회원명단을 저장하는 것이므로 json화 한다.
     return {success: true }; 
   }
 }

module.exports = UserStorage;

// 클라스는 함수 이므로 module.exports = {UserStorage}; 객체처럼 담으면 에러 발생함.(주의요망)


