x = 0;
y = 0;
insert_image = "";
screen_width = 0;
screen_height = 0;
speak_data = "";
number_of = 0;
ack_no = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload() {
    img = loadImage("ghost.png");
}

function start() {
    document.getElementById("status").innerHTML = "System is listening please count any number from 1 - 10";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech is recognized as: " + content;
    number_of = Number(content);
    if (Number.isInteger(number_of)) {
        document.getElementById("status").innerHTML = "Starting to draw";
        ack_no = "set";
    } else {
        document.getElementById("status").innerHTML = "Speech not recognised, please try again";
    }

}


function setup() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width, screen_height);
    canvas.position(0, 150);
}

function draw() {
    if (ack_no == "set") {
        for (var i = 1; i <= number_of; i++) {
            x= Math.floor(Math.random()* 700);
            y= Math.floor(Math.random()* 400);
            image(img, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = number_of + "ghosts created";
        ack_no = "";
        speak_data = number_of + "ghosts created";
        speak();
    }

}

function speak(){
var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
speak_data = "";
}