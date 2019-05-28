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