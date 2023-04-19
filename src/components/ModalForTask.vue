<template>
    <div class="modal-backdrop d-flex justify-content-center align-items-center">
            <div class="modal w-100 h-100 d-flex flex-column gap-10px">
                <header class="modal-header d-flex margin-top-1rem justify-content-between">
                    <slot name="close-modal">
                        <button type="button" class="btn-modal-style"
                            @click="$emit('close')">
                            <span class="material-symbols-outlined close">
                                arrow_back
                                </span>
                        </button>
                    </slot>

                    <slot name="save-modal">
                        <button type="button" class="btn-modal-style"
                        >
                            <span class="material-symbols-outlined save">
                                check
                            </span>
                        </button>
                    </slot>
                   
                </header>

                <section class="modal-title d-flex w-100">
                    <slot name="title">
                        <input class="input-title style-for-inputs w-100" type="text" placeholder="Type your task title...">
                     </slot>
                </section>

                <section class="modal-date d-flex w-100">
                    <slot name="date">
                        <VueDatePicker v-model="selectedDate" format="dd MMMM yyyy" :enable-time-picker="false" />
                     </slot>
                </section>

                <section class="modal-duration d-flex w-100">
                 <SelectDuration v-model="selectedDuration"/>
                </section>

                <section class="modal-color d-flex w-100 justify-content-around">
                    <slot name="color">
                        <!-- <li v-for="color in colors" @click="selectedColor = color" :class="['pick-color', color, selectedColor === color ? 'active' : '']"></li>  first variation-->
                        <RadioButton v-for="color in colors"  v-model="selectedColor" :radio-id="`radio-${color.id}-${color.color}`" group-name="color" :value="color.id" :class-name="color.color" />
                     </slot>
                </section>

                <section class="modal-place d-flex w-100">
                    <slot name="place">
                        <input class="input-place w-100" type="text">
                     </slot>
                </section>

                <section class="modal-notice d-flex w-100">
                    <slot name="notice">
                        <textarea class="input-notice w-100"></textarea>
                     </slot>
                </section>
          </div>
        </div>            
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import RadioButton from './RadioButton.vue';
import SelectDuration from './SelectDuration.vue';


const date = ref(new Date());
export default defineComponent ({
    components: {
        RadioButton,
        VueDatePicker,
        SelectDuration,
    },
    data() {
        return {
            // colors:[
            //     "green",
            //     "blue",
            //     "pink",
            //     "orange",
            //     "red",
            //     "yellow",
            // ] for variation with array,
            colors: [
                { id: 1, color: "green" },
                { id: 2, color: "blue" },
                { id: 3, color: "pink" },
                { id: 4, color: "orange" },
                { id: 5, color: "red" },
                { id: 6, color: "yellow" }
            ],
            color: 1,
            selectedColor: -1,
            groupName: "color-group",
            selectedDate: null,
            selectedDuration: '',
        }
    },
    methods: {
        close(){
            this.$emit('close')
        },
    }
})
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--modal-bg);
    z-index: var(--for-modal);
    background: -moz-linear-gradient(188.24deg, #2A2A2E 15.5%, #1F1338 55.67%, #000000 114.26%); /* FF3.6-15 */
    background: -webkit-linear-gradient(188.24deg, #2A2A2E 15.5%, #1F1338 55.67%, #000000 114.26%); /* Chrome10-25,Safari5.1-6 */
}
.modal {
overflow-x: auto;
padding: 0 1.5rem;
}
.btn-modal-style {
border: none;
background-color: transparent;
cursor: pointer;
color: var(--white);
}
.material-symbols-outlined {
font-size: 30px;
font-weight: var(--fw-500);
}
.save {
    color: var(--save-btn);
}
.modal-title {
    padding: 10px 0;
}
input[type="text"].input-title{
    outline: none;
    color: var(--input-text);
    font-size: 17px;
    line-height: 22px;
    text-align: left;
    padding: 8px 10px;
    font-weight: var(--fw-300);
}
input[type="text"].input-title:-webkit-autofil{
        color: var(--input-text);
        -webkit-text-fill-color: var(--input-text);
}
input[type="text"].input-title::placeholder{
        color: var(--input-text);
        font-size: 16px;
        font-weight: var(--fw-300);
        line-height: 22px;
        text-align: left;
        padding: 8px 10px;
}
/* .pick-color {
    width: 30px;
    height: 30px;
    cursor: pointer;
    list-style: none;
} */

/* .pick-color.active{
    border: 2px solid red;
} */

</style>