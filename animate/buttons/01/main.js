/*
Inspiration came from the Dribble shot
"Cut Copy Share Delete"
by Srikant Shetty
https://dribbble.com/shots/2428762-Cut-Copy-Share-Delete
*/
$('button').on('click',function(){
    $(this)
      .addClass("is-active")
      .delay(800)
      .queue(function(){
        $(this).removeClass("is-active").dequeue();
      });
  });
