<template>
    <div class="form_radio_group">
        <div class="form_radio_group-item" :class="className">
            <input type="radio" v-model="currentValue" :name="groupName" :id="radioId" :value="value">
            <label :for="radioId"></label>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
    props:{
    modelValue: {
      type: Number,
      required: true
    },
    radioId: {
      type: String,
      required: true
    },
    groupName: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
    emits: ['update:modelValue'],
    name: 'RadioButtons',
    computed:{
        currentValue: {
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