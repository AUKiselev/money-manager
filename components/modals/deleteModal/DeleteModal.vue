<template>
  <ModalWrapper>
    <template #content="parentProps">
      <div class="delete-modal">
        <p class="delete-modal__title">
          {{ title }}
        </p>
        <div class="delete-modal__buttons">
          <el-button class="delete-modal__button cancel-button" @click="parentProps.closeModal">
            Нет
          </el-button>
          <el-button class="delete-modal__button submit-button" @click="submitHandler(), parentProps.closeModal()">
            Да
          </el-button>
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ModalWrapper from '../ModalWrapper.vue';
import { useLayoutStore } from '@/store/layout';
import { useUserStore } from '@/store/user';
import { useObjectsStore } from '@/store/objects';

const layoutStore = useLayoutStore();
const { modal } = storeToRefs(layoutStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const objectsStore = useObjectsStore();
const { deleteObjectAndUpdateList } = objectsStore;

const submitHandler = () => {
  deleteObjectAndUpdateList(modal.value.objectType, modal.value.objectId, user.value.id);
};

const title = computed(() => {
  if (modal.value.objectType === 'BILL') {
    return `Вы действительно хотите удалить счет "${modal.value.objectName}"?`;
  }
  if (modal.value.objectType === 'INCOME') {
    return `Вы действительно хотите удалить статью дохода "${modal.value.objectName}"?`;
  }
  if (modal.value.objectType === 'COST') {
    return `Вы действительно хотите удалить статью расхода "${modal.value.objectName}"?`;
  }
  return '';
});
</script>

<style lang="scss" scoped>
.delete-modal {
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  &__title {
    width: max-content;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    width: 100px;
    height: 40px;
    margin: 0;
    border-radius: 8px;
    font-family: inherit;
    color: $white1;
    transition: all .3s;

    &.cancel-button {
      background-color: $red;

      &:hover,
      &:active,
      &:focus {
        border: 1px solid $red;
        background-color: $light-red;
        color: $red;
      }
    }

    &.submit-button {
      background-color: $green;

      &:hover,
      &:active,
      &:focus {
        border: 1px solid $green;
        background-color: $light-green;
        color: $green;
      }
    }
  }
}
</style>
