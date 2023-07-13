<template>
    <div class="task__details d-flex gap-15px"  v-for="(task, index) in tasks">
        <div class="my-line" :class="[ {'my-line--last-task' : index === tasks.length - 1}]" v-if="!activeToday"></div>

        <div class="date-style" :class="[getColorById(task.selectedColor), isPastDate(task) ? 'previous-date' : '']" v-if="!activeToday">
          <span class="calendar-date">{{ task.selectedDate?.substring(2,0) }}</span>
        </div>

        <div class="main-task d-flex flex-column w-100 gap-10px" :class="[getColorById(task.selectedColor), isPastDate(task) ? 'previous-date' : '']">
          <div class="task-check d-flex justify-content-between align-items-center gap-10px">
            <p class="calendar-date__options task-option" :class="{ 'line-through': task.done }">{{ task.title}}</p>
            <div class="edit__task-option d-flex align-items-center gap-5px">
              <button class="edit-task-btn" type="button" 
              :class="{ 'hide-component': task.done }"
              @click="editCurrentTask(task)">
                <img class="edit-task-icon" src="../assets/img/edit-icon-light.svg" alt="Edit">
              </button>
            <ReadonlyChekbox v-model="task.done" :check-id="task.id" @change="$emit('checked-task', task)"/>
            <button class="delete-task-btn" type="button" @click="deletedTask(task)">
              <img class="edit-task-icon" src="../assets/img/delete-icon.svg" alt="">
            </button>
            </div>
          
          </div>
          
          <div class="task-description">
            <p class="calendar-date__options" v-if="task.selectedDuration && task.selectedDuration.id !== 'd-empty'">Duration
              <span class="task-option">{{ task?.selectedDuration.duration}}</span>     
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
</template>

<script>
import ReadonlyChekbox from './ReadonlyChekbox.vue';
import moment from 'moment';
import { DATES } from '@/common/constants';

export default {
    props:{
      tasks: {
        type: Array,
      },
      colors:{
        type: Array
      },
      activeToday:{
        type: Function
      },
    },
    name: 'taskList',
    emits:['checked-task','edit-current-task', 'deleted-task'],
    components:{
      ReadonlyChekbox,
    },
    methods: {
      editCurrentTask(task){
        this.$emit('edit-current-task', task)
      },
      deletedTask(task){
        this.$emit('deleted-task', task)
      },
      getColorById(id){
        const color = this.colors.find(c => c.id === id);
        return color?.color ?? 'default-color'
      },
      isPastDate(task){
        const currentDate = moment();
        const taskDate = moment(task.selectedDate, DATES.FULL_FORMAT);
        return currentDate.diff(taskDate, 'd') > 0;
      },
    },
}
</script>