var express = require('express');
var router = express.Router();
var request = require('request');
var convoID = null;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { root: 'public' });
});

module.exports = router;

module.exports = function(io) {

  io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
  });

  socket.on('botMessage',function(userMessage)
  {
    var botMessage;
    console.log("This is the user message " + userMessage.text);
    var query = userMessage.text.split(" ").join("%");
    var urlToSend = "http://api.program-o.com/v2/chatbot/?bot_id=10&say=" + query +"&format=json"
    if(convoID != null) { urlToSend = "http://api.program-o.com/v2/chatbot/?bot_id=10&say=" + query +"&convo_id=" + convoID +  "&format=json"; }
    console.log(urlToSend);
    request(urlToSend, function(error,response,body)
    {
      if(!error && response.statusCode == 200)
      {
        var json = JSON.parse(body);
        convoID=json['convo_id'];
        botMessage = {
          user: "Mr. Bot",
          text: json['botsay']
        }
        socket.emit('botMessage', botMessage);
      }
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});
    return router;
}

