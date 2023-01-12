
const express = require('express');
const app = express();
app.set('view engine','ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended:true}))
const MongoCilent = require('mongodb').MongoClient;
app.use(express.static('views'));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

MongoCilent.connect('mongodb+srv://admin:dlsgud5031@cluster0.7igrfxz.mongodb.net/sinae?retryWrites=true&w=majority',(에러,client)=>{
    if(에러) return console.log(에러);
    db = client.db('sinae');
    
    app.post('/sign',(req,res)=>{
       
        res.send('저장완료되었습니다.')
   

    db.collection('login').insertOne({ id : req.body.id,pw :req.body.pw,name:req.body.name },(에러,결과)=>{
        console.log(req.body);
    })
})

});



app.listen(3000);
app.get('/',(req,res)=>{
    console.log('3000번 홈 서버 열림');
    res.render('index');
});

app.get('/sign_up',(req,res)=>{
    console.log('회원가입 서버 열림');
    res.render('sign_up.ejs')    //회원가입페이지
})

app.get('/login',(req,res)=>{
    
    console.log('login 서버 열림');
    res.render('login');   //로그인페이지 만들기
})

app.post('/login',passport.authenticate('local', {failureRedirect : '/fail'}),(req,res)=>{
    console.log(req.body);
    res.redirect('/')    
})

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
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

  
  app.get('/about',(req,res)=>{
      console.log('gallery서버 열림');
      res.render('about')   // 사진 페이지 만들기
      
});



app.get('/mypage',로그인했니,(req,res)=>{ 
    console.log(req.user);
    
    res.render('mypage',{id:req.user});
})

function 로그인했니(req,res,next){

    if(req.user)
    {
        next();
    } 
    else{
        
        res.render('login.ejs');
    }
    


}


app.post('/sign',(req,res)=>{
    db.collection('login').insertOne({name:req.body.name,id:req.body.id,pw:req.body.pw}, (error,result)=>{
        console.log('회원가입완료');
        res.redirect('/login');
    })
})


app.get('/write',로그인했니,(req,res)=>{
    

    res.render('write');
})


app.post('/add',(req,res)=>{
    
    res.send('저장완료되었습니다.')
    
    var 저장할거 = {title: req.body.title, data :req.body.data, id : req.user._id}
    
    db.collection('post').insertOne(저장할거,(에러,결과)=>{
        console.log('저장완료');
})
})

app.get('/qna',(req,res)=>{
    
    db.collection('post').find().toArray(function(에러,결과){
        console.log(결과);
        res.render('qna.ejs',{posts:결과});
        
    })
})

app.get('/search',(req,res)=>{
    var 검색조건 = [
        {
            $search: {
                index: 'titleSearch',
                text: {
                query: req.query.value,  // 요청 검색하는 곳
                path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']   
              }
            }
          },
          //{$progect : {}} // 원하는 것만 보여주고 싶을 때 
          
          
        ]

    db.collection('post').aggregate(검색조건).toArray((error,result)=>{
        console.log(result);

        res.render('qna.ejs',{posts:result});
    })
})

