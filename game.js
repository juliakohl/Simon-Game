var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    level++;
    $("h1").html("Level "+level);
    var random = Math.random() * 4;
    var randomNumber = Math.floor(random);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    animatePress(this.id);
    if(userChosenColor!=gamePattern[userClickedPattern.length-1]){
        gameOver();
    }
    if(userClickedPattern.length == level){
        if(checkPattern(level)){
            userClickedPattern = [];
            setTimeout(nextSequence, 500);
        }else{
            gameOver();
        }
    }
})

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}

function checkPattern(number){
    var state;
    for(i=0;i<number;i++){
        if(userClickedPattern[i] === gamePattern[i]){
            state = true;
        }else{
            state = false;
            break;
        }
    }
    return state;
}

function gameOver(){
    level = 0;
    $("body").addClass("game-over");
    $("h1").html("Game Over! :(");
    setTimeout(function(){    
        gamePattern = [];
        userClickedPattern = [];
        $("body").removeClass("game-over");
        $("h1").html("Press A Key To Start");
    }, 3000);
}

document.addEventListener("keydown", nextSequence);
//document.addEventListener("keydown", logUserPattern);
//document.addEventListener("scroll", function(){checkPattern(userClickedPattern);});