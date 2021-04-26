var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var context = canvas.getContext('2d');

var cell_height = 60;
var cell_width = 60;

// music
var game_music = new Audio('media/game_music.mp3');

// bonus
var bonus = new Object();
bonus.image = new Image(cell_width, cell_height);
bonus.image.src = './media/hamburger.jpg';
bonus.show = true;

// settings
var key_up = 38;
var key_down = 40;
var key_left = 37;
var key_right = 39;

var food_remain;

var food_low_color;
var food_mid_color;
var food_high_color;

// ghots
var monster_count;

var pinky = new Object();
pinky.image = new Image(cell_width-4, cell_height-4);
pinky.image.src = './media/Pinky.jpeg';
pinky.id = 8;

var inky = new Object();
inky.image = new Image(cell_width-4, cell_height-4);
inky.image.src = './media/Inky.jpeg';
inky.id = 9;

var clyde = new Object();
clyde.image = new Image(cell_width-4, cell_height-4);
clyde.image.src = './media/Clyde.jpeg';
clyde.id = 10;

var blinky = new Object();
blinky.image = new Image(cell_width-4, cell_height-4);
blinky.image.src = './media/Blinky.jpeg';
blinky.id = 11;

var game_time;

function Start() {

	configureGameSettings();

	lblUserName.value = username;
	game_music.play();

	bonus.show = true;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var pacman_remain = 1;
	start_time = new Date();

	for (var i = 0; i < 10; i++) {
		
		// 7:food-high, 6:food-mid, 1:food-low, 2:pacman, 0:nothing, 5:bonus, 4:wall
		board[i] = new Array();

		for (var j = 0; j < 10; j++) {
			//ghots	
			if (i == 0 && j == 0 && blinky.show) {
				board[i][j] = blinky.id
				blinky.i = 0;
				blinky.j = 0;
			}
			else if (i == 0 && j == 9 && clyde.show) {
				board[i][j] = clyde.id
				clyde.i = 0;
				clyde.j = 0;
			}
			else if (i == 9 && j == 0 && inky.show) {
				board[i][j] = inky.id
				inky.i = 0;
				inky.j = 0;
			}
			else if (i == 0 && j == 0 && pinky.show) {
				board[i][j] = pinky.id
				pinky.i = 0;
				pinky.j = 0;
			}
			//walls
			else if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} 
			else {
				var randomNum = Math.random();
				if (randomNum <= (0.1 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 7;
				} 
				else if (randomNum <= (0.3 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 6;
				}
				else if (randomNum <= (0.6 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				}
			
				else if (pacman_remain > 0) {
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
	
	// bonus
	bonus.also = board[7][7]
	board[7][7] = 5;
	bonus.x = 7
	bonus.y = 7

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

function configureGameSettings() {

	food_remain = document.getElementById('food-count').value;
	
	food_low_color = document.getElementById('food-color-low').value;
	food_mid_color = document.getElementById('food-color-mid').value;
	food_high_color = document.getElementById('food-color-high').value;

	game_time = document.getElementById('game-time-input-id').value;

	monster_count = document.getElementById('monster-count-id').value;

	if (monster_count == 1) {
		pinky.show = false;
		inky.show = false;
		clyde.show = false;
		blinky.show = true;
		blinky.also = 0;
	}
	if (monster_count == 2) {
		pinky.show = false;
		inky.show = false;
		clyde.show = true;
		blinky.show = true;
		clyde.also = 0;
		blinky.also = 0;
	}
	if (monster_count == 3) {
		pinky.show = false;
		inky.show = true;
		clyde.show = true;
		blinky.show = true;
		inky.also = 0;
		clyde.also = 0;
		blinky.also = 0;
	}
	if (monster_count == 3) {
		pinky.show = true;
		inky.show = true;
		clyde.show = true;
		blinky.show = true;
		pinky.also = 0;
		inky.also = 0;
		clyde.also = 0;
		blinky.also = 0;
	}
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
	if (keysDown[key_up]) {  // up
		return 1;
	}
	if (keysDown[key_down]) {  // down
		return 2;
	}
	if (keysDown[key_left]) {  // left
		return 3;
	}
	if (keysDown[key_right]) {  // right
		return 4;
	}
}

function Draw(x) {
	canvas.width = canvas.width;  // clean board
	
	lblScore.value = score;
	lblTime.value = time_elapsed;
	
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {

			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;

			context.beginPath();
			context.rect(center.x - 30, center.y - 30, 60, 60);
			context.fillStyle = "black";
			context.fill();

			// border	
			border_color = getRandomColor();
			if (i==0) {
				if (j != 4) {
					context.beginPath();
					context.rect(center.x - 30, center.y - 30, 1, 60);
					context.fillStyle = border_color;
					context.fill();
				}
			}
			if (j==0) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 1);
				context.fillStyle = border_color;
				context.fill();
			}
			if (i==9) {
				if (j != 4) {
					context.beginPath();
					context.rect(center.x + 29, center.y -30, 1, 60);
					context.fillStyle = border_color;
					context.fill();
				}
			}
			if (j==9) {
				context.beginPath();
				context.rect(center.x - 30, center.y + 29, 60, 1);
				context.fillStyle = border_color;
				context.fill();
			}
		
			if (board[i][j] == 2 ) {  // pacman
				if(x==4) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.25 * Math.PI, 1.75 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color;
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black";
					context.fill();
				}
				else if(x==1) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.8 * Math.PI, 1.2 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color;
					context.fill();
					context.beginPath();
					context.arc(center.x -15, center.y+15 , 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black";
					context.fill();
				}
				else if(x==2) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.75 * Math.PI, 0.25 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color;
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI, false); // circle eyes
					context.fillStyle = "black";
					context.fill();
				}
				else if(x==3) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.25 * Math.PI, 0.75 * Math.PI); // half circle mo
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color;
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
			
			else if (board[i][j] == 1) {  // food-low
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = food_low_color;
				context.fill();
			}
			
			else if (board[i][j] == 6) {  // food-mid
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = food_mid_color;
				context.fill();
			}
			
			else if (board[i][j] == 7) {  // food-high
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = food_high_color;
				context.fill();
			}
			
			 else if (board[i][j] == 4) {  // wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey";
				context.fill();
			}

			else if (board[i][j] == 5 && bonus.show) {  // bonus
				context.drawImage(bonus.image, center.x - (cell_width / 2) + 2, center.y - (cell_height / 2) + 2, cell_width - 4, cell_height - 4);
			}

			else if (board[i][j] == blinky.id && blinky.show) {  // blinky
				context.drawImage(blinky.image, center.x - (cell_width / 2) + 2, center.y - (cell_height / 2) + 2, cell_width - 4, cell_height - 4);
			}

			else if (board[i][j] == clyde.id && clyde.show) {  // clyde
				context.drawImage(clyde.image, center.x - (cell_width / 2) + 2, center.y - (cell_height / 2) + 2, cell_width - 4, cell_height - 4);
			}
			else if (board[i][j] == inky.id && inky.show) {  // inky
				context.drawImage(inky.image, center.x - (cell_width / 2) + 2, center.y - (cell_height / 2) + 2, cell_width - 4, cell_height - 4);
			}
			// put pinky
			else if (board[i][j] == pinky.id && pinky.show) {  // pinky
				context.drawImage(pinky.image, center.x - (cell_width / 2) + 2, center.y - (cell_height / 2) + 2, cell_width - 4, cell_height - 4);
			}
		}
	}
}

function UpdatePosition() {
	
	board[shape.i][shape.j] = 0;

	var x = GetKeyPressed();

	if (x == 1) {  //  up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {  // down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {  // left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		else if (shape.j == 4 && shape.i == 0) {
			shape.i = 9;
		}
	}
	if (x == 4) {  // right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
		else if (shape.j == 4 && shape.i == 9) {
			shape.i = 0;
		}
	}

	if (bonus.show == true) {
		move_bonus();
	}

	// move ghots
	if(blinky.show) {
		move_ghost(blinky);
	}
	if(clyde.show) {
		move_ghost(clyde);
	}
	if(inky.show) {
		move_ghost(inky);
	}
	if(pinky.show) {
		move_ghost(pinky);
	}

	if (board[shape.i][shape.j] == 1) {  // food-low
		score += 5;
	}
	else if (board[shape.i][shape.j] == 6) {  // food-med
		score += 15;
	}
	else if (board[shape.i][shape.j] == 7) {  // food-high
		score += 25;
	}
	else if (board[shape.i][shape.j] == 5 && bonus.show == true) {  // bonus
		bonus.show = false;
		// ! add here monster check !
		score += 50;
		if (bonus.also == 1) {
			score += 5;
		}
		else if (bonus.also == 6) {
			score += 15;
		}
		else if (bonus.also == 7) {
			score += 25;
		}
	}
	
	board[shape.i][shape.j] = 2;

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if (score >= 500 || time_elapsed >= game_time) {
		window.clearInterval(interval);
		window.alert("Game completed");
		game_music.pause();
		game_music.time_elapsed = 0;
		scores.push([username, time_elapsed]);
	} 
	else {
		Draw(x);
	}
}

// *** BONUS  LOGIC *** //
function calc_available_bonus_moves() {
	// return array of avaliable moves for the bonus
	// 0-up , 1-down , 2-left , 3-right
	let available_directions = []

	if (bonus.y > 0 && board[bonus.x][bonus.y - 1] != 4) {  // up
		available_directions.push(0)
	}
	if (bonus.y < 9 && board[bonus.x][bonus.y + 1] != 4) {  // down
		available_directions.push(1)
	}
	if (bonus.x > 0 && board[bonus.x - 1][bonus.y] != 4) {  // left
		available_directions.push(2)
	}
	if (bonus.x < 9 && board[bonus.x + 1][bonus.y] != 4) {  // right
		available_directions.push(3)
	}
	return available_directions
}

function move_bonus() {

	if ( (Math.abs(bonus.x - shape.i) <= 1) && (Math.abs(bonus.y - shape.j) <= 1) ) {
		board[bonus.x][bonus.y] = bonus.also;
		bonus.also = board[bonus.x][bonus.y];
		board[bonus.x][bonus.y] = 5;
		bonus.x = shape.i;
		bonus.y = shape.j;
		return;
	}

	let available_directions = calc_available_bonus_moves();
	
	if (bonus.also != 2) {
		board[bonus.x][bonus.y] = bonus.also;  // put back what was there before
	}

	let dir = available_directions[Math.floor(Math.random() * available_directions.length)];

	// update bonus coordinates
	if (dir == 0) {  // up
		bonus.y -= 1;
	}
	else if (dir == 1) {  // down
		bonus.y += 1;
	}
	else if (dir == 2) {  // left
		bonus.x -= 1;
	}
	else if (dir == 3) {  // right
		bonus.x += 1;
	}

	if (board[bonus.x][bonus.y] != 2) {
		bonus.also = board[bonus.x][bonus.y];
	}
	board[bonus.x][bonus.y] = 5;

}

function updateLives(num) {
	var i=1;
	while (i <= num) {
		document.getElementById('heart' + i.toString()).style.visibility = 'visible';
		i++;
	}
	while (i <= 5) {
		document.getElementById('heart' + i.toString()).style.visibility = 'hidden';
		i++;
	}
}

// ** GHOSTS LOGIC ** //
function calc_available_ghost_moves(ghost) {
	// return array of avaliable moves for the ghost
	// 0-up , 1-down , 2-left , 3-right
	let available_directions = []

	if (ghost.j > 0 && board[ghost.i][ghost.j - 1] != 4) {  // up
		available_directions.push(0)
	}
	if (ghost.j < 9 && board[ghost.i][ghost.j + 1] != 4) {  // down
		available_directions.push(1)
	}
	if (ghost.i > 0 && board[ghost.i - 1][ghost.j] != 4) {  // left
		available_directions.push(2)
	}
	if (ghost.i < 9 && board[ghost.i + 1][ghost.j] != 4) {  // right
		available_directions.push(3)
	}
	return available_directions
}


function move_ghost(ghost) {

	let available_directions = calc_available_ghost_moves(ghost);
	
	if (ghost.also != 2) {
		board[ghost.i][ghost.j] = ghost.also;  // put back what was there before
	}

	let dir = available_directions[Math.floor(Math.random() * available_directions.length)];

	// update ghost coordinates
	if (dir == 0) {  // up
		ghost.j -= 1;
	}
	else if (dir == 1) {  // down
		ghost.i += 1;
	}
	else if (dir == 2) {  // left
		ghost.j -= 1;
	}
	else if (dir == 3) {  // right
		ghost.i += 1;
	}

	// remember what is there
	if (
		(board[ghost.i][ghost.j] != 2) && 
		(board[ghost.i][ghost.j] != 5) && 
		(board[ghost.i][ghost.j] != 8) && 
		(board[ghost.i][ghost.j] != 9) && 
		(board[ghost.i][ghost.j] != 10) && 
		(board[ghost.i][ghost.j] != 11)
	){
		ghost.also = board[ghost.i][ghost.j];
	}
	board[ghost.i][ghost.j] = ghost.id;
}