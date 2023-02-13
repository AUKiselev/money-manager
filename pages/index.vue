<template>
  <main class="main-content">
    <BlockWrapper title="Доходы">
      <template #content>
        <MoneyItem />
        <MoneyItem />
        <MoneyItem />
        <MoneyItem />
      </template>
    </BlockWrapper>
  </main>
</template>

<script setup lang="ts">
import MoneyItem from '@/components/main/MoneyItem.vue';
</script>

<style lang="scss" scoped>
.main-content {
  height: 100%;
  padding: 0 30px;
}
</style>
