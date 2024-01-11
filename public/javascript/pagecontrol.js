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
    location.assign("/scam");
});

$("#POCAWRITE").click(function(){
    location.assign("/pocawrite");
});

//index.ejs

$(".categoryNavlink").click(function(e){
    var pocaMiddle = e.target.dataset.id;
    window.location.assign('/poca/'+pocaMiddle);
});  //href일 경우 href="<%= `/poca/${category[i].middle}` %>"


//about.ejs

$(".navbar-brand-watermarke").click(function(){
    location.assign("/");
});

//edit.ejs

$("#cancel-btn").click(function(){
    location.rediret("/qna");
});

//index.ejs

$("#indexPocawrite").click(function(){
    window.location.href="/pocaWrite";
});

$("#imagesHeartpoca").click(function(){
    window.location.href="/qna";
});

$("#imagesAbout").click(function(){
    window.location.href="/about";
});

$("#indexBestpoca").click(function(){
    window.location.href="/best";
});

$("#indexNewpoca").click(function(){
    window.location.href="/new";
});

$("#indexBestLikepoca").click(function(){
    window.location.href="/bestLike";
});

//login
$("#sign_up").click(function(){
    window.location.href="/sign_up";
});


//mypage.ejs

$("#My").click(function(){
    window.location.href="/mypage/products";
});

$("#setting").click(function(){
    window.location.href="/mypage/profile";
});

// newmodule.ejs

$(".pocaImg").off('click').on('click',function(e){
    var pocaModule = e.target.dataset.id;
    window.location.assign('/pocadetail/'+pocaModule);
    console.log(pocaModule);
}); 
 //href일 경우 href="<%= `/pocadetail/${Module[i]._id}` %>"
 $(".hit").off('click').on('click',function(e){
    var pocaModuleName = e.target.dataset.id;
    window.location.assign('/pocadetail/'+pocaModuleName);
    console.log(pocaModule);
});  //href일 경우 href="<%= `/pocadetail/${Module[i]._id}` %>"

//poca.ejs

$(".categoryNavlink").click(function(e){
    var pocaMiddle = e.target.dataset.id;
    window.location.assign('/poca/'+pocaMiddle);
});  //href일 경우 href="<%= `/poca/${category[i].middle}` %>"

//qna.ejs

$(".ediy").click(function(e){
    var qnaEdiy = e.target.dataset.id;
    window.location.assign('/detail/'+qnaEdiy);
});

$(".page-link-num").click(function(e){
    var page = e.target.dataset.id;
    window.location.replace('/search?value='+입력한값)   // url을 바꿔주세요
    window.location.assign('/qna/'+page);
});

$("#qnaWrite").click(function(e){
    window.location.href="/write";
});

//search.ejs

$(".titledetail").click(function(e){
    var searchTitle = e.target.dataset.id;
    window.location.assign('/detail/'+searchTitle);
});

$("#searchWrite").click(function(e){
    window.location.assign("/write");
});

//write.ejs

$(".write-qna-btn").click(function(){
    window.location.href="/qna";
});

