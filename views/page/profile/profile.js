"use strict";


$('#delete').click(function(e){
    var Data = e.target.dataset.id;
    if(Data){
      alert("정말 탈퇴하시겠습니까?");
    }
    
    $.ajax({
      method:'DELETE',
      url:'./profile/delete',
      data:{_id:Data}

    }).done((result)=>{
      alert('탈퇴되었습니다.');
      window.location='/';
    
  }).fail((xhr,code,err)=>{
    console.log(err);
    //AJAX 실패시 실행할 코드적기
  });
});