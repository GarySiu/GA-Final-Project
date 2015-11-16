# Magnetic Tweets
###GA WDI London - Final Project
###This app is live at [http://magnetictweets.bitballoon.com/](http://magnetictweets.bitballoon.com/)
####A webapp that turns Twitter feeds into magnetic poetry
This project combines the surreal output of markov chains 
(the algorithm behind many chatbots, spam mailers and the 
[Horse_ebooks](https://en.wikipedia.org/wiki/Horse_ebooks) internet phenomenon),
with the cult 90's fridge magnet toy "[Magnetic Poetry](https://en.wikipedia.org/wiki/Magnetic_Poetry)".

####Approach / How it works

The frontend is powered by jQuery/jQuery UI. On pageload it makes an ajax request to a backend node.js server.

The server then pulls the requested data from Twitter while protecting the authentication information. It runs the data through a series of filters and uses the resulting data to seed a markov chain generator. It serves the data back to the frontend in JSON format.

The frontend is then dynamically populated and the user is free to build their poetry. 

####The build

- The backend is built on node.js
- npm modules used:
  - body-parser
  - clean-this-tweet-up
  - cors
  - express
  - markov
  - twit 
- The frontend was managed with gulp
- It was styled with a mixture of hand coding and materialize.css
- It also uses jQuery, jQuery-ui and jQuery touch punch
- The magnets make use of the Google Web Font "Cutive Mono"

####Problems and Challenges
The current version of the app is poorly suited for phone use.
This site has Not been designed with scaling in mind. With a relatively small number of active users there's a risk that it will exceed the number of permitted API calls. In the future I plan to either add some caching or link to a users twitter account to avoid this problem.
