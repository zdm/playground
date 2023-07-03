import App from "#core/app";

export default class extends App {

    // propeties
    get location () {
        return import.meta.url;
    }

    // protected
    async _init () {
        return result( 200 );
    }

    async _start () {

        // setInterval( () => {
        //     this.publishToRpc( "test", "rpc", 1, 2, 3 );

        //     this.publishToApi( "test/", ["root"], "api", 4, 5, 6 );
        // }, 2000 );

        // this.on( "api/test1", ( ctx, ...args ) => console.log( "--- incoming", "test", ctx.user.id, ...args ) );

        // test cluster events
        // const id = Math.floor( Math.random() * 1000 );
        // this.on( "/test", data => ( data.id === id ? "" : console.log( "--- test", data ) ) );
        // setInterval( () => this.publish( "/test", { id, "timestamp": Date.now() } ), 1000 );

        // setInterval( () => {
        // this.publishToApi( "/test/", ["guests"] );

        //     this.notifications.sendNotification( "other", -1, "test", "test" );
        // }, 3000 );

        return super._start();
    }

    async _startThreads () {
        return this.threads.start( {
            "worker": {
                "numberOfThreads": 1,
                "module": new URL( "threads/worker.js", import.meta.url ),
                "arguments": [
                    {
                        "dbh": this.dbh,
                    },
                ],
            },
        } );
    }
}
