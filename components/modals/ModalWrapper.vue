<template>
  <div class="modal">
    <div class="modal__overlay" @click="closeHandler" />
    <div ref="modalWrapper" class="modal__wrapper">
      <button class="modal__close-button" @click="closeHandler">
        <Icon
          class="modal__close-icon"
          name="maki:cross"
          size="20px"
        />
      </button>
      <div class="modal__content">
        <slot name="content" :close-modal="closeHandler" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/layout';

const layoutStore = useLayoutStore();
const { closeModal } = layoutStore;

const modalWrapper = ref<HTMLInputElement | null>(null);

const closeHandler = () => {
  modalWrapper.value?.classList.remove('_active');
  setTimeout(() => {
    closeModal();
  }, 200);
};

onMounted(() => {
  setTimeout(() => {
    modalWrapper.value?.classList.add('_active');
  }, 0);
});
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__overlay {
    z-index: 100;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(5px);
  }

  &__wrapper {
    z-index: 110;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translate(-50%, calc(-50% - 50px));
    border-radius: 14px;
    padding: 20px;
    background-color: $white;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .20);
    transition: top .2s;

    &._active {
      top: 50%;
    }
  }

  &__close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: $black1;
    cursor: pointer;
    transition: color .2s;

    &:hover {
      color: $gray2;
    }
  }

  &__content {
    margin-top: 30px;
  }
}
</style>
