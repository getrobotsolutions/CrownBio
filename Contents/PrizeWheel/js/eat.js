//-----------------------------------------------------
//Redirects to homepage after 1 minute of not interaction
//-----------------------------------------------------

/*function redirect(){
    window.location.href = "../../maincontents.htm";
}
var initial=setTimeout(redirect,60000);

$(document).click(function(event) {
    clearTimeout( initial );
    initial=setTimeout(redirect,60000);
});*/
//-----------------------------------------------------


function LanguageChange(lang)
{
    if(lang === "english")
    {
        eraseCookie("Spanish");
        writeCookie("CurrentLanguage", "English", 30);
        document.getElementById("btn_english").style.backgroundColor = "white";
        document.getElementById("btn_english").style.color = "#FF6600";
        document.getElementById("btn_spanish").style.backgroundColor = "#FF6600";
        document.getElementById("btn_spanish").style.color = "white";
    }
    else if (lang === "spanish")
    {
        eraseCookie("English");
        writeCookie("CurrentLanguage", "Spanish", 30);
        document.getElementById("btn_english").style.backgroundColor = "#FF6600";
        document.getElementById("btn_english").style.color = "white";
        document.getElementById("btn_spanish").style.backgroundColor = "white";
        document.getElementById("btn_spanish").style.color = "#FF6600";
    }
location.reload();
}






$(document).ready(function(){

   $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {   
      $('#dialog-overlay, #dialog-box').hide();   
      return false;
    });

  $("#btn").click(function () {
    ShowPopup($("#btn").attr('dir'));

    //$("$list1").show();

  });
  $("#mapBtn").click(function () {
    ShowPopup($("#mapBtn").attr('dir'));

    //$("$list1").show();

  });

});


function ShowPopup(src){

// get the screen height and width  
  var maskHeight = $(document).height();  
  var maskWidth = $(window).width();
  
  // calculate the values for center alignment
var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());  
var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2); 
  
  // assign values to the overlay and dialog box
  $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
  $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();
  
  if (src=="") {
    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="images/offers/404.png"/></div></div>';
  }
  else{
    if(readCookie("CurrentLanguage") === "English")
      PlaySpeech("Please take a picture with your phone and show Merchant for your special offer.");
    else if(readCookie("CurrentLanguage") === "Spanish")
      PlaySpeech("Por favor, tome una foto con su teléfono y muestre al comerciante su oferta especial.");
  
  document.getElementById('dialog-box').innerHTML = '<p style="width:  70%;display:  block;float:  left;font-size: 29px;padding: 20px;">Take Picture and Show merchant</p><a href="#" class="button" style="float: left;position:  relative;top: 20px;">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="'+ src +'"/></div></div>';
  //$("#dialog-box").append('<div class="dialog-content"><div id="dialog-message">'+ message +'</div><a href="#" class="button">Close</a></div>');
    }
}

function ShowPopupARS(src){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="'+ src +'"/></div></div>';
}