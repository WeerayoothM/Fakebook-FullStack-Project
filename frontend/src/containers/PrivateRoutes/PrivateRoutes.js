import React from 'react';
import RolesLists from '../../config/roles';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import NavBar from '../../components/NavBar/NavBar';

function PrivateRoutes(props) {
    const role = props.role || "GUEST";

    return (
        <>
            {role !== "GUEST" ? <NavBar setRole={props.setRole} /> : null}
            <Switch>
                {RolesLists[role].map(({ path, page: PageComponent }, idx) => <Route key={idx} exact path={path}>
                    <PageComponent setRole={props.setRole} />
                </Route>)}
                <Route path="*" component={NotFound} />
            </Switch>
        </>
    )
}

export default PrivateRoutes;
