document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.querySelector('.Add-task');
    const modalContainer = document.getElementById('Modal_container');
    const modalContent = document.querySelector('.modal-content');
    const closeModalButton = document.querySelector('.Close-modal');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskCounters = document.getElementById('task-counters');
    const totalTasksSpan = document.getElementById('total-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');

    function openModal() {
        modalContainer.classList.add('show');
        setTimeout(() => {
            modalContent.classList.add('show');
        }, 5); 
        taskList.classList.add('dimmed'); 
    }

    addTaskButton.addEventListener('click', function() {
        modalContainer.style.display = 'flex';
        setTimeout(openModal, 5); 
    });

      function closeModal() {
        modalContent.classList.remove('show');
        modalContainer.classList.remove('show');
        taskList.classList.remove('dimmed'); 
        setTimeout(() => {
            modalContainer.style.display = 'none'; 
        }, 700);
    }

    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target === modalContainer) {
            closeModal();
        }
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            document.getElementById('add-task-button').click();
        }
    });

    document.getElementById('add-task-button').addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';

            const checkButton = document.createElement('button');
            checkButton.className = 'check-button';
            checkButton.addEventListener('click', function() {
                checkButton.classList.toggle('checked');
                taskItem.classList.toggle('completed');
                updateCounters();
            });

            const text = document.createElement('span');
            text.textContent = taskText;

            const removeButton = document.createElement('span');
            removeButton.className = 'remove-task';

            removeButton.addEventListener('click', function() {
                taskItem.classList.add('slide-out');
                
                taskItem.addEventListener('animationend', () => {
                    taskList.removeChild(taskItem);
                    if (taskList.children.length === 0) {
                        taskList.style.display = 'none'; 
                    }
                    updateCounters();
                }, { once: true });
            });

            taskItem.appendChild(checkButton);
            taskItem.appendChild(text);
            taskItem.appendChild(removeButton);

            taskList.appendChild(taskItem);
            taskList.style.display = 'block'; 

            updateCounters();

            taskInput.value = '';
        }
    });

     function updateCounters() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.completed').length;
        totalTasksSpan.textContent = totalTasks;
        completedTasksSpan.textContent = completedTasks;
        taskCounters.style.display = totalTasks > 0 ? 'flex' : 'none';
    }

});
