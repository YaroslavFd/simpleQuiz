"use strict";

window.addEventListener('DOMContentLoaded', () => {
  const questions = [
    {
      question: "Какой язык работает в браузере?",
      answers: ["Java", "C", "Python", "JavaScript"],
      correct: 4,
    },
    {
      question: "Что означает CSS?",
      answers: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats",
      ],
      correct: 2,
    },
    {
      question: "Что означает HTML?",
      answers: [
        "Hypertext Markup Language",
        "Hypertext Markdown Language",
        "Hyperloop Machine Language",
        "Helicopters Terminals Motorboats Lamborginis",
      ],
      correct: 1,
    },
    {
      question: "В каком году был создан JavaScript?",
      answers: ["1996", "1995", "1994", "все ответы неверные"],
      correct: 2,
    },
  ];

  const headerContainer = document.querySelector('#header'),
    listContainer = document.querySelector('#list'),
    submitBtn = document.querySelector('#submit');

  let questionIndex = 0,
    score = 0;


  clearPage();
  showQuestion();

  submitBtn.addEventListener('click', checkAnswer);

  function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
  }

  function showQuestion(index = 0) {
    headerContainer.innerHTML = `<h2 class="title">${questions[index].question}</h2>`;
    listContainer.innerHTML = ``;

    const answers = questions[index].answers;

    for (let i = 0; i < answers.length; i++) {
      const elemQuiz = document.createElement('li');

      elemQuiz.innerHTML = `
       <label>
        <input value="${i + 1}" type="radio" class="answer" name="answer" />
        <span>${answers[i]}</span>
       </label>
    `;
      listContainer.appendChild(elemQuiz);
    }
  }

  function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    if (!checkedRadio) {
      submitBtn.blur();
      return;
    }

    submitBtn.blur();

    const userAnswer = +checkedRadio.value;

    if (questions[questionIndex].correct === userAnswer) {
      score++;
    }

    if (questionIndex !== questions.length - 1) {
      questionIndex++;
      clearPage();
      showQuestion(questionIndex);

    } else {
      clearPage();
      showResults();
    }
  }

  function showResults() {
    let title, message;

    if (score === questions.length) {
      title = 'Поздравляю';
      message = 'Вы ответили верно на все вопросы!';
    } else if ((score * 100) / questions.length >= 50) {
      title = 'Неплохой результат!';
      message = 'Вы дали более половины правильных ответов';
    } else {
      title = 'Стоит постараться';
      message = 'Пока у вас меньше половины правильных ответов';
    }

    headerContainer.innerHTML = `
      <h2 class="title">${title}</h2>
      <h3 class="summary">${message}</h3>
      <p class="result">${score} из ${questions.length}</p>
  `;

    submitBtn.textContent = 'Начать заново';
    submitBtn.addEventListener('click', () => history.go());
  }
});
