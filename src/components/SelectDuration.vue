<template>
    <slot name="duration">
        <!-- <select class="select-duration w-100">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="all-day">All Day</option>
        </select> -->
    </slot>
    <div class="select-duration w-100">
        <button  type="button" class="select-duration-btn d-flex justify-content-between w-100 style-for-inputs" @click.stop="show = !show">
            <span class="select-duration-text">{{currentValue.duration}}</span>
            <img class="select-duration-img select-duration-arrow" v-if="show" src="../assets/img/arrow-small-up.svg" />
            <img class="select-duration-img select-duration-arrow" v-else src="../assets/img/arrow-small-down.svg" />
        </button>
    </div>

    <Transition>
            <div class="select-duration-menu" v-if="show">
                <div class="select-duration-item" v-for="dur in durations" @click.stop="select(dur)">
                    <span>{{ dur.duration }}</span>
                </div>
            </div>
    </Transition>
</template>

<script>
 import { defineComponent } from 'vue';

export default defineComponent ({
    props:{
            modelValue: {
                type: String,
                required: true
            }
        },
        emits: ['update:modelValue'],
    data(){
        return {
            durations: [
                {id: 'd-emmpty', duration: 'None'},
                { id: 'd-1', duration: 1 },
                { id: 'd-2', duration: 2 },
                { id: 'd-3', duration: 3 },
                { id: 'd-4', duration: 4 },
                { id: 'd-5', duration: 5 },
                { id: 'd-6', duration: 6 },
                { id: 'd-7', duration: 7 },
                { id: 'd-8', duration: 8 },
                { id: 'd-9', duration: 9 },
                { id: 'all-day', duration: 'All Day'}
            ],
            show: false,
        }
    },  
    computed: {
        currentValue: {
            get(){
                return this.modelValue;
            },
            set(val){
                this.$emit('update:modelValue', val)
            }
        }
    },
    methods:{
            select(duration){
                this.currentValue = duration;
                this.show = false;
            },
            hide(){
                this.show = false;
            }
        },
        mounted(){
            window.addEventListener('click', this.hide)
        },
        unmounted(){
            window.removeEventListener('click', this.hide);
        }
})
</script>

<style scoped>
select {
  padding: 5px 35px 5px 5px;
  font-size: 16px;
  border: 1px solid #CCC;
  height: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(../assets/img/arrow_drop_down.svg) 99% / 11% no-repeat var(--inputs);
}
select::-ms-expand {
    display: none; /* Remove default arrow in Internet Explorer 10 and 11 */
}

.select-duration{
    position: relative;
}
.select-duration-btn{
    padding: 15px 16px;
    gap: 10px;
}
    .select-duration-btn--empty{
        width: 127px;
        height: 50px;
    }
    .select-duration-img{
        height: 20px;
        width: 20px;
    }
    .select-duration-item{
        padding: 15px 16px;
        display: flex;
        gap: 10px;    
        cursor: pointer;
    }
    .select-duration-menu{
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        max-height: 200px;
        overflow: auto;
    }
</style>