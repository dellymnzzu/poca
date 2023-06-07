"use strict";

$("#chat").click(function (e) {
    var target_id = e.target.dataset.id;
    var chat_text = $(document.getElementById("chatroom")).text();

    $.post("/chat", { chatroomid: target_id, chatroomname: chat_text });
  });

$('#like').click(function(e){
    var Data = e.target.dataset.id;
   var content= document.getElementById('content').dataset.id;
    $.post('/like',{id:Data,_id:content}); 
    });