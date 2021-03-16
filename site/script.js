
window.addEventListener("load", afterLoaded,false);
function afterLoaded() {
    init();
}

/* ---------------------- Server connection------------------------ */
var socket = new WebSocket("ws://localhost:8081");

socket.onopen = function () {
    //alert("Connected to the server");
};

socket.onclose = function (event) {
    //if (event.wasClean) {
        //alert('Connection closed');
    //} else {
        //alert('Connection interrupted');
    //}
    //alert('Code: ' + event.code + ' reason: ' + event.reason);
};

socket.onmessage = function (event) {
    //alert("Data received " + event.data);
};

socket.onerror = function (error) {
    //alert("Error " + error.message);
};
/* ----------------------------------------------------------------- */

var randomNumber = -1;
function show(elementID) {

    var element = document.getElementById(elementID);
    if (!element) {
        alert("no such element");
        return;
    }

    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    // then show the requested page
    element.style.display = 'block';

    document.cookie = "web_page_url=" + '=; Max-Age=0';
    document.cookie = "web_page_url=" + (window.location.href + encodeURIComponent(elementID));

    socket.send(document.cookie);
}

function init() {
    initCookies();
    socket.send(document.cookie);
}

function initCookies() {
    randomNumber = Math.floor(Math.random()*(10000000-2)+1);
    document.cookie = "end_user_id=" + randomNumber;
    document.cookie = "web_page_url=" + window.location.href + '#' + encodeURIComponent("Laptops");
}
