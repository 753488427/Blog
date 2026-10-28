const CITY_ENDPOINT = '/api/cities'

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json', ...options.headers },
    ...options,
  })

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error(`服务器返回了无法解析的数据（${response.status}）`)
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || `请求失败（${response.status}）`)
  }

  return result
}

export async function getCities() {
  const result = await request(CITY_ENDPOINT)
  return Array.isArray(result.data) ? result.data : []
}

export async function createCity(city) {
  const result = await request(CITY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(city),
  })
  return result.data
}
