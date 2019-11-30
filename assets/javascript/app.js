// alert("Hello Anna, Anthony, & Justin");
// alert("Hope you enjoy the game!");


$(document).ready(function () {
    $('#starting').on('click', function () {
        var timer2 = "3:01";
        var interval = setInterval(function () {
            var timer = timer2.split(`:`);
            var minutes = parseInt(timer[0], 10);
            var seconds = parseInt(timer[1], 10);
            --seconds;
            minutes = (seconds < 0) ? --minutes : minutes;
            if (minutes < 0) clearInterval(interval);
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? `0` + seconds : seconds;
            $(`#timer`).html(minutes + `:` + seconds);
            timer2 = minutes + `:` + seconds;
        }, 1000);
    });

    var startButton = document.getElementById(`starting`);
    var nextButton = document.getElementById(`next-btn`);
    var questionContainerElement = document.getElementById(`question-container`);
    var questionElement = document.getElementById(`question`)
    var answerButtonsElement = document.getElementById(`answer-buttons`)

    var shuffledQuestions, currentQuestionIndex

    startButton.addEventListener(`click`, startGame)
    answerButtonsElement.addEventListener(`click`, () => {
        currentQuestionIndex++
        setNextQuestion()
    })

    function startGame() {
        startButton.classList.add(`hide`);
        shuffledQuestions = questions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove(`hide`);
        setNextQuestion()
    }

    function setNextQuestion() {
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    function showQuestion(question) {
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
            var button = document.createElement(`button`)
            button.innerText = answer.text
            button.classList.add(`btn`)
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener(`click`, selectAnswer)
            answerButtonsElement.appendChild(button)
        });
    }

    function resetState() {
        nextButton.classList.add(`hide`)
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
    }
    
    function selectAnswer(e) {
        var selectedButton = e.target;
        var correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove(`hide`)
        } else {
            startButton.innerText = `Restart`
            startButton.classList.remove(`hide`)
        }
    }



    function setStatusClass(element, correct) {
        clearStatusClass(element)
        if(correct) {
            element.classList.add(`correct`)
        } else {
            element.classList.add(`wrong`)
        }
    }

    function clearStatusClass(element) {
        element.classList.remove(`correct`)
        element.classList.remove(`wrong`)
    }


    // Create Questions...
    var questions = [
        {
            question: "What is air travel distance from New York to California?",
            answers: [
                { text: "3,414 + miles", correct: false },
                { text: "2,414 miles", correct: false },
                { text: "2,441 miles", correct: true },
                { text: "3,114 + miles", correct: false },
            ]
        },
        {
            question: "Listed below--which movie is currently the highest gross movie of all time?",
            answers: [
                { text: "Avatar", correct: true },
                { text: "Titanic", correct: false },
                { text: "Star Wars: The Force Awakens", correct: false },
                { text: "Jurassic World", correct: false },
            ]
        },
        {
            question: "Which country have the strongest dollar?",
            answers: [
                { text: "Jordanian", correct: false },
                { text: "Kuwaiti", correct: true },
                { text: "Great Britain", correct: false },
                { text: "Bahraini", correct: false },
            ]
        },
        {
            question: "In what country is Bugatti headquartered?",
            answers: [
                { text: "England", correct: false },
                { text: "Germany", correct: false },
                { text: "Italy", correct: false },
                { text: "France", correct: true },
            ]

        },
        {
            question: "When was the 1st computer programming language created?",
            answers: [
                { text: "1993", correct: false },
                { text: "1883", correct: true },
                { text: "1838", correct: false },
                { text: "1975", correct: false },
            ]
        },
        {
            question: "There are currently over ___________ programming languages?",
            answers: [
                { text: "500", correct: false },
                { text: "600", correct: false },
                { text: "700", correct: true },
                { text: "800", correct: false },
                
            ]
        },
    
        ];




    // audio.play();

});