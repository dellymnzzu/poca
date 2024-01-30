const database = require('../conf/database.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

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

  module.exports = router;
  
  
 