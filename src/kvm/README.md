# KVM

BIOSの仮想化を有効に
CentOS7をインストールして yum -y update を行い reboot


## KVMのインストール
```
yum install qemu-kvm
yum install libvirt
yum install virt-install

systemctl start libvirtd
systemctl enable libvirtd
```

## ブリッジネットワークの設定

```
# nmcli con
NAME    UUID                                  TYPE      DEVICE 
enp2s0  a8a9908c-bc06-415d-9482-16b9983026cd  ethernet  enp2s0 
virbr0  5e862296-f6fa-4d92-850e-69373f98964e  bridge    virbr0
```

上の enp2s0 と下の IPアドレスは、環境に合わせる。

```
nmcli con add type bridge ifname br0
nmcli con modify bridge-br0 bridge.stp no
nmcli con modify bridge-br0 ipv4.method manual ipv4.address "192.168.11.78/24" ipv4.gateway "192.168.11.1"
nmcli con add type bridge-slave ifname enp2s0 master bridge-br0
nmcli con del enp2s0; systemctl restart network
```

上の最後の行を実行すると SSH の場合、一旦切れるがしばらく待つと再接続するようだ。しないようなら実機のコンソールで。


## 仮想マシン（ゲストマシン）の作成

scp CentOS-7-x86_64-Minimal-2009.iso 192.168.11.90:~/　
でイメージをコピーして /kvm/iso に移動（ディレクトリ作ってから）、または直接 wget あたりで取ってくる。

/kvm/images ディレクトリも作り、
chown -R qemu:qemu kvm

その後

```
virt-install \
--name=cent7 \
--os-variant centos7.0 \
--location=/kvm/iso/CentOS-7-x86_64-Minimal-2009.iso \
--disk path=/kvm/images/cent7.qcow2,size=10,format=qcow2 \
--vcpus=1 --ram=2048 \
--network bridge=br0 \
--graphics none \
--extra-args="console=tty0 console=ttyS0,115200n8"
```

ゲストマシンを破棄するときは、
```
virsh undefine cent7
rm /kvm/images/centos.qcow2
```


## ゲストOSの自動停止と自動起動

yum install libvirt-client だが、すでに以前のパッケージで必要なためインスト済みのようだ。

vi /etc/sysconfig/libvirt-guests で次のように変更（該当の行のコメントをはずす）。

```
ON_BOOT=start
ON_SHUTDOWN=suspend
```

そして
```
systemctl start libvirt-guests
systemctl enable libvirt-guests
```