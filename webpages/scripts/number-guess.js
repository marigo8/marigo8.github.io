const num1 = 1;
var num2, theNumber;
var difficulty = 2;
var points = 0;

function setNumbers(){
  do{
  num2 = Math.floor(Math.random() * difficulty + 1);
  }while(num1 >= num2);
  
  document.getElementById("num2").innerHTML = num2;
  
  do{
    theNumber = Math.floor((Math.random() * num2 + 1));
  }while(theNumber < num1);
  //console.log(theNumber);
}

function say(message,color){
  var messenger = document.getElementById("message");
  messenger.innerHTML = message;
  if(color === true){
    messenger.style.backgroundColor = "#2e9e2e";
  }else{
    messenger.style.backgroundColor = "#9e2e2e";
  }
}

function addPoints(num){
  points += num;
  var pointsID = document.getElementById("points");
  pointsID.innerHTML = points;
  if(num > 0){
    document.getElementById("addend").innerHTML = "+" + num;
    pointsID.style.animation = "pulseGreen 1s 0s forwards";
    setTimeout(function(){pointsID.style.animation = "";}, 1000);
  }else if(num < 0){
    document.getElementById("addend").innerHTML = num;
    pointsID.style.animation = "pulseRed 1s 0s forwards";
    setTimeout(function(){pointsID.style.animation = "";}, 1000);
  }else{
    document.getElementById("addend").innerHTML = num;
  }
}

function check(){
  var guess = document.getElementById("guess").value;
  if(guess === ""){
    say("Please enter a number",false);
  }else
  if(guess < num1 || guess > num2){
    say("Number is not in range",false);
  }else
  if(guess == theNumber){
    say("CORRECT",true);
    difficulty++;
    setNumbers();
    addPoints(Math.floor((difficulty / 2) + 1));
  }else{
    say("INCORRECT",false);
    addPoints(Math.floor((difficulty / 4) + 1) * -1);
  }
  return false;
}

document.querySelector("#guess").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      check();
    }
});

setNumbers();