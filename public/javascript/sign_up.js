"use strict";
function check(){
    var repw = $("input[name=repw]").val();
    var pw = $("input[name=pw]").val();
    var Email = $("input[name=Email]").val();
    var id = $("input[name=id]").val();
    var Id=/^[a-zA-z0-9]{4,12}$/
    var email = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if(!Id.test(id)){
      alert("아이디는 영문 대소문자 4~12자리로 입력하세요");
      return false;

    }
    if(!email.test(Email)){
      alert("이메일 양식이 틀렸습니다 다시 입력해주세요.");
      return false;
    }
    if(repw!==pw){
      alert("비밀번호를 다시 입력해주세요.");
      return false;
    }  
       
   }

