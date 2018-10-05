/**
 *
 * @title table 导出使用案例
 * @description 在table直接导出表格内容为excel，table 目前不支持直接设置Id属性。
 */

import React, {Component} from 'react';
import {Table, Tooltip, Button, Icon} from 'tinper-bee';
import ExportExcel from '../../src/index';


const columns = [
  {
    title: "用户名", dataIndex: "a", key: "a", width: 80, className: "rowClassName",
    render: (text, record, index) => {
      return (
        <Tooltip inverse overlay={text}>
          <span tootip={text} style={{
            display: "inline-block",
            width: "100px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}>{text}</span>
        </Tooltip>
      );
    }
  },
  {id: "123", title: "性别", dataIndex: "b", key: "b", width: 100},
  {title: "年龄", dataIndex: "c", key: "c", width: 200},
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    render(text, record, index) {
      return (
        <div style={{position: 'relative'}} title={text}>
          <a
            href="javascript:;"
            tooltip={text}
            onClick={() => {
              alert('这是第' + index + '列，内容为:' + text);
            }}
          >
            一些操作
          </a>
        </div>
      );
    }
  }
];

const data = [
  {a: "令狐冲", b: "男", c: 41, d: "操作", key: "1"},
  {a: "杨过叔叔的女儿黄蓉", b: "男", c: 67, d: "操作", key: "2"},
  {a: "郭靖", b: "男", c: 25, d: "操作", key: "3"}
];

class Demo1 extends Component {
  render() {
    return (
      <div className="demoPadding">
        <ExportExcel tableId="paginationTableId" container={this.paginationTableIdRef}>
          <Button><Icon type="uf-download"/>导出</Button>
        </ExportExcel>

        <div id="paginationTableId">
          <Table ref={c => this.paginationTableIdRef = c}
                 columns={columns}
                 data={data}
                 onRowClick={(record, index, indent) => {
                   this.setState({
                     selectedRowIndex: index
                   });
                 }}
          />
        </div>
      </div>
    )
  }
}

export default Demo1;
