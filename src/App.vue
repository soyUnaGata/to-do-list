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
        <button type="button" class="main-btn calendar"
          :class="{ 'currentBtn': activeTab === TABS.CALENDAR, 'slide-in-left': activeTab === TABS.CALENDAR }"
          @click="activeShedule">Schedule</button>
        <button type="button" class="main-btn today"
          :class="{ 'currentBtn': activeTab === TABS.TODAY, 'slide-out-right': activeTab === TABS.TODAY }"
          @click="activeToday">Today</button>
      </div>

      <div class="wrapper margin-top-2rem" v-if="activeTab === TABS.CALENDAR">
        <div class="current-calendar">
          <Calendar :tasks="allTasks" @show-task="showTask"/>
        </div>
      </div>
    </main>

    <div v-if="activeTab === TABS.CALENDAR">
      <div class="calendar__details margin-top-3rem">
        <div class="schedule__details d-flex justify-content-between">
          <h3 class="headline__3">Schedule</h3>
          <div class="show__completed__details d-flex align-items-center gap-5px">
            <p class="completed__tasks-done">Done</p>
            <p class="completed__tasks-count">{{completedTasks.length }}</p>
            <span>from</span>
            <p class="summary__tasks">{{ allTasks.length }}</p>
            <input class="switch" name="switchCompleted" type="checkbox" v-model="showCompleted" />
          </div>
        </div>

        <div class="calendar__details-wrapper margin-top-2rem d-flex flex-column gap-10px">
          <div v-if="allTasks.length === 0" 
          class="task-not-exist d-flex align-items-center justify-content-center margin-top-1rem"
          > You don't have tasks</div>
          <TaskList v-if="showCompleted" :tasks="completedTasks" :colors="colors" @checked-task="checkTask" @deleted-task="deleteTask" />
          <TaskList v-else
            :tasks="filteredScheduleTasks"
            :colors="colors"
            @checked-task="checkTask"
            @edit-current-task="editTask"
            @deleted-task="deleteTask"/>
          </div>

      </div>
    </div>
    <div class="calendar__details-wrapper margin-top-2rem d-flex flex-column gap-10px" v-else="activeTab === TABS.TODAY">
      <div class="today-date__wrapper d-flex">
        <div class="data-right-side h-100"></div>
        <div class="date-text__style d-flex flex-column align-items-center w-100">
          <div class="today-date-text today-date">{{ todayDate }}</div>
          <div class="today-date-text today-day">{{ todayDay }}</div>
        </div>
      </div>

      <div class="task-not-exist d-flex align-items-center justify-content-center margin-top-1rem"
        v-if="tasksToday.length === 0"> You don't have tasks</div>

      <TaskList :tasks="tasksToday" :colors="colors" :activeToday="activeToday" @checked-task="checkTask"
        @edit-current-task="editTask" @deleted-task="deleteTask" />

    </div>

    <ModalForTask v-if="showModal" :colors="colors" @close="showModal = false" @save="saveTask" :task="selectedTask">
    </ModalForTask>
  </div>
</template>

<script>
import Calendar from './components/Calendar';
import ModalForTask from './components/ModalForTask.vue';
import TaskList from './components/TaskList.vue';
import moment from 'moment';
import {DATES} from './common/constants.js';
import {TABS} from './common/constants.js';

import {formatNumber} from './common/helper.js';

export default {
  components: {
    Calendar,
    ModalForTask,
    TaskList,
  },
  data() {
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
      activeTab: '',
      TABS: TABS,
      today: formatNumber(moment().format(DATES.FULL_FORMAT)),
      todayDate: moment().format(DATES.FULL_MONTH),
      todayDay: moment().format(DATES.DAY),
      dateFilter: ''
    }
  },
  mounted() {
    this.tasks = this.$store.dispatch('fetchTasks');
    this.activeTab = this.TABS.CALENDAR
  },
  methods: {
    activeShedule() {
      this.activeTab = this.TABS.CALENDAR
    },
    activeToday() {
      this.activeTab = this.TABS.TODAY
    },
    saveTask(task) {
      if (this.selectedTask.id) {
        this.$store.dispatch('updateTask', task);        
      } else {
        task.id = Math.floor(Math.random() * 100000000) + 1;
        this.$store.dispatch('createTask', task);
      }

      this.tasks = this.$store.dispatch('fetchTasks');
      this.showModal = false;
    },
    checkTask(task) {
      this.$store.dispatch('updateTask', Object.assign(task, { done: !task.done }))
    },
    addTask() {
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
    editTask(task) {
      this.selectedTask = Object.assign({}, task);
      this.showModal = true
    },
    deleteTask(task) {
      this.$store.dispatch('deleteTask', task);
      this.tasks = this.$store.dispatch('fetchTasks');
    },
    showTask(day){
      const formatedNum = formatNumber(day.day.date);
      const formatedMonth = formatNumber(day.day.currentMonth);
      const formatedYear = formatNumber(day.day.currentYear);
      this.dateFilter = `${formatedNum}.${formatedMonth}.${formatedYear}`;
    }
  },
  computed: {
    allTasks() {
      return this.$store.getters.allTasks;
    },
    sortedTasks() {
      return this.$store.getters.sortedTasks;
    },
    completedTasks(){
      return this.sortedTasks.filter(task => task.done)
    },
    scheduleTasks(){
      return this.sortedTasks.filter(task => !task.done);
    },
    filteredScheduleTasks(){
      if(!this.dateFilter) return this.scheduleTasks;
      if(this.today === this.dateFilter) return this.scheduleTasks;

      return this.scheduleTasks.filter(t => t.selectedDate === this.dateFilter)
    },
    tasksToday() {
      const today = moment().format(DATES.FULL_FORMAT);
      const formatedToday = formatNumber(today)
      return this.allTasks.filter(t => t.selectedDate === formatedToday && !t.done);
    },
    isTaskCompleted() {
      return this.$store.getters.isTaskCompleted;
    },

  },

};
</script>