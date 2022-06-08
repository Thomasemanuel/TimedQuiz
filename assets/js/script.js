
      var questions = [
        {
          question: "Commonly used data types DO NOT include:",
          choices: ["strings", "booleans", "alerts", "numbers"],
          answer: "alerts",
        },
        {
          question:
            "The condition in an if / else statement is enclosed within ____.",
          choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
          answer: "parentheses",
        },
      ];
      
      var questionsEl = document.querySelector("#questions");
      var questionEl =document.querySelector("#question");
      var optionListEl = document.querySelector("#option-list");
      var questionResultEl = document.querySelector("#question-result");
      var timerEl = document.querySelector("#time");
      var startBtn = document.querySelector("#start");
      var resultEl = document .querySelector("#question-result");
      var saveBtn = document.querySelector("#save");
      var initialsEl = document.getElementById('initials');
      var clearBtn = document.getElementById("clear");
      

      var score =0;
      var questionIndex = 0;
      var correctCount = 0;
      
      var time = 75;
      var intervalId 

      //start quiz 
      function startQuiz(event){
        //hide start screen
        var startScreenEl=document.querySelector("#start-screen")
        startScreenEl.setAttribute("class", "hide")
        //show questions
        questionsEl.removeAttribute("class");

        //call renderquestion
        renderQuestion();
      }
      function endQuiz() {
        time = 1;
        //stop clock
        clearInterval(intervalId);
         // hide questions section
        questionsEl.setAttribute("class", "hide");
        // show end screen
        var endScreenEl = document.querySelector("#end-screen");
        endScreenEl.removeAttribute("class");
        // show final score
        var finalScoreEl = document.querySelector("#score");
        finalScoreEl.textContent = score;

 
      }
      
      function updateTime() {
        time--;
        timerEl.textContent = time;
        
        if (time <= 0) {

          endQuiz();
        }
      }
      
      function renderQuestion() {
        if (time == 0) {
          updateTime();
          return;
        }
        
      
        intervalId = setInterval(updateTime, 1000);
        
        questionEl.textContent = questions[questionIndex].question;
      
        optionListEl.innerHTML = "";
      
        var choices = questions[questionIndex].choices;
        var choicesLenth = choices.length;
      
        for (var i = 0; i < choicesLenth; i++) {
          var questionListItem = document.createElement("button");
          //show number in button
          questionListItem.textContent =  choices[i];
          //event listener for clicking answer
          optionListEl.addEventListener("click", checkAnswer);
          //show on page
          optionListEl.append(questionListItem);
          
          
        }

      }
      
      function nextQuestion() {
        questionIndex++;
        if (questionIndex === questions.length) {
          score =time;
          endQuiz();
        }
        renderQuestion();
      }
      
      function checkAnswer(event,) {
        clearInterval(intervalId);
        if (event.target.matches("button")) {
          var answer = event.target.textContent;
          if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            
          } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 15;
            timerEl.textContent = time;
          }
          
          console.log(questions[questionIndex].answer);
          console.log(answer);
        }
        // flash resulton page fora second
        resultEl.setAttribute("class", "result");
        setTimeout(function() {
          resultEl.setAttribute("class", "result hide");
        }, 1000);
        nextQuestion();
      }

       //clear highscores
       function clearHighscores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
      }  

      function printScores(){
        
        //get scores from local storage
        var highscores = JSON.parse(window.localStorage.getItem("highscores"));
        //sort highscores by descending order
        highscores.sort(function(a, b){return b.score - a.score;});
        //each score is an li element
        highscores.forEach(function(userData){
        var scores =document.createElement('li');
        scores.textContent= userData.initials + ' - ' + userData.score;
        //add to page
        var  scoresList = document.querySelector("#highscores")
        scoresList.appendChild(scores);
        });
         //clear button
        clearBtn.onclick = clearHighscores;
      }

        function saveScore(){
          var highscores = JSON.parse(window.localStorage.getItem("highscores")) ;
          var initials = initialsEl.value.trim();
          console.log(initialsEl);
          console.log(initials);
          //if empty alert
          if (initials.length === 0){
            alert("You need to enter at least one initial!");
            endQuiz();
          }else{
            var highscores =JSON.parse(window.localStorage.getItem("highscores"))|| [];
            // format new entry to be saved for user
               var userData ={
                score: score,
                initials: initials
              };

              console.log(userData);
              highscores.push(userData);
              // save to localstorage
              window.localStorage.setItem("highscores", JSON.stringify(highscores));
              // redirect to next page
              window.location.href = "highscores.html";
              
          }
        }     
        
      //start button
      startBtn.onclick = startQuiz;

      // user clicks button to submit initials
      saveBtn.onclick = saveScore;

