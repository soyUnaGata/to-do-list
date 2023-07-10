import { createStore } from "vuex";
import TasksService from "@/services/local-storage/tasks-service";

export default createStore({
  state: {
    tasks: [],
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
    // updateCurrentTask: (state) => (id) => {
    //   console.log(state.tasks.find(task => task.id === id))
    //   return state.tasks.find(task => task.id === id);
    // },
    isTaskCompleted(state){
      return state.tasks.filter(task => task.done)
    },
    
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task){
      state.tasks.push(task)
    },
    UPDATE_TASK(state, updatedTask){
      const index = state.tasks.findIndex(t => t.id === updatedTask.id);
      if(index !== -1){
        state.tasks[index] = updatedTask;
      }
    }
  },
  actions: {
    fetchTasks({commit}){
      const tasks = TasksService.getAll();
      commit('SET_TASKS', tasks)
    },
    createTask({commit}, task){
      const createdTask = TasksService.create(task);
      commit('ADD_TASK', createdTask)
    },
    updateTask({commit}, task){
      const updatedTask = TasksService.update(task);
      commit('UPDATE_TASK', updatedTask)
    }
  },
});
