import React from 'react'
import { Switch } from 'react-router'
import Main from './Main'
import RouteWithProps from '../../../Shared/routes/RouteWithProps'
import routes from '../../../routes'
import Reports from '../Reports'
import Updateprofile from '../Updateprofile'
import updateAss from '../updateAss'
import viewreports from '../ClientDashboard/ViewReports'
import Admin from './Admin';


const AdminDashboard = ()=>{

    return(

        <Switch>
            <RouteWithProps exact path={routes.main} component={Admin}/>
            
            <RouteWithProps exact path={routes.AdminUpdate} component={Updateprofile}/>
            <RouteWithProps exact path={routes.UpdateRequest} component={updateAss}/>
            <RouteWithProps exact path={routes.Report} component={viewreports}/>

        </Switch>

    )

}

export default AdminDashboard;