"use strict";


$('#search').click(function(){
    var 입력한값 = $('#search-input').val()  //input 유저가 입력한 값
    window.location.replace('/search?value='+입력한값)   // url을 바꿔주세요
    
  })


