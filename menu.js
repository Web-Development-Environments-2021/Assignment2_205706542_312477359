var current_active_menu_item = "welcome"

function hide_active_menu_item() {
    $('#' + current_active_menu_item + '-div').hide();
}

function set_active_menu_item(item_name) {
    hide_active_menu_item();
    current_active_menu_item = item_name;
    $('#' + current_active_menu_item + '-div').show();
}