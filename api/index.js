var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
// jsonParser = bodyParser.json(),
urlencodedParser = bodyParser.urlencoded({ extended: false }),

Twit = require('twit'),
T = new Twit({
    consumer_key:         process.env.MAGP_CONSUMER_KEY
  , consumer_secret:      process.env.MAGP_CONSUMER_SECRET
  , app_only_auth:        true
}),

magnetize = require('./magnetize'),

port = process.env.PORT || 3000;

app.get('/search', urlencodedParser, function(req, res) {
  // this gives us the option to return results from the web as well as twitter
  if(req.query.type !== 'twitter') return res.sendStatus(400)

  // different kinds of twitter search
  if(req.query.q.charAt(0) === '@') {

    T.get('statuses/user_timeline', { screen_name: req.query.q.slice(1),
      count: 200, trim_user: true, exclude_replies: true, include_rts: false }, function (err, data, response) {
        if(err) console.log(err)
        res.send(magnetize(data));
      })

    console.log('Returning results for user named: ' + req.query.q.slice(1))
  } else {
    T.get('search/tweets', { q: req.query.q, count: 100 }, function(err, data, response) {
      data = data.statuses;
      res.send(magnetize(data));
    })
    console.log('Generic search: ' + req.query.q)
  }
});

console.log('Server up on port', port);
app.listen(port);