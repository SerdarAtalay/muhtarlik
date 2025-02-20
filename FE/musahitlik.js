$(document).ready(function() {
    $.get("http://127.0.0.1:8000/ils/", (data) => {
        for(var k in data) {
            // console.log(k, data[k]);

            var x = document.getElementById("il_select");
            var option = document.createElement("option");

            option.value = data[k].id;
            option.text = data[k].name;
            x.add(option);
        }
    });

    $("#il_select").on("change", function() {
        var il_val= $(this).val();
        $("#ilce_select").empty();

        $.get("http://127.0.0.1:8000/ilces/?il_id=" + il_val, (data) => {
            for(var k in data) {
                // console.log(k, data[k]);

                var x = document.getElementById("ilce_select");
                var option = document.createElement("option");

                option.value = data[k].id;
                option.text = data[k].name;
                x.add(option);
            }
        });
    });

    $("#ilce_select").on("change", function() {
        var ilce_val= $(this).val();
        $("#mahalle_select").empty();
        
        $.get("http://127.0.0.1:8000/muhtarliks/?ilce_id=" + ilce_val, (data) => {
            for(var k in data) {
                // console.log(k, data[k]);

                var x = document.getElementById("mahalle_select");
                var option = document.createElement("option");

                option.value = data[k].id;
                option.text = data[k].name;
                x.add(option);
            }
        });
    });

    $("#musahit_button").on("click", function() {

        var tc_no = $("#tc_no").val();
        var first_name = $("#first_name").val();
        var last_name = $("#last_name").val();
        var dob = $("#dob").val();
        var sex = $("#sex").val();
        var mobile = $("#mobile").val();
        var mail = $("#mail").val();
        var il_id = $("#il_select").val();
        var ilce_id = $("#ilce_select").val();
        var muhtar_id = $("#mahalle_select").val();

        var data = { 
            "tc_no": tc_no,
            "first_name": first_name,
            "last_name": last_name,

            "dob": dob,
            "sex": sex,
            "mobile": mobile,
            "mail": mail,

            "il_id": parseInt(il_id),
            "ilce_id": parseInt(ilce_id),
            "muhtarlik_id": parseInt(muhtar_id)
        };

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/musahit/',
            data: JSON.stringify(data),
            success: function(result) { console.log(result) },
            contentType: "application/json",
            dataType: 'json'
        });

    });

});