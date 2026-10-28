import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { title: '首页' } },
  { path: '/posts', name: 'posts', component: () => import('../views/PostsView.vue'), meta: { title: '技术文章' } },
  { path: '/posts/:slug', name: 'post-detail', component: () => import('../views/PostDetailView.vue'), meta: { title: '文章详情' } },
  { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue'), meta: { title: '项目作品' } },
  { path: '/lab', name: 'lab', component: () => import('../views/LabView.vue'), meta: { title: '开发者实验室' } },
  { path: '/lab/cities', name: 'cities', component: () => import('../views/CityView.vue'), meta: { title: 'World 城市数据' } },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: '关于我' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: '页面不存在' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'SevenNine Lab'} · SevenNine Lab`
})

export default router
