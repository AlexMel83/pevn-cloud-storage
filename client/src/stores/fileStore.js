import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
  state: () => ({
    // ваше начальное состояние
  }),
  getters: {
    // ваше состояние может также включать геттеры (аналогично селекторам в Redux)
  },
  actions: {
    // здесь вы можете добавлять методы для обновления состояния
  },
});
