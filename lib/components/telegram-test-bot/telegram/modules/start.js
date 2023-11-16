export default Super =>
    class extends Super {

        // public
        // XXX set commands
        async onRequest ( ctx, req ) {
            await this._setCommands( ctx );

            // command
            if ( req.command ) {

                // command is valid
                if ( this.bot.getModuleInstance( req.command ) ) {
                    return ctx.runModule( req.command );
                }

                // command is not valie
                else {
                    return this._onInvalidCommand( ctx, req );
                }
            }

            // run module
            else {
                return ctx.runModule( ctx.userModule, req );
            }
        }

        async run ( ctx, req ) {
            var res;

            // res = await ctx.user.setChatCommands();
            // if ( !res.ok ) console.log( res );

            res = await this.#sendInlineKeyboard( ctx );
            if ( !res.ok ) console.log( res );

            // res = await this.#sendKeyboard( ctx );
            // if ( !res.ok ) console.log( res );

            // res = await this.#removeKeyboard( ctx );
            // if ( !res.ok ) console.log( res );
        }

        // protected
        async _onInvalidCommand ( ctx, req ) {
            await ctx.user.sendText( this.l10nt( `Command is unknown. Please, use commands from "Menu".` ) );
        }

        // XXX
        async _setCommands ( ctx ) {

            // XXX check commands hash

            return this.#setChatCommands( ctx );
        }

        // private
        async #setChatCommands ( ctx ) {
            return ctx.user.setChatCommands( [
                {
                    "command": "start",
                    "description": this.l10nt( "Start" ),
                },
                {
                    "command": "settings",
                    "description": this.l10nt( "Settings" ),
                },
            ] );
        }

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
