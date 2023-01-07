/*Aqui agregamos  nuestro codigo de java script */

const tasks = [];

let time = 0;
let timer = null;
let timerBreak = null;
let current = null;


const bAdd = document.querySelector ('#bAdd');
const itTask = document.querySelector ('#itTask');
const form = document.querySelector ('#form');

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
                <div class= "completed">${task.completed ? `<span class="done">Realizado</span>`: `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
                <div class= "title">${task.title}</div>
            </div>
        `;
    });


    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = hmtl.join('');
};


