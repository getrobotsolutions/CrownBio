//---------------------------------------------------------------------------//
//-- Robot Switch Variable --------------------------------------------------//
//---------------------------------------------------------------------------//
var isRobot = true;

//---------------------------------------------------------------------------//
//-- Language Variable ------------------------------------------------------//
//---------------------------------------------------------------------------//
var c_language = "en-us";

//---------------------------------------------------------------------------//
//-- Photo Printing ---------------------------------------------------------//
//---------------------------------------------------------------------------//
var usePrinter = true;	// true: 프린터 기능 사용

//---------------------------------------------------------------------------//
//-- Disable Double Click ---------------------------------------------------//
//---------------------------------------------------------------------------//
$(document).ready(function() {	
	$("*").dblclick(function(e){
		e.preventDefault();
	 });
});

//---------------------------------------------------------------------------//
//-- 다른 페이지에서 변수 값 받아오기 --------------------------------------------//
//---------------------------------------------------------------------------//
function GetHrefVar()
{
	return location.href.split('?')[1];
}

//---------------------------------------------------------------------------//
//-- 현재 컨텐츠 이름 받아오기 --------------------------------------------------//
//---------------------------------------------------------------------------//
function GetCurrentPageName()
{
    var addressArr = location.href.split('/');
	return addressArr[addressArr.length - 2];
}

//---------------------------------------------------------------------------//
//-- 메인으로 이동 ------------------------------------------------------------//
//---------------------------------------------------------------------------//
function Home(str)
{
	location.href = "../../maincontents.htm";
}

//---------------------------------------------------------------------------//
//-- 아이들 페이지로 이동 ------------------------------------------------------//
//---------------------------------------------------------------------------//
function goIdle(str)
{
	location.href = "../MainRolling/index.html?"+str;
}


/******************************* 마포구청 *************************************/
//---------------------------------------------------------------------------//
//-- 대화하기 팝업 창 ---------------------------------------------------------//
//---------------------------------------------------------------------------//
var sourceLanguage = null;
var targetLanguage = null;
var checkInputTimeout = null;
/* 대화하기 시작 */
function OpenPopup(str)
{
    // 질문란 초기화
    document.getElementsByClassName("pop_txt")[0].innerText = "";
    
    // 팝업 창 디스플레이
    document.getElementById("over").style.display = "block";
    
    // 마이크 깜빡임 효과 On
    
    
    // 음성인식 모드 설정
    sourceLanguage = str;
    if (str == "ko-kr")
        targetLanguage = "en-us";
    else
        targetLanguage = "ko-kr";
    
    // 음성인식 On
    if (isRobot)
    {
        window.external.StopSpeech();
        window.external.SetRecogModule("google", "STT");
        window.external.TranslateOnOff(true, sourceLanguage, targetLanguage);        
    }
    
    // 10초간 음성입력 없을 시
    checkInputTimeout = setTimeout(
        function()
        { 
            if (document.getElementsByClassName("pop_txt")[0].innerText == "")
            {
                ClosePopup();
            }
            else return;
        }, 10000);
    
    // 로봇댄스에서 마이크버튼을 클릭했을때
    if (GetCurrentPageName() == "RobotDance")
    {
        stop();
    }
    else
    {
        if (isRobot)
        {
            PauseAdMovie();  
        }
    }
}

function ClosePopup()
{
    // 질문 & 답변 란 초기화
    document.getElementsByClassName("pop_txt")[0].innerText = "";
    
    // 팝업 창 숨김
    document.getElementById("over").style.display = "none";
    
    // 마이크 깜빡임 효과 Off
    
    // 음성입력 체크 타이머 해제
    clearTimeout(checkInputTimeout);
    checkInputTimeout = null;
    
    // 음성인식 Off
    if (isRobot)
    {
        window.external.TranslateOnOff(false, sourceLanguage, targetLanguage);        
    }
    
    // 메인 페이지에서 팝업창을 닫을때
    if (GetCurrentPageName() == "Main")
    {
        if (isRobot)
        {
            ResumeAdMovie();            
        }
    }
}

//---------------------------------------------------------------------------//
//-- 음성인식 결과 처리 --------------------------------------------------------//
//---------------------------------------------------------------------------//
/* 인식 결과 디스플레이 */
function OnSTTResult(str)
{    
    document.getElementsByClassName("pop_txt")[0].innerText = str;
}

/* 음성 명령 */
function OnVRCommand(str)
{
    writeCookie("receivedAction", str, 1);
    
    // 날짜 & 시간 & 날씨 답변하기
    switch(str)
    {
        case "info_time":
            if (isRobot)
                window.external.PlaySpeech("지금은 "+GetTimeInfo()+"입니다.");
            break;
        case "info_date":
            if (isRobot)
                window.external.PlaySpeech("오늘은 "+GetDateInfo()+"입니다.");
            break;
        case "info_weather":
            if (isRobot)
            {
                var weatherInfo = window.external.GetWeatherInfo("","1159068000");
                var temp = weatherInfo.split('/')[0];
                var wfkor = weatherInfo.split('/')[1];
				if (temp == "" || wfkor == "")
				{
					window.external.PlaySpeech("날씨 정보를 확인할 수 없습니다. 잠시 후에 다시 이용해 주세요.");  
				}
				else
					window.external.PlaySpeech("마포구 현재 날씨를 알려 드릴게요. 기온은 "+temp+"도 이며, 하늘 상태는 "+wfkor+"입니다.");                
            }
            break;
        
    }
    
    // 페이지 이동이 필요한 음성명령일때
    var screenString = ScreenInfo(str);
    if (screenString != "")
    {
        location.href = "../" + screenString + "/Index.htm";
    }
}

/* 응답 스피치 */
function OnVRReply(str)
{
    if (str != "")
    {
        // 팝업 창 닫기
        ClosePopup();

        if (isRobot)
        {
            window.external.PlaySpeech(str);
        }
    }
}

/* 날짜 정보 */
function GetDateInfo()
{
    var fullInfo = new Date();
    var year = fullInfo.getFullYear();
    var month = fullInfo.getMonth() + 1;
    var date = fullInfo.getDate();
    
    return year + "년" + month + "월" + date + "일";
}

/* 시간 정보 */
function GetTimeInfo()
{
    var fullInfo = new Date();
    var ampm = "오후";
    var hour = fullInfo.getHours();
    var minute = fullInfo.getMinutes();
    
    if (hour < 12)
        ampm = "오전";
    else if (hour > 12)
        hour = hour - 12;
    
    return ampm + hour + "시" + minute + "분";
}

/* Screen 정보 추출 */
function ScreenInfo(str)
{
    var screenString = "";
    
    switch (str)
    {
        case "info_membership_apply":
        case "info_membership_reapply":
        case "info_book_account_apply":
        case "info_print":
        case "info_copy":
        case "facility_restroom":
        case "facility_cvs":
        case "facility_café":
        case "facility_korean_restaurant":
        case "facility_snackbar":
        case "facility_stationary_store":
        case "facility_gym":
        case "facility_chinese_restaurant":
        case "facility_icecream_store":
        case "facility_japanese_restaurant":
        case "facility_bakery":
        case "facility_kidscafe":
        case "facility_bookcafe":
        case "facility_lunchroom":
        case "s_library_info":
        case "s_library_info_status":
        case "s_library_info_floor_plans":
        case "s_library_info_holiday_guide":
        case "s_facility_reading_disabled_seats":
        case "s_facility_reading_opac_pcs":
        case "s_facility_reading_self-circulation_machines":
        case "s_facility_librarians_room":
        /*case "s_facility_preservation_room":
        case "s_facility_electric_room":
        case "s_facility_machine_room":
        case "s_facility_fire_extinguishing_agent":
        case "s_facility_mainternance":*/
        case "s_facility_restaurant":
        case "s_facility_childrens_reading_room":
        case "s_facility_child_foreign_language_materials":
        case "s_facility_child_opac_pcs":
        case "s_facility_child_self-circulation_machines":
        case "s_facility_faculty_room":
        case "s_facility_program_room":
        case "s_facility_storytelling_room":
        case "s_facility_toddler_reading_room":
        case "s_facility_feeding_room":
        case "s_facility_self-circulation_machines":
        case "s_facility_reading_room_1":
        case "s_facility_reading1_disabled_seats":
        case "s_facility_reading1_opac_pcs":
        case "s_facility_reading1_self-circulation_machines":
        case "s_facility_reading_digital_multimedia_resources":
        case "s_facility_digital_music_materials":
        case "s_facility_digital_audio_video_materials":
        case "s_facility_digital_computer_room":
        case "s_facility_digital_serials_newspapers":
        case "s_facility_processing_room":
        case "s_facility_volunteers_room":
        case "s_facility_reading_room_2":
        case "s_facility_reading2_young_adult_materials":
        case "s_facility_reading2_foreign_language_materials":
        case "s_facility_reading2_disabled_seats":
        case "s_facility_reading2_opac_pcs":
        case "s_facility_reading2_self-circulation_machines":
        case "s_facility_meeting_room":
        case "s_facility_lecture_room":
        case "s_facility_baby_care_room":
        case "s_facility_directors_office":
        case "s_facility_office":
        case "s_facility_foundation":
        case "s_facility_writing_room":
        case "s_facility_youth_Education_center_office":
        case "s_facility_meeting_room":
        case "s_facility_mapo_career_development_center":
        case "s_facility_creative_room":
        case "s_facility_software_room":
        case "s_facility_animation_room":
        case "s_facility_art_room":
        case "s_facility_craft_room":
        case "s_facility_music_Practice_room":
        case "s_facility_cartoon_room":
        case "s_facility_multipurpose_room":
        case "s_facility_Instructors_room":
        case "s_facility_piano_room":
        case "s_facility_instrument_room":
        case "s_facility_acting_room":
        case "s_facility_dancing_room":
        case "s_facility_practice_room":
        case "s_facility_auditorium":
        case "s_facility_conference_room":        
            screenString = "LibraryInfo";
            break;
        case "s_management_policy":
        case "s_management_policy_reading_room":
        case "s_management_policy_sharing_area":
        case "s_management_policy_creating_area":
        case "s_management_policy_convenient_facilities ":
            screenString = "LibraryManage";
            break;
        case "s_youth_education_center_office":
        case "s_youth_education_center_speciality":
        case "s_youth_education_center_english_learning":
        case "s_youth_education_center_self_directed_learning":
            screenString = "YouthEdu";
            break;
        case "s_facility_etc":
        case "s_facility_etc_it_info_center":
        case "s_facility_etc_currency_museum":
        case "s_facility_etc_gallery":
            screenString = "EtcFacility";
            break;
        case "s_info_history_culture":
        case "s_info_history_tour":
        case "s_info_history_tour_1":
        case "s_info_history_tour_2":
        case "s_info_history_tour_3":
        case "s_info_history_tour_4":
        case "s_info_history_tour_5":
        case "s_info_history_tour_6":
        case "s_info_history_tour_7":
        case "s_info_history_tour_8":
        case "s_info_history_tour_9":
        case "s_info_natural_tour":
        case "s_info_natural_tour_1":
        case "s_info_natural_tour_2":
        case "s_info_natural_tour_3":
        case "s_info_natural_tour_4":
        case "s_info_natural_tour_5":
        case "s_info_natural_tour_6":
        case "s_info_natural_tour_7":
        case "s_info_natural_tour_8":
        case "s_info_natural_tour_9":
        case "s_info_culture_event":
        case "s_info_culture_tour_1":
        case "s_info_culture_tour_2":
        case "s_info_culture_tour_3":
        case "s_info_culture_tour_4":
        case "s_info_culture_tour_5":
        case "s_info_culture_tour_6":
        case "s_info_culture_tour_7":
        case "s_info_culture_tour_8":
        case "s_info_culture_tour_9":
            screenString = "History";
            break;
        case "s_info_watch_enjoy":
        case "s_info_watch":
        case "s_info_watch_tour_1":
        case "s_info_watch_tour_2":
        case "s_info_watch_tour_3":
        case "s_info_watch_tour_4":
        case "s_info_watch_tour_5":
        case "s_info_watch_tour_6":
        case "s_info_watch_tour_7":
        case "s_info_watch_tour_8":
        case "s_info_watch_tour_9":
        case "s_info_enjoy":
        case "s_info_enjoy_tour_1":
        case "s_info_enjoy_tour_2":
        case "s_info_enjoy_tour_3":
        case "s_info_enjoy_tour_4":
        case "s_info_enjoy_tour_5":
        case "s_info_enjoy_tour_6":
        case "s_info_enjoy_tour_7":
        case "s_info_enjoy_tour_8":
        case "s_info_enjoy_tour_9":
        case "s_info_forest_park":
        case "s_info_book_street":
            screenString = "Amusement";
            break;
        case "s_info_cultural_assets":
            screenString = "Culture";
            break;
        case "s_function_photo":
            screenString = "PhotoPrinting";
            break;
        case "s_function_music":
            screenString = "RobotDance";
            break;
        case "s_function_avatar":
            screenString = "RobotAvatar";
            break;
        default:
            screenString = "";
            break;
    }
    
    return screenString;
}

//---------------------------------------------------------------------------//
//-- 탭 버튼 -----------------------------------------------------------------//
//---------------------------------------------------------------------------//
/* 탭 별 컨텐츠 표시 */
function show_img_sub(obj,num,total)
{
	var max = document.getElementsByName(total);
    
	for (var i=1;i<=max.length; i++)
    {
		var txt = max[i-1].src;
		var lastIndex = txt.lastIndexOf("_");
        
		if (i == num)
        {
			if (txt.substring(lastIndex+1) != '.png')
            {
				document.getElementById(obj+i).style.display = 'block';
				max[i-1].src = max[i-1].src.replace(".png","_.png");
			}
		}
		else
        {
			document.getElementById(obj+i).style.display = 'none';
			max[i-1].src = max[i-1].src.replace("_.png",".png");
		}
	}
    
    // 탭 별 action
    OnTab(num);
}

/* 탭 별 action */
function OnTab(num)
{
    // 각 서브 컨텐츠에서 구현
}

/* 서브탭 별 컨텐츠 표시 */
function show_img_subtab(obj,num,total)
{
	var max = document.getElementsByName(total);
    
	for (var i=1;i<=max.length; i++)
    {
		var txt = max[i-1].src;
		var lastIndex = txt.lastIndexOf("_");
        
		if (i == num)
        {
			if (txt.substring(lastIndex+1) != '_N.png')
            {
				document.getElementById(obj+i).style.display = 'block';
				max[i-1].src = max[i-1].src.replace("_N.png","_S.png");
			}
		}
		else
        {
			document.getElementById(obj+i).style.display = 'none';
			max[i-1].src = max[i-1].src.replace("_S.png","_N.png");
		}
	}
    
    // 서브탭 별 action
    OnSubTab(num);
}

/* 서브탭 별 action */
function OnSubTab(num)
{
    // 각 서브 컨텐츠에서 구현
}