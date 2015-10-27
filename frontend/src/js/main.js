$(document).ready(function() {
  $magnetList = $('#magnet-list');
  $magnetContainer = $('#magnet-container');
  $searchBox = $('#search-box');
  $searchButton = $('#search-button');
  $buildArea = $('#build-area');
  $tweetButton = $('#tweet-button')
  $charCount = $('#char-count')

  setListeners();
  getMagnets();
  buildAreaInit();
})

function buildAreaInit() {
  $(function(){
    $buildArea.sortable({
      receive: function(event, ui) {
        updateTweetText();
      }
    })
  })
}

function updateTweetText() {
  var outputString = $buildArea.sortable('toArray', {attribute: 'data-text'}).join(' ');
  console.log(outputString.length);
  updateCharCount(outputString.length);
  outputString = encodeURIComponent(outputString);
  $tweetButton.attr('href', 'https://twitter.com/intent/tweet?text=' + outputString);
}

function updateCharCount(size) {
  $charCount.html(140 - size);
}

function setListeners() {
  $searchButton.on('click', function() {
    event.preventDefault();
    getMagnets();
  })
}

function getMagnets() {
  $.get('http://localhost:3000/search?type=twitter&q=' + encodeURIComponent($searchBox.val()))
  .done(function(response) {
    $magnetList.empty();
    var magnets = response;
    $.each(magnets, function(index, magnet) {
      $magnetList.append('<li data-text="' + magnet + '">' + magnet + '</li>')
    });

    $(function() {
      $( "li" ).draggable({ 
        cursor: '-webkit-grabbing'
        , containment: $magnetContainer
        , stack: '#magnet-list li'
        , connectToSortable: '#build-area'
        , scroll: false
      });
    });
  });
}
