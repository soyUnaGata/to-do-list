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

<style>
.default-color {
    background-color: var( --btn-blue);
}
.green {
    background-color: var(--pick-green);
}
.pink {
    background-color: var(--pick-pink);
}
.orange {
    background-color: var(--pick-orange);
}
.blue {
    background-color: var(--pick-blue);
}
.red {
    background-color: var(--pick-red);
}
.yellow {
    background-color: var(--pick-yellow);
}

.form_radio_group {
	display: inline-block;
	overflow: hidden;
}
.form_radio_group-item {
	display: inline-block;
	float: left;  
    width: 35px;
    height: 35px;  
}
.form_radio_group input[type=radio] {
	display: none;
}
.form_radio_group label {
	display: inline-block;
	cursor: pointer;
	border-right: none;
	user-select: none;
    width: 35px;
    height: 35px; 
}
/* Checked */
.form_radio_group input[type=radio]:checked + label {
	border: 2px solid var(--save-btn);
}
/* Hover */
.form_radio_group label:hover {
	color: #666;
}

</style>