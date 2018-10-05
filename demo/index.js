
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import './demo.scss';
const pkg = require('../package.json')




const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";
var DemoArray = [{"example":<Demo1 />,"title":" table 导出使用案例","code":"/**\n *\n * @title table 导出使用案例\n * @description 在table直接导出表格内容为excel，table 目前不支持直接设置Id属性。\n */\n\nimport React, {Component} from 'react';\nimport {Table, Tooltip, Button, Icon} from 'tinper-bee';\nimport ExportExcel from '../../src/index';\n\n\nconst columns = [\n  {\n    title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 80, className: \"rowClassName\",\n    render: (text, record, index) => {\n      return (\n        <Tooltip inverse overlay={text}>\n          <span tootip={text} style={{\n            display: \"inline-block\",\n            width: \"100px\",\n            textOverflow: \"ellipsis\",\n            overflow: \"hidden\",\n            whiteSpace: \"nowrap\",\n            verticalAlign: \"middle\",\n          }}>{text}</span>\n        </Tooltip>\n      );\n    }\n  },\n  {id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100},\n  {title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200},\n  {\n    title: \"操作\",\n    dataIndex: \"d\",\n    key: \"d\",\n    render(text, record, index) {\n      return (\n        <div style={{position: 'relative'}} title={text}>\n          <a\n            href=\"javascript:;\"\n            tooltip={text}\n            onClick={() => {\n              alert('这是第' + index + '列，内容为:' + text);\n            }}\n          >\n            一些操作\n          </a>\n        </div>\n      );\n    }\n  }\n];\n\nconst data = [\n  {a: \"令狐冲\", b: \"男\", c: 41, d: \"操作\", key: \"1\"},\n  {a: \"杨过叔叔的女儿黄蓉\", b: \"男\", c: 67, d: \"操作\", key: \"2\"},\n  {a: \"郭靖\", b: \"男\", c: 25, d: \"操作\", key: \"3\"}\n];\n\nclass Demo1 extends Component {\n  render() {\n    return (\n      <div className=\"demoPadding\">\n        <ExportExcel tableId=\"paginationTableId\" container={this.paginationTableIdRef}>\n          <Button><Icon type=\"uf-download\"/>导出</Button>\n        </ExportExcel>\n\n        <div id=\"paginationTableId\">\n          <Table ref={c => this.paginationTableIdRef = c}\n                 columns={columns}\n                 data={data}\n                 onRowClick={(record, index, indent) => {\n                   this.setState({\n                     selectedRowIndex: index\n                   });\n                 }}\n          />\n        </div>\n      </div>\n    )\n  }\n}\n\n\n","desc":" 在table直接导出表格内容为excel，table 目前不支持直接设置Id属性。"},{"example":<Demo2 />,"title":" table 导出有样式案例","code":"/**\n * @title table 导出有样式案例\n * @description table的tr、th和td有style属性。\n */\n\nimport React, { Component } from 'react';\nimport { Button, FormControl, Icon } from 'tinper-bee';\nimport Form from 'bee-form';\nimport DatePicker from 'bee-datepicker';\nimport moment from 'moment';\nimport 'bee-datepicker/build/DatePicker.css';\nimport ExportExcel from '../../src/index';\n\nconst format = 'YYYY-MM-DD';\n\nclass Demo2 extends Component {\n  constructor(props) { // 如果不需要state可不写\n    super(props);\n    this.state = {};\n  }\n\n  render() {\n    const { getFieldProps } = this.props.form;\n    return (\n      <div className=\"demo2\">\n        <Form className=\"initForm\">\n          <table border=\"1\" cellSpacing=\"0\" className=\"tableMin\" id=\"demo2Table\">\n            <tbody>\n              <tr style={{ color: '#fff', textAlign: 'center' }}>\n                <td colSpan=\"5\" className=\"headerTitle\" style={{ backgroundColor: '#ff00ff' }}>\n                  <div>工程变更申请</div>\n                  <div className=\"headerAction\">\n                    <ExportExcel tableId=\"demo2Table\" fileName=\"demo2\">\n                      <Button>\n                        <Icon type=\"uf-download\" />\n                        <span>导出</span>\n                      </Button>\n                    </ExportExcel>\n                  </div>\n                </td>\n              </tr>\n              <tr>\n                <td>主题</td>\n                <td colSpan=\"4\">\n                  <FormControl {...getFieldProps('title', { initialValue: '' })} />\n                </td>\n              </tr>\n              <tr>\n                <td>流程申请编号</td>\n                <td colSpan=\"4\">\n                  <FormControl {...getFieldProps('applyCode', { initialValue: '' })} />\n                </td>\n              </tr>\n              <tr>\n                <td>供应商编码</td>\n                <td>\n                  <FormControl {...getFieldProps('vendorCode', { initialValue: '' })} />\n                </td>\n                <td>供应商名称</td>\n                <td colSpan=\"2\">\n                  <FormControl {...getFieldProps('vendorName', { initialValue: '' })} />\n                </td>\n              </tr>\n              <tr>\n                <td>物料编码</td>\n                <td>\n                  <FormControl {...getFieldProps('materialCode', { initialValue: '' })} />\n                </td>\n                <td>物品名称</td>\n                <td colSpan=\"2\">\n                  <FormControl {...getFieldProps('materialDesc', { initialValue: '' })} />\n                </td>\n              </tr>\n              <tr>\n                <td>规格型号</td>\n                <td>\n                  <FormControl {...getFieldProps('xingh', { initialValue: '' })} />\n                </td>\n                <td>适用机型</td>\n                <td colSpan=\"2\">\n                  <FormControl {...getFieldProps('model', { initialValue: '' })} />\n                </td>\n              </tr>\n              <tr>\n                <td>提交申请日期</td>\n                <td>\n                  <DatePicker\n                    className=\"form-item\"\n                    format={format}\n                    {...getFieldProps('createTime', {\n                      initialValue: moment(),\n                    })}\n                  />\n                </td>\n                <td>申请实施日期</td>\n                <td colSpan=\"2\">\n                  <DatePicker\n                    className=\"form-item\"\n                    format={format}\n                    {...getFieldProps('updateTime', {\n                      initialValue: moment(),\n                    })}\n                  />\n                </td>\n              </tr>\n              <tr>\n                <td>申请人</td>\n                <td colSpan=\"4\">\n                  <FormControl {...getFieldProps('applyUserCode', { initialValue: '' })} />\n                </td>\n              </tr>\n              <tr>\n                <td rowSpan=\"2\">变更内容</td>\n                <td colSpan=\"2\" style={{ backgroundColor: '#b7a92f', color: '#fff' }}>变更前(必要时附件)</td>\n                <td colSpan=\"2\" style={{ backgroundColor: '#b7a92f', color: '#fff' }}>变更后(必要时附件)</td>\n              </tr>\n              <tr>\n                <td colSpan=\"2\">\n                  <textarea\n                    className=\"u-form-control textSty\"\n                    {...getFieldProps('alterFront', { initialValue: '' })}\n                  />\n                </td>\n                <td colSpan=\"2\">\n                  <textarea\n                    className=\"u-form-control textSty\"\n                    {...getFieldProps('alterAfter', { initialValue: '' })}\n                  />\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <span>工程变更接收人</span>\n                  <br />\n                  <span>（品类经理）</span>\n                </td>\n                <td colSpan=\"4\">\n                  <textarea\n                    className=\"u-form-control textSty\"\n                    {...getFieldProps('recipientUserCode', { initialValue: '' })}\n                  />\n                </td>\n              </tr>\n              <tr>\n                <td>说明</td>\n                <td colSpan=\"4\">\n                  <FormControl\n                    {...getFieldProps('wholeValidateDesc', { initialValue: '' })}\n                  />\n                </td>\n              </tr>\n              <tr>\n                <td>监查预设问题</td>\n                <td colSpan=\"4\">\n                  <textarea\n                    className=\"u-form-control textSty\"\n                    {...getFieldProps('preProblem', { initialValue: '' })}\n                  />\n                </td>\n              </tr>\n              <tr>\n                <td>其他要素</td>\n                <td colSpan=\"4\">\n                  <textarea\n                    className=\"u-form-control textSty\"\n                    {...getFieldProps('otherElement', { initialValue: '' })}\n                  />\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </Form>\n      </div>\n    );\n  }\n}\n\n\n","desc":" table的tr、th和td有style属性。"}]


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
