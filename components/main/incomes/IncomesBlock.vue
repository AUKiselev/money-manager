<template>
  <ClientOnly>
    <BlockWrapper title="Доходы">
      <template #content>
        <ItemWrapper
          v-for="(item, index) of incomes"
          :key="`main-page-incomes-${index}`"
          :sum="item.sum"
          :name="item.name"
          type="INCOME"
        />
      <!-- <NewIncomeItem /> -->
      </template>
    </BlockWrapper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
// import NewIncomeItem from '@/components/main/incomes/NewIncomeItem.vue';
import ItemWrapper from '@/components/main/ItemWrapper.vue';
import { useIncomesStore } from '@/store/incomes';

const incomesStore = useIncomesStore();
const { incomes } = storeToRefs(incomesStore);

</script>

<style lang="scss" scoped>

</style>
