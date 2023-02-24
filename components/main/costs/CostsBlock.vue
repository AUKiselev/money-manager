<template>
  <ClientOnly>
    <BlockWrapper title="Расходы">
      <template #content>
        <ItemWrapper
          v-for="(item, index) of costs"
          :key="`main-page-costs-${index}`"
          :object-id="item._id"
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
import { useObjectsStore } from '@/store/objects';

const objectsStore = useObjectsStore();
const { costs } = storeToRefs(objectsStore);

</script>

<style lang="scss" scoped>

</style>
