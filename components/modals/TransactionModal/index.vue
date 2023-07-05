<template>
  <ModalWrapper ref="modalWrapper">
    <template #content>
      <div class="transaction-modal">
        <p class="transaction-modal__title">
          {{ modalTitle }}
        </p>
        <div class="transaction-modal__form-wrapper">
          <el-form
            ref="transactionFormRef"
            :model="transactionForm"
            :rules="rules"
            class="transaction-modal__form"
            @submit.prevent
            @keyup.enter="submitHandler"
            @keyup.esc="closeModal"
          >
            <el-form-item prop="value">
              <el-input
                ref="valueInput"
                v-model="transactionForm.value"
                class="transaction__form-input"
                placeholder="Введите сумму транзакции"
                type="number"
              />
            </el-form-item>
            <el-form-item class="transaction-modal__buttons">
              <el-button class="transaction-modal__button cancel-button" @click="closeModal">
                Отменить
              </el-button>
              <el-button
                class="transaction-modal__button submit-button"
                @click="submitHandler"
              >
                Добавить
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { FormInstance, FormRules } from 'element-plus';
import { ITransactionModal } from 'models/modals';
import { useLayoutStore } from '@/store/layout';
import { useTransactionsStore } from '@/store/transactions';
import { ITransactionForm } from '@/models/forms';
import ModalWrapper from '../ModalWrapper.vue';

const transactionFormRef = ref<FormInstance>();
const transactionForm = reactive<ITransactionForm>({
  value: null,
});

const rules = reactive<FormRules>({
  value: [
    {
      required: true,
      message: 'Введите сумму транзакции',
      trigger: 'submit',
    },
  ],
});

const layoutStore = useLayoutStore();
const { modal } = storeToRefs(layoutStore) as {
  modal: Ref<ITransactionModal>
};

const modalTitle = computed(() => `${modal.value.from.name} > ${modal.value.to.name}`);

const transactionsStore = useTransactionsStore();
const { createTransaction } = transactionsStore;

const modalWrapper = ref<InstanceType<typeof ModalWrapper> | null>(null);
const closeModal = () => {
  if (modalWrapper.value) {
    modalWrapper.value.closeHandler();
  }
};

const submitHandler = () => {
  const result = transactionFormRef.value?.validate(valid => {
    if (valid) {
      const { value } = transactionForm;

      if (value) {
        createTransaction(+value);
      }

      transactionFormRef.value?.resetFields();

      closeModal();
    }
  });

  return result;
};

const valueInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  valueInput.value?.focus();
});
</script>
