<template>
  <ClientOnly>
    <BlockWrapper title="Доходы">
      <template #content>
        <Item
          v-for="(item, index) of incomes"
          :key="`main-page-incomes-${index}`"
          :object-id="item._id"
          v-bind="item"
          type="INCOME"
        />
        <NewItemButton type="INCOME" />
      </template>
    </BlockWrapper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import NewItemButton from '@/components/pages/index/NewItemButton/index.vue';
import { useObjectsStore } from '@/store/objects';

const objectsStore = useObjectsStore();
const { incomes } = storeToRefs(objectsStore);

</script>

<style lang="scss" scoped>

</style>
