<template>
   <div v-if="tasksToday.length">
        <div v-for="task in tasksToday">
            <div>
                {{ task.title }}
                <TaskList/>
            </div>
        </div>
    </div>

    <div v-else>
        "You don't have any tasks for today"
    </div>
</template>

<script>
import moment from 'moment';
import TaskList from './TaskList.vue'
export default {
    props: {
        tasks: {
            type: Array
        }
    },
    name: 'TabToday',
    components:{
        TaskList
    },
    data(){
        return {
            today: this.formatNumber(moment().format('DD.MM.YYYY')),
        }
    },
    created(){
    //    const today = new Date();
    //    this.today = today
    },
    watch: {      
        tasks: function(val){
           
        },
    },
    methods: {
        formatNumber(num) {
            return num >= 10 ? num.toString() : num.toString().padStart(2, '0')
        }
    },
    computed:{
        tasksToday(){
            const today = moment().format('DD.MM.YYYY'); 
            const formatedToday = this.formatNumber(today)
            return this.tasks.filter(t => t.selectedDate === formatedToday);
            // return this.tasks.some(t => t.selectedDate === `${day}.${month}.${year}`);
        },
    }
}
</script>