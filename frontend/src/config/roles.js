import Feed from '../containers/pages/Feed/Feed';
import Login from '../containers/pages/Login/Login';
import ManageList from '../containers/pages/ManageList/ManageList';
import Profile from '../containers/pages/Profile/Profile';
import Register from '../containers/pages/Register/Register';
import EditProfile from '../containers/pages/EditProfile/EditProfile';

const components = {
    feed: {
        path: '/',
        page: Feed,
    },
    login: {
        path: '/',
        page: Login
    },
    list: {
        path: '/list',
        page: ManageList
    },
    profile: {
        path: '/profile/:id',
        page: Profile
    },
    editprofile: {
        path: '/editprofile',
        page: EditProfile
    },
    register: {
        path: '/register',
        page: Register
    }
};

const roles = {
    GUEST: [
        components.login,
        components.register
    ],
    USER: [
        components.feed,
        components.profile,
        components.list,
        components.editprofile
    ]
};

export default roles;