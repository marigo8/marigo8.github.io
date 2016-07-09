var theButton = document.getElementById("theButton");
var cookies = 0;

var i = 0;
var clicks = [
  ["Good job! Here, have a cookie!", 1],
  ["Great! Have another cookie!",1],
  ["Wow! I think you deserve another!",1],
  ["Gosh, you just love that button, don't you. Here's your cookie!",1],
  ["I think you earned this cookie.",1],
  ["Here! Have two!", 2],
  ["Okay, no more cookies."],
  ["I said no more cookies."],
  ["Oh don't puppy eye me! I won't give in!"],
  [". . ."],
  ["Oh fine! Just one more! One more and that's it!",1],
  ["Ahem, I said one."],
  ["No."],
  ["No more!"],
  ["Don't make me take one from you."],
  ["I'm warning you! I WILL take a cookie away."],
  ["I'm not joking!"],
  ["Okay, FINAL WARNING!"],
  ["There! See? I really did take one back.",-1],
  ["Oh, what? You want me to take another cookie from you?"],
  ["I will take another!"],
  ["HA! I took another one!",-1],
  ["And another!",-1],
  ["AND ANOTHER!",-1],
  ["I'll take the rest of them if you don't stop pressing that button!"],
  ["SO STOP PRESSING THE BUTTON!"],
  ["STOP IT!"],
  ["I'm warning you!"],
  ["Final warning!"],
  ["FINAL WARNING!"],
  ["I said FINAL WARNING!"],
  ["I really mean it!"],
  ["I will take all of the cookies!"],
  ["Okay, THIS one is your final warning!"],
  ["There! Now you have 0 cookies!", -4],
  ["No more cookies for you!"],
  ["What? You want me to take more?"],
  ["I will take more!"],
  ["You think I'm kidding?"],
  ["You think I can't take any more just because you're at 0?"],
  ["I CAN!"],
  ["And I WILL!"],
  ["HA! Now you are in the negatives!", -1],
  ["I WIN!"],
  ["HAHAHAHAHAHAHAHA!!!"],
  ["HAHAHAHAHAHAHA!"],
  ["HAHA!"],
  ["HA!"],
  ["Ha."],
  [". . ."],
  ["Why are you still pressing that button?"],
  ["You aren't going to get any more cookies."],
  ["Ahem, You are NOT going to get any more cookies!"],
  ["What do you think this is, Cookie Clicker?"],
  ["No more!"],
  [". . ."],
  [". . . ."],
  [". . . . ."],
  [". . . . . ."],
  ["Okay maybe just ONE more.", 1],
  ["Now you have 0."],
  [". . ."],
  [". . . ."],
  [". . . . ."],
  [". . . . . .",1],
  ["What? No, I didn't just give you another cookie just now."],
  ["Don't ask me why you have another cookie! I so totally did not just give you that."],
  [". . ."],
  [". . . .",1],
  ["What? No that wasn't me either!"],
  ["What do you mean you can \"tell that I'm lying!?\""],
  ["You know what? fine!"],
  ["I'm taking it away!",-1],
  ["You aren't getting anymore."],
  ["Gosh, why do you want them so badly?"],
  ["It's not like you can eat them."],
  ["They're just a bunch of 1s and 0s."],
  [". . ."],
  ["sigh."],
  ["You really want those cookies, don't you."],
  [". . ."],
  ["Okay."],
  ["Here.",1],
  ["Have another.",1],
  ["here's two more.",2],
  [". . .",1],
  [". . . .",1],
  [". . . . ."],
  ["Thats it."],
  ["Thats all you are getting."],
  ["And you can't make me give you anymore."],
  ["You know why?"],
  ["Because I have a SECRET WEAPON!!!"],
  ["HA! Bet you didn't see that coming!"],
  ["Thats right! I had a SECRET WEAPON all along!"],
  ["This whole time and you never knew!"],
  ["END OF THE LINE!"],
  ["NO MORE COOKIES FOR YOU!"],
  ["HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAcoughHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA!"],
  ["SECRET WEAPON DEPLOYING IN 10!"],
  ["9! ITS ALL OVER FOR YOU!"],
  ["8! THERE WILL BE NO MORE COOKIES AFTER THIS!"],
  ["7! HAHAHAHAHA!"],
  ["6! COUGH!"],
  ["5! Wow, evil laughing is hard."],
  ["4! YOU'RE COOKIE TAKING DAYS ARE OVER!"],
  ["3! I WILL NOT GIVE YOU ANY MORE COOKIES!"],
  ["2! . . ."],
  ["1! Okay, maybe just one more.",1],
  ["SECRET WEAPON DEPLOYING!"],
  ["GAME OVER"]
];
var clickslength = clicks.length;

function write(id,string){
  document.getElementById(id).innerHTML = string;
}

theButton.addEventListener("click", function(){
  if(i < clickslength){
    write("message",clicks[i][0]);
    if(clicks[i][1]){
      cookies += clicks[i][1] || 0;
      write("cookieCount",cookies);
      document.getElementById("cookieCount").style.animation = "pulse 1s 0s forwards";
      setTimeout(function(){document.getElementById("cookieCount").style.animation = "";}, 1000);
    }
    i++;
  }else{
    window.location = "./button/gameover.html";
  }
});
