function changeExploreLocation(uid){
    var location = document.getElementsByName('trip_destination')[0].value;
    var l = location.split(", ")
    fetch('/explore_new/'+uid+'/'+l[0]+'/'+l[1]+"/")
    .then(function (response) {
        return response.json();
    }).then(function (json) {
        //Set all of the attractions based on the response 
        // var data = JSON.parse(json);
        var attractions = json.attractions;
        var attractions_code = "";
        for (var i=0; i < attractions.length; i++){
            attractions_code += `
                <div class="padding-24">
                    <div class="card_link_info">
                        <a href="`+ attractions[i].website + `" class="card_link" target="_blank">
                            <div class="card">`;
                                if (attractions[i].photo_link){
                                    attractions_code += `<img src="/images/airplane.png">`
                                } else{
                                    attractions_code += `<img src="/images/airplane.png" alt="plane">`
                                }
                                attractions_code += `
                                <div class="padding-24">
                                    <h3 class="centered">` + attractions[i].name + `</h3>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `
        }
        document.getElementById("attractions").innerHTML = attractions_code; 
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