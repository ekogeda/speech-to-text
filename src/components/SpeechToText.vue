<script setup>
import { defineProps } from "vue";

defineProps({ users: Array });
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="user in users" :key="user.id">
        <h3>User {{ user.id }}</h3>
        <div>
          <p>{{ user.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
