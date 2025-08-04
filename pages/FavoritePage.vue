<script setup name="FavoritePage">
import { useMovies } from "~/composables/useMovies";
import MainLayout from "~/components/MainLayout.vue";
import GradientBorder from "~/components/GradientBorder.vue";

const { movies } = useMovies(); // Assuming all movies are "favorited" for now
</script>

<template>
  <MainLayout>
    <GradientBorder class="py-4">
      <div class="md:p-8 min-h-screen m-4 p-[2px] relative">
        <h2
          class="text-3xl font-semibold mb-4 flex items-center gap-2 text-white"
        >
          <span class="material-icons text-yellow-400">favorite</span> Favorite
        </h2>
        <div class="grid gap-4 md:grid-cols-5">
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="bg-black text-white rounded-xl shadow-xl hover:scale-105 transition overflow-hidden"
          >
            <img
              :src="movie.image"
              :alt="movie.title"
              class="w-full h-48 object-cover rounded-t-xl"
            />

            <div class="p-3">
              <h3 class="font-bold text-base mb-1">{{ movie.title }}</h3>

              <div class="flex items-center mb-1 text-yellow-400 text-sm">
                <template v-for="n in 5" :key="n">
                  <span>
                    {{ n <= movie.rating ? "★" : "☆" }}
                  </span>
                </template>
              </div>

              <p class="text-xs text-gray-400">🕒 {{ movie.length }}</p>

              <p class="text-xs text-gray-400">🌐 {{ movie.language }}</p>
            </div>
          </div>
        </div>
      </div>
    </GradientBorder>
  </MainLayout>
</template>
