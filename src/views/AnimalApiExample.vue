<script setup>
import { ref, onMounted, computed } from "vue";
import { fetchDog, fetchKitty } from "@/api/animalApi";
import { withAsync } from "@/helpers/withAsync";
import { apiStatus } from "@/constants/apiStatus";
import { apiStatusComputedFactory } from "@/helpers/apiStatusComputedFactory";
import BaseLazyLoad from "@/components/base/BaseLazyLoad.vue";

const { IDLE, PENDING, SUCCESS, ERROR } = apiStatus;

const dog = ref(null);
const cat = ref(null);
const isLoading = ref(false);
const isError = ref(false);
const fetchDogStatus = ref(apiStatus.IDLE);

const fetchingDog = async () => {
  //   try {
  //     // reset error
  //     isError.value = false;
  //     // show loader
  //     isLoading.value = true;
  //     const response = await fetchDog();
  //     dog.value = response.data.message;
  //   } catch (error) {
  //     isError.value = true;
  //   } finally {
  //     // hide loader
  //     isLoading.value = false;
  //   }
  //   try {
  //     // show loader
  //     fetchDogStatus.value = "PENDING";
  //     const response = await fetchDog();
  //     dog.value = response.data.message;
  //     // show data
  //     fetchDogStatus.value = "SUCCESS";
  //   } catch (error) {
  //     // show error
  //     fetchDogStatus.value = "ERROR";
  //   }
  //   using helper
  //   fetchDogStatus.value = "PENDING";
  fetchDogStatus.value = apiStatus.PENDING;
  const { response, error } = await withAsync(fetchDog);

  if (error) {
    // fetchDogStatus.value = "ERROR";
    fetchDogStatus.value = apiStatus.ERROR;
    return;
  }

  dog.value = response.data.message;
  //   fetchDogStatus.value = "SUCCESS";
  fetchDogStatus.value = apiStatus.SUCCESS;
};

const fetchingKitty = async () => {
  const response = await fetchKitty();
  cat.value = response.data?.[0].url; //optional chaining operator in ecmascript 2020
  //   doc https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
};

const fetchAnimals = () => {
  fetchingDog();
  // fetchingKitty();
};

onMounted(() => {
  fetchAnimals();
  this.apiStatus = apiStatus;
});
</script>

<template>
  <div>
    <div v-if="!isLoading && !isError && dog === null">
      Welcome! get your lucku dog!
    </div>

    <div v-if="cat" class="animal-image__container">
      <img :src="cat" alt="cat" class="animal-image" />
    </div>

    <div v-if="dog" class="animal-image__container">
      <!-- <p v-if="fetchDogStatus === 'IDLE'">Welcome</p>
      <p v-if="fetchDogStatus === 'PENDING'">Loading data</p>
      <p v-if="fetchDogStatus === 'ERROR'">There was a problem</p>
      <div v-if="fetchDogStatus === 'SUCCESS'">
        <img :src="dog" alt="dog" class="animal-image" />
      </div> -->

      <!-- <p v-if="fetchDogStatus === apiStatus.IDLE">Welcome</p>
      <p v-if="fetchDogStatus === apiStatus.PENDING">Loading data</p>
      <p v-if="fetchDogStatus === apiStatus.ERROR">There was a problem</p>
      <div v-if="fetchDogStatus === apiStatus.SUCCESS">
        <img :src="dog" alt="dog" class="animal-image" />
      </div> -->

      <p v-if="fetchDogStatusIdle">Press the button to fetch a nice dog</p>
      <!-- <p v-if="fetchDogStatusPending">Loading data</p> -->
      <base-lazy-load :show="fetchDogStatusPending">
        <p>Loading Data</p>
      </base-lazy-load>
      <p v-if="fetchDogStatusError">There was a problem</p>
      <div v-if="fetchDogStatusSuccess">
        <img :src="dog" alt="dog" class="animal-image" />
      </div>
    </div>
  </div>
</template>
