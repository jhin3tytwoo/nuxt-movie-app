<script setup name="LiveNow">
import { ref } from "vue"; // Use ref instead of computed for static data
import MainLayout from "~/components/MainLayout.vue";

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
    <div class="h-full overflow-y-auto p-4 md:p-8">
      <h2 class="text-3xl font-semibold mb-6 flex items-center text-white">
        <span class="material-icons mr-2">live_tv</span> Live now
      </h2>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="channel in liveChannels"
          :key="channel.id"
          class="flex flex-col items-center p-3 rounded-xl shadow-xl hover:scale-105 transition cursor-pointer"
        >
          <div
            class="flex-shrink-0 bg-gray-500 rounded-lg overflow-hidden mb-3"
            style="width: 164px; height: 103px"
          >
            <img
              :src="channel.logo"
              :alt="channel.name"
              class="w-full h-full object-cover"
            />
          </div>
          <p class="text-white font-semibold text-sm text-center break-words">
            {{ channel.name }}
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
