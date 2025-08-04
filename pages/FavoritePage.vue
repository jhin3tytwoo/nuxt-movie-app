<script setup name="FavoritePage">
import { useMovies } from "~/composables/useMovies";
import MainLayout from "~/components/MainLayout.vue";
import GradientBorder from "~/components/GradientBorder.vue";

const { movies } = useMovies(); // Assuming all movies are favorited
</script>

<template>
  <MainLayout>
    <GradientBorder class="py-4">
      <div class="min-h-screen m-4 p-[2px] relative">
        <h2
          class="text-3xl font-semibold mb-4 flex items-center gap-2 text-white px-4 md:px-8"
        >
          <span class="material-icons text-yellow-400">favorite</span>
          Favorite
        </h2>

        <div class="px-4 md:px-8 mt-6 py-4 bg-black">
          <div class="flex overflow-x-auto gap-3 hide-scrollbar">
            <div
              v-for="movie in movies"
              :key="'fav-' + movie.id"
              class="bg-black min-w-[45%] md:min-w-0 rounded-xl overflow-hidden flex flex-col shadow-lg text-white"
              style="width: 180px"
            >
              <div class="h-40 w-full overflow-hidden">
                <img
                  :src="movie.image"
                  class="w-full h-full object-cover rounded-xl"
                  :alt="movie.title"
                />
              </div>
              <div class="p-2 flex flex-col flex-grow">
                <p class="text-sm font-bold leading-tight">{{ movie.title }}</p>
                <p class="text-yellow-400 text-sm leading-tight">
                  <template v-for="n in 5" :key="n">
                    <span>{{ n <= movie.rating ? "★" : "☆" }}</span>
                  </template>
                </p>
                <p class="text-xs text-gray-400 leading-tight">
                  🕒 {{ movie.length }}
                </p>
                <p class="text-xs text-gray-400 leading-tight">
                  🌐 {{ movie.language }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientBorder>
  </MainLayout>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
