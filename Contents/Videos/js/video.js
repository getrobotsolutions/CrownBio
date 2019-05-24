//-----------------------------------------------------
//Redirects to homepage after 1 minute of not interaction
//-----------------------------------------------------

function redirect(){
    //window.location.href = "../../maincontents.htm";
}
var initial=setTimeout(redirect,60000);

$(document).click(function(event) {
    clearTimeout( initial );
    initial=setTimeout(redirect,60000);
});
//-----------------------------------------------------




$(document).ready(function(){

   $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {  
      var video = document.getElementById("myVideo");  
      video.pause(); 
      $('#dialog-overlay1, #dialog-box1').hide();   
      return false;
    });
});
function vidplay() {
       var video = document.getElementById("myVideo");
       var button = document.getElementById("playPause");
       if (video.paused) {
          video.play();
          //button.textContent = "||";
          button.src="images/pause.png";
       } else {
          video.pause();
          //button.textContent = ">";
          button.src="images/play.png";
       }
    }

function ShowPopup(src){

// get the screen height and width  
  var maskHeight = $(document).height();  
  var maskWidth = $(window).width();
  
  // calculate the values for center alignment
  var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());  
  var dialogLeft = (maskWidth/2) - ($('#dialog-box1').width()/2); 
  
  // assign values to the overlay and dialog box
  $('#dialog-overlay1').css({height:maskHeight, width:maskWidth}).show();
  $('#dialog-box1').css({top:dialogTop, left:dialogLeft}).show();
  $('#playPause').attr('src','images/play.png');
  document.getElementById('myVideo').setAttribute('src', src);
    
    //document.getElementById('dialog-content1').innerHTML = '';
  
  }
function ShowPdfPopup(src){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '20%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><span style="z-index: 2147483647;width:50px;height:50px;position:absolute;top:95px;right:30px;"></span><iframe src="'+src+'" toolbar="0" width="100%" height="1625" ></iframe></a>';
}