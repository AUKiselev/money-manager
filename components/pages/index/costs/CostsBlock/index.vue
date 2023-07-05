<template>
  <ClientOnly>
    <BlockWrapper title="Расходы">
      <template #content>
        <Item
          v-for="(item, index) of costs"
          :key="`main-page-costs-${index}`"
          :object-id="item._id"
          v-bind="item"
          type="COST"
        />
        <NewItemButton type="COST" />
      </template>
    </BlockWrapper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import NewItemButton from '@/components/pages/index/NewItemButton/index.vue';
import { useObjectsStore } from '@/store/objects';

const objectsStore = useObjectsStore();
const { costs } = storeToRefs(objectsStore);

</script>

<style lang="scss" scoped>

</style>
