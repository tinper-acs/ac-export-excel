/**
 * @title table 导出有样式案例
 * @description table的tr、th和td有style属性。
 */

import React, { Component } from 'react';
import { Button, FormControl, Icon } from 'tinper-bee';
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import moment from 'moment';
import 'bee-datepicker/build/DatePicker.css';
import ExportExcel from '../../src/index';

const format = 'YYYY-MM-DD';

class Demo2 extends Component {
  constructor(props) { // 如果不需要state可不写
    super(props);
    this.state = {};
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="demo2">
        <Form className="initForm">
          <table border="1" cellSpacing="0" className="tableMin" id="demo2Table">
            <tbody>
              <tr style={{ color: '#fff', textAlign: 'center' }}>
                <td colSpan="5" className="headerTitle" style={{ backgroundColor: '#ff00ff' }}>
                  <div>工程变更申请</div>
                  <div className="headerAction">
                    <ExportExcel tableId="demo2Table" fileName="demo2">
                      <Button>
                        <Icon type="uf-download" />
                        <span>导出</span>
                      </Button>
                    </ExportExcel>
                  </div>
                </td>
              </tr>
              <tr>
                <td>主题</td>
                <td colSpan="4">
                  <FormControl {...getFieldProps('title', { initialValue: '' })} />
                </td>
              </tr>
              <tr>
                <td>流程申请编号</td>
                <td colSpan="4">
                  <FormControl {...getFieldProps('applyCode', { initialValue: '' })} />
                </td>
              </tr>
              <tr>
                <td>供应商编码</td>
                <td>
                  <FormControl {...getFieldProps('vendorCode', { initialValue: '' })} />
                </td>
                <td>供应商名称</td>
                <td colSpan="2">
                  <FormControl {...getFieldProps('vendorName', { initialValue: '' })} />
                </td>
              </tr>
              <tr>
                <td>物料编码</td>
                <td>
                  <FormControl {...getFieldProps('materialCode', { initialValue: '' })} />
                </td>
                <td>物品名称</td>
                <td colSpan="2">
                  <FormControl {...getFieldProps('materialDesc', { initialValue: '' })} />
                </td>
              </tr>
              <tr>
                <td>规格型号</td>
                <td>
                  <FormControl {...getFieldProps('xingh', { initialValue: '' })} />
                </td>
                <td>适用机型</td>
                <td colSpan="2">
                  <FormControl {...getFieldProps('model', { initialValue: '' })} />
                </td>
              </tr>
              <tr>
                <td>提交申请日期</td>
                <td>
                  <DatePicker
                    className="form-item"
                    format={format}
                    {...getFieldProps('createTime', {
                      initialValue: moment(),
                    })}
                  />
                </td>
                <td>申请实施日期</td>
                <td colSpan="2">
                  <DatePicker
                    className="form-item"
                    format={format}
                    {...getFieldProps('updateTime', {
                      initialValue: moment(),
                    })}
                  />
                </td>
              </tr>
              <tr>
                <td>申请人</td>
                <td colSpan="4">
                  <FormControl {...getFieldProps('applyUserCode', { initialValue: '' })} />
                </td>
              </tr>
              <tr>
                <td rowSpan="2">变更内容</td>
                <td colSpan="2" style={{ backgroundColor: '#b7a92f', color: '#fff' }}>变更前(必要时附件)</td>
                <td colSpan="2" style={{ backgroundColor: '#b7a92f', color: '#fff' }}>变更后(必要时附件)</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <textarea
                    className="u-form-control textSty"
                    {...getFieldProps('alterFront', { initialValue: '' })}
                  />
                </td>
                <td colSpan="2">
                  <textarea
                    className="u-form-control textSty"
                    {...getFieldProps('alterAfter', { initialValue: '' })}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>工程变更接收人</span>
                  <br />
                  <span>（品类经理）</span>
                </td>
                <td colSpan="4">
                  <textarea
                    className="u-form-control textSty"
                    {...getFieldProps('recipientUserCode', { initialValue: '' })}
                  />
                </td>
              </tr>
              <tr>
                <td>说明</td>
                <td colSpan="4">
                  <FormControl
                    {...getFieldProps('wholeValidateDesc', { initialValue: '' })}
                  />
                </td>
              </tr>
              <tr>
                <td>监查预设问题</td>
                <td colSpan="4">
                  <textarea
                    className="u-form-control textSty"
                    {...getFieldProps('preProblem', { initialValue: '' })}
                  />
                </td>
              </tr>
              <tr>
                <td>其他要素</td>
                <td colSpan="4">
                  <textarea
                    className="u-form-control textSty"
                    {...getFieldProps('otherElement', { initialValue: '' })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
    );
  }
}

export default Form.createForm()(Demo2);
