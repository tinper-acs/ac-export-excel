
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import './demo.scss';
const pkg = require('../package.json')




const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" table 中导出使用案例","code":"/**\n *\n * @title table 中导出使用案例\n * @description 在table中直接导出表格内容为excel，table 目前不支持直接设置Id属性。\n */\n\nimport React, { Component } from 'react';\nimport { Table, Tooltip, Button,Icon } from 'tinper-bee';\nimport ExportExcel from '../../src/index';\n\n\nconst columns = [\n  {\n    title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 80, className: \"rowClassName\",\n    render: (text, record, index) => {\n      return (\n        <Tooltip inverse overlay={text}>\n          <span tootip={text} style={{\n            display: \"inline-block\",\n            width: \"100px\",\n            textOverflow: \"ellipsis\",\n            overflow: \"hidden\",\n            whiteSpace: \"nowrap\",\n            verticalAlign: \"middle\",\n          }}>{text}</span>\n        </Tooltip>\n      );\n    }\n  },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100 },\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 },\n  {\n    title: \"操作\",\n    dataIndex: \"d\",\n    key: \"d\",\n    render(text, record, index) {\n      return (\n        <div style={{ position: 'relative' }} title={text} >\n          <a\n            href=\"javascript:;\"\n            tooltip={text}\n            onClick={() => {\n              alert('这是第' + index + '列，内容为:' + text);\n            }}\n          >\n            一些操作\n              </a>\n        </div>\n      );\n    }\n  }\n];\n\nconst data = [\n  { a: \"令狐冲\", b: \"男\", c: 41, d: \"操作\", key: \"1\" },\n  { a: \"杨过叔叔的女儿黄蓉\", b: \"男\", c: 67, d: \"操作\", key: \"2\" },\n  { a: \"郭靖\", b: \"男\", c: 25, d: \"操作\", key: \"3\" }\n];\n\nclass Demo1 extends Component {\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <ExportExcel tableId=\"paginationTableId\" container={this.paginationTableIdRef}>\n                  <Button><Icon type=\"uf-download\" />导出</Button>\n                </ExportExcel>\n\n                <div id=\"paginationTableId\">\n                  <Table ref={c => this.paginationTableIdRef = c}\n                    \n                      columns={columns}\n                      data={data}\n                      onRowClick={(record, index, indent) => {\n                      this.setState({\n                          selectedRowIndex: index\n                      });\n                      }}\n                  />\n                </div>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 在table中直接导出表格内容为excel，table 目前不支持直接设置Id属性。"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ process.env.NODE_ENV==='development'?code:code.replace('../../src/index.js',pkg.name).replace('../../src/index',pkg.name) }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
