$(document).ready(function() {
  $magnetList = $('#magnet-list');

  $.get('http://localhost:3000/search?type=twitter&q=%40GA')
  .done(function(response) {
    var magnets = response;
    $.each(magnets, function(index, magnet){
      $magnetList.append('<li>' + magnet + '</li>')
    })
  })
})
