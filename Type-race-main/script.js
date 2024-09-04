const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const timeDisplay = document.getElementById('timeDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const messageDisplay = document.getElementById('messageDisplay');
const startButton = document.getElementById('startButton');
const progressBar = document.getElementById('progressBar');
const instructionsButton = document.getElementById('instructionsButton');
const instructionsModal = document.getElementById('instructionsModal');
const closeModal = document.querySelector('.modal .close');

const phrases = [
    "A sala de aula é o lugar onde aprendemos novas habilidades.",
    "Os professores ajudam a moldar o futuro dos alunos.",
    "A matemática é uma disciplina fundamental no currículo escolar.",
    "Estudar história nos ajuda a entender o passado.",
    "Ler livros amplia o nosso conhecimento e vocabulário.",
    "A educação física é importante para manter a saúde e o bem-estar.",
    "Fazer pesquisas e trabalhos é uma parte essencial do aprendizado.",
    "Os projetos de grupo incentivam a colaboração entre os alunos.",
    "A aula de ciências explora o mundo natural e seus fenômenos.",
    "As artes visuais estimulam a criatividade dos estudantes.",
    "A biblioteca é um lugar rico em recursos educacionais.",
    "Participar de clubes escolares pode ser uma experiência enriquecedora.",
    "A tecnologia está cada vez mais presente nas salas de aula.",
    "As atividades extracurriculares ajudam a desenvolver habilidades sociais.",
    "Aprender um novo idioma abre portas para novas culturas."
];

let currentPhrase = '';
let currentWords = [];
let currentIndex = 0;
let startTime, endTime;
let timerInterval;

startButton.addEventListener('click', startGame);
textInput.addEventListener('input', checkInput);
instructionsButton.addEventListener('click', showInstructions);
closeModal.addEventListener('click', closeInstructions);

function startGame() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    currentPhrase = phrases[randomIndex];
    currentWords = currentPhrase.split(' ');
    currentIndex = 0;

    textDisplay.textContent = currentWords[currentIndex];
    textInput.value = '';
    textInput.disabled = false;
    textInput.focus();
    timeDisplay.textContent = '';
    errorDisplay.textContent = '';
    messageDisplay.textContent = '';
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#28a745';
    startButton.style.display = 'none';

    startTime = new Date().getTime();
    startTimer();
}

function startTimer() {
    let timeLeft = 30; // 30 segundos

    timerInterval = setInterval(() => {
        timeLeft--;
        const timePercentage = (timeLeft / 30) * 100;
        progressBar.style.width = `${timePercentage}%`;

        if (timeLeft <= 10) {
            progressBar.style.backgroundColor = '#dc3545'; // Muda a cor para vermelho
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false, true); // Indica que o tempo acabou
        }
    }, 1000);
}

function checkInput() {
    const inputText = textInput.value.trim();
    const currentWord = currentWords[currentIndex];

    if (inputText === currentWord) {
        textInput.value = '';
        currentIndex++;

        if (currentIndex < currentWords.length) {
            textDisplay.textContent = currentWords[currentIndex];
        } else {
            clearInterval(timerInterval);
            checkCompletion();
        }
    }
}

function checkCompletion() {
    endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    timeDisplay.textContent = `Você completou em ${timeTaken.toFixed(2)} segundos!`;

    if (currentIndex === currentWords.length) {
        messageDisplay.textContent = 'Parabéns! Você digitou tudo corretamente!';
    } else {
        messageDisplay.textContent = 'Que pena! Você cometeu alguns erros.';
    }
    textInput.disabled = true;
    startButton.style.display = 'block';
    startButton.textContent = 'Tentar novamente';
}

function endGame(success, timeUp = false) {
    textInput.disabled = true;
    startButton.style.display = 'block';
    startButton.textContent = 'Tentar novamente';
    
    if (timeUp) {
        messageDisplay.textContent = 'Que pena! O tempo acabou!';
    } else if (!success) {
        messageDisplay.textContent = 'Que pena! Você cometeu alguns erros.';
    }
}

function showInstructions() {
    instructionsModal.style.display = 'flex';
}

function closeInstructions() {
    instructionsModal.style.display = 'none';
}
