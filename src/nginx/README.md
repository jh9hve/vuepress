# Nginx



## インストール
```
sudo apt update
sudo apt install nginx
sudo apt install libnginx-mod-rtmp

systemctl start nginx
```

# rtmp flash用

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

# FLS MPEGDASH

https://qiita.com/MMaru76/items/e2495a87b871bc9cbefe


## nginx.conf

```
rtmp {
   server {
      listen 1935;
      chunk_size 4096;

      application live {
         live on;
         record off;

         # HLSの記述欄
         hls on;
         hls_path /var/www/html/hls;
         hls_fragment 10s;

         # MEPG-DASHの記述欄
         dash on;
         dash_path /var/www/html/dash;
         dash_fragment 10s;

      }
   }
}

```

html の下に追加
```
    server {
#        listen  80;
#        include mime.types;
#        default_type    application/octet-stream;
#        server_name localhost;
#        add_header  Access-Control-Allow-Origin *;

        location /hls {
            types {
                 application/vnd.apple.mpegurl m3u8;
            }
            root /var/www/html/;
        }
        location /dash {
            types {
                 application/vnd.apple.mpegurl mpd;
            }
            root /var/www/html/;
        }
    }

```

## プレーヤー

### HLS
```
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>MediaElement</title>
  <!-- MediaElement style -->
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.css" />
</head>

<body>
  <!-- MediaElement -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.js"></script>

  <video id="player" width="640" height="360">
</body>
<script type="text/javascript">

      var player = new MediaElementPlayer('player', {
        success: function(mediaElement, originalNode) {
          console.log("Player initialised");
        }
      });
        player.setSrc("hls/live.m3u8");
</script>

</html>
```

### MPEG DASH うまくいってない
```
<html>

<head>
  <meta charset="utf-8">
  <title>MediaElement</title>
  <!-- MediaElement style -->
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.css" />
</head>

<body>
  <!-- MediaElements -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.js"></script>

  <video id="player" width="640" height="360">
</body>
<script type="text/javascript">

      var player = new MediaElementPlayer('player', {
        success: function(mediaElement, originalNode) {
          console.log("Player initialised");
        }
      });
        player.setSrc("dash/live.mpd");
</script>

</html>
```