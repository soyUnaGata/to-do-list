<template>
    <div v-if=hasTasksToday() v-for="task in hasTasksToday">
        {{ task}}
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        tasks: {
            type: Array
        }
    },
    name: 'TabToday',
    data(){
        return {
            today: null,
        }
    },
    created(){
       const today = new Date();
       this.today = today,
       this.hasTasksToday()

    },
    watch: {      
        tasks: function(val){
            this.hasTasksToday()
        },
    },
    methods: {
        hasTasksToday(){
            const today = moment().format('DD.MM.YYYY'); 
            const formatedToday = this.formatNumber(today)
            console.log(formatedToday)
            const result = this.tasks.some(t => t.selectedDate === formatedToday)
            return result;
            // return this.tasks.some(t => t.selectedDate === `${day}.${month}.${year}`);
        },
        formatNumber(num) {
            return num >= 10 ? num.toString() : num.toString().padStart(2, '0')
        }
    }
}
</script>