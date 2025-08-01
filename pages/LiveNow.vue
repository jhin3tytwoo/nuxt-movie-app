<script setup name="LiveNow">
import { computed } from "vue";
import { useMovies } from "~/composables/useMovies";
import MainLayout from "~/components/MainLayout.vue";

const { movies } = useMovies();

const liveMovies = computed(() => movies.value.filter((m) => m.live));
</script>

<template>
  <MainLayout>
    <div>
      <h2 class="text-3xl font-semibold mb-4">
        <span class="material-icons">live_tv</span> Live now
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="movie in liveMovies"
          :key="movie.id"
          class="bg-white text-black p-4 rounded-xl shadow-xl hover:scale-105 transition"
        >
          <!-- รูปภาพ -->
          <img
            :src="movie.image"
            :alt="movie.title"
            class="rounded-lg w-full h-48 object-cover mb-2"
          />

          <!-- ชื่อหนัง -->
          <h3 class="font-bold text-xl">{{ movie.title }}</h3>

          <!-- คำอธิบาย -->
          <p class="text-sm text-gray-600 mb-1">{{ movie.description }}</p>

          <!-- ความยาวหนัง -->
          <p class="text-sm text-gray-500">⏱️ {{ movie.length }}</p>

          <!-- ภาษา -->
          <p class="text-sm text-gray-500">
            <span class="inline-block mr-1">
              <span v-if="movie.language === 'TH'">🔊</span>
              <span v-else-if="movie.language === 'EN'">🔈</span>
            </span>
            ภาษา {{ movie.language }}
          </p>

          <!-- คะแนน (ดาว) -->
          <div class="text-yellow-500 mt-1">
            <span v-for="n in 5" :key="n" class="text-lg">
              {{ n <= movie.rating ? "★" : "☆" }}
            </span>
          </div>

          <!-- แสดงว่า Live -->
          <span class="text-red-500 font-semibold block mt-2"
            >🔴 Live Now!</span
          >
        </div>
      </div>
    </div>
  </MainLayout>
</template>
