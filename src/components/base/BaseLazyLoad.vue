<script setup>
import { watch, ref } from "vue";

let timeout = null;
const showLoader = ref(false);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 500,
  },
});

watch(() => {
  props.show,
    (show) => {
      // start show loader timeout
      if (show) {
        timeout = setTimeout(() => {
          showLoader.value = true;
        }, props.delay);
      } else {
        clearTimeout(timeout);
        showLoader.value && (showLoader.value = false);
      }
    };
});
</script>

<template>
  <div v-show="showLoader">
    <slot />
  </div>
</template>
