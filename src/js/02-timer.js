"use strict";
import Swal from 'sweetalert2';

const inputHours = document.getElementById('date-selector');
const timerBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMin = document.querySelector('[data-minutes]');
const timerSec = document.querySelector('[data-seconds]');


timerBtn.disabled = true;
let createDataEnd = null;

// в классе хранятся свойства, все что необходимо для подсчетов
class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }

    start() {
      
        if (this.isActive) {
           
            const newDataEnd = new Date(inputHours.value).getTime();
            if (newDataEnd != createDataEnd) {
                
                clearInterval(this.intervalId);
                this.startTimer();
             }
            return;
        }
        this.startTimer();
    
    }
  
    //останавливает таймер, когда он доходит до своего конца, блокирует кнопку
    stop() {
       
        if (timerDays.textContent == '00' && timerHours.textContent == '00' && timerMin.textContent == '00' && timerSec.textContent == '00') {
            clearInterval(this.intervalId);
            this.isActive = false;
            timerBtn.disabled = true;
            
        }
    }
 
/*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  pad(value) {
    return String(value).padStart(2, '0');
    };
    
  startTimer() {
         const currentDate = Date.now();
         createDataEnd = new Date(inputHours.value).getTime();
        this.isActive = true;
        let deltaDate = createDataEnd - currentDate;
        
        this.intervalId = setInterval(() => {
            const caunterTime = deltaDate -= 1000;
            const updateClock = this.convertMs(caunterTime);
            this.onTick(updateClock)
            timer.stop();
        }, 1000);
    }

 // блокирует кнопку, если дата меньше сегодняшней даты, разблокирует если больше или равно
  onInput() {

    if (new Date(inputHours.value).getTime() >= Date.now()) {
        timerBtn.disabled = false;
       
      
    } else if(new Date(inputHours.value).getTime() <= Date.now()) {
       
        timerBtn.disabled = true;
        return Swal.fire('Please choose a date in the future')
    }

    };
    
        // ms - разница между конечной и текущей датой в миллисекундаx
    // переводит общую сумму милисекунд: дни, часы, минуты, секунды
 convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
    };
}

//передаем функцию для визуализации таймера  как свойство для класса
const timer = new Timer({
    onTick: updateClockFace
});


//обновляет время таймера
function updateClockFace({ days, hours, minutes, seconds }) {
    
    console.log(`${days}: ${hours}: ${minutes}: ${seconds}`);
     
           timerDays.textContent = `${days}`;
           timerHours.textContent = `${hours}`;
           timerMin.textContent = `${minutes}`;
           timerSec.textContent = `${seconds}`;
    
};


//cлушатель на кнопке и на инпуте


timerBtn.addEventListener('click', 
    timer.start.bind(timer)
);
inputHours.addEventListener('change', timer.onInput.bind(timer));