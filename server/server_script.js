/* ---------------------- Post data to the json server ------------------------ */

const http = require('http')

function postCookie(mesgcookie) {

  var userId = getCookie("end_user_id", mesgcookie);
  var pageUrl = getCookie("web_page_url", mesgcookie);
  
  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  var dateTime = date+' '+time;
  
  let data = JSON.stringify({
    userId: userId,
    url: pageUrl,
    at: dateTime
  })
  
  let options = {
    hostname: 'localhost',
    port: 3000,
    path: '/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  }

  let req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })

  req.write(data);
  req.end();  
} 

/* ----------------------------------------------------------------- */

function getCookie(cname, mesgcookie) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(mesgcookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var ws = new require('ws');
var webSocketServer = new ws.Server({
  port: 8081
}); 

var clients = {};
webSocketServer.on('connection', function (wsSocket) {

  webSocketServer.id = Math.floor(Math.random()*(100000-2)+1);

  console.log("new connection " + webSocketServer.id);
  clients[webSocketServer.id] = wsSocket;

  wsSocket.on('message', function (message) {
    console.log('connection opened ' + webSocketServer.id);
    postCookie(message);
  });

  wsSocket.on('close', function () {
    console.log('connection closed ' + webSocketServer.id);
    delete clients[webSocketServer.id];
  });

}); 

console.log('proxy server started');
