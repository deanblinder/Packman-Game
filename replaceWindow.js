function showRegister(){
   
    $(document.getElementById("RegisterSection")).show();
    $(document.getElementById("LoginSection")).hide();
    $(document.getElementById("GamePlaySection")).hide();
    $(document.getElementById("SettingsSection")).hide();
    $(document.getElementById("gameRules")).hide();
    //$(document.getElementById("Welcome")).hide();
    return true;
}
function showLogin(){
   
   
    $(document.getElementById("RegisterSection")).hide();
    $(document.getElementById("LoginSection")).show();
    $(document.getElementById("GamePlaySection")).hide();
    $(document.getElementById("gameRules")).hide();
    $(document.getElementById("SettingsSection")).hide();
    //$(document.getElementById("Welcome")).hide();
    return true;
}
function showSetting(){
   
   
    $(document.getElementById("RegisterSection")).hide();
    $(document.getElementById("LoginSection")).hide();
    $(document.getElementById("GamePlaySection")).hide();
    $(document.getElementById("SettingsSection")).show();
    $(document.getElementById("gameRules")).hide();
    //$(document.getElementById("Welcome")).hide();
    return true;
}
function showGame(){
   
   
    $(document.getElementById("RegisterSection")).hide();
    $(document.getElementById("LoginSection")).hide();
    $(document.getElementById("GamePlaySection")).show();
    $(document.getElementById("SettingsSection")).hide();
    $(document.getElementById("Welcome")).hide();
    $(document.getElementById("gameRules")).hide();
    return true;
}
function showGameRules(){
   
   
    $(document.getElementById("RegisterSection")).hide();
    $(document.getElementById("LoginSection")).hide();
    $(document.getElementById("GamePlaySection")).hide();
    $(document.getElementById("SettingsSection")).hide();
    $(document.getElementById("Welcome")).show();
    $(document.getElementById("gameRules")).show();
    return true;
}
function showAbout(){
   
    $(document.getElementById("RegisterSection")).hide();
    $(document.getElementById("LoginSection")).hide();
    $(document.getElementById("GamePlaySection")).hide();
    $(document.getElementById("SettingsSection")).hide();
    $(document.getElementById("WelcomeDialog")).show();
    $(document.getElementById("gameRules")).hide();
   // showdialog();
}