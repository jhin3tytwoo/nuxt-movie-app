<script setup name="NotificationPage">
import { ref, computed } from "vue"; // Import computed
import MainLayout from "~/components/MainLayout.vue";
import { useMovies } from "~/composables/useMovies";

const { movies } = useMovies();

const notifications = ref([
  {
    id: 1,
    message: "New movie has been added!",
    movieId: 1,
  },
  {
    id: 2,
    message: "New movie has been added!",
    movieId: 2,
  },
]);

const openedNotificationId = ref(null);

const toggleMovie = (id) => {
  openedNotificationId.value = openedNotificationId.value === id ? null : id;
};

const getMovieById = (id) =>
  computed(() => movies.value.find((m) => m.id === id));
</script>

<template>
  <MainLayout>
    <div class="md:p-8 min-h-screen m-4 p-2 relative rounded-[40px]">
      <h2 class="text-3xl font-semibold mb-4 text-white">
        <span class="material-icons">notifications</span> Notification
      </h2>
      <ul class="space-y-4">
        <li v-for="note in notifications" :key="note.id">
          <div
            @click="toggleMovie(note.id)"
            class="bg-gray-800 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-700 transition flex items-center justify-between"
          >
            <span class="text-white">{{ note.message }}</span>
            <span class="material-icons text-white">
              {{
                openedNotificationId === note.id ? "expand_less" : "expand_more"
              }}
            </span>
          </div>

          <div
            v-if="openedNotificationId === note.id"
            class="mt-2 p-4 border-l-4 border-yellow-500 bg-gray-900 rounded-lg flex items-start space-x-4"
          >
            <template v-if="getMovieById(note.movieId).value">
              <img
                :src="getMovieById(note.movieId).value.image"
                alt="Movie Poster"
                class="w-24 h-36 object-cover rounded-md flex-shrink-0"
              />
              <div class="text-white flex-grow">
                <h3 class="text-xl font-bold mb-1">
                  {{ getMovieById(note.movieId).value.title }}
                </h3>
                <p class="mb-1 text-gray-300">
                  {{ getMovieById(note.movieId).value.description }}
                </p>
                <p class="text-sm text-gray-400">
                  ⏱ ความยาว:
                  {{ getMovieById(note.movieId).value.length }} | ⭐ คะแนน:
                  {{ getMovieById(note.movieId).value.rating }} | 🔊 ภาษา:
                  {{ getMovieById(note.movieId).value.language }}
                </p>
                <button
                  class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded mt-3 text-sm flex items-center space-x-1"
                >
                  <span class="material-icons text-lg">play_arrow</span>
                  <span>Watch Now</span>
                </button>
              </div>
            </template>
            <template v-else>
              <p class="text-red-500">ไม่พบข้อมูลหนัง</p>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </MainLayout>
</template>
