//controller keys
var up = 38;
var down = 40;
var right = 39;
var left = 37;

var color5;
var color15;
var color25;
var numOfColor5;
var numOfColor15;
var numOfColor25;

var flagRandom = false;
var timeLimit;



//double code----------------------------------------------------------
function check_UserName() {
    //var pattern = /^[a-zA-Z]*$/;
    var userName = $("#form_username").val();
    if (userName !== '') {
        $("#userName_error_message").hide();
        $("#form_username").css("border-bottom", "2px solid #34F458");
    } else {
        $("#userName_error_message").html("Please insert your user Name ");
        $("#userName_error_message").show();
        $("#form_username").css("border-bottom", "2px solid #F90A0A");
        error_userName = true;
    }
}


function check_fname() {
    var pattern = /^[a-zA-Z]*$/;
    var fname = $("#form_fname").val();
    if (pattern.test(fname) && fname !== '' && fname.length > 2) {
        $("#fname_error_message").hide();
        $("#form_fname").css("border-bottom", "2px solid #34F458");
    } else {
        $("#fname_error_message").html("insert only and more then 2 characters");
        $("#fname_error_message").show();
        $("#form_fname").css("border-bottom", "2px solid #F90A0A");
        error_fname = true;
    }
}

function check_sname() {
    var pattern = /^[a-zA-Z]*$/;
    var sname = $("#form_sname").val()
    if (pattern.test(sname) && sname !== '' && sname.length > 2) {
        $("#sname_error_message").hide();
        $("#form_sname").css("border-bottom", "2px solid #34F458");
    } else {
        $("#sname_error_message").html("insert only and more then 2 characters");
        $("#sname_error_message").show();
        $("#form_sname").css("border-bottom", "2px solid #F90A0A");
        error_fname = true;
    }
}

function check_password() {
    var password_length = $("#form_password").val().length;
    var re = /(?=.*\d)(?=.*[a-zA-Z])/;

    if (password_length < 6 || !re.test($("#form_password").val())) {
        $("#password_error_message").html("Atleast 6 Characters");
        $("#password_error_message").show();
        $("#form_password").css("border-bottom", "2px solid #F90A0A");
        error_password = true;
    } else {
        $("#password_error_message").hide();
        $("#form_password").css("border-bottom", "2px solid #34F458");
    }
}

function check_email() {
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $("#form_email").val();
    if (pattern.test(email) && email !== '') {
        $("#email_error_message").hide();
        $("#form_email").css("border-bottom", "2px solid #34F458");
    } else {
        $("#email_error_message").html("Invalid Email");
        $("#email_error_message").show();
        $("#form_email").css("border-bottom", "2px solid #F90A0A");
        error_email = true;
    }
}

function check_Birthday() {

    $("#datepickerform").css("border-bottom", "2px solid #34F458");
    $("#datepickerform").html("")
}

//double code--------------------------------------------------------------------

function allfill() {
	error_fname = false;
	error_sname = false;
	error_email = false;
	error_password = false;
	error_userName = false;
	error_birthday = false;
	check_fname();
	check_sname();
	check_email();
	check_password();
	check_UserName();
	check_Birthday();

	if (error_fname === false && error_sname === false && error_email === false && error_password === false && error_userName === false) {
		alert("Registration fill");
		showLogin();
	}
	else {
		alert("Please Fill the form Correctly");
	}

}



// function checkIfExist() {
// 	var userName = document.getElementById('form_username').value;
// 	var passward = document.getElementById('form_password').value;
// 	for (i = 0; i < userAndPassArray.length; i++) {
// 		if (userName === userAndPassArray[i][0] && passward === userAndPassArray[i][1]) {
// 			return true;
// 		}
// 	}
// 	return false;
// }



function registerFunc() {
	var userName = document.getElementById('form_username').value;
    var passward = document.getElementById('form_password').value;
    

    error_fname = false;
    error_sname = false;
    error_email = false;
    error_password = false;
    error_userName = false;
    error_birthday = false;
    check_fname();
    check_sname();
    check_email();
    check_password();
    check_UserName();
    check_Birthday();

   
	if (userName === "" || passward === "") {
		window.alert("register failed null");
		return false;
    }
    
	if ( (  localStorage.getItem(userName) === null) && (error_fname === false && error_sname === false && error_email === false && error_password === false && error_userName === false)) {
		//	userAndPassArray.push(["userName","passward"]);
        localStorage.setItem(userName, passward);
        window.alert("succses");
        showLogin();
		return true;
    }
    else{
	window.alert("Please Fill the form Correctly.");
	return false;
    }     
}
$

function loginFunc() {
	var loguserName = document.getElementById("login_username").value;
	var logpassward = document.getElementById("login_password").value;
	var temp = localStorage.getItem(loguserName);
	document.getElementById("lblUser").value = " " + loguserName;
	if(loguserName=="" || logpassward==""){
		window.alert("incorrect use name or password.");
		return false;
	}
	if (temp == logpassward) {
		window.alert("confirm");
	
		showSetting();
		return true;
	}

	window.alert("incorrect use name or password.");
	return false;
}

$(document).ready(function () {

    localStorage.setItem("p", "p");
});


$(function () {
	$("#datepickerform").datepicker();
});

$(function () {

	$("#fname_error_message").hide();
	$("#sname_error_message").hide();
	$("#email_error_message").hide();
	$("#password_error_message").hide();
	$("#userName_error_message").hide();
	$("#birthday_error_message").hide();
	var error_fname = false;
	var error_sname = false;
	var error_email = false;
	var error_password = false;
	var error_userName = false;
	var error_birthday = false;
	$("#form_username").focusout(function () {
		check_UserName();
	});
	$("#form_fname").focusout(function () {
		check_fname();
	});
	$("#form_sname").focusout(function () {
		check_sname();
	});
	$("#form_password").focusout(function () {
		check_password();
	});
	$("#form_email").focusout(function () {
		check_email();
	});
	$("#datepicker").focusout(function () {

		check_Birthday();
	});

	function check_UserName() {
		//var pattern = /^[a-zA-Z]*$/;
		var userName = $("#form_username").val();
		if (userName !== '') {
			$("#userName_error_message").hide();
			$("#form_username").css("border-bottom", "2px solid #34F458");
		} else {
			$("#userName_error_message").html("Please insert your user Name ");
			$("#userName_error_message").show();
			$("#form_username").css("border-bottom", "2px solid #F90A0A");
			error_userName = true;
		}
	}


	function check_fname() {
		var pattern = /^[a-zA-Z]*$/;
		var fname = $("#form_fname").val();
		if (pattern.test(fname) && fname !== '' && fname.length > 2) {
			$("#fname_error_message").hide();
			$("#form_fname").css("border-bottom", "2px solid #34F458");
		} else {
			$("#fname_error_message").html("insert only and more then 2 characters");
			$("#fname_error_message").show();
			$("#form_fname").css("border-bottom", "2px solid #F90A0A");
			error_fname = true;
		}
	}

	function check_sname() {
		var pattern = /^[a-zA-Z]*$/;
		var sname = $("#form_sname").val()
		if (pattern.test(sname) && sname !== '' && sname.length > 2) {
			$("#sname_error_message").hide();
			$("#form_sname").css("border-bottom", "2px solid #34F458");
		} else {
			$("#sname_error_message").html("insert only and more then 2 characters");
			$("#sname_error_message").show();
			$("#form_sname").css("border-bottom", "2px solid #F90A0A");
			error_fname = true;
		}
	}

	function check_password() {
		var password_length = $("#form_password").val().length;
		var re = /(?=.*\d)(?=.*[a-zA-Z])/;

		if (password_length < 6 || !re.test($("#form_password").val())) {
			$("#password_error_message").html("Atleast 6 Characters(letters and digits)");
			$("#password_error_message").show();
			$("#form_password").css("border-bottom", "2px solid #F90A0A");
			error_password = true;
		} else {
			$("#password_error_message").hide();
			$("#form_password").css("border-bottom", "2px solid #34F458");
		}
	}

	function check_email() {
		var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var email = $("#form_email").val();
		if (pattern.test(email) && email !== '') {
			$("#email_error_message").hide();
			$("#form_email").css("border-bottom", "2px solid #34F458");
		} else {
			$("#email_error_message").html("Invalid Email");
			$("#email_error_message").show();
			$("#form_email").css("border-bottom", "2px solid #F90A0A");
			error_email = true;
		}
	}

	function check_Birthday() {

		$("#datepickerform").css("border-bottom", "2px solid #34F458");
		$("#datepickerform").html("")
	}


	$("#registration_form").submit(function () {
		error_fname = false;
		error_sname = false;
		error_email = false;
		error_password = false;
		error_userName = false;
		error_birthday = false;
		check_fname();
		check_sname();
		check_email();
		check_password();
		check_UserName();
		check_Birthday();

        registerFunc();

		if (error_fname === false && error_sname === false && error_email === false && error_password === false && error_userName === false) {
			alert("Registration full");
			//showLogin();

			showLogin();
			//return true;
		} else {
			alert("Please Fill the form Correctly");
			// return false;
		}


	});
});

