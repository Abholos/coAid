//JavaScript goes here
//Panos
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})


$(window).load(function () {
  var boxheight = $('#myCarousel .carousel-inner').innerHeight();
  var itemlength = $('#myCarousel .item').length;
  var triggerheight = Math.round(boxheight / itemlength + 1);
  $('#myCarousel .list-group-item').outerHeight(triggerheight);
});

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

var newDate = new Date();
newDate.setDate(newDate.getDate() + 1);
$('#Date').html(dayNames[newDate.getDay()] + ", " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
//Panos END

//Maria start
//Carousel slide
$(document).ready(function () {
  $("#carouselDonate").carousel({ interval: 1000 });
  $("#carousel-pause").click(function () {
    $("#carouselDonate").carousel('pause');
  });
  $("#carousel-play").click(function () {
    $("#carouselDonate").carousel('cycle');
  });
});
//Maria END
