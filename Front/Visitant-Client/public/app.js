$("#button2").on("click", function (e){
  e.stopPropagation();
  $("#menu2").toggleClass("hidden flex")
})

$("body").on("click", function () {
  $("#menu2").addClass("hidden");
})

function pageChange (){
  var currentPath = window.location.pathname;
  var basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

  $(".houses").on("click", function (){
    window.location.href = basePath + "homedetails.html";
  })
}


function closeMenuScroll ( ){

  var screenPosition = window.pageYOffset;
  window.onscroll = function (){
    var currentPosition = window.pageYOffset;
    if ( currentPosition - 250> screenPosition){
      $("#menu2").addClass("hidden");
    }
  }

}

function imageSlide (){
  if (count > 5) count = 2;
  $(".next").on("click", ()=>{
    var count = 2;
    count++;
    var images = `../assets/images/image${count}.jpg`;
    $(".main").attr("src", images)
  })
}

function heartColor (){
  $("#heart").on("click", function (){
    
  })
}

pageChange();
imageSlide();
closeMenuScroll();