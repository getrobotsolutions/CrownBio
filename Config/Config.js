//*******************************************************************************
//   FURO-D Config Contents Templage JS : 2014.12.04  by Lee Won Yong
//                           Ver : 2014.12.04
//   Comment : (1) 
//             (2)
//             (3)  
//*******************************************************************************

//-------------------------------------------------------------------------------
// 2014.10.31 : Contents 구조 정리 - 이원용 수석
//              (1) ** FC : Flash Call...   
//                  ** JC : JS Call...  
//-------------------------------------------------------------------------------

//Test Temp Code...

// [ Variables Setting ] --------------------------------------------------------
var VERSION = "20150213";


//-- Main Contents로 돌아감. 
function Home()
{
	location.href = "../maincotents.htm";
}
function GoHome()
{
	location.href = "../maincotents.htm";
}


// [ SetVolume ] ----------------------------------------------------------------
function SetVolume(fLevel)
{
	//0.0 ~ 1.0
	g_volume = fLevel;
	window.external.SetVolume(fLevel);
	Beep();
	writeCookie("SetVolume",fLevel*20,30);
}

// [ GetSystemVolume ] ----------------------------------------------------------
function GetSystemVolume()
{
	var vol = readCookie("SetVolume");
	App.GetVolume(vol);
}


// [ GetPassword ] --------------------------------------------------------------
function GetPassword()
{
	var strPassword;
	strPassword = window.external.GetPassword();
	App.GetPassword(strPassword);
}


function SetPassword(strPassword)
{
	window.external.SetPassword(strPassword);
}

//CJH Added.... contents, manager control

function ContentsClose()
{	
	window.external.ContentsClose();
}

function ManagerShow()
{
	window.external.ManagerState('true');
}

function ManagerHide()
{
	window.external.ManagerState('false');
}

