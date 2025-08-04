<template>
  <MainLayout>
    <GradientBorder class="py-4">
      <div class="min-h-screen m-4 p-[2px] relative">
        <!-- 🔍 Search + Filter -->
        <div class="flex items-center gap-3 px-4 md:px-8 py-4">
          <div
            :class="[
              'flex items-center flex-grow rounded-full px-4 py-2 transition-all',
              isSearchFocused
                ? 'border border-yellow-400 bg-black bg-opacity-40'
                : 'bg-black bg-opacity-30',
            ]"
          >
            <span class="material-icons text-white mr-2">search</span>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search movie"
              class="bg-transparent text-white placeholder-gray-300 focus:outline-none w-full"
              @focus="isSearchFocused = true"
              @blur="isSearchFocused = false"
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

        <!-- Filters -->
        <transition name="fade">
          <div v-if="showFilters" class="px-4 md:px-8 py-4">
            <!-- category -->
            <div class="mb-4">
              <label class="block mb-2 font-semibold">Category</label>
              <div class="flex flex-wrap gap-2 hide-scrollbar">
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
            <!-- length -->
            <div>
              <label class="block mb-2 font-semibold">Length</label>
              <div class="flex flex-wrap gap-2 hide-scrollbar">
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

        <!-- 🎬 Movies List -->
        <div class="px-4 md:px-8 py-4">
          <!-- ถ้ามีผลลัพธ์ -->
          <div
            v-if="
              searchTerm && searchTerm.length > 0 && filteredMovies.length > 0
            "
            class="text-white mb-2"
          >
            Results found: {{ filteredMovies.length }}
          </div>

          <!-- ถ้าไม่มีผลลัพธ์ -->
          <div
            v-else-if="
              searchTerm && searchTerm.length > 0 && filteredMovies.length === 0
            "
            class="text-white mb-4 text-sm italic"
          >
            ไม่พบสาวที่ท่านกำลังหา โปรดติดต่อแอดมินถ้าอยากได้วาป
          </div>

          <!-- แสดงรายการหนัง -->
          <div class="flex overflow-x-auto gap-4 hide-scrollbar">
            <div
              v-for="movie in filteredMovies"
              :key="movie.id"
              class="w-[180px] flex-shrink-0"
            >
              <div class="bg-black rounded-xl overflow-hidden">
                <img
                  :src="movie.image"
                  :alt="movie.title"
                  class="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Recently Watched -->
        <div class="px-4 md:px-8">
          <div
            v-if="
              !(
                searchTerm &&
                searchTerm.length > 0 &&
                filteredMovies.length === 0
              )
            "
          >
            <h2 class="text-xl font-bold mb-2">Recently watch</h2>
            <div class="flex overflow-x-auto gap-3 hide-scrollbar">
              <div
                v-for="movie in filteredMovies.slice(0, 5)"
                :key="'recent-' + movie.id"
                class="min-w-[60%] md:min-w-[18%] overflow-hidden shadow-lg"
                style="width: 180px"
              >
                <div class="p-2 flex flex-col bg-gray-800 rounded-xl">
                  <div class="overflow-hidden mb-2 h-40 w-full">
                    <img
                      :src="movie.image"
                      class="w-full h-full object-cover rounded-xl"
                      :alt="movie.title"
                    />
                  </div>
                  <p class="text-sm font-semibold">{{ movie.title }}</p>
                  <p class="text-xs opacity-60">EP.2 “Last Dance”</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New Coming -->
        <div class="px-4 md:px-8 mt-6">
          <div
            v-if="
              !(
                searchTerm &&
                searchTerm.length > 0 &&
                filteredMovies.length === 0
              )
            "
          >
            <h2 class="text-xl font-bold mb-2">New coming</h2>
            <div class="flex overflow-x-auto gap-3 hide-scrollbar">
              <div
                v-for="movie in filteredMovies.slice(0, 5)"
                :key="'new-' + movie.id"
                class="bg-gray-800 min-w-[45%] md:min-w-0 rounded-xl overflow-hidden flex flex-col shadow-lg"
                style="width: 180px"
              >
                <div class="h-40 w-full overflow-hidden">
                  <img
                    :src="movie.image"
                    class="w-full h-full object-cover rounded-t-xl"
                    :alt="movie.title"
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
        </div>

        <!-- Action -->
        <div class="px-4 md:px-8 mt-6 mb-10">
          <div
            v-if="
              !(
                searchTerm &&
                searchTerm.length > 0 &&
                filteredMovies.length === 0
              )
            "
          >
            <h2 class="text-xl font-bold mb-2">Action</h2>
            <div class="flex overflow-x-auto gap-3 hide-scrollbar">
              <div
                v-for="movie in filteredMovies
                  .filter((m) => m.category === 'Action')
                  .slice(0, 5)"
                :key="'action-' + movie.id"
                class="bg-gray-800 min-w-[45%] md:min-w-0 overflow-hidden rounded-xl shadow-lg"
                style="width: 180px; height: 240px"
              >
                <img
                  :src="movie.image"
                  class="w-full h-full object-cover rounded-xl"
                  :alt="movie.title"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientBorder>
  </MainLayout>
</template>

<script setup name="HomePage">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMovies } from "~/composables/useMovies";
import GradientBorder from "~/components/GradientBorder.vue";
import MainLayout from "~/components/MainLayout.vue";

const { movies } = useMovies();
const searchTerm = ref("");
const isSearchFocused = ref(false);
const showFilters = ref(false);
const selectedCategory = ref("All");
const selectedLength = ref("All");

const isDesktop = ref(false);
const checkScreenWidth = () => {
  isDesktop.value = window.innerWidth >= 768;
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

const filteredMovies = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  return movies.value.filter((movie) => {
    const title = movie.title.trim().toLowerCase();
    const matchesSearch = term === "" || title.includes(term);
    const matchesCategory =
      selectedCategory.value === "All" ||
      movie.category === selectedCategory.value;
    const matchesLength = lengthFilter(movie.length);
    return matchesSearch && matchesCategory && matchesLength;
  });
});
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
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
