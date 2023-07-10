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
    //   type: String,
      type: Number,
      required: true
    }
  },
    emits: ['update:modelValue'],
    name: 'ReadonlyChekbox',
    computed:{
      statusValue(){
        return this.modelValue;
      }
    }
})
</script>