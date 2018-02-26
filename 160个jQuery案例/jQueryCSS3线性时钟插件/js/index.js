$(document).ready(function(){
    // Set up clock's numbers
    for (var i = 0; i < 12; i++){
        if (i != 0){
            $("#numbers").append("<span id="+i+" class=\'number-box\'><div class=\'number\'>"+i+"</div><div class=\'line\'></div></span>");
        }
        else{
            $("#numbers").append("<span id="+12+" class=\'number-box\'><div class=\'number\'>"+12+"</div></span>");
        }
    }

    // Display time bars
    var d, ms, s, m, h;
    var clock = $("#clock");
    var secondBar = $("#seconds");
    var SPM = 60; // Seconds Per Minute

    var seconds = setInterval(function(){
        d = new Date();
        ms = d.getMilliseconds();
        s = (d.getSeconds() + (ms / 1000));

        sWidth = (s / 60) * 100; //Percentage of seconds
        $("#seconds").width(sWidth+'%'); // Set width of bar
    }, 200)

    var minutes = setInterval(function(){
        m = d.getMinutes();
        mWidth = ((m + (sWidth / 100)) / 60) * 100; //Percentage of seconds
        $("#minutes").width(mWidth+'%');
    }, 500)

    var hours = setInterval(function(){
        h = d.getHours() % 12;
        hWidth = ((h + (mWidth / 100)) / 12) * 100; //Percentage of seconds
        $("#hours").width(hWidth+'%');
    }, 1000)
});