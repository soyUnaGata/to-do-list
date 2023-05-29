<template>
    <div class="task__details d-flex gap-15px" v-for="(task, index) in tasks">
        <div class="my-line" :class="{ 'my-line--last-task' : index === tasks.length - 1 }"></div>

        <div class="date-style" :class="getColorById(task.selectedColor)">
          <span class="calendar-date">{{ task.selectedDate?.substring(2,0)}}</span>
        </div>

        <div class="main-task d-flex flex-column w-100 gap-10px" :class="getColorById(task.selectedColor)">
          <div class="task-check d-flex justify-content-between align-items-center">
            <p class="calendar-date__options task-option" :class="{ 'line-through': task.done }">{{ task.title}}</p>
            <div class="edit__task-option d-flex align-items-center gap-5px">
              <button class="edit-task-btn" type="button" 
              :class="{ 'hide-component': task.done }"
              @click="editCurrentTask(task)">
                <img class="edit-task-icon" src="../assets/img/edit-icon-light.svg" alt="">
              </button>
            <ChekboxButton
              v-model="task.done" :check-id="task.id"
              @click="checkedTask(task)"
            />
            <button class="delete-task-btn" type="button" @click="deletedTask(task)">
              <img class="edit-task-icon" src="../assets/img/delete-icon.svg" alt="">
            </button>

            <!-- <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.90532L3.90531 6.81063L8.7475 1" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
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
import ChekboxButton from './ChekboxButton.vue';

export default {
    props:{
      tasks: {
        type: Array,
      },
      colors:{
        type: Array
      }
    },
    name: 'taskList',
    emits:['checked-task','edit-current-task', 'deleted-task'],
    components:{
      ChekboxButton,
 
    },
    methods: {
      checkedTask(task){
        this.$emit('checked-task', task)
      },
      editCurrentTask(task){
        this.$emit('edit-current-task', task)
      },
      deletedTask(task){
        this.$emit('deleted-task', task)
      },
      getColorById(id){
        const color = this.colors.find(c => c.id === id);
        return color?.color ?? 'default-color'
      }
    },
}
</script>