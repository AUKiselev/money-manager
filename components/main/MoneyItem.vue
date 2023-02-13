<template>
  <div class="item">
    <p class="item__title">
      Test
    </p>
    <div class="item__icon-wrapper">
      <Icon
        class="item__icon"
        name="mdi:glass-cocktail"
        size="30px"
      />
    </div>
    <p class="item__number">
      1200 P
    </p>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: fit-content;
  border-radius: 4px;
  border: 1px solid $gray1;
  cursor: pointer;

  &__title {
    font-size: 16px;
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100px;
    width: 100px;
    height: 40px;
  }

  &__icon {
    max-width: 30px;
    max-height: 30px;
    width: 100%;
    height: 100%;
  }

  &__number {
    font-size: 14px;
  }
}
</style>
