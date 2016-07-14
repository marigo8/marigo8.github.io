var lose = false;

var monsters = [];
function monster(name,minHP,maxHP,minATK,maxATK){
  this.name = name;
  this.hp = [minHP,maxHP];
  this.atk = [minATK,maxATK];
  monsters.push(this);
}
var dragon = new monster("DRAGON",10,20,5,7);
var wolf = new monster("WOLF",3,6,2,5);
var goblin = new monster("GOBLIN",2,3,6,8);
var witch = new monster("WITCH",3,7,3,6);
var zombie = new monster("ZOMBIE",2,5,2,5);
var troll = new monster("TROLL",7,9,4,6);
var drImpossible;

function item(name,type,property){
  this.name = name;
  this.type = type;
  switch(type){
    case "weapon":
      this.dmg = property;
      break;
    case "armor":
      this.def = property;
      break;
    case "potion":
      this.eff = property;
      break;
    default:
      console.log("item type: "+type+" not recognized");
      break;
  }
}
var woodenSword = new item("WOODEN SWORD", "weapon", 1);
var hpPotion = new item("HEALTH POTION", "potion", [5,8]);
var ironSword = new item("IRON SWORD", "weapon", 2);
var excaliber = new item("EXCALIBER", "weapon", 50);

var player = {
  hp: 20,
  maxHp: 20,
  atk: [1,2],
  weapon: woodenSword,
  level: 1,
  exp: 0
};

var mslain = 0;

function useItem(button,item){
  if(lose){
    return false;
  }
  
  li = button.parentElement;
  
  if(item.type == "potion"){
    var eff = randBetween(item.eff)
    var temp = player.hp;
    player.hp += eff;
    if(player.hp > player.maxHp){
      player.hp = player.maxHp;
      eff = player.hp - temp;
    }
    narrate("You use the "+item.name+". You restore "+eff+" HP!");
  }else if(item.type == "weapon"){
    addToInv(player.weapon);
    player.weapon = item;
    narrate("You equip the "+item.name+".");
  }
  li.removeChild(button);
  document.getElementById("inventory").removeChild(li);
  update();
  if(monsterHP > 0){
    changeButton("action","CONTINUE",function(){monsterAttack();});
  }else{
    changeButton("action","CONTINUE",function(){setStage();});
  }
}

function addToInv(item){
  
  var li = document.createElement("li");
  li.className = "item";
  var button = document.createElement("button");
  
  button.innerHTML = item.name;
  button.onclick = function(){useItem(this,item);};
  button.style.animation = "fadeIn 2s 0s forwards";
  
  li.appendChild(button);
  document.getElementById("inventory").appendChild(li);
  narrate("You found a "+item.name+"!");
  changeButton("action","CONTINUE",function(){setStage();});
}

function loot(){
  var luck = randBetween([0,10]);
  var found;
  if(mslain == 50){
    found = excaliber;
    drImpossible = new monster("DR. IMPOSSIBLE",1,100,1,100);
  }else{
    switch(luck){
      case 0:
        found = ironSword;
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        found = hpPotion;
        break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        found = false;
        break;
    }
  }
  if(found){
    addToInv(found);
  }else{
    setStage();
  }
}
function addExp(amount){
  leveledUp = false;
  player.exp += amount;
  while(player.exp >= player.level*2){
    player.exp -= player.level*2;
    player.level++;
    player.hp++;
    player.maxHp++;
    player.atk[1]++;
    narrate("You leveled up to: "+player.level);
    leveledUp = true;
  }
  if(leveledUp === false){
    narrate("You gain "+amount+" exp!");
  }
  update();
  changeButton("action","CONTINUE",function(){loot();});
}

function narrate(message){
  document.getElementById("narration").innerHTML = message;
}

function changeButton(id,text,newfunction){
  var button = document.getElementById(id);
  button.innerHTML = text;
  button.onclick = newfunction;
}

function randBetween(array){
  return Math.floor(Math.random() * (array[1] - array[0] + 1) + array[0]);
}

var currentMonster,monsterMaxHP,monsterHP,monsterMaxATK,monsterATK;

function update(){
  document.getElementById("monsterHP").max = monsterMaxHP;
  document.getElementById("monsterHP").value = monsterHP;
  document.getElementById("playerHP").value = player.hp;
  document.getElementById("playerHP").max = player.maxHp;
  document.getElementById("playerATK").innerHTML = player.atk[1] + player.weapon.dmg;
  document.getElementById("mslain").innerHTML = mslain;
  document.getElementById("level").innerHTML = player.level;
  document.getElementById("exp").max = player.level * 2;
  document.getElementById("exp").value = player.exp;
  document.getElementById("weapon").innerHTML = player.weapon.name;
}

function setStage(){
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
  document.getElementById("monsterName").innerHTML = currentMonster.name;
  narrate("You encounter a "+currentMonster.name+"!");
  
  monsterMaxHP = randBetween(currentMonster.hp);
  monsterHP = monsterMaxHP;
  update();
  changeButton("action","ATTACK",function(){attackMonster(randBetween(player.atk) + player.weapon.dmg);})
}

function attackMonster(atk){
  var crit = false;
  if(randBetween([1,10]) == 1){
    crit = true;
    atk *= 2;
  }
  monsterHP -= atk;
  var message = "You attack the "+currentMonster.name+". You do "+atk+" damage. "
  if(crit === true){
    message += "IT'S A CRITICAL HIT! "
  }
  if(monsterHP <= 0){
    narrate(message + "The "+currentMonster.name+" has been slain!");
    mslain++;
    changeButton("action","CONTINUE",function(){addExp(1);});
  }else{
    narrate(message);
    changeButton("action","CONTINUE",function(){monsterAttack();});
  }
  update();
}

function monsterAttack(){
  var atk = randBetween(currentMonster.atk);
  player.hp -= atk;
  console.log(atk);
  console.log(player.hp);
  update();
  if(player.hp <= 0){
    narrate("The "+currentMonster.name+" attacks you. It does "+atk+" damage. YOU HAVE BEEN SLAIN!<br>Monsters killed: "+mslain);
    lose = true;
    changeButton("action","START OVER",function(){startOver();});
  }else{
    narrate("The "+currentMonster.name+" attacks you. It does "+atk+" damage.");
    changeButton("action","ATTACK",function(){attackMonster(randBetween(player.atk) + player.weapon.dmg);});
  }
}
setStage();

function startOver(){
  player.hp = 20;
  player.maxHp = 20;
  player.atk = [1,3];
  mslain = 0;
  player.weapon = woodenSword;
  player.level = 1;
  player.exp = 0;
  document.getElementById("inventory").innerHTML = "";
  setStage();
  lose = false;
  changeButton("action","ATTACK",function(){attackMonster(randBetween(player.atk) + player.weapon.dmg);});
}