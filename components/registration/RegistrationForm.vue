<template>
  <section class="registration-form">
    <h2 class="registration-form__title">
      Регистрация
    </h2>

    <el-form
      ref="formRef"
      :model="registrationForm"
      :rules="rules"
      class="registration-form__form"
      @keyup.enter="submitForm()"
    >
      <el-form-item class="registration-form__item">
        <el-input
          ref="firstNameInput"
          v-model="registrationForm.firstName"
          class="registration-form__input"
          placeholder="Введите имя(необязательно)"
        />
      </el-form-item>

      <el-form-item class="registration-form__item">
        <el-input
          v-model="registrationForm.lastName"
          class="registration-form__input"
          placeholder="Введите фамилию(необязательно)"
        />
      </el-form-item>

      <el-form-item class="registration-form__item" prop="email">
        <el-input
          v-model="registrationForm.email"
          class="registration-form__input"
          placeholder="E-mail"
        />
      </el-form-item>

      <el-form-item class="registration-form__item" prop="password">
        <el-input
          v-model="registrationForm.password"
          class="registration-form__input"
          type="password"
          placeholder="Пароль"
        />
      </el-form-item>

      <el-form-item class="registration-form__item" prop="repeatPass">
        <el-input
          v-model="registrationForm.repeatPass"
          class="registration-form__input"
          type="password"
          placeholder="Повторите пароль"
        />
      </el-form-item>

      <el-form-item>
        <el-button class="registration-form__submit" @click="submitForm()">
          Зарегистрироваться
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { IRegistrationForm } from '@/models/forms';
import { useUserStore } from '@/store/user';

const formRef = ref<FormInstance>();
const registrationForm = reactive<IRegistrationForm>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPass: '',
});

// const nameValidate = (rule: any, value: string, callback: any) => {
//   if (!value) {
//     callback(new Error('Введите имя и фамилию'));
//   } else {
//     callback();
//   }
// };

const passValidate = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('Введите пароль'));
  } else if (value.length < 5) {
    callback(new Error('Пароль должен быть длиннее 5 символов'));
  } else {
    callback();
  }
};

const repeatPassValidate = (rule: any, value: string, callback: any) => {
  if (!value && registrationForm.password) {
    callback(new Error('Повторите пароль'));
  } else if (value !== registrationForm.password && registrationForm.password) {
    callback(new Error('Пароли не совпадают'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  // name: [
  //   {
  //     validator: nameValidate,
  //     trigger: 'submit',
  //   },
  // ],
  email: [
    {
      required: true,
      message: 'Введите e-mail',
      trigger: 'submit',
    },
  ],
  password: [
    {
      required: true,
      validator: passValidate,
      trigger: 'submit',

    },
  ],
  repeatPass: [
    { required: true, validator: repeatPassValidate, trigger: 'blur' },
  ],
});

const userStore = useUserStore();
const { registerUser } = userStore;
const submitForm = () => {
  formRef.value?.validate(async valid => {
    if (valid) {
      const {
        email, password, firstName, lastName,
      } = registrationForm;

      try {
        const isSuccess = await registerUser(email, password, firstName, lastName);
        if (!isSuccess) {
          throw new Error('Some error');
        }

        const router = useRouter();
        router.push({ path: '/' });
      } catch (e) {
        console.error(e);
      }

      formRef.value?.resetFields();
    }
  });
};

const firstNameInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  firstNameInput.value?.focus();
});
</script>

<style lang="scss">
.registration-form {
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
    height: 40px;
    border-radius: 8px;
    background-color: $turquoise1;
    font-family: inherit;
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
