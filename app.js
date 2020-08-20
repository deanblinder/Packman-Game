//8/5/20 update 1.2
var context;
var remain;
var shape = new Object();
var bonus = new Object();
var bonusVal = 0;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var intervalPack;
var intervalGhost;
var intervalBonus;
var packLife = 5;
var user;
var bonusFlag = true;
var foodValue = [0, 0, 0, 0];
var food_remain;
var userKeys = {
	left: 37,
	up: 38,
	right: 39,
	down: 40
};
var imageClock = new Image();
var imagePill = new Image();
var pillFlag=true;
var clockFlag=true;
var gameMusic = new Audio("./audio/deadMusic.mpeg");
var ghosts = [new Object(), new Object(), new Object(), new Object()];
// var ghost1 = new Object();//board[i][j]==8
// var ghost2 = new Object();//board[i][j]==9
// var ghost3 = new Object();//board[i][j]==10
// var ghost4 = new Object();//board[i][j]==11
//where packman face tend to. 
var packmanLeft = false;
var packmanRight = true;
var packmanUp = false;
var packmanDown = false;


function GetKeyPressed() {
	if (flagRandom) {

		if (keysDown[38]) {
			packmanUp = true;

			packmanLeft = false;
			packmanRight = false;
			packmanDown = false;
			return 1;
		}
		if (keysDown[40]) {
			packmanDown = true;
			packmanLeft = false;
			packmanRight = false;
			packmanUp = false;
			return 2;
		}
		if (keysDown[37]) {
			packmanLeft = true;
			packmanRight = false;
			packmanUp = false;
			packmanDown = false;
			return 3;
		}
		if (keysDown[39]) {
			packmanRight = true;
			packmanLeft = false;
			packmanUp = false;
			packmanDown = false;
			return 4;
		}
	}

	else {
		// var tmpUp=document.getElementById("upKey").value.charCodeAt(0);
		// var tmpDown=document.getElementById("downKey").value.charCodeAt(0);
		// var tmpRight=document.getElementById("rightKey").value.charCodeAt(0);
		// var tmpLeft=document.getElementById("leftKey").value.charCodeAt(0);
		//	alert(String.fromCharCode(evt.keyCode));

		if (keysDown[userKeys.up]) {
			packmanUp = true;
			packmanLeft = false;
			packmanRight = false;
			packmanDown = false;
			return 1;
		}
		if (keysDown[userKeys.down]) {
			packmanDown = true;
			packmanLeft = false;
			packmanRight = false;
			packmanUp = false;
			return 2;
		}
		if (keysDown[userKeys.left]) {
			packmanLeft = true;
			packmanRight = false;
			packmanUp = false;
			packmanDown = false;
			return 3;
		}
		if (keysDown[userKeys.right]) {
			packmanRight = true;
			packmanLeft = false;
			packmanUp = false;
			packmanDown = false;
			return 4;
		}
	}
}


function drewGhost(clr, x, y) {
	context.beginPath();
	context.ellipse(x, y + 25, 27, 50, Math.PI / 1, 0, 1 * Math.PI);
	context.lineTo(x + 20, y + 15);
	context.lineTo(x + 11, y + 25);
	context.lineTo(x + 2, y + 15);
	context.lineTo(x - 7, y + 25);
	context.lineTo(x - 16, y + 15);
	context.lineTo(x - 27, y + 25);
	context.fillStyle = clr;
	context.fill();
	context.stroke();


	context.beginPath();
	context.moveTo(x + 16, y - 5);
	context.arc(x + 10, y - 5, 6, 0, 2 * Math.PI, false);
	context.fillStyle = 'yellow';
	context.fill();


	context.moveTo(x - 4, y - 5);
	context.arc(x - 10, y - 5, 6, 0, 2 * Math.PI, false);
	context.fillStyle = 'yellow';
	context.fill();
	context.stroke();

}

$(document).ready(function () {
	document.getElementById("lblUser").value = " " + document.getElementById("login_username").value;
});



function startNewGame() {

	window.clearInterval(intervalPack);
	window.clearInterval(intervalGhost);
	window.clearInterval(intervalBonus);
	food_remain = foodForRestart;
	numOfColor5 = Math.floor(foodForRestart * 0.6);
	remain = remain - numOfColor5;
	numOfColor15 = Math.floor(foodForRestart * 0.3);
	remain = remain - numOfColor15;
	numOfColor25 = remain;
	foodValue = [0, 0, 0, 0];

	//	bonusVal = 0;
	bonusFlag = true;
	clockFlag = true;
	pillFlag = true;
	Start();

	packLife = 5;

	showGame();

}
function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblLife.value = packLife;
	//lblUser.value=user;
	lblTime.value = timeLimit - time_elapsed;
	lblTime.value = parseInt(lblTime.value);
	
	if (lblTime.value <= 0) {
		if (score < 100) {
			alert("You are better than " + score + " points!");
			gameMusic.pause();
		}
		else {
			gameMusic.pause();
			alert("Winner!!!");
		}

		window.clearInterval(intervalBonus);
		window.clearInterval(intervalPack);
		window.clearInterval(intervalGhost);
		lblTime.value = 60;
		showSetting();
	}
	
	// if(food_remain==0){
	// 	alert("Winner!!!");
	// 	food_remain=60;
	// 	window.clearInterval(intervalBonus);
	// 	window.clearInterval(intervalPack);
	// 	window.clearInterval(intervalGhost);
	// 	showSetting();
	// }
	for (var i = 0; i < 19; i++) {
		for (var j = 0; j < 13; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;

			
			if (board[i][j] == 13) {
				context.drawImage(imageClock,center.x-20,center.y-20,40,40);
			}
			
			if (board[i][j] == 14) {
				context.drawImage(imagePill,center.x-20,center.y-20,40,40);
			}

			if (board[i][j] == 12) {


				context.fillStyle = 'blue';


				var points = [[center.x - 20, center.y], [center.x - 5, center.y - 2], [center.x, center.y - 15], [center.x + 5, center.y - 2],
				[center.x + 20, center.y], [center.x + 10, center.y + 8], [center.x + 12, center.y + 21], [center.x, center.y + 13],
				[center.x - 12, center.y + 21], [center.x - 10, center.y + 8], [center.x - 20, center.y]];

				var len = points.length;

				context.beginPath();
				context.moveTo(points[0][0], points[0][1]);

				for (var m = 0; m < len; m++) {
					context.lineTo(points[m][0], points[m][1]);
				}

				context.fill();
				
			}


			if (board[i][j] == 8) {

				drewGhost('red', center.x, center.y);
			}
			if (board[i][j] == 9) {
				drewGhost('green', center.x, center.y);
			}
			if (board[i][j] == 10) {
				drewGhost('purple', center.x, center.y);
			}
			if (board[i][j] == 11) {
				drewGhost('black', center.x, center.y);
			}
			//is packman
			if (board[i][j] == 2) {
				if (packmanRight) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (packmanLeft) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (packmanUp) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (packmanDown) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 2.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				// circle to eat 5p
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = color5; //color
				context.fill();
				// circle to eat 15p
			} else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color15; //color
				context.fill();
				// circle to eat 25p
			} else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = color25; //color
				context.fill();
				//the wall
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}
//board[i][j] != 8 &&board[i][j] != 9 &&board[i][j] != 10 &&board[i][j] != 11
function isValidMoveForGhost(i, j) {
	i = parseInt(i);
	j = parseInt(j);

	if (j >= 0 && j <= 12 && i >= 0 && i <= 18) {
		if (board[i][j] != 4 && board[i][j] != 8 && board[i][j] != 9 &&
			board[i][j] != 10 && board[i][j] != 11 && board[i][j] != 12 && board[i][j] != 13 && board[i][j] != 14) {

			return true;
		}
	}
	else {
		return false;
	}
}

function ghostMoveLeft(ghostX) {
	ghostX.i--;
}
function ghostMoveRight(ghostX) {
	ghostX.i++;
}
function ghostMoveUp(ghostX) {
	ghostX.j--;
}
function ghostMoveDown(ghostX) {
	ghostX.j++;
}





function bonusMoveLeft(bonus) {
	bonus.i--;
}
function bonusMoveRight(bonus) {
	bonus.i++;
}
function bonusMoveUp(bonus) {
	bonus.j--;
}
function bonusMoveDown(bonus) {
	bonus.j++;
}

function kindOfFood(i, j) {
	if (i >= 0 && i < 19 && j >= 0 && j < 12) {
		if (board[i][j] == 5 || board[i][j] == 6 || board[i][j] == 7) {
			return board[i][j];
		}
	}
	return 0;
}

function UpdateGhostPosition() {
	var tmpRnd;
	for (var t = 0; t < numManster; t++) {
		tmpRnd = Math.random();


		if (ghosts[t].i >= 0 && ghosts[t].i <= 18 && ghosts[t].j >= 0 && ghosts[t].j <= 12) {
			board[ghosts[t].i][ghosts[t].j] = foodValue[t];
		}

		if (tmpRnd > 0.2) {
			////up
			if (shape.j < ghosts[t].j) {//check if pac is up
				if (isValidMoveForGhost(ghosts[t].i, ghosts[t].j - 1)) {// is up valid?
					if (canEatPack(ghosts[t].i, ghosts[t].j - 1)) {
						packLife--;

						locatePackRandomly();
						locateGhostInCorner();
					}
					foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j - 1);
					ghostMoveUp(ghosts[t]);
				}
				else {//up not valid
					if (shape.i > ghosts[t].i) {//check if pac is right
						if (isValidMoveForGhost(ghosts[t].i + 1, ghosts[t].j)) {//is right valid?
							if (canEatPack(ghosts[t].i + 1, ghosts[t].j)) {
								packLife--;

								locatePackRandomly();
								locateGhostInCorner();
							}
							foodValue[t] = kindOfFood(ghosts[t].i + 1, ghosts[t].j);
							ghostMoveRight(ghosts[t]);
						}
						else {//right not valid
							if (isValidMoveForGhost(ghosts[t].i, ghosts[t].j + 1)) {//check if down is valid
								if (canEatPack(ghosts[t].i, ghosts[t].j + 1)) {
									packLife--;

									locatePackRandomly();
									locateGhostInCorner();
								}
								foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j + 1);
								ghostMoveDown(ghosts[t]);
							}
							else {
								if (canEatPack(ghosts[t].i - 1, ghosts[t].j)) {
									packLife--;

									locatePackRandomly();
									locateGhostInCorner();
								}
								foodValue[t] = kindOfFood(ghosts[t].i - 1, ghosts[t].j);
								ghostMoveLeft(ghosts[t]);
							}
						}
					}
				}
			}

			//try packman is right
			else if (shape.i > ghosts[t].i) {
				if (isValidMoveForGhost(ghosts[t].i + 1, ghosts[t].j)) {
					if (canEatPack(ghosts[t].i + 1, ghosts[t].j)) {
						packLife--;

						locatePackRandomly();
						locateGhostInCorner();
					}
					foodValue[t] = kindOfFood(ghosts[t].i + 1, ghosts[t].j);
					ghostMoveRight(ghosts[t]);
				}
				else {//right move is not valid
					if (isValidMoveForGhost(ghosts[t].i, ghosts[t].j + 1)) {
						if (canEatPack(ghosts[t].i, ghosts[t].j + 1)) {
							packLife--;

							locatePackRandomly();
							locateGhostInCorner();
						}
						foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j + 1);
						ghostMoveDown(ghosts[t]);
					}
					else {//down move is not valid
						if (isValidMoveForGhost(ghosts[t].i - 1, ghosts[t].j)) {
							if (canEatPack(ghosts[t].i - 1, ghosts[t].j)) {
								packLife--;

								locatePackRandomly();
								locateGhostInCorner();
							}
							foodValue[t] = kindOfFood(ghosts[t].i - 1, ghosts[t].j);
							ghostMoveLeft(ghosts[t]);
						}
						else {//left move is not valid

							if (canEatPack(ghosts[t].i, ghosts[t].j - 1)) {
								packLife--;

								locatePackRandomly();
								locateGhostInCorner();
							}
							foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j - 1);
							ghostMoveUp(ghosts[t]);

						}
					}
				}
			}
			//pac is down

			else if (shape.j > ghosts[t].j) { // check pacman is down
				if (isValidMoveForGhost(ghosts[t].i, ghosts[t].j + 1)) {// is down valid?

					if (canEatPack(ghosts[t].i, ghosts[t].j + 1)) {
						packLife--;

						locatePackRandomly();
						locateGhostInCorner();
					}
					foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j + 1);

					ghostMoveDown(ghosts[t]);

				}
				else {//down not valid
					if (shape.i < ghosts[t].i) {//check if pac is left
						if (isValidMoveForGhost(ghosts[t].i - 1, ghosts[t].j)) {//is left valid?
							if (canEatPack(ghosts[t].i - 1, ghosts[t].j)) {
								packLife--;

								locatePackRandomly();
								locateGhostInCorner();
							}
							foodValue[t] = kindOfFood(ghosts[t].i - 1, ghosts[t].j);
							ghostMoveLeft(ghosts[t]);
						}
						else {//left not valid
							if (isValidMoveForGhost(ghosts[t].i, ghosts[t].j - 1)) {//check if up is valid
								if (canEatPack(ghosts[t].i, ghosts[t].j - 1)) {
									packLife--;

									locatePackRandomly();
									locateGhostInCorner();
								}
								foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j - 1);
								ghostMoveUp(ghosts[t]);
							}
							else {
								if (canEatPack(ghosts[t].i, ghosts[t].j - 1)) {
									packLife--;

									locatePackRandomly();
									locateGhostInCorner();
								}
								foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j - 1);
								ghostMoveRight(ghosts[t]);
							}
						}
					}
				}
			}
			//ppack is left
			else {
				if (isValidMoveForGhost(ghosts[t].i - 1, ghosts[t].j)) {//check if left is valid
					if (canEatPack(ghosts[t].i - 1, ghosts[t].j)) {
						packLife--;

						locatePackRandomly();
						locateGhostInCorner();
					}
					foodValue[t] = kindOfFood(ghosts[t].i - 1, ghosts[t].j);
					ghostMoveLeft(ghosts[t]);
				}
				else {
					if (isValidMoveForGhost(ghosts[t].i, ghosts[t].j - 1)) {//check if up is valid
						if (canEatPack(ghosts[t].i, ghosts[t].j - 1)) {
							packLife--;

							locatePackRandomly();
							locateGhostInCorner();
						}
						foodValue[t] = kindOfFood(ghosts[t].i, ghosts[t].j - 1);

						ghostMoveUp(ghosts[t]);

					}
					else {
						if (isValidMoveForGhost(ghosts[t].i + 1, ghosts[t].j)) {//check if right move is valid
							if (canEatPack(ghosts[t].i + 1, ghosts[t].j)) {
								packLife--;

								locatePackRandomly();
								locateGhostInCorner();
							}
							foodValue[t] = kindOfFood(ghosts[t].i + 1, ghosts[t].j);
							ghostMoveRight(ghosts[t]);
						}
						else {

							if (canEatPack()) {
								board[ghosts[t].i + 1, ghosts[t].j] = 0;
								packLife--;

								locatePackRandomly();
								locateGhostInCorner();
							}
							foodValue[t] = kindOfFood(ghosts[t].i + 1, ghosts[t].j);
							ghostMoveDown(ghosts[t]);

						}
					}
				}
			}
		}
		else {
			chooseRandomWayForGhost(ghosts[t], t);
		}
		if (packLife == 0) {

			window.alert("Loser!");
			gameMusic.pause();
			window.clearInterval(intervalBonus);
			window.clearInterval(intervalPack);
			window.clearInterval(intervalGhost);
			packLife = 5;
			showSetting();
		}
	
		if (ghosts[t].i >= 0 && ghosts[t].i <= 18 && ghosts[t].j >= 0 && ghosts[t].j <= 12) {
			board[ghosts[t].i][ghosts[t].j] = t + 8;
		}
		Draw();

	}

}
function chooseRandomWayForBonus(curr) {
	let way = Math.floor(Math.random() * 4);
	let flag = true;
	//while (flag) {
	if (way == 0) {
		if (isValidMoveForGhost(curr.i, curr.j + 1)) {//check if right move is valid

			bonusVal = kindOfFood(curr.i, curr.j + 1);
			bonusMoveDown(curr);
		}
		flag = false;
	}
	if (way == 1) {
		if (isValidMoveForGhost(curr.i, curr.j - 1)) {//check if right move is valid

			bonusVal = kindOfFood(curr.i, curr.j - 1);
			bonusMoveUp(curr);
		}
		flag = false;
	}
	if (way == 2) {
		if (isValidMoveForGhost(curr.i - 1, curr.j)) {//check if right move is valid

			bonusVal = kindOfFood(curr.i - 1, curr.j);
			bonusMoveLeft(curr);
		}
		flag = false;
	}
	if (way == 4) {
		if (isValidMoveForGhost(curr.i + 1, curr.j)) {//check if right move is valid

			bonusVal = kindOfFood(curr.i + 1, curr.j);
			bonusMoveRight(curr);
		}
		flag = false;
	}
	way = Math.floor(Math.random() * 4);
	//}

}


function chooseRandomWayForGhost(curr, t) {
	let way = Math.floor(Math.random() * 4);
	let flag = true;
	//while (flag) {
	if (way == 0) {
		if (isValidMoveForGhost(curr.i, curr.j + 1)) {//check if right move is valid
			if (canEatPack(curr.i, curr.j + 1)) {
				packLife--;

				locatePackRandomly();
				locateGhostInCorner();
			}
			foodValue[t] = kindOfFood(curr.i, curr.j + 1);
			ghostMoveDown(curr);
		}
		flag = false;
	}
	if (way == 1) {
		if (isValidMoveForGhost(curr.i, curr.j - 1)) {//check if right move is valid
			if (canEatPack(curr.i, curr.j - 1)) {
				packLife--;

				locatePackRandomly();
				locateGhostInCorner();
			}
			foodValue[t] = kindOfFood(curr.i, curr.j - 1);
			ghostMoveUp(curr);
		}
		flag = false;
	}
	if (way == 2) {
		if (isValidMoveForGhost(curr.i - 1, curr.j)) {//check if right move is valid
			if (canEatPack(curr.i - 1, curr.j)) {

				packLife--;

				locatePackRandomly();
				locateGhostInCorner();
			}
			foodValue[t] = kindOfFood(curr.i - 1, curr.j);
			ghostMoveLeft(curr);
		}
		flag = false;
	}
	if (way == 4) {
		if (isValidMoveForGhost(curr.i + 1, curr.j)) {//check if right move is valid
			if (canEatPack(curr.i + 1, curr.j)) {
				packLife--;
				locatePackRandomly();
				locateGhostInCorner();
			}
			foodValue[t] = kindOfFood(curr.i + 1, curr.j);
			ghostMoveRight(curr);
		}
		flag = false;
	}
	way = Math.floor(Math.random() * 4);
	//}

}
function indexOfPackInFoodVal() {
	// for(var e=0;e<foodValue.length;e++){
	// 	if(foodValue[e]==2){
	// 		return e;
	// 	}
	// 	else{
	// 		return -1;
	// 	}
	// }
	for (var h = 0; h < numManster; h++) {
		if (foodValue[h] == 2) {
			foodValue[h] = 0;
		}
	}
}
function locateGhostInCorner() {
	if (numManster == 4) {
		//indexOfPackInFoodVal();

		board[ghosts[0].i][ghosts[0].j] = foodValue[0];
		ghosts[0].i = 0;
		ghosts[0].j = 0;
		//board[0][0]=8;
		board[ghosts[1].i][ghosts[1].j] = foodValue[1];
		//board[18][0]=9;
		ghosts[1].i = 18;
		ghosts[1].j = 0;
		board[ghosts[2].i][ghosts[2].j] = foodValue[2];
		ghosts[2].i = 18;
		ghosts[2].j = 12;
		//board[18][12]=10;
		board[ghosts[3].i][ghosts[3].j] = foodValue[3];
		//board[0][12]=11;
		ghosts[3].i = 0;
		ghosts[3].j = 12;

	}
	if (numManster == 3) {
		//	indexOfPackInFoodVal();
		board[ghosts[0].i][ghosts[0].j] = foodValue[0];
		//board[0][0]=8
		ghosts[0].i = 0;
		ghosts[0].j = 0;
		board[ghosts[1].i][ghosts[1].j] = foodValue[1];
		//board[18][0]=9;
		ghosts[1].i = 18;
		ghosts[1].j = 0;
		board[ghosts[2].i][ghosts[2].j] = foodValue[2];
		//board[18][12]=10;
		ghosts[2].i = 18;
		ghosts[2].j = 12;


	}
	if (numManster == 2) {
		//	indexOfPackInFoodVal();
		board[ghosts[0].i][ghosts[0].j] = foodValue[0];
		//board[0][0]=8
		ghosts[0].i = 0;
		ghosts[0].j = 0;
		board[ghosts[1].i][ghosts[1].j] = foodValue[1];
		//board[18][0]=9;
		ghosts[1].i = 18;
		ghosts[1].j = 0;


	}
	if (numManster == 1) {
		//indexOfPackInFoodVal();
		board[ghosts[0].i][ghosts[0].j] = foodValue[0];
		//board[0][0]=8
		ghosts[0].i = 0;
		ghosts[0].j = 0;


	}

}
function locatePackRandomly() {
	if (score >= 10) {
		score = score - 10;
	}
	else {
		score = 0;
	}


	var emptyCell = findRandomEmptyCell(board);
	board[shape.i][shape.j] = 0;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
}

function canEatPack(i, j) {
	if (board[i][j] == 2) {

		return true;
	}
	else {
		return false;
	}
}

function updateBonusPosition() {

	bonus.i=parseInt(bonus.i);
	bonus.j=parseInt(bonus.j);
	board[bonus.i][bonus.j] = bonusVal;
	chooseRandomWayForBonus(bonus);
	board[bonus.i][bonus.j] = 12;
	Draw();
}
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
		packmanUp = true;
	}
	if (x == 2) {
		if (shape.j < 12 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
		packmanDown = true;
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		packmanLeft = true;
	}
	if (x == 4) {
		if (shape.i < 18 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
		packmanRight = true;
	}
	if (board[shape.i][shape.j] == 5) {
		score = score + 5;
		
	}
	if (board[shape.i][shape.j] == 6) {
		score = score + 15;
		
	}
	if (board[shape.i][shape.j] == 7) {
		score = score + 25;
		
	}
	if (board[shape.i][shape.j] == 12) {
		score = score + 50;
		window.clearInterval(intervalBonus);
	}
	if (board[shape.i][shape.j] == 13) {
		timeLimit = timeLimit + 15;
		//window.clearInterval(intervalBonus);
	}
	if (board[shape.i][shape.j] == 14) {
		packLife++;
	//	window.clearInterval(intervalBonus);
	}



	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }

	// if (score >= 200) {
	// 	window.alert("Game completed");
	// 	window.clearInterval(intervalPack);
	// 	window.clearInterval(intervalGhost);
	// 	score = 0;
	// 	showSetting();
	// }

	// else {
	// 	Draw();
	// }
	
	Draw();
	
}

	
function checkIfNoBall(){
	for(var ii=0;ii<19;ii++){
		for(var jj=0;jj<19;jj++){
			if(board[ii][jj]==7 ||board[ii][jj]==6 ||board[ii][jj]==5 ){
				return false;
			}
		}
	}
	return true;
}
function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 18 + 1);
	var j = Math.floor(Math.random() * 12 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 18 + 1);
		j = Math.floor(Math.random() * 12 + 1);
	}
	return [i, j];
}



function Start() {
	gameMusic.play();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	//var cnt = 100;
	var cnt = 13 * 19;
	// var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	numManster = parseInt(numManster);

	imageClock.src="images/clock.jpeg";
	imagePill.src="images/corona.jpeg";

	for (var i = 0; i < 19; i++) {
		board[i] = new Array();

		for (var j = 0; j < 13; j++) {
			if (
				(i == 1 && j == 1) ||
				(i == 3 && j == 1) ||
				//(i == 5 && j == 1) ||
				(i == 7 && j == 1) ||
				//(i == 8 && j == 1) ||
				//(i == 9 && j == 1) ||
				//	(i == 10 && j == 1) ||
				(i == 11 && j == 1) ||
				//(i == 13 && j == 1) ||
				(i == 15 && j == 1) ||
				(i == 17 && j == 1) ||
				(i == 1 && j == 2) ||
				//(i == 5 && j == 2) ||
				(i == 9 && j == 2) ||
				//(i == 13 && j == 2) ||
				(i == 17 && j == 2) ||
				//(i == 1 && j == 3) ||
				(i == 3 && j == 3) ||
				(i == 4 && j == 3) ||
				//	(i == 5 && j == 3) ||
				(i == 6 && j == 3) ||
				(i == 7 && j == 3) ||
				(i == 9 && j == 3) ||
				(i == 11 && j == 3) ||
				(i == 12 && j == 3) ||
				//(i == 13 && j == 3) ||
				(i == 14 && j == 3) ||
				(i == 15 && j == 3) ||
				//	(i == 17 && j == 3) ||
				(i == 1 && j == 4) ||
				//(i == 5 && j == 4) ||
				//	(i == 13 && j == 4) ||
				(i == 17 && j == 4) ||
				(i == 1 && j == 5) ||
				(i == 3 && j == 5) ||
				//	(i == 5 && j == 5) ||
				(i == 7 && j == 5) ||
				(i == 8 && j == 5) ||
				(i == 10 && j == 5) ||
				(i == 11 && j == 5) ||
				//(i == 13 && j == 5) ||
				(i == 15 && j == 5) ||
				(i == 17 && j == 5) ||
				(i == 3 && j == 6) ||
				(i == 7 && j == 6) ||
				(i == 11 && j == 6) ||
				(i == 15 && j == 6) ||
				(i == 1 && j == 7) ||
				(i == 3 && j == 7) ||
				//(i == 5 && j == 7) ||
				(i == 7 && j == 7) ||
				(i == 8 && j == 7) ||
				//(i == 9 && j == 7) ||
				(i == 10 && j == 7) ||
				(i == 11 && j == 7) ||
				//(i == 13 && j == 7) ||
				(i == 15 && j == 7) ||
				(i == 17 && j == 7) ||
				(i == 1 && j == 8) ||
				//(i == 5 && j == 8) ||
				//(i == 13 && j == 8) ||
				//(i == 17 && j == 8) ||
				//(i == 1 && j == 9) ||
				(i == 3 && j == 9) ||
				(i == 4 && j == 9) ||
				//(i == 5 && j == 9) ||
				(i == 6 && j == 9) ||
				(i == 7 && j == 9) ||
				(i == 9 && j == 9) ||
				(i == 11 && j == 9) ||
				(i == 12 && j == 9) ||
				//(i == 13 && j == 9) ||
				(i == 14 && j == 9) ||
				(i == 15 && j == 9) ||
				//(i == 17 && j == 9) ||
				(i == 1 && j == 10) ||
				//(i == 5 && j == 10) ||
				(i == 9 && j == 10) ||
				//(i == 13 && j == 10) ||
				(i == 17 && j == 10) ||
				(i == 1 && j == 11) ||
				(i == 3 && j == 11) ||
				//(i == 5 && j == 11) ||
				(i == 7 && j == 11) ||
				(i == 8 && j == 11) ||
				(i == 9 && j == 11) ||
				(i == 10 && j == 11) ||
				(i == 11 && j == 11) ||
				//(i == 13 && j == 11) ||
				(i == 15 && j == 11) ||
				(i == 17 && j == 11)) {
				board[i][j] = 4;
			}
			else {

				if ((i == 0 && j == 0) || (i == 18 && j == 0) || (i == 18 && j == 12) || (i == 0 && j == 12)) {
					if (numManster == 1) {
						if (i == 0 && j == 0) {
							ghosts[0].i = i;
							ghosts[0].j = j;
							board[i][j] = 8;
						}
					}
					if (numManster == 2) {
						if (i == 0 && j == 0) {
							ghosts[0].i = i;
							ghosts[0].j = j;
							board[i][j] = 8;
						}
						if (i == 18 && j == 0) {
							ghosts[1].i = i;
							ghosts[1].j = j;
							board[i][j] = 9;
						}
					}
					if (numManster == 3) {
						if (i == 0 && j == 0) {
							ghosts[0].i = i;
							ghosts[0].j = j;
							board[i][j] = 8;
						}
						if (i == 18 && j == 0) {
							ghosts[1].i = i;
							ghosts[1].j = j;
							board[i][j] = 9;
						}
						if (i == 18 && j == 12) {
							ghosts[2].i = i;
							ghosts[2].j = j;
							board[i][j] = 10;
						}
					}
					if (numManster == 4) {
						if (i == 0 && j == 0) {
							ghosts[0].i = i;
							ghosts[0].j = j;
							board[i][j] = 8;
						}
						if (i == 18 && j == 0) {
							ghosts[1].i = i;
							ghosts[1].j = j;
							board[i][j] = 9;
						}
						if (i == 18 && j == 12) {
							ghosts[2].i = i;
							ghosts[2].j = j;
							board[i][j] = 10;
						}
						if (i == 0 && j == 12) {
							ghosts[3].i = i;
							ghosts[3].j = j;
							board[i][j] = 11;
						}
					}
				}

				else {


					var rnd = Math.floor(Math.random() * 3) + 5;//(5,6,7)
					var randomNum = Math.random();
					if (randomNum <= (1 * food_remain) / cnt) {

						//var rnd = Math.floor(Math.random() * 3 + 5);
						while (countBalls(rnd) === 0 && (numOfColor5 !== 0 || numOfColor15 !== 0 || numOfColor25 !== 0)) {
							rnd = Math.floor(Math.random() * 3 + 5);
						}
						//food_remain--;
						board[i][j] = rnd;
						if (rnd === 5) {
							numOfColor5--;
							food_remain--;
						}

						else if (rnd === 6) {
							numOfColor15--;
							food_remain--;
						}

						//if(rnd===7 ){
						else {
							numOfColor25--;
							food_remain--;
						}

					}
					else if (randomNum < (1 * (pacman_remain + food_remain)) / cnt) {
						shape.i = i;
						shape.j = j;
						pacman_remain--;
						board[i][j] = 2;
					}
					else {
						board[i][j] = 0;
					}
					cnt--;
				}
			}
		}
	}
	

	if (typeof shape.i == "undefined" || typeof shape.j == "undefined") {
		var emptyCell = findRandomEmptyCell(board);
		shape.j = emptyCell[1];
		shape.i = emptyCell[0];
		board[emptyCell[0]][emptyCell[1]] = 2;
		pacman_remain--;
	}


	if (bonusFlag) {
		var firstPos = findRandomEmptyCell(board);
		bonus.i = firstPos[0];
		bonus.j = firstPos[1];
		board[firstPos[0]][firstPos[1]] = 12;
		bonusFlag = false;
	}

	
if (typeof bonus.i == "undefined" || typeof bonus.j == "undefined") {
	var emptyCellBonus = findRandomEmptyCell(board);
	bonus.j = emptyCellBonus[1];
	bonus.i = emptyCellBonus[0];
	board[emptyCellBonus[0]][emptyCellBonus[1]] = 12;	
}

	if (clockFlag) {
		var clockPos = findRandomEmptyCell(board);
		//bonus.i = clockPos[0];
		//bonus.j = clockPos[1];
		board[clockPos[0]][clockPos[1]] = 13;
		clockFlag = false;
	}
	if (pillFlag) {
		var pillPos = findRandomEmptyCell(board);
		//bonus.i = firstPos[0];
	//	bonus.j = firstPos[1];
		board[pillPos[0]][pillPos[1]] = 14;
		pillFlag = false;
	}


	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		// board[emptyCell[0]][emptyCell[1]] = 1;
		// food_remain--;

		var rnd = Math.floor(Math.random() * 3 + 5);
		while (countBalls(rnd) === 0 && (numOfColor5 !== 0 || numOfColor15 !== 0 || numOfColor25 !== 0)) {
			rnd = Math.floor(Math.random() * 3 + 5);
		}

		board[emptyCell[0]][emptyCell[1]] = rnd;
		if (rnd === 5) {
			numOfColor5--;
			food_remain--;
		}

		else if (rnd === 6) {
			numOfColor15--;
			food_remain--;
		}

		//if(rnd===7 ){
		else {
			numOfColor25--;
			food_remain--;
		}
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	intervalBonus = setInterval(updateBonusPosition, 400);
	intervalPack = setInterval(UpdatePosition, 250);
	intervalGhost = setInterval(UpdateGhostPosition, 350);
	
	
}


function countBalls(num) {
	if (num === 5) {
		return numOfColor5;
	}
	if (num === 6) {
		return numOfColor15;
	}
	if (num === 7) {
		return numOfColor25;
	}
}
