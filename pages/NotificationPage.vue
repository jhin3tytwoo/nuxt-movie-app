<script setup name="NotificationPage">
import { ref } from "vue";
import MainLayout from "~/components/MainLayout.vue";
import { useMovies } from "~/composables/useMovies";

const { movies } = useMovies();

const notifications = ref([
  {
    id: 1,
    message: "🎉 New movie has been added!",
    movieId: 1,
  },
  {
    id: 2,
    message: "🎉 New movie has been added!",
    movieId: 2,
  },
]);

const openedNotificationId = ref(null);

const toggleMovie = (id) => {
  openedNotificationId.value = openedNotificationId.value === id ? null : id;
};
</script>

<template>
  <MainLayout>
    <div>
      <h2 class="text-3xl font-semibold mb-4">🔔 การแจ้งเตือน</h2>
      <ul class="space-y-4">
        <li v-for="note in notifications" :key="note.id">
          <div
            @click="toggleMovie(note.id)"
            class="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
          >
            {{ note.message }}
          </div>

          <div
            v-if="openedNotificationId === note.id"
            class="mt-2 p-4 border-l-4 border-purple-600 bg-purple-50 rounded-lg"
          >
            <template v-if="movies && movies.length">
              <template v-if="movies.find((m) => m.id === note.movieId)">
                <div class="text-black">
                  <h3 class="text-xl font-bold mb-1">
                    {{ movies.find((m) => m.id === note.movieId).title }}
                  </h3>
                  <p class="mb-1">
                    {{ movies.find((m) => m.id === note.movieId).description }}
                  </p>
                  <p class="text-sm text-gray-600">
                    ⏱ ความยาว:
                    {{ movies.find((m) => m.id === note.movieId).length }} นาที
                    | ⭐ คะแนน:
                    {{ movies.find((m) => m.id === note.movieId).rating }} | 🔊
                    ภาษา:
                    {{ movies.find((m) => m.id === note.movieId).language }}
                  </p>
                  <button
                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-3"
                  >
                    ▶️ Watch Now
                  </button>
                </div>
              </template>
              <template v-else>
                <p class="text-red-500">ไม่พบข้อมูลหนัง</p>
              </template>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </MainLayout>
</template>
