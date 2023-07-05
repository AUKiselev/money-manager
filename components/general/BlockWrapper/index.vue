<template>
  <section class="block-wrapper">
    <h2 class="block-wrapper__title" v-html="title" />
    <div class="block-wrapper__content">
      <slot name="content" />
    </div>
  </section>
</template>

<script setup lang="ts">
interface IProps {
  title: string
}
defineProps<IProps>();
</script>

<style lang="scss" scoped>
.block-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  max-height: 120px;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  border-radius: 10px;
  border: 1px solid $turquoise1;
  background-color: $white;
  box-shadow: 0 10px 25px rgba(29, 52, 54, .08);

  &__title {
    position: absolute;
    top: -15px;
    left: 20px;
    display: inline-block;
    padding: 0 5px;
    // background: linear-gradient(to bottom, $white1 75%, $white 25%);
    background: linear-gradient(to bottom, $white1 75%, $white 100%);
    font-size: 20px;
    line-height: 20px;
    font-weight: 500;
    color: $turquoise1;
  }

  &__content {
    display: flex;
    align-items: center;
    column-gap: 25px;
    width: 100%;
  }
}
</style>
