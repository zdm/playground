export default Super =>
    class extends Super {

        // public
        async run ( ctx, update ) {
            var res;

            res = await this.#setChatCommands( ctx );
            if ( !res.ok ) console.log( res );

            res = await this.#sendInlineKeyboard( ctx );
            if ( !res.ok ) console.log( res );

            res = await this.#sendKeyboard( ctx );
            if ( !res.ok ) console.log( res );

            // res = await this.#removeKeyboard( ctx );
            // if ( !res.ok ) console.log( res );
        }

        // protexted
        _createAction ( text ) {
            return this.bot.config.telegram.actionPrefix + " " + text;
        }

        // private
        async #setChatCommands ( ctx ) {
            return ctx.bot.telegramBotApi.setMyCommands( {
                "scope": {
                    "type": "chat",
                    "chat_id": ctx.user.telegramId,
                },
                "commands": [
                    {
                        "command": "start",
                        "description": "Start",
                    },
                    {
                        "command": "test",
                        "description": "Test",
                    },
                    {
                        "command": "back",
                        "description": "<- back",
                    },
                ],
            } );
        }

        async #sendInlineKeyboard ( ctx ) {
            return ctx.user.send( "sendMessage", {
                "text": "some text",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                "text": "some action",
                                "callback_data": "123",
                            },
                        ],
                        [
                            {
                                "text": "open localhost",
                                "url": "https://webapp.localhost/",
                            },
                        ],
                        [
                            {
                                "text": "webapp",
                                "web_app": {
                                    "url": "https://webapp.localhost/",
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
                                "text": this._createAction( "some action" ),
                            },
                        ],
                        [
                            {
                                "text": "Contact",
                                "request_contact": true,
                            },
                        ],
                        [
                            {
                                "text": "Location",
                                "request_location": true,
                            },
                        ],
                        [
                            {
                                "text": "webapp",
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
