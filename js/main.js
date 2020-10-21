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

    buttons.addEventListener('click', function(event) {
        let action = event.target.dataset.action;
        switch (action) {
            case "addAtStart": addAtStart(event); break;
            case "addAtEnd": addAtEnd(event); break;
            case "DeleteSelected": DeleteSelected(event); break;
            case "sortSelected": sortSelected(ul); break;
            default: {
                console.error('Cannot set action ', action);
            }
        }
    });
})

function addAtStart(event) {
    let task = "Hello, I'm new task";

    let newLi = document.createElement('li');
    newLi.textContent = task;

    if (document.querySelector('.listOfTasks').children.length != 0) {
        document.querySelector('.listOfTasks').children[0].before(newLi);
    } else {
        document.querySelector('.listOfTasks').append(newLi);
    }
}

function addAtEnd(event) {
    let task = "Hello, I'm new task";

    let newLi = document.createElement('li');
    newLi.textContent = task;

    document.querySelector('.listOfTasks').append(newLi);
}

function DeleteSelected(event) {
    let selectedLI = document.querySelectorAll('.selected');
    selectedLI.forEach( (item) => {
        item.remove();
    })
}

function sortSelected(ul) {
    let selectedLI = document.querySelectorAll('.selected');
    let tempArr = Array.from(selectedLI);

    tempArr = tempArr.sort((a, b) => a.textContent > b.textContent ? 1 : -1);

    [].forEach.call(ul.children, (item) => {
        if (item.classList.contains('selected')) {
            let newLI = document.createElement('li');
            
            newLI.textContent = tempArr.shift().textContent;
            item.replaceWith(newLI);
        }
    })
}

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