// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn =document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();


// Load all event listeners

function loadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks event
    // filter.addEventListener('keyup', filterTasks);

    filter.addEventListener('keyup', filterTask);

    document.addEventListener('DOMContentLoaded', getTasks)

};

// Add tasks




// Get Tasks from LS

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else 
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task)
    {
        //Create Li Element 2

        const li = document.createElement('li');
        //Add class li 2
        
        li.className = 'collection-item';

        //Create text node and append to li

        li.appendChild(document.createTextNode(task));

        //Create new link element

        const link = document.createElement('a');

        //Add class

        link.className = 'delete-item secondary-content';

        // Add icon html

        link.innerHTML = '<i class="fa fa-trash"></i>';

        // Append the link to li

        li.appendChild(link);

        taskList.appendChild(li);
     });
};



function addTask(e){

    if(taskInput.value === ''){
        alert('Add Task');
    } else {

// Create li element

const li = document.createElement('li');
// Add class

li.className = 'collection-item';

//Create text node and append to li

li.appendChild(document.createTextNode(taskInput.value));

//Create new link element

const link = document.createElement('a');

//Add class

link.className = 'delete-item secondary-content';

// Add icon html

link.innerHTML = '<i class="fa fa-trash"></i>';

// Append the link to li

li.appendChild(link);



//Append li to ul
taskList.appendChild(li);

//Stored in LS
storeTaskInLocalStorage(taskInput.value);


//clear input

taskInput.value = '';

e.preventDefault();
    }
};

//Store Task

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task

function removeTask(e){

    if (e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are You to Delete?')){
            e.target.parentElement.parentElement.remove();

            // //Remove from Local Storage permanent through icon
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }

    }

}

//remove task from locals storage

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }

    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){

    //two type of remove all
    taskList.innerHTML = ''; 
    // while(taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild);
    // }
    clearTasksFromLocalStorage();

}

//Clear Task from Local Storage

function clearTasksFromLocalStorage(){
    localStorage.clear();
}


//filter task

function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
            else 
            {
                task.style.display = 'none';
            }


    });
}

