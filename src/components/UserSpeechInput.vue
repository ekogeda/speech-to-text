<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(['start-listening', 'stop-listening'])

const startListening = () => {
  emit('start-listening');
}

const stopListening = () => {
  emit('stop-listening');
}

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <button @click="startListening">Start Listening</button>
      <button @click="stopListening">Stop Listening</button>
    </div>
  </div>
</template>


<style scoped></style>