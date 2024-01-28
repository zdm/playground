import StartModule from "#core/app/components/telegram/telegram/bot/commands/start";

export default Super =>
    class extends StartModule( Super ) {
        #commandsHash;

        // public
        getCommands ( ctx ) {
            return [

                //
                "start",
                "create_post",
                "settings",
            ];
        }

        async run ( ctx, req ) {
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
                                "text": this.l10nt( "some action" ),
                                "callback_data": this.encodeCallbackData( "text" ),
                            },
                            {
                                "text": this.l10nt( "open localhost" ),
                                "url": "https://webapp.localhost/",
                            },
                            {
                                "text": this.l10nt( "open localhost" ),
                                "url": "https://webapp.localhost/",
                            },
                        ],
                        [
                            {
                                "text": this.l10nt( "webapp" ),
                                "web_app": {
                                    "url": await ctx.createWebAooUrl( {
                                        "page": "orders",
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
