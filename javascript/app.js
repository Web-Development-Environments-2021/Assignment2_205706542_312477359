var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var mySound;
var eatingSound;
var context = canvas.getContext('2d');


function Start() {

	
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (0.1 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 7;
				} 
				else if (randomNum <= (0.3 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 6;
				}
				else if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				}
			
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
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
	
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			// pacman
			if (board[i][j] == 2 ) {
				if(x==4) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.25 * Math.PI, 1.75 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(x==1) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.8 * Math.PI, 1.2 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x -15, center.y+15 , 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(x==2) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.75 * Math.PI, 0.25 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(x==3) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.25 * Math.PI, 0.75 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black"; //color
					context.fill();
				}
				else {	
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.25 * Math.PI, 1.85 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black"; //color
					context.fill();			
				}
			} 
			// food-low
			else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = "red";  // color
				context.fill();
			}
			// food-mid
			else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle food
				context.fillStyle = "blue"; //color
				context.fill();
			}
			// food-high
			else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle food
				context.fillStyle = "gold"; //color
				context.fill();
			}
			// wall
			 else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);// obsticles
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {// up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;			
		}
	}
	if (x == 2) {//down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {  // food-low
		score+=5;
		eatingSound.play();
	}
	if (board[shape.i][shape.j] == 6) {  // food-med
		score+=15;
		eatingSound.play();
	}
	if (board[shape.i][shape.j] == 1) {  // food-high
		score+=25;
		eatingSound.play();
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 500) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} 
	else {
		Draw(x);
	}
}

class sound {
	constructor(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
		this.play = function () {
			
			this.sound.play();
		
		};
		this.stop = function () {
			this.sound.pause();
		};
	}
}