
    function add_field(number, uid){
        var code = ""
        for(var i=0; i < number; i++){
            if(document.getElementById('invite_friend_' + String(i)) && document.getElementById('invite_friend_' + String(i)).value){
                code += "<input class='form_field' type='email' value='" + document.getElementById('invite_friend_' + String(i)).value + "' name='invite_friend_"+ i + "' id='invite_friend_"+ i + "'>";
            }
            else{
                code += "<input class='form_field' type='email' name='invite_friend_"+ i + "' id='invite_friend_"+ i + "'>";
            }
        }
        code += "<div id='last_email'><input class='form_field create_trip_field' type='email' name='invite_friend_"+ i + "' id='invite_friend_"+ i + "'><button id='add_invite_field' class='add_button' onclick='add_field(" + (number + 1) + ")'>+</button></div>"
        document.getElementById("friend_email_inputs").innerHTML = code;
        document.getElementById("create_trip_form").action = "/create_trip_data/" + uid + "/" + number;
    };


