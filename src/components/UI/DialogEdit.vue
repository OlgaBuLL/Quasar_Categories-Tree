<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <TextField
          label="Name..."
          v-model="inputText"
          ref="nameFieldEl"
          reactive-rules
          :rules="[required]"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="cancel" />
        <q-btn flat label="Save" color="primary" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useValidationRules } from "src/composables/form/useValidationRules";
import TextField from "./Form/TextField.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },

  title: {
    type: [String, Number],
    required: true,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "update:title"]);

const { required } = useValidationRules();
const nameFieldEl = ref();
const confirm = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});

const initialTitle = ref(props.title);
const inputText = ref(props.title);

watch(
  () => props.title,
  (newValue) => {
    inputText.value = newValue;
  }
);

const cancel = () => {
  inputText.value = initialTitle.value;
  emit("update:modelValue", false);
};

const save = () => {
  if (nameFieldEl.value && !nameFieldEl.value.validate()) {
    return;
  } else {
    emit("update:title", inputText.value);
    emit("update:modelValue", false);
  }
};
</script>
