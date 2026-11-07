<script setup>
import { Instagram, Linkedin, Github, Mail } from 'lucide-vue-next';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-slate-200 bg-white">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="grid h-9 w-9 place-items-center rounded-xl bg-ink font-display text-sm font-bold text-white">N</span>
            <span class="font-display text-base font-semibold text-ink">Nacode</span>
          </div>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-ink-mute">
            Katalog demo website modern untuk bisnis yang siap tumbuh secara digital.
          </p>
        </div>

        <div>
          <h3 class="font-display text-sm font-semibold text-ink">Mari bekerja sama</h3>
          <p class="mt-2 text-sm text-ink-mute">Punya ide project? Ceritakan kebutuhan Anda.</p>
          <a
            href="mailto:hello@nacode.id?subject=Project%20Inquiry"
            class="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-accent-deep"
          >
            <Mail class="h-4 w-4" />
            nazrilacil04@gmail.com
          </a>
        </div>

        <div>
          <h3 class="font-display text-sm font-semibold text-ink">Terhubung</h3>
          <div class="mt-3 flex gap-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               class="rounded-lg p-2 text-ink-soft ring-1 ring-slate-200 hover:bg-slate-50">
              <Instagram class="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               class="rounded-lg p-2 text-ink-soft ring-1 ring-slate-200 hover:bg-slate-50">
              <Linkedin class="h-4 w-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
               class="rounded-lg p-2 text-ink-soft ring-1 ring-slate-200 hover:bg-slate-50">
              <Github class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-ink-mute sm:flex-row sm:items-center">
        <p>© {{ year }} Nacode. All rights reserved.</p>
        <p>Crafted with care.</p>
      </div>
    </div>
  </footer>
</template>
