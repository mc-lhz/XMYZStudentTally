/*
 * dev-auth.js —— 登录解锁脚本（对应 README「使用仓库内部脚本解锁登录」的要求）
 *
 * 为什么需要它：
 *   源站管理后台（/admin/tally/**）在前端路由守卫里要求登录态：
 *   入口 bundle 的 auth store 会从 localStorage 读取
 *     token / user / expiresAt / permissions 四项，
 *   四项齐备且 expiresAt 未过期才算已登录（见 docs/链路分析报告.md 第 4 节）。
 *
 * 它做什么：
 *   1. 设定后端接口基址 window.__TALLY_API_BASE__（默认同源 /api/v2）
 *   2. 设定大屏 WS 基址 window.__TALLY_WS_ORIGIN__（默认同源）
 *   3. 先用本地口令调用 POST /api/v2/auth/login 换取 token，
 *      再把四项登录态写进 localStorage —— 于是 /admin/tally 不会被踢回登录页。
 *
 * 它不做什么：
 *   不改任何页面渲染逻辑，不伪造任何业务数据。
 *
 * 控制台可用：
 *   tallyAuth.logout()      退出登录（清掉本地登录态）
 *   tallyAuth.unlock()      重新解锁
 *   tallyAuth.whoami()      打印当前登录态
 */
(function () {
  'use strict'

  var API_BASE = window.__TALLY_API_BASE__ || '/api/v2'
  window.__TALLY_API_BASE__ = API_BASE

  var DEFAULT_ACCOUNT = { username: 'admin', password: 'admin' }
  var STORAGE_KEYS = {
    token: 'token',
    user: 'user',
    expiresAt: 'expiresAt',
    permissions: 'permissions',
  }

  function writeSession(payload, headers) {
    // 入口 bundle 的 auth store 以「毫秒」比较过期时间：
    //   function te(w){ n.value = w.expiresAt * 1e3 }   // 登录后存毫秒
    //   isLoggedIn = !token || !expiresAt ? false : Date.now() < expiresAt
    // 而后端 /auth/login 返回的是「秒」，故这里必须换算成毫秒，
    // 否则 Date.now()(≈1.79e12) 恒大于 expiresAt(≈1.82e9)，会被判为已过期并清空登录态。
    var expiresAt = Number(payload.expiresAt)
    if (expiresAt) {
      expiresAt = expiresAt < 1e12 ? expiresAt * 1000 : expiresAt
    } else {
      expiresAt = Date.now() + 86400 * 365 * 1000
    }
    var user = payload.user || { id: 1, username: 'admin', nickname: '本地开发管理员' }
    var permissions = payload.permissions || user.permissions || ['tally.manage']

    localStorage.setItem(STORAGE_KEYS.token, payload.token)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEYS.expiresAt, String(expiresAt))
    localStorage.setItem(STORAGE_KEYS.permissions, JSON.stringify(permissions))
    if (headers && headers.token) {
      localStorage.setItem(STORAGE_KEYS.token, headers.token)
    }
    return { token: payload.token, user: user, expiresAt: expiresAt, permissions: permissions }
  }

  function readSession() {
    var raw = {}
    Object.keys(STORAGE_KEYS).forEach(function (key) {
      raw[key] = localStorage.getItem(STORAGE_KEYS[key])
    })
    return raw
  }

  function logout() {
    Object.keys(STORAGE_KEYS).forEach(function (key) {
      localStorage.removeItem(STORAGE_KEYS[key])
    })
    return '已清除本地登录态'
  }

  function whoami() {
    var session = readSession()
    var expiresAt = Number(session.expiresAt)
    return {
      token: session.token ? session.token.slice(0, 8) + '…' : null,
      user: session.user ? JSON.parse(session.user) : null,
      permissions: session.permissions ? JSON.parse(session.permissions) : null,
      expired: !expiresAt ? true : Date.now() >= expiresAt,
    }
  }

  function unlock(account) {
    var creds = account || DEFAULT_ACCOUNT
    return fetch(API_BASE + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loginType: 'normal',
        username: creds.username,
        password: creds.password,
      }),
    })
      .then(function (resp) {
        return resp.json()
      })
      .then(function (body) {
        if (!body || body.code !== 200 || !body.data) {
          throw new Error((body && body.message) || '登录失败')
        }
        return writeSession(body.data)
      })
      .then(function (session) {
        window.__TALLY_UNLOCKED__ = true
        console.info('[tally] 已解锁管理后台登录态：', session.user.username)
        return session
      })
      .catch(function (exc) {
        window.__TALLY_UNLOCKED__ = false
        console.warn('[tally] 自动解锁失败（' + exc.message + '），请手动重试 tallyAuth.unlock()')
        return null
      })
  }

  // 同步塞一个兜底登录态，保证本次页面加载路由守卫能过；
  // 真实的 token 由随后的 unlock() 从后端换取并覆盖。
  writeSession({ token: window.__TALLY_DEV_TOKEN__ || 'local-dev-token' }, null)

  window.tallyAuth = {
    unlock: unlock,
    logout: logout,
    whoami: whoami,
    apiBase: API_BASE,
  }

  window.addEventListener('DOMContentLoaded', function () {
    unlock()
  })
})()
