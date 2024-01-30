$('#search').click(function(){
  var 입력한값 = $('#search-input').val()  //input 유저가 입력한 값
  window.location.replace('/search?value='+입력한값)   // url을 바꿔주세요
    
  })
  
  $(function(){
    const totalData = $('.page-link-num').data('id');   // 데이터 총 페이지
    const limit = 5;  // 한 페이지당 나타낼 데이터의 갯수
    const pageCount = 5; // 화면에 나타낼 페이지 갯수
    let currentPage = $('.pagination').data('id');  //현재페이지
    const totalPage = Math.ceil(totalData/limit); // 화면의 총 페이지 갯수   
    console.log("totalData: "+totalData+ " totalPage: "+totalPage );   

    
   pagenation();
   
   function pagenation(){
      var pageGroup = Math.ceil(currentPage/pageCount);// 현재 페이지 그룹 정하기
      var totalSecttion = Math.ceil(totalPage/pageCount);  // 총 구역 페이지
      var firstNumber = ((pageGroup-1)*pageCount)+1;  //첫번째 번호 
      var lastNumber = pageGroup*pageCount;// 마지막 번호  
      var end = totalPage;
      var pre = (firstNumber-1<1?1:firstNumber-1);
      var next= (pageGroup !== totalSecttion)?(lastNumber+1):lastNumber;
      console.log("totalSecttion: "+totalSecttion+" currentPage: "+currentPage +" pageGroup: "+ pageGroup+" firstNum: "+firstNumber+ " lastNum: "+lastNumber+" pre: "+pre);

        $(".page-link-num").append('<a class="page-link-pre" aria-label="Previous">&laquo;</a>');

    
      for(let i=firstNumber;i<=totalPage&&i<=lastNumber;i++){     // i는 총페이지갯수와 마지막 번호가 같을 때까지

        if(currentPage==i){
          $(".page-link-num").append('<a href="/qna?page='+i+'" class = "on" data-page='+i+'>'+i+'</a>');
            continue;
        }
        
        $(".page-link-num").append('<a href="/qna?page='+i+'"data-page='+i+'>'+i+'</a>');

      
      }

      $(".page-link-num").append('<a href="/qna/?page='+next+'"class="page-link-next" aria-label="Previous">&raquo;</a>');
 
      $(".page-link-pre").click(function(e){   //이전버튼 클릭
        
      if(pageGroup ==1 ){
        
        e.preventDefault();}
        else{
        window.location.replace('/qna/?page='+pre);}

            
    });

    $(".page-link-next").click(function(e){   //다음 버튼 클릭
  
      if(pageGroup == totalSecttion ){
        
        e.preventDefault();}
      
    });

      };



    
    
  });

    
    

