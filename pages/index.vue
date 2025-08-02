<template>
  <MainLayout>
    <div class="bg-black min-h-screen text-white font-sans">
      <div class="flex items-center gap-3 px-4 md:px-8 py-4">
        <div
          class="flex items-center flex-grow bg-black bg-opacity-30 rounded-full px-4 py-2"
        >
          <span class="material-icons text-white mr-2">search</span>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search movie"
            class="bg-transparent text-white placeholder-gray-300 focus:outline-none w-full"
          />
        </div>
        <button
          @click="showFilters = !showFilters"
          class="text-white flex items-center gap-1"
        >
          <span class="material-icons">filter_list</span>
          <span class="hidden md:inline">Filter</span>
        </button>
      </div>

      <transition name="fade">
        <div v-if="showFilters" class="px-4 md:px-8 py-4">
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
                    ? 'bg-yellow-500 text-black border-yellow-500'
                    : 'bg-gray-800 text-white border-gray-500 hover:bg-gray-600',
                ]"
              >
                {{ cat }}
              </button>
            </div>
          </div>

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
                    ? 'bg-yellow-500 text-black border-yellow-500'
                    : 'bg-gray-800 text-white border-gray-500 hover:bg-gray-600',
                ]"
              >
                {{ len }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <div class="flex overflow-x-auto gap-4 px-4 md:px-8 py-4">
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="min-w-[60%] md:min-w-[18%] rounded-xl overflow-hidden shadow-lg"
        >
          <img
            :src="movie.image"
            :alt="movie.title"
            class="w-full h-80 object-cover"
          />
        </div>
      </div>
      <div class="px-4 md:px-8">
        <h2 class="text-xl font-bold mb-2">Recently watch</h2>
        <div class="flex overflow-x-auto gap-3">
          <div
            v-for="movie in filteredMovies.slice(0, 5)"
            :key="'recent-' + movie.id"
            class="bg-gray-800 rounded-xl p-2 flex flex-col flex-shrink-0 min-w-[60%] md:min-w-[18%] overflow-hidden shadow-lg"
            style="width: 180px"
          >
            <div class="overflow-hidden rounded mb-2 h-40 w-full flex-shrink-0">
              <img
                :src="movie.image"
                class="w-full h-full object-cover"
                alt="movie.title"
              />
            </div>
            <p class="text-sm font-semibold">{{ movie.title }}</p>
            <p class="text-xs opacity-60">EP.2 “Last Dance”</p>
          </div>
        </div>
      </div>

      <div class="px-4 md:px-8 mt-6">
        <h2 class="text-xl font-bold mb-2">New coming</h2>
        <div class="flex overflow-x-auto gap-3">
          <div
            v-for="movie in filteredMovies.slice(0, 5)"
            :key="'new-' + movie.id"
            class="bg-gray-800 min-w-[45%] md:min-w-0 rounded-xl overflow-hidden flex flex-col shadow-lg"
            style="width: 180px"
          >
            <div class="overflow-hidden rounded-t h-40 w-full flex-shrink-0">
              <img
                :src="movie.image"
                class="w-full h-full object-cover"
                alt="movie.title"
              />
            </div>
            <div class="p-2 flex flex-col flex-grow">
              <p class="text-sm font-bold">{{ movie.title }}</p>
              <p class="text-yellow-400 text-sm">⭐⭐⭐⭐☆</p>
              <p class="text-xs text-gray-400">🕒 {{ movie.length }}</p>
              <p class="text-xs text-gray-400">🌐 {{ movie.language }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 md:px-8 mt-6 mb-10">
        <h2 class="text-xl font-bold mb-2">Action</h2>
        <div class="flex overflow-x-auto gap-3">
          <div
            v-for="movie in filteredMovies
              .filter((m) => m.category === 'Action')
              .slice(0, 5)"
            :key="'action-' + movie.id"
            class="bg-gray-800 min-w-[45%] md:min-w-0 rounded-xl overflow-hidden shadow-lg"
            style="width: 180px; height: 240px"
          >
            <img
              :src="movie.image"
              class="w-full h-full object-cover"
              alt="movie.title"
            />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup name="HomePage">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMovies } from "~/composables/useMovies";
import MainLayout from "~/components/MainLayout.vue";

const { movies } = useMovies();
const searchTerm = ref("");
const showFilters = ref(false);
const selectedCategory = ref("All");
const selectedLength = ref("All");

const isDesktop = ref(false);
const checkScreenWidth = () => {
  isDesktop.value = window.innerWidth >= 768; // Tailwind's 'md' breakpoint
};
onMounted(() => {
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkScreenWidth);
});

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
