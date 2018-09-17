## ac-export-excel

```
$ ynpm install ac-export-excel --save

引入

import ExportExcel from 'ac-export-excel';

```
## 描述

当前导出组件，不依赖任何后台接口，仅是前端的导出下载功能。使用new ActiveXObject("Excel.Application") 功能 实现下载功能


## 效果  [预览](https://tinper-acs.github.io/ac-export-excel) 
 
 ![](media/15371866256103/15371866280681.jpg)


![](media/15371866256103/15371868201223.jpg)



## API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|id | dom 结构的ID |string| 必填项 |
|className |当前组件全局样式|string| -- |
|children |自定义内容 |element | -- |
       

## 开发调试

```sh
$ cd ac-export-excel

$ npm install

$ npm run dev

```

