// 获取Token
export function getToken() {
  return sessionStorage.getItem('token')
}

// 设置Token
export function setToken(token) {
  if (token === null) {
    sessionStorage.removeItem('token')
  } else {
    sessionStorage.setItem('token', token)
  }
}

// 获取存储数据
export function getStorage(key, defaults) {
  const item = localStorage.getItem(key)
  try {
    const value = JSON.parse(item)
    return value || defaults
  } catch(e) {
    return defaults
  }
}

// 设置存储数据
export function setStorage(key, value) {
  if (value === null) {
    localStorage.removeItem(key)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// 选择文件
export function chooseFiles(opts) {
  return new Promise(resolve => {
    const defaults = Object.assign({
      accept: '',
      multiple: false
    }, opts)
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = defaults.accept
    input.multiple = defaults.multiple
    input.click()
    input.onchange = () => resolve(input.files)
  })
}
