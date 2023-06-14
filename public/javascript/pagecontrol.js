"use strict";
//nav.html
$("#about").click(function(){
    location.assign("/about");
});

$("#login").click(function(){
    location.assign("/login");
});

$("#join").click(function(){
    location.assign("/sign_up");
});

$("#qna").click(function(){
    location.assign("/qna");
});

$("#icon").click(function(){
    location.assign("/mypage");
});




$("#butterflystore").click(function(){
    location.assign("/");
});



$("#BEST").click(function(){
    location.assign("/best");
});

$("#NEW").click(function(){
    location.assign("/new");
});

$("#POCA").click(function(){
    location.assign("/poca");
});

$("#SCAMINPUT").click(function(){
    location.assign("/scam/add");
});

$("#POCAWRITE").click(function(){
    location.assign("/pocawrite");
});


//about.ejs

$(".navbar-brand-watermarke").click(function(){
    location.assign("/");
});

//edit.ejs

$("#cancel-btn").click(function(){
    location.rediret("/qna");
});