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
    <h3 class="headline__3">Schedule</h3>
    <div class="calendar__details-wrapper margin-top-2rem d-flex flex-column gap-10px">
      <div class="task__details d-flex gap-15px" v-for="task in tasks">
        <div class="date-style" :class="getColorById(task.color)">
          <span class="calendar-date">{{ task.date.substring(0, 2)}}</span>
        </div>

        <div class="main-task d-flex flex-column">
          <p class="calendar-date__options task-option">{{ task.title}}</p>
          <p class="calendar-date__options" v-if="task.duration">Duration:
            <span class="task-option">{{ task.duration.duration}}</span>     
          </p>
          <p class="calendar-date__options" v-if="task.location">Location: 
            <span class="task-option">{{ task.location}}</span>
          </p>
          <p class="calendar-date__options" v-if="task.notice">Notice: 
            <span class="task-option">{{ task.notice}}</span>
          </p>
        </div>
        
      </div>
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
      colors: [
                { id: 1, color: "green" },
                { id: 2, color: "blue" },
                { id: 3, color: "pink" },
                { id: 4, color: "orange" },
                { id: 5, color: "red" },
                { id: 6, color: "yellow" }
            ],
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
    getColorById(id){
      const color = this.colors.find(c => c.id === id);
      return color?.color ?? 'default-color'
    }
  }

};
</script>