import { createApp } from "vue";
import "./style.css";
import App from "./pages/public/App.vue";

import { createPinia } from "pinia";
import publicRouter from "./routes/public";

// Use private routes as you need. Example: authorization;
import privateRouter from "./routes/private";
import HelloPublic from "./components/HelloPublic.vue";

async function startApp() {
    const pinia = createPinia();
    const rootProps: Record<string, unknown> = {
        store: pinia,
    };

    let _app = null;

    let _router = null;

    try {
        // private router logic here ...
        _app = App;

        _router = privateRouter;
        rootProps.router = privateRouter;

        throw new Error("route");
    } catch (err) {
        _app = HelloPublic;

        _router = publicRouter;
        rootProps.router = publicRouter;
    }

    const app = createApp(_app, rootProps);

    app.use(_router);
    app.use(pinia);

    app.mount("#app");
}
startApp();
