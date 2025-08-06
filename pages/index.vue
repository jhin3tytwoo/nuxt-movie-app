<template>
  <MainLayout>
    <div class="h-full overflow-y-auto rounded-[40px]">
      <!-- 🔍 Search + Filter -->
      <div class="flex items-center gap-3 px-4 md:px-8 py-4">
        <div
          :class="[
            'flex items-center rounded-full px-4 py-2 transition-all flex-1 max-w-4xl',
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
          class="text-white flex items-center gap-1 flex-shrink-0"
        >
          <span class="material-icons">filter_list</span>
          <span class="hidden md:inline">Filter</span>
        </button>
      </div>
      <!-- Filters -->
      <transition name="fade">
        <div v-if="showFilters" class="px-4 md:px-8 py-4">
          <!-- Category -->
          <div class="mb-4">
            <label class="block mb-2 font-semibold">Category</label>
            <div class="flex overflow-x-auto gap-2 hide-scrollbar pb-2">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="selectedCategory = cat"
                :class="[
                  'flex-shrink-0 px-3 py-1 border cursor-pointer transition-colors duration-200',
                  selectedCategory === cat
                    ? 'bg-gray-700 text-white border-gray-700'
                    : 'bg-black text-gray-400 border-gray-500 hover:bg-gray-700 hover:text-white',
                ]"
                style="border-radius: 55px; border-width: 1px"
              >
                {{ cat }}
              </button>
            </div>
          </div>
          <!-- Length -->
          <div>
            <label class="block mb-2 font-semibold">Length</label>
            <div class="flex overflow-x-auto gap-2 hide-scrollbar pb-2">
              <button
                v-for="len in lengthOptions"
                :key="len"
                @click="selectedLength = len"
                :class="[
                  'flex-shrink-0 px-3 py-1 border cursor-pointer transition-colors duration-200',
                  selectedLength === len
                    ? 'bg-gray-700 text-white border-gray-700'
                    : 'bg-black text-gray-400 border-gray-500 hover:bg-gray-700 hover:text-white',
                ]"
                style="border-radius: 55px; border-width: 1px"
              >
                {{ len }}
              </button>
            </div>
          </div>
        </div>
      </transition>
      <!-- 🎬 Search Result -->
      <div
        v-if="
          isSearching || selectedCategory !== 'All' || selectedLength !== 'All'
        "
        class="px-4 md:px-8 py-4"
      >
        <div v-if="filteredMovies.length > 0" class="text-white mb-2 px-4">
          Search result: "{{ searchTerm }}"
        </div>
        <div v-else class="text-white mb-4 text-sm italic text-center">
          ไม่พบสาวที่ท่านกำลังหา โปรดติดต่อแอดมินถ้าอยากได้วาป
        </div>

        <div class="pb-4">
          <div
            class="flex flex-wrap gap-3"
            :class="isDesktop ? 'justify-start' : 'justify-evenly'"
          >
            <div
              v-for="movie in filteredMovies"
              :key="'search-' + movie.id"
              class="bg-black rounded-xl overflow-hidden flex flex-col shadow-lg text-white flex-shrink-0"
              :class="isDesktop ? 'w-[275px] h-[290px]' : 'w-[139px] h-[230px]'"
            >
              <div
                class="w-full overflow-hidden"
                :class="isDesktop ? 'h-[162px]' : 'h-[96px]'"
              >
                <img
                  :src="movie.image"
                  class="w-full h-full object-cover rounded-xl"
                  :alt="movie.title"
                />
              </div>
              <div class="p-2 flex flex-col flex-grow">
                <p class="text-sm font-bold leading-tight">
                  {{ movie.title }}
                </p>
                <p class="text-yellow-400 text-sm leading-tight">⭐⭐⭐⭐☆</p>
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
      <!-- ✅ แสดงเฉพาะเมื่อไม่มีการค้นหา และไม่มีการเลือกฟิลเตอร์ -->
      <template
        v-if="
          !isSearching && selectedCategory === 'All' && selectedLength === 'All'
        "
      >
        <!-- 🎬 Movie List -->
        <div class="px-4 md:px-8">
          <div class="overflow-x-auto hide-scrollbar pb-4">
            <div class="flex gap-4 w-max">
              <div
                v-for="movie in filteredMovies.slice(0, 5)"
                :key="movie.id"
                class="flex-shrink-0 relative group"
                :style="isDesktop ? 'width: 306px' : 'width: 183px'"
              >
                <img
                  :src="movie.image"
                  class="object-cover rounded-xl"
                  :style="
                    isDesktop
                      ? 'width: 306px; height: 461px'
                      : 'width: 183px; height: 275px'
                  "
                />

                <!-- Overlay -->
                <div
                  class="absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity"
                  :style="
                    isDesktop
                      ? 'width: 306px; height: 461px'
                      : 'width: 183px; height: 275px'
                  "
                >
                  <span
                    class="material-icons text-white text-6xl select-none pointer-events-none"
                  >
                    play_circle_filled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ✅ Recently Watched -->
        <div class="px-4 md:px-8">
          <h2 class="text-xl font-bold mb-4 text-white">Recently watch</h2>
          <div class="overflow-x-auto hide-scrollbar pb-4">
            <div class="flex gap-3 w-max">
              <div
                v-for="movie in filteredMovies.slice(0, 4)"
                :key="'recent-' + movie.id"
                class="relative flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
                :style="
                  isDesktop
                    ? 'width: 224px; height: 138px'
                    : 'width: 140px; height: 86px'
                "
              >
                <img
                  :src="movie.image"
                  class="w-full h-full object-cover"
                  :alt="movie.title"
                />
                <div
                  class="absolute bottom-0 left-0 w-full px-3 py-2 text-white text-xs bg-gradient-to-t from-black/70 to-transparent"
                >
                  <p class="font-semibold text-sm leading-tight drop-shadow">
                    {{ movie.title }}
                  </p>
                  <p class="text-[11px] opacity-80 leading-none drop-shadow">
                    EP.2 "Last Dance"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ✅ New Coming -->
        <div class="px-4 md:px-8">
          <h2 class="text-xl font-bold mb-4 text-white">New coming</h2>
          <div class="overflow-x-auto hide-scrollbar pb-4">
            <div class="flex gap-3 w-max">
              <div
                v-for="movie in filteredMovies.slice(0, 3)"
                :key="'new-' + movie.id"
                class="bg-black rounded-xl overflow-hidden flex flex-col shadow-lg text-white flex-shrink-0"
                :style="isDesktop ? 'width: 275px' : 'width: 139px'"
              >
                <div
                  class="w-full overflow-hidden"
                  :style="isDesktop ? 'height: 168px' : 'height: 96px'"
                >
                  <img
                    :src="movie.image"
                    class="w-full h-full object-cover rounded-xl"
                    :alt="movie.title"
                  />
                </div>
                <div class="p-2 flex flex-col flex-grow">
                  <p class="text-sm font-bold leading-tight">
                    {{ movie.title }}
                  </p>
                  <p class="text-yellow-400 text-sm leading-tight">⭐⭐⭐⭐☆</p>
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
        <!-- ✅ category -->
        <div
          v-for="category in uniqueCategories"
          :key="category"
          class="px-4 md:px-8"
        >
          <h2 class="text-xl font-bold mb-4 text-white">{{ category }}</h2>
          <div class="overflow-x-auto hide-scrollbar pb-4">
            <div class="flex gap-3 w-max">
              <div
                v-for="movie in movies.filter((m) => m.category === category)"
                :key="category + '-' + movie.id"
                class="bg-black rounded-xl overflow-hidden flex flex-col shadow-lg text-white flex-shrink-0"
                :style="isDesktop ? 'width: 275px' : 'width: 139px'"
              >
                <div
                  class="w-full overflow-hidden"
                  :style="isDesktop ? 'height: 138px' : 'height: 96px'"
                >
                  <img
                    :src="movie.image"
                    class="w-full h-full object-cover rounded-xl"
                    :alt="movie.title"
                  />
                </div>
                <div class="p-2 flex flex-col flex-grow">
                  <p class="text-sm font-bold leading-tight">
                    {{ movie.title }}
                  </p>
                  <p class="text-yellow-400 text-sm leading-tight">⭐⭐⭐⭐☆</p>
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
      </template>
    </div>
  </MainLayout>
</template>

<script setup name="HomePage">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMovies } from "~/composables/useMovies";
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

const isSearching = computed(() => searchTerm.value.trim().length > 0);

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

const uniqueCategories = computed(() => [
  ...new Set(movies.value.map((m) => m.category)),
]);
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
.drop-shadow {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
</style>
