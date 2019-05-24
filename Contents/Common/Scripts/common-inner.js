function OnJoystickControlled(strPara){
	var btn_info = strPara.split(',')[4];


	if(btn_info[0] == '1'){
		/*if(readCookie("lang")=="english"){
	        window.external.ChangeLanguage("en-us");
	        SetVolume(1);
	        window.external.PlaySpeech("bye, bye. Enjoy your flight.");
	        //window.external.PlaySpeech("Hi, I’m Morriya, how can I help you?");
	    }
    	else if (readCookie("lang")=="arabic") {
    		window.external.ChangeLanguage("ar-eg");
	        SetVolume(1);
	        window.external.PlaySpeech("مَرْحَبَاً ، أَنَا مُرِيَةْ. كَيْفَ يُمْكِنُنِيْ أنْ أُسَاعِدَكْ؟");
    	}*/
	}
	if(btn_info[1] == '1'){
		
	}
	if(btn_info[2] == '1'){
		
	}
	if(btn_info[3] == '1'){
		location.href = "../../maincontents.htm";
		
	}

	if(btn_info[4] == '1'){
		SetHeadYaw(-35, 23);       
	}
	if(btn_info[5] == '1'){
       SetHeadYaw(0,23);
	}
	if(btn_info[6] == '1'){
		SetHeadYaw(35, 23);
	}
	if(btn_info[7] == '1'){
		SetHeadYaw(0,23);
	}
	if(btn_info[8] == '1'){
		SetHeadYaw(35, 23);
	}
	if(btn_info[9] == '1'){
		SetHeadYaw(0,23);
	}
	if(btn_info[10] == '1'){
		SetHeadYaw(35, 23);
	}
	if(btn_info[11] == '1'){
		SetHeadYaw(0,23);
	}
}