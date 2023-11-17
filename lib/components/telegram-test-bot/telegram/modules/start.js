import StartModule from "#core/app/components/telegram/telegram/bot/modules/start";

export default Super =>
    class extends StartModule( Super ) {
        #commandsHash;

        // properties
        get commands () {
            return [
                {
                    "command": "start",
                    "description": this.l10nt( "Start" ),
                },
                {
                    "command": "settings",
                    "description": this.l10nt( "Settings" ),
                },
            ];
        }

        // public
        async run ( ctx, req ) {
            var res;

            res = await this.#sendInlineKeyboard( ctx );
            if ( !res.ok ) console.log( res );

            // res = await this.#sendKeyboard( ctx );
            // if ( !res.ok ) console.log( res );

            // res = await this.#removeKeyboard( ctx );
            // if ( !res.ok ) console.log( res );
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
                                    "url": ctx.createWebAooUrl( {
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

        async #sendKeyboard ( ctx ) {
            return ctx.user.send( "sendMessage", {
                "text": "some text",
                "reply_markup": {
                    "is_persistent": false,
                    "resize_keyboard": true,
                    "one_time_keyboard": true,
                    "input_field_placeholder": "some placeholder",
                    "keyboard": [
                        [
                            {
                                "text": this.l10nt( "some action" ),
                            },
                        ],
                        [
                            {
                                "text": this.l10nt( "Contact" ),
                                "request_contact": true,
                            },
                        ],
                        [
                            {
                                "text": this.l10nt( "Location" ),
                                "request_location": true,
                            },
                        ],
                        [
                            {
                                "text": this.l10nt( "webapp" ),
                                "web_app": {
                                    "url": "https://webapp.localhost/",
                                },
                            },
                        ],
                    ],
                },
            } );
        }

        async #removeKeyboard ( ctx ) {
            return ctx.user.send( "sendMessage", {
                "text": "keynoard removed",
                "reply_markup": {
                    "remove_keyboard": true,
                },
            } );
        }
    };
