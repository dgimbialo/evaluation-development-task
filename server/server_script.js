/* ---------------------- React Admin connection------------------------ */

const https = require('http')

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
    port: 5000,
    path: '/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  }
  
  let req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })
  
  req.write(data);
  req.end(); 

  req.on('error', (error) => {
    console.error(error)
  })
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


var WebSocketServer = new require('ws');

var clients = {};

var webSocketServer = new WebSocketServer.Server({
  port: 8081
});

webSocketServer.on('connection', function (ws) {

  var id = Math.floor(Math.random()*(100000-2)+1);;
  clients[id] = ws;
  console.log("new connection " + id);

  ws.on('message', function (message) {
    console.log('connection opened ' + id);
    postCookie(message);
  });

  ws.on('close', function () {
    console.log('connection closed ' + id);
    delete clients[id];
  });

});

console.log('proxy server started');
