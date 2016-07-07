

function db(message){
  console.log(message);
}

function openPage (url){
  var elements = document.getElementsByTagName("*");
  for(var i = 0, n = elements.length; i < n; i++){
    elements[i].style.animation = "fadeOut .5s 0s forwards";
  }
  document.getElementsByTagName("body")[0].style.animation = "darkenBackground .5s 0s forwards";
  setTimeout(function(){window.location = url;}, 500);
}