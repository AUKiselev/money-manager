<template>
  <ModalWrapper ref="modalWrapper">
    <template #content>
      <div class="new-item-modal">
        <p class="new-item-modal__title">
          {{ title }}
        </p>
        <div class="new-item-modal__form-wrapper">
          <el-form
            ref="newItemFormRef"
            :model="newItemForm"
            :rules="rules"
            class="new-item-modal__form"
            @submit.prevent
            @keyup.enter="submitHandler"
            @keyup.esc="closeModal"
          >
            <el-form-item prop="name">
              <el-input
                ref="nameInput"
                v-model="newItemForm.name"
                class="new-item-modal__form-input"
                :placeholder="nameInputPlaceholder"
              />
            </el-form-item>

            <el-form-item v-if="modal.objectType === 'COST'">
              <el-input
                v-model="newItemForm.limit"
                class="new-item-modal__form-input"
                placeholder="Введите лимит расхода в месяц"
                type="number"
              />
            </el-form-item>

            <el-form-item v-if="modal.objectType === 'BILL'">
              <el-input
                v-model="newItemForm.sum"
                class="new-item-modal__form-input"
                placeholder="Введите кол-во денег на счету"
                type="number"
              />
            </el-form-item>
          </el-form>
          <el-form-item class="new-item-modal__buttons">
            <el-button class="new-item-modal__button cancel-button" @click="closeModal">
              Отменить
            </el-button>
            <el-button
              class="new-item-modal__button submit-button"
              @click="submitHandler"
            >
              Добавить
            </el-button>
          </el-form-item>
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { FormInstance, FormRules } from 'element-plus';
import ModalWrapper from '../ModalWrapper.vue';
import { useLayoutStore } from '@/store/layout';
import { INewItemModal } from '@/models/modals';
import { INewItemForm } from '@/models/forms';
import { useObjectsStore } from '@/store/objects';

const newItemFormRef = ref<FormInstance>();
const newItemForm = reactive<INewItemForm>({
  name: '',
  limit: null,
  sum: null,
});

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Введите название',
      trigger: 'submit',
    },
  ],
});

const layoutStore = useLayoutStore();
const { modal } = storeToRefs(layoutStore) as {
  modal: Ref<INewItemModal>
};

const objectsStore = useObjectsStore();
const { createNewObject } = objectsStore;

const modalWrapper = ref<InstanceType<typeof ModalWrapper> | null>(null);
const closeModal = () => {
  if (modalWrapper.value) {
    modalWrapper.value.closeHandler();
  }
};

const submitHandler = () => {
  const result = newItemFormRef.value?.validate((valid): boolean => {
    if (valid) {
      const { name, limit, sum } = newItemForm;

      createNewObject(modal.value.objectType, modal.value.userId, name, sum, limit);

      newItemFormRef.value?.resetFields();

      closeModal();
      return true;
    }
    return false;
  });

  return result;
};

const title = computed(() => {
  if (modal.value.objectType === 'BILL') {
    return 'Добавить новый счет';
  }
  if (modal.value.objectType === 'INCOME') {
    return 'Добавить новую статью дохода';
  }
  if (modal.value.objectType === 'COST') {
    return 'Добавить новую статью расхода';
  }
  return '';
});

const nameInputPlaceholder = computed(() => {
  if (modal.value.objectType === 'BILL') {
    return 'Введите название счета';
  }
  if (modal.value.objectType === 'INCOME') {
    return 'Введите название статьи дохода';
  }
  if (modal.value.objectType === 'COST') {
    return 'Введите название статьи расхода';
  }
  return '';
});

const nameInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  nameInput.value?.focus();
});
</script>

<style lang="scss" scoped>
.new-item-modal {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  min-width: 400px;

  &__title {
    width: max-content;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;

    & :deep(.el-form-item__content) {
      justify-content: space-between;
    }
  }

  &__button {
    width: 100px;
    height: 40px;
    margin: 0;
    border-radius: 8px;
    font-family: inherit;
    color: $white1;
    transition: all .3s;

    &.cancel-button {
      background-color: $red;

      &:hover,
      &:active,
      &:focus {
        border: 1px solid $red;
        background-color: $light-red;
        color: $red;
      }
    }

    &.submit-button {
      background-color: $green;

      &:hover,
      &:active,
      &:focus {
        border: 1px solid $green;
        background-color: $light-green;
        color: $green;
      }
    }
  }
}
</style>
