
// 웹 구동 파일 작성하기

// exports 한 app.js를 require함
const app = require('../app');

const port = 3000;

app.listen(port, () => {
    console.log(`서버 가동: ${port}`)
})