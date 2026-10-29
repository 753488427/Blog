<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import SectionWithProfile from '../components/SectionWithProfile.vue'
import { posts } from '../data/posts'

const workLogs = [
  { time: '今天', title: '重构个人技术博客', detail: '统一工作日志、文章、项目、实验室与关于我五个页面的设计语言。', tone: 'green' },
  { time: '进行中', title: '整理 Vue + Node.js 部署笔记', detail: '补全 Nginx 反向代理、MySQL 与域名 HTTPS 的完整链路。', tone: 'blue' },
  { time: '已完成', title: '接入 World 城市数据', detail: '完成城市查询与新增接口，并部署到服务器环境。', tone: 'violet' },
  { time: '已完成', title: '增加明暗主题切换', detail: '侧栏、内容卡片和个人资料区域已统一跟随主题。', tone: 'orange' },
]

const commits = [
  { name: '重做博客信息架构', scope: 'layout', status: 'DONE' },
  { name: '统一个人资料卡片主题', scope: 'theme', status: 'DONE' },
  { name: '完善项目与实验室内容', scope: 'content', status: 'BUILDING' },
  { name: '移动端响应式检查', scope: 'responsive', status: 'NEXT' },
]

const recentPosts = posts.slice(0, 3)

const motionActive = ref(false)
const motionReady = ref(false)
const noteCount = ref(posts.length)
const projectCount = ref(5)
const toolCount = ref(1)
const statusLabel = ref('ON')

let revealObserver
let countFrame
const motionTimers = []

function schedule(callback, delay) {
  const timer = window.setTimeout(callback, delay)
  motionTimers.push(timer)
}

function animateCounts() {
  const duration = 600
  const startedAt = performance.now()

  function update(now) {
    const progress = Math.min((now - startedAt) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    noteCount.value = Math.round(posts.length * eased)
    projectCount.value = Math.round(5 * eased)
    toolCount.value = Math.round(eased)

    if (progress < 1) {
      countFrame = requestAnimationFrame(update)
    }
  }

  countFrame = requestAnimationFrame(update)
}

onMounted(async () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    motionReady.value = true
    document.querySelectorAll('.home-motion [data-reveal]').forEach((element) => {
      element.classList.add('is-visible')
    })
    return
  }

  noteCount.value = 0
  projectCount.value = 0
  toolCount.value = 0
  statusLabel.value = 'OFF'
  motionActive.value = true
  await nextTick()

  requestAnimationFrame(() => {
    motionReady.value = true
  })

  schedule(animateCounts, 160)
  schedule(() => {
    statusLabel.value = 'ON'
  }, 560)

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
  )

  document.querySelectorAll('.home-motion [data-reveal]').forEach((element) => {
    revealObserver.observe(element)
  })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  motionTimers.forEach((timer) => window.clearTimeout(timer))
  if (countFrame) cancelAnimationFrame(countFrame)
})
</script>

<template>
  <main class="page-shell log-page">
    <SectionWithProfile>
      <div class="home-motion" :class="{ 'motion-active': motionActive, 'motion-ready': motionReady }">
      <header class="log-header intro-motion">
        <div>
          <p class="page-kicker motion-step" style="--motion-delay: 0ms">ENGINEERING JOURNAL</p>
          <h1 class="page-title motion-step" style="--motion-delay: 80ms">工程工作日志</h1>
          <p class="page-intro motion-step" style="--motion-delay: 160ms">记录正在解决的问题、最近提交的代码，以及下一阶段准备推进的工程事项。</p>
        </div>
        <div class="build-state motion-step" style="--motion-delay: 240ms"><i></i><span>BUILDING IN PUBLIC</span><strong>持续构建</strong></div>
      </header>

      <section class="focus-panel panel focus-motion">
        <div class="focus-copy">
          <span class="eyebrow">CURRENT FOCUS · 当前重点</span>
          <h2>
            <span class="title-line"><span>把复杂问题，</span></span>
            <span class="title-line"><em>写成清晰代码。</em></span>
          </h2>
          <p class="focus-description">正在把真实项目中的开发、部署与排障过程，整理成可复用的技术文章和在线工具。</p>
          <div class="focus-actions">
            <RouterLink class="primary-button" to="/posts">阅读技术文章 <span>→</span></RouterLink>
            <RouterLink class="secondary-button" to="/projects">查看项目作品</RouterLink>
          </div>
        </div>
        <div class="metric-grid" aria-label="博客数据">
          <div style="--metric-delay: 160ms"><i>▤</i><span>文章</span><strong>{{ noteCount }}</strong><small>NOTES</small></div>
          <div style="--metric-delay: 230ms"><i>◇</i><span>项目</span><strong>{{ projectCount }}</strong><small>PROJECTS</small></div>
          <div style="--metric-delay: 300ms"><i>⌁</i><span>工具</span><strong>{{ toolCount }}</strong><small>AVAILABLE</small></div>
          <div style="--metric-delay: 370ms"><i>⌁</i><span>状态</span><strong class="online-value">{{ statusLabel }}<b class="terminal-cursor"></b></strong><small>ONLINE</small></div>
        </div>
      </section>

      <section class="dashboard-grid">
        <article class="panel timeline-panel">
          <div class="panel-head"><div><span>WORK STREAM</span><h2>最近在做</h2></div><small>{{ workLogs.length }} ITEMS</small></div>
          <div class="timeline-list">
            <div v-for="(item, index) in workLogs" :key="item.title" class="timeline-item" :class="`tone-${item.tone}`" :style="{ '--item-delay': `${430 + index * 95}ms`, '--line-delay': `${470 + index * 95}ms` }">
              <div class="timeline-axis"><i></i><span>{{ String(index + 1).padStart(2, '0') }}</span></div>
              <div><time>{{ item.time }}</time><h3>{{ item.title }}</h3><p>{{ item.detail }}</p></div>
            </div>
          </div>
        </article>

        <article class="panel commit-panel">
          <div class="panel-head"><div><span>CHANGELOG</span><h2>开发进度</h2></div><small>MAIN</small></div>
          <div class="terminal-line"><i></i><i></i><i></i><span>sevennine@dev:~</span></div>
          <div class="commit-list">
            <div v-for="(commit, index) in commits" :key="commit.name" :style="{ '--commit-delay': `${680 + index * 80}ms` }">
              <span class="commit-icon">✓</span>
              <div><strong>{{ commit.name }}</strong><small>{{ commit.scope }}</small></div>
              <em :class="{ building: commit.status === 'BUILDING', next: commit.status === 'NEXT' }">{{ commit.status }}</em>
            </div>
          </div>
          <div class="progress-block"><span><b>本轮改版进度</b><strong>72%</strong></span><i><b></b></i></div>
        </article>
      </section>

      <section class="summary-grid" data-reveal>
        <article class="panel summary-card" style="--summary-delay: 0ms">
          <span class="summary-icon">⌁</span><div><small>LEARNING</small><h3>正在学习</h3></div>
          <ul><li>Vue 组件设计与状态管理</li><li>Node.js 服务部署与监控</li><li>Android 与鸿蒙应用开发</li></ul>
        </article>
        <article class="panel summary-card" style="--summary-delay: 70ms">
          <span class="summary-icon">↗</span><div><small>DEPLOYMENT</small><h3>部署记录</h3></div>
          <ul><li>腾讯云轻量服务器</li><li>Nginx 反向代理</li><li>MySQL 数据迁移</li></ul>
        </article>
        <article class="panel summary-card article-summary" style="--summary-delay: 140ms">
          <span class="summary-icon">✦</span><div><small>RECENT NOTES</small><h3>最近文章</h3></div>
          <RouterLink v-for="post in recentPosts" :key="post.slug" :to="`/posts/${post.slug}`">{{ post.title }} <span>↗</span></RouterLink>
        </article>
      </section>
      </div>
    </SectionWithProfile>
  </main>
</template>

<style scoped>
.log-page{padding-top:42px}.log-header{display:flex;align-items:flex-end;justify-content:space-between;gap:32px;margin-bottom:28px}.build-state{min-width:180px;padding:16px 18px;background:var(--surface);border:1px solid var(--line);border-radius:16px}.build-state i{display:inline-block;width:8px;height:8px;margin-right:8px;background:var(--success);border-radius:50%;box-shadow:0 0 12px var(--success)}.build-state span,.build-state strong{display:block}.build-state span{margin:10px 0 7px;color:var(--muted);font:700 9px/1 var(--mono);letter-spacing:.13em}.build-state strong{font-size:14px}.panel{background:color-mix(in srgb,var(--surface) 94%,transparent);border:1px solid var(--line);border-radius:20px;box-shadow:0 16px 40px color-mix(in srgb,#000 12%,transparent)}.focus-panel{position:relative;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);overflow:hidden;background:radial-gradient(circle at 82% 0%,color-mix(in srgb,var(--brand) 10%,transparent),transparent 32%),var(--surface)}.focus-panel::after{position:absolute;inset:0;pointer-events:none;content:'';background:linear-gradient(115deg,transparent 45%,color-mix(in srgb,var(--brand-2) 6%,transparent))}.focus-copy{position:relative;z-index:1;padding:clamp(30px,4vw,52px)}.eyebrow,.panel-head span,.summary-card small{color:var(--brand);font:800 9px/1 var(--mono);letter-spacing:.15em}.focus-copy h2{margin:24px 0 18px;font-size:clamp(38px,4vw,60px);line-height:1.02;letter-spacing:-.055em}.focus-copy h2 em{color:transparent;font-style:normal;background:linear-gradient(100deg,var(--brand),#72a6ff);background-clip:text}.focus-copy p{max-width:650px;margin:0;color:var(--muted);font-size:15px;line-height:1.85}.focus-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}.metric-grid{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;background:color-mix(in srgb,var(--surface-2) 88%,transparent);border-left:1px solid var(--line)}.metric-grid div{min-height:154px;display:flex;flex-direction:column;justify-content:center;padding:23px;border-bottom:1px solid var(--line)}.metric-grid div:nth-child(odd){border-right:1px solid var(--line)}.metric-grid div:nth-child(n+3){border-bottom:0}.metric-grid div>i{margin-bottom:14px;color:var(--brand-2);font:800 18px/1 var(--mono);font-style:normal}.metric-grid div:nth-child(3)>i,.metric-grid div:nth-child(4)>i{color:var(--brand)}.metric-grid span,.metric-grid small{color:var(--muted);font-size:11px}.metric-grid strong{margin:10px 0 8px;font:800 34px/1 var(--mono)}.metric-grid small{font:700 8px/1 var(--mono);letter-spacing:.12em}.online-value{color:var(--success)}.dashboard-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;margin-top:18px}.timeline-panel,.commit-panel{padding:26px}.panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding-bottom:22px;border-bottom:1px solid var(--line)}.panel-head h2{margin:10px 0 0;font-size:23px}.panel-head>small{color:var(--muted);font:700 9px/1 var(--mono)}.timeline-list{padding-top:6px}.timeline-item{--tone:var(--brand);display:grid;grid-template-columns:52px 1fr;gap:16px;padding:20px 0;border-bottom:1px solid var(--line)}.timeline-item:last-child{border-bottom:0}.timeline-axis{position:relative;display:flex;align-items:flex-start;gap:9px}.timeline-axis::after{position:absolute;top:17px;bottom:-35px;left:5px;width:1px;content:'';background:var(--line)}.timeline-item:last-child .timeline-axis::after{display:none}.timeline-axis i{width:11px;height:11px;flex:0 0 auto;margin-top:2px;background:var(--tone);border:3px solid var(--surface);border-radius:50%;box-shadow:0 0 0 1px var(--tone)}.timeline-axis span{color:var(--muted);font:700 9px/1.5 var(--mono)}.timeline-item time{color:var(--tone);font:700 9px/1 var(--mono)}.timeline-item h3{margin:8px 0 6px;font-size:15px}.timeline-item p{margin:0;color:var(--muted);font-size:12px;line-height:1.7}.tone-blue{--tone:#5790ff}.tone-violet{--tone:#9a78ff}.tone-orange{--tone:#f39855}.terminal-line{height:43px;display:flex;align-items:center;gap:6px;margin-top:18px;padding:0 14px;background:var(--bg);border:1px solid var(--line);border-radius:10px 10px 0 0}.terminal-line i{width:7px;height:7px;background:var(--danger);border-radius:50%}.terminal-line i:nth-child(2){background:var(--warning)}.terminal-line i:nth-child(3){background:var(--success)}.terminal-line span{margin-left:auto;color:var(--muted);font:700 8px/1 var(--mono)}.commit-list{padding:9px 14px;background:var(--bg);border:1px solid var(--line);border-top:0;border-radius:0 0 10px 10px}.commit-list>div{display:grid;grid-template-columns:24px 1fr auto;align-items:center;gap:10px;padding:13px 0;border-bottom:1px solid var(--line)}.commit-list>div:last-child{border:0}.commit-icon{color:var(--success);font-weight:800}.commit-list strong,.commit-list small{display:block}.commit-list strong{font-size:12px}.commit-list small{margin-top:5px;color:var(--muted);font:600 9px/1 var(--mono)}.commit-list em{padding:5px 7px;color:var(--success);font:700 8px/1 var(--mono);font-style:normal;background:color-mix(in srgb,var(--success) 10%,transparent);border-radius:5px}.commit-list em.building{color:var(--brand-2)}.commit-list em.next{color:var(--muted)}.progress-block{margin-top:24px}.progress-block>span{display:flex;justify-content:space-between;font-size:11px}.progress-block>span strong{font-family:var(--mono)}.progress-block>i{display:block;height:7px;margin-top:10px;overflow:hidden;background:var(--surface-2);border-radius:99px}.progress-block>i b{display:block;width:72%;height:100%;background:linear-gradient(90deg,var(--brand),var(--brand-2));border-radius:inherit}.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:18px}.summary-card{min-height:235px;padding:24px}.summary-icon{display:grid;width:42px;height:42px;place-items:center;margin-bottom:24px;color:var(--brand);background:color-mix(in srgb,var(--brand) 9%,var(--surface));border:1px solid color-mix(in srgb,var(--brand) 30%,var(--line));border-radius:12px}.summary-card h3{margin:8px 0 0;font-size:18px}.summary-card ul{display:grid;gap:12px;margin:20px 0 0;padding:18px 0 0;border-top:1px solid var(--line);list-style:none}.summary-card li{color:var(--muted);font-size:12px}.summary-card li::before{margin-right:9px;color:var(--brand);content:'—'}.article-summary>a{display:flex;justify-content:space-between;gap:12px;padding:11px 0;color:var(--muted);font-size:11px;line-height:1.45;border-top:1px solid var(--line)}.article-summary>a:first-of-type{margin-top:18px}.article-summary>a:hover{color:var(--text)}.article-summary>a span{color:var(--brand)}

/* Motion is intentionally scoped to the central home content. */
.home-motion{--motion-ease:cubic-bezier(.22,1,.36,1)}
.title-line{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}.title-line>span,.title-line>em{display:block}
.terminal-cursor{display:inline-block;width:2px;height:.82em;margin-left:4px;background:currentColor;vertical-align:-.04em;animation:cursor-blink 850ms steps(1,end) 3}
.motion-active:not(.motion-ready) .motion-step{opacity:0;transform:translateY(12px)}
.motion-active.motion-ready .motion-step{opacity:1;transform:none;transition:opacity 420ms var(--motion-ease) var(--motion-delay),transform 420ms var(--motion-ease) var(--motion-delay)}
.motion-active:not(.motion-ready) .focus-motion{opacity:0;clip-path:inset(0 5% 0 0 round 20px);transform:translateY(12px)}
.motion-active.motion-ready .focus-motion{opacity:1;clip-path:inset(0 0 0 0 round 20px);transform:none;transition:opacity 520ms var(--motion-ease) 240ms,clip-path 620ms var(--motion-ease) 240ms,transform 520ms var(--motion-ease) 240ms}
.motion-active:not(.motion-ready) .eyebrow,.motion-active:not(.motion-ready) .title-line>span,.motion-active:not(.motion-ready) .title-line>em,.motion-active:not(.motion-ready) .focus-description,.motion-active:not(.motion-ready) .focus-actions{opacity:0;transform:translateY(100%)}
.motion-active.motion-ready .eyebrow{opacity:1;transform:none;transition:opacity 360ms var(--motion-ease) 320ms,transform 420ms var(--motion-ease) 320ms}
.motion-active.motion-ready .title-line:first-child>span{opacity:1;transform:none;transition:opacity 440ms var(--motion-ease) 380ms,transform 520ms var(--motion-ease) 380ms}
.motion-active.motion-ready .title-line:nth-child(2)>em{opacity:1;transform:none;transition:opacity 440ms var(--motion-ease) 460ms,transform 520ms var(--motion-ease) 460ms}
.motion-active.motion-ready .focus-description{opacity:1;transform:none;transition:opacity 420ms var(--motion-ease) 540ms,transform 420ms var(--motion-ease) 540ms}
.motion-active.motion-ready .focus-actions{opacity:1;transform:none;transition:opacity 420ms var(--motion-ease) 620ms,transform 420ms var(--motion-ease) 620ms}
.motion-active.motion-ready .focus-copy h2::after{position:absolute;top:0;bottom:0;left:-30%;width:18%;pointer-events:none;content:'';background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--brand-2) 45%,transparent),transparent);filter:blur(6px);transform:skewX(-12deg);animation:title-sweep 720ms var(--motion-ease) 520ms both}
.focus-copy h2{position:relative;overflow:hidden}
.motion-active:not(.motion-ready) .metric-grid>div{opacity:0;transform:translateY(12px)}
.motion-active.motion-ready .metric-grid>div{opacity:1;transform:none;transition:opacity 360ms var(--motion-ease) var(--metric-delay),transform 420ms var(--motion-ease) var(--metric-delay)}
.motion-active:not(.motion-ready) .timeline-panel,.motion-active:not(.motion-ready) .commit-panel{opacity:0;transform:translateY(16px)}
.motion-active.motion-ready .timeline-panel{opacity:1;transform:none;transition:opacity 500ms var(--motion-ease) 320ms,transform 560ms var(--motion-ease) 320ms}
.motion-active.motion-ready .commit-panel{opacity:1;transform:none;transition:opacity 500ms var(--motion-ease) 600ms,transform 560ms var(--motion-ease) 600ms}
.motion-active:not(.motion-ready) .timeline-item>div:last-child,.motion-active:not(.motion-ready) .timeline-axis i{opacity:0;transform:translateY(8px)}
.motion-active:not(.motion-ready) .timeline-axis::after{transform:scaleY(0);transform-origin:top}
.motion-active.motion-ready .timeline-item>div:last-child,.motion-active.motion-ready .timeline-axis i{opacity:1;transform:none;transition:opacity 360ms var(--motion-ease) var(--item-delay),transform 420ms var(--motion-ease) var(--item-delay)}
.motion-active.motion-ready .timeline-axis::after{transform:scaleY(1);transform-origin:top;transition:transform 380ms var(--motion-ease) var(--line-delay)}
.motion-active:not(.motion-ready) .commit-list>div{opacity:0;transform:translateX(-10px)}
.motion-active.motion-ready .commit-list>div{opacity:1;transform:none;transition:opacity 340ms var(--motion-ease) var(--commit-delay),transform 400ms var(--motion-ease) var(--commit-delay)}
.motion-active:not(.motion-ready) .progress-block>i b{transform:scaleX(0);transform-origin:left}
.motion-active.motion-ready .progress-block>i b{transform:scaleX(1);transform-origin:left;transition:transform 700ms var(--motion-ease) 880ms}
.motion-active [data-reveal] .summary-card{opacity:0;transform:translateY(16px)}
.motion-active [data-reveal].is-visible .summary-card{opacity:1;transform:none;transition:opacity 480ms var(--motion-ease) var(--summary-delay),transform 540ms var(--motion-ease) var(--summary-delay)}
@keyframes title-sweep{from{left:-30%}to{left:112%}}
@keyframes cursor-blink{50%{opacity:0}}
@media(max-width:900px){.log-header{align-items:flex-start;flex-direction:column}.build-state{width:100%}.focus-panel,.dashboard-grid{grid-template-columns:1fr}.metric-grid{border-top:1px solid var(--line);border-left:0}.summary-grid{grid-template-columns:1fr 1fr}.summary-card:last-child{grid-column:1/-1}}
@media(max-width:580px){.focus-copy{padding:28px 24px}.focus-copy h2{font-size:clamp(34px,11vw,44px)}.metric-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.summary-grid{grid-template-columns:1fr}.metric-grid div{min-height:112px;padding:18px;border-right:0!important;border-bottom:1px solid var(--line)!important}.metric-grid div:nth-child(odd){border-right:1px solid var(--line)!important}.metric-grid div:nth-child(n+3){border-bottom:0!important}.metric-grid strong{font-size:28px}.summary-card:last-child{grid-column:auto}.focus-actions{align-items:stretch;flex-direction:column}}
</style>
