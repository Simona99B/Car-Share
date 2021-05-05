// Ajax call to updateusername.php
$("#updateusernameform").submit(function(event){ 
    //prevent default php processing
    event.preventDefault();
    //collect user inputs
    var datatopost = $(this).serializeArray();
//    console.log(datatopost);
    //send them to updateusername.php using AJAX
    $.ajax({
        url: "updateusername.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data){
                $("#updateusernamemessage").html(data);
            }else{
                location.reload();   
            }
        },
        error: function(){
            $("#updateusernamemessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            
        }
    
    });

});

// Ajax call to updatepassword.php
$("#updatepasswordform").submit(function(event){ 
    //prevent default php processing
    event.preventDefault();
    //collect user inputs
    var datatopost = $(this).serializeArray();
//    console.log(datatopost);
    //send them to updateusername.php using AJAX
    $.ajax({
        url: "updatepassword.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data){
                $("#updatepasswordmessage").html(data);
            }
        },
        error: function(){
            $("#updatepasswordmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            
        }
    
    });

});



// Ajax call to updateemail.php
$("#updateemailform").submit(function(event){ 
    //prevent default php processing
    event.preventDefault();
    //collect user inputs
    var datatopost = $(this).serializeArray();
//    console.log(datatopost);
    //send them to updateusername.php using AJAX
    $.ajax({
        url: "updateemail.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data){
                $("#updateemailmessage").html(data);
            }
        },
        error: function(){
            $("#updateemailmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            
        }
    
    });

});

//update picture preview
var file;
var imageType;
var imageSize;
var wrongType;
$("#picture").change(function(){
    file = this.files[0];
    console.log(file);
    imageType = file.type;
    imageSize = file.size;
    
    //check image type
    var acceptableTypes = ["image/jpeg", "image/png", "image/jpg"];
    wrongType = ($.inArray(imageType, acceptableTypes) == -1);
    if(wrongType){
        $("#updatepicturemessage").html("<div class='alert alert-danger'>Only jpeg, png and jpg images are accepted!</div>");
        return false;
    }  
    
    //check image size
    if(imageSize>3*1024*1024){
        $("#updatepicturemessage").html("<div class='alert alert-danger'>Please upload an image less than 3MB!</div>");
        return false;
    }
    
    //The FileReader object will be used to convert our image to a binary string
    var reader = new FileReader();
    //callback
    reader.onload = updatePreview;
    //Start the read operation -> convert content into a data URL which is passed to the callback function updatePreview
    reader.readAsDataURL(file);
    
});

function updatePreview(event){
    //console.log(event);
    $("#preview2").attr("src", event.target.result);
}

//update picture
$("#updatepictureform").submit(function(){
    event.preventDefault();
    
    //file missing
    if(!file){
         $("#updatepicturemessage").html("<div class='alert alert-danger'>Please upload a picture!</div>");
        return false;
    }
    
    //wrong type
    if(wrongType){
        $("#updatepicturemessage").html("<div class='alert alert-danger'>Only jpeg, png and jpg images are accepted!</div>");
        return false;
    }
    
    //file too big
     if(imageSize>3*1024*1024){
        $("#updatepicturemessage").html("<div class='alert alert-danger'>Please upload an image less than 3MB!</div>");
        return false;
    }
    
//    var test = new FormData(this);
//    console.log(test.get("picture"));
    
    //send Ajax Call to updatepicture.php
     $.ajax({
        url: "updatepicture.php",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false, 
        processData: false,
        success: function(data){
             if(data){
                 $("#updatepicturemessage").html(data);
             }else{
                 location.reload();
             }
        },
        error: function(){
            $("#updatepicturemessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            
        }
    
    });
});