import App from "#core/app";

// import File from "#core/file";

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

        // XXX
        // var res = await this.storage.uploadFile( "1/test.js", new File( { "path": "lib/app.js" } ) );
        // console.log( res + "" );
        // if ( !res.ok ) process.exit();

        // console.log( await this.storage.glob( "test.js", { "cwd": "/1" } ) );

        // res = await this.storage.deleteFile( "1/test.js" );
        // console.log( res + "" );
        // if ( !res.ok ) process.exit();

        // await this.storage.clear();
        // process.exit();

        // res = await this.storage.copyFile( "1/test.js", "1/test-COPY.js" );
        // console.log( res );

        // var res;

        // res = await this.telegram.getBot( 1 ).files.createFile( {
        //     "fileId": "BQACAgIAAxkBAAIFp2UdnrxoXd_Z6u8NcO6gcB_8Nq1jAAKdOwACn-TxSLBmHg8FX1lKMAQ",
        //     "fileUniqueId": "AgADnTsAAp_k8Ug",
        //     "filename": "image.jpg",
        //     "contentType": "image/jpeg",
        // } );
        // console.log( res );

        // res = await this.telegram.getBot( 1 ).files.getFile( "BQACAgIAAxkBAAIFp2UdnrxoXd_Z6u8NcO6gcB_8Nq1jAAKdOwACn-TxSLBmHg8FX1lKMAQ" );

        // // res = await this.telegram.getBot( 1 ).files.getFile( 1 );
        // console.log( res );

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
