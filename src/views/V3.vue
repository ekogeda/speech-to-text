<template>
  <div>
    <h1>Speech to Text</h1>
    <button @click="startListening" :disabled="isListening">Start Listening</button>
    <button @click="stopListening" :disabled="!isListening">Stop Listening</button>
    <div v-for="(user, index) in users" :key="index">
      <h2>User {{ user.id }}</h2>
      <div>
        <p><strong>Speech:</strong> {{ user.speech }}</p>
        <p><strong>Transcript:</strong> {{ user.transcript }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recognition: null,
      isListening: false,
      users: [
        { id: 1, speech: '', transcript: '' },
        { id: 2, speech: '', transcript: '' },
      ],
    };
  },
  methods: {
    startListening() {
      this.recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        for (const result of event.results) {
          const transcript = result[0].transcript;
          this.users.forEach((user, index) => {
            if (index < event.results.length) {
              user.speech = transcript;
              user.transcript = transcript;
            }
          });
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.stopListening();
      };

      this.recognition.start();
    },

    stopListening() {
      if (this.recognition) {
        this.recognition.stop();
        this.recognition = null;
        this.isListening = false;
      }
    },
  },
};
</script>
