<template>
  <MainLayout>
    <div class="h-full overflow-y-auto rounded-[40px] p-6 text-white">
      <!-- Header -->
      <NewsHeader />
      <!-- Search & Filter -->
      <NewsSearchFilter
        v-model:searchQuery="searchQuery"
        :selectedDataType="selectedDataType"
        :articles="articles"
        @set-data-type="setDataType"
        @set-title="setTitleFilter"
      />
      <!-- Stats -->
      <NewsStats
        :searchQuery="searchQuery"
        :totalResults="totalResults"
        :currentPage="currentPage"
        :totalPages="totalPages"
      />
      <!-- Status (Loading / Error / Empty) -->
      <NewsStatus
        :isLoading="isLoading"
        :error="error"
        :isEmpty="!isLoading && !error && filteredArticles.length === 0"
        @retry="fetchNews"
        @clear-search="clearSearch"
      />
      <!-- News Grid -->
      <NewsGrid
        :articles="filteredArticles"
        :formatDate="formatDate"
        :getDataTypeBadgeClass="getDataTypeBadgeClass"
      />
      <!-- Pagination -->
      <NewsPagination
        v-if="!isLoading && !error && filteredArticles.length > 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :itemsPerPage="itemsPerPage"
        :totalResults="totalResults"
        @go-to-page="goToPage"
      />
    </div>
  </MainLayout>
</template>

<script setup lang="ts" name="NewsPage">
import { ref, computed, onMounted, watch } from "vue";
import MainLayout from "~/components/MainLayout.vue";
import NewsHeader from "~/components/NewsPage/NewsHeader.vue";
import NewsSearchFilter from "~/components/NewsPage/NewsSearchFilter.vue";
import NewsStats from "~/components/NewsPage/NewsStats.vue";
import NewsStatus from "~/components/NewsPage/NewsStatus.vue";
import NewsGrid from "~/components/NewsPage/NewsGrid.vue";
import NewsPagination from "~/components/NewsPage/NewsPagination.vue";

interface NewsArticle {
  uri: string;
  title: string;
  body: string;
  url: string;
  image?: string;
  dateTimePub: string;
  source: { title: string };
  dataType: "news" | "pr";
}

const articles = ref<NewsArticle[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref("");
const selectedDataType = ref<"all" | "news" | "pr">("all");
const currentPage = ref(1);
const itemsPerPage = 10;
const totalResults = ref(0);
const selectedTitle = ref("");
const API_KEY = "4a6a7831-db13-4869-85b6-f1ae7eddee4d";
const API_URL = "https://newsapi.ai/api/v1/article/getArticles";
const filteredArticles = computed(() => {
  let filtered = articles.value;
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.source.title.toLowerCase().includes(q)
    );
  }
  if (selectedDataType.value !== "all") {
    filtered = filtered.filter((a) => a.dataType === selectedDataType.value);
  }
  if (selectedTitle.value) {
    filtered = filtered.filter((a) => a.source.title === selectedTitle.value);
  }
  return filtered.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  );
});
watchEffect(() => {
  let filtered = articles.value;
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.source.title.toLowerCase().includes(q)
    );
  }
  if (selectedDataType.value !== "all") {
    filtered = filtered.filter((a) => a.dataType === selectedDataType.value);
  }
  if (selectedTitle.value) {
    filtered = filtered.filter((a) => a.source.title === selectedTitle.value);
  }
  totalResults.value = filtered.length;
});
const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage));
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const diffDays = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
function setDataType(type: "all" | "news" | "pr") {
  selectedDataType.value = type;
  currentPage.value = 1;
}
function setTitleFilter(title: string) {
  selectedTitle.value = title;
  currentPage.value = 1;
}
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
function clearSearch() {
  searchQuery.value = "";
  selectedDataType.value = "all";
  currentPage.value = 1;
}
function getDataTypeBadgeClass(type: "news" | "pr") {
  return type === "news"
    ? "bg-yellow-400/20 text-yellow-400"
    : "bg-blue-400/20 text-blue-400";
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
    if (!res.ok) throw new Error(`Connection error (${res.status})`);
    const data = await res.json();
    console.log("API raw data:", data);
    console.log("Articles:", data?.articles?.results);
    if (data?.articles?.results) {
      articles.value = data.articles.results;
    } else {
      throw new Error("Unable to fetch news data");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = String(err);
    }
  } finally {
    isLoading.value = false;
  }
}

watch([searchQuery, selectedDataType], () => (currentPage.value = 1));
onMounted(fetchNews);
</script>
