<template>
  <div
    class="min-h-screen flex flex-col bg-black text-white md:grid md:grid-cols-[240px_1fr]"
  >
    <aside class="hidden md:flex flex-col bg-black p-4 relative">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-extrabold">
          <span class="text-white">TEST</span
          ><span class="text-yellow-400">HUB</span>
        </h1>
        <NuxtLink to="/NotificationPage" class="text-white">
          <span class="material-icons">notifications</span>
        </NuxtLink>
      </div>
      <nav class="flex flex-col gap-4 text-white">
        <NuxtLink
          to="/"
          class="p-2 rounded flex items-center gap-2"
          :class="{
            'bg-gray-700 text-yellow-400 border-l-4 border-yellow-400 pl-2':
              $route.path === '/',
            'hover:bg-gray-800': $route.path !== '/',
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
            'hover:bg-gray-800': $route.path !== '/',
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
            'hover:bg-gray-800': $route.path !== '/',
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
            'hover:bg-gray-800': $route.path !== '/',
          }"
        >
          <span class="material-icons">account_circle</span> Login
        </NuxtLink>
      </div>
      <NuxtLink
        to="https://github.com/jhin3tytwoo/nuxt-movie-app"
        target="_blank"
        class="p-2 rounded flex items-center gap-2 hover:bg-gray-800"
      >
        <span class="material-icons">code</span> GitHub
      </NuxtLink>

      <div
        class="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-orange-700 to-yellow-500 shadow-lg shadow-yellow-500/50"
      ></div>
    </aside>

    <div
      class="md:hidden flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-800 to-yellow-500 shadow-lg shadow-yellow-500/50 rounded-b-3xl"
    >
      <h1 class="text-xl font-bold">
        <span class="text-white">TEST</span
        ><span class="text-yellow-400">HUB</span>
      </h1>
      <NuxtLink to="/NotificationPage">
        <span class="material-icons text-white">notifications</span>
      </NuxtLink>
    </div>

    <div class="flex-1 flex flex-col">
      <main class="flex-1">
        <slot />
      </main>

      <nav
        class="md:hidden fixed bottom-0 left-0 right-0 flex justify-around bg-gradient-to-r from-orange-800 to-yellow-500 p-2 shadow-lg shadow-yellow-500/50 rounded-t-3xl"
      >
        <NuxtLink
          to="/"
          class="flex flex-col items-center"
          :class="{
            'text-yellow-400': $route.path === '/',
            'text-white': $route.path !== '/',
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
            'text-white': $route.path !== '/LiveNow',
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
            'text-white': $route.path !== '/FavoritePage',
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
            'text-white': $route.path !== '/LoginPage',
          }"
        >
          <span class="material-icons text-lg">account_circle</span>
          <span class="text-xs">Login</span>
        </NuxtLink>
        <NuxtLink
          to="https://github.com/jhin3tytwoo/nuxt-movie-app"
          target="_blank"
          class="flex flex-col items-center text-white"
        >
          <span class="material-icons text-lg">code</span>
          <span class="text-xs">GitHub</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
