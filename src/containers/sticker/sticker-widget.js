import React, { Component } from 'react';
import { StickerWidgetWrapper } from './style';

export default class extends Component {
  render() {
    const { fontColor, bgColor, width, icon, number } = this.props;

    const textColor = {
      color: fontColor
    };
    const widgetStyle = {
      backgroundColor: bgColor,
      width: width
    };
    const iconStyle = {
      color: fontColor
    };
    

    return (
      <StickerWidgetWrapper className="isoStickerWidget" style={widgetStyle}>
        <div className="isoIconWrapper" style={{ flexDirection: 'column' }} >
          <i className={icon} style={iconStyle} />
          <span className="span-tags" >May 12</span>
          <span className="span-tags" >to</span>
          <span className="span-tags" >June 11</span>
          <span className="span-tags" >for 30 Days</span>
        </div>

        <div className="isoContentWrapper">
          <span className="isoLabel" style={textColor}>
            GROSS SALES
            <i className="ion-info" style={iconStyle} ></i>
          </span>
          <h3 className="isoStatNumber" style={textColor}>
            ${number}
          </h3>
          <hr style={{ width: '100%' }} />
          <span className="isoLabel" style={textColor}>
            EST. PROFIT
          </span>
          <h3 className="isoStatNumber" style={textColor}>
            ${number}
          </h3>
          <table className="profit-sticker-table" >
            <tbody>
              <tr>
                <td>ORDERS</td>
                <td>UNITS</td>
                <td>ROI</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>35</td>
                <td>36</td>
                <td>22%</td>
              </tr>
            </tbody>
          </table>          
        </div>
      </StickerWidgetWrapper>
    );
  }
}
