class TasksService {
    tasks = []

    constructor(){
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    getAll(){
        return JSON.parse(JSON.stringify(this.tasks))
    }

    get(taskId){
        return this.getAll().find(t => t.id === taskId);
    }

    update(task){
        let taskIndex = this.tasks.findIndex(item => item.id === task.id);
        
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = task
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            return this.get(this.tasks[taskIndex].id);
        }

        return null;
    }

    switchCompleteState(task){
        if(!task) return;
        const taskOnList = this.tasks.find(item => item.id == task.id);
        taskOnList.done = !taskOnList.done;
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    remove(task){
        const index = this.tasks.findIndex(item => item.id == task.id);
        if(index !== -1){
            this.tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
    }

    create(task){
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        return this.get(this.tasks.id);
    }
}

export default new TasksService();