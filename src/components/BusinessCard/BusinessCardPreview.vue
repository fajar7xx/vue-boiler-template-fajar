<script setup>
defineProps({
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
});
</script>

<template>
  <div class="shadow-md p-8">
    <h2 class="text-2xl font-semibold mb-8">Business Card Preview</h2>
    <div class="flex">
      <div
        class="w-32 h-32 rounded-full bg-gray-100 mr-6 flex-shrink-0 overflow-hidden"
      ></div>
    </div>
  </div>
</template>
