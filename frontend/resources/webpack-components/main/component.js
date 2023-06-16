import WebpackComponent from "@softvisio/vue-ext/webpack-components/main";

export default class extends WebpackComponent {

    // public
    validateEnv ( env ) {
        return super.validateEnv( env ) || this._validateEnv( env, import.meta.url );
    }
}
