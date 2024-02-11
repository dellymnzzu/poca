# 🎁 butterfly
- 판매자와 구매자 각각 여러 상품을 제공하고 구매할 수 있는 다대다 관계를 가지는 중고거래 사이트
- 거래 과정에서 불편함과 불안함을 방지하기 위해 카테고리를 만들어 간편하게 관리 할 수 있고, 신고 시스템을 통해 사용자들이 의심스러운 활동을 즉시 보고 할 수 있도록 하여 안전한 거래 환경을 제공
- 프로젝트의 모든 부분을 개발하는 1인 웹 개발 프로젝트

## 🚀 배포환경  
* google cloud
* ~~- https://butterfiy-383404.du.r.appspot.com/~~
#### ~~본 사이트는 현재 서버비용문제로 현재 비활성화되었습니다.~~


## 🛠  사용기술
> - HTML 
> - CSS
> - java Script
> - Node.js(Express)
> - mongodb

## Flow chart

![pocaFlowchart](https://github.com/dellymnzzu/poca/assets/118268642/e2421a75-0083-4632-a64b-a12b8d1aa7e2)





## 📊 데이터베이스

<details><summary>login
</summary>

![loginE](https://github.com/dellymnzzu/poca/assets/118268642/bd56a996-27e0-4cc3-b82d-d713c9562b46)
![loginM](https://github.com/dellymnzzu/poca/assets/118268642/69787ba3-5c10-46b8-bd5e-17fa5be33f3e)

</details>

<details><summary>post
</summary>

![postE](https://github.com/dellymnzzu/poca/assets/118268642/c98d0d7f-0e2a-45bd-a0a3-174afa83ff8c)
![postM](https://github.com/dellymnzzu/poca/assets/118268642/e647fadb-821c-4be6-93f7-c4e87862c019)
</details>

<details><summary>content
</summary>

![contentE](https://github.com/dellymnzzu/poca/assets/118268642/5565b018-aabe-446a-8592-f47346fb81af)
![contentE](https://github.com/dellymnzzu/poca/assets/118268642/5da7d774-e015-4f78-8505-ff2fc1f1796b)

</details>

<details><summary>like
</summary>

![likeE](https://github.com/dellymnzzu/poca/assets/118268642/8858c949-10f4-410a-ab53-260c6b6429b2)
![likeM](https://github.com/dellymnzzu/poca/assets/118268642/8460c10c-28bd-4787-943f-35b379746b19)
</details>

<details><summary>chatroom
</summary>

![chatroomE](https://github.com/dellymnzzu/poca/assets/118268642/f78179a7-c44e-469a-93b1-488642fd93f3)
![chatroomM](https://github.com/dellymnzzu/poca/assets/118268642/878720e3-f457-4e3f-937d-dea7d870ad27)
</details>

<details><summary>comment
</summary>

![commentE](https://github.com/dellymnzzu/poca/assets/118268642/5dd9a722-6e75-43ac-a43e-25a2ed7104c8)
![commentM](https://github.com/dellymnzzu/poca/assets/118268642/252b08fe-674d-4e79-b060-4facb43c2195)
</details>

<details><summary>counter
</summary>

![counterE](https://github.com/dellymnzzu/poca/assets/118268642/c088383d-92c2-42da-992d-1c22c1b57eb5)
![counterM](https://github.com/dellymnzzu/poca/assets/118268642/d92c3c09-a9cf-4c00-817f-6672dc537de8)
</details>

<details><summary>scam
</summary>

![scamE](https://github.com/dellymnzzu/poca/assets/118268642/727e04d9-04b6-4b01-9804-7b1a60cb41e6)
![scamM](https://github.com/dellymnzzu/poca/assets/118268642/da955cc9-0706-4f49-b4b2-e9dd3f9d010c)
</details>

## 📦 디렉토리 구조
```
📦poca
 ┣ 📂conf
 ┃ ┗ 📜database.js
 ┣ 📂public
 ┃ ┣ 📂image
 ┃ ┣ 📂javascript
 ┃ ┃ ┣ 📜chat.js
 ┃ ┃ ┣ 📜detail.js
 ┃ ┃ ┣ 📜nav.js
 ┃ ┃ ┣ 📜pagecontrol.js
 ┃ ┃ ┣ 📜pocadetail.js
 ┃ ┃ ┣ 📜pocawrite.js
 ┃ ┃ ┣ 📜profile.js
 ┃ ┃ ┣ 📜qna.js
 ┃ ┃ ┣ 📜sign_up.js
 ┃ ┃ ┗ 📜summernote.js
 ┃ ┗ 📂stylesheets
 ┃ ┃ ┣ 📜about.css
 ┃ ┃ ┣ 📜best.css
 ┃ ┃ ┣ 📜bestLike.css
 ┃ ┃ ┣ 📜chat.css
 ┃ ┃ ┣ 📜detail.css
 ┃ ┃ ┣ 📜edit.css
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┣ 📜loginInterface.css
 ┃ ┃ ┣ 📜mypage.css
 ┃ ┃ ┣ 📜nav.css
 ┃ ┃ ┣ 📜new.css
 ┃ ┃ ┣ 📜newmodule.css
 ┃ ┃ ┣ 📜poca.css
 ┃ ┃ ┣ 📜pocadetail.css
 ┃ ┃ ┣ 📜pocawrite.css
 ┃ ┃ ┣ 📜product.css
 ┃ ┃ ┣ 📜profile.css
 ┃ ┃ ┣ 📜scam.css
 ┃ ┃ ┣ 📜searchInerface.css
 ┃ ┃ ┗ 📜write.css
 ┣ 📂routes
 ┃ ┣ 📜app.js
 ┃ ┣ 📜login.js
 ┃ ┣ 📜loginRoute.js
 ┃ ┗ 📜socket.js
 ┣ 📂views
 ┃ ┣ 📂images
 ┃ ┣ 📜about.ejs
 ┃ ┣ 📜best.ejs
 ┃ ┣ 📜bestLike.ejs
 ┃ ┣ 📜chat.ejs
 ┃ ┣ 📜detail.ejs
 ┃ ┣ 📜edit.ejs
 ┃ ┣ 📜index.ejs
 ┃ ┣ 📜login.ejs
 ┃ ┣ 📜mypage.ejs
 ┃ ┣ 📜nav.html
 ┃ ┣ 📜new.ejs
 ┃ ┣ 📜newmodule.ejs
 ┃ ┣ 📜poca.ejs
 ┃ ┣ 📜pocadetail.ejs
 ┃ ┣ 📜pocawrite.ejs
 ┃ ┣ 📜product.ejs
 ┃ ┣ 📜profile.ejs
 ┃ ┣ 📜qna.ejs
 ┃ ┣ 📜scamInput.ejs
 ┃ ┣ 📜search.ejs
 ┃ ┣ 📜sign_up.ejs
 ┃ ┗ 📜write.ejs
 ┗ 📜server.js 

```
## 🛠 구현기능
<details><summary>계정관련기능 
</summary>

- 회원가입 </br>
-회원가입시 중복검사 및 정규표현식으로 유효성 검사</br>
![sign](https://github.com/dellymnzzu/poca/assets/118268642/3740af50-3bc8-4753-b3fa-c550f8343521)
![sign1](https://github.com/dellymnzzu/poca/assets/118268642/f8f6305d-1e75-4c79-b900-3e0c64c30294) </br>


- 로그인</br>
-passport를 이용한 로그인 구현

![login](https://github.com/dellymnzzu/poca/assets/118268642/bf98dc42-43d1-4d2b-a9b0-41769f6fed0e)
https://github.com/dellymnzzu/poca/blob/98c14c383ca324bef326630020bdb3f96c9202b5/routes/login.js#L10-L60

- 마이페이지</br>
-회원 정보 수정 / 탈퇴 버튼</br>
-나의 상품 목록 / 좋아요 누른 상품 목록 조회
![mypage](https://github.com/dellymnzzu/poca/assets/118268642/df87b1c3-9221-4f47-ac1b-493a78af1d4b)
![profile](https://github.com/dellymnzzu/poca/assets/118268642/44dcc933-7a82-4845-8949-a1fec5e62c49)
</details>


<details><summary>게시물관련기능 
</summary>

- 페이지네이션
![pagination](https://github.com/dellymnzzu/poca/assets/118268642/7a9141bb-b646-4e67-ace6-8d503e03bb24)
-페이지네이션 기능을 통해 웹페이지 초기 로딩 속도 개선 및 서버 자원 효율적 사용

- 게시글 작성/조회/수정/삭제 가능

![postDetailButton](https://github.com/dellymnzzu/poca/assets/118268642/a70c74de-6eaf-4dc4-b04d-d4ec40b02037)
-게시글 조회시 댓글, 게시글 수정,삭제 등 상호작용시 비동기처리 활용

https://github.com/dellymnzzu/poca/blob/98c14c383ca324bef326630020bdb3f96c9202b5/public/javascript/detail.js#L20-L45
- 게시글 삭제 시 해당 게시글 삭제 처리</br>
-본인 게시글이 아닐 경우, 수정/삭제 버튼 비활성화
![postDetail](https://github.com/dellymnzzu/poca/assets/118268642/5fb2dc19-14b6-4b61-a35f-54b0702b6227)
- 유저 당 각 게시글 별로 좋아요 등록/삭제 가능

![like](https://github.com/dellymnzzu/poca/assets/118268642/da45d567-37a3-420d-855f-49e03021ba27)

https://github.com/dellymnzzu/poca/blob/98c14c383ca324bef326630020bdb3f96c9202b5/routes/loginRoute.js#L299-L331
- 카테고리 별로 상품 조회 가능
 
![category](https://github.com/dellymnzzu/poca/assets/118268642/f3967efc-3728-495a-92b5-3a4fa3c7235a)
-최신순/베스트순 정렬
https://github.com/dellymnzzu/poca/blob/98c14c383ca324bef326630020bdb3f96c9202b5/conf/database.js#L16-L48
</details>

<details><summary>검색관련기능
</summary>

-  mongoDB Search Index 기능 사용
![search](https://github.com/dellymnzzu/poca/assets/118268642/b5d87d76-1874-4758-b585-fef9056cfc8a)
- post 컬렉션의 제목 필드에서만 조회하도록 지정 
https://github.com/dellymnzzu/poca/blob/98c14c383ca324bef326630020bdb3f96c9202b5/routes/app.js#L172-L192
- Apache Lucene(lucene.korean) 기반의 검색엔진 제공
</details>

<details><summary>채팅관련기능
</summary>

![chat](https://github.com/dellymnzzu/poca/assets/118268642/2eea2da6-ce3f-4a9b-880a-a2aa4eb5d81b)
-  socket.io를 이용하여 서버와 클라이언트 간에 양방향 통신을 구현하여 실시간 채팅 가능
https://github.com/dellymnzzu/poca/blob/98c14c383ca324bef326630020bdb3f96c9202b5/routes/socket.js#L14-L97
- 채팅방 생성시 생성시 비동기 처리 활용 
https://github.com/dellymnzzu/poca/blob/98c14c383ca324bef326630020bdb3f96c9202b5/public/javascript/chat.js#L6-L16
</details>










