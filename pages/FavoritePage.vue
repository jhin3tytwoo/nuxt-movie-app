<script setup name="FavoritePage">
import { useMovies } from "~/composables/useMovies";
import MainLayout from "~/components/MainLayout.vue";

const { movies } = useMovies(); // Assuming all movies are favorited
</script>

<template>
  <MainLayout>
    <div class="h-full overflow-y-auto p-4 md:p-8">
      <h2
        class="text-3xl font-semibold mb-6 flex items-center gap-2 text-white"
      >
        <span class="material-icons text-yellow-400">favorite</span>
        Favorite
      </h2>

      <div class="flex flex-wrap">
        <div
          v-for="movie in movies"
          :key="'fav-' + movie.id"
          class="bg-black rounded-xl flex flex-col shadow-lg text-white w-1/2 md:w-[162px] p-1"
        >
          <!-- ขนาดภาพ 162x96 -->
          <div class="w-full h-[96px] rounded-xl overflow-hidden mb-2">
            <img
              :src="movie.image"
              class="w-full h-full object-cover"
              :alt="movie.title"
            />
          </div>
          <div class="flex flex-col flex-grow px-1 pb-2">
            <p class="text-sm font-bold leading-tight break-words">
              {{ movie.title }}
            </p>
            <p class="text-yellow-400 text-sm leading-tight">
              <template v-for="n in 5" :key="n">
                <span>{{ n <= movie.rating ? "★" : "☆" }}</span>
              </template>
            </p>
            <p class="text-xs text-gray-400 leading-tight break-words">
              🕒 {{ movie.length }}
            </p>
            <p class="text-xs text-gray-400 leading-tight break-words">
              🌐 {{ movie.language }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
