export default class Menu {
    constructor(elem) {
        this.elem = elem;
        this._action = '';
        elem.addEventListener('click', this.setAction.bind(this));
    }

    addAtStart(target) {
        let modal = document.querySelector('.addTask[data-modal="' + target.getAttribute('data-modal') + '"]');

        let buttonOK = document.querySelector('#add');
        let overlay = document.querySelector('.overlay');

        modal.classList.add('active');
        overlay.classList.add('active');

        buttonOK.onclick = this.addTask.bind(this);

        overlay.addEventListener('click', this.over);
    }

    over() {
        let modal = document.querySelector('.addTask');
        let overlay = document.querySelector('.overlay');

        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    addTask() {
        let task = '';

        let modal = document.querySelector('.addTask');
        let overlay = document.querySelector('.overlay');

        for (let child of modal.children) {
            if (child.type == 'text') {
                task = child.value;
                child.value = '';
            }
        }

        if (task) {
            modal.classList.remove('active');
            overlay.classList.remove('active');

            let newLi = document.createElement('li');
            newLi.textContent = task;

            if (this._action == 'addAtStart') {
                if (document.querySelector('.listOfTasks').children.length != 0) {
                    document.querySelector('.listOfTasks').children[0].before(newLi);
                } else {
                    document.querySelector('.listOfTasks').append(newLi);
                }
            } else if (this._action == 'addAtEnd') {
                document.querySelector('.listOfTasks').append(newLi);
            }
        }
    }

    addAtEnd(target) {
        let modal = document.querySelector('.addTask[data-modal="' + target.getAttribute('data-modal') + '"]');

        let buttonOK = document.querySelector('#add');
        let overlay = document.querySelector('.overlay');

        modal.classList.add('active');
        overlay.classList.add('active');

        buttonOK.onclick = this.addTask.bind(this);

        overlay.addEventListener('click', this.over);
    }

    DeleteSelected() {
        let selectedLI = document.querySelectorAll('.selected');
        selectedLI.forEach((item) => {
            item.remove();
        })
    }

    sortSelected(ul) {
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

    setAction(event) { 
        const ul = document.querySelector('.listOfTasks');
        this._action = event.target.dataset.action;
        switch (this._action) {
            case "addAtStart":  this.addAtStart(event.target); break;
            case "addAtEnd": this.addAtEnd(event.target); break;
            case "DeleteSelected": this.DeleteSelected(); break;
            case "sortSelected": this.sortSelected(ul); break;
            default: {
                console.error('Cannot set action ', this._action);
            }
        }
    }
}