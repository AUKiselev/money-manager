<template>
  <ClientOnly>
    <div class="main-header">
      <div class="user-info">
        <p class="user-info__name">
          {{ getFullName }}
        </p>
        <Icon
          class="user-info__avatar"
          size="35px"
          name="line-md:account"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const { getFullName } = storeToRefs(userStore);
</script>

<style lang="scss" scoped>
.main-header {
  height: 100%;
}

.user-info {
  display: flex;
  align-items: center;
  column-gap: 20px;
  width: fit-content;
  height: 100%;
  margin: 0 30px 0 auto;

  &__name {
    font-size: 20px;
    line-height: 30px;
    font-weight: 500;
  }

  &__avatar {
    max-width: 35px;
    max-height: 35px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid $turquoise1; // или $gray2
    color: $black1;
  }
}
</style>
