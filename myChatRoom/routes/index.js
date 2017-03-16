var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { root: 'public' });
});

router.get('/chatBot',function(req, res, next)
{
  var query = req.query.s;
  console.log(query);
  console.log("http://api.program-o.com/v2/chatbot/?bot_id=6&say=" + query + "&format=json");
  request("http://api.program-o.com/v2/chatbot/?bot_id=6&say=" + query + "&format=json", function(error,response,body)
  {
    if(!error && response.statusCode == 200)
    {
      res.status(200).json(body);
    }
  });
});

module.exports = router;

module.exports = function(io) {
    return router;
}

