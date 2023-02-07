import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    menuCollapsed: false as boolean,
  }),

  actions: {
    toggleMenuCollapse() {
      this.menuCollapsed = !this.menuCollapsed;
    },
  },
});
