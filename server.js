
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


app.get('/gallery',(req,res)=>{
    console.log('gallery서버 열림');
    res.render('gallery')   // 사진 페이지 만들기

});

app.get('/profile',(req,res)=>{
    console.log('profile서버 열림');
    res.render('profile')   // 프로필 페이지 만들기 , 사진, 이름, 주소,언제태어났는지, 직업,등등

});

app.get('/mypage',로그인했니,(req,res)=>{
    res.render('mypage');
})

function 로그인했니(req,res,next){

    if(req.user)
    {
        next();
    } 
    else{
        
        res.send("로그인을 해주시길 바랍니다.");
    }
    


}

