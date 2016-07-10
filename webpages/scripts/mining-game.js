function ore(name){
  this.name = name;
  this.counter = 0;
}
var rock = new ore("rock");
var coal = new ore("coal");
var iron = new ore("iron");
var silver = new ore("silver");
var gem = new ore("gem");
var gold = new ore("gold");
var diamond = new ore("diamond");
var uranium = new ore("uranium");
var fcw = new ore("fcw");
var ores = [rock,coal,iron,silver,gem,gold,diamond,uranium,fcw];

function getOre(){
  var foundOre;
  var num = 256;
  var rand = Math.floor(Math.random()*num);
  for(var i = 0, n = ores.length; i < n; i++){
    if(rand < num){
      foundOre = ores[i];
    }
    num /= 2;
  }
  foundOre.counter++;
  document.getElementById(foundOre.name).innerHTML = foundOre.counter;
}