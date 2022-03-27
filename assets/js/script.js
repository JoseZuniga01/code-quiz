var jsQuestions = [
    //questions to store 
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "DOM is an abreviation for ____",
      choices: ["Data Object Mode", "Dumb Old Man", "Document Object Model", "Dutle Opo Mipsy"],
      answer: "Document Object Model"
    },
    {
      title: "JavaScript is Textile Mark Up (TML) version of Java?",
      choices: ["True", "False"],
      answer: "False"
    },
    {
      title: "JavaScript is strongly typed language",
      choices: ["True", "False"],
      answer: "False"
    }
  ];

  // pull in page objects
let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");


// let questionEl = document.querySelector("#question")
// let answersListEl = document.querySelector("#answer-list")

// set global variables 
var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;


var questionSecElapsed = 0;
var questionInterval;

// draw instruction
init();

// var startButton = document.querySelector("#startQuiz");

// function to display instructions
function init() {
  clearDetails();
  reset();
  // creates Heading element for main page
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "This game allows you to take a timed JS quiz!";

  // creates elements with the instructions for the game
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " If you answer correctly you will score points.  If you score incorrectly you will not lose points, but you will be lose time."; 

  // adding more question - this should move into loop or function
  // creates button to start the game
  let startJsQuiz = document.createElement("button");
  startJsQuiz.setAttribute("id", "startJSQuiz");
  startJsQuiz.setAttribute("class", "btn btn-secondary");
  startJsQuiz.textContent= "Start Javascript Quiz";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startJsQuiz);


  startJsQuiz.addEventListener("click", function () {
    quizType = "Java Script";
    playQuiz(jsQuestions);
  });

}

// function to clear details element of all children
function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  quizType = "";
  score = 0;

  gameDuration = 0;
  gameSecElapsed = 0;
  gameInterval;

  questionDuration = 15;
  questionSecElapsed = 0;
  questionInterval;
}

//start game
function playQuiz(questionSet) {
  if (test) { console.log("--- playQuiz ---"); }
  // select quiz randomize questions
  
  quiz = setUpQuestions(questionSet);

  // displays timers
  timerTab.setAttribute("style", "visibility: visible;");

  // Start timers here
  gameDuration = quiz.length * 15;
  if (test) { console.log("duration g,q:",gameDuration,questionDuration); }

  startGameTimer();
  renderTime();

  //go to first question
  presentQuestion();
}

// function to get random question out of array
function setUpQuestions(arr) {
  if (test) {console.log("--- setUpQuestions ---");}

  let ranQuest = [];

  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

// function to redraw screen with  question 
function presentQuestion() {
  if (test) {console.log("--- presentQuestion ---");}
  // if (test) {console.log("cur.choices[i] " + cur.choices);}

  //reset time allows to answer question
  questionSecElapsed = 0;

  // checks for no more questions and exits
  if ( quiz.length === 0 ) {
    endOfGame();
    return;
  }

  //sets current object (cur - question) by pulling out of reducedQuiz array leaving the remaining quetions in the array
  curQuestion = quiz.pop();

  //clears html to draw questions
  clearDetails();
   
  // add question to screen
  //build out display for new item
  let question = document.createElement("h1");
  // adds data value
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  // create list as container to listen for answers
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);

  //adds answers to screen
  for( let i=0; i<curQuestion.choices.length; i++ ) {
    // creates variable for each choice item
    let listChoice = document.createElement("li");
    // adds data value
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.textContent = curQuestion.choices[i];
    //add choice to page
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur", curQuestion);}

  // get answer from user
  choiceBox.addEventListener("click", function (){
    scoreAnswer(curQuestion);
  });
  // calls for the next questions
}

function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---");}
 // ensure that the event on the li
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    // if (test) { console.log("check quiz " + quiz.length); }
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    // if (test) { console.log("selectedItem cur " , cur.answer); }
    if ( selectedItem === cur.answer ) {
      // if (test) { console.log("correct answer");}
      score += questionDuration - questionSecElapsed;
      //TODO music 
    } else {
      if (test) { console.log("wrong answer");}
      //penelty for being wrong
      gameDuration -= 10;
    }
  if (test) { console.log("sselected ",selectedItem);}
    showAnswers(cur);
    // presentQuestion();
  }
}

