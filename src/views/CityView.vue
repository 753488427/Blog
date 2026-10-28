<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { createCity, getCities } from '../api/city'

const cities = ref([])
const keyword = ref('')
const loading = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const formMessage = ref('')
const formMessageType = ref('')
const currentPage = ref(1)
const pageSize = 20
const cityForm = reactive({ Name: '', CountryCode: '', District: '', Population: 0 })
const numberFormatter = new Intl.NumberFormat('zh-CN')

const filteredCities = computed(() => {
  const term = keyword.value.trim().toLowerCase()
  if (!term) return cities.value
  return cities.value.filter((city) =>
    [city.Name, city.CountryCode, city.District].some((value) =>
      String(value || '').toLowerCase().includes(term),
    ),
  )
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredCities.value.length / pageSize)))
const visibleCities = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCities.value.slice(start, start + pageSize)
})
const totalPopulation = computed(() =>
  cities.value.reduce((sum, city) => sum + (Number(city.Population) || 0), 0),
)
const rangeText = computed(() => {
  if (!filteredCities.value.length) return '暂无数据'
  const start = (currentPage.value - 1) * pageSize + 1
  const end = Math.min(currentPage.value * pageSize, filteredCities.value.length)
  return `第 ${start}–${end} 条，共 ${filteredCities.value.length} 条`
})

watch(keyword, () => { currentPage.value = 1 })

async function loadCities() {
  loading.value = true
  errorMessage.value = ''
  try {
    cities.value = await getCities()
    currentPage.value = 1
  } catch (error) {
    cities.value = []
    errorMessage.value = error.message || '无法获取城市数据'
  } finally {
    loading.value = false
  }
}

async function submitCity() {
  submitting.value = true
  formMessage.value = ''
  formMessageType.value = ''
  try {
    await createCity({
      Name: cityForm.Name.trim(),
      CountryCode: cityForm.CountryCode.trim().toUpperCase(),
      District: cityForm.District.trim(),
      Population: Number(cityForm.Population),
    })
    formMessage.value = '城市新增成功'
    formMessageType.value = 'success'
    Object.assign(cityForm, { Name: '', CountryCode: '', District: '', Population: 0 })
    keyword.value = ''
    await loadCities()
  } catch (error) {
    formMessage.value = error.message || '新增城市失败'
    formMessageType.value = 'error'
  } finally {
    submitting.value = false
  }
}

function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  document.querySelector('.directory-card')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(loadCities)
</script>

<template>
  <main class="page-shell city-page">
    <nav class="breadcrumb" aria-label="面包屑导航">
      <RouterLink to="/">首页</RouterLink><span>/</span>
      <RouterLink to="/lab">实验室</RouterLink><span>/</span>
      <strong>World 城市数据</strong>
    </nav>

    <section class="city-hero">
      <div>
        <p class="eyebrow">LAB / DATABASE / NODE.JS</p>
        <h1>World 城市数据</h1>
        <p class="hero-copy">一个连接 Vue、Node.js 与 MySQL 的全栈小工具。支持实时查询、搜索和新增城市数据。</p>
      </div>
      <button class="button button-primary" type="button" :disabled="loading" @click="loadCities">
        ↻ {{ loading ? '加载中…' : '刷新数据' }}
      </button>
    </section>

    <section class="stats-grid" aria-label="数据统计">
      <article class="metric-card blue">
        <span>城市数量</span><strong>{{ numberFormatter.format(cities.length) }}</strong><small>World 数据库记录</small>
      </article>
      <article class="metric-card green">
        <span>总人口</span><strong>{{ numberFormatter.format(totalPopulation) }}</strong><small>当前结果汇总</small>
      </article>
      <article class="metric-card">
        <span>接口状态</span>
        <strong :class="errorMessage ? 'offline' : 'online'">{{ errorMessage ? '异常' : '在线' }}</strong>
        <small>GET / POST · /api/cities</small>
      </article>
    </section>

    <section class="panel create-card">
      <div class="panel-heading">
        <div><p class="eyebrow">ADD CITY</p><h2>新增城市</h2></div>
        <p v-if="formMessage" class="form-message" :class="formMessageType" role="status">{{ formMessage }}</p>
      </div>
      <form class="city-form" @submit.prevent="submitCity">
        <label><span>城市名称</span><input v-model.trim="cityForm.Name" maxlength="35" required placeholder="例如 Shenzhen" /></label>
        <label><span>国家代码</span><input v-model.trim="cityForm.CountryCode" maxlength="3" minlength="3" pattern="[A-Za-z]{3}" required placeholder="例如 CHN" @input="cityForm.CountryCode = cityForm.CountryCode.toUpperCase()" /></label>
        <label><span>地区</span><input v-model.trim="cityForm.District" maxlength="20" required placeholder="例如 Guangdong" /></label>
        <label><span>人口</span><input v-model.number="cityForm.Population" type="number" min="0" max="2147483647" step="1" required /></label>
        <button class="button button-primary submit-button" type="submit" :disabled="submitting">{{ submitting ? '正在提交…' : '新增城市' }}</button>
      </form>
    </section>

    <section class="panel directory-card">
      <div class="directory-toolbar">
        <div>
          <p class="eyebrow">CITY DIRECTORY</p><h2>城市目录</h2>
          <p class="directory-status" :class="{ error: errorMessage }">
            <template v-if="errorMessage">加载失败：{{ errorMessage }}</template>
            <template v-else-if="loading">正在获取城市数据…</template>
            <template v-else>{{ rangeText }}</template>
          </p>
        </div>
        <label class="search-box"><span>⌕</span><input v-model="keyword" type="search" placeholder="搜索城市、国家代码或地区" :disabled="loading || !cities.length" autocomplete="off" /></label>
      </div>

      <div v-if="errorMessage" class="empty-state">
        <strong>城市数据加载失败</strong><span>请检查 Node 服务、反向代理和数据库连接。</span>
        <button class="button" type="button" @click="loadCities">重新加载</button>
      </div>
      <template v-else>
        <div class="table-wrap" :aria-busy="loading">
          <table>
            <thead><tr><th>ID</th><th>城市</th><th>国家代码</th><th>地区</th><th class="number-cell">人口</th></tr></thead>
            <tbody>
              <tr v-for="city in visibleCities" :key="city.ID">
                <td class="muted">{{ city.ID }}</td><td class="city-name">{{ city.Name }}</td>
                <td><span class="country-code">{{ city.CountryCode }}</span></td><td>{{ city.District || '—' }}</td>
                <td class="number-cell">{{ numberFormatter.format(Number(city.Population) || 0) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="!loading && !visibleCities.length" class="empty-state compact">没有找到匹配的城市。</div>
          <div v-if="loading" class="loading-cover">正在加载…</div>
        </div>
        <footer class="pagination">
          <span>{{ rangeText }}</span>
          <div class="page-actions">
            <button type="button" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">上一页</button>
            <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
            <button type="button" :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">下一页</button>
          </div>
        </footer>
      </template>
    </section>
  </main>
</template>

<style scoped>
.city-page{padding-top:32px;padding-bottom:80px}.breadcrumb{display:flex;gap:9px;align-items:center;color:var(--muted);font-size:.86rem;margin-bottom:34px}.breadcrumb a:hover{color:var(--brand)}.breadcrumb strong{color:var(--text)}
.city-hero{display:flex;justify-content:space-between;align-items:end;gap:32px;margin-bottom:34px}.city-hero h1{margin:10px 0 12px;font-size:clamp(2.3rem,6vw,4.8rem);line-height:.98;letter-spacing:-.06em}.hero-copy{max-width:680px;margin:0;color:var(--muted);font-size:1.05rem;line-height:1.8}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:18px}.metric-card,.panel{border:1px solid var(--line);background:var(--surface);box-shadow:var(--shadow)}.metric-card{min-height:150px;padding:24px;border-radius:22px;display:flex;flex-direction:column}.metric-card span,.metric-card small{color:var(--muted)}.metric-card strong{margin:auto 0 4px;font-size:clamp(1.7rem,3vw,2.4rem);letter-spacing:-.04em}.metric-card.blue{border-top:3px solid #4f7cff}.metric-card.green{border-top:3px solid var(--brand)}.online{color:var(--brand)}.offline{color:#ff6d77}
.panel{border-radius:24px;margin-top:18px}.create-card{padding:26px}.panel-heading,.directory-toolbar{display:flex;justify-content:space-between;gap:24px;align-items:center}.panel h2{margin:5px 0 0;font-size:1.5rem}.form-message{margin:0;padding:8px 12px;border-radius:999px;font-size:.85rem}.form-message.success{color:#19b982;background:rgba(25,185,130,.12)}.form-message.error,.directory-status.error{color:#ff6d77}
.city-form{display:grid;grid-template-columns:1.1fr .75fr 1fr .75fr auto;gap:12px;align-items:end;margin-top:22px}.city-form label{display:grid;gap:8px;color:var(--muted);font-size:.8rem}.city-form input,.search-box input{width:100%;border:1px solid var(--line);background:var(--surface-strong);color:var(--text);border-radius:12px;outline:none}.city-form input{min-height:46px;padding:0 13px}.city-form input:focus,.search-box:focus-within{border-color:var(--brand);box-shadow:0 0 0 3px rgba(42,201,155,.12)}.submit-button{min-height:46px;white-space:nowrap}
.directory-card{overflow:hidden}.directory-toolbar{padding:24px 26px;border-bottom:1px solid var(--line)}.directory-status{margin:7px 0 0;color:var(--muted);font-size:.84rem}.search-box{width:min(360px,100%);min-height:44px;display:flex;align-items:center;gap:8px;padding:0 13px;border:1px solid var(--line);border-radius:12px;color:var(--muted);background:var(--surface-strong)}.search-box input{border:0;background:transparent;padding:0}
.table-wrap{position:relative;min-height:180px;overflow-x:auto}table{width:100%;border-collapse:collapse;min-width:700px}th,td{padding:15px 26px;border-bottom:1px solid var(--line);text-align:left}th{color:var(--muted);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;background:var(--surface-strong)}td{font-size:.91rem}tbody tr:hover{background:rgba(42,201,155,.05)}.city-name{font-weight:700}.muted{color:var(--muted)}.number-cell{text-align:right;font-variant-numeric:tabular-nums}.country-code{display:inline-flex;padding:4px 9px;border-radius:999px;color:#71a0ff;background:rgba(79,124,255,.12);font-size:.75rem;font-weight:800}
.empty-state{min-height:230px;display:grid;place-content:center;justify-items:center;gap:10px;padding:32px;color:var(--muted);text-align:center}.empty-state strong{color:var(--text)}.empty-state.compact{min-height:140px}.loading-cover{position:absolute;inset:0;display:grid;place-content:center;color:var(--muted);background:var(--surface);opacity:.9}.pagination{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:18px 26px;color:var(--muted);font-size:.84rem}.page-actions{display:flex;align-items:center;gap:12px}.page-actions button{border:1px solid var(--line);background:var(--surface-strong);color:var(--text);border-radius:9px;padding:8px 12px;cursor:pointer}.page-actions button:disabled,button:disabled{opacity:.45;cursor:not-allowed}
@media(max-width:960px){.stats-grid{grid-template-columns:1fr 1fr}.metric-card:last-child{grid-column:1/-1}.city-form{grid-template-columns:1fr 1fr}}@media(max-width:680px){.city-page{padding-top:20px}.city-hero,.panel-heading,.directory-toolbar,.pagination{align-items:stretch;flex-direction:column}.city-hero .button{width:100%}.stats-grid,.city-form{grid-template-columns:1fr}.metric-card:last-child{grid-column:auto}.search-box{width:100%}.page-actions{justify-content:space-between}th,td{padding:14px 18px}}
</style>
