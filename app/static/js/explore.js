function changeExploreLocation(uid){
    var location = document.getElementsByName('trip_destination')[0].value;
    var l = location.split(", ")
    console.log(location)
    fetch('/explore_new/'+uid+'/'+l[0]+'/'+l[1]+"/")
    .then(function (response) {
        return response.json();
    }).then(function (json) {
        //Set all of the attractions based on the response 
        // var data = JSON.parse(json);
        var attractions = json.attractions;
        var attractions_code = "";
        var photo_refs = [];
        for (var i=0; i < attractions.length; i++){
            photo_refs.push(attractions[i].photo_link.substring(attractions[i].photo_link.length - 10));
            attractions_code += `
                <div class="padding-24">
                    <div class="card">
                        <div class="card_link_info">
                            <a href="`+ attractions[i].website + `" class="card_link" target="_blank">`;
                                if (attractions[i].photo_link){
                                    attractions_code += "<img class='attraction_image' src='/images/attraction/"+attractions[i].photo_link.substring(attractions[i].photo_link.length - 10)+".jpg'>"
                                } else{
                                    attractions_code += `<img src="/images/airplane.png" alt="plane">`
                                }
                                attractions_code += `
                                <div class="padding-24">
                                    <h3 class="centered">` + attractions[i].name + `</h3>
                                </div>
                            </a>
                        </div>`
                        if (json.trip_list.length > 1){
                        attractions_code += 
                        `<div class="add_container">
                            <button class='add_button'>
                                <div class='icon centered'>
                                    <i class='fa fa-plus'></i>
                                    <i class='fa fa-check'></i>
                                </div>
                                <div class='text'>
                                    <span>Add to</span>
                                </div>
                            </button>
                            <div class="add_dropdown_content">`;
                                for (var t = 0; t < json.trip_list.length ; t++){
                                    attractions_code += `<button onclick = "addAttraction(` + uid + "," + json.trip_list[t].trip_id+ `, '` + attractions[i].name + `',` + (i + 1) + `)">` + json.trip_list[t].tripname + "</button>";
                                }
                            attractions_code += 
                            `</div>
                        </div>`
                        }
                        else if (json.trip_list.length == 1){
                        attractions_code += 
                        `<div class="add_container">
                            <button class='add_button' onclick="addAttraction(` + uid + "," + json.trip_list[0].trip_id + ",'" + attractions[i].name + "'," + (i + 1) + `)">
                                <div class='icon centered'>
                                    <i class='fa fa-plus'></i>
                                    <i class='fa fa-check'></i>
                                </div>
                                <div class='text'>
                                    <span>Add to ` + json.trip_list[0].tripname + `</span>
                                </div>
                            </button>
                        </div>`
                        }
                        else{
                        attractions_code += 
                        `<div class="add_container">
                            <button class='add_button'>
                                <div class='icon centered'>
                                    <i class='fa fa-plus'></i>
                                </div>
                                <div class='text'>
                                    <span>No upcoming trips</span>
                                </div>
                            </button>
                        </div>`
                        }
                    attractions_code += `
                    </div>
                    </div>
                </div>
            `
        }
        console.log(photo_refs)
        document.getElementById("attractions").innerHTML = attractions_code; 
    });
}



//Add Attractions 

function addAttraction(uid, trip_id, attraction_name, attraction_number){
    fetch('/add_attraction/'+uid+'/'+trip_id+"/" + attraction_name + "/")
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        //Change the added button to "Added!"
        if("true"){
            console.log("true")
            document.getElementsByClassName("add_button")[(attraction_number - 1)].classList.add("done")
            document.getElementsByClassName("text")[(attraction_number -1)].innerHTML = "Added"
            setTimeout(() => {
                document.getElementsByClassName("add_button")[(attraction_number - 1)].classList.remove("done")
                document.getElementsByClassName("text")[(attraction_number - 1)].innerHTML = "Add To"
            }, 3000);
        }
    });
}



