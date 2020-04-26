function callDelete(uid, trip_id){
    fetch('/delete_trip/'+uid+'/'+trip_id+'/')
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

function deleteAttraction(uid, trip_id, attraction_name, attraction_number){
    fetch('/delete_attraction/'+uid+'/'+trip_id+'/'+attraction_name+'/')
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
        if(text == "true"){
            $("#"+ attraction_number).remove();
        }
        else{
            alert("Something went wrong. Unable to delete your adventure")
        }
    });
}

$(".delete_button").click(function(){
	if($(this).hasClass("confirm")){
        var trip_id = this.id.split("_")
        if(trip_id[0] == "attraction"){
            attraction_name = document.getElementsByClassName("attraction_name")[parseInt(trip_id[1])].innerHTML;
            deleteAttraction(trip_id[2], trip_id[3], attraction_name, trip_id[1])
        }
        else{
            callDelete(trip_id[2], trip_id[0]);
        }
	} else {
		$(this).addClass("confirm");
		$("span").text("Are you sure?");
	}
});

// Reset
$(".delete_button").on('mouseout', function(){
	if($(this).hasClass("confirm") || $(this).hasClass("done")){
		setTimeout(function(){
			$("button").removeClass("confirm")
			$("span").text("Delete");
		}, 3000);
	}
});