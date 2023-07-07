<template>
  <div
    :class="['item', props.type.toLowerCase(), 'draggable-block']"
    draggable="true"
    @dragstart="dragStart($event)"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="item__helpers">
      <div class="item__icon-wrapper">
        <Icon
          class="item__icon"
          :name="props.settings?.icon ? props.settings.icon : ''"
          size="25px"
        />
      </div>
      <div class="item__buttons">
        <button class="item__delete-button" @click="deleteHandler">
          <Icon
            class="item__delete-icon"
            name="tabler:trash"
            size="17px"
          />
        </button>
        <button class="item__change-button" @click="changeHandler">
          <Icon
            class="item__change-icon"
            name="tabler:pencil"
            size="17px"
          />
        </button>
      </div>
    </div>
    <h3 class="item__title">
      {{ props.name }}
    </h3>
    <p class="item__sum">
      {{ formatedSum }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/layout';

interface IProps {
  type: 'BILL' | 'INCOME' | 'COST';
  objectId: string;
  name: string;
  sum: number;
  settings: {
    icon: string
    color: string;
  }
}
const props = defineProps<IProps>();

const formatedSum = computed(() => `${props.sum} ₽`);

const layoutStore = useLayoutStore();
const { openModal } = layoutStore;

const deleteHandler = () => {
  openModal({
    name: 'delete-modal',
    objectType: props.type,
    objectId: props.objectId,
    objectName: props.name,
  });
};

const changeHandler = () => {
  openModal({
    name: 'change-modal',
    objectType: props.type,
    objectId: props.objectId,
    objectName: props.name,
    sum: props.sum,
    settings: props.settings,
    limit: null,
  });
};

const dragStart = (event: DragEvent) => {
  const transferData = {
    id: props.objectId,
    name: props.name,
    type: props.type,
  };

  event.dataTransfer?.setData('objectFrom', JSON.stringify(transferData));
};

const onDrop = (event: DragEvent) => {
  const strObjectFrom = event.dataTransfer?.getData('objectFrom');
  if (strObjectFrom) {
    const objectFrom = JSON.parse(strObjectFrom);

    if (objectFrom.id === props.objectId) return;

    let transactionType = null as 'INCOME' | 'EXPENSE' | 'TRANSFER' | null;
    if (objectFrom.type === 'INCOME' && props.type === 'BILL') {
      transactionType = 'INCOME';
    } else if (objectFrom.type === 'BILL' && props.type === 'COST') {
      transactionType = 'EXPENSE';
    } else if (objectFrom.type === 'BILL' && props.type === 'BILL') {
      transactionType = 'TRANSFER';
    }

    if (transactionType) {
      openModal({
        name: 'transaction-modal',
        type: transactionType,
        from: {
          id: objectFrom.id,
          name: objectFrom.name,
        },
        to: {
          id: props.objectId,
          name: props.name,
        },
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  max-width: 175px;
  width: 100%;
  border-radius: 14px;
  padding: 5px 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .20);

  &__helpers {
    display: flex;
    justify-content: space-between;
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__delete-button,
  &__change-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: $white;
    color: $black1;
    cursor: pointer;
    transition: color .2s;

    &:hover {
      color: $gray2;
    }
  }

  &__change-icon {
    max-width: 17px;
    max-height: 17px;
    width: 100%;
    height: 100%;
  }

  &__title {
    margin-top: 5px;
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    color: $gray2;
  }

  &__sum {
    font-size: 25px;
    line-height: 29px;
    font-weight: 500;
    color: $black1;
  }

  &.income {
    .item__icon-wrapper {
      background-color: $light-green;
      color: $green;
    }
  }

  &.bill {
    .item__icon-wrapper {
      background-color: $gray1-hover;
      color: $black1;
    }
  }

  &.cost {
    .item__icon-wrapper {
      background-color: $light-red;
      color: $red;
    }
  }
}
</style>
