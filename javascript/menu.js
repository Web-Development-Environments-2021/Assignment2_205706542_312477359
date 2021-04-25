var current_active_menu_item = "welcome"

function hide_active_menu_item() {
    $('#' + current_active_menu_item + '-div').hide();
}

function set_active_menu_item(item_name) {
    hide_active_menu_item();
    current_active_menu_item = item_name;
    $('#' + current_active_menu_item + '-div').show();
}

// about modal
var about_modal = document.getElementById("about-modal-id");
var span = document.getElementById("about-close-btn");

function open_about_modal() {
    about_modal.style.display = "block";
}

span.onclick = function() {
    about_modal.style.display = "none";
}
  

window.onclick = function(event) {
  if (event.target == about_modal) {
    about_modal.style.display = "none";
  }
}

$(document).keydown(function(event) { 
    if (event.keyCode == 27) { 
        about_modal.style.display = "none";
    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function randomizeSettings() {

    document.getElementById('upKey').value = 'Arrow Up';
    document.getElementById('downKey').value = 'Arrow Down';
    document.getElementById('leftKey').value = 'Arrow Left';
    document.getElementById('rightKey').value = 'Arrow Right';

    let randomFoodCount = Math.floor(Math.random() * (90 - 50) ) + 50;
    document.getElementById('food-count').value = randomFoodCount;
    updateSliderValue()
    
    document.getElementById('food-color-low').value = getRandomColor();
    document.getElementById('food-color-mid').value = getRandomColor();
    document.getElementById('food-color-high').value = getRandomColor();

    let randomGameTime = Math.floor(Math.random() * (180 - 60) ) + 60;
    document.getElementById('game-time-input-id').value = randomGameTime

    selectRandom()  // select a random monster count
}

function selectRandom() {
    // selecting a random option form the monster count options in settings
    var select = document.getElementById('monster-count-id');
    var items = select.getElementsByTagName('option');
    var index = Math.floor(Math.random() * items.length);

    select.selectedIndex = index;
}

function getKeyName(keyCode)
{
    if(keyCode == 37) {
		return "Arrow Left";
	}
	else if(keyCode == 38){
		return "Arrow Up";
	}
	else if(keyCode == 39) {
		return "Arrow Right";
	}
    else if(keyCode == 40) {
		return "Arrow Down";
	}
	else {
		return String.fromCharCode(keyCode);
	}
}

function resetKeyButtonsColors() {

    document.getElementById('upKey').style.backgroundColor = 'white';
    document.getElementById('downKey').style.backgroundColor = 'white';
    document.getElementById('rightKey').style.backgroundColor = 'white';
    document.getElementById('leftKey').style.backgroundColor = 'white';
}

function highlightKeyButton(direction) {

    resetKeyButtonsColors()
    document.getElementById(direction + 'Key').style.backgroundColor = 'yellow';
}

function setKey(event, direction) {
	
    resetKeyButtonsColors()
    document.getElementById(direction + 'Key').style.backgroundColor = 'yellow';
    let keyName;
	let keyCode;
    keyCode = event.keyCode;
    keyName = getKeyName(keyCode)
    document.getElementById(direction + 'Key').value = keyName;
}

function updateSliderValue() {
    var slider = document.getElementById("food-count");
    var output = document.getElementById("display-food-count");
    output.innerHTML = slider.value;
}

// validate game settings
$("#settings-form").validate({
    submitHandler: function(form) {
        set_active_menu_item('game')
        Start();
    }
});