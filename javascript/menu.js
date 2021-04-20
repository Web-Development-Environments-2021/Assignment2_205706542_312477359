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