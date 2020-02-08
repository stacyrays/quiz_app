$(function() {
  const STORE = {
    questions: [
      {
        question:
          "Which pose promotes balance and directs your attention to the present moment (is the backbone for most other poses)?",
        answers: ["Child's pose", "Mountain pose", "Downward facing dog"],
        correctAnswer: 1,
        correctImg: "mountain.jpg"
      },
      {
        question:
          "Which pose strengthens your legs, upper back, and shoulders?",
        answers: ["Halfmoon pose", "Chair pose", "Warrior one"],
        correctAnswer: 1,
        correctImg: "chair.jpg"
      },
      {
        question:
          "Which pose opens up your chest and shoulders, while stretching the abdominals and hip flexors?",
        answers: ["Plank pose", "Seated forward fold", "Upward facing dog"],
        correctAnswer: 2,
        correctImg: "upward.jpg"
      },
      {
        question:
          "Which pose helps improve concentration and your ability to balance by strengthening the arches of the feet and the outer hips?",
        answers: ["Tree pose", "Bound ankle pose", "Warrior two"],
        correctAnswer: 0,
        correctImg: "tree.jpg"
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
        correctImg: "sidestretch.jpg"
      },
      {
        question:
          "Which pose opens the entire front of the body, where it strengthens the muscles in your back, shoulders, and hamstrings? (Hint: it’s a backbend)",
        answers: ["Camel pose", "Wheel pose", "Mountain pose"],
        correctAnswer: 1,
        correctImg: "wheel.jpg"
      },
      {
        question:
          "Which pose strengthens your shoulders, upper back, and abdominals?  It also promotes core and scapular stability, which is helpful if you’re working on inversions or arm balances...",
        answers: ["Side plank", "Warrior three", "Boat pose"],
        correctAnswer: 0,
        correctImg: "sideplank.jpg"
      },
      {
        question:
          "Which pose strengthens your legs, arms, and back muscles? It also gives your chest, shoulders, neck, thighs, and ankles a nice stretch...",
        answers: ["Warrior one", "Seated forward fold", "Dolphin pose"],
        correctAnswer: 0,
        correctImg: "warrior1.jpg"
      },
      {
        question:
          "Which pose helps build strength in your upper body in preparation for a headstand and forearm stand? It can also help calm your mind and relieve stress...",
        answers: ["Camel pose", "Bound ankle pose", "Dolphin pose"],
        correctAnswer: 2,
        correctImg: "images/dolphin.jpg"
      },
      {
        question:
          "Which pose is a 'savasana', where it relaxes the whole body and gives you space to absorb the benefits of the practice?",
        answers: ["Corpse pose", "Downward facing dog", "Tree pose"],
        correctAnswer: 0,
        correctImg: "images/corpse.jpg"
      }
    ]
  };

  let score = 0;
  let questionNumber = 0;

  function updateQuestionNumber() {
    questionNumber++;
    //$(".questionNumber").text(questionNumber + 1);
  }
  //
  /* when a user clicks on start quiz button */
  function startQuiz() {
    $(".startquiz").on("click", function(event) {
      //console.log("you clicked start");

      //call render for first question
      renderAQuestion(questionNumber);
    });
  }
  //build a question
  function renderAQuestion() {
    const question = STORE.questions[questionNumber].question;
    const answers = STORE.questions[questionNumber].answers;
    const questionHTML = $(`<p>
    Question <strong>${questionNumber +
      1}</strong>(of 10) &nbsp;&nbsp;&nbsp;Score
    <strong>1</strong>
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
        <button type="submit">Submit</button>
        </fieldset>
      </form>`);
    $(".enter").html(questionHTML);
  }

  //answer a question and check if it's correct or wrong
  function answerQuestion() {
    $(".enter").on("submit", function(event) {
      event.preventDefault();
      const correctAnswer =
        STORE.questions[questionNumber].answers[
          STORE.questions[questionNumber].correctAnswer
        ];
      const correctImg = STORE.questions[questionNumber].correctImg;
      const answerChoice = $("input:checked").val();

      //display correct or wrong html
      if (answerChoice === correctAnswer) {
        console.log("correct is runing");
        const resultHTML = $(`
        <p>
        Question <strong>${questionNumber +
          1}</strong>(of 10) &nbsp;&nbsp;&nbsp;Score
        <strong>1</strong>
      </p><img
    src="images/${correctImg}"
    alt="namaste image"
    width="300"
    height="195.82"
  />
  <p>You got it right! The correct answer is ${correctAnswer}</p>
  <button class="next">Next</button>`);
        //update the html with this content
        $(".enter").html(resultHTML);
        //call next question
        nextQuestion();
      } else {
        console.log("No it is not correct");
        const resultHTML = $(`
        <p>
        Question <strong>${questionNumber +
          1}</strong>(of 10) &nbsp;&nbsp;&nbsp;Score
        <strong>1</strong>
      </p><img
        src="images/${correctImg}"
    alt="namaste image"
    width="300"
    height="195.82"
  />
  <p>Sorry you got it wrong! The correct answer is ${correctAnswer}</p>
  <button class="next">Next</button>`);

        //update the html with this content
        $(".enter").html(resultHTML);
        //call next question
        nextQuestion();
      }
      updateQuestionNumber();
    });
  }

  //load the next question
  function nextQuestion() {
    $(".enter").on("click", "button.next", function(event) {
      event.preventDefault();
      console.log("you clicked next");
      renderAQuestion(questionNumber);
    });
  }
  //prep callout of functions for app
  function handleQuizApp() {
    startQuiz();
    answerQuestion();
  }
  //call out the top level funtion to run app
  $(handleQuizApp());
});
