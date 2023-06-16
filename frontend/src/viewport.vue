<script>
import Viewport from "#vue/viewport";
import { defineAsyncComponent } from "vue";

export default {
    "extends": Viewport,

    created () {
        this.publicView = defineAsyncComponent( () => import( /* webpackChunkName: "public" */ "@/views/public.vue" ) );
        this.privateView = defineAsyncComponent( () => import( /* webpackChunkName: "private" */ "@/views/private.vue" ) );
    },

    "methods": {
        async _onRoute ( route ) {
            Viewport.methods._onRoute.call( this, route );
        },
    },
};
</script>
