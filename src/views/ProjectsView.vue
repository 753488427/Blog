<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionWithProfile from '../components/SectionWithProfile.vue'

const activeFilter = ref('全部')
const filters = ['全部', '商业项目', '个人项目', '实验项目']

const projects = [
  {
    title: '九因 AI 智能写作平台',
    kind: '商业项目',
    desc: '面向内容创作与媒体运营的 AI 写作平台，支持文章生成、改写、续写与扩写等内容生产能力。',
    stack: ['Vue', 'Arco Design', 'AI Writing', 'Node.js'],
    facts: [
      { value: '生成', label: '文章内容创作' },
      { value: '编辑', label: '改写续写扩写' },
      { value: 'ONLINE', label: '线上项目' },
    ],
    status: 'ONLINE',
    link: 'https://ai-test.theninefactor.com/',
    external: true,
    tone: 'green',
    preview: 'ai',
    featured: true,
  },
  {
    title: '校园二手交易平台',
    kind: '个人项目',
    desc: '覆盖商品、订单、社区、聊天、收藏和个人中心的完整校园交易应用。',
    stack: ['uni-app', 'Node.js', 'MySQL'],
    facts: [
      { value: '商品', label: '发布与搜索' },
      { value: '订单', label: '交易流程' },
      { value: '社区', label: '聊天与互动' },
    ],
    status: 'OPEN SOURCE',
    link: 'https://github.com/753488427/yiban',
    external: true,
    tone: 'orange',
    preview: 'mobile',
  },
  {
    title: 'World 城市数据平台',
    kind: '实验项目',
    desc: '支持 4,000+ 城市查询、筛选与新增，完整连接 Vue、Express、MySQL 和 Nginx。',
    stack: ['Vue 3', 'Express', 'MySQL', 'Nginx'],
    facts: [
      { value: '4,000+', label: '城市数据' },
      { value: '查询', label: '检索与筛选' },
      { value: '新增', label: '写入数据库' },
    ],
    status: 'AVAILABLE',
    link: '/lab/cities',
    external: false,
    tone: 'blue',
    preview: 'world',
  },
  {
    title: 'Android Location Lab',
    kind: '实验项目',
    desc: '理解 Android Location Provider、权限、模拟位置与测试验证链路的实验项目。',
    stack: ['Android', 'Kotlin', 'Location'],
    facts: [
      { value: '权限', label: '定位授权流程' },
      { value: 'Provider', label: '坐标来源' },
      { value: '真机', label: '设备验证' },
    ],
    status: 'IN PROGRESS',
    link: '/posts/android-location-testing-notes',
    external: false,
    tone: 'violet',
    preview: 'gps',
  },
  {
    title: 'SevenNine Engineering Log',
    kind: '个人项目',
    desc: '用于沉淀文章、项目、实验工具与工程实践的个人技术博客。',
    stack: ['Vue Router', 'Vite', 'Nginx'],
    facts: [
      { value: '文章', label: '工程记录' },
      { value: '项目', label: '作品归档' },
      { value: '主题', label: '明暗模式' },
    ],
    status: 'BUILDING',
    link: '/',
    external: false,
    tone: 'cyan',
    preview: 'blog',
  },
]

const visibleProjects = computed(() => (
  activeFilter.value === '全部'
    ? projects
    : projects.filter((project) => project.kind === activeFilter.value)
))
const featured = computed(() => visibleProjects.value.find((project) => project.featured))
const cards = computed(() => visibleProjects.value.filter((project) => project !== featured.value))
</script>

<template>
  <main class="page-shell projects-page">
    <SectionWithProfile>
      <header class="page-heading">
        <div>
          <p class="page-kicker">SELECTED WORK</p>
          <h1 class="page-title">项目作品</h1>
          <p class="page-intro">从线上商业产品到个人全栈实践，每个项目都保留问题、技术选择与可验证结果。</p>
        </div>
        <div class="project-count"><strong>{{ projects.length }}</strong><span>PROJECTS</span><small>持续更新</small></div>
      </header>

      <nav class="filter-bar" aria-label="项目分类">
        <button
          v-for="item in filters"
          :key="item"
          type="button"
          :class="{ active: activeFilter === item }"
          @click="activeFilter = item"
        >
          {{ item }}
          <span>{{ item === '全部' ? projects.length : projects.filter((project) => project.kind === item).length }}</span>
        </button>
      </nav>

      <section v-if="featured" class="featured-project">
        <div class="featured-copy">
          <div class="project-meta"><i></i><span>FEATURED PROJECT</span><em>{{ featured.kind }}</em></div>
          <h2>{{ featured.title }}</h2>
          <p>{{ featured.desc }}</p>
          <div class="tag-list"><span v-for="item in featured.stack" :key="item">{{ item }}</span></div>
          <div class="feature-facts">
            <div v-for="(fact, index) in featured.facts" :key="fact.value">
              <span>{{ ['▤', '⌁', '↗'][index] }}</span><p><strong>{{ fact.value }}</strong><small>{{ fact.label }}</small></p>
            </div>
          </div>
          <div class="project-actions">
            <a :href="featured.link" target="_blank" rel="noreferrer">查看线上项目 <span>→</span></a>
            <span class="status-pill"><i></i>{{ featured.status }}</span>
          </div>
        </div>

        <div class="featured-preview" aria-label="AI 写作平台界面预览">
          <div class="ai-product">
            <header><strong><i>✦</i> 九因 AI</strong><nav><span>通用写作</span><span>学术论文</span><span>营销文案</span></nav><b>9</b></header>
            <div class="ai-body">
              <aside><span class="active">✎ 写作</span><span>▤ 模板</span><span>▦ 创作记录</span><span>◈ 素材库</span><span>♙ 团队空间</span><span>⚙ 设置</span></aside>
              <section class="ai-editor">
                <small>AI WRITING WORKSPACE</small><h3>让创作更简单</h3><p>使用智能写作能力，将想法整理成结构清晰的内容。</p>
                <div class="ai-chips"><span>文章生成</span><span>改写润色</span><span>续写扩写</span></div>
                <div class="ai-input"><span>告诉我你想写什么...</span><b>➤</b></div>
              </section>
              <section class="ai-helper"><strong>写作助手</strong><div><i>✎</i><p>标题生成<small>生成多个标题方向</small></p></div><div><i>▤</i><p>内容大纲<small>快速生成文章结构</small></p></div><div><i>◇</i><p>改写润色<small>优化表达与语气</small></p></div></section>
            </div>
          </div>
        </div>
      </section>

      <section v-if="cards.length" class="project-grid">
        <article v-for="project in cards" :key="project.title" class="project-card" :class="`tone-${project.tone}`">
          <div class="card-copy">
            <div class="card-meta"><span>{{ project.kind }}</span><em><i></i>{{ project.status }}</em></div>
            <h2>{{ project.title }}</h2>
            <p>{{ project.desc }}</p>
            <div class="tag-list"><span v-for="item in project.stack" :key="item">{{ item }}</span></div>
            <div class="card-facts">
              <div v-for="fact in project.facts" :key="fact.value"><strong>{{ fact.value }}</strong><small>{{ fact.label }}</small></div>
            </div>
            <component
              :is="project.external ? 'a' : RouterLink"
              class="card-link"
              :href="project.external ? project.link : undefined"
              :to="project.external ? undefined : project.link"
              :target="project.external ? '_blank' : undefined"
              rel="noreferrer"
            >查看项目 <span>→</span></component>
          </div>

          <div class="card-preview" :class="`preview-${project.preview}`" aria-hidden="true">
            <template v-if="project.preview === 'mobile'">
              <div class="phone phone-back"><i></i><header>校园二手</header><span></span><span></span><span></span></div>
              <div class="phone phone-front"><i></i><header>校园二手</header><div class="app-icons"><b>闲</b><b>圈</b><b>求</b><b>生</b></div><strong>热门商品</strong><div class="goods"><span></span><span></span></div><footer>⌂　＋　◎</footer></div>
            </template>
            <template v-else-if="project.preview === 'world'">
              <div class="world-panel"><header><b>✦ World 数据平台</b><span>4,000+</span></header><div class="world-body"><aside><i></i><i></i><i></i><i></i></aside><section><div class="globe">⌖</div><p><span></span><span></span><span></span><span></span></p></section></div></div>
            </template>
            <template v-else-if="project.preview === 'gps'">
              <div class="gps-panel"><span>GPS</span><i></i><i></i><i></i><b>39.9042, 116.4074</b></div>
            </template>
            <template v-else>
              <div class="blog-panel"><b>97</b><span></span><span></span><span></span><div></div><div></div></div>
            </template>
          </div>
        </article>
      </section>
    </SectionWithProfile>
  </main>
</template>

<style scoped>
.projects-page{padding-top:42px}.page-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:30px}.project-count{min-width:150px;padding:18px;text-align:center;background:var(--surface);border:1px solid var(--line);border-radius:16px}.project-count strong,.project-count span,.project-count small{display:block}.project-count strong{font:800 30px/1 var(--mono)}.project-count span{margin-top:8px;color:var(--brand);font:800 8px/1 var(--mono);letter-spacing:.14em}.project-count small{margin-top:10px;color:var(--muted);font-size:11px}.filter-bar{display:flex;flex-wrap:wrap;gap:4px;margin:22px 0 18px;padding:6px;background:var(--surface);border:1px solid var(--line);border-radius:13px}.filter-bar button{display:flex;align-items:center;gap:7px;padding:10px 14px;color:var(--muted);font-size:12px;font-weight:750;background:transparent;border:0;border-radius:9px}.filter-bar button span{font:700 9px/1 var(--mono);opacity:.7}.filter-bar button.active{color:#07111f;background:var(--brand);box-shadow:0 8px 22px color-mix(in srgb,var(--brand) 22%,transparent)}

.featured-project{position:relative;min-height:440px;display:grid;grid-template-columns:minmax(330px,.82fr) minmax(460px,1.18fr);overflow:hidden;background:radial-gradient(circle at 68% 8%,color-mix(in srgb,var(--brand) 25%,transparent),transparent 30%),radial-gradient(circle at 80% 100%,color-mix(in srgb,var(--brand-2) 18%,transparent),transparent 32%),var(--surface);border:1px solid color-mix(in srgb,var(--brand) 30%,var(--line));border-radius:20px;box-shadow:0 20px 55px color-mix(in srgb,#000 22%,transparent)}.featured-copy{position:relative;z-index:2;display:flex;flex-direction:column;padding:32px 28px}.project-meta{display:flex;align-items:center;gap:9px;color:var(--brand);font:800 8px/1 var(--mono);letter-spacing:.1em}.project-meta>i{width:7px;height:7px;background:var(--success);border-radius:50%;box-shadow:0 0 10px var(--success)}.project-meta em{margin-left:10px;padding:7px 10px;color:var(--soft);font-size:10px;font-style:normal;letter-spacing:0;background:var(--surface-2);border:1px solid var(--line);border-radius:99px}.featured-copy h2{margin:25px 0 12px;font-size:clamp(32px,3.3vw,48px);line-height:1.08;letter-spacing:-.05em}.featured-copy>p{max-width:540px;margin:0;color:var(--muted);font-size:14px;line-height:1.75}.tag-list{display:flex;flex-wrap:wrap;gap:7px}.tag-list span{padding:6px 8px;color:var(--soft);font:700 8px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:6px}.featured-copy>.tag-list{margin-top:18px}.feature-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px;padding-top:18px;border-top:1px solid var(--line)}.feature-facts>div{display:flex;align-items:center;gap:9px}.feature-facts>div>span{display:grid;width:32px;height:32px;place-items:center;color:var(--brand);background:color-mix(in srgb,var(--brand) 10%,var(--surface-2));border:1px solid color-mix(in srgb,var(--brand) 28%,var(--line));border-radius:8px}.feature-facts p{margin:0}.feature-facts strong,.feature-facts small{display:block}.feature-facts strong{font-size:12px}.feature-facts small{margin-top:4px;color:var(--muted);font-size:8px}.project-actions{display:flex;align-items:center;gap:14px;margin-top:auto;padding-top:24px}.project-actions>a{display:inline-flex;align-items:center;gap:12px;padding:13px 18px;color:#07111f;font-size:12px;font-weight:800;background:var(--brand);border-radius:9px;box-shadow:0 12px 30px color-mix(in srgb,var(--brand) 20%,transparent)}.status-pill{display:flex;align-items:center;gap:7px;color:var(--muted);font:700 8px/1 var(--mono)}.status-pill i{width:6px;height:6px;background:var(--success);border-radius:50%;box-shadow:0 0 8px var(--success)}

.featured-preview{position:relative;z-index:1;display:grid;align-items:center;padding:30px 24px 30px 0}.ai-product{width:100%;overflow:hidden;background:#07101e;border:1px solid #31516f;border-radius:16px;box-shadow:0 28px 60px rgba(0,0,0,.36);transform:perspective(900px) rotateY(-2deg)}.ai-product>header{height:48px;display:flex;align-items:center;gap:18px;padding:0 14px;color:#dce8f7;background:#0d1a2b;border-bottom:1px solid #223148}.ai-product>header strong{margin-right:auto;font-size:12px}.ai-product>header strong i{color:#66e3bf;font-style:normal}.ai-product>header nav{display:flex;gap:6px}.ai-product>header nav span{padding:6px 9px;color:#91a4ba;font-size:7px;background:#101e31;border:1px solid #25354a;border-radius:99px}.ai-product>header>b{display:grid;width:23px;height:23px;place-items:center;font-size:8px;background:#f1d6c1;border-radius:50%}.ai-body{min-height:292px;display:grid;grid-template-columns:90px minmax(0,1fr) 128px}.ai-body>aside{display:grid;align-content:start;gap:4px;padding:15px 9px;border-right:1px solid #1c2a3d}.ai-body>aside span{padding:8px;color:#9eafc1;font-size:8px;border-radius:6px}.ai-body>aside span.active{color:#66e3bf;background:#12243a}.ai-editor{padding:25px 18px}.ai-editor>small{color:#66e3bf;font:700 7px/1 var(--mono);letter-spacing:.12em}.ai-editor h3{margin:12px 0 8px;color:#eef4fb;font-size:23px}.ai-editor>p{margin:0;color:#91a4ba;font-size:9px;line-height:1.7}.ai-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:14px}.ai-chips span{padding:6px 8px;color:#b7c4d2;font-size:7px;background:#152238;border-radius:99px}.ai-input{height:62px;display:flex;align-items:flex-end;justify-content:space-between;margin-top:22px;padding:11px;color:#657990;font-size:8px;border:1px solid #2b405a;border-radius:9px}.ai-input b{display:grid;width:26px;height:26px;place-items:center;color:#07111f;background:#4ebef2;border-radius:7px}.ai-helper{display:grid;align-content:start;gap:7px;padding:20px 10px;background:#0a1423;border-left:1px solid #1c2a3d}.ai-helper>strong{margin-bottom:4px;color:#dce8f7;font-size:9px}.ai-helper>div{display:flex;align-items:center;gap:7px;padding:8px;background:#101e31;border:1px solid #1b2c42;border-radius:7px}.ai-helper i{display:grid;width:23px;height:23px;place-items:center;color:#66e3bf;font-style:normal;background:#12302d;border-radius:6px}.ai-helper p,.ai-helper small{display:block;margin:0}.ai-helper p{color:#c8d4e2;font-size:7px}.ai-helper small{margin-top:3px;color:#71859b;font-size:6px}

.project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:16px}.project-card{--tone:var(--brand);min-height:430px;display:grid;grid-template-columns:minmax(245px,.92fr) minmax(210px,1.08fr);overflow:hidden;background:radial-gradient(circle at 78% 22%,color-mix(in srgb,var(--tone) 18%,transparent),transparent 36%),var(--surface);border:1px solid color-mix(in srgb,var(--tone) 36%,var(--line));border-radius:19px;transition:transform .18s ease,border-color .18s ease}.project-card:hover{border-color:color-mix(in srgb,var(--tone) 65%,var(--line));transform:translateY(-3px)}.tone-orange{--tone:#f39855}.tone-blue{--tone:#4d8dff}.tone-violet{--tone:#9a78ff}.tone-cyan{--tone:#32c6c6}.card-copy{position:relative;z-index:2;display:flex;min-width:0;flex-direction:column;padding:25px 10px 24px 25px}.card-meta{display:flex;align-items:center;justify-content:space-between;gap:10px}.card-meta>span{padding:6px 9px;color:var(--tone);font-size:9px;font-weight:800;background:color-mix(in srgb,var(--tone) 12%,var(--surface));border:1px solid color-mix(in srgb,var(--tone) 28%,var(--line));border-radius:99px}.card-meta em{display:flex;align-items:center;gap:6px;color:var(--muted);font:700 7px/1 var(--mono);font-style:normal}.card-meta em i{width:6px;height:6px;background:var(--success);border-radius:50%;box-shadow:0 0 8px var(--success)}.card-copy h2{margin:24px 0 10px;font-size:clamp(22px,2.2vw,31px);line-height:1.1;letter-spacing:-.04em}.card-copy>p{margin:0;color:var(--muted);font-size:12px;line-height:1.7}.card-copy>.tag-list{margin-top:17px}.card-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:20px;padding-top:17px;border-top:1px solid var(--line)}.card-facts strong,.card-facts small{display:block}.card-facts strong{color:var(--text);font-size:11px}.card-facts small{margin-top:4px;color:var(--muted);font-size:7px}.card-link{display:flex;align-items:center;gap:10px;align-self:flex-start;margin-top:auto;padding-top:22px;color:var(--tone);font-size:11px;font-weight:800}.card-preview{position:relative;min-width:0;overflow:hidden}.preview-mobile{background:radial-gradient(circle at 50% 45%,rgba(243,152,85,.18),transparent 55%)}.phone{position:absolute;width:130px;height:270px;overflow:hidden;padding:14px 10px 22px;color:#14202c;background:#f8fafc;border:5px solid #0a0f17;border-radius:23px;box-shadow:0 22px 40px rgba(0,0,0,.35)}.phone::before{position:absolute;top:4px;left:50%;width:48px;height:7px;content:'';background:#0a0f17;border-radius:99px;transform:translateX(-50%)}.phone-front{right:20px;bottom:-14px;z-index:2;transform:rotate(5deg)}.phone-back{right:-25px;bottom:34px;opacity:.78;transform:rotate(-3deg) scale(.92)}.phone header{margin:8px 0 12px;font-size:9px;font-weight:800;text-align:center}.phone-back span{display:block;height:34px;margin:7px 0;background:#e7edf2;border-radius:6px}.app-icons{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.app-icons b{display:grid;height:24px;place-items:center;color:#169b78;font-size:7px;background:#dff7ef;border-radius:7px}.phone-front>strong{display:block;margin:14px 0 7px;font-size:8px}.goods{display:grid;grid-template-columns:1fr 1fr;gap:5px}.goods span{height:76px;background:linear-gradient(#dce5e9 58%,#fff 58%);border-radius:5px;box-shadow:inset 0 0 0 1px #d7e0e5}.phone footer{position:absolute;right:0;bottom:0;left:0;padding:7px;color:#95a2ab;font-size:7px;text-align:center;background:#fff;border-top:1px solid #e1e8ed}.preview-world{display:grid;align-items:end;padding:24px 16px 8px}.world-panel{width:340px;max-width:115%;overflow:hidden;background:#071321;border:1px solid #245584;border-radius:12px;box-shadow:0 22px 45px rgba(0,0,0,.35);transform:translateX(4px)}.world-panel header{height:40px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;color:#dce8f7;font-size:8px;background:#0c1d31;border-bottom:1px solid #1e3d5c}.world-panel header span{color:#67a9ff}.world-body{height:210px;display:grid;grid-template-columns:105px 1fr}.world-body aside{display:grid;align-content:start;gap:9px;padding:18px 10px;border-right:1px solid #1e3d5c}.world-body aside i{height:24px;background:#102942;border-radius:5px}.world-body section{position:relative;display:grid;place-items:center;background:radial-gradient(circle,#0f3158 0 28%,transparent 29%),radial-gradient(circle,#081d35 0 52%,#061321 53%)}.globe{display:grid;width:120px;height:120px;place-items:center;color:#55b7ff;font-size:36px;border:1px solid #236ba1;border-radius:50%;box-shadow:0 0 35px rgba(58,153,232,.25),inset 0 0 25px rgba(58,153,232,.18)}.world-body section p{position:absolute;right:9px;bottom:9px;display:grid;gap:5px;margin:0}.world-body section p span{width:45px;height:5px;background:#25598b;border-radius:99px}.preview-gps,.preview-blog{display:grid;place-items:center;padding:24px}.gps-panel{position:relative;width:100%;height:260px;overflow:hidden;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:28px 28px;border:1px solid var(--line);border-radius:13px}.gps-panel span{position:absolute;top:18px;left:18px;color:var(--tone);font:800 12px/1 var(--mono)}.gps-panel i{position:absolute;width:13px;height:13px;background:var(--tone);border:3px solid var(--surface);border-radius:50%;box-shadow:0 0 0 1px var(--tone),0 0 18px var(--tone)}.gps-panel i:nth-of-type(1){top:42%;left:34%}.gps-panel i:nth-of-type(2){top:28%;left:67%}.gps-panel i:nth-of-type(3){top:66%;left:58%}.gps-panel b{position:absolute;right:18px;bottom:18px;padding:8px;color:var(--soft);font:700 8px/1 var(--mono);background:var(--surface);border:1px solid var(--line);border-radius:6px}.blog-panel{width:100%;height:260px;display:grid;grid-template-columns:70px 1fr;grid-template-rows:58px repeat(3,1fr);gap:9px;padding:15px;background:var(--bg);border:1px solid var(--line);border-radius:13px}.blog-panel b{grid-row:1/-1;display:grid;place-items:start center;padding-top:14px;color:var(--tone);font:800 20px/1 var(--mono);background:var(--surface-2);border-radius:8px}.blog-panel span{height:9px;background:var(--line);border-radius:99px}.blog-panel span:nth-of-type(2){width:78%}.blog-panel span:nth-of-type(3){width:58%}.blog-panel div{background:var(--surface-2);border:1px solid var(--line);border-radius:7px}

@media(max-width:1100px){.featured-project{grid-template-columns:1fr}.featured-preview{padding:0 28px 30px}.project-grid{grid-template-columns:1fr}.project-card{grid-template-columns:1fr 1fr}}
@media(max-width:720px){.page-heading{align-items:flex-start;flex-direction:column}.project-count{width:100%}.filter-bar{flex-wrap:nowrap;overflow-x:auto}.filter-bar button{white-space:nowrap}.featured-project,.project-card{grid-template-columns:1fr}.featured-preview{padding:0 18px 22px}.ai-product{transform:none}.ai-product>header nav,.ai-helper{display:none}.ai-body{grid-template-columns:75px 1fr}.feature-facts{grid-template-columns:1fr}.card-preview{min-height:300px}.card-copy{padding:24px}.project-grid{grid-template-columns:1fr}}
</style>
