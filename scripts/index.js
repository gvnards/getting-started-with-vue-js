/** Diving into Vue */
// static post Vue component
Vue.component('static-posts', {
    // setting the template that this component will use to render
    template: '#static-posts-template',

    // the data function is where we define all the variables this component will need
    // in this specific case, we only need to worry about an array of posts
    data: () => ({
        posts: []
    }),

    // this is called whenever this component is mounted onto the DOM
    // basically whenever we want to show all the posts, we go and get them
    mounted() {
        this.getPosts();
    },

    // this is where you define all the methods this component needs
    methods: {
        // getPost simply sets the 'posts' variable with static data
        getPosts() {
            this.posts = [
                {"title": "The first post title!"},
                {"title": "The second post title!"},
                {"title": "The third post title!"}
            ];
        }
    }
});
// create new Vue instance and mount onto element with id app-1
new Vue({
    el: '#app-2'
});


// my static post
Vue.component('my-static', {
    template: '#my-static-posts',
    data: () => ({
        myPosts: []
    }),
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            this.myPosts = [
                {"hobby": `Gaming`},
                {"hobby": "Swimming"},
                {"hobby": 'Teaching'}
            ];
        }
    }
});
new Vue({
    el: '#try-app-1'
});

/** Data Requests and Routing */
// base Url of the API
const baseUrl = "http://jsonplaceholder.typicode.com";
// list component
const List = {
    template: '#list-template',
    data: () => ({
        posts: []
    }),
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            axios.get(baseUrl + `/posts`).then(response => {
                this.posts = response.data;
                console.log(this.posts);
            }).catch(error => {
                console.log(error);
            })
        }
    }
};
// post component
const Post = {
    template: '#post-template',
    data: () => ({
        post: null
    }),
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            var id = this.$route.params.id;
            //console.log(`ID Route : ${id}`);
            axios.get(baseUrl + `/posts/` + id).then(response => {
                this.post = respose.data;
                console.log(this.post);
            }).catch(error => {
                console.log(error);
            })
        }
    }
};
// create vue router
var router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'homepage',
            path: '/',
            component: List
        }, {
            name: 'post',
            path: '/:id',
            component: Post
        }
    ]
});
// create vue instance with our router, and mount onto #app-3
var vue = new Vue({router});
var app = vue.$mount('#app-3');