<script setup>
import { ref } from "vue";

const avatarFile = ref(null);
const name = ref("");
const description = ref("");
const phoneNumber = ref("");
const address = ref("");

const onFileUpload = (e) => {
  avatarFile.value = e.target.files?.[0];
  console.log(avatarFile.value);
};
</script>

<template>
  <div class="shadow-md p-8">
    <h2 class="font-semibold mb-4 text-2xl">Business Card Form</h2>
    <form>
      <div :class="$style.formBlock">
        <label for="avatar" :class="$style.formLabel">Avatar</label>
        <input type="file" name="avatar" id="avatar" @change="onFileUpload" />
      </div>

      <div :class="$style.formBlock">
        <label for="name" :class="$style.formLabel">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          :class="$style.formInput"
          v-model="name"
        />
      </div>

      <div :class="$style.formBlock">
        <label for="description" :class="$style.formLabel">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          :class="$style.formInput"
          v-model="description"
        />
      </div>

      <div :class="$style.formBlock">
        <label for="phoneNumber" :class="$style.formLabel">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          :class="$style.formInput"
          v-model="phoneNumber"
        />
      </div>

      <div :class="$style.formBlock">
        <label for="address" :class="$style.formLabel">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          :class="$style.formInput"
          v-model="address"
        />
      </div>
    </form>
  </div>
</template>

<style module>
.formBlock {
  @apply flex flex-col mb-6;
}
.formLabel {
  @apply mb-3 font-semibold;
}
.formInput {
  @apply border border-gray-50 shadow p-4;
}
</style>
