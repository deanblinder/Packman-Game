
var numManster;


var foodForRestart;
function submitSetting() {

	flagRandom = false;
	food_remain = document.getElementById("numOfBalls").value;
	foodForRestart=document.getElementById("numOfBalls").value;
	remain = foodForRestart;
	color5 = document.getElementById("color5p").value;
	color15 = document.getElementById("color15p").value;
	color25 = document.getElementById("color25p").value;

	numOfColor5 = Math.floor(foodForRestart * 0.6);
	remain = remain - numOfColor5;
	numOfColor15 = Math.floor(foodForRestart * 0.3);
	remain = remain - numOfColor15;
	numOfColor25 = remain;

	timeLimit = document.getElementById("timeOfGame").value;
	numManster = document.getElementById("numberOfMansters").value;

	var character = document.getElementById("upKey").value.substring(0, 1);
	up = document.getElementById("upKey").value.charCodeAt(0);
	up = up - 32;
	userKeys.up = up;
	down = document.getElementById("downKey").value.charCodeAt(0);
	down = down - 32;
	userKeys.down = down;
	right = document.getElementById("rightKey").value.charCodeAt(0);
	right = right - 32;
	userKeys.right = right;
	left = document.getElementById("leftKey").value.charCodeAt(0);
	left = left - 32;
	userKeys.left = left;

	if (!checkColors() || !checKeys() || !checkTimeOfGame() || !checkNumOfBalls() || !checkNumberOfMansters()) {
		alert("fill correctly the red line!");
	}
	else {
		alert("submit");

		$(document).ready(function () {
			context = canvas.getContext("2d");
			Start();
		});
		showGame();
	}

}


function get_random_color() {
	var color = "";
	for (var i = 0; i < 3; i++) {
		var sub = Math.floor(Math.random() * 256).toString(16);
		color += (sub.length == 1 ? "0" + sub : sub);
	}
	return "#" + color;
}

function randomSetting() {

	flagRandom = true;
	food_remain = Math.floor(Math.random() * 40) + 50;
	foodForRestart=food_remain;
	remain = foodForRestart;
	color5 = get_random_color();
	color15 = get_random_color();
	color25 = get_random_color();
	while (color5 === color15 || color5 === color25 || color25 === color15) {
		color5 = get_random_color();
		color15 = get_random_color();
		color25 = get_random_color();
	}
	numOfColor5 = Math.floor(foodForRestart * 0.6);
	remain = remain - numOfColor5;
	numOfColor15 = Math.floor(foodForRestart * 0.3);
	remain = remain - numOfColor15;
	numOfColor25 = remain;
	timeLimit = Math.floor(Math.random() * 100 + 60);
	numManster = Math.floor(Math.random() * 4 + 1);
	//alert("random   " + "fr:" + foodForRestart + ".\n c5:" + color5 + ".\n c15:" + color15 + ".\n nc5:" + numOfColor5 + ".\n nc15:" + numOfColor15 + ".\n c25:" + color25 + ".\n nc25:" + numOfColor25 + ".\n limT:" + timeLimit + ".\n nManster:" + numManster);

	$(document).ready(function () {
		context = canvas.getContext("2d");
		Start();
	});
	
	showGame();
}


//double code ----------------------------------------------------
function checkColors() {
	var c5 = document.getElementById("color5p").value;
	var c15 = document.getElementById("color15p").value;
	var c25 = document.getElementById("color25p").value;
	if (!(c5 === c15 || c5 === c25 || c15 === c25)) {

		$("#colors_error_message").hide();
		$("#color5p").css("border-bottom", "2px solid #34F458");
		$("#color15p").css("border-bottom", "2px solid #34F458");
		$("#color25p").css("border-bottom", "2px solid #34F458");
		return true;
	}
	else {
		$("#colors_error_message").html("Please select different colors ");
		$("#colors_error_message").show();
		$("#color5p").css("border-bottom", "2px solid #F90A0A");
		$("#color15p").css("border-bottom", "2px solid #F90A0A");
		$("#color25p").css("border-bottom", "2px solid #F90A0A");
		error_colors = true;
		return false;
	}
}



function checkNumOfBalls() {

	var numOfBallsIn = $("#numOfBalls").val();
	if (numOfBallsIn !== '') {
		$("#numOfBalls_error_message").hide();
		$("#numOfBalls").css("border-bottom", "2px solid #34F458");
		return true;
	} else {
		$("#numOfBalls_error_message").html("Please fill this field ");
		$("#numOfBalls_error_message").show();
		$("#numOfBalls").css("border-bottom", "2px solid #F90A0A");
		error_numOfBalls = true;
		return false;
	}
}


function checkTimeOfGame() {

	var timeOfGameIn = $("#timeOfGame").val();
	if (timeOfGameIn !== '') {
		$("#timeOfGame_error_message").hide();
		$("#timeOfGame").css("border-bottom", "2px solid #34F458");
		return true;
	} else {
		$("#timeOfGame_error_message").html("Please fill this field ");
		$("#timeOfGame_error_message").show();
		$("#timeOfGame").css("border-bottom", "2px solid #F90A0A");
		error_timeOfGame = true;
		return false;
	}
}


function checkNumberOfMansters() {

	var numberOfManstersIn = $("#numberOfMansters").val();
	if (numberOfManstersIn !== '') {
		$("#numberOfMansters_error_message").hide();
		$("#numberOfMansters").css("border-bottom", "2px solid #34F458");
		return true;
	} else {
		$("#numberOfMansters_error_message").html("Please fill this field ");
		$("#numberOfMansters_error_message").show();
		$("#numberOfMansters").css("border-bottom", "2px solid #F90A0A");
		error_numberOfMansters = true;
		return false;
	}
}


function checKeys() {

	var upIn = $("#upKey").val();
	var downIn = $("#downKey").val();
	var rightIn = $("#rightKey").val();
	var leftIn = $("#leftKey").val();
	//if (upIn !== '') {
	if (!(upIn === downIn || upIn === rightIn || upIn === leftIn || downIn === rightIn || downIn === leftIn || rightIn === leftIn)
		&& (upIn !== '' && downIn !== '' && rightIn !== '' && leftIn !== '')) {
		$("#keys_error_message").hide();
		$("#upKey").css("border-bottom", "2px solid #34F458");
		$("#downKey").css("border-bottom", "2px solid #34F458");
		$("#rightKey").css("border-bottom", "2px solid #34F458");
		$("#leftKey").css("border-bottom", "2px solid #34F458");
		error_keys = false;
		return true;
	}
	else {
		$("#keys_error_message").html("Please all keys correctly ");
		$("#keys_error_message").show();
		$("#upKey").css("border-bottom", "2px solid #F90A0A");
		$("#downKey").css("border-bottom", "2px solid #F90A0A");
		$("#rightKey").css("border-bottom", "2px solid #F90A0A");
		$("#leftKey").css("border-bottom", "2px solid #F90A0A");
		error_Keys = true;
		return false;
	}
}
//double code ------------------------------------------------------------------------




$("#submitButton").click(function () {
	error_Keys = false;
	error_numOfBalls = false;
	error_numberOfMansters = false;
	error_colors = false;
	error_timeOfGame = false;
	// error_upKey = false;
	// error_downKey = false;
	// error_rightKey = false;
	// error_leftKey = false;
	// checkUpKey();
	// checkDownKey();
	// checkRightKey();
	// checkLeftKey();
	checKeys();
	checkNumberOfMansters();
	checkTimeOfGame();
	checkColors();
	checkNumOfBalls();
	//
	//alert("stam");
	// if (error_Keys === false && error_numOfBalls === false && error_numberOfMansters === false && error_colors === false 
	// 	&& error_timeOfGame===false) {
	// 	alert("setting done");
	// 	showGame();
	// }
	// else {
	// 	alert("Please Fill the form Correctly");	
	// }
});



$(function () {

	// $("#upKey_error_message").hide();
	// $("#downKey_error_message").hide();
	// $("#rightKey_error_message").hide();
	// $("#leftKey_error_message").hide();
	$("#keys_error_message").hide();
	//setting check all fill
	var error_keys = false;
	// var error_upKey = false;
	// var error_downKey = false;
	// var error_rightKey = false;
	// var error_leftKey = false;

	var error_numOfBalls = false;
	var error_timeOfGame = false;
	var error_numberOfMansters = false;

	var error_colors = false;

	$("#upKey").focusout(function () {
		checKeys();
	});
	$("#downKey").focusout(function () {
		checKeys();
	});
	$("#rightKey").focusout(function () {
		checKeys();
	});
	$("#leftKey").focusout(function () {
		checKeys();
	});



	$("#numOfBalls").focusout(function () {
		checkNumOfBalls();
	});
	$("#timeOfGame").focusout(function () {
		checkTimeOfGame();
	});
	$("#numberOfMansters").focusout(function () {
		checkNumberOfMansters();
	});

	$("#color25p").focusout(function () {
		checkColors();
	});
	$("#color15p").focusout(function () {
		checkColors();
	})
	$("#color5p").focusout(function () {
		checkColors();
	})
	function checkColors() {
		var c5 = document.getElementById("color5p").value;
		var c15 = document.getElementById("color15p").value;
		var c25 = document.getElementById("color25p").value;
		if (!(c5 === c15 || c5 === c25 || c15 === c25)) {

			$("#colors_error_message").hide();
			$("#color5p").css("border-bottom", "2px solid #34F458");
			$("#color15p").css("border-bottom", "2px solid #34F458");
			$("#color25p").css("border-bottom", "2px solid #34F458");
			return true;
		}
		else {
			$("#colors_error_message").html("Please select different colors ");
			$("#colors_error_message").show();
			$("#color5p").css("border-bottom", "2px solid #F90A0A");
			$("#color15p").css("border-bottom", "2px solid #F90A0A");
			$("#color25p").css("border-bottom", "2px solid #F90A0A");
			error_colors = true;
			return false;
		}
	}



	function checkNumOfBalls() {

		var numOfBallsIn = $("#numOfBalls").val();
		if (numOfBallsIn !== '') {
			$("#numOfBalls_error_message").hide();
			$("#numOfBalls").css("border-bottom", "2px solid #34F458");
			return true;
		} else {
			$("#numOfBalls_error_message").html("Please fill this field ");
			$("#numOfBalls_error_message").show();
			$("#numOfBalls").css("border-bottom", "2px solid #F90A0A");
			error_numOfBalls = true;
			return false;
		}
	}


	function checkTimeOfGame() {

		var timeOfGameIn = $("#timeOfGame").val();
		if (timeOfGameIn !== '') {
			$("#timeOfGame_error_message").hide();
			$("#timeOfGame").css("border-bottom", "2px solid #34F458");
			return true;
		} else {
			$("#timeOfGame_error_message").html("Please fill this field ");
			$("#timeOfGame_error_message").show();
			$("#timeOfGame").css("border-bottom", "2px solid #F90A0A");
			error_timeOfGame = true;
			return false;
		}
	}


	function checkNumberOfMansters() {

		var numberOfManstersIn = $("#numberOfMansters").val();
		if (numberOfManstersIn !== '') {
			$("#numberOfMansters_error_message").hide();
			$("#numberOfMansters").css("border-bottom", "2px solid #34F458");
			return true;
		} else {
			$("#numberOfMansters_error_message").html("Please fill this field ");
			$("#numberOfMansters_error_message").show();
			$("#numberOfMansters").css("border-bottom", "2px solid #F90A0A");
			error_numberOfMansters = true;
			return false;
		}
	}


	function checKeys() {

		var upIn = $("#upKey").val();
		var downIn = $("#downKey").val();
		var rightIn = $("#rightKey").val();
		var leftIn = $("#leftKey").val();
		//if (upIn !== '') {
		if (!(upIn === downIn || upIn === rightIn || upIn === leftIn || downIn === rightIn || downIn === leftIn || rightIn === leftIn)
			&& (upIn !== '' && downIn !== '' && rightIn !== '' && leftIn !== '')) {
			$("#keys_error_message").hide();
			$("#upKey").css("border-bottom", "2px solid #34F458");
			$("#downKey").css("border-bottom", "2px solid #34F458");
			$("#rightKey").css("border-bottom", "2px solid #34F458");
			$("#leftKey").css("border-bottom", "2px solid #34F458");
			error_keys = false;
			return true;
		}
		else {
			$("#keys_error_message").html("Please all keys correctly ");
			$("#keys_error_message").show();
			$("#upKey").css("border-bottom", "2px solid #F90A0A");
			$("#downKey").css("border-bottom", "2px solid #F90A0A");
			$("#rightKey").css("border-bottom", "2px solid #F90A0A");
			$("#leftKey").css("border-bottom", "2px solid #F90A0A");
			error_Keys = true;
			return false;
		}
	}


});
