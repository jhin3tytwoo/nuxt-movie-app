<template>
  <MainLayout>
    <div
      class="h-full overflow-y-auto rounded-[40px] p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <!-- Header Section -->
      <div class="mb-4">
        <h1 class="text-4xl font-bold mb-2 text-yellow-400">Latest News</h1>
        <p class="text-gray-400">
          Stay updated with interesting news and announcements
        </p>
      </div>
      <!-- Search and Filter Section -->
      <div class="mb-4">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <!-- Search Input -->
          <div class="relative flex-1 max-w-md">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              @input="onSearchChange"
              type="text"
              placeholder="Search news..."
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <!-- Filter Buttons -->
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              @click="setDataType(option.value)"
              :class="buttonClass(option.value)"
              class="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {{ option.label }}
              <span
                v-if="option.count !== undefined"
                class="ml-2 text-xs opacity-75"
                >({{ option.count }})</span
              >
            </button>
          </div>
        </div>
      </div>
      <!-- Stats Bar -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6 text-sm text-gray-400"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span>Found {{ totalResults }} items</span>
          <span v-if="searchQuery" class="text-blue-400"
            >Search results: "{{ searchQuery }}"</span
          >
        </div>
        <div class="flex items-center gap-2">
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
        </div>
      </div>
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-16"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"
        ></div>
        <p class="text-gray-400 text-lg">Loading news...</p>
      </div>
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div
          class="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md mx-auto"
        >
          <svg
            class="h-12 w-12 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 class="text-lg font-semibold text-red-400 mb-2">
            An Error Occurred
          </h3>
          <p class="text-red-300 mb-4">{{ error }}</p>
          <button
            @click="fetchNews"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
      <!-- Empty State -->
      <div
        v-else-if="filteredArticles.length === 0 && !isLoading"
        class="text-center py-16"
      >
        <div
          class="bg-gray-800/50 border border-gray-700 rounded-xl p-8 max-w-md mx-auto"
        >
          <svg
            class="h-16 w-16 text-gray-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.077-2.33"
            />
          </svg>
          <h3 class="text-xl font-semibold mb-2">No News Found</h3>
          <p class="text-gray-400 mb-4">
            Try changing your search terms or filters
          </p>
          <button
            @click="clearSearch"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Clear Search
          </button>
        </div>
      </div>
      <!-- News Grid -->
      <div v-else>
        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8"
        >
          <article
            v-for="(article, index) in filteredArticles"
            :key="article.uri"
            class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <!-- Image -->
            <div class="relative overflow-hidden h-48">
              <img
                v-if="article.image"
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                @error="handleImageError"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
              >
                <svg
                  class="h-12 w-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <!-- Data Type Badge -->
              <div class="absolute top-3 right-3">
                <span
                  :class="getDataTypeBadgeClass(article.dataType)"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                >
                  {{ article.dataType === "news" ? "News" : "PR" }}
                </span>
              </div>
            </div>
            <!-- Content -->
            <div class="p-6">
              <h3
                class="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors"
              >
                {{ article.title }}
              </h3>

              <div class="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ formatDate(article.dateTimePub) }}</span>
                <span>•</span>
                <span class="truncate">{{ article.source.title }}</span>
              </div>

              <p
                class="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed"
              >
                {{ article.body }}
              </p>

              <a
                :href="article.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group/link"
              >
                <span>Read more</span>
                <svg
                  class="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div
          class="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
        >
          <!-- ข้อความ Showing ซ่อนบนมือถือ -->
          <div
            class="flex items-center gap-2 text-sm text-gray-400 sm:flex hidden"
          >
            <span>
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
              {{ Math.min(currentPage * itemsPerPage, totalResults) }} of
              {{ totalResults }} results
            </span>
          </div>

          <!-- ปุ่มหน้าเพจ -->
          <div
            class="flex items-center gap-2 flex-1 justify-center sm:justify-end"
          >
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="px-4 py-2 rounded-lg border border-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
            <!-- Page Numbers -->
            <div class="flex gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="
                  page === currentPage
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-600 hover:bg-gray-700'
                "
                class="px-3 py-2 rounded-lg border text-white text-sm transition-colors"
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage >= totalPages"
              class="px-4 py-2 rounded-lg border border-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts" name="NewsPage">
import { ref, computed, onMounted, watch } from "vue";
import MainLayout from "~/components/MainLayout.vue";

interface NewsArticle {
  uri: string;
  title: string;
  body: string;
  url: string;
  image?: string;
  dateTimePub: string;
  source: { title: string };
  dataType: string;
}

// State
const articles = ref<NewsArticle[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref("");
const selectedDataType = ref<"all" | "news" | "pr">("all");
const currentPage = ref(1);
const itemsPerPage = 10;
const totalResults = ref(0);

// Constants
const API_KEY = "4a6a7831-db13-4869-85b6-f1ae7eddee4d";
const API_URL = "https://newsapi.ai/api/v1/article/getArticles";

// Computed
const filterOptions = computed(() => [
  { value: "all", label: "All", count: articles.value.length },
  {
    value: "news",
    label: "News",
    count: articles.value.filter((a) => a.dataType === "news").length,
  },
  {
    value: "pr",
    label: "PR",
    count: articles.value.filter((a) => a.dataType === "pr").length,
  },
]);

const filteredArticles = computed(() => {
  let filtered = articles.value;

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        article.body.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        article.source.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by data type
  if (selectedDataType.value !== "all") {
    filtered = filtered.filter(
      (article) => article.dataType === selectedDataType.value
    );
  }

  totalResults.value = filtered.length;

  // Pagination - split data by page
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filtered.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage));

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Methods
function getMobileLabel(value: "all" | "news" | "pr") {
  const mobileLabels = {
    all: "All",
    news: "News",
    pr: "PR",
  };
  return mobileLabels[value];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
}

function buttonClass(type: "all" | "news" | "pr") {
  return selectedDataType.value === type
    ? "bg-yellow-400 border-yellow-400 text-gray-900 "
    : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500";
}

function getDataTypeBadgeClass(dataType: string) {
  return dataType === "news"
    ? "bg-green-500/20 text-green-400 border border-green-500/30"
    : "bg-purple-500/20 text-purple-400 border border-purple-500/30";
}

function setDataType(type: "all" | "news" | "pr") {
  selectedDataType.value = type;
  currentPage.value = 1;
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function clearSearch() {
  searchQuery.value = "";
  selectedDataType.value = "all";
  currentPage.value = 1;
}

function onSearchChange() {
  currentPage.value = 1;
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
}

async function fetchNews() {
  isLoading.value = true;
  error.value = null;

  try {
    const payload = {
      action: "getArticles",
      keyword: searchQuery.value || "Tesla Inc",
      ignoreSourceGroupUri: "paywall/paywalled_sources",
      articlesPage: 1,
      articlesCount: 20,
      articlesSortBy: "date",
      articlesSortByAsc: false,
      dataType:
        selectedDataType.value === "all"
          ? ["news", "pr"]
          : [selectedDataType.value],
      forceMaxDataTimeWindow: 31,
      resultType: "articles",
      apiKey: API_KEY,
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Connection error (${res.status})`);
    }

    const data = await res.json();

    if (data?.articles?.results) {
      articles.value = data.articles.results;
    } else {
      throw new Error("Unable to fetch news data");
    }
  } catch (err: any) {
    error.value = err.message || "Error loading news";
  } finally {
    isLoading.value = false;
  }
}

// Watchers
watch([searchQuery, selectedDataType], () => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth animations */
article {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.6s ease forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
