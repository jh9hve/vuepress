(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{359:function(e,a,n){"use strict";n.r(a);var t=n(42),s=Object(t.a)({},(function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"nginx"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#nginx"}},[e._v("#")]),e._v(" Nginx")]),e._v(" "),n("h2",{attrs:{id:"インストール"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#インストール"}},[e._v("#")]),e._v(" インストール")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("sudo apt update\nsudo apt install nginx\nsudo apt install libnginx-mod-rtmp\n\nsystemctl start nginx\n")])])]),n("h1",{attrs:{id:"rtmp-flash用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rtmp-flash用"}},[e._v("#")]),e._v(" rtmp flash用")]),e._v(" "),n("h2",{attrs:{id:"etc-nginx-nginx-conf"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#etc-nginx-nginx-conf"}},[e._v("#")]),e._v(" /etc/nginx/nginx.conf")]),e._v(" "),n("p",[e._v("最後に次を追加するとOBSから受け取れる。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("rtmp {\n   server {\n      listen 1935;\n      chunk_size 4096;\n\n      application live {\n         live on;\n         record off;\n      }\n   }\n}\n")])])]),n("h2",{attrs:{id:"プレーヤー"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#プレーヤー"}},[e._v("#")]),e._v(" プレーヤー")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<!DOCTYPE html>\n<html>\n\n<head>\n  <title>Videojs 7 + RTMP  (flash)</title>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/video.js/7.6.5/video-js.min.css" />\n  <script src="//cdnjs.cloudflare.com/ajax/libs/video.js/7.6.5/video.min.js"><\/script>\n  <script src="//cdnjs.cloudflare.com/ajax/libs/videojs-flash/2.1.2/videojs-flash.min.js"><\/script>\n  <script src="//cdn.jsdelivr.net/npm/videojs-flashls-source-handler@1.1.2/dist/videojs-flashls-source-handler.min.js"><\/script>\n</head>\n\n<body>\n  <video class="video-js vjs-default-skin" id="video-container" controls muted autoplay >\n    <source src="rtmp://192.168.11.53/live/live" type="rtmp/mp4">\n  </video>\n</body>\n<script>\n  var options = {\n    flash: {\n      swf: \'//cdnjs.cloudflare.com/ajax/libs/videojs-swf/5.4.2/video-js.swf\'\n    },\n    fluid: true\n  };\n  var player = videojs(\'video-container\', options);\n<\/script>\n\n</html>\n')])])]),n("h1",{attrs:{id:"hls-mpegdash"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#hls-mpegdash"}},[e._v("#")]),e._v(" HLS MPEGDASH")]),e._v(" "),n("p",[e._v("https://qiita.com/MMaru76/items/e2495a87b871bc9cbefe")]),e._v(" "),n("h2",{attrs:{id:"nginx-conf"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#nginx-conf"}},[e._v("#")]),e._v(" nginx.conf")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("rtmp {\n   server {\n      listen 1935;\n      chunk_size 4096;\n\n      application live {\n         live on;\n         record off;\n\n         # HLSの記述欄\n         hls on;\n         hls_path /var/www/html/hls;\n         hls_fragment 10s;\n\n         # MEPG-DASHの記述欄\n         dash on;\n         dash_path /var/www/html/dash;\n         dash_fragment 10s;\n\n      }\n   }\n}\n\n")])])]),n("p",[e._v("html の下に追加")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("    server {\n#        listen  80;\n#        include mime.types;\n#        default_type    application/octet-stream;\n#        server_name localhost;\n#        add_header  Access-Control-Allow-Origin *;\n\n        location /hls {\n            types {\n                 application/vnd.apple.mpegurl m3u8;\n            }\n            root /var/www/html/;\n        }\n        location /dash {\n            types {\n                 application/vnd.apple.mpegurl mpd;\n            }\n            root /var/www/html/;\n        }\n    }\n\n")])])]),n("h2",{attrs:{id:"プレーヤー-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#プレーヤー-2"}},[e._v("#")]),e._v(" プレーヤー")]),e._v(" "),n("h3",{attrs:{id:"hls"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#hls"}},[e._v("#")]),e._v(" HLS")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<!DOCTYPE html>\n<html>\n\n<head>\n  <meta charset="utf-8">\n  <title>MediaElement</title>\n  \x3c!-- MediaElement style --\x3e\n  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.css" />\n</head>\n\n<body>\n  \x3c!-- MediaElement --\x3e\n  <script src="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.js"><\/script>\n\n  <video id="player" width="640" height="360">\n</body>\n<script type="text/javascript">\n\n      var player = new MediaElementPlayer(\'player\', {\n        success: function(mediaElement, originalNode) {\n          console.log("Player initialised");\n        }\n      });\n        player.setSrc("hls/live.m3u8");\n<\/script>\n\n</html>\n')])])]),n("h3",{attrs:{id:"mpeg-dash-うまくいってない"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mpeg-dash-うまくいってない"}},[e._v("#")]),e._v(" MPEG DASH うまくいってない")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<html>\n\n<head>\n  <meta charset="utf-8">\n  <title>MediaElement</title>\n  \x3c!-- MediaElement style --\x3e\n  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.css" />\n</head>\n\n<body>\n  \x3c!-- MediaElements --\x3e\n  <script src="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.js"><\/script>\n\n  <video id="player" width="640" height="360">\n</body>\n<script type="text/javascript">\n\n      var player = new MediaElementPlayer(\'player\', {\n        success: function(mediaElement, originalNode) {\n          console.log("Player initialised");\n        }\n      });\n        player.setSrc("dash/live.mpd");\n<\/script>\n\n</html>\n')])])]),n("h3",{attrs:{id:"mpeg-dash-うまくいった"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mpeg-dash-うまくいった"}},[e._v("#")]),e._v(" MPEG DASH うまくいった")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<head>\n  <title>RTMP to MPEG-DASH</title>\n  <meta charset="UTF-8">\n  <script src="https://cdn.dashjs.org/latest/dash.all.min.js"><\/script>\n  <style>\n    video {\n      width: 640px;\n      height: 360px;\n    }\n  </style>\n</head>\n\n<body>\n  <div>\n    \x3c!-- rtmp://localhost:1935/live/test に配信した際に生成される MPEG-DASH の URLを指定 --\x3e\n    <video data-dashjs-player autoplay src="dash/live.mpd" controls></video>\n  </div>\n</body>\n')])])])])}),[],!1,null,null,null);a.default=s.exports}}]);