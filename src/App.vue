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

  <div class="calendar__details">
    <div class="calendar__details-wrapper" v-for="task in tasks">
      <span class="calendar-date">{{ task.date.substring(0, 2)}}</span>
      <span class="calendar-date">{{ task.title}}</span>

    </div>
  </div>

  <ModalForTask 
  v-if="showModal" 
  :tasks="tasks"
  @close = "showModal = false"
  @save="saveTask">
  </ModalForTask>
</div>

</template>

<script>
 import Calendar from './components/Calendar';
import ModalForTask from './components/ModalForTask.vue';
import TasksService from './services/local-storage/tasks-service';

export default {
  components:{
    Calendar,
    ModalForTask,
},
  data(){
    return {
      showModal: false,
      tasks: [],
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
  }

};
</script>