import React from "react";
import { Switch } from "react-router-dom";
import RouteWithProps from "../../../Shared/routes/RouteWithProps";
import routes from '../../../routes'
import DashboardMain from '../../pages/ClientDashboard/DashboardMain'
import ScheduleBooking from '../../pages/ScheduleBooking/ScheduleNew'
import Updateprofile from "../Updateprofile";
import ViewReports from "./ViewReports";
import Dashboard from "./Dashboard";

const ClientDashboard=()=>{

    

    return(
        <Switch>
            <RouteWithProps exact path={routes.dashboard} component={Dashboard}/>
            <RouteWithProps exact path={routes.Schedule}  component={ScheduleBooking}/>
            <RouteWithProps exact path={routes.View}  component={ViewReports}/>
            <RouteWithProps exact path={routes.updateprofile}   component={Updateprofile}/>
        </Switch>

    )
}

export default ClientDashboard;