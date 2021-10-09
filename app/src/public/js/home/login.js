

const id = document.querySelector('#id');
const pwd = document.querySelector('#pwd');
const loginBtn = document.querySelector('button');

loginBtn.addEventListener('click', login);

function login(){
    // console.log(id.value);
   const req = {
       id : id.value,
       pwd : pwd.value,
   };
    //  console.log(req, JSON.stringify(req));

  fetch('/login', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(req)
  })
    .then((res) => res.json())
    .then( (v) => console.log(v));
    // 파라미터가 동일한 경우에는 생략도 가능하다.
    // .then(console.log);
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