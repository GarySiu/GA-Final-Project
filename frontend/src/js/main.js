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
        ui.item.draggable('destroy');
      }
      , over: function () {
        removeIntent = false;
      }
      , out: function () {
        removeIntent = true;
      }
      , beforeStop: function (event, ui) {
        if(removeIntent == true){
          updateTweetText();
          var $magnet = ui.item.detach();
          $magnetList.append($magnet);
          $magnet.draggable({ 
            cursor: '-webkit-grabbing'
            , containment: $magnetContainer
            , stack: '#magnet-list li'
            , connectToSortable: '#build-area'
            , scroll: false
          });
        }
      }
    })
  })
}

function updateTweetText() {
  var outputString = $buildArea.sortable('toArray', {attribute: 'data-text'}).join(' ');
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
      var template = '<li data-text="' + magnet + '">' + magnet + '</li>'
      $magnetList.append(template)
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