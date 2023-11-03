let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function (event) {
    
    if (event.key === "Enter") {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    }

});

$(".btn").click(function () {
    if (started === true) {
        let userChosenColour = $(this).attr("id");
        // console.log(this);
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over") }, 200);

        $("#level-title").text("Game Over, Press Enter to Restart");
        startOver();


    }
}


function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

