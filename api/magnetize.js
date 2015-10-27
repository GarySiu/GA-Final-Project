var cleanThisTweet = require('clean-this-tweet-up'),
markov = require('markov');

module.exports = function(data){
  var seed = []
  , magnetText = []
  , m = markov(2);

  data.forEach(function(tweet) {
    // fully remove hashtags, urls, RT and :
    tweet.text = tweet.text.replace(/#\w+/g, '').replace(/http\S+/g, '')
      .replace(/[:"()]/g, '').replace(/RT/g, '')
    // additional cleanup to remove personal info
    seed.push(cleanThisTweet(tweet));
  });

  seed = seed.join(' ');

  m.seed(seed, function(){
    for(i = 0; i < 25; i++) {
      magnetText.push(m.fill(m.pick(), 1));
      if(i % 2 == 0) magnetText.push(m.fill(m.pick(), 2).join(' '));
      // if(i % 3 == 0) magnetText.push(m.fill(m.pick(), 3).join(' '));
      // if(i % 4 == 0) magnetText.push(m.fill(m.pick(), 4).join(' '));
    }
  })

  return magnetText;
}
