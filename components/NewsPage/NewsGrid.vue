<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8"
  >
    <article
      v-for="(article, i) in articles"
      :key="article.uri"
      class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
      :style="{ animationDelay: `${i * 50}ms` }"
    >
      <div class="relative overflow-hidden h-48">
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
          @error="$emit('image-error', $event)"
        />
        <div
          v-else
          class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center rounded-t-2xl"
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
        <div class="absolute top-3 right-3">
          <span
            :class="getDataTypeBadgeClass(article.dataType)"
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ article.dataType === "news" ? "News" : "PR" }}
          </span>
        </div>
      </div>

      <div class="p-6">
        <h3
          class="font-bold text-lg mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors"
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
        <p class="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
          {{ article.body }}
        </p>
        <a
          :href="article.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-200 font-medium transition-colors group/link"
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
</template>

<script setup lang="ts">
import { defineProps } from "vue";

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

const props = defineProps<{
  articles: NewsArticle[];
  formatDate: (dateStr: string) => string;
  getDataTypeBadgeClass: (type: "news" | "pr") => string;
}>();
</script>
