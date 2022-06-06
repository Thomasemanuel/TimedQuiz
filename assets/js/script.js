
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
        questionResultEl.innerHTML = "";
      
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
        if (questionIndex === questions.length) {score =time;
          time = 0;
        }
        renderQuestion();
      }
      
      function checkAnswer(event) {
        clearInterval(intervalId);
        if (event.target.matches("button")) {
          var answer = event.target.textContent;
          if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            correctCount++;
          } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 15;
            timerEl.textContent = time;
          }
          
          console.log(questions[questionIndex].answer);
          console.log(answer);
        }
        // flash resulton page for 2 seconds
        resultEl.setAttribute("class", "result");
        setTimeout(function() {
          resultEl.setAttribute("class", "result hide");
        }, 2000);
        nextQuestion();
       
      }
      //start button
      startBtn.onclick = startQuiz