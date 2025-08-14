<template>
  <section
    class="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
  >
    <!-- Search Box -->
    <div class="relative flex-1 w-full max-w-md">
      <svg
        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
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
      <input
        :value="searchQuery"
        class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        placeholder="Search news..."
      />
    </div>

    <!-- Title Dropdown Filter -->
    <div class="w-full max-w-xs">
      <select
        class="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
        @change="$emit('set-title', $event.target.value)"
      >
        <option value="">All Sources</option>
        <option v-for="t in uniqueTitles" :key="t" :value="t">
          {{ t }}
        </option>
      </select>
    </div>

    <!-- DataType Filter -->
    <div class="flex flex-wrap gap-2 w-full lg:w-auto">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        class="px-5 py-2 rounded-xl font-medium text-sm transition transform duration-200 hover:scale-105 active:scale-95"
        @click="$emit('set-data-type', option.value)"
        :class="buttonClass(option.value)"
      >
        {{ option.label }}
        <span v-if="option.count !== undefined" class="ml-1 text-xs opacity-75">
          ({{ option.count }})
        </span>
      </button>
    </div>
  </section>
</template>
<script setup lang="ts" name="NewsSearchFilter">
import { computed, defineProps } from "vue";
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
interface FilterOption {
  value: "all" | "news" | "pr";
  label: string;
  count?: number;
}
const props = defineProps<{
  searchQuery: string;
  selectedDataType: "all" | "news" | "pr";
  articles: NewsArticle[];
}>();
const filterOptions = computed<FilterOption[]>(() => [
  { value: "all", label: "All", count: props.articles.length },
  {
    value: "news",
    label: "News",
    count: props.articles.filter((a) => a.dataType === "news").length,
  },
  {
    value: "pr",
    label: "PR",
    count: props.articles.filter((a) => a.dataType === "pr").length,
  },
]);
const uniqueTitles = computed(() => {
  const titles = props.articles.map((a) => a.source?.title).filter(Boolean);
  return [...new Set(titles)];
});
function buttonClass(type: "all" | "news" | "pr") {
  return props.selectedDataType === type
    ? "bg-yellow-400 border-yellow-400 text-gray-900"
    : "bg-gray-700/50 border border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500";
}
</script>
