<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";

const transcript = ref("");
const isRecording = ref(false);

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition(); //** speech recognition (sr) */

onMounted(() => {
  sr.continuous = true;
  sr.interimResults = true;

  sr.onstart = () => {
    // console.log("SR started");
    isRecording.value = true;
  };

  sr.onend = () => {
    // console.log("SR stopped");
    isRecording.value = false;
  };

  sr.onresult = (evt) => {
    // console.log(Array.from(evt.results));
    for (let i = 0; i < evt.results.length; i++) {
      const result = evt.results[i];
      adjustTextareaHeight();
      if (result.isFinal) {
        checkForCommand(result);
      }
    }

    const trans = Array.from(evt.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    transcript.value = trans;
  };
});

const checkForCommand = (result) => {
  const trans = result[0].transcript;
  if (trans.includes("stop recording")) {
    sr.stop();
  } else if (trans.includes("what is the time") || trans.includes("what's the time")) {
    sr.stop();
    alert(new Date().toLocaleTimeString());
    setTimeout(() => sr.start(), 100);
  }
};

const speak = () => {
  if ("speechSynthesis" in window) {
    const speechSynthesis = window.speechSynthesis;
    let utterance = null

    if (transcript.value == '') {
      utterance = new SpeechSynthesisUtterance("There's nothing to talk about.");
    } else {
      utterance = new SpeechSynthesisUtterance(transcript.value);
    }
    // Optionally, you can configure voice settings here
    utterance.voice = speechSynthesis.getVoices()[6]; // Example voice selection

    speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis is not supported in this browser.");
  }
};

const textarea = ref("");
const adjustTextareaHeight = () => {
  textarea.value.style.height = "auto";
  textarea.value.style.height = textarea.value.scrollHeight + "px";
};

const toggleMic = () => (isRecording.value ? sr.stop() : sr.start());

const isReadOnly = ref(false);
const toggleReadOnly = () => (isReadOnly.value = !isReadOnly.value);
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Welcome to Automated Note Taking</h5>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-sm-6 pb-3 bg-light position-relative h-custom">
        <textarea type="text" ref="textarea" v-model="transcript" rows="1"
          class="form-control form-control-sm my-2 resize-none" :readonly="!isReadOnly" @dblclick="toggleReadOnly"
          @blur="toggleReadOnly"></textarea>

        <div class="position-absolute bottom-0 end-0 m-1">
          <div class="d-flex align-items-center justify-content-center">
            <button type="button" class="btn d-flex align-items-center me-1 rounded-circle"
              :class="[!isRecording ? 'btn-primary' : 'btn-danger']" @click="toggleMic" style="width: 40px; height: 40px">
              <Icon icon="bi:mic" style="font-size: 1rem" />
            </button>
            <button type="button" class="btn btn-dark d-flex align-items-center rounded-circle" @click="speak"
              style="width: 40px; height: 40px">
              <Icon icon="ri:speak-line" style="font-size: 1rem" />
            </button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-sm-6 mx-auto bg-secondary pb-3 h-custom">
        <ul class="list-group mt-2" data-bs-theme="light">
          <li class="list-group-item list-group-item-primary">Medical Condition</li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"
                placeholder="Add Medical Condition"></textarea>
              <button class="btn btn-primary d-flex">
                <Icon icon="gala:add" />
              </button>
            </div>
          </li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"></textarea>
              <button class="btn btn-danger d-flex">
                <Icon icon="iconoir:delete-circle" />
              </button>
            </div>
          </li>
        </ul>

        <ul class="list-group mt-2" data-bs-theme="light">
          <li class="list-group-item list-group-item-warning">Medication</li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"
                placeholder="Add Medication"></textarea>
              <button class="btn btn-primary d-flex">
                <Icon icon="gala:add" />
              </button>
            </div>
          </li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"></textarea>
              <button class="btn btn-danger d-flex">
                <Icon icon="iconoir:delete-circle" />
              </button>
            </div>
          </li>
        </ul>

        <ul class="list-group mt-2" data-bs-theme="light">
          <li class="list-group-item list-group-item-danger">
            Test, Treatment & Procedures
          </li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"
                placeholder="Add Test, Treatment & Procedures"></textarea>
              <button class="btn btn-primary d-flex">
                <Icon icon="gala:add" />
              </button>
            </div>
          </li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"></textarea>
              <button class="btn btn-danger d-flex">
                <Icon icon="iconoir:delete-circle" />
              </button>
            </div>
          </li>
        </ul>

        <ul class="list-group mt-2" data-bs-theme="light">
          <li class="list-group-item list-group-item-secondary">Anatomy</li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"
                placeholder="Add Anatomy"></textarea>
              <button class="btn btn-primary d-flex">
                <Icon icon="gala:add" />
              </button>
            </div>
          </li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"></textarea>
              <button class="btn btn-danger d-flex">
                <Icon icon="iconoir:delete-circle" />
              </button>
            </div>
          </li>
        </ul>

        <ul class="list-group mt-2" data-bs-theme="light">
          <li class="list-group-item list-group-item-success">
            Protected Health Information (PHI)
          </li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"
                placeholder="Add Protected Health Information (PHI)"></textarea>
              <button class="btn btn-primary d-flex">
                <Icon icon="gala:add" />
              </button>
            </div>
          </li>
          <li class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
              <textarea type="text" rows="1" class="form-control form-control-sm me-3 resize-none"></textarea>
              <button class="btn btn-danger d-flex">
                <Icon icon="iconoir:delete-circle" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resize-none {
  resize: none;
  overflow: hidden;
  min-height: 30px;
}

input[type="text"],
textarea {
  outline: none;
  box-shadow: none !important;
  border: 1px solid #ccc !important;
}

.h-custom {
  height: 78vh;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0.5em;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: white;
  outline: 1px solid slategrey;
}

@media screen and (max-width: 768px) {
  .h-custom {
    height: 40vh;
  }
}
</style>
