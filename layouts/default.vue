<template>
  <div class="layout">
    <el-container class="page-wrapper">
      <el-aside class="main-sidebar__wrapper" :width="asideWidth">
        <SideMenu />
      </el-aside>
      <el-container class="main-content__wrapper">
        <el-header class="main-header__wrapper" height="80px">
          <Header />
        </el-header>
        <slot />
      </el-container>
    </el-container>
    <ClientOnly>
      <DeleteModal v-if="modal.name === 'delete-modal'" />
      <NewItemModal v-if="modal.name === 'new-item-modal'" />
      <ChangeModal v-if="modal.name === 'change-modal'" />
      <TransactionModal v-if="modal.name === 'transaction-modal'" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Header from '@/components/layouts/Header.vue';
import SideMenu from '@/components/layouts/SideMenu.vue';
import { useLayoutStore } from '@/store/layout';
import DeleteModal from '@/components/modals/DeleteModal/index.vue';
import NewItemModal from '@/components/modals/NewItemModal/index.vue';
import ChangeModal from '@/components/modals/ChangeModal/index.vue';
import TransactionModal from '@/components/modals/TransactionModal/index.vue';

const layoutStore = useLayoutStore();
const { menuCollapsed, modal } = storeToRefs(layoutStore);

const asideWidth = computed<string>(() => (menuCollapsed.value ? '64px' : '200px'));
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}

.page-wrapper {
  height: 100%;
}

.main-sidebar__wrapper {
  position: relative;
  height: 100%;
  background-color: $white;
  box-shadow: 10px 20px 25px rgba(29, 52, 54, 0.08);
  transition: width .5s;
  overflow-x: hidden;
}

.main-content__wrapper {
  background-color: $white1;
}
.main-header__wrapper {
  padding: 0;
}
</style>
