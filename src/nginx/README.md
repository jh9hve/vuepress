# Nginx

## インストール
```
sudo apt update
sudo apt install nginx
sudo apt install libnginx-mod-rtmp

systemctl start nginx
```

## /etc/nginx/nginx.conf

最後に次を追加するとOBSから受け取れる。
```
rtmp {
   server {
      listen 1935;
      chunk_size 4096;

      application live {
         live on;
         record off;
      }
   }
}
```

## プレーヤー

```
<!DOCTYPE html>
<html>

<head>
  <title>Videojs 7 + RTMP  (flash)</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/video.js/7.6.5/video-js.min.css" />
  <script src="//cdnjs.cloudflare.com/ajax/libs/video.js/7.6.5/video.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/videojs-flash/2.1.2/videojs-flash.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/videojs-flashls-source-handler@1.1.2/dist/videojs-flashls-source-handler.min.js"></script>
</head>

<body>
  <video class="video-js vjs-default-skin" id="video-container" controls muted autoplay >
    <source src="rtmp://192.168.11.53/live/live" type="rtmp/mp4">
  </video>
</body>
<script>
  var options = {
    flash: {
      swf: '//cdnjs.cloudflare.com/ajax/libs/videojs-swf/5.4.2/video-js.swf'
    },
    fluid: true
  };
  var player = videojs('video-container', options);
</script>

</html>

```