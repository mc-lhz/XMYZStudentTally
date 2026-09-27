<!doctype html>
<html lang="en">
  <head>
<script>
  // 强制 https，但本地开发环境除外：localhost / 127.x / 局域网 IP（手机真机联调）
  (function () {
    var h = location.hostname;
    var isLocal =
      h === 'localhost' ||
      /^127\./.test(h) ||
      /^192\.168\./.test(h) ||
      /^10\./.test(h) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(h);
    if (location.protocol === 'http:' && !isLocal) {
      location.protocol = 'https:';
    }
  })();
</script>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <script>
      // iOS Safari 无视 user-scalable=no，拦截捏合手势，配合 CSS touch-action 彻底禁用放大
      document.addEventListener('gesturestart', function (e) { e.preventDefault() })
      document.addEventListener('gesturechange', function (e) { e.preventDefault() })
    </script>
    <title>🎶第一是我的骄傲🎶</title>
    <script type="module" crossorigin src="/assets/index-D2vbWxba.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CZZQpGPl.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
