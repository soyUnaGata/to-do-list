<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
<div class="container">
  <header class="header d-flex justify-content-between align-items-center">
    <h3 class="headline">a.tiempo</h3>
    <span class="add-new-task" @click="addTask">+</span>
  </header>

  <main class="main">
    <div class="schedule margin-top-2-5rem d-flex align-items-center justify-content-center gap-20px">
      <button type="button" class="main-btn calendar">Schedule</button>
      <button type="button" class="main-btn today">Today</button>
    </div>

    <div class="wrapper margin-top-2rem">
      <div class="current-calendar">
        <Calendar></Calendar>
      </div>
    </div>
  </main>

  <div class="calendar__details margin-top-3rem">
    <div class="schedule__details d-flex justify-content-between">
      <h3 class="headline__3">Schedule</h3>
      <div class="show__completed__details d-flex align-items-center gap-5px">
        <p class="completed__tasks-done">Done</p>
        <p class="completed__tasks-count">{{ completedTasks.length }}</p>
        <span>from</span>
        <p class="summary__tasks">{{ tasks.length }}</p> 
        <input class="switch" name="switchCompleted" type="checkbox" v-model="showCompleted"/>
      </div>
    </div>

    <div class="calendar__details-wrapper margin-top-2rem d-flex flex-column gap-10px">
      <TaskList  v-if="showCompleted" 
        :tasks="completedTasks"
        :colors="colors"
        @checked-task="checkTask"
        @deleted-task="deleteTask"/>
      <TaskList v-else 
        :tasks="scheduleTasks"
        :colors="colors"
        @checked-task="checkTask"
        @edit-current-task="editTask"
        @deleted-task="deleteTask"/>
    
    </div>
   
  </div>

  <ModalForTask 
    v-if="showModal" 
    :colors="colors"
    @close = "showModal = false"
    @save="saveTask"
    :task="selectedTask">
  </ModalForTask>
</div>

</template>

<script>
import Calendar from './components/Calendar';
import ModalForTask from './components/ModalForTask.vue';
import ChekboxButton from './components/ChekboxButton.vue';
import TasksService from './services/local-storage/tasks-service';
import TaskList from './components/TaskList.vue';
import moment from 'moment';

export default {
  components:{
    Calendar,
    ModalForTask,
    ChekboxButton,
    TaskList
  },
  data(){
    return {
      showModal: false,
      tasks: [],
      colors: [
        { id: 1, color: "green" },
        { id: 2, color: "blue" },
        { id: 3, color: "pink" },
        { id: 4, color: "orange" },
        { id: 5, color: "red" },
        { id: 6, color: "yellow" }
      ],
      showCompleted: false,
      task: [],
      selectedTask: null,
    }
  },
  mounted() {
    this.tasks = TasksService.getAll()  ;
  },
  methods:{
    saveTask(task){
      if(this.selectedTask.id){
        TasksService.update(task);
      }else{
        task.id = Math.floor(Math.random() * 100000000) + 1;
        TasksService.create(task);
      } 

      this.tasks = TasksService.getAll();
      this.showModal = false;
    },
    checkTask(task){
      this.task = task
      TasksService.switchCompleteState(task);
    },
    addTask(){
      this.selectedTask = {
        id: null,
        title: '',
        color: null,
        location: '',
        selectedColor: -1,
        groupName: "color-group",
        selectedDate: '',
        selectedDuration: null,
        notice: null,
        done: false,
      };
      this.showModal = true;
    },
    editTask(task){
      this.selectedTask = Object.assign({}, task);
      this.showModal = true
    },
    deleteTask(task){
      TasksService.remove(task);
      this.tasks = TasksService.getAll();
    }
  }, 
  computed:{
    sortedTasks(){
      return this.tasks.sort((a, b) => {
        const aDate = moment(a.selectedDate, 'DD.MM.YYYY');
        const bDate = moment(b.selectedDate, 'DD.MM.YYYY');
        return aDate.isBefore(bDate) ? -1 : 1;
      });
    },
    completedTasks(){
      return this.sortedTasks.filter(task => task.done)
    },
    scheduleTasks(){
      return this.sortedTasks.filter(task => !task.done);
    },
  }
};
</script>