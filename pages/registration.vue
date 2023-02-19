<template>
  <div class="main-content">
    <RegistrationForm />
  </div>
</template>

<script setup lang="ts">
import RegistrationForm from '@/components/registration/RegistrationForm.vue';

definePageMeta({
  layout: 'empty-layout',
  middleware: ['auth'],
});
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
