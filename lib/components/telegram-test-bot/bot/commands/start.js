import StartModule from "#core/app/components/telegram/bot/commands/start";

export default Super =>
    class extends StartModule( Super ) {
        #commandsHash;

        // public
        async run ( ctx, requestMessage ) {
            var res;

            res = await ctx.sendChatAction();
            if ( !res.ok ) console.log( res );

            res = await this.#sendInlineKeyboard( ctx );
            if ( !res.ok ) console.log( res );
        }

        // private
        async #sendInlineKeyboard ( ctx ) {
            return ctx.user.send( "sendMessage", {
                "text": "some text",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                "text": l10nt( "some action" ),
                                "callback_data": this.encodeCallbackData( "text" ),
                            },
                            {
                                "text": l10nt( "open localhost" ),
                                "url": "https://webapp.localhost/",
                            },
                            {
                                "text": l10nt( "open localhost" ),
                                "url": "https://webapp.localhost/",
                            },
                        ],
                        [
                            {
                                "text": "webapp",
                                "web_app": {
                                    "url": ctx.createWebAooUrl( {
                                        "type": "orders",
                                    } ),
                                },
                            },
                        ],

                        // [
                        //     {
                        //         "text": "Login",
                        //         "login_url": {
                        //             "url": "https://webapp.localhost/",
                        //         },
                        //     },
                        // ],
                    ],
                },
            } );
        }
    };
