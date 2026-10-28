<script setup>
import { posts } from '../data/posts'

const tagCount = new Set(posts.flatMap((post) => post.tags)).size

const skills = [
  { label: 'Vue', tone: 'green', path: 'M12 2 7.5 2 12 10 16.5 2H12Zm-6.3 0H2l10 17.3L22 2h-3.7L12 13 5.7 2Z' },
  { label: 'Code', tone: 'blue', path: 'm8.7 7.3-4.6 4.6 4.6 4.6M15.3 7.3l4.6 4.6-4.6 4.6M13.6 4 10.4 20' },
  { label: 'MySQL', tone: 'ink', path: 'M5 6.5C5 4.6 8.1 3 12 3s7 1.6 7 3.5S15.9 10 12 10 5 8.4 5 6.5Zm0 0v5C5 13.4 8.1 15 12 15s7-1.6 7-3.5v-5M5 11.5v5C5 18.4 8.1 20 12 20s7-1.6 7-3.5v-5' },
  { label: 'Cloud', tone: 'sky', path: 'M7.5 18H18a4 4 0 0 0 .5-8 6.5 6.5 0 0 0-12.3-1.7A4.9 4.9 0 0 0 7.5 18Z' },
  { label: 'DevOps', tone: 'gray', path: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-12v2m0 13v2m8.5-8.5h-2m-13 0h-2m14.5-6-1.4 1.4M7.4 16.6 6 18m12 0-1.4-1.4M7.4 7.4 6 6' },
  { label: '鸿蒙', tone: 'violet', path: 'M5 6v12M19 6v12M5 12h14M9 8.5h6M9 15.5h6' },
  { label: 'uni-app', tone: 'cyan', path: 'M7 4v9a5 5 0 0 0 10 0V4M9.5 4v9a2.5 2.5 0 0 0 5 0V4' },
  { label: 'Node.js', tone: 'node', path: 'm12 2 8.5 5v10L12 22l-8.5-5V7L12 2Zm-3 13V9l6 6V9' },
  { label: 'Java', tone: 'orange', path: 'M8 18h8m-9 2h10M9 14h6c1.7 0 3-1.3 3-3H6c0 1.7 1.3 3 3 3Zm2-5c-2-2 2-2 0-4m4 4c-2-2 2-2 0-4' },
  { label: 'Nginx', tone: 'nginx', path: 'm12 2 8 4.6v10.8L12 22l-8-4.6V6.6L12 2Zm-3 15V7l6 10V7' },
]

const contacts = [
  { label: 'GitHub', href: 'https://github.com/753488427', external: true, icon: 'github' },
  { label: 'Email', href: 'mailto:hello@sevennine.top', external: true, icon: 'mail' },
  { label: '项目', to: '/projects', icon: 'project' },
  { label: '主页', to: '/', icon: 'home' },
]
</script>

<template>
  <aside class="profile-sidebar" aria-label="开发者资料">
    <section class="profile-card light-card">
      <div class="identity-row">
        <div class="digital-avatar" aria-hidden="true"><span>97</span></div>
        <div class="identity-copy">
          <h2>SevenNine</h2>
          <p><i></i>IT 程序员</p>
        </div>
      </div>

      <p class="profile-bio">
        专注 Vue、Node.js、Android 与服务部署，把真实工程问题整理成可复用的代码和笔记。
      </p>

      <div class="profile-stats">
        <div><strong>{{ posts.length }}</strong><span>文章</span></div>
        <div><strong>5</strong><span>项目</span></div>
        <div><strong>{{ tagCount }}</strong><span>标签</span></div>
      </div>
    </section>

    <section class="light-card utility-card">
      <div class="card-heading">
        <span class="heading-icon code-mark">&lt;/&gt;</span>
        <p>技术栈</p>
      </div>
      <div class="icon-grid skill-grid">
        <div v-for="skill in skills" :key="skill.label" class="icon-item">
          <span class="icon-tile" :class="skill.tone">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="skill.path" />
            </svg>
          </span>
          <small>{{ skill.label }}</small>
        </div>
      </div>
    </section>

    <section class="light-card utility-card">
      <div class="card-heading">
        <span class="heading-icon">↗</span>
        <p>找到我</p>
      </div>
      <div class="icon-grid contact-grid">
        <div v-for="item in contacts" :key="item.label" class="icon-item">
          <a
            v-if="item.href"
            class="icon-tile contact-tile"
            :href="item.href"
            :target="item.external && !item.href.startsWith('mailto:') ? '_blank' : undefined"
            :rel="item.external ? 'noreferrer' : undefined"
            :aria-label="item.label"
          >
            <svg v-if="item.icon === 'github'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7-.7 2.1-1.2-2.3-.3-4.7-1.2-4.7-5A3.9 3.9 0 0 1 7 7.9c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1a9.7 9.7 0 0 1 5.1 0c2-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.8-4.7 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" /></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3V5Zm1 1 8 7 8-7M4 18l6-6m10 6-6-6" /></svg>
          </a>
          <RouterLink v-else class="icon-tile contact-tile" :to="item.to" :aria-label="item.label">
            <svg v-if="item.icon === 'project'" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6l2 2h8v12H4V5Zm4 7h8m-8 3h5" /></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8M5 10v10h14V10m-9 10v-6h4v6" /></svg>
          </RouterLink>
          <small>{{ item.label }}</small>
        </div>
      </div>
    </section>
  </aside>
</template>

<style scoped>
.profile-sidebar {
  position: sticky;
  top: 24px;
  display: grid;
  align-self: start;
  gap: 14px;
}

.light-card {
  color: var(--profile-text);
  background: var(--profile-bg);
  border: 1px solid var(--profile-line);
  border-radius: 18px;
  box-shadow: 0 14px 40px var(--profile-shadow);
  transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.profile-card {
  padding: 22px 20px 0;
  overflow: hidden;
}

.identity-row {
  display: flex;
  align-items: center;
  gap: 18px;
}

.digital-avatar {
  display: grid;
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  place-items: center;
  overflow: hidden;
  color: #8affd6;
  background:
    radial-gradient(circle at 38% 32%, rgba(77, 255, 196, 0.24), transparent 28%),
    linear-gradient(145deg, #061510, #020706 72%);
  border: 1px solid #10261f;
  border-radius: 50%;
  box-shadow: inset 0 0 28px rgba(76, 255, 192, 0.16), 0 10px 26px rgba(15, 23, 42, 0.15);
}

.digital-avatar span {
  font: 700 29px/1 var(--mono);
  letter-spacing: -0.12em;
  text-shadow: 0 0 16px rgba(92, 255, 205, 0.62);
  transform: skewX(-5deg);
}

.identity-copy h2 {
  margin: 0;
  font-size: 22px;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.identity-copy p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 11px 0 0;
  color: var(--profile-muted);
  font-size: 13px;
}

.identity-copy i {
  width: 8px;
  height: 8px;
  background: #12a966;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(18, 169, 102, 0.1);
}

.profile-bio {
  margin: 20px 0 0;
  padding: 18px 0 20px;
  color: var(--profile-muted);
  font-size: 12px;
  line-height: 1.85;
  border-top: 1px solid var(--profile-line);
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 -20px;
  border-top: 1px solid var(--profile-line);
}

.profile-stats div {
  padding: 17px 8px 18px;
  text-align: center;
}

.profile-stats div + div {
  border-left: 1px solid var(--profile-line);
}

.profile-stats strong,
.profile-stats span {
  display: block;
}

.profile-stats strong {
  font: 800 19px/1 var(--mono);
  letter-spacing: -0.05em;
}

.profile-stats span {
  margin-top: 8px;
  color: var(--profile-subtle);
  font-size: 10px;
  font-weight: 700;
}

.utility-card {
  padding: 20px;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 17px;
  border-bottom: 1px solid var(--profile-line);
}

.card-heading p {
  margin: 0;
  color: var(--profile-text);
  font-size: 14px;
  font-weight: 800;
}

.heading-icon {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  color: #0c956c;
  font: 800 16px/1 var(--mono);
}

.code-mark {
  font-size: 13px;
}

.icon-grid {
  display: grid;
  row-gap: 15px;
  column-gap: 6px;
  margin-top: 18px;
}

.skill-grid {
  grid-template-columns: repeat(5, 1fr);
}

.contact-grid {
  grid-template-columns: repeat(4, 1fr);
}

.icon-item {
  min-width: 0;
  display: grid;
  justify-items: center;
  gap: 9px;
}

.icon-tile {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  color: var(--profile-text);
  background: var(--profile-bg-soft);
  border: 1px solid var(--profile-line);
  border-radius: 12px;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.icon-tile svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-tile.green {
  color: #0c956c;
  background: color-mix(in srgb, #0c956c 12%, var(--profile-bg-soft));
}

.icon-tile.green svg:first-child path:first-child,
.contact-tile svg:first-child path:first-child {
  fill: currentColor;
  stroke: none;
}

.icon-tile.blue { color: #2678f3; }
.icon-tile.ink { color: #111827; }
.icon-tile.sky { color: #238be6; }
.icon-tile.gray { color: var(--profile-muted); }
.icon-tile.violet { color: #8d6bff; background: color-mix(in srgb, #8d6bff 12%, var(--profile-bg-soft)); }
.icon-tile.cyan { color: #19b7b7; background: color-mix(in srgb, #19b7b7 12%, var(--profile-bg-soft)); }
.icon-tile.node { color: #5cae55; background: color-mix(in srgb, #5cae55 12%, var(--profile-bg-soft)); }
.icon-tile.orange { color: #f18743; background: color-mix(in srgb, #f18743 12%, var(--profile-bg-soft)); }
.icon-tile.nginx { color: #22b978; background: color-mix(in srgb, #22b978 12%, var(--profile-bg-soft)); }

.contact-tile:hover,
.contact-tile.router-link-active {
  color: #0c956c;
  border-color: #b9e9d9;
  box-shadow: 0 8px 20px rgba(12, 149, 108, 0.12);
  transform: translateY(-2px);
}

.icon-item small {
  max-width: 100%;
  overflow: hidden;
  color: var(--profile-muted);
  font: 750 9px/1.15 "PingFang SC", "Microsoft YaHei", sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1180px) {
  .profile-sidebar {
    position: static;
    grid-template-columns: 1.35fr 1fr 1fr;
  }

  .profile-card {
    grid-row: span 1;
  }
}

@media (max-width: 820px) {
  .profile-sidebar {
    grid-template-columns: 1fr 1fr;
  }

  .profile-card {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .profile-sidebar {
    grid-template-columns: 1fr;
  }

  .profile-card {
    grid-column: auto;
  }
}
</style>
