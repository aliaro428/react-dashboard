import React, { Component } from 'react';
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';
import basicStyle from "../settings/basicStyle";
import IntlMessages from "../components/utility/intlMessages";
import Select, { SelectOption } from '../components/uielements/select';
import { Row, Col } from "antd";
import IsoWidgetsWrapper from "./widgets-wrapper";
import StickerWidget from "./sticker/sticker-widget";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import CustomToolTip from './customToolTip';
import Button, { ButtonGroup } from '../components/uielements/button';
import { connect } from 'react-redux';
import statsAction from "./../redux/stats/actions";
const { getStats }  = statsAction;
const Option = SelectOption;
// import datajson from './data.json'

// console.log(datajson);
// var accessKey = 'AKIAIJ6EQ5RQXX7O2QMA';
// var accessSecret = '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';
// var authToken = 'amzn.mws.32adb52f-bc05-71c9-542b-82f91f265490';
// var sellerId = 'APO4IR9M8W5Q9';
// var marketplaceId = 'ATVPDKIKX0DER';
// var amazonMws = require('amazon-mws')(accessKey,accessSecret);
class Dashboard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      chartData: []
    };
  }
  async componentDidMount() {
    try {
    let response = await fetch(
      'http://localhost:4000/gross_sale'
    );
    let responseJson = await response.json();
    console.log(responseJson);
    this.setState({ chartData: responseJson.data });
    } catch (error) {
      console.error(error);
    }
    getStats('Hello')
  }
  // componentDidMount() {
  //   amazonMws.feeds.search({
  //       'Version': '2009-01-01',
  //       'Action': 'GetFeedSubmissionList',
  //       'SellerId': sellerId,
  //       'MWSAuthToken': amazonMws
  //   }, function (error, response) {
  //       if (error) {
  //           console.log('error ', error);
  //           return;
  //       }
  //       console.log('response', response);
  //   });
  // }
  render() {
  	const { rowStyle, colStyle } = basicStyle;
  	// const wisgetPageStyle = {
   //    display: "flex",
   //    flexFlow: "row wrap",
   //    alignItems: "flex-start",
   //    overflow: "hidden"
   //  };

    // const chartEvents = [
    //   {
    //     eventName: "select",
    //     callback(Chart) {}
    //   }
    // ];

    // const stackConfig = {
    //   ...rechartConfigs.StackedAreaChart,
    //   width: window.innerWidth < 450 ? 300 : 500
    // };
    return (
      <LayoutContentWrapper>
        <LayoutContent style={{marginBottom: 16, padding: 20}} >
          <Select defaultValue="A" >
            <Option value="A" >Client A</Option>
            <Option value="B" >Client B</Option>
            <Option value="C" >Client C</Option>
          </Select>
          <Button type="success" style={{float: 'right'}} >Filter</Button>
        </LayoutContent>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                text={<IntlMessages id="widget.stickerwidget1.text" />}
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                icon="ion-cash"
                fontColor="#ffffff"
                bgColor="#7266BA"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                text={<IntlMessages id="widget.stickerwidget2.text" />}
                icon="ion-cash"
                fontColor="#ffffff"
                bgColor="#42A5F6"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                text={<IntlMessages id="widget.stickerwidget3.text" />}
                icon="ion-cash"
                fontColor="#ffffff"
                bgColor="#7ED320"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                text={<IntlMessages id="widget.stickerwidget4.text" />}
                icon="ion-cash"
                fontColor="#ffffff"
                bgColor="#F75D81"
              />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={0} justify="start" >
          <Col lg={12} md={10} sm={10} xs={24} style={{padding: 10}} >
            <LayoutContent style={{padding: 0}} >
                <div style={{backgroundColor: '#2D3446', padding: 10}} >
                  <h3 style={{color: '#fff'}} >Units Sold/Gross Sales</h3>
                </div>
                <ResponsiveContainer width={'100%'} height={400} aspect={4.0/3.0} >
                  <LineChart data={this.state.chartData} style={{ left: '-30px' }} >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip content={<CustomToolTip />  } />
                    <Legend wrapperStyle={{left: 33}} />
                    <Line type="monotone" dataKey="Current" name="Current" stroke="#2697C4" activeDot={{r: 8}} />
                    <Line type="monotone" dataKey="DayBefore" name="Day Before" stroke="#D4825D" />
                    <Line type="monotone" dataKey="SameLastWeek" name="Same Time Last Week" stroke="#2E3D50" />
                    <Line type="monotone" dataKey="SameLastYear" name="Same time last year" stroke="#5DB665"/>
                  </LineChart>
                </ResponsiveContainer>
            </LayoutContent>
          </Col>
          
          <Col lg={12} md={10} sm={10} xs={24} style={{padding: 10}} >
            <LayoutContent style={{padding: 0}} >
                <div style={{backgroundColor: '#2D3446', padding: 10}} >
                  <h3 style={{color: '#fff'}} >Estimated Net Profit</h3>
                </div>
                <ResponsiveContainer width={'100%'} height={400} aspect={4.0/3.0} >
                  <LineChart data={this.state.chartData} style={{ left: '-30px' }} >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip content={<CustomToolTip />  } />
                    <Legend wrapperStyle={{left: 33}} />
                    <Line type="monotone" dataKey="Current" name="Current" stroke="#2697C4" activeDot={{r: 8}} />
                    <Line type="monotone" dataKey="DayBefore" name="Day Before" stroke="#D4825D" />
                    <Line type="monotone" dataKey="SameLastWeek" name="Same Time Last Week" stroke="#2E3D50" />
                    <Line type="monotone" dataKey="SameLastYear" name="Same time last year" stroke="#5DB665"/>
                  </LineChart>
                </ResponsiveContainer>
            </LayoutContent>
          </Col>
        </Row>
      </LayoutContentWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps, { getStats })(Dashboard)
