const DIGITLENGTH = 3;


var display = [" _   _     _   _ ",
               "|_| |_| . |_| |_|",
               "|_| |_| . |_| |_|"];
var columns = ["a","b","c"];

var numbers = [];
function num(a,b,c){
  this.a = a;
  this.b = b;
  this.c = c;
  numbers.push(this);
}

var num0 = new num([0,1,0],
                   [1,0,1],
                   [1,1,1]);

var num1 = new num([0,0,0],
                   [0,0,1],
                   [0,0,1]);

var num2 = new num([0,1,0],
                   [0,1,1],
                   [1,1,0]);

var num3 = new num([0,1,0],
                   [0,1,1],
                   [0,1,1]);

var num4 = new num([0,0,0],
                   [1,1,1],
                   [0,0,1]);

var num5 = new num([0,1,0],
                   [1,1,0],
                   [0,1,1]);

var num6 = new num([0,1,0],
                   [1,1,0],
                   [1,1,1]);

var num7 = new num([0,1,0],
                   [1,0,1],
                   [0,0,1]);

var num8 = new num([0,1,0],
                   [1,1,1],
                   [1,1,1]);

var num9 = new num([0,1,0],
                   [1,1,1],
                   [0,1,1]);

var colon = [["b",8],
             ["c",8]];

var timeRemaining;

function setUp(){
  for(var i = 0, n = 3; i < n; i++){
    var pre = document.getElementById(columns[i]);
    for(var j = 0, m = display[i].length; j < m; j++){
      var span = document.createElement("span");
      span.id = columns[i] + j;
      span.className = false;
      span.innerHTML = display[i][j];
      pre.appendChild(span);
    }
  }
}


function getTime(){
  do{
    initial = prompt("How many minutes?");
  }while((initial > 0) === false || initial > 99);
  
  timeRemaining = {
    minutes: parseInt(initial),
    seconds: 0
  };
}

function subtractTime(){
  if(timeRemaining.seconds > 0){
    timeRemaining.seconds--;
  }else{
    if(timeRemaining.minutes > 0){
      timeRemaining.minutes--;
      timeRemaining.seconds = 59;
    }else{
      return true;
    }
  }
  return false;
}

function countDown(){
  var interval = setInterval(function(){
    print();
    if(subtractTime()){
      clearInterval(interval);
      alert("TIMES UP!");
    }
    console.log(timeRemaining.minutes + ":" + timeRemaining.seconds);
  },1000);
}

function setClass(coordinates,value){
  var span = document.getElementById(coordinates[0]+coordinates[1]);
  if(value === 0){
    span.className = false;
  }else{
    span.className = true;
  }
}

function print(){
  var minutes = getNumber(timeRemaining.minutes);
  var seconds = getNumber(timeRemaining.seconds);
  
  column = 0;
  
  // minutes first digit
  printDigit(minutes[0], column);
  column += DIGITLENGTH + 1;
  // minutes second digit
  printDigit(minutes[1], column);
  column += DIGITLENGTH + 1;
  // colon
  if(document.getElementById(colon[0][0]+colon[0][1]).className === "true"){
    setClass(colon[0],0);
    setClass(colon[1],0);
  }else{
    setClass(colon[0],1);
    setClass(colon[1],1);
  }
  column += 2;
  // seconds first digit
  printDigit(seconds[0], column);
  column += DIGITLENGTH + 1;
  // seconds second digit
  printDigit(seconds[1], column);
}
function printDigit(digit, colNum){
  for(var i = 0; i < DIGITLENGTH; i++){
    console.log(digit.a[i]);
    setClass(["a",i+colNum],digit.a[i]);
    setClass(["b",i+colNum],digit.b[i]);
    setClass(["c",i+colNum],digit.c[i]);
  }
}

function getNumber(number){
  var output = [];
  var string = number.toString();
  if(string.length < 2){
    output.push(num0);
  }
  for(var i = 0, n = string.length; i < n; i++){
    for(var j = 0, m = numbers.length; j < m; j++){
      if(string[i] == j){
        output.push(numbers[j]);
      }
    }
  }
  return output;
}

setUp();
getTime();
countDown();