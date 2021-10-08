

const id = document.querySelector('#id');
const pwd = document.querySelector('#pwd');
const loginBtn = document.querySelector('button');

loginBtn.addEventListener('click', login);

function login(){
    // console.log(id.value);
   const req = {
       id : id.value,
       pwd : pwd.value
   };
    //  console.log(req, JSON.stringify(req));

  fetch('/login', {
      method: "POST",
      header: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(req)
  });
}