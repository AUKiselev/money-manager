<template>
  <main class="main-content">
    <IncomesBlock />
    <BillsBlock />
    <CostsBlock />
  </main>
</template>

<script setup lang="ts">
import IncomesBlock from '@/components/main/incomes/IncomesBlock.vue';
import BillsBlock from '@/components/main/bills/BillsBlock.vue';
import CostsBlock from '@/components/main/costs/CostsBlock.vue';
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  height: 100%;
  padding: 0 30px;
}
</style>
