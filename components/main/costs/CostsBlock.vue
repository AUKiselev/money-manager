<template>
  <ClientOnly>
    <BlockWrapper title="Расходы">
      <template #content>
        <ItemWrapper
          v-for="(item, index) of costs"
          :key="`main-page-costs-${index}`"
          :sum="item.sum"
          :name="item.name"
          type="COST"
        />
      </template>
    </BlockWrapper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ItemWrapper from '@/components/main/ItemWrapper.vue';
import { useCostsStore } from '@/store/costs';

const costsStore = useCostsStore();
const { costs } = storeToRefs(costsStore);

</script>

<style lang="scss" scoped>

</style>
