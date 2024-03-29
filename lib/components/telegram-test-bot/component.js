import Component from "#core/app/components/telegram/bot/sub-component";

export default Super =>
    class extends Component( Super ) {

        // protected
        async _init () {
            var res;

            res = await super._init();
            if ( !res.ok ) return res;

            return result( 200 );
        }

        async _createBot ( dbh, id, options ) {
            return super._createBot( dbh, id, options );
        }
    };
