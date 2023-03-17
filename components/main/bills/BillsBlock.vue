<template>
  <ClientOnly>
    <BlockWrapper title="Счета">
      <template #content>
        <Item
          v-for="(item, index) of bills"
          :key="`main-page-bills-${index}`"
          :object-id="item._id"
          v-bind="item"
          type="BILL"
        />
        <NewItemButton type="BILL" />
      </template>
    </BlockWrapper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Item from '@/components/main/Item.vue';
import NewItemButton from '@/components/main/NewItemButton.vue';
import { useObjectsStore } from '@/store/objects';

const objectsStore = useObjectsStore();
const { bills } = storeToRefs(objectsStore);
</script>

<style lang="scss" scoped>

</style>
