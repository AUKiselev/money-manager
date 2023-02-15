<template>
  <div class="new-item">
    <button class="new-item__add" @click="test()">
      <Icon
        class="new-item__icon"
        name="ic:baseline-plus"
        size="50px"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useIncomesStore } from '@/store/incomes';

const incomesStore = useIncomesStore();
const { createNewIncome } = incomesStore;

const test = () => {
  createNewIncome('test123');
};
</script>

<style lang="scss" scoped>
.new-item {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 95px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid $gray1;

  &__add {
    min-height: 95px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid $gray1;
    background-color: $white;
    cursor: pointer;
  }

  &__icon {
    max-width: 50px;
    max-height: 50px;
    width: 100%;
    height: 100%;
    color: $gray1;
    border-radius: 50%;
    outline: 4px solid $gray1;
  }
}
</style>
