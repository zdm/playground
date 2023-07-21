import { sleep } from "#core/utils";

// import sql from "#core/sql";

const filename = "111/aaa.txt";

export default Super =>
    class extends Super {
        #locale;

        async API_bench ( ctx ) {
            return result( 200 );
        }

        async API_test ( ctx, delay ) {

            // console.log( "---", "test" );

            if ( super.API_test ) await super.API_test( ctx );

            if ( delay ) await sleep( delay );

            if ( Math.random() > 0.7 ) {
                const res = await this.#doTest();
                return res;

                // return result.exception( 500 );
            }
            else {
                return result( 200 );
            }
        }

        async API_upload ( ctx, { params, file1, file2 } ) {
            console.log( "--- upload:" );
            console.log( params );
            console.log( file1?.name, file1?.size );
            console.log( file2?.name, file2?.size );

            const res = await this.app.storage.uploadFile( filename, file1, {
                "contentType": file1.type,
                "cacheControl": "private, must-revalidate",

                // "ttl": 1000 * 30, // 30 sec.
            } );

            console.log( "--- storage", res + "" );

            return result( 200 );
        }

        async API_download ( ctx ) {
            return result( 200, {
                "url": this.app.storage.getFileUrl( filename ),
            } );
        }

        async API_sendNotification ( ctx ) {
            this.#locale ??= this.app.locales.getAppLocale();

            await this.app.notifications.sendNotification(
                "other",
                ctx.user.id,
                this.#locale.i18nt( locale => locale.i18n( `Test` ) ),
                this.#locale.i18nt( locale =>
                    locale.i18n( msgid`The Request a Test Notification endpoint prompts the App Store server to send your server a notification with the TEST notificationType.

Date: ${locale.formatDate( new Date() )}
` ) )
            );

            await this.app.acl.sendAclNotification(
                -1,
                "updates",
                this.#locale.i18nt( locale => locale.i18n( `ACL Test` ) ),
                this.#locale.i18nt( locale =>
                    locale.i18n( msgid`The Request a Test Notification endpoint prompts the App Store server to send your server a notification with the TEST notificationType.

Date: ${locale.formatDate( new Date() )}
` ) )
            );

            return result( 200 );
        }

        async API_sendPushNotification ( ctx ) {
            const res = await this.app.notifications.sendPushNotification( ctx.user.id, "Темы", "Тексе сщщбщения" );

            return res;
        }

        // private
        async #doTest () {
            throw Error( `Test exception thrown` );

            // return this.dbh.select( sql`SELECT * FROM fake` );
        }
    };
