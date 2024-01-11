const database = require('../conf/database.js');

const ObjectId = require('mongodb').ObjectId;
const express = require("express");
const app = express();
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const http = require('http').createServer(app); // socket.io
const { Server } = require("socket.io"); // socket.io
const io = new Server(http); // socket.io
const loginRouter = require('./loginRoute.js');





function socketRouter(io){

  router.post("/chat",(req, res) => {
    console.log(loginRouter.checkLogin);
    console.log(req.user);
    console.log("연결됨");
      // console.log('req.body.chatroomid=> ' +req.body.chatroomid); // 채팅방 고유의 이름
        console.log(req.user._id + " => chat user._id");
        database.chatroomFind({ member: req.user._id }).then((result)=>{
          console.log(result); //user._id가 있으면 결과를 보내줌
          var chatroomid = ObjectId(result.chatroomid);  //방 고유의이름
          console.log(chatroomid + "chatroomid"); // 채팅방의 유저
        
        console.log('req.user.id=> '+req.user._id);
        var save = {
          id : ObjectId(chatroomid&req.user._id),   // 방 고유의 이름
          title: req.body.chatroomname,   // 제목 : 상대방
          member: [chatroomid, req.user._id],   // 멤버 : 나와 상대방
          date: new Date(),  //시간
        };  
    
          if(chatroomid){  // 만약 채팅 유저가 있다면,
            database.chatroomFindOne({member : [chatroomid,req.user._id]}).then((result2)=>{
              console.log('result2 = > '+ result2); //결과내놔
              if(!result2){  // 만약 결과가 없다면 
                database.chatroomInsertOne(save).then((result3)=>{    // 새로만들어줘.
                  res.render("chat.ejs",{chatlist:result,chatting:result3,name:req.user});
                })
              }
              else{    // 멤버가 상대방가 자신이 만약 있으면!
              res.render("chat.ejs",{chatlist:result,chatting:result2,name:req.user});
              }
            })
          }
          else{  // 채팅유저가 없으면!
            res.render("chat.ejs",{chatlist:result,chatting:result2,name:req.user});
          }
        })
      }) // 전체 채팅방
 
   
            
    io.on("connection", function (socket) {
      console.log("연결됨");
      let roomName;
      let Username;
      let datalist ;
    
      socket.on("room1-send", function (data) {
        console.log("roomName=> " + roomName);
        console.log("보낸사람=>" + Username);
        console.log("메시지=>" + data);
        database.chatroomUpdateOne(new ObjectId(roomName),Username,data ).then((result)=>{
          datalist.name = Username;
          datalist.contensts = data;
          io.emit("broadcast", datalist);
        })
          }
        );
    
    // 배열로 작성자 내용 일자 추가 만들기
    
    socket.on("room1", function (name) {
      Username = name;
      console.log("이름" + name);
      database.chatroomFindOne({ id: new ObjectId(roomName) }).then((result)=>{
        if (result.chat) {
          for (var i = 0; i < result.chat.length; i++) {
            datalist = {
              name: result.chat[i].UserId,
              contensts: result.chat[i].contents,
            };
            socket.emit("datalist",{datalist});
            io.to("room1").emit("broadcast", datalist);
          }
        } else {
          datalist.contents = "님이 입장하셨습니다.";
          io.to("room1").emit("broadcast", datalist);
        }
      }
    );
      })
    socket.on("joinroom", function (data) {
      roomName = data;
      console.log("방이름" + data);
      socket.join("room1");
    });
    });
    return router;
  }

module.exports = socketRouter;