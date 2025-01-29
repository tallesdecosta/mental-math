const main = document.getElementById("main");
const header = document.getElementById("header");
const body = document.getElementById("body");
const menuContent = document.getElementsByClassName('menu-content');
const cardBox = document.getElementById("card-box");
const calculation = document.getElementById("calculation-text");
const questionText = document.getElementById("question-number-text");
const questionsNumberText = document.getElementById("questions-number-text");
const questionAmountInput = document.getElementById("questions-number");
const tipsBox = document.getElementById('tips-menu');

const okButton = document.getElementById("ok-button");
//okButton.addEventListener("click", SendQuestionNumber);


const enumeratedButton = document.getElementById("enumerated-button");
enumeratedButton.addEventListener("click", ChooseQuestionAmount);

const endlessButton = document.getElementById("endless-button");
endlessButton.addEventListener("click", StartEndlessMode);

const tipsButton = document.getElementById("tips-button");
tipsButton.addEventListener("click", GoToTips);

const menuButtonSimple = document.getElementById("menu-button-simple");
menuButtonSimple.addEventListener("click", BackToMenuSimple);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", ValidateAnswer);

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", StopEndlessMode);

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", RestartMode);

const menuButton = document.getElementById("menu-button");
menuButton.addEventListener("click", BackToMenuComplex);

let correctAnswer, timesOperation, plusOperation, minusOperation, questionAmount;
let isEndless = false;
let questionNumber = 1;
let playerTotal = 0;

function BackToMenuComplex () {
  isEndless = false;
  tipsBox.classList.add("hidden");
  cardBox.classList.add("hidden");
  restartButton.classList.add("hidden");
  menuButton.classList.add("hidden");
  document.getElementById('total-questions').classList.add("hidden");

  for(i = 0; i < menuContent.length; i++) {
    menuContent[i].classList.remove("hidden");
  }
  
  main.classList.remove("justify-center");
  questionNumber = 1;
  playerTotal = 0;
  document.getElementById("question-number-text").innerHTML="Question "+questionNumber;

}

function BackToMenuSimple () {
  tipsBox.classList.add("hidden");
  for(i = 0; i < menuContent.length; i++) {
    menuContent[i].classList.remove("hidden");
  }
}

function RestartMode () {

  restartButton.classList.add("hidden");
  menuButton.classList.add("hidden");
  document.getElementById('total-questions').classList.add("hidden");
  questionNumber = 1;
  playerTotal = 0;
  document.getElementById("question-number-text").innerHTML="Question "+ questionNumber;
  document.getElementById("question-number-text").classList.remove("hidden");
  document.getElementById("player-answer").classList.remove("hidden");
  submitButton.classList.remove("hidden");
  calculation.classList.remove("hidden");

  if (isEndless === true) {
    stopButton.classList.remove("hidden");
  }

  GenerateCalculation();

}

function GoToTips () {

  for(i = 0; i < menuContent.length; i++) 
  {

      menuContent[i].classList.add("hidden");

  }

  tipsBox.classList.remove("hidden");
  body.style.gridTemplateRows = "1fr auto";
  

}

function DisplayTip (id) {

  tipObject = tipsData[parseInt(id)];
  
  tipWrapper = document.createElement("div");
  tipWrapper.classList.add("tip-page");

  tipTitle = document.createElement("h2");
  tipTitle.textContent = tipObject.title;

  tipWrapper.appendChild(tipTitle);

  tipText = document.createElement("p");
  tipText.textContent = tipObject.text;

  tipWrapper.appendChild(tipText);

  tipButton = document.createElement("button");
  tipButton.textContent = "Voltar";
  tipButton.addEventListener("click", () => {
    tipButton.parentNode.remove();
  });

  tipWrapper.appendChild(tipButton);

  main.appendChild(tipWrapper);

}

function ChooseQuestionAmount () {

  for(i = 0; i < menuContent.length; i++) 
  {

    menuContent[i].classList.add("hidden");

  }

  cardBox.classList.remove("hidden");
  questionsNumberText.classList.remove("hidden");
  questionAmountInput.classList.remove("hidden");
  okButton.classList.remove("hidden");

}

function SendQuestionAmount () {

  questionAmount = Number(questionAmountInput.value);

  StartEnumeratedMode();

}

function StartEnumeratedMode () {


    questionsNumberText.classList.add("hidden");
    questionAmountInput.classList.add("hidden");
    okButton.classList.add("hidden");
    document.getElementById("question-number-text").classList.remove("hidden");
    document.getElementById("player-answer").classList.remove("hidden");
    submitButton.classList.remove("hidden");
    calculation.classList.remove("hidden");
    body.style.gridTemplateRows = "1fr auto";
    GenerateCalculation();
    main.classList.add("justify-center");

}

function StopEndlessMode () {

  document.getElementById("question-number-text").classList.add("hidden");
  questionNumber = questionNumber - 1;
  document.getElementById("player-answer").classList.add("hidden");
  stopButton.classList.add("hidden");
  submitButton.classList.add("hidden");
  calculation.classList.add("hidden");
  restartButton.classList.remove("hidden");
  menuButton.classList.remove("hidden");
  document.getElementById('total-questions').classList.remove("hidden");
  document.getElementById('total-questions').innerHTML = "You answered " + playerTotal + " out of " + questionNumber + ".";

}

function StartEndlessMode () {

  isEndless = true;

  for(i = 0; i < menuContent.length; i++) 
  {

      menuContent[i].classList.add("hidden");

  }

  cardBox.classList.remove("hidden");
  stopButton.classList.remove("hidden");
  document.getElementById("question-number-text").classList.remove("hidden");
  document.getElementById("player-answer").classList.remove("hidden");
  calculation.classList.remove("hidden");
  submitButton.classList.remove("hidden");
  body.style.gridTemplateRows = "1fr auto";
  GenerateCalculation();
  main.classList.add("justify-center");
}

function GenerateCalculation () {

    const numbers = [];

    for (i = 1; i <= 100; i++) { 
      numbers.push(i); 
    }

    let randomNumberA = Math.floor(Math.random() * numbers.length);
    let randomNumberB = Math.floor(Math.random() * numbers.length);
    let arrayOperations = [randomNumberA * randomNumberB, randomNumberA + randomNumberB, randomNumberA - randomNumberB];
    correctAnswer = arrayOperations[Math.floor(Math.random() * arrayOperations.length)];

    timesOperation = randomNumberA * randomNumberB;
    plusOperation = randomNumberA + randomNumberB;
    minusOperation = randomNumberA - randomNumberB;

    if (correctAnswer === timesOperation) {
      calculation.innerHTML = randomNumberA + " * " + randomNumberB;
    } else if (correctAnswer === plusOperation) {
      calculation.innerHTML = randomNumberA + " + " + randomNumberB;
    } else if (correctAnswer === minusOperation) {
      calculation.innerHTML = randomNumberA + " - " + randomNumberB;
    }
}

function ValidateAnswer () {

  let playerAnswer = Number(document.getElementById("player-answer").value);

  if (questionNumber >= questionAmount && isEndless === false) {
    document.getElementById("question-number-text").classList.add("hidden");
    document.getElementById("player-answer").classList.add("hidden");
    submitButton.classList.add("hidden");
    calculation.classList.add("hidden");
    restartButton.classList.remove("hidden");
    menuButton.classList.remove("hidden");
    document.getElementById('total-questions').classList.remove("hidden");
    document.getElementById('total-questions').innerHTML = "You answered " + playerTotal + " out of " + questionNumber + ".";
  }

  if (playerAnswer === correctAnswer) {

    playerTotal = playerTotal + 1;
    questionNumber = questionNumber + 1;

    questionText.innerHTML="Question " + questionNumber;
    GenerateCalculation();
    document.getElementById("player-answer").value='';

  } else {

    questionNumber = questionNumber + 1;

    document.getElementById('player-answer').value='';
    questionText.innerHTML="Question " + questionNumber;
    GenerateCalculation();

  }


}