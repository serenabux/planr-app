function callDelete(trip_name){
    fetch('/delete_trip/'+trip_name+'/')
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
        if(text == "true"){
            $("#"+ trip_name).remove();
        }
        else{
            alert("Something went wrong. Unable to delete " + trip_name)
        }
    });
}

$("button").click(function(){
	if($(this).hasClass("confirm")){
        var trip_name = this.id.split("_")
        callDelete(trip_name[0]);
	} else {
		$(this).addClass("confirm");
		$("span").text("Are you sure?");
	}
});

// Reset
$("button").on('mouseout', function(){
	if($(this).hasClass("confirm") || $(this).hasClass("done")){
		setTimeout(function(){
			$("button").removeClass("confirm")
			$("span").text("Delete");
		}, 3000);
	}
});