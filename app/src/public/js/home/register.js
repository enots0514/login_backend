

const id = document.querySelector('#id');
const name = document.querySelector('#name');
const pwd = document.querySelector('#pwd');
const confirmPwd = document.querySelector('#confirm-pwd');
const registerBtn = document.querySelector('button');


registerBtn.addEventListener('click', register);


function register(e){
    // console.log(id.value);
    e.preventDefault();
  // 회원가입 시 아이디란이 비워있으면 안 되므로  
  if(!id.value) return alert("아이디를 입력해주세요");
  // 비밀번호를 제대로 2번 똑같이 작성했는지 확인
  if(pwd.value !== confirmPwd.value){
      return alert("비밀번호가 일치하지 않습니다.");
  }  

   const req = {
       id : id.value,
       name : name.value,
       pwd : pwd.value

    //    confirmPwd : confirmPwd.value,
    // 비밀번호 확인이므로 서버에 보낼 필요 없이 
    // 회원가입 시 비밀번호를 제대로 똑같이 작성했는지만 구분하면 된다
   };
//    console.log(req);
    //  console.log(req, JSON.stringify(req));

    
  fetch('/register', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(req)
  })
    .then((res) => res.json())
    .then( (v) => {
      //  console.dir(v)
    //  console.log(v)
     // 파라미터가 동일한 경우에는 생략도 가능하다.
    // .then(console.log);

        if (v.success) {
            location.href= "/login";
        } else {
            alert(v.msg);
        }
     })
       .catch( (err) => {
          console.error(new Error("회원가입 중 에러 발생함")) ;
        // alert((Error("로그인 중 에러 발생함"))) ;
       });
           
}

// 위에 headers에서 s를 빼고 써서 오류가 발생했었음.
// then 부분은 로그인 검증 부분/18/ 에서 추가함.
  /*
   .then은 promise를 받는다.
   따라서 res.json()의 반환값은 Promise이다. 
   기본 res의 반환 값은 Response 스트림인데,
   json()메서드를 통해 Response(응답) 스트림을 읽을 수 있다.
   하지만 Response는 데이터가 모두 받아진 상태가 아니다.
   json()으로 Response 스트림을 가져와 완료될 때까지 읽는다.
   다 읽은 body의 텍스트를 Promise 형태로 반환한다.

  => 즉, .then()으로 Promise가 반환되는데, 이는 값이 아니다.
     이를 다시 사용할 수 있는 값으로 반환하려면 .then()으로 exexute해줘야 한다.
     (참조-> async 역시 promise를 반환하므로 이를 값으로 사용하려면 then 메소드를 통해 exexute한다.)
   => http://sphinx.dothome.co.kr/CODE/code_promise.html  참조
  */