<script setup name="FavoritePage">
import { useMovies } from "~/composables/useMovies";
import MainLayout from "~/components/MainLayout.vue";

const { movies } = useMovies();
</script>

<template>
  <MainLayout>
    <div>
      <h2 class="text-3xl font-semibold mb-4">
        <span class="material-icons">favorite</span> Favorite
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="bg-white text-black p-4 rounded-xl shadow-xl hover:scale-105 transition"
        >
          <!-- รูปภาพหนัง -->
          <img
            :src="movie.image"
            :alt="movie.title"
            class="w-full h-48 object-cover rounded mb-3"
          />

          <!-- ชื่อหนัง -->
          <h3 class="font-bold text-xl">{{ movie.title }}</h3>

          <!-- คำอธิบาย -->
          <p class="text-sm text-gray-600 mb-2">{{ movie.description }}</p>

          <!-- คะแนนดาว -->
          <div class="flex items-center mb-2">
            <template v-for="n in 5" :key="n">
              <span class="text-yellow-500 text-lg">
                {{ n <= movie.rating ? "★" : "☆" }}
              </span>
            </template>
          </div>

          <!-- ความยาวหนัง -->
          <p class="text-sm text-gray-700">⏱️ {{ movie.length }}</p>

          <!-- ภาษา -->
          <p class="text-sm text-gray-700">
            🔊 ภาษา: <span class="font-semibold">{{ movie.language }}</span>
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
