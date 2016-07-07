

function db(message){
  console.log(message);
}

function openPage (url){
  db("function called"); 
  var elements = document.getElementsByTagName("*");
  db("got elements");
  db(elements);
  db("\n");
  for(var i = 0, n = elements.length; i < n; i++){
    db("LOOP "+i);
    elements[i].style.animation = "fadeOut .5s 0s forwards";
    db("set animation");
    db("\n");
  }
  document.getElementsByTagName("body")[0].style.animation = "darkenBackground .5s 0s forwards";
  db("navigating");
  setTimeout(function(){window.location = url;}, 500);
}