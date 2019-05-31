
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
        sendEmail(convertCanvasToImage(canvas));

    }
});

document.getElementById("btn_retake").addEventListener("click", function() {
    if(isPhoto === true)
    {
        video.style.display = "block";
        video.style.marginLeft = "85px";
        canvas.style.display = "none";
        document.getElementById("photo_button").style.display = "block";
        document.getElementById("counter").style.display = "block";

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




function sendEmail(img_data) {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "manage.ars1@gmail.com",
        Password : "3a7e231a-a9d5-4b32-b746-ea0be2c3de29",
        To : 'bpritesh1@gmail.com',
        From : "manage.ars1@gmail.com",
        Subject : "This is the subject",
        Body : "Hi for the email to go along with the picture can we put this: Thank you for visiting CrownBio at ASCO. Please find attached your picture, you can share with others using #CrownBioBot\n" +
            "\n" +
            "Find out more at https://www.crownbio.com/resources",
        Attachments : [
            {
                name : "Take-a-Selfie.png",
                //path : "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
                data :  img_data
            }]
    }).then(
        message => alert(message)
    );
}

