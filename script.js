const questions = [
    {
        question: "Qual é a frase icônica dita por Tony Stark no final de 'Vingadores: Ultimato'?",
        answers: {
            a: "Eu sou o Homem de Ferro.",
            b: "Eu sou inevitável.",
            c: "Eu sou o Capitão América.",
            d: "Eu sou Groot.",
        },
        correctAnswer: "a",
        tip: "Lembre-se do primeiro filme e da resposta de Thanos."
    },
    {
        question: "Qual é o nome verdadeiro do Capitão América?",
        answers: {
            a: "Bucky Barnes",
            b: "Steve Rogers",
            c: "Peter Parker",
            d: "Bruce Banner",
        },
        correctAnswer: "b",
        tip: "Ele era apenas um garoto de Brooklyn."
    },
    {
        question: "Qual gema do infinito estava na testa do Visão?",
        answers: {
            a: "Gema da Mente",
            b: "Gema do Tempo",
            c: "Gema do Espaço",
            d: "Gema do Poder",
        },
        correctAnswer: "a",
        tip: "Esta gema deu a ele consciência e poderes telepáticos."
    }
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-quiz-btn');
const resultsBox = document.getElementById('quiz-results');
const scoreDisplay = document.getElementById('score-display');
const messageDisplay = document.getElementById('message-display');

function buildQuiz() {
    const output = [];

    questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter.toUpperCase()}:
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="quiz-question" data-question-number="${questionNumber}">
                <p>${questionNumber + 1}. ${currentQuestion.question}</p>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function iniciarQuiz() {
    buildQuiz();
    
    quizContainer.classList.remove('hidden');
    submitButton.classList.remove('hidden');
    
    document.querySelector('.quiz-section button:not(#submit-quiz-btn)').classList.add('hidden');
    
    resultsBox.classList.add('hidden');
}

function verificarRespostas() {
    let numCorrect = 0;

    questions.forEach((currentQuestion, questionNumber) => {
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (document.querySelector(selector) || {}).value;

        const questionElement = document.querySelector(`[data-question-number="${questionNumber}"]`);

        
        questionElement.classList.remove('correct', 'incorrect');

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            questionElement.classList.add('correct');
        } else {
            questionElement.classList.add('incorrect');
            
        }
    });

    
    const totalQuestions = questions.length;
    const percentage = (numCorrect / totalQuestions) * 100;
    
    scoreDisplay.innerHTML = `Você acertou **${numCorrect}** de **${totalQuestions}** perguntas! (${percentage.toFixed(0)}%)`;

    if (percentage === 100) {
        messageDisplay.innerHTML = '✨ **AVENGER NÍVEL MESTRE!** Você conhece o MCU como a palma da sua mão!';
    } else if (percentage >= 60) {
        messageDisplay.innerHTML = '👍 **HERÓI CONSCIENTE!** Você tem um bom conhecimento, mas pode rever alguns filmes!';
    } else {
        messageDisplay.innerHTML = '💥 **NOVATO DO SHIELD!** Talvez seja hora de maratonar a saga novamente! (É divertido!)';
    }

    resultsBox.classList.remove('hidden');

    
    resultsBox.scrollIntoView({ behavior: 'smooth' });
}
