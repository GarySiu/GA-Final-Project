$(document).ready(function() {
  $magnetList = $('#magnet-list');
  $magnetContainer = $('#magnet-container');
  $searchBox = $('#search-box');
  $searchButton = $('#search-button');

  setListeners();
  getMagnets();
})

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
      $magnetList.append('<li>' + magnet + '</li>')
    });

    $(function() {
      $( "li" ).draggable({ cursor: '-webkit-grabbing', containment: $magnetContainer, stack: '#magnet-list li'});
    });
    // $magnetContainer.append('<div id="build-area"></div>');
  });
}
