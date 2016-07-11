var noun = ["NOUN"], pnoun = ["PLURAL NOUN"];

var verb = ["VERB"], verbing = ["VERB ENDING WITH \"ING\""], verbed = ["VERB (PAST TENSE)"];

var adj = ["ADJECTIVE"];

var stunt = ["A STUNT"], city = ["CITY NAME"];


var libs = [
  ["Once, there was a ",noun," that hated all ",pnoun,"."],
  ["Holy ",verbing," ",noun,"! That ",noun," just did a ",stunt," off of that ",noun,"!"],
  ["One day, a ",noun," was walking down a street in ",city,". Then, all of the sudden, a ",adj," ",noun," jumped out of nowhere and ",verbed," it."]
];
var libNum = Math.floor(Math.random() * libs.length);
var lib = libs[libNum];

var words;
var storyCount = 0;

var isNewForm = false;

function formElement(string){
  var newElement = document.createElement("input");
  newElement.setAttribute("type","text");
  newElement.setAttribute("placeholder",string);
  newElement.setAttribute("class","word");
  if(isNewForm){
    newElement.style.animation = "fadeIn 2s 0s forwards"
  }
  document.getElementById("inputs").appendChild(newElement);
}

var varcount;
function setUpForm(){
  varcount = 0;
  for(var i = 0, n = lib.length; i < n; i++){
    if(typeof lib[i] == "object"){
      formElement(lib[i][0]);
      varcount++;
    }
  }
}
function publishStory(){
  var story = "";
  for(var i = 0, n = lib.length, w = 0; i < n; i++){
    if(typeof lib[i] == "string"){
      story += lib[i];
    }else{
      story += words[w];
      w++;
    }
  }
  console.log(story);
  storyCount++;
  var section = document.createElement("section");
  var heading = document.createElement("h2");
  var paragraph = document.createElement("p");
  
  heading.innerHTML = "STORY "+storyCount;
  paragraph.innerHTML = story;
  section.appendChild(heading);
  section.appendChild(paragraph);
  document.getElementsByTagName("body")[0].appendChild(section);
}
function getWords(){
  words = [];
  var inputs = document.getElementsByClassName("word");
  for(var i = 0; i < varcount; i++){
    if(inputs[i].value){
      words.push(inputs[i].value);
    }else{
      return false;
    }
  }
  publishStory();
}
function changeLib(){
  document.getElementById("inputs").innerHTML = "";
  do{
    var newLibNum = Math.floor(Math.random() * libs.length);
  }while(newLibNum == libNum);
  libNum = newLibNum
  lib = libs[libNum];
  isNewForm = true;
  setUpForm();
}

setUpForm();