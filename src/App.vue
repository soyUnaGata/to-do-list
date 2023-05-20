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
      <div v-if="showCompleted" class="task__details d-flex gap-15px" v-for="(task, index) in completedTasks">
        <div class="my-line" :class="{ 'my-line--last-task' : index === completedTasks.length - 1 }"></div>

        <div class="date-style" :class="getColorById(task.color)">
          <span class="calendar-date">{{ task.date.substring(0, 2)}}</span>
        </div>

        <div class="main-task d-flex flex-column w-100 gap-10px" :class="getColorById(task.color)">
          <div class="task-check d-flex justify-content-between align-items-center">
            <p class="calendar-date__options task-option">{{ task.title}}</p>
            <div class="edit__task-option d-flex align-items-center gap-5px">
              <button class="edit-task-btn" type="button">
                <img class="edit-task-icon" src="../src/assets/img/edit-icon-light.svg" alt="">
              </button>
            <ChekboxButton
                v-model="task.done" :check-id="task.id"
               @click="checkTask(task)"
                />

            <!-- <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.90532L3.90531 6.81063L8.7475 1" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
            </div>
          
          </div>
          
          <div class="task-description">
            <p class="calendar-date__options" v-if="task.duration && task.duration.id !== 'd-empty'">Duration
              <span class="task-option">{{ task.duration.duration}}</span>     
            </p>
            <p class="calendar-date__options" v-if="task.location">Location 
              <span class="task-option">{{ task.location}}</span>
            </p>
            <p class="calendar-date__options" v-if="task.notice">Notice 
              <span class="task-option">{{ task.notice}}</span>
            </p>
          </div>
        
        </div>
        
      </div>
      <div v-else class="task__details d-flex gap-15px" v-for="(task, index) in scheduleTasks">
        <div class="my-line" :class="{ 'my-line--last-task' : index === scheduleTasks.length - 1 }"></div>

        <div class="date-style" :class="getColorById(task.color)">
          <span class="calendar-date">{{ task.date.substring(0, 2)}}</span>
        </div>

        <div class="main-task d-flex flex-column w-100 gap-10px" :class="getColorById(task.color)">
          <div class="task-check d-flex justify-content-between align-items-center">
            <p class="calendar-date__options task-option">{{ task.title}}</p>
            <div class="edit__task-option d-flex align-items-center gap-5px">
              <button class="edit-task-btn" type="button">
                <img class="edit-task-icon" src="../src/assets/img/edit-icon-light.svg" alt="">
              </button>
            <ChekboxButton
                v-model="task.done" :check-id="task.id"
               @click="checkTask(task)"
                />

            <!-- <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.90532L3.90531 6.81063L8.7475 1" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
            </div>
          
          </div>
          
          <div class="task-description">
            <p class="calendar-date__options" v-if="task.duration && task.duration.id !== 'd-empty'">Duration
              <span class="task-option">{{ task.duration.duration}}</span>     
            </p>
            <p class="calendar-date__options" v-if="task.location">Location 
              <span class="task-option">{{ task.location}}</span>
            </p>
            <p class="calendar-date__options" v-if="task.notice">Notice 
              <span class="task-option">{{ task.notice}}</span>
            </p>
          </div>
        
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
import ChekboxButton from './components/ChekboxButton.vue';
import TasksService from './services/local-storage/tasks-service';

export default {
  components:{
    Calendar,
    ModalForTask,
    ChekboxButton,
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
      showCompleted: false
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
      TasksService.switchCompleteState(task);
    },
    deleteTask(task){
      TasksService.remove(task);
      this.tasks = TasksService.getAll();
    },
    getColorById(id){
      const color = this.colors.find(c => c.id === id);
      return color?.color ?? 'default-color'
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