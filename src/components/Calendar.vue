<template>
    <div class="my-calendar d-flex flex-column">
        <div class="current-date d-flex justify-content-between">
            {{ title }}
            <div class="icons d-flex gap-5px">
                <span class="material-symbols-outlined" @click="preview">chevron_left</span>
                <span class="material-symbols-outlined" @click="next">chevron_right</span>
            </div>
        </div>
        <table class="main-calendar margin-top-0-5rem">
            <tr class="weeks">
                <td v-for="dayTitle in dayTitles">{{ dayTitle }}</td>
            </tr>
            <tr class="days" v-for="week in weeks">
                <td v-for="day in week" :class="{ 'active': day.isToday, 'inactive': !day.isCurrentMonth, 'has-date': day.hasTask }">
                    <div></div>
                    {{ day.date }}</td>
            </tr>
        </table>
    </div>

</template>



<script>
import moment from 'moment';

    export default({
        props:{
            tasks:{
                type: Array
            }
        },
        data(){
            return {
                dayTitles: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                today: null,
                current: new Date(),
                title: '',
                weeks: [],
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            }
        },
        watch: {
            current: function(val){
                console.log('current: ', val)
            },
            tasks: function(val){
                this.drawTable()
            },
        },
        methods:{
            preview(){
                const date = Object.assign(this.current);
                date.setMonth(date.getMonth() - 1);
                this.setCurrent(date);
            },
            next(){
                const date = Object.assign(this.current);
                date.setMonth(date.getMonth() + 1);
                this.setCurrent(date)
            },
            setCurrent(date){
                this.current = date;
                this.drawTable();
                this.title = `${this.months[this.current.getMonth()]}  ${this.current.getFullYear()}`;
            },
            drawTable(){
                const currentDate = Object.assign(this.current);

                const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);


                const startDayOfWeek = start.getDay(); // day of week 0..6
                start.setDate(start.getDate() - startDayOfWeek);

                const endDayOfWeek = end.getDay();
                end.setDate(end.getDate() + (6 - endDayOfWeek));

                const weeks = [];
                let weekDays = [];

                while(start <= end)
                {
                    const isToday = (start.getDate() === this.today.getDate() 
                        && start.getMonth() === this.today.getMonth()
                        && start.getFullYear() === this.today.getFullYear());

                    const isCurrentMonth = start.getMonth() === this.current.getMonth();
                     
                    const day = {
                        date: start.getDate(),
                        isToday: isToday,
                        isCurrentMonth: isCurrentMonth, 
                        hasTask: this.hasTasks(start)
                    }
                    weekDays.push(day)
                    start.setDate(start.getDate() + 1);
                    
                    if (start.getDay() === 0){
                        weeks.push(weekDays);
                        weekDays = [];
                    }
                }
                
                this.weeks = weeks;
            },
            hasTasks(date){
                const day = this.formatNumber(date.getDate());
                const month = this.formatNumber(date.getMonth() + 1) ;
                const year = date.getFullYear();
                return this.tasks.some(t => t.selectedDate === `${day}.${month}.${year}`);
            },
            formatNumber(num) {
                return num >= 10 ? num.toString() : num.toString().padStart(2, '0')
            }
        },
        created(){
            const today = new Date();
            this.today = today;
            this.setCurrent(new Date(today.getFullYear(), today.getMonth(), 1));
            this.drawTable();
        }
    })

</script>