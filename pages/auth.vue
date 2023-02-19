<template>
  <div class="main-content">
    <AuthForm />
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/components/auth/AuthForm.vue';

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
