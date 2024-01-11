"use strict";


var Username = $('#Username').val();
    console.log(Username);
var myname = $('#commentwriter').val();
    console.log(myname);
  if(Username===myname){
    $('#delete').show();
    $('#update').show();
  }
  else{
    $('#delete').hide();
    $('#update').hide();

  }
 
  
  
  $('#update').click(function(e){
    alert("수정하기페이지입니다.");
    var id = e.target.dataset.id;
    console.log(id);
      window.location.assign('/write/'+id);
      //AJAX 성공시 실행할 코드적기
    });   


  $('#delete').click(function(e){
        var id = e.target.dataset.id;
        console.log(id);
 
        $.ajax({
      method : 'post',
      url : '/detail/delete',
      data : { _id : id }
    }).then((result)=>{
      alert("삭제되었습니다.");
      location.assign("/qna");
      //AJAX 성공시 실행할 코드적기
    }).fail((error)=>{
      alert("삭제 실패했습니다 다시 도전해주시길 바랍니다.");
      //AJAX 실패시 실행할 코드적기
    });   
 })