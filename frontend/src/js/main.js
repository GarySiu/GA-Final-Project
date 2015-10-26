$(document).ready(function(){
  // console.log('Hello world!')
  $.get('http://localhost:3000/search?type=twitter&q=%40GA')
  .done(function(response){
    console.log(response)
  })
})
