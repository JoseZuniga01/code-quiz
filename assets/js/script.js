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

  //reset time allows to answer question
  questionSecElapsed = 0;

  // checks for no more questions and exits
  if ( quiz.length === 0 ) {
    endOfGame();
    return;
  }

  //sets current object pulling out of reducedQuiz array leaving the remaining quetions in the array
  curQuestion = quiz.pop();

  //clears html to draw questions
  clearDetails();
   
  // add question to screen
  let question = document.createElement("h1");
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  // create list as container to listen for answers
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);

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
}

function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---");}
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    if ( selectedItem === cur.answer ) {
      score += questionDuration - questionSecElapsed;
    } else {
      if (test) { console.log("wrong answer");}
      //penelty for being wrong
      gameDuration -= 10;
    }
  if (test) { console.log("sselected ",selectedItem);}
    showAnswers(cur);
  }
}

function showAnswers(cur) {
    if (test) { console.log("--- showAnswer ---"); }
    if (test) { console.log("sa qanda",cur);}
    if (test) { console.log("sselected ",selectedItem);}
  
  
    for (let i=0; i<cur.choices.length; i++) {
      if (test) { console.log("sa in for ",i);}
  
      let questid = "#questionNum-" + i;
      let questrow = document.querySelector(questid);
  
      if (test) { console.log("saf selected" + selectedItem + "<");}
      if (test) { console.log("saf color test >" +  cur.choices[i] +"<");}
  
      if ( cur.choices[i] !== cur.answer ) {
        if (test) { console.log("color test flase");}
        questrow.setAttribute("style","background-color: blue");
      } else {
        if (test) { console.log("color test true");}
        questrow.setAttribute("style","background-color: green");
      }
    }
    // pause so user can see results
    setTimeout(presentQuestion,1500);
  }
  
  // function to set time for game timer
  function setGameTime() {
    if (test) { console.log("--- setGameTime ---"); }
    if (test) { console.log("gameDuration " + gameDuration); }
    clearInterval(gameInterval);
    gameSeconds = gameDuration;
  }
  
  //set time function for game + penelty for answering incorectly 
  function renderTime() {
  
    gameTimerEl.textContent = gameDuration - gameSecElapsed;
    quesTimerEl.textContent = questionDuration - questionSecElapsed;
  
    if ( (questionDuration - questionSecElapsed) < 1 ) {
      gameDuration -= 10;
      if (test) { console.log("too slow"); }
      presentQuestion();
    } 
  
    if ( (gameDuration - gameSecElapsed) < 1 ) {
     endOfGame();
    }
  }
  
  function startGameTimer () {
    if (test) { console.log("--- startGameTimer ---"); }
    setGameTime();
  
    gameInterval = setInterval(function() {
      gameSecElapsed++; 
      questionSecElapsed++; 
      renderTime();
    }, 1000);
  }
  
  function stopTime() {
    if (test) { console.log("--- stopTime --- ");}
    gameSeconds = 0;
    questionSeconds = 0;
    clearInterval(gameInterval);
  }
// function of end of game
function endOfGame() {
    if (test) { console.log("--- endOfGame ---"); }
    stopTime();
    clearDetails();
  
    timerTab.setAttribute("style", "visibility: hidden;");
  
    let heading = document.createElement("p");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "GAME OVER";
  
    // creates elements with the instructions for the game
    let instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = " Your score is " + score; 
  
    // creates button to start the game
    let playAgain = document.createElement("button");
    playAgain.setAttribute("id", "playAgain");
    playAgain.setAttribute("class", "btn btn-secondary");
    playAgain.textContent = "Play again";
  
    // creates input for user to add initials
    let par = document.createElement("p");
  
    let initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for","userInitials");
    initialsLabel.textContent = "Enter Initials: ";
  
    let initialsInput = document.createElement("input");
    initialsInput.setAttribute("id","userInitials");
    initialsInput.setAttribute("name","userInitials");
    initialsInput.setAttribute("minlength","3");
    initialsInput.setAttribute("maxlength","3");
    initialsInput.setAttribute("size","3");
  
  
    mainEl.appendChild(heading);
    mainEl.appendChild(instructions);
    mainEl.appendChild(initialsLabel);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(par);
    mainEl.appendChild(playAgain);
  
    playAgain.addEventListener("click", init);
  
  //function to add initials 
    initialsInput.addEventListener("input", function() {
      initialsInput.value = initialsInput.value.toUpperCase();
      if ( initialsInput.value.length === 2 ) { 
  
        //create object for this score
        let thisScore = [ { type: quizType, name: initialsInput.value, score: score } ]; 
  
        //get highscores from memory
        let storedScores = JSON.parse(localStorage.getItem("highScores")); 
        if (test) { console.log("storedScore",storedScores); }
  
        if (storedScores !== null) { 
          storedScores.push(thisScore[0]); 
        } else {
          storedScores = thisScore;
        }
  
        localStorage.setItem("highScores", JSON.stringify(storedScores));
        highScores();
      }
    });
  }

  function highScores() {
    stopTime();
    clearDetails();
  
    timerTab.setAttribute("style", "visibility: hidden;");
  
    //get scores from storage
    let storedScores = JSON.parse(localStorage.getItem("highScores")); 
  
    // draw heading
    let heading = document.createElement("h2");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "Top 5 High Score Hall of Fame";
  
    mainEl.appendChild(heading);
  
    // Render a new li for each score
    if ( storedScores !== null ) {
      // sort scores
      storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);
  
      // sets the number of scores to display to 5 or the number of games played. Which ever is less
      let numScores2Display = 5;
      if ( storedScores.length < 5 ) { 
        numScores2Display = storedScores.length; 
      }
  
      for (var i = 0; i < numScores2Display; i++) {
        var s = storedScores[i];
  
        var p = document.createElement("p");
        p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
        mainEl.appendChild(p);
      }
    } else {
      var p = document.createElement("p");
      p.textContent =  "Your Initials Here!"
      mainEl.appendChild(p);
    }
      // creates button to start the game
      let playAgain = document.createElement("button");
      playAgain.setAttribute("id", "playAgain");
      playAgain.setAttribute("class", "btn btn-secondary");
      playAgain.textContent = "Play!";
    
      mainEl.appendChild(playAgain);
    
      playAgain.addEventListener("click", init);
    }
    
    highscoreDiv.addEventListener("click", highScores);
  
  