<template>
  <div
    class="min-h-screen flex flex-col bg-black text-white md:grid md:grid-cols-[240px_1fr]"
  >
    <!-- เมนูด้านซ้าย (Desktop) -->
    <aside class="hidden md:flex flex-col p-4 relative">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-extrabold">
          <span class="text-white">TEST</span>
          <span class="text-yellow-400">HUB</span>
        </h1>
        <NuxtLink to="/NotificationPage" class="text-white">
          <span class="material-icons">notifications</span>
        </NuxtLink>
      </div>
      <nav class="flex flex-col gap-4">
        <NuxtLink
          to="/"
          class="p-2 rounded flex items-center gap-2"
          :class="{
            'bg-gray-700 text-yellow-400 border-l-4 border-yellow-400 pl-2':
              $route.path === '/',
            'text-white hover:bg-gray-800': $route.path !== '/',
          }"
        >
          <span class="material-icons">home</span> Home
        </NuxtLink>
        <NuxtLink
          to="/LiveNow"
          class="p-2 rounded flex items-center gap-2"
          :class="{
            'bg-gray-700 text-yellow-400 border-l-4 border-yellow-400 pl-2':
              $route.path === '/LiveNow',
            'text-white hover:bg-gray-800': $route.path !== '/LiveNow',
          }"
        >
          <span class="material-icons">live_tv</span> Live now
        </NuxtLink>
        <NuxtLink
          to="/FavoritePage"
          class="p-2 rounded flex items-center gap-2"
          :class="{
            'bg-gray-700 text-yellow-400 border-l-4 border-yellow-400 pl-2':
              $route.path === '/FavoritePage',
            'text-white hover:bg-gray-800': $route.path !== '/FavoritePage',
          }"
        >
          <span class="material-icons">favorite</span> Favorite
        </NuxtLink>
        <NuxtLink
          to="/NasaPage"
          class="p-2 rounded flex items-center gap-2"
          :class="{
            'bg-gray-700 text-yellow-400 border-l-4 border-yellow-400 pl-2':
              $route.path === '/NasaPage',
            'text-white hover:bg-gray-800': $route.path !== '/NasaPage',
          }"
        >
          <span class="material-icons">favorite</span> Favorite
        </NuxtLink>
      </nav>

      <div class="mt-auto pt-4">
        <NuxtLink
          to="/LoginPage"
          class="p-2 rounded flex items-center gap-2"
          :class="{
            'bg-gray-700 text-yellow-400 border-l-4 border-yellow-400 pl-2':
              $route.path === '/LoginPage',
            'text-white hover:bg-gray-800': $route.path !== '/LoginPage',
          }"
        >
          <span class="material-icons">account_circle</span> Login
        </NuxtLink>
      </div>

      <NuxtLink
        to="https://github.com/jhin3tytwoo/nuxt-movie-app"
        target="_blank"
        class="p-2 rounded flex items-center gap-2 text-white hover:bg-gray-800"
      >
        <span class="material-icons">code</span> GitHub
      </NuxtLink>
    </aside>

    <!-- คอนเทนต์หลัก -->
    <div class="flex-1 flex flex-col min-w-0 relative">
      <!-- เงาด้านบนสุด (มือถือ: ขอบบนล่าง, เดสก์ท็อป: ขอบซ้าย) -->
      <div
        class="absolute top-[56px] bottom-[64px] left-0 right-0 z-[999] pointer-events-none rounded-[40px] mx-0 my-0 md:top-0 md:bottom-0 md:ml-4 md:mr-0"
        style="box-shadow: 0 0 74px #ff6a00; border: 2px solid #ffb700"
      ></div>

      <!-- แถบบนมือถือ -->
      <div
        class="md:hidden flex items-center justify-between px-4 py-3 bg-black rounded-b-3xl z-10 h-[56px]"
      >
        <h1 class="text-xl font-bold">
          <span class="text-white">TEST</span>
          <span class="text-yellow-400">HUB</span>
        </h1>
        <NuxtLink to="/NotificationPage">
          <span class="material-icons text-white">notifications</span>
        </NuxtLink>
      </div>

      <!-- เนื้อหาหลัก -->
      <main class="relative z-10 overflow-hidden flex-1 md:flex-1">
        <div
          class="overflow-y-auto rounded-[40px] md:h-full md:max-h-full md:max-h-screen h-[calc(100vh-120px)] p-2 box-border"
        >
          <slot />
        </div>
      </main>

      <!-- เมนูล่างมือถือ -->
      <nav
        class="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-black p-2 rounded-t-3xl h-[64px]"
      >
        <NuxtLink
          to="/"
          class="flex flex-col items-center"
          :class="{
            'text-yellow-400': $route.path === '/',
            'text-gray-400': $route.path !== '/',
          }"
        >
          <span class="material-icons text-lg">home</span>
          <span class="text-xs">Home</span>
        </NuxtLink>
        <NuxtLink
          to="/LiveNow"
          class="flex flex-col items-center"
          :class="{
            'text-yellow-400': $route.path === '/LiveNow',
            'text-gray-400': $route.path !== '/LiveNow',
          }"
        >
          <span class="material-icons text-lg">live_tv</span>
          <span class="text-xs">Live</span>
        </NuxtLink>
        <NuxtLink
          to="/FavoritePage"
          class="flex flex-col items-center"
          :class="{
            'text-yellow-400': $route.path === '/FavoritePage',
            'text-gray-400': $route.path !== '/FavoritePage',
          }"
        >
          <span class="material-icons text-lg">favorite</span>
          <span class="text-xs">Favorite</span>
        </NuxtLink>
        <NuxtLink
          to="/LoginPage"
          class="flex flex-col items-center"
          :class="{
            'text-yellow-400': $route.path === '/LoginPage',
            'text-gray-400': $route.path !== '/LoginPage',
          }"
        >
          <span class="material-icons text-lg">account_circle</span>
          <span class="text-xs">Login</span>
        </NuxtLink>
        <NuxtLink
          to="https://github.com/jhin3tytwoo/nuxt-movie-app"
          target="_blank"
          class="flex flex-col items-center text-gray-400"
        >
          <span class="material-icons text-lg">code</span>
          <span class="text-xs">GitHub</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
