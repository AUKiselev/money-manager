import { defineStore } from 'pinia';
import { IObjectModal, IChangeModal, INewItemModal } from '@/models/modals';

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    menuCollapsed: false as boolean,
    isLoading: false as boolean,
    modal: {} as IObjectModal | IChangeModal | INewItemModal,
  }),

  actions: {
    toggleMenuCollapse() {
      this.menuCollapsed = !this.menuCollapsed;
    },

    openModal(modalObject: IObjectModal | IChangeModal | INewItemModal) {
      this.modal = modalObject;
    },

    closeModal() {
      this.modal = {} as IObjectModal | IChangeModal;
    },
  },
});
