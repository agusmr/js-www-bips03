import React from "react";
import { AppFrameAction } from "./../appframe";
import { Tab ,Dropdown} from 'semantic-ui-react'
import user_avatar from './../img/man.png';
import {ContextConnector} from "../appcontext";
import {BIPSAppContext} from "../AppData";
import $ from "jquery";

const stateLanguages = [
    { key: '1', value: 'eng', text: 'English' },
    { key: '2', value: 'ina', text: 'Indonesian' },
];

const stateTimeZone = [
    { key: '1', value: 'gmt-12', text: '(GMT-12:00) International' },
    { key: '2', value: 'gmt-11', text: '(GMT-11:00) Midway Island' },
];



const panes = [
  { menuItem: 'Appearance', render: () => <Tab.Pane><TabAppearance/></Tab.Pane> },
  { menuItem: 'Privacy', render: () => <Tab.Pane><TabPrivacy/></Tab.Pane> },
  { menuItem: 'Notification', render: () => <Tab.Pane><TabNotification/></Tab.Pane> },
]
class ModalSetting extends React.Component {

  render() {
      const grey = 'gray';
    return (
      <>
        <div className="text-white f-12">
        <Tab
            menu={{grey, fluid: true, vertical: true }}
            menuPosition='left'
            panes={panes}
            grid={{paneWidth: 12, tabWidth: 3}}
        />
        </div>
      </>
    );
  }
}

class TabAppearance_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        valueTheme: this.props.thememode === true ? "night" : "light",
        valueScale: this.props.scaleState,
        valueBalance : "0",
        scalemode: 1,
    }

    resizeResponsive = () => {
        var height667 = $('html').height()-$('.header-normal-menu').height()-8;
        $('.card-667').css('min-height', (height667));
        var height32 = $('.card-32').height();
        $('.card-32').css('min-height', (height32));
        var height635 = height667-height32-1;
        $('.card-635').css('min-height', (height635));
        var height590 = height635-45;
        $('.card-590').css('min-height', (height590));
        var height550 = height635-85;
        $('.card-550').css('min-height', (height550));
        var height520 = height635-115;
        $('.card-520').css('min-height', (height520));
        var cardstockcash = height635-106;
        $('.card-stockcash').css('min-height', (cardstockcash));
        var height295 = height590/2;
        $('.card-295').css('min-height', (height295));
        var height560 = height635-75;
        $('.card-560').css('min-height', (height560));
        var height196 = (height635-45)/3;
        $('.card-196').css('min-height', (height196));
        var height121 = (height635/2)-196;
        $('.card-121').css('min-height', (height121));
        var height586 = height635-49;
        $('.card-586').css('min-height', (height586));
        var height501 = height635-115-19;
        $('.card-501').css('min-height', (height501));
        var height221 = ((height635-115-19)/2)-30;
        $('.card-221').css('min-height', (height221));
        var rsccontainer = height635-49;
        $('.rsc-container').css('min-height', (rsccontainer));
        var rsccontent = height635-49-133;
        $('.rsc-content').css('min-height', (rsccontent));
        var rscscroll = height635-49-40;
        $('.rsc-scroll').css('min-height', (rscscroll));

        var card635 = $('html').height()-$('.header-normal-menu').height()-8-$('.card-32').height();
        if($('html').height() > 2699) {
            var margin67 = (card635-106-80)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-630;
            $('.card-330').css('min-height', (height330));
            var cardheight445 = card635-300;
            $('.card-445').css('min-height', (cardheight445))
            var cardheight490 = card635-255;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-345;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95-30;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-150)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-475;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-75;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-175;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-150;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-600);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-200;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-200);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-345;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+15)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-80;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+240;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+240)/2;
            $('.card-279').css('min-height', (height279));
        } else if($('html').height() > 1899 && $('html').height() < 2700) {
            var margin67 = (card635-106-20)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-470;
            $('.card-330').css('min-height', (height330));
            var cardheight490 = card635-205;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-295;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-130)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-350;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-50;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-150;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-120;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-475);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-120;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-170);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-275;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+9)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-60;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+170;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+170)/2;
            $('.card-279').css('min-height', (height279));
        } else if($('html').height() > 1499 && $('html').height() < 1900) {
            var margin67 = (card635-106-20)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-350;
            $('.card-330').css('min-height', (height330));
            var cardheight445 = card635-190;
            $('.card-445').css('min-height', (cardheight445));
            var cardheight490 = card635-145;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-235;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-105)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-237;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-29;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-120;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-75;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-330);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-21;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-124);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-202;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+14)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-49;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+141;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+141)/2;
            $('.card-279').css('min-height', (height279));
        } else {
            var margin67 = (card635-106)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-305;
            $('.card-330').css('min-height', (height330));
            var cardheight445 = card635-190;
            $('.card-445').css('min-height', (cardheight445));
            var cardheight490 = card635-145;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-235;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-105)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-237;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-29;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-120;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-75;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-330);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-21;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-124);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-202;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+14)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-49;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+141;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+141)/2;
            $('.card-279').css('min-height', (height279));

            //Margin
            if($('html').height() > 2499) {
                var sideMargin = ((height667/440)*100)/13+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1536 && $('html').height() < 2500) {
                var sideMargin = ((height667/440)*100)/10+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1319 && $('html').height() < 1537) {
                var sideMargin = ((height667/440)*100)/7.35+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1100 && $('html').height() < 1320) {
                var sideMargin = ((height667/440)*100)/6.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1042 && $('html').height() < 1099) {
                var sideMargin = ((height667/440)*100)/7.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1023 && $('html').height() < 1043) {
                var sideMargin = ((height667/440)*100)/6.75+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 951 && $('html').height() < 1024) {
                var sideMargin = ((height667/440)*100)/7.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 875 && $('html').height() < 950) {
                var sideMargin = ((height667/440)*100)/8+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 772 && $('html').height() < 876) {
                var sideMargin = ((height667/440)*100)/9+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 695 && $('html').height() < 773) {
                var sideMargin = ((height667/440)*100)/12.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() < 515){
                var sideMargin = '1%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else{
                var sideMargin = '16%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            }

            //Zoom Padding
            if($('html').height() > 2601)  {
                var liveTrade = 4.4;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if ($('html').height() > 2201 && $('html').height() < 2600) {
                var liveTrade = 3.5;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 2049 && $('html').height() < 2200) {
                var liveTrade = 3.1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1533 && $('html').height() < 2050) {
                var liveTrade = 2.3;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1319 && $('html').height() < 1534) {
                var liveTrade = 2.1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1100 && $('html').height() < 1320) {
                var liveTrade = 1.63;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1042 && $('html').height() < 1099) {
                var liveTrade = 1.5;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1023 && $('html').height() < 1043) {
                var liveTrade = 1.4;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 951 && $('html').height() < 1024) {
                var liveTrade = 1.31;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 875 && $('html').height() < 950) {
                var liveTrade = 1.29;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 772 && $('html').height() < 876) {
                var liveTrade = 1.14;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else{
                var liveTrade = 1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            }
        }
    }

    changeScale80 = () => {
        var zoomLevelL = 1.26;

        var zoomLevel = 0.8;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');

        this.resizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "80"
        })
        this.props.changeScale("80");
    }

    changeScale90 = () => {
        var zoomLevelL = 1.1;

        var zoomLevel = 0.9;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');

        this.resizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "90"
        })
        this.props.changeScale("90");
    }

    changeScale100 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');

        this.resizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "100"
        })
        this.props.changeScale("100");
    }

    changeScale110 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1.1;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "50%");
        document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");

        document.body.style.setProperty('--header-menu-scale', 'block');
        document.body.style.setProperty('--header-menu', 'none');

        this.resizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "110"
        })
        this.props.changeScale("110");
    }

    changeScale120 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1.2;
        $('html').css({ zoom: zoomLevel });


        document.body.style.setProperty('--column-col-sm-3-6', "50%");
        document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");

        document.body.style.setProperty('--header-menu-scale', 'block');
        document.body.style.setProperty('--header-menu', 'none');

        this.resizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "120"
        })
        this.props.changeScale("120");
    }

    render() {
        return (
            <div>
                <div className="col align-item-center"> 
                    <div className="text-white setting align-items-center">
                    {/* <div className="border-bottom"> */}
                        <div className="form-group row mb-0">
                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                    Language
                                </div>
                            </div>

                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                    Time zone
                                </div>
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                                    <Dropdown placeholder='Choose' search selection options={stateLanguages} className="col-sm-12 f-12"/>                                                        
                                </div>
                            </div>
                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                                    <Dropdown placeholder='Choose' search selection options={stateTimeZone} className="col-sm-12 f-12"/>                                                                                        
                                </div>
                            </div>
                        </div>
                    {/* </div> */}

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Theme Settings
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-3 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center" >
                            <input type="radio" class="radio_item" value="" name="itemTheme" id="radio1" onClick={
                                (e) => {
                                    this.setState({
                                        valueTheme: "night"
                                    });
                                    this.props.isNight(true);
                                }
                            } checked={this.state.valueTheme === "night" ? true : false}/>
                                <label class="label_item" htmlFor="radio1"> <i className="logo-dark-theme"/> </label>
                            </div>
                        </div>
                        <div class="col-sm-3 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="radio" class="radio_item" value="" name="itemTheme" id="radio2" onClick={
                                (e) => {
                                    this.setState({
                                        valueTheme: "light"
                                    });
                                    this.props.isNight(false);
                                }
                            } checked={this.state.valueTheme === "light" ? true : false} />
                                <label class="label_item" htmlFor="radio2"> <i className="logo-light-theme"/> </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Interface Scale
                            </div>
                            <div className="ui small input col-sm-12 f-9 text-center align-self-center danger-text">
                                *) Not compatible in Mozilla Firefox
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0 pl-4">
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                                
                                <input class="magic-radio" type="radio" name="scale" id="scale1" value="option" onClick={this.changeScale80} checked={this.state.valueScale === "80" ? true : false} />
                                <label htmlFor="scale1" className="text-white">
                                80 %
                                </label>
    
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale2" value="option" onClick={this.changeScale90} checked={this.state.valueScale === "90" ? true : false}/>
                                <label htmlFor="scale2" className="text-white">
                                90 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale3" value="option" onClick={this.changeScale100} checked={this.state.valueScale === "100" ? true : false}/>
                                <label htmlFor="scale3" className="text-white">
                                100 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale4" value="option" onClick={this.changeScale110} checked={this.state.valueScale === "110" ? true : false}/>
                                <label htmlFor="scale4" className="text-white">
                                110 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale5" value="option" onClick={this.changeScale120} checked={this.state.valueScale === "120" ? true : false}/>
                                <label htmlFor="scale5" className="text-white">
                                120 %
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Balance/Limit displayed at the top
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0 pl-4">
                        <div class="col-sm-4 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                            <input class="magic-radio" type="radio" name="balance" id="a" value="option" onClick={
                                (e) => {
                                    this.setState({
                                        valueBalance: "0"
                                    });
                                }
                            } checked={this.state.valueBalance === "0" ? true : false}/>
                                <label htmlFor="a" className="text-white f-10-center">
                                Always show the "Total" amount
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                            <input class="magic-radio" type="radio" name="balance" id="b" value="option" onClick={
                                (e) => {
                                    this.setState({
                                        valueBalance: "1"
                                    });
                                }
                            } checked={this.state.valueBalance === "1" ? true : false}/>
                                <label htmlFor="b" className="text-white f-10-center">
                                Hide account balance/limit
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                   
                </div>
                <div className="form-group row mb-0">
                        <div class="col-sm-12 mx-0 mb-2 pl-5">
                            <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                        </div>
                    </div>
                </div> 
            </div>
            
            
        );
    }
}

class TabPrivacy extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        valuePinUsage : "0",
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
            backgroundColor: '#3c3c3c',
            borderBottom: '2px solid #1A1A1A'
            }
        return (
            <div>
            <div className="col align-item-center"> 
                <div className="text-white setting align-items-center">
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-14 text-center align-self-center text-white">
                                Privacy Settings
                            </div>
                        </div>
                    </div>                        
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Email
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                               <input type="text"/>
                            </div>
                        </div>
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                                <button className="btn btn-md btn-primary">Changes</button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-9 text-right">
                                <i className="text-blue">Current email</i>
                            </div>
                        </div>
                    </div>
                {/* </div> */}

                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Profile Photo
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-1 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                            <div className="col-md-12" style={imgdisplay}>  
                                <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center ver-center">
                            <button className="btn btn-md btn-primary">Upload</button>
                        </div>
                    </div>
                </div>

                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Pin Usage
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0 pl-4">
                    <div class="col-sm-4 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                        <input class="magic-radio" type="radio" name="balance" id="a" value="option" onClick={
                            (e) => {
                                this.setState({
                                    valuePinUsage: "0"
                                });
                            }
                        } checked={this.state.valuePinUsage === "0" ? true : false}/>
                            <label htmlFor="a" className="text-white f-12-center">
                            Always use PIN
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-4 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                        <input class="magic-radio" type="radio" name="balance" id="b" value="option" onClick={
                            (e) => {
                                this.setState({
                                    valuePinUsage: "1"
                                });
                            }
                        } checked={this.state.valuePinUsage === "1" ? true : false}/>
                            <label htmlFor="b" className="text-white f-12-center">
                            Once PIN
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center danger-text">
                            *) Only use PIN for 1st transaction each Login
                        </div>
                    </div>
                </div>
                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

               
            </div>
            <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 pl-5">
                        <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                    </div>
                </div>
            </div>
        </div>  
        );
    }
}

class TabNotification extends React.Component {
    render() {
        return (
            <div>
            <div className="col align-item-center"> 
                <div className="text-white setting align-items-center">
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-14 text-center align-self-center text-white">
                                Notification Settings
                            </div>
                        </div>
                    </div>                        
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                NOTIFICATION ON THE PLATFORM
                            </div>
                        </div>
                    </div>
        
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif1" id="notif1" value="option"/>
                                <label htmlFor="notif1" className="text-white f-12-center">
                                Notify me when my Forex/CFD position is about to close
                                </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif2" id="notif2" value="option"/>
                                <label htmlFor="notif2" className="text-white f-12-center">
                                Notify me of my new position in the rating this week
                                </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif3" id="notif3" value="option"/>
                                <label htmlFor="notif3" className="text-white f-12-center">
                                Price Alert Set
                                </label>
                        </div>
                    </div>
                </div>

                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
               
                <div className="form-group row mb-0">
                    <div class="col-sm-5 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            IN-BROWSER NOTIFICATION
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif4" id="notif4" value="option"/>
                                <label htmlFor="notif4" className="text-white f-12-center">
                                Background Push Notifications
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Account Activity
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif5" id="notif5" value="option"/>
                                <label htmlFor="notif5" className="text-white f-12-center">
                                Closed trades
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Receive the resuilt of trades even while you are away
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif6" id="notif6" value="option"/>
                                <label htmlFor="notif6" className="text-white f-12-center">
                                Successful withdrawal
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;We Will let you know once the request is appoved
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif7" id="notif7" value="option"/>
                                <label htmlFor="notif7" className="text-white f-12-center">
                                Pending orders
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Receive notifications when your pending orders get executed or canceled
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif8" id="notif8" value="option"/>
                                <label htmlFor="notif8" className="text-white f-12-center">
                                Margin trading notifications
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Margin trading notifications
                        </div>
                    </div>
                </div>

            </div>
            <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 pl-5">
                        <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                    </div>
                </div>
            </div>
        </div>
        
            
        );
    }
}

const TabAppearance = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        isNight : (thememode)=> {actions.sendAction('isNight', {thememode})},
        scaleState : vars.scaleState,
        changeScale : (scaleState) => {actions.sendAction('changeScale', {scaleState})}
    }),
)(TabAppearance_Base);

export default ModalSetting;