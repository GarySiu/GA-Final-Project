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
        ui.item.css('transform', 'rotate(0deg)')
      }
      , placeholder: "ui-state-highlight"
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
            , stack: '#magnet-list li'
            , connectToSortable: '#build-area'
            , scroll: false
          });
          $magnet.css('left', event.pageX - (ui.item.width() / 2) )
          $magnet.css('top', event.pageY - 156 + (ui.item.height() / 2) )
          var randomAngle = (Math.floor(Math.random() * 10)) - 4 + 'deg'
          $magnet.css('transform', 'rotate('+ randomAngle + ')')
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
    appendMagnets(response);
    makeMagnetsDraggable();
    scatterMagnets();
  });
}

function appendMagnets(magnets) {
  $.each(magnets, function(index, magnet) {
    var template = '<li data-text="' + magnet + '">' + magnet + '</li>'
    $magnetList.append(template).hide().fadeIn('slow')
  });
}

function makeMagnetsDraggable() {
  $('li')
  .draggable({ 
    cursor: '-webkit-grabbing'
    // , containment: $magnetList
    , stack: '#magnet-list li'
    , connectToSortable: '#build-area'
    , scroll: false
  });
}

function scatterMagnets(){
  $.each($('li'), function(index, magnet) {
    var randomLeft = Math.abs(Math.floor(Math.random() * $(window).width() - ($(window).width() / 6)))
    var randomTop = Math.abs(Math.floor(Math.random() * $magnetList.height() - 50))
    var randomAngle = (Math.floor(Math.random() * 10)) - 4 + 'deg'
    $(magnet).css('left', randomLeft)
    $(magnet).css('top', randomTop)
    $(magnet).css('transform', 'rotate('+ randomAngle + ')')
  });
}
