import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profile'
// import { get } from 'config';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';



const Dashboard = ({ getCurrentProfile, deleteAccount, auth: {user}, profile: { profile, loading } }) =>
{

    useEffect(() =>
    {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (<Spinner />) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                Welcome {user && user.name}
            </p>
            {profile !== null ? (<Fragment> <DashboardActions /> <Experience experience={profile.experience} /> <Education experience={profile.experience} />
                <div className="my-2">
                    <button className='btn btn-danger' onClick={() => deleteAccount()}>Delete My Account</button>               
                </div>            
            </Fragment>) :
                (<Fragment>
                    <p> You have not yet setup a profile, please add some info</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>)}
        </Fragment>);
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);










// const name = 'steven';
// const age = 20;

// if (age > 0 && age < 12)
// {
//     console.log(`${name} is not allowed`)
// } else
// {
//     console.log(`${name} is allowed`)
// }