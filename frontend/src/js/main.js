$(document).ready(function() {
  $magnetList = $('#magnet-list');
  $magnetContainer = $('#magnet-container');

  $.get('http://localhost:3000/search?type=twitter&q=%40velocikitty')
  .done(function(response) {
    var magnets = response;
    $.each(magnets, function(index, magnet) {
      $magnetList.append('<li>' + magnet + '</li>')
    });

    $(function() {
      $( "li" ).draggable({ cursor: 'move', containment: $magnetContainer, stack: '#magnet-list li'});
    });

    $magnetContainer.append('<div id="build-area"></div>')
  })
})
