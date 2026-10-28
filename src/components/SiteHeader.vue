<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
const theme = ref('dark')

const navigation = [
  { label: '工程日志', icon: '▤', to: '/' },
  { label: '文章', icon: '▧', to: '/posts' },
  { label: '项目', icon: '◇', to: '/projects' },
  { label: '实验室', icon: '△', to: '/lab' },
  { label: '关于我', icon: '○', to: '/about' },
]

function applyTheme(value) {
  document.documentElement.dataset.theme = value
  localStorage.setItem('sevennine-theme', value)
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
}

onMounted(() => {
  theme.value = localStorage.getItem('sevennine-theme') || 'dark'
  applyTheme(theme.value)
})

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/" aria-label="SevenNine Lab 首页">
        <span class="brand-mark">97</span>
        <span class="brand-copy">
          <strong>SevenNine</strong>
          <small>ENGINEERING LOG</small>
        </span>
      </RouterLink>

      <nav class="desktop-nav" aria-label="主导航">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to" :title="item.label">
          <span class="nav-icon">{{ item.icon }}</span>
          <small>{{ item.label }}</small>
        </RouterLink>
      </nav>

      <div class="header-actions">
        <a class="status-dot" href="https://sevennine.top" target="_blank" rel="noreferrer" title="网站在线">
          <span></span><small>ONLINE</small>
        </a>
        <button class="icon-button" type="button" :aria-label="theme === 'dark' ? '切换亮色模式' : '切换暗色模式'" @click="toggleTheme">
          {{ theme === 'dark' ? '☼' : '☾' }}
        </button>
        <button class="menu-button" type="button" aria-label="打开菜单" @click="menuOpen = !menuOpen">
          <span></span><span></span>
        </button>
      </div>
    </div>

    <nav v-if="menuOpen" class="mobile-nav" aria-label="移动端导航">
      <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">
        <span>{{ item.icon }}</span>{{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 50;
  width: 176px;
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  border-right: 1px solid var(--line);
  backdrop-filter: blur(18px);
}

.header-inner {
  min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: stretch;
  padding: 26px 14px 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 10px;
  color: var(--text);
}

.brand-mark {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  color: #07111f;
  font: 900 15px/1 var(--mono);
  letter-spacing: -0.08em;
  background: var(--brand);
  border-radius: 0;
  color: var(--brand);
  font-size: 30px;
  font-weight: 400;
  background: transparent;
  border-bottom: 2px solid var(--brand);
  box-shadow: 0 0 28px color-mix(in srgb, var(--brand) 26%, transparent);
}

.brand-copy {
  display: none;
}

.desktop-nav {
  display: grid;
  gap: 8px;
  margin: 46px 0 0;
}

.desktop-nav a {
  position: relative;
  width: 100%;
  min-height: 54px;
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  color: var(--muted);
  border: 1px solid transparent;
  border-radius: 14px;
  transition: color 160ms ease, background 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.desktop-nav a::before {
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: -14px;
  width: 3px;
  content: '';
  background: var(--brand);
  border-radius: 99px;
  opacity: 0;
}

.desktop-nav a:hover,
.desktop-nav a.router-link-active {
  color: var(--text);
  background: var(--surface-2);
  border-color: var(--line);
  transform: translateX(2px);
}

.desktop-nav a.router-link-active::before {
  opacity: 1;
}

.nav-icon {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  font: 700 19px/1 var(--mono);
}

.desktop-nav small {
  font: 700 14px/1.2 "PingFang SC", "Microsoft YaHei", sans-serif;
  letter-spacing: 0.01em;
}

.header-actions {
  display: grid;
  justify-items: center;
  gap: 10px;
  margin-top: auto;
}

.status-dot {
  display: grid;
  justify-items: center;
  gap: 5px;
  color: var(--muted);
  font: 700 6px/1 var(--mono);
  letter-spacing: 0.08em;
}

.status-dot span {
  width: 7px;
  height: 7px;
  background: var(--success);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--success);
}

.icon-button,
.menu-button {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 12px;
}

.menu-button {
  display: none;
  align-content: center;
  gap: 5px;
}

.menu-button span {
  width: 15px;
  height: 1px;
  background: currentColor;
}

.mobile-nav {
  display: none;
}

@media (max-width: 900px) {
  .site-header {
    position: sticky;
    inset: 0 auto auto;
    width: auto;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .header-inner {
    width: min(100% - 28px, 1180px);
    min-height: 64px;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0;
  }

  .brand-mark {
    width: 38px;
    height: 38px;
    border-radius: 11px;
    color: #07111f;
    font-size: 15px;
    font-weight: 900;
    background: var(--brand);
    border-bottom: 0;
  }

  .brand-copy {
    display: grid;
    line-height: 1;
  }

  .brand-copy strong {
    font-size: 14px;
  }

  .brand-copy small {
    margin-top: 5px;
    color: var(--muted);
    font: 700 7px/1 var(--mono);
    letter-spacing: 0.14em;
  }

  .desktop-nav,
  .status-dot {
    display: none;
  }

  .header-actions {
    display: flex;
  }

  .icon-button,
  .menu-button {
    width: 38px;
    height: 38px;
  }

  .menu-button {
    display: grid;
  }

  .mobile-nav {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
    padding: 10px 14px 14px;
    border-top: 1px solid var(--line);
  }

  .mobile-nav a {
    display: grid;
    justify-items: center;
    gap: 6px;
    padding: 10px 5px;
    color: var(--muted);
    font-size: 11px;
    background: var(--surface-2);
    border: 1px solid var(--line);
    border-radius: 10px;
  }

  .mobile-nav a.router-link-active {
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 35%, var(--line));
  }
}
</style>
