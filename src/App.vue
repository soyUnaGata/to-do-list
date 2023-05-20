<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
<div class="container">
  <header class="header d-flex justify-content-between align-items-center">
    <h3 class="headline">a.tiempo</h3>
    <span class="add-new-task" @click="showModal = true">+</span>
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
    <h3 class="headline__3">Schedule 
      <input name="showCompleted" type="checkbox" v-model="showCompleted"/>
    </h3>
    <div class="calendar__details-wrapper margin-top-2rem d-flex flex-column gap-10px">
      <TaskList  v-if="showCompleted" 
        :tasks="completedTasks"
        :colors="colors"
        @checked-task="checkTask"/>
      <TaskList v-else 
        :tasks="scheduleTasks"
        :colors="colors"
        @checked-task="checkTask"/>
    
    </div>
   
  </div>

  <ModalForTask 
    v-if="showModal" 
    :colors="colors"
    @close = "showModal = false"
    @save="saveTask">
  </ModalForTask>
</div>

</template>

<script>
import Calendar from './components/Calendar';
import ModalForTask from './components/ModalForTask.vue';
import ChekboxButton from './components/ChekboxButton.vue';
import TasksService from './services/local-storage/tasks-service';
import TaskList from './components/TaskList.vue';

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
    }
  },
  mounted() {
    this.tasks = TasksService.getAll()  
  },
  methods:{
    saveTask(task){
      TasksService.create(task);
      this.tasks = TasksService.getAll();
      this.showModal = false;
    },
    checkTask(task){
      console.log(task)
      this.task = task
      TasksService.switchCompleteState(task);
    },
    deleteTask(task){
      TasksService.remove(task);
      this.tasks = TasksService.getAll();
    }
  }, 
  computed:{
    completedTasks(){
      return this.tasks.filter(task => task.done)
    },
    scheduleTasks(){
      return this.tasks.filter(task => !task.done)
    },
  }
};
</script>