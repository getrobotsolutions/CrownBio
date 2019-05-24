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



var c_language="";
var isRobot = true;
function JSMain()
{
    // 언어 쿠키값 로드
    c_language = readCookie("Language");
    if (c_language == null)
        c_language = "en-us";
    
    // 언어에 따른 이미지 세팅
    SetImage(c_language);
    
    // FaceTracking Off & 실시간 카메라 영상 디스플레이
    if (isRobot) 
    {
        //window.external.StartFaceTracking(false);
        //window.external.InitPose();
        
        window.external.StartCamViewer();    
        refreshIntervalId = setInterval("UpdateCamImage()", 33);
    }
}
function GoHome()
{
    //if(flagPictureAvatar == "true")   DeleteRobotFace();  //사진 아바타 삭제
    location.href = "../../main.htm";
}
function JSUnload() 
{
    if (isRobot)
    {
        if (isRobot)
        {
            window.external.StopCamViewer();
        }
    }
}

//---------------------------------------------------------------------------//
//-- 언어에 따른 이미지 세팅 ---------------------------------------------------//
//---------------------------------------------------------------------------//
function SetImage(str)
{
    
}

//---------------------------------------------------------------------------//
//-- 실시간 카메라 영상 디스플레이 ----------------------------------------------//
//---------------------------------------------------------------------------//
function UpdateCamImage()
{
    var img = GetCaptureImage();
    var canvas = document.getElementById("camImage");
    var ctx = canvas.getContext("2d");
    var image = new Image();

    image.onload = function() 
    {
        ctx.drawImage(this, 0, 0, 910, 682);
    }
    image.src = "data:image/gif;base64," + img;
}

//---------------------------------------------------------------------------//
//-- 촬영 시작 버튼 -----------------------------------------------------------//
//---------------------------------------------------------------------------//
var isPhotoTaken = false;
function TakePhoto()
{  
    //PlaySpeech('Look at the camera on the top of the robots head');
    
    isPhotoTaken = false;
    
    // 촬영 버튼 이미지 변경 & 숨김
    document.getElementById("btn_start").src = "Images/start_btn_press_"+c_language+".png";
    document.getElementsByClassName("photo_start")[0].style.display = "none";
    
    // 카운트 다운 이미지 보이기 & 카운트다운
    document.getElementById("number_img").style.display = "block";
    CountDown();
}

//---------------------------------------------------------------------------//
//-- 촬영 카운트다운 ----------------------------------------------------------//
//---------------------------------------------------------------------------//
function CountDown()
{
    var counter = 3;
    var countDownInterval = setInterval(function()
    {
        counter--;
        
        // 카운트 끝
        if (counter == 0)
        {
            // 카운트 다운 인터벌 해제
            clearInterval(countDownInterval);
            countDownInterval = null;
            
            // 카운트 다운 이미지 숨김 & 초기화
            document.getElementById("number_img").style.display = "none";
            document.getElementById("number_img").src = "Images/3.png";
            
            // 카메라 영상 정지 & 액자 선택 안내 스피치            
            if (isRobot)
            {
                clearInterval(refreshIntervalId);
                srefreshIntervalId = null;
                
                window.external.PauseCamViewer();
                window.external.PlaySpeech(speechJsonObj["frame"][c_language]);
            }
            
            isPhotoTaken = true;
        }
        
        // 카운트 다운
        else
        {
            document.getElementById("number_img").src = "Images/"+counter+".png";
        }
    }, 1000);
}

//---------------------------------------------------------------------------//
//-- 액자 선택 ---------------------------------------------------------------//
//---------------------------------------------------------------------------//
var frameImagePath = "";
function SelectFrame(num)
{
    // 액자 없음
    if (num == 1)
    {
        document.getElementById("frame").src = "";
        frameImagePath = "";
    }
    
    // 액자 있음
    else
    {
        document.getElementById("frame").src = "Images/frame0"+num+".png";
        frameImagePath = GetCurrentFolderPath() + "Images/Picture"+num+".png";

    }    
}

//---------------------------------------------------------------------------//
//-- 이메일 보내기 ------------------------------------------------------------//
//---------------------------------------------------------------------------//
/* 키보드 보이기 */
function ShowKeyboard()
{
    // 사진이 촬영되기 전에 클릭시 무시
    if (isPhotoTaken == false)
        return;
    
    // 키보드 보이기
    document.getElementById("keyboard").style.display = "block";
    
    // 메일 전송 안내 스피치
    if (isRobot)
    {
        //window.external.PlaySpeech(speechJsonObj["email"][c_language]);
    }
}

/* 키보드 숨김 */
function HideKeyboard()
{
    // 키보드 숨김
    document.getElementById("keyboard").style.display = "none";
    
    // 메일 주소 초기화
    message = "";
    document.getElementById("address").innerHTML = message;
}

/* 메일 주소 입력 */
var message = "";
function keyboard(strPara)
{
    if (strPara == "bs")
    {
        message = message.slice(0, -1);
    }
    
    else
    {
        message += strPara;
    }

    document.getElementById("address").innerHTML = message;
}

/* 전송 */
function SendEmail()
{
    // 메일 주소가 공백일 경우 무시
    if (message == "")
        return;
    
    // 메일 전송 상태 창 보이기
    document.getElementById("email_state").src = "Images/email_sending_"+c_language+".png";
    document.getElementsByClassName("email_state")[0].style.display = "block";    
    
    // 메일 전송에 필요한 정보
    var addr = message;
    var tempEmail=message;
    //var addr = "paul@robotaisolutions.com";
    var subject = "Your robot selfie";
    var body = "Thank you for visiting Blase Manufacturing! Your robot selfie is attached.";
    //var mail_server = "smtp.gmail.com";
    //var mail_addr_sender = "ict.muscatairport@gmail.com";
    //var pswd = "123456789K";
    //var port = 587;
    //var ssl = "true";
    var mail_server = "mail.getrobotsolutions.com";
    var mail_addr_sender = "selfie@getrobotsolutions.com";
    var pswd = "R0b0ts60";
    var port = 587;
    var ssl = "false";
    
    // 이미지 파일명 지정 및 저장
    var d = new Date();
    var fileName = addr+d.getTime(); 
    
    SaveImage(fileName);
    
    // 메일로 전송
    if (isRobot)
    {
        window.external.SendEmail(addr, imageFilePath, subject, body, mail_server, mail_addr_sender, pswd, port, ssl);
    }

    var canvas = document.getElementById('camImage');
    var dataURL = canvas.toDataURL();
      $.ajax({
        type: "POST",
        url: "http://robotaisolutions.com/robot-work/selfie-emails.php",
        data: { 
          
           'email':tempEmail,
           'apID':'Passco'
        }
      }).done(function(response) {
        console.log('saved: ' + response); 
      });
    
   

    
    // 키보드 숨김
    HideKeyboard();
            document.getElementById("email_state").src = "Images/email_success_"+c_language+".png";
}

/* 이미지 파일 저장 */
var imageFilePath;
function SaveImage(str)
{   
    var curPath = GetCurrentFolderPath();
    var directory = curPath + "/../Resources/Photo/";
    
    imageFilePath = directory + str + ".jpg";
    if (isRobot)
    {
        window.external.SaveImage(imageFilePath, frameImagePath);
    }
}

/* 현재 폴더 절대 경로 받아오기 */
function GetCurrentFolderPath()
{
    var path = window.location.pathname;
    
    path = path.substring(1,path.lastIndexOf("/")+1);
    
    return path;
}

/* 전송 결과 */
function OnSendEmailResult(str)
{    
    // 다시 촬영하기를 누른 후 결과가 도착 했을시 무시
    if (isPhotoTaken == false)
        return;
    
    if(str == "True")
    {
        document.getElementById("email_state").src = "Images/email_success_"+c_language+".png";
        
        // 메일 전송 성공 스피치
        //window.external.PlaySpeech(speechJsonObj["email_success"][c_language]);
    }
    else
    {
        document.getElementById("email_state").src = "Images/email_fail_"+c_language+".png";
        
        // 메일 전송 실패 스피치
        //window.external.PlaySpeech(speechJsonObj["email_fail"][c_language]);
    }
}

//---------------------------------------------------------------------------//
//-- 프린트하기 ---------------------------------------------------------------//
//---------------------------------------------------------------------------//
var printCompleteTimeout = null;
function PrintPhoto()
{
    // 사진이 촬영되기 전에 클릭시 무시
    if (isPhotoTaken == false)
        return;
    
    document.getElementById("email_state").src = "Images/printing_"+c_language+".png";
    document.getElementsByClassName("email_state")[0].style.display = "block";
    printCompleteTimeout = setTimeout(PrintCompleted, 5000);
    
    // 이미지 파일명 지정 및 저장
    var d = new Date();
    var fileName = d.getTime(); 
    SaveImage(fileName);
    if (isRobot)
        window.external.PrintImage(imageFilePath, "cp900", 1);
}

function PrintCompleted()
{
    document.getElementById("email_state").src = "Images/printing_success_"+c_language+".png";
}

//---------------------------------------------------------------------------//
//-- 다시 촬영하기 ------------------------------------------------------------//
//---------------------------------------------------------------------------//
function Retake()
{
    // 사진이 촬영되기 전에 클릭시 무시
    if (isPhotoTaken == false)
        return;
    
    clearTimeout(printCompleteTimeout);
    printCompleteTimeout = null;
    
    // 촬영 버튼 이미지 변경 & 보이기
    document.getElementById("btn_start").src = "Images/start_btn_nor_"+c_language+".png";
    document.getElementsByClassName("photo_start")[0].style.display = "block";
    
    // 카운트 다운 이미지 숨김
    document.getElementById("number_img").style.display = "none";
    
    // 메일 전송 상태 창 숨김 & 초기화
    document.getElementsByClassName("email_state")[0].style.display = "none";
    document.getElementById("email_state").src = "Images/email_sending_"+c_language+".png";
    
    // 액자 초기화
    SelectFrame(1);
    
    // 실시간 카메라 영상 디스플레이
    if (isRobot) 
    {
        window.external.StartCamViewer();    
        refreshIntervalId = setInterval("UpdateCamImage()", 33);
    }
    
    isPhotoTaken = false;
}