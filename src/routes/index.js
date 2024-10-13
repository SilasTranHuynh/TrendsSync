import Home from '~/pages/Home';
import Hashtag from '~/pages/Hashtag';
import Topic from '~/pages/Topic';
import PostReddit from '~/pages/PostReddit';
import PostNews from '~/pages/PostNews';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/hashtag', component: Hashtag },
    { path: '/topic', component: Topic },
    { path: '/postReddit', component: PostReddit },
    { path: '/postNews', component: PostNews },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
