/*jslint unparam: true */

/* jshint strict: true, -W097, unused:false  */
/*global window, document, d3, $, io, navigator, setTimeout */

//Set the size of the Notifier Circle
$("#notifier_circle").width(0.8 * window.innerWidth);
$("#notifier_circle").height(0.8 * window.innerWidth);


/*
Function: validateIP()
Parameter: none
Description: Attempt to connect to server/Intel IoT platform
*/
function validateIP() {
    'use strict';
    var socket,
    //Get values from text fields
        ip_addr = $("#ip_address").val(),
        port = $("#port").val(),
        script = document.createElement("script");

    //create script tag for socket.io.js file located on your IoT platform (development board)
    script.setAttribute("src", "http://" + ip_addr + ":" + port + "/socket.io/socket.io.js");
    document.head.appendChild(script);
    
    //Wait 1 second before connecting
    setTimeout(function () {
        try {
            //Connect to Server
            socket = io.connect("http://" + ip_addr + ":" + port);

            //Attach a 'connected' event handler to the socket
            socket.on("connected", function (message) {
                navigator.notification.alert(
                    'Welcome',  // message
                    "",                     // callback
                    'Hi There!',            // title
                    'Ok'                  // buttonName
                );
            });

            //Set all Back button to not show
            $.ui.showBackButton = false;
            //Load page with transition
            $.ui.loadContent("#main", false, false, "fade");

            socket.on("message", function (message) {
                //alert("Is anyone there? "+message);
                if (message === "present") {
                    $("#notifier_circle").attr("class", "green");
                    //Update log
                    $("#feedback_log").append(Date().substr(0, 21) + " Someone is Present!<br>");
                    //Prompt user with Cordova notification alert
                    navigator.notification.alert(
                        'Someone is Present!',  // message
                        "",                     // callback
                        'Check Your Door',            // title
                        'Ok'                  // buttonName
                    );
                    //Wait 2 seconds then turn back to gray
                    setTimeout(function () {
                        $("#notifier_circle").attr("class", "gray");
                    }, 3000);
                }
            });
        } catch (e) {
            navigator.notification.alert(
                "Server Not Available!",  // message
                "",                     // callback
                'Connection Error!',            // title
                'Ok'                  // buttonName
            );
        }
    }, 1000);
}
