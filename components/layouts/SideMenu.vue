<template>
  <nav :class="['left-aside', {'__collapsed' : menuCollapsed}]">
    <el-menu
      class="main-menu"
      :router="true"
      :default-active="activePath()"
      :collapse="menuCollapsed"
    >
      <el-menu-item
        v-for="(item, index) of menuList"
        :key="`main-menu__item-${index}`"
        :index="item.index"
        class="main-menu__item"
      >
        <Icon :name="item.icon" size="24px" />
        <template #title>
          <span class="main-menu__title" v-html="item.title" />
        </template>
      </el-menu-item>
    </el-menu>
    <button class="collapse-togler" @click="toggleMenuCollapse">
      <Icon
        class="collapse-togler__icon"
        name="line-md:chevron-double-left"
        size="30px"
      />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/store/layout';

const layoutStore = useLayoutStore();
const { menuCollapsed } = storeToRefs(layoutStore);
const { toggleMenuCollapse } = layoutStore;

const menuList = reactive({
  main: {
    title: 'Главная',
    index: '/',
    icon: 'dashicons:admin-home',
  },
  statistics: {
    title: 'Статистика',
    index: '/statistics',
    icon: 'dashicons:chart-bar',
  },
  settings: {
    title: 'Настройки',
    index: '/settings',
    icon: 'dashicons:admin-generic',
  },
  logout: {
    title: 'Выйти',
    index: '/logout',
    icon: 'ri:arrow-go-back-fill',
  },
});

const route = useRoute();
const activePath = () => route.path;
</script>

<style lang="scss" scoped>
.left-aside {
  position: relative;
  height: 100%;
  padding-top: 80px;

  &.__collapsed {
    & .collapse-togler__icon {
      transform: rotate(180deg);
    }
  }
}
.main-menu {
  border: none;

  &__item {
    display: flex;
    align-items: center;
    column-gap: 15px;
    color: $black1;

    &:hover {
      background-color: $gray1-hover;
    }

    &.is-active {
      color: $turquoise1;
    }
  }

  &__title {
    font-family: inherit;
    font-size: 17px;
    font-weight: 400;
  }
}

.collapse-togler {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    border: none;
    border-top: 1px solid $gray2;
    background-color: $white;
    color: $gray2;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: $gray1-hover;
    }

    &__icon {
      transition: transform .5s;
    }
  }
</style>
