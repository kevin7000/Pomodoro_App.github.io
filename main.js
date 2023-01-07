/*Aqui agregamos  nuestro codigo de java script */

const tasks = [];

let time = 0;
let timer = null;
let timerBreak = null;
let current = null;


const bAdd = document.querySelector ('#bAdd');
const itTask = document.querySelector ('#itTask');
const form = document.querySelector ('#form');
const taskName = document.querySelector('#time #taskName');


renderTime();
renderTask();

/*Este evento sucedera cada ves que se haga un submit */
form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask.value !== ''){
        createTask(itTask.value); 
        itTask.value = ''; /* Una ves que ingresamos nuestro nuesvo task dejamos el espacio vacio*/
        renderTask();
    }
})

/* Creamos nuestra funcion de creaTask que sera utilizado en nuestro evento */
function createTask(value){
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
    };

    tasks.unshift(newTask); /* Y nada mas lo agregamos a nuestro arrelo que creamos al principio*/
};


function  renderTask(){ /*Es funcion nos permitira agragar o renderizar la salida html hacia el contenedor */
    const hmtl = tasks.map(task => {
        return `
            <div class= "task">
                <div class= "completed">${task.completed ? `<span class="done">¡Tarea Completada!</span>`: `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
                <div class= "title">${task.title}</div>
            </div>
        `;
    });


    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = hmtl.join('');

    const startButtons = document.querySelectorAll('.task .start-button');

    startButtons.forEach(button => { /*Aqui damos vida a los botones para  que hagan y validen las cosas */
        button.addEventListener('click', e => {
            if(!timer){
                const id = button.getAttribute('data-id');
                startButttonHandler(id);
                button.textContent = "Tarea en Progreso...";
            }
        });
    });
};


function startButttonHandler(id){
    time = 25 * 60;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id == id);
   
    taskName.textContent = tasks[taskIndex].title;
    renderTime();
    timer = setInterval(() => { /*Aqui manejamos el tiempo */
        timeHandler(id);
    },1000);
}

function timeHandler(id){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTask();
        startBreak();

    }

}


function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function markCompleted(id){
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}


function startBreak(){
    time = 1 * 60;
    taskName.textContent = 'Descanso';
    renderTime();
    timerBreak = setInterval(() =>{
        timerBreakHandler();
    },1000)
}

function timerBreakHandler(){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = '';
        renderTask();

    }

}






