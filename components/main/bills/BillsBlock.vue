<template>
  <ClientOnly>
    <BlockWrapper title="Счета">
      <template #content>
        <ItemWrapper
          v-for="(item, index) of bills"
          :key="`main-page-bills-${index}`"
          :sum="item.sum"
          :name="item.name"
          type="BILL"
        />
      </template>
    </BlockWrapper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ItemWrapper from '@/components/main/ItemWrapper.vue';
import { useBillsStore } from '@/store/bills';

const billsStore = useBillsStore();
const { bills } = storeToRefs(billsStore);

</script>

<style lang="scss" scoped>

</style>
