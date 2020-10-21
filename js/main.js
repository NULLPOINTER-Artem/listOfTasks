import menu from './components/menu.js'

window.addEventListener('DOMContentLoaded', (event) => {
    const ul = document.querySelector('.listOfTasks');
    const buttons = document.querySelector('.buttons');
    let isUsedCtrl = false;

    ul.addEventListener('mousedown', (event) => {
        event.preventDefault();
    });

    ul.addEventListener('click', (event) => {
        if (event.target == event.currentTarget) {
            return;
        }

        if (event.ctrlKey) {
            event.target.classList.toggle('selected');
            
            isUsedCtrl = true;
            return;
        }

        if (!event.target.classList.contains('selected')) {
            clearSelected(event);
        } 

        addClassSelected(event, isUsedCtrl);
        
        if (isUsedCtrl) {
            isUsedCtrl = changeLogic(isUsedCtrl);
        }
    });

    new menu(buttons);
})

function changeLogic(logicVar) {
    return !logicVar;
}

function addClassSelected(event, isUsedCtrl) {
    if (isUsedCtrl) {
        clearSelected(event);
        event.target.classList.toggle('selected');

        return;
    }

    event.target.classList.toggle('selected');
}

function clearSelected(event) {
    for (let elem of event.currentTarget.children) {
        elem.classList.remove('selected');
    }
}