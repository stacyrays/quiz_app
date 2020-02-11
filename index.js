$(function() {
  const STORE = {
    questions: [
      {
        question:
          "Which pose promotes balance and directs your attention to the present moment (is the backbone for most other poses)?",
        answers: ["Child's pose", "Mountain pose", "Downward facing dog"],
        correctAnswer: 1,
        correctImg: "mountain.jpg",
        alt: "mountain pose image"
      },
      {
        question:
          "Which pose strengthens your legs, upper back, and shoulders?",
        answers: ["Halfmoon pose", "Chair pose", "Warrior one"],
        correctAnswer: 1,
        correctImg: "chair.jpg",
        alt: "chair pose image"
      },
      {
        question:
          "Which pose opens up your chest and shoulders, while stretching the abdominals and hip flexors?",
        answers: ["Plank pose", "Seated forward fold", "Upward facing dog"],
        correctAnswer: 2,
        correctImg: "upward.jpg",
        alt: "upward dog image"
      },
      {
        question:
          "Which pose helps improve concentration and your ability to balance by strengthening the arches of the feet and the outer hips?",
        answers: ["Tree pose", "Bound ankle pose", "Warrior two"],
        correctAnswer: 0,
        correctImg: "tree.jpg",
        alt: "tree pose image"
      },
      {
        question:
          "Which pose helps calm the mind and stretches your spine, shoulders, wrists, hips, and hamstrings?",
        answers: [
          "Dolphin pose",
          "Intense side stretch",
          "Seated forward fold"
        ],
        correctAnswer: 1,
        correctImg: "sidestretch.jpg",
        alt: "sidestretch image"
      },
      {
        question:
          "Which pose opens the entire front of the body, where it strengthens the muscles in your back, shoulders, and hamstrings? (Hint: it&#39s a backbend)",
        answers: ["Camel pose", "Wheel pose", "Mountain pose"],
        correctAnswer: 1,
        correctImg: "wheel.jpg",
        alt: "wheel pose image"
      },
      {
        question:
          "Which pose strengthens your shoulders, upper back, and abdominals?  It also promotes core and scapular stability, which is helpful if you&#39re working on inversions or arm balances...",
        answers: ["Side plank", "Warrior three", "Boat pose"],
        correctAnswer: 0,
        correctImg: "sideplank.jpg",
        alt: "sideplank image"
      },
      {
        question:
          "Which pose strengthens your legs, arms, and back muscles? It also gives your chest, shoulders, neck, thighs, and ankles a nice stretch...",
        answers: ["Warrior one", "Seated forward fold", "Dolphin pose"],
        correctAnswer: 0,
        correctImg: "warrior1.jpg",
        alt: "warrior one image"
      },
      {
        question:
          "Which pose helps build strength in your upper body in preparation for a headstand and forearm stand? It can also help calm your mind and relieve stress...",
        answers: ["Camel pose", "Bound ankle pose", "Dolphin pose"],
        correctAnswer: 2,
        correctImg: "dolphin.jpg",
        alt: "dolphin pose image"
      },
      {
        question:
          "Which pose is a &#39savasana&#39, where it relaxes the whole body and gives you space to absorb the benefits of the practice?",
        answers: ["Corpse pose", "Downward facing dog", "Tree pose"],
        correctAnswer: 0,
        correctImg: "corpse.jpg",
        alt: "corpse pose image"
      }
    ]
  };

  let score = 0;
  let questionNumber = 0;

  //update the question number
  function updateQuestionNumber() {
    questionNumber++;
  }

  //user clicks on start quiz button
  function startQuiz() {
    $(".startquiz").on("click", function(event) {
      questionNumber = 0;
      score = 0;

      //render a question
      renderAQuestion(questionNumber);
    });
  }

  //build a question
  function renderAQuestion() {
    //if questioNumber has not reached beyond STORE length then pull in a new question
    if (questionNumber < STORE.questions.length) {
      const question = STORE.questions[questionNumber].question;
      const answers = STORE.questions[questionNumber].answers;
      const questionHTML = $(`<p>
    Question <strong>${questionNumber +
      1}</strong>(of 10) &nbsp;&nbsp;&nbsp;Score
    <strong>${score}</strong>
  </p>
      <form id="js-question">
        <fieldset>
          <legend>
            ${question}
          </legend>
        </fieldset>
        <fieldset class="answers">
        ${answers
          .map(
            a => `
            <input
              type="radio"
              id="questionAnswers"
              name="questionAnswers"
              value="${a}"
              required
            />${a}<br />
         `
          )
          .join("")}<br>
        </fieldset>
        <button type="submit">Submit Answer</button>
      </form>`);
      $(".enter").html(questionHTML);
    } else {
      //if questionNumber has reached final one, then load the final results
      loadFinalResult();
    }
  }

  //answer a question and check if it's correct or not
  function answerQuestion() {
    $(".enter").on("submit", function(event) {
      event.preventDefault();

      //gather variables for correctAnswer etc
      const correctAnswer =
        STORE.questions[questionNumber].answers[
          STORE.questions[questionNumber].correctAnswer
        ];
      const correctImg = STORE.questions[questionNumber].correctImg;
      const correctAlt = STORE.questions[questionNumber].alt;
      const answerChoice = $("input:checked").val();

      //based on if answerChoice is correctAnswer then show the correct html
      if (answerChoice === correctAnswer) {
        console.log("correct is runing");
        score++;
        const resultHTML = $(`
        <p>
        Question <strong>${questionNumber +
          1}</strong>(of 10) &nbsp;&nbsp;&nbsp;Score
        <strong>${score}</strong>
      </p><img
    src="images/${correctImg}"
    alt="${correctAlt}"
    width="300"
    height="195.82"
  />
  <p>You got it right! The correct answer is ${correctAnswer}</p>
  <button class="next">Next Question</button>`);

        //replace the html with this content
        $(".enter").html(resultHTML);

        //call next question
        nextQuestion();
      } else {
        const resultHTML = $(`
        <p>
        Question <strong>${questionNumber +
          1}</strong>(of 10) &nbsp;&nbsp;&nbsp;Score
        <strong>${score}</strong>
      </p><img
        src="images/${correctImg}"
    alt="${correctAlt}"
    width="300"
    height="195.82"
  />
  <p>Sorry you got it wrong! The correct answer is ${correctAnswer}</p>
  <button class="next">Next Question</button>`);

        //replace the html with this content
        $(".enter").html(resultHTML);

        //call next question function
        nextQuestion();
      }
      //update the question numer to the next one
      updateQuestionNumber();
    });
  }

  //loads the next question
  function nextQuestion() {
    $(".enter").on("click", "button.next", function(event) {
      event.preventDefault();
      renderAQuestion(questionNumber);
    });
  }

  //load final results
  function loadFinalResult() {
    let finalResultHTML = `<img
      src="images/win.jpg"
      alt="awesome strong plank pose"
      width="300"
      height="195.82"
    />
    <p>Your score is ${score}! You are a brilliant yogi!</p>
    <button class="restart">Restart Quiz</button>`;

    if (score <= 5) {
      finalResultHTML = `<img
        src="images/lose.jpg"
        alt="sad dog face"
        width="300"
        height="195.82"
      />
      <p>Your score is ${score}! You need more practice :(</p>
      <button class="restart">Restart Quiz</button>`;
    }
    //replace html with new final result
    $(".enter").html(finalResultHTML);

    $(".enter").on("click", ".restart", function(event) {
      restartQuiz();
    });
  }
  function restartQuiz() {
    const restartHTML = `<h2>
    Test your knowledge on yoga poses
  </h2>
  <button class="startquiz">Start Quiz</button>`;
    $(".enter").html(restartHTML);
    startQuiz();
  }
  //prep callout of functions for app
  function handleQuizApp() {
    startQuiz();
    answerQuestion();
  }
  //call out the top level funtion to run app
  $(handleQuizApp());
});
