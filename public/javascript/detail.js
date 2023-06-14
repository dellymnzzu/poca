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
    var _id = e.target.dataset.id;
  
  window.location.replace('/detail/update/'+_id);   // url을 바꿔주세요
  
})
    

          
         
    
    

  
  
  $('#delete').click(function(e){
        var _id = e.target.dataset.id;
        console.log(_id);
       
          
         
        $.ajax({
      method : 'post',
      url : '/detail/delete',
      data : { _id : _id }
    }).then((result)=>{
      alert("삭제 성공!");
      window.location.href ='/qna'
      //AJAX 성공시 실행할 코드적기
    }).fail((xhr,code,err)=>{
      alert("삭제 실패했습니다 다시 도전해주시길 바랍니다.");
      //AJAX 실패시 실행할 코드적기
    });   
 })