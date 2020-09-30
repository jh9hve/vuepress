# Raspberry Pi

## Raspberry Pi OS

Raspberry Pi OS (previously called Raspbian) をインストール  
Raspberry Pi OS (32-bit) Lite　にした。デスクトップはいらないので・・・
```
Version:August 2020
Release date:2020-08-20
Kernel version:5.4
Size:435 MB
```

まず
```
sudo raspi-config
```
を立ち上げ、５番のInterfacing Options で SSH を有効に  
ホスト名も設定しても良いかも

dhcpcd.conf　で有線LANを固定IPの設定にしたいのだが、
eth0 がインターフェース名にならず env(mac address) がインターフェース名になってしまうので  
/lib/udev/rules.d/73-usb-net-by-mac.rules
の該当箇所を eth0 に書き換える。（NAME="eth0"）  
再起動すると ssh で接続できるので以後はリモートで。

## nginx

sudo apt install nginx

sudo systemctl start nginx で起動確認

## rtmp

sudo apt install libnginx-mod-rtmp

### /etc/nginx/nginx.conf

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

### プレーヤー

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
    <source src="rtmp://192.168.11.81/live/live" type="rtmp/mp4">
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
