import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Drawerpage from '../components/Drawer page/Drawerpage'
import Login from '../components/Login/Login'
import ResetPassword from '../components/Login/ResetPassword'
import Forgot from '../components/Login/Forgot'
import Dashboard from '../components/Dashboard/DashboardMaster'
import AppointmentList from '../components/AppointmentsList/AppointmentsMaster'
import CancelAppointmentMaster from '../components/CancelAppointments/CancelAppointmentMaster'
import RescheduleAppointmentMaster from '../components/ResheduleAppointments/ResheduleAppointmentMaster'
import LabTestMaster from '../components/ManageTest/LabTestMaster'
import RevenueMaster from '../components/Revenue/RevenueMaster' 
import MediaUploadsMaster from '../components/MediaUploads/MediaUploadsMaster'
import UploadMaster from '../components/UploadResult/UploadMaster'
import AdvertisementMaster from "../components/AdvertisementBooking/AdvertisementMaster"
import PaymentReceived from "../components/PaymentReceived/PaymentReceived"
import CancelPayment from "../components/CancelPayment/CancelPayment";
import DealsMaster from "../components/Deals/DealsMaster";
import ProfileComp from '../components/LabProfile/ProfileComp';
// import Stepper from "../components/AdvertisementBooking/Stepper"

const AppRouter = () => (
    <BrowserRouter>   
            <Drawerpage>  
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/forgot" component={Forgot}/>
                <Route path="/resetpassword" component={ResetPassword}/> 
                <Route path="/dashboard" component={Dashboard} exact/>
                <Route path="/AppointmentsList" component={AppointmentList}/>
                <Route path="/CancelAppointments" component={CancelAppointmentMaster}/>
                <Route path="/uploadresults" component={UploadMaster}/>
                <Route path="/Revenue" component={RevenueMaster}/>
                <Route path="/mediauploads" component={MediaUploadsMaster}/>
                <Route path="/Reschedule" component={RescheduleAppointmentMaster}/>
                <Route path="/Test" component={LabTestMaster}/>
                <Route path="/Advertisement" component={AdvertisementMaster}/>
                <Route path="/Deal" component={DealsMaster} />
                <Route path="/Paymentreceived" component={PaymentReceived}/>
                <Route path="/Cancelpayment" component={CancelPayment} />
                <Route path="/profile" component={ProfileComp} exact/>
                {/* <Route path="/stepper" component={Stepper} /> */}
            </Switch>
            </Drawerpage>
    </BrowserRouter>    
)

export default AppRouter;

