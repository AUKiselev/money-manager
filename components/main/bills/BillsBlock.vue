<template>
  <ClientOnly>
    <BlockWrapper title="Счета">
      <template #content>
        <ItemWrapper
          v-for="(item, index) of bills"
          :key="`main-page-bills-${index}`"
          :object-id="item._id"
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
import { useObjectsStore } from '@/store/objects';

const objectsStore = useObjectsStore();
const { bills } = storeToRefs(objectsStore);
</script>

<style lang="scss" scoped>

</style>
