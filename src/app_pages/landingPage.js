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
import VerifyPIN, {tanggal} from "./verifyPin";
import ModalOrderDetail from "./../app_modals/modal_order_detail";
import ReactTooltip from "react-tooltip";
import {AgGridReact} from "ag-grid-react";
import AnyChart from '../../node_modules/anychart-react/dist/anychart-react.min';
import anychart from 'anychart';
import $ from "jquery";
import user_avatar from "../img/man.png";
import MenuOfContent from "../menuofcontent";
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';
import PinInput from "react-pin-input";
import {Table} from "react-bootstrap";

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
                <div className="card-527 col-sm-12 px-0 mx-0 row">
                    <div id="pieChart" className="col-sm-4 px-0"></div>
                    <div className="col-sm-8 px-0 d-border-left">
                        <AppFrameAction ref="frameAction"></AppFrameAction>
                        <main>
                            <div className="container-fluid px-0">
                                <div className="container px-0 mx-0 col-sm-12 bg-grey" style={{display : this.props.stateLanding === '' ? 'block' : 'none'}}>
                                    <div className="card-body card-527 align-self-center text-center bg-grey f-14 py-3">
                                        <div className="py-5 my-5">
                                            <div className="py-5 my-5">
                                                <i className="icon-icon-portofolio f-25"></i>
                                                <div>Please choose one menu in chart pie to show</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '0' ? 'block' : 'none'}}>
                                    <div id="pinPortofolio" className="d-block text-center align-self-center">
                                        <VerifyPINPortofolio/>
                                    </div>
                                    <div id="detailPortofolio" className="d-none">
                                        <div className="card-header card-header-investment bg-grey h-40">
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
                                    <div className="card-header card-header-investment bg-grey h-40">
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
                                    <div className="card-header card-header-investment bg-grey h-40">
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
            paddingTop: '10px'
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
                        <div className="col-sm-2 px-1 card-527">
                            <div className="row stockcash-header h-77" style={imgUser}>
                                <div className="col-md-12 h-77" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="list-group card-448 f-14 mb-0">
                                        <li className="list-group-item-portofolio">Cash and Balance <br/><span className="text-primary pull-right">5,911,198</span></li>
                                        <li className="list-group-item-portofolio">P/L <br/><span className="text-success pull-right">1,496,198</span></li>
                                        <li className="list-group-item-portofolio">P/L Ratio <br/><span className="text-success pull-right">+7.50%</span></li>
                                        <li className="list-group-item-portofolio">Cash Ballance T+2 <br/><span className="text-primary pull-right">4,500,000</span></li>
                                        <li className="list-group-item-portofolio">Buy Limit <br/><span className="pull-right">15,980,000</span></li>
                                        <li className="list-group-item-portofolio">Stock Value <br/><span className="pull-right">15,234,000</span></li>
                                        <li className="list-group-item-portofolio">Unsettled Amt <br/><span className="pull-right">?</span></li>
                                        <li className="list-group-item-portofolio">Mkt. Value <br/><span className="pull-right">4,400,000</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-10 px-0">
                            <div className="row">
                                <div className="col-md-12">
                                    <StockCashAgGrid/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12 card-221">
                                            <p className="text-left mt-3 mb-0 h-17">Settlement</p>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless mb-0 card-194">
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Date</td>
                                                            <td className="d-border-tr-gray-all py-2">22/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-2">23/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-2">24/6/2019</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Receiveable</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Payable</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Tax + Fee</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">-30</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Penalty</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Settlement Amount</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">- 1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Cash Balance</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
                                                        </tr>
                                                        <tr className="d-border-footer">
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-gray py-2">Total</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
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
            paddingTop: '10px',
            paddingBottom: '0px'
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
                        {/*<div className="col-sm-3">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>*/}
                        <div className="col-sm-12 h-62">
                            <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                {/*Update Zaky*/}
                                <table>
                                    <tr>
                                        <td>
                                            <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                <span className="input-group-addon h-35">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                                <span className="input-group-addon h-35">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Go</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
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
            $('.input-daterangeTransaction').datepicker({
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
            paddingTop: '10px',
            paddingBottom: '0px'
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
                        {/*<div className="col-sm-3">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>*/}
                        <div className="col-sm-12 h-62">
                            <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                {/* Update Zaky */}
                                <table>
                                    <tr>
                                        <td>
                                            <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                <span className="input-group-addon h-35">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                                <span className="input-group-addon h-35">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Go</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
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
            $('.input-daterangeTransaction').datepicker({
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

            // Zaky Update
            $('#datepickerTest').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/2000',
                autoclose: true,
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
            paddingTop: '10px'
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
                <div className="container-fluid px-1 f-12" >


                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        {/* <PortofolioAgGrid/> */}
                        <div className="cssmenu col-sm-5 mx-0 px-0 h-45">
                            <ul className={"d-border-top d-border-left d-border-right"}>
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; FUND TRANSFER</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; F/T LIST</span></a></li>
                                <li className={ this.state.activeTab === '3' ? 'active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('3'); }}><a><span className="f-11">&nbsp; Cancel</span></a></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 px-4 bg-grey bg-black-trading pt-0 d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container mx-0 pt-3">
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
                                                            <Input readonly defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            Withdrawable Amount
                                                        </div>
                                                        <div className="col-md-1">
                                                            IDR
                                                        </div>
                                                        <div className="col-md-3">
                                                            <Input readonly defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                        </div>
                                                    </div> <div className="row p-3">
                                                    <div className="col-md-2">
                                                        Transfer Date (T1/T2)
                                                    </div>
                                                    <div className="col-md-1">

                                                    </div>
                                                    <div className="col-md-3 ui input" style={{paddingRight:'53px'}}>
                                                        <Input placeholder='dd/mm/yy' size='small' id="datepickerTest" className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                        <span className="input-group-addon h-35 no-border-radius" style={{width: '100%'}}><span
                                                            className="fa fa-calendar-alt"></span></span>
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
                                            <div className={"col-sm-12 text-right mb-0 px-3 h-40"}>
                                                <button className={"btn btn-primary"}><i className={"fa fa-paper-plane"}>&nbsp;Send</i></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="d-border-transparent-grey">
                                    <div className="d-border-bottom mb-3">
                                        <div className="form-group mb-3 px-0">
                                            <div className="col-sm-9 pl-0 h-62">
                                                <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">
                                                    {/* <Input type="text" /> */}
                                                    {/* Update Zaky */}
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                                    <span className="input-group-addon h-35">Periode</span>
                                                                    <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                                    <span className="input-group-addon h-35">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                                    <span className="input-group-addon h-35">to</span>
                                                                    <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                                    <span className="input-group-addon h-35">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button type="submit" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Go</button>
                                                            </td>
                                                        </tr>
                                                    </table>



                                                </div>
                                            </div>
                                            <FundAgGrid/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '3' ? 'd-block f-12' : 'd-none'}>
                                <div className="col-sm-12 py-0 px-0 mb-0 h-62">
                                    <div className="row stockcash-header" style={imgUser}>
                                        <div className="col-md-12" style={imgdisplay}>
                                            <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-border-transparent-grey">
                                    <div className="d-border-bottom" style={{marginBottom : "10px"}}>
                                        <div className="form-group px-0" style={{marginBottom : "10px"}}>
                                            <CancelGrid/>
                                            <CancelGrid2/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-sm-12 text-right mb-0 px-3 h-40"}>
                                    <button className={"btn btn-primary"}><i className={"fa fa-paper-plane"}>&nbsp;Send</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

//Acccc
class InquryAccount_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }



    render () {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            paddingTop: '10px'
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
                <div className="container-fluid px-1 f-12" >


                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        {/* <PortofolioAgGrid/> */}
                        <div className="cssmenu col-sm-6 mx-0 px-0 h-45">
                            <ul className={"d-border-top d-border-left d-border-right"}>
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Account Infromation</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Contact Information</span></a></li>
                                <li className={ this.state.activeTab === '3' ? 'active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('3'); }}><a><span className="f-11">&nbsp; RDI Bank Information</span></a></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 px-4 pb-0 bg-grey bg-black-trading pt-0 d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0" style={{ paddingTop : "10px" }}>
                                    <div className="row">
                                        <div className={"col-sm-6 pl-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-448"}>
                                                <tr>
                                                    <td className={"d-border"}>KSEI A/C No</td>
                                                    <td width="50%" className={"d-border hover-tables"}>928237217312</td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Alt Code</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>KSEI SID</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>User ID</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>A/C Status Name</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID Type</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID No</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID Expire Date</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Customer Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Country</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Mother's Name</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Sub Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Job</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Opening Date</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>A/C Closing Date</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Opening Branch</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-sm-6 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-448"}>

                                                <tr>
                                                    <td width="50%" className={"d-border"} >Withholding Tax</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>

                                                <tr>
                                                    <td className={"d-border"}>Dividend Tax</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Commission Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Code</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Account No</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Account Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Branch</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Auto Transfer</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Virtual Account No</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Penalty Type</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>No. of PIN Error</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>PIN Code Initialize</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Managing Branch</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Tax Rate</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Initial Deposit Amount</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Order Permit</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0" style={{ paddingTop : "30px" }}>
                                    <div className="row">
                                        <div className={"col-sm-6 px-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-169"}>
                                                <tr>
                                                    <td className={"d-border"}>Date of Birth</td>
                                                    <td width="50%" className={"d-border hover-tables"}>928237217312</td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Place of Birth</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Marriage</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Spouse's Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Manager</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Recommender</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                            <table className={"table table-borderder table-responsive card-113"}>
                                                <tr>
                                                    <td className={"d-border text-center td-bluelight"}>Item</td>
                                                    <td className={"d-border text-center td-bluelight"}>Tel No</td>
                                                    <td className={"d-border text-center td-bluelight"}>Fax No</td>
                                                </tr>
                                                <tr className={"even-td hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"even-td hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-sm-6 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive card-281"}>

                                                <tr>
                                                    <td width="50%" className={"d-border"} >Position</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>

                                                <tr>
                                                    <td className={"d-border"}>Company Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Company Officer</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Company Type</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Interest Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Affiliatied Co</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Unknown Addr/Phone</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Email</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Mobile1</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Mobile2</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>

                                            </table>
                                        </div>
                                        <div className={"col-sm-12 px-0"}>
                                            <table className={"table table-borderder table-responsive card-113"}>
                                                <tr>
                                                    <td className={"d-border text-center td-bluelight"}>Item</td>
                                                    <td className={"d-border text-center td-bluelight"}>Pos No</td>
                                                    <td className={"d-border text-center td-bluelight"}>Address</td>
                                                    <td className={"d-border text-center td-bluelight"} width="50%">Address1</td>
                                                </tr>
                                                <tr className={"hover-tables even-td"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"even-td hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '3' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 pt-3">
                                    <div className="row">
                                        <div className={"col-sm-12 pl-0 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive"}>
                                                <tr>
                                                    <td className={"d-border"}>RDI Bank</td>
                                                    <td width="50%" className={"d-border hover-tables"}>928237217312</td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Account Number</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Account Name</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
                                                </tr>
                                            </table>
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
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    }, suppressSizeToFit: true
                },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "lastprice", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "lot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "shares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "stockval", headerName: "Stock Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "pl", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
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
                        return " text-center grid-table f-12 d-border-aggrid-right";
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
                        return " grid-table locked-col locked-visible d-border-aggrid-right";
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
                    className={"card-487 ag-theme-balham-dark ag-bordered ag-striped-odd"}
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
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    }},
                { field: "serial", headerName: "Serial", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 100 : 170,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    },suppressSizeToFit: true},
                { field: "nominal", headerName: "Nominal (IDR)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 118 : 239,
                    cellClass : function (params) {
                        return " grid-table text-right f-12 d-border-aggrid-right";
                    }},
                { field: "coupon", headerName: "Coupon", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 84 : 239,
                    cellClass : function (params) {
                        return " grid-table text-right f-12 d-border-aggrid-right";
                    } },
                { field: "couponpdate", headerName: "Coupon Payment Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 164 : 282,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    } },
                { field: "duedate", headerName: "Due Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 91 : 239,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    } },
                { field: "detail", headerName: "Detail", resizable: true, width: this.props.gridView == 'grid' ? 72 : 170,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    },
                    cellRenderer : function (params) {
                        return '<i class="fa fa-search click-pointer text-danger"></i>'
                    } },
                { field: "action", headerName: "Action", width: this.props.gridView == 'grid' ? 175 : 200, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center locked-col locked-visible d-border-aggrid-right";
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
                    className={"card-487 ag-theme-balham-dark ag-striped-odd"}
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
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                    cellRenderer : function (params) {
                        var code = params.data.code;
                        var scode = code.split("-");

                        return '<span className="font-weight-bold">'+scode[0]+'</span>' +
                            '<br /><span>'+scode[1]+'</span>';
                    }, suppressSizeToFit: true },
                { field: "nav", headerName: "NAV", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 65 : 274,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "navdate", headerName: "NAV Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 274,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "currency", headerName: "Currency", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 89 : 274,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }  },
                { field: "potentialpl", headerName: "Potential P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 331,
                    cellClass : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? 'grid-table d-border-aggrid-right text-right f-12 text-danger' :
                            'grid-table d-border-aggrid-right text-right f-12 text-success'
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                            pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>';
                    } },
                { field: "action", headerName: "Action", sortable: false, width: this.props.gridView == 'grid' ? 175 : 200, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12 locked-col locked-visible";
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
                    className={"card-487 ag-theme-balham-dark ag-striped-odd"}
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
                { field: "codeTop", headerName: "", sortable: true,
                    filter: "agTextColumnFilter", resizable: true,
                    width: this.props.gridView == 'grid' ? 69 : 150, minWidth: this.props.gridView == 'grid' ? 69 : 150, lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 locked-visible locked-col d-border-aggrid-right";
                    }, suppressSizeToFit: true, children: [{
                        field: "codeR", headerName: "Code", sortable: true,
                        filter: "agTextColumnFilter", resizable: true,
                        width: this.props.gridView == 'grid' ? 69 : 150, lockPosition: true, lockVisible: true,
                        cellClass : function (params) {
                            return " grid-table text-center f-12 locked-visible locked-col d-border-aggrid-right";
                        }, suppressSizeToFit: true
                    },]},
                { field: "avgpriceTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "avgpriceR", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "lastpriceTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "lastpriceR", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                        cellClass : function (params) {
                            var pl = params.data.plR;
                            return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },
                    ],
                },
                { field: "port", headerName: "Portofolio", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                    ,
                    children: [
                        { field: "plot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                        { field: "pshares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            },
                        }
                    ]
                },

                { field: "mktvalueTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    },children:[{ field: "mktvalueR", headerName: "Mkt. Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                        cellClass : function (params) {
                            return " text-right grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },
                { field: "plTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "plR", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                        cellClass : function (params) {
                            var pl = params.data.plR;
                            return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },

                { field: "sellable", headerName: "Sellable Balance", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 ";
                    }
                    ,
                    children: [
                        { field: "slot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                        { field: "sshares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            },
                        }
                    ]
                },
                { field: "lqValTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },children:[{ field: "lqValR", headerName: "Lq. Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                        cellClass : function (params) {
                            return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },

                { field: "stockValTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },children:[ { field: "stockValR", headerName: "Stock Val (Avg.)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                        cellClass : function (params) {
                            var pl = params.data.pl;
                            return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    }]
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { codeR: "AALI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "ADHI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "ANTM",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BBCA",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BBRI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BUMI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BBNI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "WSKT",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "UNIF",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "PPTP",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "SMRG",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BNGA",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "UNIV",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
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
                    className={"card-305 ag-theme-balham-dark ag-bordered ag-header-gray table-bordered ag-striped-odd"}
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
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    }, suppressSizeToFit: true
                },
                { field: "trade", headerName: "Trade", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "cmd", headerName: "Action", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-danger text-center grid-table f-12 d-border-aggrid-right" :
                            "text-success text-center  grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
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
                    className={"card-406 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
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
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "detail", headerName: "Detail", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "inOut", headerName: "In/Ou Qty.", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "balAmount", headerName: "Bal.Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "balQty", headerName: "Bal. Qty", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "paidAmt", headerName: "Paid Amt", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "penalty", headerName: "Add Out-standing", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "addOut", headerName: "Add Out Standing", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "tradeAmt", headerName: "Trade Amt", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "wht", headerName: "WHT", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "incomeTax", headerName: "Income Tax", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
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
                    className={"card-406 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
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
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 121,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 126,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 126,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-danger text-center  grid-table d-border-aggrid-right f-12" :
                            "text-success text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 126,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "mkt", headerName: "Mkt", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 126,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 126,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 126,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 126,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 124,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
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
                    className={"card-381 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
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

class CancelGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "cw", headerName: "Cw#", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 84,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 649,
                    cellClass : function (params) {
                        return " text-right grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 485,
                    cellClass : function (params) {
                        return "text-right  grid-table d-border-aggrid-right f-12";
                    }
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
                }, {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
                }, {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
                }, {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
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
                    className={"card-155 ag-theme-balham-dark ag-bordered table-bordered h-100 ag-striped-odd"}
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

class CancelGrid2 extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "cw", headerName: "Cw #", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "requestdate", headerName: "Request Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 282,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "transferdate", headerName: "Transfer Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 283,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 283,
                    cellClass : function (params) {
                        return "text-right  grid-table d-border-aggrid-right f-12";
                    }
                },

                { field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 280,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   cw: "CWxx",
                    requestdate: "1/12/2018",
                    transferdate: "10/12/2018",
                    amount: "1,223,333",
                    fee:"0",
                }, {   cw: "CWxx",
                    requestdate: "1/12/2018",
                    transferdate: "10/12/2018",
                    amount: "1,223,333",
                    fee:"0",
                }, {   cw: "CWxx",
                    requestdate: "1/12/2018",
                    transferdate: "10/12/2018",
                    amount: "1,223,333",
                    fee:"0",
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
                    className={"card-155 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                        marginTop: "30px"
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
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "trade", headerName: "Trade", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "cmd", headerName: "Action", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-danger text-center  grid-table d-border-aggrid-right f-12" :
                            "text-success text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
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
                    className={"card-490 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
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

class VerifyPINPortofolio extends React.PureComponent{
    constructor(props){
        super(props);
    }

    state = {
        value: "",
        visible:false
    }

    onChange = value =>{
        this.setState({ value });
    };

    _handleKeyPress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            alert('Yuhu Yuhu');
        }
    }

    onClickSubmit = (e) => {
        if(this.state.value.length >= '6'){
            if(this.state.value === '123456') {
                $("#pinPortofolio").removeClass("d-block");
                $("#pinPortofolio").addClass("d-none");
                $("#detailPortofolio").addClass("d-block");
                $("#detailPortofolio").removeClass("d-none");
            } else{
                var visible = true;
                this.setState({ visible });
            }
        }
    };

    onClickCloseAlert = (e) => {
        var visible = false;
        var value = "";
        this.setState({ visible });
        this.pin.clear();
        this.setState({ value });
    };

    forgotPIN = (e) =>{
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">BIPS</h1></div>,
            contentClass: ForgotPINPModal,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    componentDidMount(){
        $(".pincode-input-text").on('keypress',function(e) {
            if(e.which == 13) {
                $("#pin-click").click();
            }
        });
    }

    render(){
        const {value} = this.state;
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12 p-pinportofolio" style={{ paddingTop: "60px" }}>
                    <Table borderless className="card-334 mb-0">
                        <tbody>
                        <tr>
                            <td className="py-0">

                                <div className="text-center align-self-center align-middle">
                                    <div className="d-border-bold img-round-icon">
                                        <i className="icofont icofont-lock icofont-4x"></i>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td className="py-0">

                                <div className="form-group text-center pt-2 mb-0">
                                    <label className="col-sm-12 px-5 py-2 col-form-label f-14 font-weight-bold">Please enter security PIN</label>
                                    <label className="col-sm-12 px-5 py-2 col-form-label">Please fullfill with 6 digit security
                                        PIN to verify your transaction</label>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className="form-group mb-0">
                                    <PinInput
                                        inputStyle={{"color":/*cssmode == 'night' ? '#FFFFFF':*/'#999999', "border":"#565252 1px solid","border-radius":"10%","width":"15.25%"}}
                                        inputFocusStyle={{"color":/*cssmode == 'night' ? '#FFFFFF':*/'#999999', "border":"#065A96 1px solid", "border-radius":"10%","width":"15.25%"}}
                                        length={6}
                                        focus
                                        secret
                                        ref={p => (this.pin = p)}
                                        type="numeric"
                                        onChange={this.onChange}
                                    />
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className="form-group">
                                    <label className="col-sm-12 py-2 px-1 col-form-label">Forgot your PIN?
                                        <span className="click-pointer btn btn-link text-primary" onClick={this.forgotPIN}> Click here</span>
                                    </label>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className="form-group py-3 mb-0">
                                    <div className="justify-content-center align-items-center d-flex py-0">
                                        <button id="pin-click" type="submit" className={'btn btn-grey-gray form-control py-0'}
                                                onClick={this.onClickSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        </tbody>
                    </Table>

                    <div className={this.state.visible ? "col-sm-12 text-center bg-danger fade-in" : "col-sm-12 text-center bg-danger fade-out"}>
                        <div className={/*{cssmode == 'night'? */"px-2 pt-2 text-right text-white" /*: "px-2 pt-2 text-right text-black"*/}><i className="click-pointer icofont icofont-close" onClick={this.onClickCloseAlert}></i></div>
                        <div className={/*cssmode == 'night'? */"px-2 py-4 text-white" /*: "px-2 py-4 text-black"*/}>
                            PIN is wrong!
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class ForgotPINPModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <div className="f-12">
                <AppFrameAction ref="frameAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding">Forgot PIN</label>
                <div className="text-white">
                    <div className="form-group">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your email address and we'll
                            send link to reset your PIN
                        </label>
                    </div>
                    <div className="form-group mb-0">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Email</label>
                        <div className="col-sm-12 px-5 py-0">
                            <input type="email" className="text-white input-login col-sm-12"/>
                        </div>
                    </div>

                    <div className="form-group py-3">
                        <div className="justify-content-center align-items-center d-flex py-0 px-5">
                            <button type="submit" className="btn btn-primary form-control py-0">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="form-group text-center">
                        <label className="col-sm-12 px-5 py-2 col-form-label">
                            <span className="click-pointer btn btn-link text-primary" onClick={this.closeClick}> Back to Verify PIN</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

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
