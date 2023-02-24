<template>
  <div class="layout">
    <ClientOnly>
      <DeleteModal v-if="modal.name === 'delete-modal'" />
    </ClientOnly>
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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Header from '@/components/layouts/Header.vue';
import SideMenu from '@/components/layouts/SideMenu.vue';
import { useLayoutStore } from '@/store/layout';
import DeleteModal from '@/components/modals/deleteModal/DeleteModal.vue';

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
