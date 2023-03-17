<template>
  <ModalWrapper ref="modalWrapper">
    <template #content>
      <div class="change-modal">
        <p class="change-modal__title">
          {{ title }}
        </p>
        <div class="change-modal__form-wrapper">
          <el-form
            ref="changeFormRef"
            :model="changeForm"
            :rules="rules"
            class="change-modal__form"
            @submit.prevent
            @keyup.enter="submitHandler()"
          >
            <el-form-item prop="name">
              <el-input
                ref="nameInput"
                v-model="changeForm.name"
                class="change-modal__form-input"
                :placeholder="placeholder"
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="changeForm.sum"
                class="change-modal__form-input"
                placeholder="Введите кол-во денег на счету"
                type="number"
              />
            </el-form-item>

            <el-form-item v-if="modal.objectType === 'COST'">
              <el-input
                v-model="changeForm.limit"
                class="change-modal__form-input"
                placeholder="Введите лимит расхода в месяц"
                type="number"
              />
            </el-form-item>
          </el-form>
          <el-form-item class="change-modal__buttons">
            <el-button class="change-modal__button cancel-button" @click=" closeModal();">
              Отменить
            </el-button>
            <el-button
              class="change-modal__button submit-button"
              @click="submitHandler()"
            >
              Изменить
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
import { IChangeModal } from '@/models/modals';
import { IChangeFrom } from '@/models/forms';
import { useObjectsStore } from '@/store/objects';
import { useUserStore } from '@/store/user';

const changeFormRef = ref<FormInstance>();
const changeForm = reactive<IChangeFrom>({
  name: '',
  sum: null,
  icon: '',
  limit: null,
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
  modal: Ref<IChangeModal>
};

const objectsStore = useObjectsStore();
const { updateObject } = objectsStore;

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const modalWrapper = ref<InstanceType<typeof ModalWrapper> | null>(null);
const closeModal = () => {
  if (modalWrapper.value) {
    modalWrapper.value.closeHandler();
  }
};

const submitHandler = () => {
  const result = changeFormRef.value?.validate((valid): boolean => {
    if (valid) {
      const {
        name, limit, sum, icon,
      } = changeForm;

      updateObject(modal.value.objectType, user.value.id, modal.value.objectId, name, sum, limit, icon);

      changeFormRef.value?.resetFields();

      closeModal();
      return true;
    }
    return false;
  });

  return result;
};

const title = computed(() => {
  if (modal.value.objectType === 'BILL') {
    return `Изменить счет "${modal.value.objectName}"`;
  }
  if (modal.value.objectType === 'INCOME') {
    return `Изменить статью дохода "${modal.value.objectName}"`;
  }
  if (modal.value.objectType === 'COST') {
    return `Изменить статью расхода "${modal.value.objectName}"`;
  }
  return '';
});

const placeholder = computed(() => {
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

onMounted(() => {
  changeForm.name = modal.value.objectName;
  changeForm.sum = modal.value.sum;
  changeForm.limit = modal.value.limit;
});
</script>

<style lang="scss" scoped>
.change-modal {
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
