
var isPhoto = false;

// Grab elements, create settings, etc.
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var wrapper = document.getElementById('wrapper');
var context = canvas.getContext('2d');
canvas.style.display = "none";

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}


// Trigger photo take
document.getElementById("photo_button").addEventListener("click", function() {
    document.getElementById("photo_button").style.display = "none";
    countDown();
});

document.getElementById("btn_send_email").addEventListener("click", function() {
    if(isPhoto === true)
    {
        ShowKeyboard();
        //sendEmail(convertCanvasToImage(canvas));

    }
});

document.getElementById("btn_retake").addEventListener("click", function() {
    if(isPhoto === true)
    {/*
        video.style.display = "block";
        video.style.marginLeft = "85px";
        canvas.style.display = "none";
        document.getElementById("photo_button").style.display = "block";
        document.getElementById("counter").style.display = "block";
*/
        location.reload();
    }
});

function convertCanvasToImage(canvas) {
    //var image = new Image();
    //image.src = canvas.toDataURL("image/png");
    return canvas.toDataURL("image/png");
}

function photoCapture() {
    video.style.display = "none";
    canvas.style.display = "block";
    context.drawImage(video, 0, 0, 910, 682);
    html2canvas(wrapper).then(function(canvas1) {
        //document.body.appendChild(canvas1);
        context.drawImage(canvas1, 0, 0, 910, 682);

    });


    isPhoto = true;
}

function setFrame(frame_name) {
    document.getElementById("frame").style.background = "url(\"Frames/" +frame_name +".png\")";
}

function countDown()
{
    var counter = 3;
    var countDownInterval = setInterval(function()
    {

        if (counter === 0)
        {
            clearInterval(countDownInterval);
            countDownInterval = null;

            document.getElementById("counter").style.display = "none";
            //document.getElementById("number_img").src = "Images/3.png";
            photoCapture();
        }
        else
        {
            document.getElementById("counter").src = "assets/"+counter+".png";
        }
        counter--;
    }, 1000);
}



var email_status;
function sendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "manage.ars1@gmail.com",
        Password : "3a7e231a-a9d5-4b32-b746-ea0be2c3de29",
        To : getMessage(),
        From : "manage.ars1@gmail.com",
        Subject : "Here’s your CrownBio Robot Selfie",
        Body : "Thank you for visiting CrownBio at ASCO. Please find attached your picture, you can share with others using #CrownBioBot\n" +
            "\n" +
            "Find out more at https://www.crownbio.com/resources",
        Attachments : [
            {
                name : "Take-a-Selfie.png",
                //path : "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
                data :  convertCanvasToImage(canvas)
            }]
    }).then(
        email_status => verify_email(email_status)
        );
}

function verify_email(msg) {
    HideKeyboard();
    document.getElementById("photo_button").style.display = "block";
    console.log(msg);
    if(msg === "OK")
    {
        document.getElementById("photo_button").style.background = "url(\"assets/email_success_en-us.png\")";
    }
    else
    {
        document.getElementById("photo_button").style.background = "url(\"assets/email_fail_en-us.png\")";
    }
}


function ShowKeyboard()
{
    document.getElementById("keyboard").style.display = "block";
    document.getElementById("address").innerHTML = "Please Enter your Email Address";
}


function HideKeyboard()
{
    document.getElementById("keyboard").style.display = "none";

    message = "";
    document.getElementById("address").innerHTML = message;
}


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

function getMessage() {
    return message;
}