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

    switchCompleteState(task){
        if(!task) return;
        const taskOnList = this.tasks.find(item => item.id == task.id);
        taskOnList.done = !taskOnList.done;
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    remove(task){
        const index = this.tasks.findIndex(item => item.id == task.id);
        console.log(index)

        if(index !== -1){
            this.tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
     
    }

    create(task){
        this.tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}

export default new TasksService();