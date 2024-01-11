const database = require('../conf/database.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');







require('dotenv').config()

function checkLogin(req, res, next) {

  
  if (req.user) {   // 브라우저에 세션이 있으면 넘어가
    next();
  } else {
    console.log("실패!");
    res.send('<script>alert("로그인을 해주세요."); window.location.replace("/login");</script>');
  }
}

router.use(session({
  secret: 'process.env.DB_SECRET',
  resave : false,    
  saveUninitialized : false 
})) 
router.use(passport.session())
router.use(passport.initialize())
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      // console.log("입력한 아이디 :" + 입력한아이디 + '\n'+"입력한 비번 :" + 입력한비번);
     database.loginfindOne({id:입력한아이디}).then((result)=>{
      if (!result)
        return done(null, false, { message: "존재하지않는 아이디입니다." });
      if (입력한비번 == result.pw) {
        return done(null, result);
      } else {
        return done(null, false, { message: "다시 입력바랍니다." });
      }      
     }).catch((error)=>{
      return done(error);
     })
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (아이디, done) {
  database.loginfindOne({id:아이디}).then((result)=>{
    done(null,result);
  });
  
});


router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login" }),(req,res)=>{
      res.redirect('/');
    }); // authenticate : 인증해주세요
//로그인 후 index페이지













router.get("/mypage",checkLogin,(req, res) => {

  console.log(req.body.id+" mypagelogin");
    database.contentFind({ likeid: req.user.id }).then((result)=>{
      res.render("mypage.ejs", {
        id: req.user,
        Module: result,
        contents: result,
      });
    })
    .catch((error)=>{
      console.log("mypage=>"+error);
      res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
  
    })
  });


router.get("/mypage/products",checkLogin, (req, res) => {
database.contentFind({작성자: req.user.id}).then((result)=>{
res.render("product.ejs", { id: req.user, Module: result, contents: result });

}).catch((error)=>{
console.log("products=> "+error);
res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");

})
}); // 마이페이지 중 내상품 페이지

//여기서부터안함
router.delete("/profile/delete",checkLogin, (req, res) => {
    database.LoginDeleteOne({_id:req.body._id}).then((result)=>{
      res.render("profile.ejs", { profile: result });
    }).catch((error)=>{
      console.log("products=> "+error);
      res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
    })
   
  });

router.put("/mypage/profile",checkLogin,(req,res)=>{

database.LoginUpdate(req.user._id,req.body.name,req.body.Email,req.body.id,req.body.pw).then((result)=>{
    res.send(
    '<script>alert("수정이 완료되었습니다."); window.location="/mypage/profile";</script>');
}).catch((error)=>{
    console.log("profile=> "+error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
})
});



router.get("/write",checkLogin, (req, res) => {
console.log("req.user.id =>   "+req.user.id );

let result = null;

var writeInput={
    _id: result?._id,
    작성자: result?.작성자,
    제목: result?.제목,
    내용: result?.내용,
    시간: result?.시간
  
}

console.log(req.user.id);
    res.render("write.ejs",{write:writeInput});
})


    


router.get("/write/:id",checkLogin, (req, res) => {
// console.log(req.params.id);
database.PostFindOne({_id:parseInt(req.params.id)}).then((result)=>{
    var writeInput={
    _id: result?._id,
    id: result?.id,
    작성자: result?.작성자,
    제목: result?.제목,
    내용: result?.내용,
    시간: result?.시간
    }
    // console.log(writeInput);
    res.render("write.ejs",{write:writeInput});
}).catch((error)=>{
  console.log("write => "+error);
  res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
})
}); //글쓰기페이지

router.get("/detail/:id",checkLogin, (req, res) => {
    database.PostFindOne({_id:parseInt(req.params.id)}).then((result)=>{
  
      database.commentFind({ 글번호: parseInt(req.params.id) }).then((result2)=>{
  
  
        res.render("detail.ejs", {
          data: result,
          commentdata: result2,
          dataid: req.user,
        });
      })
      .catch((error)=>{
      console.log("detailComment => "+error);
      res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
      })
  
    })
    .catch((error)=>{
    console.log("detail => "+error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
    })
  });
     // qna 디테일 페이지


router.post("/add",checkLogin,(req, res) => {
var _id1 = parseInt(req.body.id); 


database.PostFindOne({_id:_id1}).then((result)=>{

  if(result){
  
    database.postUpdateOne(_id1,req.body.title,req.body.data).then((result)=>{
      res.send('<script>alert("수정이 완료되었습니다."); window.location="/detail/' +_id1 + '";</script>');
    })
  }
    database.counterFindOne({name:"총게시물갯수"}).then((result1)=>{
  
      database.postInsertOne({
        _id: result1.totalPost + 1,
        id: req.user._id,
        작성자: req.user.id,
        제목: req.body.title,
        내용: req.body.data,
        시간: new Date()
      }).then((result2)=>{

        database.counterUpdateOne("총게시물갯수").then((result3)=>{
          res.send('<script>alert("저장되었습니다."); window.location="/qna";</script>');
          console.log(result3);
        })
      })
    })
  })

  });
  
router.post("/detail/delete",checkLogin, (req, res) => {

database.postDeleteOne({_id:parseInt(req.body._id)}).then((result)=>{
console.log(req.body._id +"삭제완료");
}).catch((error)=>{
console.log("detail/delete => "+error);
res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
})
});


router.post("/comment",checkLogin, (req, res) => {
var save = {
댓글: req.body.comment,
글번호: parseInt(req.body.parentnumber),
댓글작성자: req.user.id,
시간: new Date(),
};
database.commentInsertOne(save).then((result)=>{
res.send(
    '<script>window.location="/detail/' + req.body.parentnumber + '"</script>'
);
}).catch((error)=>{
console.log("comment => "+error);
res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
})
}) // qna 댓글

router.get("/scam/add",checkLogin, (req, res) => {
database.ScamInsertOne({choice:req.query.Choice,Username:req.query.keyword,id:req.user.id}).then((result)=>{
    res.send('<script>alert("신고되었습니다."); window.location="/";</script>');
}).catch((error)=>{
    console.log("scamAdd => "+error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
    })
})


router.get("/pocawrite",checkLogin, (req, res) => {
res.render("pocawrite.ejs");
});










// router.post("/chat",로그인했니, (req, res) => {
//   res.render("chat.ejs");
//   // console.log('req.body.chatroomid=> ' +req.body.chatroomid); // 채팅방 고유의 이름
//     console.log(req.user._id + " => chat user._id");
//     database.chatroomFind({ member: req.user._id }).then((result)=>{
//       console.log(result); //user._id가 있으면 결과를 보내줌
//       var chatroomid = ObjectId(result.chatroomid);  //방 고유의이름
//       console.log(chatroomid + "chatroomid"); // 채팅방의 유저
    
//     console.log('req.user.id=> '+req.user._id);
//     var save = {
//       id : ObjectId(chatroomid&req.user._id),   // 방 고유의 이름
//       title: req.body.chatroomname,   // 제목 : 상대방
//       member: [chatroomid, req.user._id],   // 멤버 : 나와 상대방
//       date: new Date(),  //시간
//     };  

//       if(chatroomid){  // 만약 채팅 유저가 있다면,
//         database.chatroomFindOne({member : [chatroomid,req.user._id]}).then((result2)=>{
//           console.log('result2 = > '+ result2); //결과내놔
//           if(!result2){  // 만약 결과가 없다면 
//             database.chatroomInsertOne(save).then((result3)=>{    // 새로만들어줘.
//               res.render("chat.ejs",{chatlist:result,chatting:result3,name:req.user});
//             })
//           }
//           else{    // 멤버가 상대방가 자신이 만약 있으면!
//           res.render("chat.ejs",{chatlist:result,chatting:result2,name:req.user});
//           }
//         })
//       }
//       else{  // 채팅유저가 없으면!
//         res.render("chat.ejs",{chatlist:result,chatting:result2,name:req.user});
//       }
//     })
//   }); // 전체 채팅방

//   io.on("connection", function (socket) {
//     console.log("연결됨");
  //   let roomName;
  //   let Username;
  //   let datalist ;
  
  //   socket.on("room1-send", function (data) {
  //     console.log("roomName=> " + roomName);
  //     console.log("보낸사람=>" + Username);
  //     console.log("메시지=>" + data);
  //     database.chatroomUpdateOne(new ObjectId(roomName),Username,data ).then((result)=>{
  //       datalist.name = Username;
  //       datalist.contensts = data;
  //       io.emit("broadcast", datalist);
  //     })
  //       }
  //     );
  
  // // 배열로 작성자 내용 일자 추가 만들기
  
  // socket.on("room1", function (name) {
  //   Username = name;
  //   console.log("이름" + name);
  //   database.chatroomFindOne({ id: new ObjectId(roomName) }).then((result)=>{
  //     if (result.chat) {
  //       for (var i = 0; i < result.chat.length; i++) {
  //         datalist = {
  //           name: result.chat[i].UserId,
  //           contensts: result.chat[i].contents,
  //         };
  //         socket.emit("datalist",{datalist});
  //         io.to("room1").emit("broadcast", datalist);
  //       }
  //     } else {
  //       datalist.contents = "님이 입장하셨습니다.";
  //       io.to("room1").emit("broadcast", datalist);
  //     }
  //   }
  // );
  //   })
  // socket.on("joinroom", function (data) {
  //   roomName = data;
  //   console.log("방이름" + data);
  //   socket.join("room1");
  // });
  // });


  

  

 


module.exports = router;