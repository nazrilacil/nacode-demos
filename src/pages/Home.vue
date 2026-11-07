<script setup>
import { computed, onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import DemoCard from '../components/DemoCard.vue';
import SearchBar from '../components/SearchBar.vue';
import { ArrowRight, LayoutGrid, SearchX } from 'lucide-vue-next';
import { getAllDemos, getCategories } from '../utils/demoRegistry';

const demos = getAllDemos();
const categories = getCategories(demos);
const featured = computed(() => demos.filter((d) => d.featured));

const query = ref('');
const activeCategory = ref('All');
const showFeaturedOnly = ref(false);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return demos.filter((d) => {
    if (showFeaturedOnly.value && !d.featured) return false;
    if (activeCategory.value !== 'All' && d.category !== activeCategory.value) return false;
    if (q && !d.name.toLowerCase().includes(q) && !d.category.toLowerCase().includes(q)) return false;
    return true;
  });
});

onMounted(() => {
  document.title = 'Nacode Demo Showcase — Katalog Demo Website Modern';
  const content = 'Katalog demo website modern untuk salon, catering, beauty care, dan bisnis lokal. Dikurasi oleh Nacode Creative.';
  let desc = document.querySelector('meta[name="description"]');
  if (!desc) {
    desc = document.createElement('meta');
    desc.setAttribute('name', 'description');
    document.head.appendChild(desc);
  }
  desc.setAttribute('content', content);
});

function scrollToDemos() {
  document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetFilters() {
  query.value = '';
  activeCategory.value = 'All';
  showFeaturedOnly.value = false;
}
</script>

<template>
  <div id="home" class="min-h-screen bg-[#fbfbfd]">
    <Navbar />

    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute left-1/2 top-[-20%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-soft via-white to-transparent opacity-70 blur-2xl" />
        <div class="absolute right-[-10%] top-[30%] h-72 w-72 rounded-full bg-gradient-to-br from-indigo-100 to-transparent opacity-60 blur-2xl animate-floatSlow" />
      </div>

      <div class="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div class="mx-auto max-w-3xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-ink-soft shadow-sm backdrop-blur">
            <span class="h-1.5 w-1.5 rounded-full bg-accent" />
            Nacode Creative Showcase
          </span>

          <h1 class="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink animate-fadeUp sm:text-5xl md:text-6xl">
            Explore Our Website Concepts
          </h1>
          <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-mute animate-fadeUp sm:text-lg" style="animation-delay:80ms">
            A curated collection of modern website concepts crafted for businesses ready to grow digitally.
          </p>

          <div class="mt-8 flex flex-col items-center justify-center gap-3 animate-fadeUp sm:flex-row" style="animation-delay:160ms">
            <button
              type="button"
              @click="scrollToDemos"
              class="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Explore Demos
              <ArrowRight class="h-4 w-4" />
            </button>
            <a
              href="mailto:hello@nacode.id?subject=Project%20Inquiry"
              class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink-soft transition hover:bg-slate-50"
            >
              Work With Us
            </a>
          </div>

          <dl class="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-3 text-center animate-fadeUp" style="animation-delay:240ms">
            <div class="rounded-xl border border-slate-200 bg-white/60 p-3 backdrop-blur">
              <dt class="text-[11px] uppercase tracking-wide text-ink-mute">Demos</dt>
              <dd class="font-display text-xl font-semibold text-ink">{{ demos.length }}</dd>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white/60 p-3 backdrop-blur">
              <dt class="text-[11px] uppercase tracking-wide text-ink-mute">Categories</dt>
              <dd class="font-display text-xl font-semibold text-ink">{{ categories.length }}</dd>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white/60 p-3 backdrop-blur">
              <dt class="text-[11px] uppercase tracking-wide text-ink-mute">Featured</dt>
              <dd class="font-display text-xl font-semibold text-ink">{{ featured.length }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section id="demos" class="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 sm:px-6">
      <div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Demo Catalog</h2>
          <p class="mt-1 text-sm text-ink-mute">Jelajahi koleksi demo website Nacode.</p>
        </div>
        <span class="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-mute sm:self-auto">
          <LayoutGrid class="h-3.5 w-3.5" />
          {{ categories.length }} kategori tersedia
        </span>
      </div>

      <SearchBar
        v-model="query"
        :categories="categories"
        :active-category="activeCategory"
        :show-featured-only="showFeaturedOnly"
        :result-count="filtered.length"
        @update:active-category="activeCategory = $event"
        @update:show-featured-only="showFeaturedOnly = $event"
      />

      <div v-if="filtered.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard v-for="(d, i) in filtered" :key="d.slug" :demo="d" :index="i" class="animate-fadeUp" />
      </div>

      <div v-else class="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
        <div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-ink-mute">
          <SearchX class="h-6 w-6" />
        </div>
        <h3 class="mt-4 font-display text-lg font-semibold text-ink">Tidak ada demo yang cocok</h3>
        <p class="mt-1 text-sm text-ink-mute">Coba ubah kata kunci, kategori, atau matikan filter Featured.</p>
        <button
          type="button"
          @click="resetFilters"
          class="mt-5 inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-accent-deep"
        >
          Reset filter
        </button>
      </div>
    </section>

    <Footer />
  </div>
</template>