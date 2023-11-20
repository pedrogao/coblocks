#!/bin/sh

# 设置目录变量
dirA="../access"
dirB="../core"
dirC="./pb"

# 创建软链接
ln -s $(realpath $dirC) $dirA/src/pb
ln -s $(realpath $dirC) $dirB/src/pb
