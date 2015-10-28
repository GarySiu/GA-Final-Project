$(document).ready(function() {
  $magnetList = $('#magnet-list');
  $searchBox = $('#search-box');
  $searchButton = $('#search-button');
  $buildArea = $('#build-area');
  $tweetButton = $('#tweet-button')
  $charCount = $('#char-count')

  setListeners();
  setMagnetListHeight();
  getMagnets();
  buildAreaInit();
})

function setMagnetListHeight() {
  $magnetList.css('height', $(window).height() - 325)
}

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
          var $magnet = ui.item.detach();
          updateTweetText();
          $magnetList.append($magnet);
          $magnet.draggable({ 
            cursor: '-webkit-grabbing'
            , stack: '#magnet-list li'
            , connectToSortable: '#build-area'
            , scroll: false
          });
          $magnet.css('left', event.pageX - (ui.item.width() / 2) )
          $magnet.css('top', event.pageY - 156 + (ui.item.height() / 2) )
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

  $(window).on('resize', setMagnetListHeight)
}

function getMagnets() {
  $.get('http://localhost:3000/search?type=twitter&q=' + encodeURIComponent($searchBox.val()))
  .done(function(response) {
    $magnetList.empty();
    $buildArea.empty();
    $charCount.html(140);

    var magnets = response;
    $.each(magnets, function(index, magnet) {
      var template = '<li data-text="' + magnet + '">' + magnet + '</li>'
      $magnetList.append(template)
    });

    $(function() {
      $('li')
        .draggable({ 
          cursor: '-webkit-grabbing'
          , containment: $magnetList
          , stack: '#magnet-list li'
          , connectToSortable: '#build-area'
          , scroll: false
        });
      $.each($('li'), function(index, magnet) {
        $(magnet).css('left', Math.floor(Math.random() * $(window).width()) - $(magnet).width())
        $(magnet).css('top', Math.floor(Math.random() * $magnetList.height()) - $(magnet).height())
      })
    });
  });
}