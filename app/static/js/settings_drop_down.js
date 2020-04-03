function toggle_settings_dropdown() {
  document.getElementById("settings_dropdown").classList.toggle("show");
  document.getElementById("settings_dropdown").classList.toggle("hidden");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    document.getElementById("settings_dropdown").classList.remove("show");
  document.getElementById("settings_dropdown").classList.add("hidden");
  }
}