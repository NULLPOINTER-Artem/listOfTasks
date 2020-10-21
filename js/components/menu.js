export default class Menu {
    constructor(elem) {
        this.elem = elem;
        this._action = '';
        this.modal = document.querySelector('.addTask');
        this.overlay = document.querySelector('.overlay');
        this.ul = document.querySelector('.listOfTasks');

        elem.addEventListener('click', this.setAction.bind(this));
    }

    addAtStart(target) {
        this.modal = document.querySelector('.addTask[data-modal="' + target.getAttribute('data-modal') + '"]');

        let buttonOK = this.modal.querySelector('#add');

        this.modal.classList.add('active');
        this.overlay.classList.add('active');

        buttonOK.onclick = this.addTask.bind(this);

        this.overlay.onclick = this.over.bind(this);
    }

    over() {
        this.modal.classList.remove('active');
        this.overlay.classList.remove('active');
    }

    addTask() {
        let task = '';

        for (let child of this.modal.children) {
            if (child.type == 'text') {
                task = child.value;
                child.value = '';
            }
        }

        if (task) {
            this.modal.classList.remove('active');
            this.overlay.classList.remove('active');

            let newLi = document.createElement('li');
            newLi.textContent = task;

            if (this._action == 'addAtStart') {
                if (this.ul.children.length != 0) {
                    this.ul.children[0].before(newLi);
                } else {
                    this.ul.append(newLi);
                }
            } else if (this._action == 'addAtEnd') {
                this.ul.append(newLi);
            }
        }
    }

    addAtEnd(target) {
        this.modal = document.querySelector('.addTask[data-modal="' + target.getAttribute('data-modal') + '"]');

        let buttonOK = this.modal.querySelector('#add');

        this.modal.classList.add('active');
        this.overlay.classList.add('active');

        buttonOK.onclick = this.addTask.bind(this);

        this.overlay.onclick = this.over.bind(this);
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
        this._action = event.target.dataset.action;
        switch (this._action) {
            case "addAtStart":  this.addAtStart(event.target); break;
            case "addAtEnd": this.addAtEnd(event.target); break;
            case "DeleteSelected": this.DeleteSelected(); break;
            case "sortSelected": this.sortSelected(this.ul); break;
            default: {
                console.error('Cannot set action ', this._action);
            }
        }
    }
}