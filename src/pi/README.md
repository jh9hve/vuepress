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
を立ち上げ、５番（バージョンで変わるかも）のInterfacing Options で SSH を有効に  
ホスト名も設定しても良いかも

dhcpcd.conf　で有線LANを固定IPの設定にしたいのだが、
eth0 がインターフェース名にならず env(mac address) がインターフェース名になってしまうので  
/lib/udev/rules.d/73-usb-net-by-mac.rules
の該当箇所を eth0 に書き換える。（NAME="eth0"）  
再起動すると ssh で接続できるので以後はリモートで。

（この現象は3Bで上記のOSのときに起こった。）

追記：2020 12.02 Ver　のOSでRasPi4ではこの現象はおきずに eth0が普通に有効になった。

## nginx

sudo apt install nginx

sudo systemctl start nginx で起動確認（インストールしただけで起動されるようなのでこれは不要）



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

### OBS

配信のサーバーを　rtmp://192.168.11.81/live （192.168.11.81 のところは環境に合わせる）

ストリームキーを　live


### プレーヤー (FLASH)

以下のファイルを live.html として /var/www/html に配置

192.168.11.81 のところは環境に合わせる。

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


### プレーヤー VLCメディアプレーヤー

メディア　ネットワークストリームを開く　で次を指定（192.168.11.81の所は環境に合わせる）

rtmp://192.168.11.81/live/live

### stat

apt でインストールした場合 stat がないので次のようにした。

#### /etc/nginx/sites-available/default

次を server { } の中の適当なところに追加（正規のやりかたは違うかも・・・）

```
        location /stat {
                rtmp_stat all;
                rtmp_stat_stylesheet /stat.xsl;
        }

        location /stat.xsl {
                root html;
        }

```

#### stat.xsl

/usr/share/nginx/html/

にコピー。（stat.xsl はdockerにあったものをusbメモリにて）

### swap を無効に　（micro sd を長持ちさせるため）


```
sudo systemctl stop dphys-swapfile
sudo systemctl disable dphys-swapfile
```
再起動して　free　コマンドで確認すると swap が 0 になっている。

### いらないログを出力しない。

/etc/rsyslog.conf
```
#lpr.*                          -/var/log/lpr.log
#mail.*                         -/var/log/mail.log

#mail.info                      -/var/log/mail.info
#mail.warn                      -/var/log/mail.warn
#mail.err                       /var/log/mail.err

#*.=debug;\
#       auth,authpriv.none;\
#       news.none;mail.none     -/var/log/debug
```

```
sudo systemctl restart rsyslog
```

### hls mpeg_dash 用に ramディスクドライブを設定

/etc/fstab　の最後に追加
```
tmpfs   /tmp    tmpfs   defaults,size=64m,noatime,mode=1777     0       0 
```

```
sudo rm -rf /tmp
```
この後再起動。

### /etc/nginx/nginx.conf　再び設定

rtmp の部分を次のように変更

```
rtmp {
   server {
      listen 1935;
      chunk_size 4096;

      application live {
         live on;
         record off;
      }
      application hls {
         live on;
         record off;
         hls on;
         hls_path /tmp/hls;
         hls_fragment 10s;
      }
      application dash {
         live on;
         record off;
         dash on;
         dash_path /tmp/dash;
         dash_fragment 10s;
      }

   }
}
```

### さらに設定追加

#### /etc/nginx/sites-available/default

はじめのほうで記述したものに更に追加。

```
        location /stat {
                rtmp_stat all;
                rtmp_stat_stylesheet /stat.xsl;
        }

        location /stat.xsl {
                root html;
        }
        location /hls {
            types {
                 application/vnd.apple.mpegurl m3u8;
            }
            root /tmp/;
        }
        location /dash {
            types {
                 application/vnd.apple.mpegurl mpd;
            }
            root /tmp/;
        }
```


### プレーヤー（HLS）
以下のファイルを live_hls.html として /var/www/html に配置
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

### プレーヤー（MPEG DASH）
以下のファイルを live_dash.html として /var/www/html に配置
```
<!DOCTYPE html>
<html>
<head>
  <title>RTMP to MPEG-DASH</title>
  <meta charset="UTF-8">
  <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
  <style>
    video {
      width: 640px;
      height: 360px;
    }
  </style>
</head>

<body>
  <div>
    <video data-dashjs-player autoplay src="dash/live.mpd" controls></video>
  </div>
</body>

</html>
```