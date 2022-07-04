import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        //路由重定向
        redirect: {
            path: '/sy',
            name: 'Sy',
        },
        children: [{
                path: '/sy',
                name: 'Sy',
                component: () =>
                    import ('../views/pages/Sy.vue')
            },
            {
                path: '/hy',
                name: 'Hy',
                component: () =>
                    import ('../views/pages/Hy.vue')
            },
            {
                path: '/kc',
                name: 'Kc',
                component: () =>
                    import ('../views/pages/Kc.vue')
            },
            {
                path: '/hb',
                name: 'Hb',
                component: () =>
                    import ('../views/pages/Hb.vue')
            },
            {
                path: '/bb',
                name: 'Bb',
                component: () =>
                    import ('../views/pages/Bb.vue')
            },
            {
                path: '/fz',
                name: 'Fz',
                component: () =>
                    import ('../views/pages/Fz.vue')
            },
            {
                path: '/tc',
                name: 'Tc',
                component: () =>
                    import ('../views/pages/Tc.vue')
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/regin',
        name: 'Regin',
        component: () =>
            import ('../views/Regin.vue')
    },
    {
        path: '*',
        name: 'Error',
        component: () =>
            import ('../views/Error.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router