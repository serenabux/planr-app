
    function add_field(number, uid){
        var code = ""
        for(var i=0; i <= number; i++){
            if(document.getElementById('invite_friend_' + String(i)) && document.getElementById('invite_friend_' + String(i)).value){
                code += "<input class='form_field' type='email' value='" + document.getElementById('invite_friend_' + String(i)).value + "' name='invite_friend_"+ i + "'>";
            }
            else{
                code += "<input class='form_field' type='email' name='invite_friend_"+ i + " id='invite_friend_"+ i + "'>";
            }
        }
        code += "<button id='add_invite_field' class='secondary_button' onclick='add_field(" + (number + 1) + ")'>Add More</button>"
        document.getElementById("friend_email_inputs").innerHTML = code;
        document.getElementById("create_trip_form").action = "/create_trip_data/" + uid + "/" + number + "/"
    };


// var name = "";
    // var start_date = "";
    // var end_date = "";
    // var trip_location = "";
    // var friends = [];

    // function  step1_code(uid) {
    //     return(`<label for="create_trip_input"><h2 id="create_trip_label" class="centered">Name the Adventure</h2></label>
    //     <input type="text" id="create_trip_input" name="create_trip_input" class="centered form_field" required/>
    //     <button class="sign_up_button" onclick='create_trip.create_trip_step(1,` + uid +`)'>Next!</button>
    //     <p class="error" id="create_trip_error"></p>
    //     `)
    // };

    // function step2_code(uid) {
    //     return(`<form>
    //     <label for="create_trip_input"><h2 id="create_trip_label" class="centered">Where are you going?</h2></label>
    //     <input type="text" id="create_trip_input" name="create_trip_input" class="centered form_field" placeholder="City, County" required/>
    //     <button class="sign_up_button" type="button" onclick='create_trip_step(2, ` + uid +`)'>Next!</button>
    //     </form>
    //     <p class="error" id="create_trip_error"></p>
    //     `)}
    // ;

    // function step3_code(uid){
    //     return(`
    //     <h2 id="create_trip_label" class="centered">When is the Adventure?</h2>
    //     <form>
    //     <label for="create_trip_start_date">Start Date</label>
    //     <input type="date" id="create_trip_start_date" name="create_trip_start_date" class="centered form_field" required>
    //     <label for="create_trip_end_date">End Date</label>
    //     <input type="date" id="create_trip_end_date" name="create_trip_end_date" class="centered form_field" required>
    //     <button class="sign_up_button" type="button" onclick='create_trip_step(3,` + uid + `)'>Next!</button>
    //     </form>
    //     <p class="error" id="create_trip_error"></p>
    //     `)
    // };

    // function step4_code(uid){
    //     return(`
    //    <h2 id="create_trip_label" class="centered">Invite Friends!</h2>
    //    <form>
    //    <label for="create_trip_input">Friend's email</label>
    //     <input type="email" id="create_trip_input" name="create_trip_input" class="centered form_field" required>
    //     <button class="secondary_button" id="invite_button" onclick = 'invite_friend()'>Invite</button>
    //     <button class="sign_up_button" type="button" onclick='create_trip_step(4,` + uid + `)'>Next!</button>
    //     </form>
    //     <p class="error" id="create_trip_error"></p>
    // `)};


    // function create_trip_step(step, uid){
    //     switch(step){
    //         case 1: {
    //             fetch('/check_trip_name/'+uid+'/'+document.getElementById("create_trip_input").value)
    //             .then(function (response) {
    //                 return response.json();
    //             })
    //             .then(function (json) {
    //                 console.log(json.success);
    //                 if(json.success == 0){
    //                     name = document.getElementById("create_trip_input").value;
    //                     console.log(name);
    //                     document.getElementById("create_trip_container").innerHTML = step2_code(uid);
    //                 }
    //                 else if(json.success == -1){ 
    //                     document.getElementById("create_trip_error").innerHTML = "Adventure name already used";
    //                 }
    //                 else{
    //                     document.getElementById("create_trip_error").innerHTML = "Please enter a name for your adventure";
    //                 }
    //             })
    //             break;
    //         }
    //         case 2: {
    //             trip_location = document.getElementById("create_trip_input").value;
    //             document.getElementById("create_trip_container"). innerHTML = step3_code(uid);
    //             break;
    //         }
    //         case 3:{
    //             var start_date_value = document.getElementById("create_trip_start_date");
    //             var end_date_value = document.getElementById("create_trip_end_date");
    //             start_date = new Date (start_date_value);
    //             end_date = new Date(end_date_value);
    //             if(start_date && end_date){
    //                 if(end_date.getTime() > start_date.getTime()){
    //                     document.getElementById("create_trip_error").innerHTML = "The start date must be prior to the end date"
    //                 }
    //                 else{
    //                     document.getElementById("create_trip_container").innerHTML = step4_code(uid);
    //                 }
    //             }
    //             break;
    //         }
    //         case 4:{
    //             fetch('/create_trip_data/'+uid)
    //             .then(function (response) {
    //                 return response.json();
    //             })
    //             .then(function (json) {
    //                 console.log(json.success);
    //                 if(json.success == 0){
    //                     name = document.getElementById("create_trip_input").value;
    //                     console.log(name);
    //                     document.getElementById("create_trip_container").innerHTML = step2_code(uid);
    //                 }
    //                 else{
    //                     document.getElementById("create_trip_error").innerHTML = "Adventure name already used";
    //                 }
    //             })
    //         }
    //     }
    //     //return false to prevent reload
    //     return false;
    // }

    // function invite_friend(){
    //     fetch('/invite_friends', {
    //         // Specify the method
    //         method: 'POST',
    
    //         // A JSON payload
    //         body: JSON.stringify({
    //             "email": document.getElementById("create_trip_input").value
    //         })
    //     }).then(function (response) {
    //         return response.json();
    //     }).then(function (json) {
    
    //         console.log('POST response: ');
    //         console.log(json);
    //         var message = JSON.parse(json)
    //         console.log(message)
    //         if(message.success == 0){
    //             document.getElementById("invite_button").innerHTML = "Added!";
    //             document.getElementById("invite_button").style.backgroundColor = "#39b8ea";
    //             document.getElementById("invite_button").style.color = "#000000";
    //             setTimeout(function(){ 
    //                 document.getElementById("invite_button").innerHTML = "Invite";
    //                 document.getElementById("invite_button").style.backgroundColor = "#ffffff";
    //                 document.getElementById("invite_button").style.color = "#39b8ea";
    //              }, 3000);
    //         }
    //         else{
    //             document.getElementById("create_trip_error") = "There is no account linked to that email. Ask your friend to create an account and then add them";
    //         }
    //     });
    // }

