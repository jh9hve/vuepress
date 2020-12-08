(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{359:function(a,t,s){"use strict";s.r(t);var e=s(42),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"raspberry-pi"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#raspberry-pi"}},[a._v("#")]),a._v(" Raspberry Pi")]),a._v(" "),s("h2",{attrs:{id:"raspberry-pi-os"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#raspberry-pi-os"}},[a._v("#")]),a._v(" Raspberry Pi OS")]),a._v(" "),s("p",[a._v("Raspberry Pi OS (previously called Raspbian) をインストール"),s("br"),a._v("\nRaspberry Pi OS (32-bit) Lite　にした。デスクトップはいらないので・・・")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("Version:August 2020\nRelease date:2020-08-20\nKernel version:5.4\nSize:435 MB\n")])])]),s("p",[a._v("まず")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("sudo raspi-config\n")])])]),s("p",[a._v("を立ち上げ、５番（バージョンで変わるかも）のInterfacing Options で SSH を有効に"),s("br"),a._v("\nホスト名も設定しても良いかも")]),a._v(" "),s("p",[a._v("dhcpcd.conf　で有線LANを固定IPの設定にしたいのだが、\neth0 がインターフェース名にならず env(mac address) がインターフェース名になってしまうので"),s("br"),a._v('\n/lib/udev/rules.d/73-usb-net-by-mac.rules\nの該当箇所を eth0 に書き換える。（NAME="eth0"）'),s("br"),a._v("\n再起動すると ssh で接続できるので以後はリモートで。")]),a._v(" "),s("p",[a._v("（この現象は3Bで上記のOSのときに起こった。）")]),a._v(" "),s("p",[a._v("追記：2020 12.02 Ver　のOSでRasPi4ではこの現象はおきずに eth0が普通に有効になった。")]),a._v(" "),s("h2",{attrs:{id:"nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx"}},[a._v("#")]),a._v(" nginx")]),a._v(" "),s("p",[a._v("sudo apt install nginx")]),a._v(" "),s("p",[a._v("sudo systemctl start nginx で起動確認（インストールしただけで起動されるようなのでこれは不要）")]),a._v(" "),s("h2",{attrs:{id:"rtmp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rtmp"}},[a._v("#")]),a._v(" rtmp")]),a._v(" "),s("p",[a._v("sudo apt install libnginx-mod-rtmp")]),a._v(" "),s("h3",{attrs:{id:"etc-nginx-nginx-conf"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#etc-nginx-nginx-conf"}},[a._v("#")]),a._v(" /etc/nginx/nginx.conf")]),a._v(" "),s("p",[a._v("最後に次を追加するとOBSから受け取れる。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("rtmp {\n   server {\n      listen 1935;\n      chunk_size 4096;\n\n      application live {\n         live on;\n         record off;\n      }\n   }\n}\n")])])]),s("h3",{attrs:{id:"obs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#obs"}},[a._v("#")]),a._v(" OBS")]),a._v(" "),s("p",[a._v("配信のサーバーを　rtmp://192.168.11.81/live （192.168.11.81 のところは環境に合わせる）")]),a._v(" "),s("p",[a._v("ストリームキーを　live")]),a._v(" "),s("h3",{attrs:{id:"プレーヤー-flash"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#プレーヤー-flash"}},[a._v("#")]),a._v(" プレーヤー (FLASH)")]),a._v(" "),s("p",[a._v("以下のファイルを live.html として /var/www/html に配置")]),a._v(" "),s("p",[a._v("192.168.11.81 のところは環境に合わせる。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('<!DOCTYPE html>\n<html>\n\n<head>\n  <title>Videojs 7 + RTMP  (flash)</title>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/video.js/7.6.5/video-js.min.css" />\n  <script src="//cdnjs.cloudflare.com/ajax/libs/video.js/7.6.5/video.min.js"><\/script>\n  <script src="//cdnjs.cloudflare.com/ajax/libs/videojs-flash/2.1.2/videojs-flash.min.js"><\/script>\n  <script src="//cdn.jsdelivr.net/npm/videojs-flashls-source-handler@1.1.2/dist/videojs-flashls-source-handler.min.js"><\/script>\n</head>\n\n<body>\n  <video class="video-js vjs-default-skin" id="video-container" controls muted autoplay >\n    <source src="rtmp://192.168.11.81/live/live" type="rtmp/mp4">\n  </video>\n</body>\n<script>\n  var options = {\n    flash: {\n      swf: \'//cdnjs.cloudflare.com/ajax/libs/videojs-swf/5.4.2/video-js.swf\'\n    },\n    fluid: true\n  };\n  var player = videojs(\'video-container\', options);\n<\/script>\n\n</html>\n')])])]),s("h3",{attrs:{id:"プレーヤー-vlcメディアプレーヤー"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#プレーヤー-vlcメディアプレーヤー"}},[a._v("#")]),a._v(" プレーヤー VLCメディアプレーヤー")]),a._v(" "),s("p",[a._v("メディア　ネットワークストリームを開く　で次を指定（192.168.11.81の所は環境に合わせる）")]),a._v(" "),s("p",[a._v("rtmp://192.168.11.81/live/live")]),a._v(" "),s("h3",{attrs:{id:"stat"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stat"}},[a._v("#")]),a._v(" stat")]),a._v(" "),s("p",[a._v("apt でインストールした場合 stat がないので次のようにした。")]),a._v(" "),s("h4",{attrs:{id:"etc-nginx-sites-available-default"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#etc-nginx-sites-available-default"}},[a._v("#")]),a._v(" /etc/nginx/sites-available/default")]),a._v(" "),s("p",[a._v("次を server { } の中の適当なところに追加（正規のやりかたは違うかも・・・）")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("        location /stat {\n                rtmp_stat all;\n                rtmp_stat_stylesheet /stat.xsl;\n        }\n\n        location /stat.xsl {\n                root html;\n        }\n\n")])])]),s("h4",{attrs:{id:"stat-xsl"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stat-xsl"}},[a._v("#")]),a._v(" stat.xsl")]),a._v(" "),s("p",[a._v("/usr/share/nginx/html/")]),a._v(" "),s("p",[a._v("にコピー。（stat.xsl はdockerにあったものをusbメモリにて）")]),a._v(" "),s("h3",{attrs:{id:"swap-を無効に-micro-sd-を長持ちさせるため"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#swap-を無効に-micro-sd-を長持ちさせるため"}},[a._v("#")]),a._v(" swap を無効に　（micro sd を長持ちさせるため）")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("sudo systemctl stop dphys-swapfile\nsudo systemctl disable dphys-swapfile\n")])])]),s("p",[a._v("再起動して　free　コマンドで確認すると swap が 0 になっている。")]),a._v(" "),s("h3",{attrs:{id:"いらないログを出力しない。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#いらないログを出力しない。"}},[a._v("#")]),a._v(" いらないログを出力しない。")]),a._v(" "),s("p",[a._v("/etc/rsyslog.conf")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("#lpr.*                          -/var/log/lpr.log\n#mail.*                         -/var/log/mail.log\n\n#mail.info                      -/var/log/mail.info\n#mail.warn                      -/var/log/mail.warn\n#mail.err                       /var/log/mail.err\n\n#*.=debug;\\\n#       auth,authpriv.none;\\\n#       news.none;mail.none     -/var/log/debug\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("sudo systemctl restart rsyslog\n")])])]),s("h3",{attrs:{id:"hls-mpeg-dash-用に-ramディスクドライブを設定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hls-mpeg-dash-用に-ramディスクドライブを設定"}},[a._v("#")]),a._v(" hls mpeg_dash 用に ramディスクドライブを設定")]),a._v(" "),s("p",[a._v("/etc/fstab　の最後に追加")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("tmpfs   /tmp    tmpfs   defaults,size=64m,noatime,mode=1777     0       0 \n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("sudo rm -rf /tmp\n")])])]),s("p",[a._v("この後再起動。")]),a._v(" "),s("h3",{attrs:{id:"etc-nginx-nginx-conf-再び設定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#etc-nginx-nginx-conf-再び設定"}},[a._v("#")]),a._v(" /etc/nginx/nginx.conf　再び設定")]),a._v(" "),s("p",[a._v("rtmp の部分を次のように変更")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("rtmp {\n   server {\n      listen 1935;\n      chunk_size 4096;\n\n      application live {\n         live on;\n         record off;\n      }\n      application hls {\n         live on;\n         record off;\n         hls on;\n         hls_path /tmp/hls;\n         hls_fragment 10s;\n      }\n      application dash {\n         live on;\n         record off;\n         dash on;\n         dash_path /tmp/dash;\n         dash_fragment 10s;\n      }\n\n   }\n}\n")])])]),s("h3",{attrs:{id:"さらに設定追加"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#さらに設定追加"}},[a._v("#")]),a._v(" さらに設定追加")]),a._v(" "),s("h4",{attrs:{id:"etc-nginx-sites-available-default-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#etc-nginx-sites-available-default-2"}},[a._v("#")]),a._v(" /etc/nginx/sites-available/default")]),a._v(" "),s("p",[a._v("はじめのほうで記述したものに更に追加。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("        location /stat {\n                rtmp_stat all;\n                rtmp_stat_stylesheet /stat.xsl;\n        }\n\n        location /stat.xsl {\n                root html;\n        }\n        location /hls {\n            types {\n                 application/vnd.apple.mpegurl m3u8;\n            }\n            root /tmp/;\n        }\n        location /dash {\n            types {\n                 application/vnd.apple.mpegurl mpd;\n            }\n            root /tmp/;\n        }\n")])])]),s("h3",{attrs:{id:"プレーヤー-hls"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#プレーヤー-hls"}},[a._v("#")]),a._v(" プレーヤー（HLS）")]),a._v(" "),s("p",[a._v("以下のファイルを live_hls.html として /var/www/html に配置")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('<!DOCTYPE html>\n<html>\n\n<head>\n  <meta charset="utf-8">\n  <title>MediaElement</title>\n  \x3c!-- MediaElement style --\x3e\n  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.css" />\n</head>\n\n<body>\n  \x3c!-- MediaElement --\x3e\n  <script src="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.js"><\/script>\n\n  <video id="player" width="640" height="360">\n</body>\n<script type="text/javascript">\n\n      var player = new MediaElementPlayer(\'player\', {\n        success: function(mediaElement, originalNode) {\n          console.log("Player initialised");\n        }\n      });\n        player.setSrc("hls/live.m3u8");\n<\/script>\n\n</html>\n')])])]),s("h3",{attrs:{id:"プレーヤー-mpeg-dash"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#プレーヤー-mpeg-dash"}},[a._v("#")]),a._v(" プレーヤー（MPEG DASH）")]),a._v(" "),s("p",[a._v("以下のファイルを live_dash.html として /var/www/html に配置")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('<!DOCTYPE html>\n<html>\n<head>\n  <title>RTMP to MPEG-DASH</title>\n  <meta charset="UTF-8">\n  <script src="https://cdn.dashjs.org/latest/dash.all.min.js"><\/script>\n  <style>\n    video {\n      width: 640px;\n      height: 360px;\n    }\n  </style>\n</head>\n\n<body>\n  <div>\n    <video data-dashjs-player autoplay src="dash/live.mpd" controls></video>\n  </div>\n</body>\n\n</html>\n')])])])])}),[],!1,null,null,null);t.default=n.exports}}]);