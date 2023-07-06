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
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task){
        state.tasks.push(task)
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
    }
  },
});
