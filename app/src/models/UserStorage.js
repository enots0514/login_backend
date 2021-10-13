'use strict';

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

// 3번 방법에 추가함
 class UserStorage {
    
    static #users = {
         id: ["sphinx", "aattitude", "비주얼"],
         pwd: ["1234", "12345", "123456"],
         name:["스핑크스", "애티튜드", "visual"]
         // name 필드를 추가함.
     };  
 
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

                       
     static getUserInfo(id) {
       const users = this.#users;
       const idx = users.id.indexOf(id);
      //  console.log(`idx => ${idx}`);
      //  indexOf에서 O는 대문자임(주의 요망)
       const userKeys = Object.keys(users);
       //users 객체의 키값들만 리스트로 만듬 // ==> [id, pwd, name]
       /*
        이 키값(userKeys)이 담긴 배열을 reduce 함수에 의해 초기값(newUser)은 빈객체로 설정하고
        이후 info에 [id, pwd, name]이 순차적으로 들어감.
        newUser[info]가 키가 되고 users[info][idx]의 값이 값으로 들어가는 객체가 
        {id : [ ]  }
        return newUser에 의해 순회됨.
       */
       const userInfo = userKeys.reduce((newUser, info) => {
        newUser[info] = users[info][idx];
        // console.log(`newUserINfo => ${users[info]}`)
        // console.log(`newUserINfoIdx => ${users[info][idx]}`)
        return newUser;
    }, {});
       
      //  const userInfo = Object.keys(users).reduce((newUser, info) => {
      //        newUser[info] = users[info][idx];
      //        return newUser;
      //    }, {});
        // console.log(`userInfo => ${userInfo}`);
        // console.dir(userInfo);
         return userInfo;
     };                   
 }


module.exports = UserStorage;

// 클라스는 함수 이므로 module.exports = {UserStorage}; 객체처럼 담으면 에러 발생함.(주의요망)


