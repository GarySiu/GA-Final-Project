var express = require('express');
app = express();

port = process.env.PORT || 3000;

// These are the ENV names for my various tokens
// MAGP_CONSUMER_KEY
// MAGP_CONSUMER_SECRET
// MAGP_ACCESS_TOKEN
// MAGP_ACCESS_TOKEN_SECRET


app.get('/', function(req, res){
  res.send('Hello World!')
})

console.log('Server up on port', port);
app.listen(port);