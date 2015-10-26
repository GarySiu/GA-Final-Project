var cleanThisTweet = require('clean-this-tweet-up'),
markov = require('markov'),
m = markov(2);

module.exports = function(data){
  var seed = [], magnetText = [];

  data.forEach(function(tweet) {
    // fully remove hashtags, urls RT and :
    tweet.text = tweet.text.replace(/#\w+/g, '').replace(/http\S+/g, '')
      .replace(/:/g, '').replace(/RT/g, '')
    // additional cleanup to remove personal info
    seed.push(cleanThisTweet(tweet));
  });

  seed = seed.join(' ');

  m.seed(seed, function(){
    for(i = 0; i < 20; i++) {
      magnetText.push(m.fill(m.pick(), 1).join(' '));
      magnetText.push(m.fill(m.pick(), 2).join(' '));
      magnetText.push(m.fill(m.pick(), 3).join(' '));
      magnetText.push(m.fill(m.pick(), 4).join(' '));
    }
  })

  return magnetText;
}
