<script setup>
import UserSpeechInput from "@/components/UserSpeechInput.vue";
import SpeechToText from "@/components/SpeechToText.vue";

import { ref, onMounted } from "vue";

const users = ref([
  { id: 1, text: "" },
  { id: 2, text: "" },
]);

const recognition =
  new window.webkitSpeechRecognition() || new window.SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";

const startListening = () => {
  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    users.value[0].text = result[0].transcript;
  };

  recognition.start();
};

const stopListening = () => {
  recognition.onend = () => {
    recognition.stop();
  };
};

onMounted(() => {
  recognition.onend = () => {
    recognition.start();
  };
});
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <h1>Speech to Text App V2</h1>
      <UserSpeechInput @start-listening="startListening" @stop-listening="stopListening" />
      <SpeechToText :users="users" />
    </div>
  </div>
</template>

<style scoped></style>
