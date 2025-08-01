<script setup name="HomePage">
import { ref, computed } from "vue";
import { useMovies } from "~/composables/useMovies";
import MainLayout from "~/components/MainLayout.vue";

const { movies } = useMovies();
const searchTerm = ref("");
const showFilters = ref(false);
const selectedCategory = ref("All");
const selectedLength = ref("All");

const categories = computed(() => {
  const cats = movies.value.map((m) => m.category);
  return ["All", ...new Set(cats)];
});

const lengthOptions = [
  "All",
  "Under 40 Mins",
  "Under 1 Hour",
  "More than 1 Hour",
];

const lengthFilter = (lengthStr) => {
  const hrMatch = lengthStr.match(/(\d+)\s*hr/);
  const minMatch = lengthStr.match(/(\d+)\s*min/);
  const hr = hrMatch ? parseInt(hrMatch[1]) : 0;
  const min = minMatch ? parseInt(minMatch[1]) : 0;
  const totalMin = hr * 60 + min;

  if (selectedLength.value === "Under 40 Mins") return totalMin < 40;
  if (selectedLength.value === "Under 1 Hour") return totalMin < 60;
  if (selectedLength.value === "More than 1 Hour") return totalMin > 60;
  return true;
};

const filteredMovies = computed(() =>
  movies.value.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "All" ||
      movie.category === selectedCategory.value;
    const matchesLength = lengthFilter(movie.length);
    return matchesSearch && matchesCategory && matchesLength;
  })
);
</script>

<template>
  <MainLayout>
    <div>
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-2">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="ค้นหาหนังตามชื่อ..."
          class="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <button
          @click="showFilters = !showFilters"
          class="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
            />
          </svg>
          Filter
        </button>
      </div>

      <transition name="fade">
        <div
          v-if="showFilters"
          class="mb-6 border border-gray-300 rounded p-4 bg-white shadow"
        >
          <!-- Category -->
          <div class="mb-4">
            <label class="block mb-2 font-semibold">Category</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="selectedCategory = cat"
                :class="[
                  'px-3 py-1 rounded border cursor-pointer',
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100',
                ]"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Length -->
          <div>
            <label class="block mb-2 font-semibold">Length</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="len in lengthOptions"
                :key="len"
                @click="selectedLength = len"
                :class="[
                  'px-3 py-1 rounded border cursor-pointer',
                  selectedLength === len
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100',
                ]"
              >
                {{ len }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="bg-white text-black p-4 rounded-xl shadow-xl hover:scale-105 transition"
        >
          <img
            :src="movie.image"
            :alt="movie.title"
            class="w-full h-48 object-cover rounded mb-3"
          />
          <h3 class="font-bold text-xl">{{ movie.title }}</h3>
          <div class="flex items-center mb-2">
            <template v-for="n in 5" :key="n">
              <span class="text-yellow-500 text-lg">
                {{ n <= movie.rating ? "★" : "☆" }}
              </span>
            </template>
          </div>
          <p class="text-sm text-gray-700">⏱️ {{ movie.length }}</p>
          <p class="text-sm text-gray-700">
            🔊<span class="font-semibold">{{ movie.language }}</span>
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
