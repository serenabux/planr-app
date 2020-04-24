function changeExploreLocation(uid){
    var location = document.getElementsByName('trip_destination')[0].value;
    var l = location.split(", ")
    fetch('/explore_new/'+uid+'/'+l[0]+'/'+l[1]+"/")
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        //Set all of the attractions based on the response 
        console.log(text);
        
    });
}

function addAttraction(uid, trip_id){
    fetch('/add_attraction/'+uid+'/'+trip_id+"/")
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        //Change the added button to "Added!"
        console.log(text);
    });
}




function setImage(ref, i){
    console.log("test!")
    var API_KEY = process.env.API_KEY;
 var photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + ref + 'key=' +API_KEY;
    document.getElementById("attraction_" + i).innerHTML = '<p>Test</p>';
}