# create a timed quiz 
need to create a timed quiz that test's users javascript knowledge and compares them to other class mates
# started by creating HTML 
need to create the skeleton of the webpage with HTML and link my JS file and CSS style sheet
# craete css style sheet 
set some global parameters for entire quiz like font, color scheme, media queriers etc
# Build out Java question bank 
create 5 questions around java and place them on top as a global variable i will call out to when game begins 
# set all global variables 
set all global variables i will need for game on top of page to easily be able to call out in functions. Such as game scores, game duration, etc 
# build out instruction function
this function will append into the HTML and tell the user how the game works and how the point system will be kept. I also added the start game function here as well
# create start game function 
user will have 15 seconds per question to finish the quiz. when timer runs out user is out of time and quiz is over
# crete function to pull questions from global Var
make it a random array where a random question is drawn, when answered user is presented with a nother question until there are not more questions left. will do this ith a for loop. each new question needs to be appended to HTML code so it can populate on screen 
# create list to listen to user answers 
need to use event listeners to captue user responses. as sooon as user 'clicks' an snwer I will capture responses and instruct code to move to next question set.
# create function to test answers 
take data clciks input by users and test agaisnt the right answer. penelize users by subtracting from time when they answer wrong 
# function for timer 
create timer to start once quiz has begun. when timer hit 0, the quiz is over and end game
# create function to end game 
once timer has run out or questions have ran out the game ends. at the end of game create input for users to be able to add thier initials 
# create function to reset game 
reset all parameters back to original once game is over and user hit's play again. add listener to know when users clicks on our generated button to play again. 

you can visit the quiz here: https://josezuniga01.github.io/code-quiz/ 

you can see the deployed quiz app here: ![alt text](./assets/images/Screen%20Shot%202022-03-27%20at%2010.40.24%20AM.png)
