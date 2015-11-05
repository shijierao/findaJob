$(function() {    // do once original document loaded and ready
    $('#showMission').on('click', function() {
        // getting the mission statement from the server
        if ($("#mission").children().length == 0){
            $.getJSON("mission.json", function(responseObject, diditwork) {
                var displayText ="<ul class='list-inline'>";
                for (var i = 0; i<responseObject.missions.length; i++) {
                    var mission = responseObject.missions[i];
                    // turning response into html
                    displayText += "<li>"
                        +mission.statement+ "</li>";
                }
                displayText += "</ul>";
                $("#mission").html(displayText);
            });
        } else {
            $('#mission ul').slideToggle();
        }
    });
});
