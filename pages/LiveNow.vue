<script setup name="LiveNow">
import { ref } from "vue"; // Use ref instead of computed for static data
import MainLayout from "~/components/MainLayout.vue";
import GradientBorder from "~/components/GradientBorder.vue";

// Define the live TV channels data
const liveChannels = ref([
  {
    id: 1,
    name: "BBC news",
    logo: "https://i.pinimg.com/736x/c2/b4/83/c2b48362f5e61768ceacdb503c73cdb9.jpg",
  },
  {
    id: 2,
    name: "3 HD",
    logo: "https://i.pinimg.com/736x/7f/83/43/7f83431ed729207515e387411cd8bb3b.jpg",
  },
  {
    id: 3,
    name: "7 HD",
    logo: "https://i.pinimg.com/736x/78/b4/2a/78b42afd46b06a2566385cb95c7e4949.jpg",
  },
]);
</script>

<template>
  <MainLayout>
    <GradientBorder>
      <div class="md:p-8 min-h-screen m-4 p-[2px] relative">
        <h2 class="text-3xl font-semibold mb-4 flex items-center text-white">
          <span class="material-icons mr-2">live_tv</span> Live now
        </h2>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="channel in liveChannels"
            :key="channel.id"
            class="flex flex-col items-center bg-gray-800 p-4 rounded-xl shadow-xl hover:scale-105 transition cursor-pointer"
          >
            <img
              :src="channel.logo"
              :alt="channel.name"
              class="w-24 h-24 object-contain mb-2 rounded-lg"
            />
            <p class="text-white font-semibold">{{ channel.name }}</p>
          </div>
        </div>
      </div>
    </GradientBorder>
  </MainLayout>
</template>
