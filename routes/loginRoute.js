const database = require('../conf/database.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const login = require('./login.js');

require('dotenv').config()


let multer = require("multer");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 파일명을 다이나믹하게 작명하고 싶을때! +'날짜' +new data()
  },
  fileFilter: function (req, file, callback) {
    // 파일형식(확장자 거르기!)
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("PNG, JPG만 업로드하세요"));
    }
    callback(null, true);
  },
  // limits:{     // 파일 사이즈!
  //     fileSize: 1024 * 1024
  // }
});

var upload = multer({ storage: storage });


router.post(
  "/login",login,
  passport.authenticate("local", {
    failureRedirect: "/login" }),(req,res)=>{
      res.redirect('/');
    }); // authenticate : 인증해주세요
//로그인 후 index페이지












router.get("/mypage",login,(req, res) => {

  console.log(req.user.id+" mypagelogin");
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


router.get("/mypage/products",login, (req, res) => {
database.contentFind({작성자: req.user.id}).then((result)=>{
res.render("product.ejs", { id: req.user, Module: result, contents: result });

}).catch((error)=>{
console.log("products=> "+error);
res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");

})
}); // 마이페이지 중 내상품 페이지

//여기서부터안함
router.delete("/profile/delete",login, (req, res) => {
    database.LoginDeleteOne({_id:req.body._id}).then((result)=>{
      res.render("profile.ejs", { profile: result });
    }).catch((error)=>{
      console.log("products=> "+error);
      res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
    })
   
  });

router.put("/mypage/profile",login,(req,res)=>{

database.LoginUpdate(req.user._id,req.body.name,req.body.Email,req.body.id,req.body.pw).then((result)=>{
    res.send(
    '<script>alert("수정이 완료되었습니다."); window.location="/mypage/profile";</script>');
}).catch((error)=>{
    console.log("profile=> "+error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
})
});



router.get("/write",login, (req, res) => {
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


    


router.get("/write/:id",login, (req, res) => {
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

router.get("/detail/:id",login, (req, res) => {
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


router.post("/add",login,(req, res) => {
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
  
router.post("/detail/delete",login, (req, res) => {

database.postDeleteOne({_id:parseInt(req.body._id)}).then((result)=>{
console.log(req.body._id +"삭제완료");
}).catch((error)=>{
console.log("detail/delete => "+error);
res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
})
});


router.post("/comment",login, (req, res) => {
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

router.get("/scam/add",login, (req, res) => {
database.ScamInsertOne({choice:req.query.Choice,Username:req.query.keyword,id:req.user.id}).then((result)=>{
    res.send('<script>alert("신고되었습니다."); window.location="/";</script>');
}).catch((error)=>{
    console.log("scamAdd => "+error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
    })
})


router.get("/pocawrite",login, (req, res) => {
res.render("pocawrite.ejs");
});



router.post("/addwirte",login, upload.single("picture"), (req, res) => {
  res.send("저장완료");
  database.counterFindOne({contentName:"totalNumber"}).then((result)=>{
    var totalNumber = result.totalContent;
    var Save = {
      _id: totalNumber + 1,
      id: req.user._id,
      작성자: req.user.id,
      제목: req.body.pocatitle,
      대분류: req.body.group,
      middle: req.body.issue,
      소분류: req.body.detail,
      값: req.body.price,
      설명: req.body.explanation,
      좋아요: 0,
      조회수: 0,
      시간: new Date(),
      이미지: req.file?.originalname ? req.file.originalname : null,
    };
  
  database.contentInsertOne(Save).then((result1)=>{
    database.counterUpdateOne("totalNumber").then((result2)=>{

    }).catch((error)=>{
      console.log("addWirte error => "+error);
      res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");
      })
  })
})
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