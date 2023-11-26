
# Cách chạy code contract trên local

Bài viết này giới thiệu về việc ta có thể deloy trực tiếp một contract từ file wasm ở Backend mà không cần thiết chạy CLI. 

Để sử dụng được cái này thì đây là  repos chính mà mình tham khảo: 
```
https://github.com/oraichain/cw-simulate
```
Dựa trên docs có rất nhiều tính năng mà bạn có thể chạy nhưng trước tiên hết ta cần phải cài đặt **cw-simulate**. Nếu bạn dùng NPM thì: 
```
npm install "@oraichain/cw-simulate" --save-dev
```

hoặc có thể cài bằng Yarn: 
```
yarn add "@oraichain/cw-simulate" -D
```



Để chạy tương tác trên web  bọn mình có demo bạn  làm các lệnh sau:

```
git clone https://github.com/hien-p/backend-cw-stimulate.git
```

```
cd code 
yarn
```

Nhớ add file .wasm vào app.js. Bạn làm theo câu lệnh sau
```
git clone https://github.com/hien-p/Oraichain101.git
```

copy path ở file .wasm ở folder Cosmwasm-Poc:
```
Your path +  /cosmwasm-poc/artifacts/cosmwasm_poc.wasm
```
Sau đó add vào trong code app.js ở hàm deploy-contract

```js
const bytes = fs.readFileSync(
"Your path +  /cosmwasm-poc/artifacts/cosmwasm_poc.wasm"
);
...
```

Sau đó chạy này: 
```
yarn start
```
Nhớ Open Port để chạy contract: 
```
http://localhost:8000/deploy-contract
```

Để Execute thì gõ 
```
http://localhost:8000/execute 
```

Query: 
```
http://localhost:8000/query
```


# Downloadstate  ( Mình đang bị lỗi =)))

Đây là chức năng khá hay cho phép ta tải state của contract về để up lên simulate. 


# Tham khảo 
Bạn có thể dùng này chạy trực tiếp trên đây bằng testnet hoặc local đều được: 
```
https://hackathon-cw.web.app/?nb=cw-starter
```