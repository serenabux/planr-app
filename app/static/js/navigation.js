function drawerToggle(){
    var element = document.getElementsByClassName("side_drawer")[0];
    var classes = element.classList;
    backdrop = document.getElementById("backdrop_container");
    var open = false;
    for (var i=0; i < classes.length; i++){
        if (classes[i] == "open"){
            open = true;
            break;
        }
    }
    if(open){
        element.classList.remove("open");
        backdrop.classList.remove("backdrop");
        backdrop.onclick = "";
    }
    else{
        element.classList.add("open");
        backdrop.classList.add("backdrop");
        backdrop.onclick = drawerToggle;
    }
}


function toggle_settings_dropdown() {
    var elements = document.getElementsByClassName("dropdown-content");
    for(var i=0; i < elements.length; i++){
        elements[i].classList.toggle("show");
        elements[i].classList.toggle("hidden");
    }
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn_side')) {
        var elements = document.getElementsByClassName('dropdown-content');
        for(var i=0; i < elements.length; i++){
            elements[i].classList.remove("show");
            elements[i].classList.add("hidden");
        }
    }
  }