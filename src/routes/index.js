import Home from '~/pages/Home';
import Hashtag from '~/pages/Hashtag';
import Topic from '~/pages/Topic';
import Post from '~/pages/Post';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/hashtag', component: Hashtag },
    { path: '/topic', component: Topic },
    { path: '/post', component: Post },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
