const database = require('../conf/database.js');
const ObjectId = require('mongodb').ObjectId;
const express = require("express");
const app = express();
const router = express.Router();



router.get("/login", (req, res) => {
  res.render("login.ejs"); //로그인페이지 만들기
});

router.get("/", (req, res) => {
  database.contentFind().then((result)=>{
      console.log("서버열림");
      res.render("index.ejs",{Module:result});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
    });
   }); //index페이지



router.get("/about", (req, res) => {
  res.render("about.ejs");
});

router.get("/qna", (req, res) => {
  var currentPage = req.query.page||1; // 현재페이지 또는 1페이지
  var limit = 5;  // 현재 있는 게시글 수 || 10

database.counterFindOne({name:"총게시물갯수"}).then((result1)=>{


  

  
  database.PostFind(currentPage,limit).then((result)=>{
 
    
      

      res.render("qna.ejs", { posts: result,page:result1,currentPage:currentPage});
  })
  })
.catch((error)=>{
  console.log("qna=> "+error);
  res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
})
});

router.get("/newmodule/:id", (req, res) => {
    
  let number= parseInt(req.params.id);

  database.contentFindOne(number).then((result=>{
    res.render("newmodule.ejs", { Module:result});
    console.log(result);
  }))
  .catch((error)=>{
    console.log(error);
    res.status(500).send("오류가 발생했습니다.");
  })
});



router.get("/sign_up",(req,res)=>{
  var inputData = {
        id:null,
       pw:null,
        name:null,
        Email:null
   };
  res.render("sign_up.ejs",{DATA:inputData});
});



router.get("/scam",(req,res)=>{
 
  res.render("scamInput.ejs");

});

router.get("/best", (req, res) => {

  database.contentFindMiddle("best").then((result)=>{
    res.render("best.ejs", { Module: result });
  }).catch((error)=>{
    console.log("best error => "+error);
  res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
  })
});

router.get("/new", (req, res) => {
  database.contentFindMiddle("new").then((result) => {
    res.render("new.ejs", { Module: result });
  }).catch((error) => {
    console.log("new error => "+error);
    res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");
  });
});

router.get("/poca", (req, res) => {

  database.contentFind().then((result=>{
    database.contentFind({제목:null}).then((result2)=>{
      res.render("poca.ejs", { poca: result, category: result2 });
    }).catch((error)=>{
      console.log("poca error => "+error);
      res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");
  }); 
  }))});


 router.get("/poca/:middle", (req, res) => {
  database.contentFind({제목:null})
  .then((result)=>{ 
   
  //req,res가 들어가있으면 연관성이 있지만, req,res가 들어가있지 않아서 얘는 다른 걸 요청한거. 즉 들어오는 값이 달라도 나가는 값은 동일한 애
      database.contentFindMiddle(req.params.middle)
      .then((result2)=>{
        
      res.render("poca.ejs", { category: result, poca:result2 }); //변수 여러개 줘도 상관 없음, result==category
      })
      .catch((error)=>{
      console.log("poca error => "+error);
      res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");
      })
  })
  .catch((error)=>{
  console.log("category error => "+error);
  res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");
  })
});

router.get("/pocadetail/:id", (req, res) => {
  var idNum = parseInt(req.params.id);
 
  database.contentFindOne(idNum).then((result)=>{

    database.contentUpdatePoca( parseInt(req.params.id)).then((result1)=>{
      res.render("pocadetail.ejs", { contents: result });
    }).catch((error)=>{
      console.log("pocadetailIDupdate => "+error);
      res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");

    })
  }).catch((error)=>{
    console.log("pocadetailIDfind => "+error);
      res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");

  })
});



router.get("/bestLike", (req, res) => {
  database.contentFindMiddle("bestLike").then((result)=>{
    res.render("bestLike.ejs", { Module: result });
  }).catch((error)=>{
    console.log("bestLike error => "+error);
      res.status(500).send("오류가 발생했습니다. 다시 접속해주세요.");
        })
  });



router.get("/search", (req, res) => {
  var 검색조건 = [
    {
      $search: {
        index: "pocaSearch",
        text: {
          query: req.query.value, // 요청 검색하는 곳
          path: "제목", // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        },
      },
    },
  ];
  console.log(req.query.value);
  database.PostAggregate(검색조건).then((result)=>{
    console.log("search=> "+result);
    res.render("search.ejs", { posts: result });
  }).catch((error)=>{
    console.log("postSearch => "+error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
  })
}); // 서치페이지



router.get("/scam/search",(req,res)=>{
  database.ScamFindOne(req.query.input).then((error)=>{
    res.render("scamInput.ejs");
  }).catch((error)=>{
    console.log("scamSearch => "+error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
    })
})

router.post("/like", (req, res) => {
  var Data = req.body.id; // 글 작성자 아이디
  var data = req.user.id; // 로그인 한 아이디

  if (!req.user) {
    //로그인 안됨
    return res.render("login.ejs");
  } // 리턴을 사용하면 끝나는 부분

  if (Data === data) {
    console.log("자신의 게시물에는 좋아요를 누를 수 없음");
  } else {
    database.likeFindOne( {찜아이디: req.user.id, 게시물번호: parseInt(req.body._id)} ).then((result)=>{
      database.contentFind({ _id: parseInt(req.body._id) }).then((result2)=>{
        if(result){
          database.likeDeleteOne({ 찜아이디: req.user.id });
          database.contentUpdate( parseInt(req.body._id),data,'M');
        } 
        else{
          var 저장 = {
            게시물번호: parseInt(req.body._id),
            찜아이디: req.user.id,
            시간: new Date(),
          };
          database.likeInsertOne(저장).then((result3)=>{
            
            database.contentUpdate(parseInt(req.body._id),data,'P');
          })
        }
      })
    })
  }
}); //찜 구현

router.post("/sign",(req,res)=>{
  var inputData = {
        id:req.body?.id,
       pw:req.body?.pw,
        name:req.body?.name,
        Email:req.body?.Email
   };
    database.loginfindOne({id:inputData.id}).then((result)=>{
      console.log(result);
       if(result){
        res.render("sign_up.ejs",{DATA:inputData});
       }
       database.inputUserData(inputData).then((result)=>{
           res.send('<script>alert("회원가입을 축하합니다! 다시 로그인해주세요."); window.location.replace("/login");</script>');

    }).catch((error)=>{
      console.error(error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
  })
  
})
.catch((error)=>{
console.error(error);
    res.status(500).send("오류가 발생했습니다.다시 접속해주세요.");
  });
});




module.exports = router;