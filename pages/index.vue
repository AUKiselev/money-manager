<template>
  <main class="main-content">
    <IncomesBlock />
    <BillsBlock />
    <CostsBlock />
  </main>
</template>

<script setup lang="ts">
import IncomesBlock from '@/components/pages/index/incomes/IncomesBlock/index.vue';
import BillsBlock from '@/components/pages/index/bills/BillsBlock/index.vue';
import CostsBlock from '@/components/pages/index/costs/CostsBlock/index.vue';
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
