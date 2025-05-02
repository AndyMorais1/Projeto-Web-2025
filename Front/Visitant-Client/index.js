var i = 0;
var images = [
  "./assets/images/image1.jpeg","./assets/images/image3.jpg"
];

//changes the main image every 4s
function changeImage() {
  document.querySelector(".main-image").setAttribute("src", images[i]);

  i = (i + 1) % images.length; // Loops back to 0 when reaching the end

  setTimeout(changeImage, 4000); // Changes every 3 seconds
}

//hide and shows the menu 
$("#button").on("click", function (e){
  e.stopPropagation(); 
  $("#menu").toggleClass("hidden");
})

$("body").on("click", function () {
  $("#menu").addClass("hidden");
})

//hide and shows the menu others screens
$("#button2").on("click", function (e){
  e.stopPropagation();
  $("#menu2").toggleClass("hidden flex")
})

$("body").on("click", function () {
  $("#menu2").addClass("hidden");
})

//closes menu on scroll
function closeMenuScroll ( ){

  var screenPosition = window.pageYOffset;
  window.onscroll = function (){
    var currentPosition = window.pageYOffset;
    if ( currentPosition > screenPosition){
      $("#menu").addClass("hidden");
      $("#menu2").addClass("hidden");
    }

}

function pageChange (){
  var currentPath = window.location.pathname;
  var basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

  $(".houses").on("click", function (){
    window.location.href = basePath + "homedetails.html";
  })
}

}
pageChange ();
changeImage();
closeMenuScroll();

