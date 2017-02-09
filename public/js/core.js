// disable drag and drop
// todo improve the drap and drop
document.body.addEventListener('drop', function(e) {
    e.preventDefault();
}, false);
 $('img').attr("draggable", "false"); 

// disable drag and drop 

// loading screen
$(window).load(function(){
    setTimeout(function(){
        $('.loading').fadeOut('slow');
    },2000);
    
});

$(window).ready(function(){
    $('.full_center').delay(2000).animate({
        height:"toggle"
    },300);
});
// loading screen

// shuffle background

var bgImg = {
    b1 : "game_of_thrones",
    b2 : "flash",
    b3 : "marvel"
}
var shuffleBg = [bgImg.b1, bgImg.b2, bgImg.b3];
var shuffleImg = Math.floor(Math.random() * shuffleBg.length);
$(".bgImg").css("background-image", "url('img/"+shuffleBg[shuffleImg]+".jpg')");

// shuffle background ends

var back;
$('#startupReg').click(function(){
    $('.login').animate({
        height:"toggle"
    },300);
    $('.reg').delay(300).animate({
        height: "toggle"
    },300);
   $('.back').css("display", "inline");
    back = 1;
});

$('#forget').click(function(){
    $('.login').animate({
        height:"toggle"
    },300);
    $('.forget').delay(300).animate({
        height:"toggle"
    },300);
   $('.back').css("display", "inline");
    back = 2;
});

$('#back').click(function(){
    if (back == 1){
      $('.reg').animate({
        height: "toggle"
    },300);
}else{
      $('.forget').animate({
        height:"toggle"
    },300)
}
    $('.login').delay(300).animate({
        height:"toggle"
    },300);
    $('.back').css("display", "none");
});

// startup page ends here .....................................................................