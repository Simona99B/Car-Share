//define variables
var data;
var departureLongitude;
var departureLatitude;
var destinationLongitude;
var destinationLatitude;
var trip;

//get trips
getTrips();

//create a geocoder object to use geocode to get coordinates from a certain variable
var geocoder = new google.maps.Geocoder();
//so ova geocoder - using this object we can send request with a certain location or adress and we get result and inside that result we get the cooridnates of that request

$(function(){
   //Fix Map
    $("#addtripModal").on('shown.bs.modal', function(){
        google.maps.event.trigger(map, "resize");
    })
});

//Hide all date-time-checkbox inputs
$('.regular').hide();
$('.one-off').hide();

var myRadio = $('input[name="regular"]');

myRadio.click(function(){
    if($(this).is(':checked')){
        if($(this).val() == "Y"){
            $('.one-off').hide();
            $('.regular').show();
            
        }else{
            $('.regular').hide();
            $('.one-off').show();
            
            
        }
    }
});

//Hide all date-time-checkbox inputs for EDIT
$('.regular2').hide();
$('.one-off2').hide();

var myRadio = $('input[name="regular2"]');

myRadio.click(function(){
    if($(this).is(':checked')){
        if($(this).val() == "Y"){
            $('.one-off2').hide();
            $('.regular2').show();
            
        }else{
            $('.regular2').hide();
            $('.one-off2').show();
            
            
        }
    }
});

//Calendar
$('input[name="date"], input[name="date2"]').datepicker({
    numberOfMonths: 1,
    showAnim: "fadeIn",
    dateFormat: "D d M, yy",
    minDate: +1,
    maxDate: "+12M",
    showWeek: true
});


//Click on Create Trip Button
$("#addtripform").submit(function(event){
    //show spinner
    $("#spinner").show();
    //hide result
    $("#addtripmessage").hide();
    event.preventDefault();
    data = $(this).serializeArray();
    getAddTripDepartureCoordinates();
});

//define functions
function getAddTripDepartureCoordinates(){
    geocoder.geocode(
        {
       'address': document.getElementById("departure").value
        },
        function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                  departureLongitude=results[0].geometry.location.lng();
                  departureLatitude=results[0].geometry.location.lat();
                  data.push({name:'departureLongitude', value: departureLongitude});
                  data.push({name:'departureLatitude', value: departureLatitude});
                  getAddTripDestinationCoordinates();
               }else{
                  getAddTripDestinationCoordinates();
               }
        }
    );
}

function getAddTripDestinationCoordinates(){
    geocoder.geocode(
        {
       'address': document.getElementById("destination").value
        },
        function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                  destinationLongitude=results[0].geometry.location.lng();
                  destinationLatitude=results[0].geometry.location.lat();
                  data.push({name:'destinationLongitude', value: destinationLongitude});
                  data.push({name:'destinationLatitude', value: destinationLatitude});
                  submitAddTripRequest();
               }else{
                  submitAddTripRequest();
               }
        }
    );
}

function submitAddTripRequest(){
    
    //send AJAX call to addtrip.php
     $.ajax({
        url: "addtrips.php",
        type: "POST",
        data: data,
        success: function(returnedData){
            //hide spinner
            $("#spinner").hide();
            if(returnedData){
                 $("#addtripmessage").html(returnedData);
                 $("#addtripmessage").slideDown();
            }else{
                //hide modal
                $("#addtripModal").modal('hide');
                //reset form
                $("#addtripform")[0].reset();
                //hide regular and on-off element
                $(".regular").hide();
                $(".one-off").hide();
                //load trips
                getTrips();
            }
        },
        error: function(){
            //hide spinner
            $("#spinner").hide();
            $("#addtripmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#addtripmessage").slideDown();
            
        }
    
    });
}

function formatModal(){
    $('#departure2').val(trip['departure']);
    $('#destination2').val(trip['destination']);
    $('#price2').val(trip['price']);
    $('#seatsavailable2').val(trip['seatsavailable']);
    if(trip['regular'] == "Y"){
        $('#yes2').prop('checked', true);
        $('#monday2').prop('checked', trip['monday'] == "1"? true:false);
        $('#tuesday2').prop('checked', trip['tuesday'] == "1"? true:false);
        $('#wednesday2').prop('checked', trip['wednesday'] == "1"? true:false);
        $('#thursday2').prop('checked', trip['thursday'] == "1"? true:false);
        $('#friday2').prop('checked', trip['friday'] == "1"? true:false);
        $('#saturday2').prop('checked', trip['saturday'] == "1"? true:false);
        $('#sunday2').prop('checked', trip['sunday'] == "1"? true:false);
        $('input[name="time2"]').val(trip["time"]);
        $('.one-off2').hide();
        $('.regular2').show();
    }else{
        $('#no2').prop('checked', true);
        $('input[name="date2"]').val(trip["date"]);
        $('input[name="time2"]').val(trip["time"]);
        $('.regular2').hide();
        $('.one-off2').show();
        
    }
}

function getEditTripDepartureCoordinates(){
    geocoder.geocode(
        {
       'address': document.getElementById("departure2").value
        },
        function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                  departureLongitude=results[0].geometry.location.lng();
                  departureLatitude=results[0].geometry.location.lat();
                  data.push({name:'departureLongitude', value: departureLongitude});
                  data.push({name:'departureLatitude', value: departureLatitude});
                  getEditTripDestinationCoordinates();
               }else{
                  getEditTripDestinationCoordinates();
               }
        }
    );
}

function getEditTripDestinationCoordinates(){
    geocoder.geocode(
        {
       'address': document.getElementById("destination2").value
        },
        function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                  destinationLongitude=results[0].geometry.location.lng();
                  destinationLatitude=results[0].geometry.location.lat();
                  data.push({name:'destinationLongitude', value: destinationLongitude});
                  data.push({name:'destinationLatitude', value: destinationLatitude});
                  submitEditTripRequest();
               }else{
                  submitEditTripRequest();
               }
        }
    );
}

function submitEditTripRequest(){
    
    //send AJAX call to addtrip.php
     $.ajax({
        url: "updatetrips.php",
        type: "POST",
        data: data,
        success: function(returnedData){
            //hide spinner
            $("#spinner").hide();
            if(returnedData){
                 $("#edittripmessage").html(returnedData);
                 $("#edittripmessage").slideDown();
            }else{
                //hide modal
                $("#edittripModal").modal('hide');
                //reset form
                $("#edittripform")[0].reset();
                //load trips
                getTrips();
            }
        },
        error: function(){
            //hide spinner
            $("#spinner").hide();
            $("#edittripmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#edittripmessage").slideDown();
            
        }
    
    });
}



//get Trips
function getTrips(){
    //show spinner
    $("#spinner").show();
    //send AJAX call to gettrips.php
     $.ajax({
        url: "gettrips.php",
        success: function(returnedData){
            //hide spinner
            $("#spinner").hide();
            $("#myTrips").hide();
            $("#myTrips").html(returnedData);
            $("#myTrips").fadeIn();
        },
        error: function(){
            //hide spinner
            $("#spinner").hide();
            $("#myTrips").hide();
            $("#myTrips").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#myTrips").fadeIn();        
            
        }
    
    });
}

//Click on Edit Button inside a trip
$("#edittripModal").on('show.bs.modal', function(event){
   $("#edittripmessage").empty();
    
    //button which open the modal - with the id of our trip
   var invoker = $(event.relatedTarget);
    
    //ajax call to get details of the trip
    $.ajax({
        url: "gettripdetails.php",
        method: "POST",
        data: {trip_id: invoker.data('trip_id')},
        success: function(returnedData){
            //console.log(returnedData)
            if(returnedData){
                if(returnedData == "error"){
                    $("#edittripmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
                }else{
                    trip = JSON.parse(returnedData);
                    //console.log(trip);

                    //fill edit trip form using the JSON parsed data
                    formatModal();
                }
            }
        },
        error: function(){
            $("#edittripmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            
        }
    
    });
    //submit edit form
    $("#edittripform").submit(function(event){
        //show spinner
        $("#spinner").show();
        //hide result
        $("#edittripmessage").hide();
       // $("#edittripmessage").empty();
        event.preventDefault();
        data = $(this).serializeArray();
        data.push({name: 'trip_id', value: invoker.data('trip_id')});
        getEditTripDepartureCoordinates();
    });
    
    //delete a trip
    $("#deleteTrip").click(function(){
        //show spinner
        $("#spinner").show();
        //hide result
        $("#edittripmessage").hide();
        $.ajax({
        url: "deletetrips.php",
        method: "POST",
        data: {trip_id: invoker.data('trip_id')},
        success: function(returnedData){
            //hide spinner
             $("#spinner").hide();
            //console.log(returnedData)
            if(returnedData){
              $("#edittripmessage").html("<div class='alert alert-danger'>There trip could not be deleted. Please try again later.</div>");
              $("#edittripModal").slideDown();
            }else{
                $("#edittripModal").modal('hide');
                getTrips();
            }
        },
        error: function(){
            //hide spinner
            $("#spinner").hide();
            $("#edittripmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#edittripModal").slideDown();
            
        }
    
    });
    });
    
});