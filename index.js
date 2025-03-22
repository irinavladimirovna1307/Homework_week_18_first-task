const taskInput = document.getElementById('task');
const add = document.getElementsByClassName("add");

function createTask() {
    const taskText = taskInput.value;
    let list = document.querySelector('.list__point');
    let NewPoint = document.createElement('li');
    NewPoint.textContent = taskText;
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = false;
    checkBox.classList.add('check');

    if (taskText === '') {
        alert('Введите задачу!');
    }
    else {
        list.append(NewPoint);
        NewPoint.append(checkBox);
        taskInput.value = '';
        document.querySelector(".paragraph").style.display = "none";

        //if (taskText.trim() !== '') {
        let tasks = localStorage.getItem('tasks');
        tasks = tasks ? JSON.parse(tasks) : [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        /* } else {
             tasks = [];
         }*/
    }
}

// Очистить список
const close = document.getElementsByClassName("clear");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        const div = document.querySelector(".list");
        div.style.display = "none";
        document.querySelector(".clear").disabled = true;
        document.querySelector(".paragraph").style.display = "";
        location.reload();
    }
}

//Сделать кнопку активной

function toggleButton() {
    if (taskInput.value === "") {
        document.querySelector(".clear").disabled = true;
    } else {
        document.querySelector(".clear").disabled = false;
    }
}







