<script setup>
import { ref, watch } from "vue";
import { abortable, didAbort } from "@/api/api";
import { searchMeals } from "@/api/mealApi";
import { withAsync } from "@/helpers/withAsync";

const mealQuery = ref("");
const meals = ref([]);

watchEffect(async () => {});
</script>

<template>
  <div></div>
</template>
