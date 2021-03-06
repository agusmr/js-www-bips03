import React from "react";
import { AppFrameAction } from "../appframe";
import user_avatar from './../img/man.png';
// import '../App-costum.css';

import { AgGridReact } from 'ag-grid-react';

import $ from 'jquery';
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';


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
                <div className="container-fluid pl-0 pr-0" >
                    <div className="row d-border-bottom" style={paddingParagraphBottom}>
                        <div className="col-md-3">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
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
                        <div className="col-md-1 ver-center">
                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark">Go</button>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="row">
                        <div className="col-md-12" style={paddingParagraph}>
                            <TransactionAgGrid/>
                        </div>
                    </div>
                </div>
            </>
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
                    className={this.props.gridView == 'grid' ? "card-235 ag-theme-balham-dark ag-bordered table-bordered" : "card-580 ag-theme-balham-dark ag-bordered table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                        height: "400px"
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


export default ModalTransaction;