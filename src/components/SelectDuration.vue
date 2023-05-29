<template>
    <div class="select-duration w-100">
        <button  type="button" class="select-duration-btn d-flex justify-content-between w-100 style-for-inputs" @click.stop="show = !show">
            <span class="select-duration-text">{{currentValue?.duration}}</span>
            <img class="select-duration-img select-duration-arrow" v-if="show" src="../assets/img/arrow-small-up.svg" />
            <img class="select-duration-img select-duration-arrow" v-else src="../assets/img/arrow-small-down.svg" />
        </button>
    </div>

    <Transition>
            <div class="select-duration-menu d-flex flex-column" v-if="show">
                <div class="select-duration-item" v-for="(dur, index) in durations" @click.stop="select(dur)">
                    <span>{{ dur.duration}}</span>
                </div>
            </div>
    </Transition>
</template>

<script>
 import { defineComponent } from 'vue';

export default defineComponent ({
    props:{
            modelValue: {
                type: Object,
                required: true
            }
        },
        emits: ['update:modelValue'],
    data(){
        return {
            durations: [
                {id: 'd-empty', duration: 'Duration none'},
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
            select(dur){
                this.currentValue = dur;
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

.select-duration{
    position: relative;
}
.select-duration-btn{
    padding: 15px 16px;
    gap: 10px;
    color: var(--input-text);
    font-size: 16px;
    font-weight: var(--fw-300);
    line-height: 22px;
    text-align: left;

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
    position: absolute;
    top: 245px;
    left: 25px;
    z-index: 99;
    max-height: 200px;
    overflow: auto;
    width: 87%;
    margin-top: 10px;
    background-color: rgba(204, 194, 254, 0.6);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.4px);
    -webkit-backdrop-filter: blur(9.4px);
    border: 1px solid rgba(204, 194, 254, 1);
    border-radius: 10px;
    color: var(--input-text);
}
</style>