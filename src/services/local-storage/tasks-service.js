class TasksService {
    tasks = []

    constructor(){
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    getAll(){
        return JSON.parse(JSON.stringify(this.tasks))
    }

    get(){}

    update(){}

    remove(){}

    create(task){
        this.tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}

export default new TasksService();