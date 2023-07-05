<template>
  <div class="new-item">
    <button class="new-item__button" @click="clickHandler">
      <Icon
        class="new-item__icon"
        name="ic:baseline-plus"
        size="50px"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/store/layout';
import { useUserStore } from '@/store/user';

interface IProps {
  type: 'BILL' | 'INCOME' | 'COST'
}
const props = defineProps<IProps>();

const layoutStore = useLayoutStore();
const { openModal } = layoutStore;

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const clickHandler = () => {
  const userId = user.value.id;
  openModal({
    name: 'new-item-modal',
    objectType: props.type,
    userId,
  });
};
</script>

<style lang="scss" scoped>
.new-item {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 175px;
  min-height: 103px;
  width: 100%;
  height: 100%;

  &__button {
    min-height: 103px;
    width: 100%;
    height: 100%;
    border-radius: 14px;
    border: 2px solid $gray2;
    background-color: rgba(0, 0, 0, 0);
    color: $gray2;
    cursor: pointer;
    transition: color .2s, border-color .2s;

    &:active {
      border-color: $gray1;
      color: $gray1;

      & .new-item__icon {
        border-color: $gray1;
      }
    }
  }

  &__icon {
    max-width: 50px;
    max-height: 50px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid $gray2;
    transition: border-color .2s;
  }
}
</style>
