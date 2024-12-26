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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };