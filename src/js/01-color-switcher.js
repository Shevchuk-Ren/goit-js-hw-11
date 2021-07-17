

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', createRandomColorForBody);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function createRandomColorForBody() {
    startBtn.disabled = true;
    const createColorforInterval = () => {

        body.style.backgroundColor = getRandomHexColor();
        // console.log(getRandomHexColor());
    };

     intervalId = setInterval(createColorforInterval, 1000);

    stopBtn.addEventListener('click', stopCreateRandomColorForBody);

   
}

 function stopCreateRandomColorForBody() {

        startBtn.disabled = false;

        if (!startBtn.disabled) {
            clearInterval(intervalId);
        }
    };

