function callDelete(trip_id){
    fetch('/delete_trip/'+trip_id+'/')
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
        if(text == "true"){
            $("#"+ trip_id).remove();
        }
        else{
            alert("Something went wrong. Unable to delete your adventure")
        }
    });
}

$("button").click(function(){
	if($(this).hasClass("confirm")){
        var trip_id = this.id.split("_")
        callDelete(trip_id[0]);
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