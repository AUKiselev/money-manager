<template>
  <ClientOnly>
    <BlockWrapper title="Доходы">
      <template #content>
        <Item
          v-for="(item, index) of incomes"
          :key="`main-page-incomes-${index}`"
          :object-id="item._id"
          :sum="item.sum"
          :name="item.name"
          type="INCOME"
        />
        <NewItemButton type="INCOME" />
      </template>
    </BlockWrapper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import NewItemButton from '@/components/main/NewItemButton.vue';
import Item from '@/components/main/Item.vue';
import { useObjectsStore } from '@/store/objects';

const objectsStore = useObjectsStore();
const { incomes } = storeToRefs(objectsStore);

</script>

<style lang="scss" scoped>

</style>
