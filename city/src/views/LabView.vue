<script setup>
import SectionWithProfile from '../components/SectionWithProfile.vue'

const tools = [
  { title:'World 城市数据', desc:'查询、筛选并新增世界城市数据，连接 Vue、Node.js 与服务器 MySQL。', icon:'DB', status:'AVAILABLE', stack:['Vue','Express','MySQL'], path:'/lab/cities', active:true, tone:'green' },
  { title:'JSON Inspector', desc:'格式化、压缩与检查 JSON 数据结构，快速定位嵌套字段。', icon:'{}', status:'PLANNED', stack:['Browser API','JSON'], path:'/lab', active:false, tone:'blue' },
  { title:'API Request Builder', desc:'构造 HTTP 请求、管理请求头，并保存常用接口参数。', icon:'↔', status:'PLANNED', stack:['HTTP','Fetch'], path:'/lab', active:false, tone:'violet' },
  { title:'Android Location Lab', desc:'查看定位提供者、坐标来源和模拟位置状态，用于自有应用测试。', icon:'GPS', status:'DESIGNING', stack:['Android','Kotlin'], path:'/posts/android-location-testing-notes', active:true, tone:'orange' },
]
const logs = [
  { date:'10.28', title:'实验室页面结构调整', tag:'UI' },
  { date:'10.23', title:'补充 Android 定位测试笔记', tag:'ANDROID' },
  { date:'10.20', title:'World 城市工具部署完成', tag:'DEPLOY' },
]
</script>

<template>
  <main class="page-shell lab-page">
    <SectionWithProfile>
      <header class="lab-header"><div><p class="page-kicker">DEVELOPER LAB</p><h1 class="page-title">开发者实验室</h1><p class="page-intro">把学习过程做成可交互工具。每个实验都对应一段真实代码、一条验证路径和一篇工程记录。</p></div><div class="lab-badge"><span>LAB</span><i></i><small>ONLINE</small></div></header>

      <section class="status-strip">
        <div><i></i><span>实验室运行正常</span></div>
        <div class="status-items"><span>API 可用</span><span>Node.js</span><span>MySQL</span><span>{{ tools.filter(t => t.active).length }} 个实验在线</span></div>
        <small>LAST UPDATE · 2026.10.28</small>
      </section>

      <section class="tool-grid">
        <component :is="tool.active ? 'RouterLink' : 'article'" v-for="tool in tools" :key="tool.title" class="tool-card" :class="[`tone-${tool.tone}`,{ disabled:!tool.active }]" :to="tool.active ? tool.path : undefined">
          <div class="tool-top"><span class="tool-icon">{{ tool.icon }}</span><span class="tool-state"><i></i>{{ tool.status }}</span></div>
          <div class="tool-preview" :class="`preview-${tool.tone}`" aria-hidden="true">
            <span></span><span></span><span></span><span></span><b>{{ tool.icon }}</b>
          </div>
          <small>EXPERIMENT / {{ tool.icon }}</small><h2>{{ tool.title }}</h2><p>{{ tool.desc }}</p>
          <div class="tool-footer"><div><span v-for="item in tool.stack" :key="item">{{ item }}</span></div><strong>{{ tool.active ? '启动实验 ↗' : '准备中' }}</strong></div>
        </component>
      </section>

      <section class="lab-bottom">
        <article class="manifesto"><span>//</span><div><small>LAB MANIFESTO</small><h2>先做出来，再持续改进。</h2><p>小工具不一定改变世界，但它能减少重复劳动，也能把一个模糊想法变成可运行、可验证、可分享的作品。</p></div></article>
        <article class="lab-log"><div class="block-head"><div><span>CHANGELOG</span><h2>实验记录</h2></div><small>{{ logs.length }} LOGS</small></div><div v-for="log in logs" :key="log.title" class="log-row"><time>{{ log.date }}</time><strong>{{ log.title }}</strong><span>{{ log.tag }}</span></div></article>
      </section>
    </SectionWithProfile>
  </main>
</template>

<style scoped>
.lab-page{padding-top:42px}.lab-header{display:flex;align-items:center;justify-content:space-between;gap:40px}.lab-badge{position:relative;width:150px;height:150px;display:grid;flex:0 0 auto;place-items:center;border:1px solid var(--line);border-radius:50%;box-shadow:inset 0 0 40px color-mix(in srgb,var(--brand) 8%,transparent)}.lab-badge::before,.lab-badge::after{position:absolute;content:'';border:1px solid var(--line);border-radius:50%}.lab-badge::before{inset:18px}.lab-badge::after{inset:38px}.lab-badge span{position:relative;z-index:2;color:var(--brand);font:900 15px/1 var(--mono)}.lab-badge i{position:absolute;top:12px;width:8px;height:8px;background:var(--brand-2);border-radius:50%;box-shadow:0 0 12px var(--brand-2)}.lab-badge small{position:absolute;bottom:-10px;padding:6px 8px;color:var(--success);font:750 10px/1 var(--mono);background:var(--surface);border:1px solid var(--line);border-radius:6px}.status-strip{min-height:70px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:22px;margin-top:34px;padding:0 22px;background:var(--surface);border:1px solid var(--line);border-radius:15px}.status-strip>div:first-child{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:750}.status-strip div i{width:8px;height:8px;background:var(--success);border-radius:50%;box-shadow:0 0 10px var(--success)}.status-items{display:flex;flex-wrap:wrap;gap:7px}.status-items span{padding:6px 8px;color:var(--muted);font:700 10px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:5px}.status-strip small{color:var(--muted);font:700 10px/1 var(--mono)}.tool-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:18px}.tool-card{--tone:var(--brand);min-height:430px;display:flex;min-width:0;flex-direction:column;padding:25px;background:var(--surface);border:1px solid var(--line);border-radius:20px;transition:transform 180ms ease,border-color 180ms ease,opacity 180ms ease}.tool-card:not(.disabled):hover{border-color:color-mix(in srgb,var(--tone) 48%,var(--line));transform:translateY(-4px)}.tool-card.disabled{cursor:default;opacity:.58;filter:saturate(.72)}.tone-green{--tone:#42d99b}.tone-blue{--tone:#5790ff}.tone-violet{--tone:#9a78ff}.tone-orange{--tone:#f39855}.tool-top{display:flex;align-items:center;justify-content:space-between}.tool-icon{display:grid;width:50px;height:50px;place-items:center;color:var(--tone);font:800 12px/1 var(--mono);background:color-mix(in srgb,var(--tone) 10%,var(--surface));border:1px solid color-mix(in srgb,var(--tone) 33%,var(--line));border-radius:13px}.tool-state{display:flex;align-items:center;gap:7px;color:var(--muted);font:700 10px/1 var(--mono)}.tool-state i{width:6px;height:6px;background:var(--tone);border-radius:50%;box-shadow:0 0 8px var(--tone)}.tool-preview{height:120px;display:grid;grid-template-columns:repeat(4,1fr);align-items:end;gap:8px;margin:20px 0 0;padding:18px;overflow:hidden;background:radial-gradient(circle at 80% 20%,color-mix(in srgb,var(--tone) 16%,transparent),transparent 35%),var(--bg);border:1px solid var(--line);border-radius:13px}.tool-preview span{height:32%;background:color-mix(in srgb,var(--tone) 22%,var(--surface-2));border:1px solid color-mix(in srgb,var(--tone) 25%,var(--line));border-radius:4px}.tool-preview span:nth-child(2){height:56%}.tool-preview span:nth-child(3){height:82%}.tool-preview span:nth-child(4){height:44%}.tool-preview b{grid-column:1/-1;grid-row:1;align-self:start;color:var(--tone);font:800 12px/1 var(--mono)}.preview-blue span{height:7px!important;border-radius:99px}.preview-blue span:nth-child(2){width:75%}.preview-blue span:nth-child(3){width:58%}.preview-violet{grid-template-columns:1fr 1fr}.preview-violet span{height:28px!important}.preview-orange{background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:22px 22px}.tool-card>small{margin-top:22px;color:var(--tone);font:750 10px/1 var(--mono);letter-spacing:.13em}.tool-card h2{margin:12px 0 13px;font-size:25px;letter-spacing:-.035em}.tool-card>p{margin:0;color:var(--muted);font-size:14px;line-height:1.75}.tool-footer{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-top:auto;padding-top:22px;border-top:1px solid var(--line)}.tool-footer div{display:flex;flex-wrap:wrap;gap:7px}.tool-footer div span{padding:5px 7px;color:var(--muted);font:700 10px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:5px}.tool-footer strong{color:var(--tone);font-size:11px;white-space:nowrap}.lab-bottom{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}.manifesto,.lab-log{min-height:260px;padding:27px;background:var(--surface);border:1px solid var(--line);border-radius:20px}.manifesto{display:grid;grid-template-columns:64px 1fr;gap:20px}.manifesto>span{color:var(--brand);font:900 40px/1 var(--mono)}.manifesto small,.block-head span{color:var(--brand);font:800 10px/1 var(--mono);letter-spacing:.13em}.manifesto h2{margin:20px 0 12px;font-size:25px}.manifesto p{margin:0;color:var(--muted);font-size:13px;line-height:1.8}.block-head{display:flex;align-items:flex-start;justify-content:space-between;padding-bottom:18px;border-bottom:1px solid var(--line)}.block-head h2{margin:10px 0 0;font-size:22px}.block-head small{color:var(--muted);font:700 10px/1 var(--mono)}.log-row{display:grid;grid-template-columns:48px 1fr auto;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid var(--line)}.log-row:last-child{border:0}.log-row time{color:var(--muted);font:700 10px/1 var(--mono)}.log-row strong{font-size:13px}.log-row span{padding:5px 6px;color:var(--brand);font:700 9px/1 var(--mono);background:color-mix(in srgb,var(--brand) 8%,transparent);border-radius:4px}
@media(max-width:820px){.lab-header{align-items:flex-start}.lab-badge{width:105px;height:105px}.status-strip{grid-template-columns:1fr;padding:18px}.tool-grid,.lab-bottom{grid-template-columns:1fr}}
@media(max-width:520px){.lab-badge{display:none}.tool-footer{align-items:flex-start;flex-direction:column}}
</style>
