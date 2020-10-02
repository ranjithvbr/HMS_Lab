import React from 'react';
import Button from '@material-ui/core/Button';
import './CancelPayment.css'
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import leftarrow from '../../Images/leftarrow.svg'
import rightarrow from '../../Images/rightarrow.svg'
import atmcard from "../../Images/atmcard.PNG"
import Labelbox from '../../helpers/labelbox/labelbox'
import { NavLink} from "react-router-dom";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default class CancelPayment extends React.Component{
    constructor(props)
    {
    super(props)
    this.state={
        mode: 'left',
    }
    }
    callback(key) {
        console.log(key);
      }
    render()
    {
        const { mode } = this.state;

        return(
            <div className="CancelPayment">
               <div className="option_container">
                   <div><p className="select_text">Select Option to Pay <span className="option_amt">2500 KWD</span></p></div>
                    <div><Button className="cancelpay_button">Cancel Payment</Button></div>
               </div>
               <div className="payment_method_container">
                   <p className="select_pay_text">Please Select a Payment Method</p>
                      <Divider light  className="select_divider"/>
                      <Grid container  className="saved_cards_container">
                        <Grid item xs={12} md={4} className="payment_method_child">
                           <p className="saved_cards">Saved Cards</p>
                           <div className="saved_cards_parent">
                           <div className="right_leftarrow">
                                <img src={rightarrow}/>
                            </div>
                            <div className="debit_container">
                            <div className="debit_child">
                            
                               <img src={atmcard} className="deb_img"/> 
                               <div className="card_text"></div>
                               </div>
                               </div>
                               <div className="right_leftarrow">
                               <img src={leftarrow}/>
                               </div>
                           </div>
                      </Grid>
                      <Grid item xs={8} md={5}>
                         <div className="payment_method">
                         <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 320, wordWrap:"break-word" }}>
                            {/* {[...Array(3).keys()].map(i => ( */}
                                <TabPane tab={`Card`} key={1}>
                                {/* Content of tab {i} */}
                                </TabPane>
                            < TabPane tab={`Wallet`} key={2}>
                                {/* Content of tab {i} */}
                                </TabPane>
                                <TabPane tab={`Knet`} key={3}>
                                {/* Content of tab {i} */}
                                </TabPane>
                            
                            {/* ))} */}
                            </Tabs>
                             <div className="payment_method_list">
                                 <Labelbox type="text" labelname="Card Number" value="3454 - 3213 - 7849 - 3943"/>
                                 <Labelbox type="text" labelname="Card Holder Name" value="K.KHADIJA"/>

                                <div className="labels_expirydate">
                                <div style={{width:"70%"}}>Expiry Date</div>
                                <div style={{width:"25%"}}>CVV</div>
                                </div>

                                 <div className="expiry_date_div">
                                 <div className="expiry_day">
                                 <Labelbox type="select"  value="05"/>
                                 <Labelbox  type="select" value="2010"/>


                                </div>
                                    <div className="cvv_edit">
                                    <Labelbox type="text"  value="202"></Labelbox>
                                </div>

                                </div>

                                
                             </div>
                         </div>
                         
                      </Grid>
                      <Grid item xs={4} md={3}>
                          <div className="summary_div">
                            <p className="summary_text">Summary</p>
                            <div className="sub_total_div"><p>SubTotal</p><span>2500</span></div>
                                 <Divider/>
                            <div className="sub_total_div"><p>Total</p><span>2500</span></div>
                            </div>
                            
                      </Grid>
                     
                      </Grid>  
                      <div className="pay_now_container"><Button className="pay_now_button" component={NavLink} to="/Home/Paymentreceived">Pay Now</Button></div>
              </div>
            </div>
        )
    }
}