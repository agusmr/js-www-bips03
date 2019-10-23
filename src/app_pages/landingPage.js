import React from 'react';
import ReactDOM from 'react-dom';

// internal framework libraries
import {Input, Popup, Dropdown} from 'semantic-ui-react';
import { AppFrameAction } from '../appframe.js';
import {AppFrame, AppFrameProvider, AppModal} from "../appframe";
import {NetAppProvider, WSConnection, WSConnectionAction} from '../appnetwork';
import { BIPSAppContext } from '../AppData.js';
import { ContextConnector } from '../appcontext.js';
// application-logic libraries
import FillHeaderTab from "../tabheaderfill";

// import frames goes here
import ModalBuy from './../app_modals/modal_buy';
import ModalSell from "./../app_modals/modal_sell";
import ModalAmend from "./../app_modals/modal_amend";
import VerifyPIN from "./verifyPin";
import ModalOrderDetail from "./../app_modals/modal_order_detail";
import ReactTooltip from "react-tooltip";
import {AgGridReact} from "ag-grid-react";
import AnyChart from '../../node_modules/anychart-react/dist/anychart-react.min';
import anychart from 'anychart';
import $ from "jquery";
import user_avatar from "../img/man.png";
import MenuOfContent from "../menuofcontent";
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';

const stateOptionsLp = [
    { key: 'lastprice', value: 'lastprice', text: 'Last Price' },
    { key: 'bestofferprice', value: 'bestofferprice', text: 'Best Offer Price' },
    { key: 'bestbidprice', value: 'bestbidprice', text: 'Best Bid Price' },
];

const stateOptionsOperator = [
    { key: 'lebihkecil', value: 'lebihkecil', text: '< =' },
    { key: 'lebihbesar', value: 'lebihbesar', text: '> =' },
];

const CustomFrameHeaderLanding = (props) =>{
    // console.log(props.isGrid)
    return (
        <AppFrameProvider
            initialClasses={{
                LandingPage,
                StockCash,
                TradeListHistory,
                FundTransfer,
                InquryAccount,
            }}
            initialFrames={
                [
                    {className: 'LandingPage', title: 'LANDING PAGE', instanceName: 'landingPageInvboard'},
                    {className: 'StockCash', title: 'STOCK CASH PAGE', instanceName: 'stockCashPageInvboard'},
                    {className: 'TradeListHistory', title: 'TRADE LIST PAGE', instanceName: 'tradeListHistoryPageInvboard'},
                    {className: 'FundTransfer', title: 'FUND TRANSFER PAGE', instanceName: 'fundTransferPageInvboard'},
                    {className: 'InquryAccount', title: 'INQURY ACCOUNT PAGE', instanceName: 'inquryAccountPageInvboard'},
                ]
            }>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab linkTitles={
                        {
                            landingPageInvboard: 'INVESTMENT BOARD',
                            stockCashPageInvboard: 'STOCK & CASH',
                            tradeListHistoryPageInvboard: 'HISTORICALS',
                            fundTransferPageInvboard: 'FUND TRANSFER',
                            inquryAccountPageInvboard: 'ACCOUNT INFO'
                        }
                    }/>
                </div>
            </div>
            <AppFrame headerComponent={LandingFrameHeader}/>
            <AppModal/>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}

const LandingFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

class Landing extends React.PureComponent {

  render () {
    return (
        //hanya memanggil headernya saja
        <div className="bg-black-trading px-0 mx-0">
        </div>
    );
  }
}

class LandingPage_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var props = this.props;
        $('#pieChart').css('height', '100%');

        // create data
        var data = [
            {x: "Portfolio Equity", value: 207166 },
            {x: "Pawnshop", value: 78662 },
            {x: "Fixed Income", value: 148662 },
            {x: "Mutual Fund", value: 142163 },
        ];

        var chart = anychart.pie(data);

        anychart.onDocumentReady(function () {
            createpie();
        });

        function createpie() {
            // create a chart and set the data
            // set the position of the legend
            chart.legend().position("bottom");

            // set the alignment of the legend
            chart.legend().align("center");

            // set the layout of the legend
            chart.legend().itemsLayout("vertical-expandable");

            // set the explosion range in different states
            /*chart.selected().explode("3%");
            chart.hovered().explode("3%");*/
            // configure outlines
            chart.normal().outline().enabled(true);
            chart.normal().outline().width("5%");
            chart.hovered().outline().width("10%");
            chart.selected().outline().width("3");
            chart.selected().outline().fill("#455a64");
            chart.selected().outline().stroke(null);
            chart.selected().outline().offset(2);

            // configure connectors
            chart.connectorStroke({color: "#888888", thickness: 2, dash:"2 2"});

            // explode the fourth and fifth slices
            /*chart.select(2);*/

            // set the position of labels
            chart.labels().position("outside");

            // set the chart title
            chart.title("Investment Board");

            chart.listen("pointsSelect", function(e) {
                var points = e.point.index;
                if (points === 0){
                    props.changeStateLanding('0');
                    if (e.point.selected()) {
                        chart.unselect([1,2,3]);
                    } else {
                        chart.unselect([1,2,3]);
                        chart.select(0);
                    }
                } else if (points === 1){
                    props.changeStateLanding('1');
                    if (e.point.selected()) {
                        chart.unselect([0,2,3]);
                    } else {
                        chart.unselect([0,2,3]);
                        chart.select(1);
                    }
                } else if (points === 2){
                    props.changeStateLanding('2');
                    if (e.point.selected()) {
                        chart.unselect([0,1,3]);
                    } else {
                        chart.unselect([0,1,3]);
                        chart.select(2);
                    }
                } else if (points === 3){
                    props.changeStateLanding('3');
                    if (e.point.selected()) {
                        chart.unselect([0,1,2]);
                    } else {
                        chart.unselect([0,1,2]);
                        chart.select(3);
                    }
                }
            });

            chart.legend().listen("legendItemClick", function(e) {
                var legend = e.itemIndex;
                // Set disturber.
                chart.select([4]);
                if (legend === 0){
                    props.changeStateLanding('0');
                    chart.unselect([1,2,3]);
                } else if (legend === 1){
                    props.changeStateLanding('1');
                    chart.unselect([0,2,3]);
                } else if (legend === 2){
                    props.changeStateLanding('2');
                    chart.unselect([0,1,3]);
                } else if (legend === 3){
                    props.changeStateLanding('3');
                    chart.unselect([0,1,2]);
                }
            });

            /*chart.unselect([1,2,3]);
            chart.select(0);*/

            // set the container id
            chart.container("pieChart");

            // initiate drawing the chart
            chart.draw();
        }
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickAmend = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: WithdrawModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickOrderDetail = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render() {
        return (
            <div className="container-fluid px-0 bg-black-trading">
                <div className="card-590 col-sm-12 px-0 mx-0 row">
                    <div id="pieChart" className="col-sm-4 px-0"></div>
                    <div className="col-sm-8 px-0 d-border-left">
                        <AppFrameAction ref="frameAction"></AppFrameAction>
                        <main>
                            <div className="container-fluid px-0">
                                <div className="container px-0 mx-0 col-sm-12 bg-grey" style={{display : this.props.stateLanding === '' ? 'block' : 'none'}}>
                                    <div className="card-body card-590 d-border-bottom align-self-center text-center bg-grey f-14 py-3">
                                        <div className="py-5 my-5">
                                            <div className="py-5 my-5">
                                                <i className="icon-icon-portofolio f-25"></i>
                                                <div>Please choose one menu in chart pie to show</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '0' ? 'block' : 'none'}}>
                                    <div className="card-header card-header-investment bg-grey">
                                        <div className="row col-sm-12 px-0 mx-0 py-1">
                                            <div className="col-sm-4 px-4 mx-0 f-14">
                                                Stock Val : <span className="text-primary">15,234,000</span>
                                            </div>
                                            <div className="col-sm-4 px-4 mx-0 f-14">
                                                P/L : <span className="text-success">+1,496,198 (+7.50%)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <PortofolioAgGrid gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '1' ? 'block' : 'none'}}>
                                    <div className="card-header header-pegadaian bg-grey">
                                        <div className="row col-sm-12 px-0 mx-0 py-3">
                                            <div className="col-sm-10 px-0 mx-0 f-14 align-self-center"></div>
                                            <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                <i className="f-18 ion ion-md-sync click-pointer"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body align-self-center text-center f-16 py-5">
                                        <div className="py-5">
                                            <div className="py-5">
                                                <i className="icofont icofont-warning-alt f-18"></i>
                                                <p>Not Available</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '2' ? 'block' : 'none'}}>
                                    <div className="card-header card-header-investment bg-grey">
                                        <div className="row col-sm-12 px-0 mx-0 py-1">
                                            <div className="col-sm-5 px-4 mx-0 f-14">
                                                Total Nominal : <span className="text-primary">46,000,000</span>
                                            </div>
                                            <div className="col-sm-5 px-4 mx-0 f-14"></div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <FixedIncomeAgGrid gridView="tab" classView="f-12"/>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '3' ? 'block' : 'none'}}>
                                    <div className="card-header card-header-investment bg-grey">
                                        <div className="row col-sm-12 px-0 mx-0 py-1">
                                            <div className="col-sm-4 px-4 mx-0 f-14">
                                                Invested : <span className="text-primary">4,088,802</span>
                                            </div>
                                            <div className="col-sm-4 px-4 mx-0 f-14">
                                                P/L : <span className="text-success">+496,198 (+9.50%)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <MutualFundAgGrid gridView="tab" classView="f-12" />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

class StockCash_Base extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            padding: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
        }


        return (
            <>
                <AppFrameAction ref="frameAction" />

                <div className="container-fluid">
                    <div className="row f-12">
                        <div className="col-sm-4 px-1 card-590">
                            <div className="row stockcash-header" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="list-group card-stockcash f-14 mb-0">
                                        <li className="list-group-item-portofolio">Cash and Balance <span className="text-primary pull-right">5,911,198</span></li>
                                        <li className="list-group-item-portofolio">P/L <span className="text-success pull-right">1,496,198</span></li>
                                        <li className="list-group-item-portofolio">P/L Ratio <span className="text-success pull-right">+7.50%</span></li>
                                        <li className="list-group-item-portofolio">Cash Ballance T+2 <span className="text-primary pull-right">4,500,000</span></li>
                                        <li className="list-group-item-portofolio">Buy Limit <span className="pull-right">15,980,000</span></li>
                                        <li className="list-group-item-portofolio">Stock Value <span className="pull-right">15,234,000</span></li>
                                        <li className="list-group-item-portofolio">Unsettled Amt <span className="pull-right">?</span></li>
                                        <li className="list-group-item-portofolio">Mkt. Value <span className="pull-right">4,400,000</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 px-0">
                            <div className="row">
                                <div className="col-md-12">
                                    <StockCashAgGrid/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="text-left mt-3 mb-0">Settlement</p>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless">
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Date</td>
                                                            <td className="d-border-tr-gray-all py-1">22/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-1">23/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-1">24/6/2019</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Receiveable</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Payable</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Tax + Fee</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">-30</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Penalty</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Settlement Amount</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">- 1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Cash Balance</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Total</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class TradeListHistory_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <AppFrameProvider
                initialClasses={{ModalHistorical, ModalTransaction}}
                initialFrames={
                    [
                        {className: 'ModalHistorical', title: 'TRADE LIST HISTORY', instanceName: 'historyTradeList'},
                        {className: 'ModalTransaction', title: 'TRANSACTION HISTORY', instanceName: 'historyTransactional'}
                    ]
                }>
                {/*<BIPSAppProvider>*/}
                <WSConnectionAction />
                <div className="row col-sm-12 px-0 mx-0 pt-1">
                    <div className="col-sm-12 px-2">
                        <MenuOfContent linkTitles={
                            {
                                newsGeneral : 'General News',
                                newsStock : 'Stock News',
                            }
                        } />
                    </div>
                    <div className="col-sm-12 px-2">
                        <AppFrame headerComponent={HistorocalsFrameHeader}/>
                    </div>
                </div>
                {/*</BIPSAppProvider>*/}
            </AppFrameProvider>
        );
    }
}

const HistorocalsFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

class ModalHistorical extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('.input-daterange').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/1920',
                autoclose: true,
                endDate : sd,
                todayHighlight: true,
                todayBtn: "linked",
            });
        });
    }
    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            padding: '10px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid pl-0 pr-0 f-12">
                    <div className="col-sm-12 row px-0 mx-0 d-border-bottom" style={paddingParagraphBottom}>
                        <div className="col-sm-3">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="ui small input col-sm-5 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                <div className="input-group input-daterange">
                                    <input placeholder="Date" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                    <span className="input-group-addon black-dropdown">
                                        <span className="fa fa-calendar-alt black-dropdown"></span>
                                    </span>
                                </div>
                            </div>

                            <div className="ui small input col-sm-1 text-white f-14 text-center align-self-center black">
                                to
                            </div>

                            <div className="ui small input col-sm-5 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                <div className="input-group input-daterange">
                                    <input placeholder="Date" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                    <span className="input-group-addon black-dropdown">
                                        <span className="fa fa-calendar-alt black-dropdown"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark">Go</button>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        <TradeListAgGrid/>
                    </div>

                </div>
            </>
        );
    }
}

class ModalTransaction extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('.input-daterange').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/1920',
                autoclose: true,
                endDate : sd,
                todayHighlight: true,
                todayBtn: "linked",
            });
        });
    }
    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            padding: '10px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid pl-0 pr-0 f-12" >
                    <div className="col-sm-12 row px-0 mx-0 d-border-bottom" style={paddingParagraphBottom}>
                        <div className="col-sm-3">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="ui small input col-sm-5 f-12 black ver-center">
                                {/* <Input type="text" /> */}
                                <div className="input-group input-daterange">
                                    <input placeholder="Date" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                    <span className="input-group-addon black-dropdown">
                                        <span className="fa fa-calendar-alt black-dropdown"></span>
                                    </span>
                                </div>
                            </div>

                            <div className="ui small input col-sm-1 text-white f-14 text-center align-self-center black">
                                to
                            </div>

                            <div className="ui small input col-sm-5 f-12 black ver-center">
                                {/* <Input type="text" /> */}
                                <div className="input-group input-daterange">
                                    <input placeholder="Date" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                    <span className="input-group-addon black-dropdown">
                                        <span className="fa fa-calendar-alt black-dropdown"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1 ver-center">
                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark">Go</button>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        <TransactionAgGrid/>
                    </div>
                </div>
            </>
        );
    }
}

class FundTransfer_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('.input-daterange').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/1920',
                autoclose: true,
                endDate : sd,
                todayHighlight: true,
                todayBtn: "linked",
            });
        });
    }

    render () {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            padding: '10px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid px-2 py-2 f-12" >
                    <div className="col-sm-12 row px-0 mx-0 d-border-bottom" style={paddingParagraphBottom}>
                        <div className="col-sm-3">
                            <div className="row group" style={imgUser} >
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        {/* <PortofolioAgGrid/> */}

                        <div className="col-sm-12 mt-4 bg-black-trading px-0">
                            <div className="cssmenu pb-4 col-sm-12 mx-0 px-0">
                                <ul>
                                    <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; FUND TRANSFER</span></a></li>
                                    <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; F/T LIST</span></a></li>
                                    <li className={ this.state.activeTab === '3' ? 'd-border-bottom active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('3'); }}><a><span className="f-11">&nbsp; CANCEL </span></a></li>
                                </ul>
                            </div>
                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md pr-5 pl-0">
                                            <div>Available Cash (T1/T2)</div>
                                            <table className="table text-white d-border-table bg-dark-grey table-sm ">
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black text-center">//</td>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black text-center">//</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="col-md">
                                            <div>Bank Information</div>
                                            <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless">
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Account No</td>
                                                    <td className="d-border-tr-gray-all text-right py-1">0640110945186</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Account Name</td>
                                                    <td className="d-border-tr-gray-all text-right py-1">Mr. Mario Surya Saputra</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Bank Name</td>
                                                    <td className="d-border-tr-gray-all text-right py-1"> PT. Bank Niaga Tbk.</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Branch Name</td>
                                                    <td className="d-border-tr-gray-all text-right py-1">Bahana Sekuritas</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="p-2">If the above bank Information is wrong, please contact our call center at 14099 or by website www.directtrading.co.id</div>
                                        <div className="d-border">
                                            <div className="col-md-12 p-3">
                                                <div className="row p-3">
                                                    <div className="col-md-2">
                                                        Amount (Not Including Fee)
                                                    </div>
                                                    <div className="col-md-1">
                                                        IDR
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='' placeholder='' size='small' className="col-sm-12 pl-0 pr-0 text-center align-self-center"/>
                                                    </div>
                                                    <div className="col-md-2">
                                                        Withdrawable Amount
                                                    </div>
                                                    <div className="col-md-1">
                                                        IDR
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='' placeholder='' size='small' className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    </div>
                                                </div>
                                                <div className="row p-3">
                                                    <div className="col-md-2">
                                                        Transfer Date (T1/T2)
                                                    </div>
                                                    <div className="col-md-1">

                                                    </div>
                                                    <div className="col-md-3">
                                                        {/* <Input defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>                                             */}
                                                        <Dropdown placeholder='Choose' search selection options={stateOptionsLp} className="col-sm-12 f-12 "/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 p-5">
                                                <input className="magic-checkbox" type="checkbox" name="viaRTGS" id="viaRTGS" value="option"/>
                                                <label for="viaRTGS" className="text-white f-12-center">
                                                    Via RTGS (The above amount is more than IDR 100,000,000)
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="d-border-transparent-grey">
                                    <div className="d-border-bottom mb-3">
                                        <div className="form-group mb-3 px-0">
                                            <FundAgGrid/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={this.state.activeTab === '3' ? 'd-block f-12' : 'd-none'}>
                                <div className="d-border-transparent-grey">
                                    <div className="d-border-bottom mb-3">
                                        <div className="form-group mb-3 px-4">
                                            Belum ada list tampilannya
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class InquryAccount_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('.input-daterange').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/1920',
                autoclose: true,
                endDate : sd,
                todayHighlight: true,
                todayBtn: "linked",
            });
        });
    }

    render () {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            padding: '10px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div class="container-fluid px-2 py-2 f-12" >
                    <div class="col-sm-12 row px-0 mx-0 d-border-bottom" style={paddingParagraphBottom}>
                        <div class="col-sm-3">
                            <div className="row" style={imgUser}>
                                <div className="col-sm-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="ui small input col-sm-5 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                <div className="input-group input-daterange">
                                    <input placeholder="Date" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                    <span className="input-group-addon black-dropdown">
                                        <span className="fa fa-calendar-alt black-dropdown"></span>
                                    </span>
                                </div>
                            </div>

                            <div className="ui small input col-sm-1 text-white f-14 text-center align-self-center black">
                                to
                            </div>

                            <div className="ui small input col-sm-5 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                <div className="input-group input-daterange">
                                    <input placeholder="Date" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                    <span className="input-group-addon black-dropdown">
                                        <span className="fa fa-calendar-alt black-dropdown"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark">Go</button>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        <InquryAgGrid/>
                    </div>
                </div>
            </>
        );
    }
}

class BuyModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalBuy/>
            </>
        );
    }
}

class SellModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalSell/>
            </>
        );
    }
}

class AmendModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalAmend/>
            </>
        );
    }
}

class WithdrawModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'withdraw'/>
            </>
        );
    }
}


class OrderDetailModal extends React.Component {

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalOrderDetail/>
            </>
        );
    }
}

class PortofolioAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 150,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    }
                },
                { field: "lastprice", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12" :
                            "text-success text-right  grid-table f-12";
                    }
                },
                { field: "lot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    },
                },
                { field: "shares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    },
                },
                { field: "stockval", headerName: "Stock Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    },
                },
                { field: "pl", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                            pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>';
                    }
                },
                { field: "remark", headerName: "Remark", sortable: false, resizable: true, width: this.props.gridView == 'grid' ? 82 : 179,
                    tooltip: (params) => {
                        var code = params.data.code;

                        if (code.includes('AALI') === true){
                            var toltp = 'Not yet submit annual financial report';
                        } else{
                            var toltp = 'Not Issue';
                        }

                        return toltp;
                    },
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        var code = params.data.code;
                        var eDiv = document.createElement('div');

                        if (code.includes('AALI') === true){
                            eDiv.innerHTML = '<span>' +
                                '<i class="tolTipRemaks fa fa-info-circle text-danger" id="ptooltip1" data-tip="true" data-for="errorTooltip"></i>' +
                                '</span>';
                        } else {
                            eDiv.innerHTML = '<span>' +
                                '<i class="tolTipRemaks fa fa-info-circle text-info" id="ptooltip1" data-tip="true" data-for="infoTooltip"></i>' +
                                '</span>';
                        }

                        /*var bTooltip = eDiv.querySelectorAll('.tolTipRemaks')[0];
                        bTooltip.addEventListener('mouseover', function () {
                            return '<span></span>';
                        });*/

                        return eDiv;
                    }
                },
                { field: "action", headerName: "Action", sortable: false, width: this.props.gridView == 'grid' ? 150 : 150, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button>' +
                            '<button class="btn-cellsell btn btn-sm btn-success mx-1 f-9 w-50">Sell</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellsell')[0];

                        bButton.addEventListener('click', self.props.clickbuy);
                        sButton.addEventListener('click', self.props.clicksell);

                        return eDiv;
                    }, suppressSizeToFit: true
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { code: "AALI",
                avgprice: "12,650",
                lastprice: "12,650",
                lot: "12",
                shares: "122",
                stockval: "12,650,000",
                pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                remark: ""   ,
                action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: "",
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },{ code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: "",
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: "",
                    action: ""},
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                }
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-550 ag-theme-balham-dark ag-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class FixedIncomeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true, filter: "agTextColumnFilter", width: this.props.gridView == 'grid' ? 25 : 56,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }},
                { field: "serial", headerName: "Serial", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 100 : 170,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    },suppressSizeToFit: true},
                { field: "nominal", headerName: "Nominal (IDR)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 118 : 239,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    }},
                { field: "coupon", headerName: "Coupon", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 84 : 239,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    } },
                { field: "couponpdate", headerName: "Coupon Payment Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 164 : 282,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    } },
                { field: "duedate", headerName: "Due Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 91 : 239,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    } },
                { field: "detail", headerName: "Detail", resizable: true, width: this.props.gridView == 'grid' ? 72 : 170,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    },
                    cellRenderer : function (params) {
                        return '<i class="fa fa-search click-pointer text-danger"></i>'
                    } },
                { field: "action", headerName: "Action", width: this.props.gridView == 'grid' ? 175 : 200, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy</button>' +
                            '<button class="btn-cellredemption btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellredemption')[0];

                        /*bButton.addEventListener('click', function () {});
                        sButton.addEventListener('click', function () {});*/

                        return eDiv;
                    },suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { no: "1",
                    serial: "SUNMP15042019",
                    nominal: "7,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 20 every month",
                    duedate: "02 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "2",
                    serial: "SUNMP16042019",
                    nominal: "5,000,000",
                    coupon: "7,0%",
                    couponpdate: "date 21 every month",
                    duedate: "03 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "3",
                    serial: "SUNMP17042019",
                    nominal: "2,000,000",
                    coupon: "5,0%",
                    couponpdate: "date 22 every month",
                    duedate: "04 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "4",
                    serial: "SUNMP18042019",
                    nominal: "6,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 23 every month",
                    duedate: "05 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "5",
                    serial: "SUNMP19042019",
                    nominal: "4,000,000",
                    coupon: "9,0%",
                    couponpdate: "date 24 every month",
                    duedate: "06 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "6",
                    serial: "SUNMP20042019",
                    nominal: "12,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 25 every month",
                    duedate: "07 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "7",
                    serial: "SUNMP21042019",
                    nominal: "10,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 26 every month",
                    duedate: "08 Jan 2021",
                    detail: "",
                    action: ""},
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-550 ag-theme-balham-dark ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class MutualFundAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 170,
                    cellClass : function (params) {
                        return " grid-table text-left f-12";
                    },
                    cellRenderer : function (params) {
                        var code = params.data.code;
                        var scode = code.split("-");

                        return '<span className="font-weight-bold">'+scode[0]+'</span>' +
                            '<br /><span>'+scode[1]+'</span>';
                    }, suppressSizeToFit: true },
                { field: "nav", headerName: "NAV", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 65 : 274,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    } },
                { field: "navdate", headerName: "NAV Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 274,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    } },
                { field: "currency", headerName: "Currency", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 89 : 274,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    }  },
                { field: "potentialpl", headerName: "Potential P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 331,
                    cellClass : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? 'grid-table text-right f-12 text-danger' :
                            'grid-table text-right f-12 text-success'
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                            pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>';
                    } },
                { field: "action", headerName: "Action", sortable: false, width: this.props.gridView == 'grid' ? 175 : 200, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button>' +
                            '<button class="btn-cellredemption btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellredemption')[0];

                        /*bButton.addEventListener('click', function(){});
                        sButton.addEventListener('click', function(){});*/

                        return eDiv;
                    }, suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight: function (params) {
                return 40;
            },
            rowData: [
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "1,025",
                    navdate: "06/03/2019",
                    currency: "1,025,000",
                    potentialpl: "+250,660"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "7,125",
                    navdate: "06/03/2019",
                    currency: "7,125,000",
                    potentialpl: "+175"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+1,75%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-550 ag-theme-balham-dark"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class StockCashAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 150, lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 locked-visible locked-col";
                    }, suppressSizeToFit: true
                },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    }
                },
                { field: "lastprice", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12" :
                            "text-success text-right  grid-table f-12";
                    }
                },
                { field: "port", headerName: "Portofolio", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                    ,
                    children: [
                        { field: "plot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12";
                            }
                        },
                        { field: "pshares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12";
                            },
                        }
                    ]
                },

                { field: "mktvalue", headerName: "Mkt. Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    }
                },
                { field: "pl", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    }
                },

                { field: "sellable", headerName: "Sellable Balance", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                    ,
                    children: [
                        { field: "slot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12";
                            }
                        },
                        { field: "sshares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12";
                            },
                        }
                    ]
                },
                { field: "lqVal", headerName: "Lq. Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-success text-right  grid-table f-12";
                    }
                },

                { field: "stockVal", headerName: "Stock Val (Avg.)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return "text-success text-right  grid-table f-12";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "ADHI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "ANTM",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "BBCA",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "BBRI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "BUMI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "BBNI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "WSKT",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "UNIF",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "PPTP",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "SMRG",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "BNGA",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
                { code: "UNIV",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalue: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqVal: "12,650"   ,
                    stockVal:"12,650,000"   },
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-330 ag-theme-balham-dark ag-bordered ag-header-gray table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TradeListAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 150,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "trade", headerName: "Trade", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-danger text-center  grid-table f-12" :
                            "text-success text-center  grid-table f-12";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "SELL",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-445 ag-theme-balham-dark ag-bordered table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TransactionAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 150,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "detail", headerName: "Detail", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "inOut", headerName: "In/Ou Qty.", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "balAmount", headerName: "Bal.Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "balQty", headerName: "Bal. Qty", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "paidAmt", headerName: "Paid Amt", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "penalty", headerName: "Add Out-standing", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "addOut", headerName: "Add Out Standing", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "tradeAmt", headerName: "Trade Amt", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },{ field: "wht", headerName: "WHT", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },{ field: "incomeTax", headerName: "Income Tax", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   date: "22/06/2019",
                    detail: " Buy TS",
                    amount: "12,650",
                    code: "AALI",
                    inOut: "122",
                    price: "12,650,000",
                    balAmount: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    balQty: ""   ,
                    fee:"" ,
                    paidAmt:"" ,
                    penalty:"" ,
                    addOut:"" ,
                    tradeAmt:"" ,
                    wht:"" ,
                    incomeTax:"" ,

                },
                {   date: "22/06/2019",
                    detail: " Buy TS",
                    amount: "12,650",
                    code: "AALI",
                    inOut: "122",
                    price: "12,650,000",
                    balAmount: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    balQty: ""   ,
                    fee:"" ,
                    paidAmt:"" ,
                    penalty:"" ,
                    addOut:"" ,
                    tradeAmt:"" ,
                    wht:"" ,
                    incomeTax:"" ,

                },
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-445 ag-theme-balham-dark ag-bordered table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class FundAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-danger text-center  grid-table f-12" :
                            "text-success text-center  grid-table f-12";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "mkt", headerName: "Mkt", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "SELL",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-400 ag-theme-balham-dark ag-bordered table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class InquryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 40 : 75,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "trade", headerName: "Trade", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-danger text-center  grid-table f-12" :
                            "text-success text-center  grid-table f-12";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-490 ag-theme-balham-dark ag-bordered table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

/*const CustomFrameHeaderLanding = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
        handleView:(isGrid)=>{actions.sendAction('handleView',{isGrid})},
    })
)(CustomFrameHeaderLanding_Base);*/

const LandingPage = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
        stateLanding:vars.stateLanding,
        changeStateLanding : (stateLanding) => {actions.sendAction('changeStateLanding', {stateLanding})}
    })
)(LandingPage_Base);

const StockCash = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(StockCash_Base);

const TradeListHistory = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(TradeListHistory_Base);

const FundTransfer = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(FundTransfer_Base);

const InquryAccount = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(InquryAccount_Base);

export { CustomFrameHeaderLanding, Landing };
export default LandingPage;
