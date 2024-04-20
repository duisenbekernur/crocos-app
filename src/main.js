import { createApp } from "vue";
import "./style.css";
import App from "./pages/public/App.vue";

import { createPinia } from "pinia";
import publicRouter from "./routes/public/index.js";

// Use private routes as you need. Example: authorization;
// import privateRouter from "./routes/private";
// import HelloPublic from "./components/HelloPublic.vue";

async function startApp() {
    const pinia = createPinia();
    const rootProps = {
        store: pinia,
    };

    let _app = null;

    let _router = null;

    try {
        throw new Error('public app');
        // private router logic here ...
        // _app = App;
        //
        // _router = privateRouter;
        // rootProps.router = privateRouter;
    } catch (err) {
        _app = App;

        _router = publicRouter;
        rootProps.router = publicRouter;
    }

    const app = createApp(_app, rootProps);

    app.use(_router);
    app.use(pinia);

    app.mount("#app");
}
startApp();
