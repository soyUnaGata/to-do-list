<template>
   <div class="checkbox-style">
       <input class="select__check" type="checkbox" v-model="statusValue" :id="checkId"/>
        <label :for="checkId" :class="{ 'select__check__label--checked' : statusValue }"></label>
    </div>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
    props:{
    modelValue: {
      type: Boolean,
      required: true,
      default:false
    },
    checkId: {
      type: String,
      required: true
    }
  },
    emits: ['update:modelValue'],
    name: 'ChekboxButton',
    computed:{
        statusValue: {
            get(){
                return this.modelValue;
            },
            set(val){
                this.$emit('update:modelValue', val)
            }
        }
    }
})
</script>