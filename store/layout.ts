import { defineStore } from 'pinia';
import { IObjectModal, IChangeModal } from '@/models/modals';

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    menuCollapsed: false as boolean,
    isLoading: false as boolean,
    modal: {} as IObjectModal | IChangeModal,
  }),

  actions: {
    toggleMenuCollapse() {
      this.menuCollapsed = !this.menuCollapsed;
    },

    openModal(modalObject: IObjectModal | IChangeModal) {
      this.modal = modalObject;
    },

    closeModal() {
      this.modal = {} as IObjectModal | IChangeModal;
    },
  },
});
