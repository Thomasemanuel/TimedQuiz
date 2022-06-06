
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
      var timerEl = document.querySelector("#timer");
      var startBtn = document.querySelector("#start");
      var questionIndex = 0;
      var correctCount = 0;
      
      var time = 200;
      var intervalId;

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
        var body = document.body;
        body.innerHTML = "Game over, You scored " + correctCount;
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
          questionListItem.textContent = i + 1 + ". " + choices[i];
          //event listener for clicking answer
          optionListEl.addEventListener("click", checkAnswer);
          //show on page
          optionListEl.append(questionListItem);
          
        }
      }
      
      function nextQuestion() {
        questionIndex++;
        if (questionIndex === questions.length) {
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
            time = time - 2;
            timerEl.textContent = time;
          }
        }
        setTimeout(nextQuestion, 2000);
      }
      //start button
      startBtn.onclick = startQuiz