/* eslint-disable react/require-default-props,no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'bee-button';
import Icon from 'bee-icon';
import './index.scss';

const propTypes = {
  tableId: PropTypes.string, // tableID
  fileName: PropTypes.string, // 导出文件的名字
  worksheet: PropTypes.string, // 导出工作簿名字
  className: PropTypes.string,
  title: PropTypes.string, // 名称标题
  filterElement: PropTypes.array, // 过滤元素
};

const defaultProps = {
  tableId: '',
  fileName: 'filename',
  worksheet: 'worksheet',
  title: '导出',
  filterElement: ['button'],
};

class ExportExcel extends Component {
  toExportExcel = () => {
    const { tableId, fileName, worksheet } = this.props;
    if (this.getExplorer() === 'ie') {
      // 创建AX对象excel
      const curTbl = document.getElementById(tableId).cloneNode(true);
      let oXL = new ActiveXObject('Excel.Application');
      const oWB = oXL.Workbooks.Add(); // 获取workbook对象
      const xlSheet = oWB.Worksheets(1); // 激活当前sheet
      const sel = document.body.createTextRange(); // 把表格中的内容移到TextRange中
      sel.moveToElementText(curTbl);
      sel.select;// 全选TextRange中内容
      sel.execCommand('Copy');// 复制TextRange中内容
      xlSheet.Paste(); // 粘贴到活动的EXCEL中
      oXL.Visible = true; // 设置excel可见属性
      let fName = null;
      try {
        fName = oXL.Application.GetSaveAsFilename('Excel.xls', 'Excel Spreadsheets (*.xls), *.xls');
      } catch (e) {
        console.log(`Nested catch caught ${e}`);
      } finally {
        oWB.SaveAs(fName);
        oWB.Close(savechanges = false);
        oXL.Quit();
        oXL = null;
        // 下面代码用于解决IE call Excel的一个BUG, MSDN中提供的方法:
        // setTimeout(CollectGarbage, 1);
        // 由于不能清除(或同步)网页的受信任状态, 所以将导致SaveAs()等方法在
        // 下次调用时无效.
        location.reload();
      }
    } else {
      this.tableToExcel(tableId, fileName, worksheet);
    }
  }


  traverseNodes = (node, newTd) => {
    if (node.hasChildNodes) {
      const sonNodes = node.childNodes;
      const { filterElement } = this.props;
      for (const sonNode of sonNodes) {
        if (!filterElement.includes(sonNode.nodeName.toLowerCase())) { // 对不必要对element过滤
          this.traverseNodes(sonNode, newTd);
        }
      }
    }

    return this.display(node, newTd);
  }

  display = (node, newTd) => {
    const { nodeName, nodeValue } = node;
    const newSpan = document.createElement('span');
    newSpan.innerText = nodeValue;
    if (nodeName === 'INPUT' || nodeName === 'TEXTAREA') { // 对 input 处理
      const { type, checked, value } = node;
      newSpan.innerText = value;
      if (type === 'radio' || type === 'checkbox') {
        newSpan.innerText = type === 'radio' ? (checked ? '●' : '○') : (checked ? '■' : '□');
        newSpan.style.fontSize = '20px';
        newSpan.style.paddingLeft = '15px';
      }
    }
    if (node.nodeName === 'IMG') { // 对图片特殊处理
      newTd.appendChild(node);
    }
    if (newSpan.innerText.trim()) {
      newTd.appendChild(newSpan);
    }
    return newTd;
  }

  /**
   * 拼接导出字符串，以及格式样式处理
   */
  tableToExcel = (tableId, fileName, worksheet) => {
    const table = document.getElementById(tableId).cloneNode(true);

    const uri = 'data:application/vnd.ms-excel;base64,';
    // 定义文档的类型
    const template = '<html><head><meta charset="UTF-8"></head><body><table  border="1">{table}</table></body></html>';
    const base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    // 将template中的变量替换为页面内容ctx获取到的值
    const format = function (s, c) {
      return s.replace(/{(\w+)}/g, (m, p) => c[p]);
    };
    const newTable = document.createElement('table');
    const trArray = table.getElementsByTagName('tr');
    for (const trItem of trArray) {
      const newTr = trItem.cloneNode(true);
      newTr.innerHTML = '';
      const thArray = trItem.getElementsByTagName('th');
      const tdArray = trItem.getElementsByTagName('td');
      for (const thItem of thArray) { // 处理th元素
        const newTh = thItem.cloneNode();
        newTh.innerHTML = '';
        this.traverseNodes(thItem, newTh);
        newTh.style.width = '250px';
        newTh.style.fontSize = '18px';
        newTh.style.backgroundColor = '#F7F7F7';
        newTr.appendChild(newTh);
      }
      for (const tdItem of tdArray) { // 处理td元素
        const newTd = tdItem.cloneNode(true);
        newTd.innerHTML = '';
        this.traverseNodes(tdItem, newTd);
        newTd.style.width = '250px';
        newTd.style.fontSize = '18px';
        newTr.appendChild(newTd);
      }
      if (!['●', '○', '■', '□'].includes(newTr.innerText)) { // 对tr 中innerText等于'●', '○', '■', '□'元素过滤
        newTable.appendChild(newTr);
      }
    }
    const ctx = { worksheet, table: newTable.innerHTML }; // 获取表单的名字和表单查询的内容
    const a = document.createElement('a'); // 虚拟一个a 标签
    // format()函数：通过格式操作使任意类型的数据转换成一个字符串
    // base64()：进行编码
    a.href = uri + base64(format(template, ctx));
    a.download = `${fileName}.xls`;// 设置文件的名字
    a.click();// 下载
  }

  // 获取当前浏览器
  getExplorer = () => {
    const explorer = window.navigator.userAgent;
    if (explorer.indexOf('MSIE') >= 0) { // ie
      return 'ie';
    }
    if (explorer.indexOf('Firefox') >= 0) { // firefox
      return 'Firefox';
    }
    if (explorer.indexOf('Chrome') >= 0) { // Chrome
      return 'Chrome';
    }
    if (explorer.indexOf('Opera') >= 0) { // Opera
      return 'Opera';
    }
    if (explorer.indexOf('Safari') >= 0) { // Safari
      return 'Safari';
    }
  }

  render() {
    const { className, children, title } = this.props;
    return (
      <div className={className || ''} onClick={this.toExportExcel}>
        {
          children || (
          <Button size="sm">
            <Icon type="uf-download" />
            {title}
          </Button>
          )
        }
      </div>
    );
  }
}

ExportExcel.propTypes = propTypes;
ExportExcel.defaultProps = defaultProps;

export default ExportExcel;
