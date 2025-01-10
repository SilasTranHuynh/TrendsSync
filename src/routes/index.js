import Home from '~/pages/Home';
import Hashtag from '~/pages/Hashtag';
import Topic from '~/pages/Topic';
import PostReddit from '~/pages/PostReddit';
import PostNews from '~/pages/PostNews';
import VideoVN  from '~/pages/VideoVN'; 
import VideoUS from '~/pages/VideoUS';
import VideoKR from '~/pages/VideoKR';
import Twitter from '~/pages/TwitterTrending';
import Search from '~/pages/SearchTrending';
import SignInSignUpForm from '~/pages/SignInSignUp';
import SignUpSignInForm from '~/pages/SignUpSignIn';
import Admin from '~/pages/Admin';
import CreateUser from '~/pages/Admin/CreateUser';
import UpdateUser from '~/pages/Admin/UpdateUser';
import Profile from '~/pages/Profile';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/hashtag', component: Hashtag },
    { path: '/topic', component: Topic },
    { path: '/postReddit', component: PostReddit },
    { path: '/postNews', component: PostNews },
    { path: '/videoVN', component: VideoVN},
    { path: '/videoUS', component: VideoUS},
    { path: '/videoKR', component: VideoKR},
    { path: '/twitter', component: Twitter},
    { path: '/search', component: Search},
    { path: '/signinsignup', component: SignInSignUpForm},
    { path: '/signupsignin', component: SignUpSignInForm},
    { path: '/adminpage', component: Admin},
    { path: '/adminpage/createuser', component: CreateUser},
    { path: '/adminpage/update/:id', component: UpdateUser},
    { path: '/profile', component: Profile}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };