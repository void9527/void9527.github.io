---
outline: deep
---
# [原文](https://blog.csdn.net/qq_32261399/article/details/76651785)

## LXC:其名称来自Linux软件容器（Linux Containers）

- 一种操作系统层虚拟化（Operating system–level virtualization）技术，为Linux内核容器功能的一个用户空间接口。它将应用软件系统打包成一个软件容器（Container），内含应用软件本身的代码，以及所需要的操作系统核心和库。通过统一的名字空间和共用API来分配不同软件容器的可用硬件资源，创造出应用程序的独立沙箱运行环境，使得Linux用户可以容易的创建和管理系统或应用容器。
- 在Linux内核中，提供了`cgroups`功能，来达成资源的区隔化。它同时也提供了名称空间区隔化的功能，使应用程序看到的操作系统环境被区隔成独立区间，包括进程树，网络，用户id，以及挂载的文件系统。但是cgroups并不一定需要引导任何虚拟机。
- LXC利用cgroups与名称空间的功能，提供应用软件一个独立的操作系统环境。
- LXC不需要Hypervisor这个软件层，软件容器（Container）本身极为轻量化，提升了创建虚拟机的速度。软件Docker被用来管理LXC的环境。

## LXD:可以视作LXC的升级版

- LXD的管理命令和LXC的管理命令大多相同
- LXD很好地解决了这些问题LXC的一些缺点，比如无法有效支持跨主机之间的容器迁移、管理复杂。
- LXC只是单机的命令行工具，没有daemon进程，所以它无法提供REST API，也无法有效支持跨主机之间的容器迁移。
- LXC的命令也太底层，普通用户无法理解
- LXD作为一个daemon进程弥补了上述问题，让LXC更易用。

## KVM:基于内核的虚拟机（Kernel-based Virtual Machine，缩写为 KVM）

- 是一种用于Linux内核中的虚拟化基础设施，可以将Linux内核转化为一个`hypervisor`。KVM在2007年2月被导入Linux 2.6.20核心中，以可加载核心模块的方式被移植到`FreeBSD`及`illumos`上。
- KVM在具备Intel VT或AMD-V功能的x86平台上运行。它也被移植到S/390，PowerPC与IA-64平台上。在Linux内核3.9版中，加入ARM架构的支持。
- KVM目前由Red Hat等厂商开发，对CentOS/Fedora/RHEL等Red Hat系发行版支持极佳.
- KVM是开源软件，全称是kernel-based virtual machine（基于内核的虚拟机）。
- 是x86架构且硬件支持虚拟化技术（如 intel VT 或 AMD-V）的Linux全虚拟化解决方案。
- 它包含一个为处理器提供底层虚拟化 可加载的核心模块kvm.ko（kvm-intel.ko或kvm-AMD.ko）。
- KVM还需要一个经过修改的`QEMU`软件（qemu-kvm），作为虚拟机上层控制和界面。
- KVM能在不改变linux或windows镜像的情况下同时运行多个虚拟机，（它的意思是多个虚拟机使用同一镜像）并为每一个虚拟机配置个性化硬件环境（网卡、磁盘、图形适配器……）同时KVM还能够使用ksm技术帮助宿主服务器节约内存。
- 在主流的Linux内核，如2.6.20以上的内核均已包含了KVM核心。

## [Docker](/engineering/docker.html#安装-docker)

- Docker是一个开放源代码软件项目，让应用程序布署在软件容器下的工作可以自动化进行，借此在Linux操作系统上，提供一个额外的软件抽象层，以及操作系统层虚拟化的自动管理机制。Docker利用Linux核心中的资源分脱机制，例如cgroups，以及Linux核心名字空间（name space），来创建独立的软件容器（containers）。这可以在单一Linux实体下运作，避免引导一个虚拟机造成的额外负担[2]。Linux核心对名字空间的支持完全隔离了工作环境中应用程序的视野，包括进程树、网络、用户ID与挂载文件系统，而核心的cgroup提供资源隔离，包括CPU、内存、block I/O与网络。从0.9版本起，Dockers在使用抽象虚拟是经由libvirt的 LXC与systemd - nspawn提供界面的基础上，开始包括libcontainer库做为以自己的方式开始直接使用由Linux核心提供的虚拟化的设施，“Dockers是有能力打包应用程序及其虚拟容器，可以在任何Linux服务器上运行的依赖性工具，这有助于实现灵活性和便携性，应用程序在任何地方都可以运行，无论是公有云、私有云、单机等。”

## kubernetes (通常称为K8s)

- 是一个开源系统，它可以被用于自动部署，扩展和管理容器化（containerized）应用程序。这个系统是最初是由 Google设计并捐赠给Cloud Native Computing Foundation来使用的。它旨在提供“跨主机集群的自动部署、扩展以及运行应用程序容器的平台”。它支持一系列容器工具, 包括Docker等。
