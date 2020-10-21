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

    // let LIs = ul.children;
    // let indexs = '';
    // [].forEach.call(LIs, (item, index) => {
    //     if (item.classList.contains('selected')) {
    //         indexs += index + " ";
    //     } 
    // })

    // indexs = indexs.trim().split(' ');
    // indexs = [].map.call(indexs, (item) => Number.parseInt(item));

    // console.log(indexs);

    tempArr = tempArr.sort((a, b) => a.textContent > b.textContent ? 1 : -1);

    // tempArr.forEach( (item, index) => {
    //     if (indexs.includes(index)) {
    //         ul.append(item);
    //     }
    // })

    let i = 0;
    [].forEach.call(ul.children, (item) => {
        if (item.classList.contains('selected')) {
            console.log(item);
            let t = item;
            item = tempArr[i];
            tempArr[i++] = t;
            //item.before(tempArr[i++]);
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