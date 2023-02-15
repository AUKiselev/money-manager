<template>
  <section class="auth-form">
    <h2 class="auth-form__title">
      Вход в аккаунт
    </h2>

    <el-form
      ref="formRef"
      :model="authForm"
      :rules="rules"
      class="auth-form__form"
    >
      <el-form-item class="auth-form__item" prop="email">
        <el-input
          v-model="authForm.email"
          class="auth-form__input"
          placeholder="E-mail"
        />
      </el-form-item>

      <el-form-item class="auth-form__item" prop="password">
        <el-input
          v-model="authForm.password"
          class="auth-form__input"
          type="password"
          placeholder="Пароль"
        />
      </el-form-item>

      <el-form-item>
        <el-button class="auth-form__submit" @click="submitForm()">
          Войти
        </el-button>
      </el-form-item>
    </el-form>

    <p class="auth-form__description">
      Еще нет аккаунта?
      <NuxtLink class="auth-form__registration-link" to="/registration">
        Регистрация
      </NuxtLink>
    </p>
  </section>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { IAuthForm } from '@/models/forms';

const formRef = ref<FormInstance>();
const authForm = reactive<IAuthForm>({
  email: '',
  password: '',
});

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: 'Введите e-mail',
      trigger: 'submit',
    },
  ],
  password: [
    { required: true, message: 'Введите пароль', trigger: 'submit' },
  ],
});

const submitForm = () => {
  // formRef.value?.validate(valid => {
  //   if (valid) {
  //     console.log('success');
  //   }
  // });
};
</script>

<style lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 350px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: $white;
  box-shadow: 0 10px 25px rgba(29, 52, 54, .08);

  &__title {
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    font-weight: 600;
    letter-spacing: .02em;
    color: $turquoise1
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
    width: 100%;
  }

  &__item {
    width: 100%;

    .el-form-item__error {
      margin-left: 8px;
    }
  }

  &__input {
    height: 40px;

    & .el-input__wrapper {
      padding: 10px 15px;
      border-radius: 8px;

      &.is-focus {
        box-shadow: 0 0 0 1px $turquoise1 inset;
      }
    }
  }

  &__submit {
    width: 100px;
    height: 40px;
    border-radius: 8px;
    background-color: $turquoise1;
    color: $white1;
    transition: all .3s;

    &:hover,
    &:active,
    &:focus {
      border: 1px solid $turquoise1;
      background-color: rgba(0, 0, 0, 0);
      color: $turquoise1;
    }
  }

  &__description {
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: $black1;
  }

  &__registration-link {
    color: $turquoise1;
  }
}
</style>
