
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
   }
    /*
     reduce((초기값, 배열요소값) => { 함수}, 초기값 대체 ) 해서 배열로 담음
    ...fields 모든 매개변수를 fields로 받아서 
    초기값은 {빈객체}로 하고 매개변수('id', 'pwd' 등)를 field로 받아서 모든 데이터를 순회함
    이때 원래 객체의 매개변수(field)가 있다면 (여기서는 id, pwd 등을 받음)
    이 매개변수 값을 순회해서 값을 배열로 담는다.
    이를  newUsers에 초기값으로 설정한 빈객체{}에 받은 매개변수와 순회한 매개변수 값을 객체형식으로 반환한다.
    즉, newUsers에는 { field : [ field를 순회한 값],
                      field : [ field를 순회한 값]} 으로 담기게 된다. 

    만약에 초기값을 [빈배열]로 설정하면  
    newUsers에는 [ field : [ field를 순회한 값],
                      field : [ field를 순회한 값] ] 이렇게 배열이 담기게 된다.                  
   */
 }


module.exports = UserStorage;

// 클라스는 함수 이므로 module.exports = {UserStorage}; 객체처럼 담으면 에러 발생함.(주의요망)


