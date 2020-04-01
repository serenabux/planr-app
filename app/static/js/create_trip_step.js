
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

    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    }
    today = mm+'/'+dd+'/'+yyyy;
    
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    dd = endDate.getDate();
    
    var mm = endDate.getMonth()+1; 
    var yyyy = endDate.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    }
    endDate = mm+'/'+dd+'/'+yyyy;
    // $('input[name="date_range"]').daterangepicker({
    //     minDate: new Date(),
    //     onSelect: function(dateText) {
    //         $sD = new Date(dateText);
    //         $("input#DateTo").datepicker('option', 'minDate', min);
    //     }
    // });
    $('#date_range').daterangepicker({
        "startDate": today,
        "endDate": endDate,
        "minDate": today
    }, function(start, end, label) {
      console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });


