//  abreviations
var br = "<br>";
var wwyd = "WHAT WILL YOU DO?";

// variables
var rooms = [];
var commands = [];
var currentRoom;
var currentEntity;
var help = ["None of these commands are case-sensitive."+br,
            "(\"help\" | \"h\"): Displays this message."+br,
            "(\"inventory\" | \"inv\" | \"i\"): Displays the items in your inventory."+br,
            "(\"take\" | \"t\") (ITEM): Adds the specified ITEM to your inventory."+br,
            "(\"use\" | \"u\") (ENTITY): Activates or opens the specified ENTITY.",
            "&mdash; Entities include boxes, doors, people, etc."+br,
            "(\"restart\"): Restarts the game."];

//  DOM elements
var place = document.getElementById("place");
var message = document.getElementById("message");
var subplace = document.getElementById("subplace");
var submessage = document.getElementById("submessage");
var terminal = document.getElementById("terminal");
var commandLine = document.getElementById("commandLine");


// constructors
function room(name,message,nextRoom,exitLock,entities,items,subrooms){
  this.name = name;
  this.message = message;
  this.nextRoom = nextRoom;
  this.exitLock = exitLock || false;
  this.entities = entities || [];
  this.items = items || [];
  this.subrooms = subrooms || [];
  rooms.push(this);
}
function subroom(message,name,entities,items,subrooms){
  this.message = message;
  this.entities = entities || false;
  this.items = items || false;
  this.subrooms = subrooms || false;
}
function entity(name,type,value,lock){
  this.name = name;
  this.type = type;
  this.value = value || false;
  this.lock = lock || false;
}
function item(name,type,value){
  this.name = name;
  this.type = type;
  this.value = value || false;
}

// object construction
var player = {
  inventory: []
}

//  end
var end = new room("game over",["YOU WIN!"]);

var key2a = new item("square key","key");
var cupcake = new item("cupcake","misc");
var door2 = new entity("door","message",["The guard does not let you through."]);
var chest2a = new entity("iron box","box",[cupcake],[key2a]);
var chest2b = new entity("wooden box","box",[key2a]);
var guard2a = new entity("guard","bribe",end,[cupcake]);
var room2 = new room("room 2",["You continue to the next room.","There are two boxes: an "+chest2a.name+" and a "+chest2b.name+".","There is a "+door2.name+" that leads to the next room but it is being guarded by a "+guard2a.name+"."],end,guard2a,[chest2a,chest2b,guard2a,door2]);

//  room0
var key1a = new item("circle key","key");
var door1 = new entity("door","door",room2,[key1a]);
var chest1a = new entity("box","box",[key1a]);
var room1 = new room("room 1",["You enter a dungeon.","There is a "+chest1a.name+" and a "+door1.name+"."],room2,door1,[chest1a,door1]);

// functions
function getCommand(){
  if(commandLine.value === ""){
    return false;
  }
  var command = commandLine.value.toLowerCase().split(" ");
  var param2 = ""
  for(var p = 1, c = command.length; p < c; p++){
    param2 += command[p];
    if(p != c - 1){
      param2 += " ";
    }
  }
  command = [command[0],param2];
  
  var incorrectSyntax = false;
  var success = false;
  switch(command[0]){
    case "use":
    case "u":
      for(var i = 0, entities = currentRoom.entities, n = entities.length; i < n && !success; i++){
        if(command[1] == entities[i].name){
          success = true;
          switch(entities[i].type){
            case "box":
              var locked = false;
              var key;
              if(entities[i].lock){
                locked = true;
                for(var j = 0, m = player.inventory.length; j < m; j++){
                  if(player.inventory[j] == entities[i].lock[0]){
                    key = player.inventory[j];
                    locked = false;
                  }
                }
              }
              if(!locked){
                loadBox(entities[i]);
                if(entities[i].lock){
                  terminal.innerHTML = "You unlock the "+entities[i].name+" with the "+key.name+".";
                  removeFromInv(key);
                }
              }else{
                terminal.innerHTML = "It's locked.";
              }
              break;
            case "door":
              loadDoor(entities[i],entities[i].value);
              break;
            case "bribe":
              var hasBribe = false;
              for(var j = 0, m = player.inventory.length; j < n; j++){
                if(player.inventory[j] == entities[i].lock[0]){
                  hasBribe = true;
                  loadRoom(entities[i].value);
                  terminal.innerHTML = "The "+entities[i].name+" accepts your "+player.inventory[j].name+" as a bribe and lets you through.";
                  removeFromInv(player.inventory[j]);
                }
              }
              if(!hasBribe){
                terminal.innerHTML = "The "+entities[i].name+" ignores you.";
              }
              break;
            case "message":
              printList(terminal,entities[i].value,false);
          }
        }
      }
      if(!success){
        terminal.innerHTML = "Use the... what?";
        incorrectSyntax = true;
      }
      break;
      
    case "take":
    case "t":
      var items;
      if(currentEntity){
        items = [currentEntity.value,currentRoom.items];
      }else{
        items = [currentRoom.items];
      }
      for(var i = 0, n = items.length; i < n; i++){
        for(var j = 0, m = items[i].length; j < m; j++){
          if(command[1] == items[i][j].name){
            add2Inv(items[i],items[i][j]);
            success = true;
          }
        }
      }
      if(!success){
        terminal.innerHTML = "Umm... That item doesn't exist.";
        incorrectSyntax = true;
      }
      break;
      
    case "inventory":
    case "inv":
    case "i":
      subplace.className = "visible";
      subplace.innerHTML = "INVENTORY";
      terminal.innerHTML = "You check your inventory";
      if(player.inventory.length > 0){
        printList(submessage, player.inventory,true);
      }else{
        submessage.innerHTML = "[NO ITEMS]";
      }
      break;
      
    case "help":
    case "h":
      printList(terminal,help,false);
      break;
      
    case "restart":
      if(confirm("Do you really want to RESTART? Your progress will not be saved.")){
        window.location = "./dungeon-game.html";
        terminal.innerHTML = "Unable to restart... for some reason. Try enabling pop-ups. Otherwise, just hit your browser's refresh button."
      }
      break;
    default:
      terminal.innerHTML = "I don't know what that means. Try typing \"help\" (or \"h\") for help";
      incorrectSyntax = true;
  }
  if(incorrectSyntax){
    commandLine.placeholder = commandLine.value;
  }else{
    commandLine.placeholder = wwyd;
  }
  commandLine.value = "";
}

function printList(domElement, array, requireDotName){
  var fullMessage = "";
  for(var i = 0, n = array.length; i < n; i++){
    if(requireDotName){
      fullMessage += array[i].name + br;
    }else{
      fullMessage += array[i] + br;
    }
  }
  domElement.innerHTML = fullMessage;
}

function unloadEntity(){
  subplace.className = "hidden";
  currentEntity = undefined;
  subplace.innerHTML = "";
  submessage.innerHTML = "";
}

function loadRoom(room){
  currentRoom = room;
  unloadEntity();
  // print
  place.innerHTML = room.name.toUpperCase();
  printList(message, room.message, false);
}

function loadBox(box){
  unloadEntity();
  subplace.className = "visible";
  currentEntity = box;
  
  terminal.innerHTML = "You open the "+box.name;
  subplace.innerHTML = box.name.toUpperCase();
  if(box.value.length > 0){
    printList(submessage,box.value,true);
  }else{
    submessage.innerHTML = "[NO ITEMS]";
  }
}

function loadDoor(door,room){
  unloadEntity();
  currentEntity = door;
  if(door.lock){
    var doorIsLocked = true;
    for(var i = 0, n = player.inventory.length; i < n; i++){
      if(player.inventory[i] == door.lock[0]){
        terminal.innerHTML = "You unlock the "+door.name+" with the "+player.inventory[i].name+".";
        removeFromInv(player.inventory[i]);
        doorIsLocked = false;
        loadRoom(room);
      }
    }
    if(doorIsLocked){
      terminal.innerHTML = "It's locked."
    }
  }else{
    terminal.innerHTML = "You go through the door";
    loadRoom(room);
  }
  
}

function add2Inv(box,item){
  for(var i = 0, n = box.length; i < n; i++){
    if(box[i] == item){
      player.inventory.push(item)
      box.splice(i,1);
      if(box.length > 0){
        printList(submessage,box,true);
      }else{
        submessage.innerHTML = "[NO ITEMS]";
      }
      terminal.innerHTML = "You take the "+item.name+"!";
    }
  }
}

function removeFromInv(item){
  for(var i = 0, n = player.inventory.length; i < n; i++){
    if(player.inventory[i] == item){
      player.inventory.splice(i,1);
    }
  }
}

// events
commandLine.addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
      getCommand();
    }
});

// execution
loadRoom(room1);
