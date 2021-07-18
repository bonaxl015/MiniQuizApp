const question = [
    'What is the capital of Chile?',
    'What is the highest mountain in Britain?',
    'What is the smallest country in the world?',
    'Alberta is a province of which country?',
    'How many countries still have the shilling as currency?',
    'Which is the only vowel not used as the first letter in a US State?',
    'What is the largest country in the world?',
    'Where would you find the River Thames?',
    'What is the hottest continent on Earth?',
    'What is the longest river in the world?'
    ];

const answer = [
    'Santiago',
    'Ben Nevis',
    'Vatican City',
    'Canada',
    'Four',
    'E',
    'Russia',
    'London, UK',
    'Africa',
    'River Nile'
];

const choices = [
    ['Santiago', 'Vatican City', 'Ottawa'],
    ['Mt. Everest', 'Ben Nevis', 'Mt. Apo'],
    ['Ottawa', 'Vatican City', 'Manila'],
    ['Philippines', 'Canada', 'Mexico'],
    ['Four', 'Seven', 'Five'],
    ['A', 'E', 'O'],
    ['USA', 'Canada', 'Russia'],
    ['Manila, Philippines', 'Harare, Zimbabwe', 'London, UK'],
    ['South America', 'Africa', 'Europe'],
    ['River Nile', 'Pasig River', 'Rivermaya']
];

const start = document.getElementsByClassName('start');
const questionDisplay = document.getElementsByClassName('container');
const startDisplay = document.getElementsByClassName('start-container');

var score = 0, streak = 0;

start[0].addEventListener('click', mainQuiz);

//Load home screen
window.onload = home();

//Home screen - start
function home(){
    startDisplay[0].style.visibility = 'visible'
    questionDisplay[0].style.visibility = 'hidden';
    updateScore(score, streak);
}

function mainQuiz(){
    const quit = document.getElementsByClassName('quit');

    //Hide home screen
    startDisplay[0].style.visibility = 'hidden'
    //Show question
    questionDisplay[0].style.visibility = 'visible';

    // Selects random question
    let x = Math.floor(Math.random()*question.length);
    displayQuestion(x);

    //Quit button pressed
    quit[0].addEventListener('click', () => {
        quitQuiz(score);
    });
}

//displays question
function displayQuestion(num){
    const questionDisplayText = document.querySelector('.question');
    const choicesContainer = document.querySelector('.choices-container');
    
    //display question
    questionDisplayText.innerText = question[num];

    //create divs for choices
    for(let element of choices[num]){
        let div = document.createElement('div');
        div.innerText = element;
        div.classList.add('choices');
        choicesContainer.appendChild(div);
    
        //choice is selected
        div.addEventListener('click', () => {
            checkAnswer(div.textContent, num, choicesContainer);
        });
    }
}

//check the answer
function checkAnswer(ans, num, container){
    const result = document.getElementsByClassName('correct-wrong');
    const resultDisplay = document.getElementsByClassName('display-result');
    const streakDisplay = document.getElementsByClassName('streak');
    const next = document.getElementsByClassName('next');

    //show result
    resultDisplay[0].style.visibility = 'visible';
    if(ans === answer[num]){
        result[0].innerText = 'CORRECT!';
        result[0].style.color = '#63C328';
        score++;
        streak++
    }else{
        result[0].innerText = 'WRONG!';
        result[0].style.color = '#BB051D';
        score = score;
        streak = 0;
    }

    // count correct answer streak and display
    if(streak % 5 === 0 && streak != 0){
        streakDisplay[0].innerText = streak + ' in a row!';
    }

    //update score
    updateScore(score, streak);

    //proceed to next question
    next[0].addEventListener('click', () => {
        while(container.firstChild){
            container.removeChild(container.lastChild);
        }
        streakDisplay[0].innerText = '';
        resultDisplay[0].style.visibility = 'hidden';
        mainQuiz();
    });
}

//updates the score
function updateScore(score){
    scoreDisplay = document.getElementsByClassName('score');
    scoreDisplay[0].innerText = 'Score: ' + score;
}

//quit button is pressed
function quitQuiz(finalScore){
    const choicesContainer = document.querySelector('.choices-container');
    const quitDisplay = document.getElementsByClassName('end-game');
    const finalScoreDisplay = document.getElementsByClassName('final-score');
    const restart = document.getElementsByClassName('restart');
    const quitGame = document.getElementsByClassName('quit-game');
    const resultDisplay = document.getElementsByClassName('display-result');

    //displays final score
    quitDisplay[0].style.visibility = 'visible';
    finalScoreDisplay[0].innerText = finalScore;

    //restart the game
    restart[0].addEventListener('click', () => {
        score = 0;
        streak = 0;
        updateScore(score, streak);
        quitDisplay[0].style.visibility = 'hidden';
        while(choicesContainer.firstChild){
            choicesContainer.removeChild(choicesContainer.lastChild);
        }
        resultDisplay[0].style.visibility = 'hidden';
        mainQuiz();
    });

    //quits the game and go back to home screen
    quitGame[0].addEventListener('click', () => {
        score = 0;
        streak = 0;
        updateScore(score, streak);
        quitDisplay[0].style.visibility = 'hidden';
        while(choicesContainer.firstChild){
            choicesContainer.removeChild(choicesContainer.lastChild);
        }
        resultDisplay[0].style.visibility = 'hidden';
        home();
    });

}

