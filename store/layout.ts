import { defineStore } from 'pinia';
import {
  IObjectModal, IChangeModal, INewItemModal, ITransactionModal,
} from '@/models/modals';

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    menuCollapsed: false as boolean,
    isLoading: false as boolean,
    modal: {} as IObjectModal | IChangeModal | INewItemModal | ITransactionModal,
  }),

  actions: {
    toggleMenuCollapse() {
      this.menuCollapsed = !this.menuCollapsed;
    },

    openModal(modalObject: IObjectModal | IChangeModal | INewItemModal | ITransactionModal) {
      this.modal = modalObject;
    },

    closeModal() {
      this.modal = {} as IObjectModal | IChangeModal;
    },
  },
});
