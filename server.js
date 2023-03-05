
const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended:true}));
const MongoCilent = require('mongodb').MongoClient;
app.use(express.static('views'));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');




app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 




MongoCilent.connect('mongodb+srv://admin:dlsgud5031@cluster0.7igrfxz.mongodb.net/poca?retryWrites=true&w=majority',(에러,client)=>{
if(에러) return console.log(에러);
db = client.db('poca');
app.post('/sign',(req,res)=>{
res.send('저장완료되었습니다.')
db.collection('login').insertOne({ id : req.body.id,pw :req.body.pw,name:req.body.name,Email:req.body.Email})})
}) // 회원가입

app.listen(8080);

app.get('/',(req,res)=>{
  
db.collection('content').find().sort({"시간":-1}).toArray((error,result)=>{

    if(error) {
        console.log('서버'+error);
    }
    console.log('8080서버 열림');
    res.render('index.ejs',{Module:result});
})
})
//index페이지

app.get('/newmodule/:id',(req,res)=>{
    db.collection('content').findOne({_id:parseInt(req.params.id)},(error,result)=>{
        if(error) return console.log('error');
        res.render('newmodule.ejs',{Module:result});
    })
})
//포카모듈

app.get('/sign_up',(req,res)=>{
res.render('sign_up.ejs')    //회원가입페이지
})

app.get('/login',(req,res)=>{
res.render('login');   //로그인페이지 만들기
})

app.post('/login',passport.authenticate('local', {failureRedirect : '/fail'}),(req,res)=>{
console.log(req.body);
res.redirect('/')    
})
//로그인 후 index페이지 
passport.use(new LocalStrategy({
usernameField: 'id',
passwordField: 'pw',
session: true,
passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
//console.log(입력한아이디, 입력한비번);
db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
if (에러) return done(에러)

if (!결과) return done(null, false, { message: '존재하지않는 아이디입니다.' })
if (입력한비번 == 결과.pw) {
return done(null, 결과)
} else {
return done(null, false, { message: '다시 입력바랍니다.' })
}
})
}));

passport.serializeUser(function (user, done) {
done(null, user.id)
});

passport.deserializeUser(function (아이디, done) {
db.collection('login').findOne({id:아이디},(error,result)=>{

done(null, result)
})
}); 
//아이디,비번 미들웨어
app.get('/about',(req,res)=>{
res.render('about') 
});
//about페이지
app.get('/mypage',로그인했니,(req,res)=>{
    db.collection('content').find({likeid:req.user.id}).sort({"시간":-1}).toArray((error,result)=>{
        res.render('mypage.ejs',{id:req.user,Module:result,contents:result});
    })   
 })
 //마이페이지

app.get('/mypage/my',로그인했니,(req,res)=>{
    db.collection('content').find({작성자:req.user.id}).toArray((error,result)=>{
            res.render('mypage',{id:req.user,Module:result,contents:result});
    })
}) // 마이페이지 중 내상품 페이지



function 로그인했니(req,res,next){

if(req.user)
{
next();
} 
else{
   
res.render('login.ejs');

}
}
//로그인했니 함수


app.post('/sign',(req,res)=>{
db.collection('login').insertOne({name:req.body.name,id:req.body.id,pw:req.body.pw}, (error,result)=>{
console.log('회원가입완료');
res.redirect('/login');
})
}) // 회원가입 

app.get('/write',로그인했니,(req,res)=>{
res.render('write.ejs');
}) //글쓰기페이지


app.post('/add',(req,res)=>{

res.send('저장완료되었습니다.');

db.collection('counter').findOne({name:'총게시물갯수'},(error,result)=>{
console.log(result.totalPost);
var 총게시물갯수=result.totalPost;

var 저장할거 = {_id:총게시물갯수+1,
                id:req.user._id,
                작성자: req.user.id ,
                제목 : req.body.title, 
                내용 :req.body.data,
                시간:new Date()}

db.collection('post').insertOne(저장할거,(에러,결과)=>{
    console.log('저장완료');
db.collection('counter').updateOne({name:'총게시물갯수'},{$inc: {totalPost:1}},()=>{}) // set : 변경, inc : 기존값에 더해줄 값 

});
});

}); // qna 글쓰기 

app.get('/qna',(req,res)=>{

db.collection('post').find().sort({"시간":-1}).toArray(function(error,result){
res.render('qna.ejs',{posts:result});

})
}) //qna 페이지

app.get('/detail/:id',로그인했니,(req,res)=>{
    db.collection('post').findOne({_id:parseInt(req.params.id)},(error,result)=>{
        db.collection('comment').find({글번호:req.params.id}).sort({"시간":-1}).toArray((error,result2)=>{ 
            res.render('detail.ejs',{data:result,commentdata:result2,dataid:req.user});
        })
    })
}) // qna 디테일 페이지

app.post('/comment',로그인했니,(req,res)=>{
    var 저장= { 댓글 : req.body.comment,
                글번호 : req.body.parentnumber ,
                댓글작성자: req.user.id, 
                시간: new Date()}
    db.collection('comment').insertOne(저장,(error,result)=>{
        res.send('<script>window.location="/detail/'+ req.body.parentnumber+'"</script>')   
    })
})  // qna 댓글

app.get('/search',(req,res)=>{
var 검색조건 = 
[
{
    $search: {
        index: 'pocaSearch',
        text: {
        query: req.query.value,  // 요청 검색하는 곳
        path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']   
        }
    }
    },      
]
console.log(req.query.value);
db.collection('post').aggregate(검색조건).toArray((error,result)=>{ 
if(error) console.log(result);//aggregate : 검색조건 여러개 가능 
console.log(result);

res.render('search.ejs', {posts : result});

})

})// 서치페이지

app.get('/scam',(req,res)=>{
    res.render('scam.ejs');
}) //사기조회

app.get('/best',(req,res)=>{
    db.collection('content').find().sort({"조회수":-1}).toArray((error,result)=>{

        if(error) {
            console.log(error);
        }
        res.render('best.ejs',{Module:result});
})
}) //베스트 페이지


app.get('/new',(req,res)=>{
    db.collection('content').find().sort({"시간":-1}).toArray((error,result)=>{

        if(error) {
            console.log(error);
        }
    
      
res.render('new.ejs',{Module:result});
})
}) // 새페이지

app.get('/poca',(req,res)=>{
    db.collection('content').find().toArray((error,result)=>{
        db.collection('content').find({제목:null}).toArray((error,result2)=>{

            if(error) {
                console.log(error);
            }
        
          
    
                res.render('poca.ejs', {poca:result,category:result2});
        })


        })
}) // poca페이지

app.get('/poca/:middle',(req,res)=>{
    var value = {middle : req.params.middle};
    
    db.collection('content').find({제목:null}).toArray((error,result)=>{ //req,res가 들어가있으면 연관성이 있지만, req,res가 들어가있지 않아서 얘는 다른 걸 요청한거. 즉 들어오는 값이 달라도 나가는 값은 동일한 애 

        db.collection('content').find(value).toArray((error,result2)=>{

            if(error) {
                console.log(error);
            }
          res.render('poca.ejs', {poca:result2,category:result}); //변수 여러개 줘도 상관 없음, result==category

            })
    }) //제목 없이 글쓰기 금지
})


let multer = require('multer');
const { ObjectId } = require('mongodb');
var storage = multer.diskStorage({

  destination : function(req, file, cb){
    cb(null, './public/image');
  },
  filename : function(req, file, cb){
    cb(null, file.originalname );      // 파일명을 다이나믹하게 작명하고 싶을때! +'날짜' +new data()
  },
  fileFilter: function (req, file, callback) {           // 파일형식(확장자 거르기!)
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('PNG, JPG만 업로드하세요'))
    }
    callback(null, true)    
}
// limits:{     // 파일 사이즈!
//     fileSize: 1024 * 1024
// }
});

var upload = multer({storage : storage});

app.get('/pocawrite',로그인했니,(req,res)=>{
    res.render('pocawrite.ejs');
})




app.post('/addwirte',upload.single('picture'),(req,res)=>{
    res.send('저장완료');

    db.collection('counter').findOne({contentName:'totalNumber'},(error,result)=>{
        
        console.log(req.file);
        console.log(result.totalContent);
        var totalNumber=result.totalContent;
        
        var save = {_id:totalNumber+1 ,id:req.user._id,작성자: req.user.id,제목 : req.body.pocatitle, 대분류 : req.body.group, 
            middle : req.body.issue, 소분류 : req.body.detail, 값 : req.body.price, 설명 : req.body.explanation, 좋아요:0,
            조회수 : 0,시간: new Date(),이미지:req.file?.originalname?req.file.originalname:null}
        
        db.collection('content').insertOne(save,(에러,결과)=>{
           
            
            

            
           
        db.collection('counter').updateOne({contentName:'totalNumber'},{$inc: {totalContent:1}},()=>{}) // set : 변경, inc : 기존값에 더해줄 값 
        
        });
        });
        
        });

app.get('/pocadetail/:id',(req,res)=>{
    db.collection('content').findOne({_id:parseInt(req.params.id)},(error,result)=>{
        db.collection('content').updateOne({_id:parseInt(req.params.id)},{$inc:{조회수:1}});

        // console.log(result);
        res.render('pocadetail.ejs',{contents:result});
    })
})

app.post('/like',(req,res)=>{
    var Data=req.body.id; // 글 작성자 아이디
    var data = req.user.id; // 로그인 한 아이디
    
   
    
    
        if(!req.user){  //로그인 안됨
           return res.render('login.ejs');
        } // 리턴을 사용하면 끝나는 부분
        
        
        if(Data===data){
            console.log('자신의 게시물에는 좋아요를 누를 수 없음');
        }
        else{
            db.collection('like').findOne({찜아이디:req.user.id,게시물번호:parseInt(req.body._id)},(error,result)=>{
                db.collection('content').find({_id:parseInt(req.body._id)}).toArray((error,result2)=>{
                    console.log(result2)
                if(result){ // result가 참일때 이렇게 쓰면 조음
                db.collection('like').deleteOne({찜아이디:req.user.id})
                db.collection('content').updateOne({_id:parseInt(req.body._id)},{$pull:{likeid:data},$inc:{좋아요:-1}},(result)=>{
                })
                }
                else{
                    var 저장 = {게시물번호:parseInt(req.body._id),찜아이디: req.user.id,시간:new Date()}
                    db.collection('like').insertOne(저장,(error,result)=>{
                    })  //늦게 동작해도 상관 없으면 괜찬, 아니면 방법 생각
                        
                    db.collection('content').updateOne({_id:parseInt(req.body._id)},{$addToSet:{likeid:data},$inc:{좋아요:1}},(result)=>{
                    }
                        
                )}
                    
            })  
        
            })
        }      
}) //찜 구현
   

app.get('/bestLike',(req,res)=>{
    db.collection('content').find().sort({"좋아요":-1}).toArray((error,result2)=>{
        res.render('bestLike.ejs', {Module:result2});
        console.log(result2);
        })
        }) // 찜페이지
   

app.post('/chatroom',로그인했니,(req,res)=>{
    console.log(req.body);
    console.log(req.user);
    
    var save = {
        title : req.body.chatroomname,
        member : [ObjectId(req.body.chatroomid), req.user._id],
        date : new Date()
      }

      console.log(save);
    
      db.collection('chatroom').insertOne(save).then((result)=>{
        console.log(result);
      });
}) //채팅방

app.get('/chat',로그인했니,(req,res)=>{
    db.collection('chatroom').find({member : req.user._id}).toArray().then((result)=>{ // member -> 현재 로그인한 유저의 _id

        res.render('chat.ejs',{data:result});
    })
})

app.post('/message',로그인했니,(req,res)=>{
    var save = {
        parent : req.body.parent,
        content :req.body.content,
        userid: req.user._id,
        date : new Date(),
    }

    db.collection('message').insertOne(save)
});

//실시간 서버 소통 채널
app.get('/message/:parentid', 로그인했니, function(request, response){
    response.writeHead(200, {
      "Connection": "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });
  
    db.collection('message').find({ parent: request.params.parentid }).toArray()
    .then((result)=>{
      response.write('event: test\n');
      response.write(`data: ${JSON.stringify(result)}\n\n`);
    });
  
    const findDocu = [
      { $match: { 'fullDocument.parent': request.params.parentid } }
    ];
    const changeStream = db.collection('message').watch(findDocu);
    changeStream.on('change', result => {
      var addDocu = [result.fullDocument];
      response.write('event: test\n');
      response.write(`data: ${JSON.stringify(addDocu)}\n\n`);
    });
  });
















