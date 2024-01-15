"use strict";


$('#search').click(function(){
    var 입력한값 = $('#search-input').val()  //input 유저가 입력한 값
    window.location.replace('/search?value='+입력한값)   // url을 바꿔주세요
    
  })


    $(function(){

  
    const totalPage = $('.page-link-num').data('id');   // 데이터 총 페이지
    const limit = 5;  // 한 페이지당 나타낼 데이터의 갯수
    const pageCount = 5; // 화면에 나타낼 페이지 갯수
    var currentPage=1; // 현재 페이지
    const total = Math.ceil(totalPage/limit); // 총 페이지 갯수
    const pageGroup = Math.ceil(currentPage/pageCount);  // 현재 페이지 그룹 정하기
      pagenation();
      function pagenation(){
      for(i=1; i<=total;i++){
      
        
        console.log(arr[i] + "i");
      };

    
  
    console.log(total + "   total");
    console.log(totalPage+"  totalPage");
    console.log(currentPage+"  currentPage");
    console.log(pageGroup+"  pageGroup");
  
      };
    
    
  });



  
  
  

  
  
  
