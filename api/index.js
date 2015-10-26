var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
jsonParser = bodyParser.json(),
urlencodedParser = bodyParser.urlencoded({ extended: false });

port = process.env.PORT || 3000;

// These are the ENV names for my various tokens
// MAGP_CONSUMER_KEY
// MAGP_CONSUMER_SECRET
// MAGP_ACCESS_TOKEN
// MAGP_ACCESS_TOKEN_SECRET


// app.get('/', function(req, res) {
//   res.send('Hello World!')
// })

app.get('/search', urlencodedParser, function(req, res) {
  // this gives us the option to return results from the web as well as twitter
  if(req.query.type !== 'twitter') return res.sendStatus(400)

  // different kinds of twitter search
  if(req.query.q.charAt(0) === '@') {
    res.send('User named: ' + req.query.q.slice(1))
  } else if(req.query.q.charAt(0) === '#') {
    res.send('Hashtag: ' + req.query.q.slice(1))
  } else {
    res.send('Generic search: ' + req.query.q)
  }
});

console.log('Server up on port', port);
app.listen(port);