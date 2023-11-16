import crypto from "node:crypto";

export default Super =>
    class extends Super {
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
        async onRequest ( ctx, req ) {
            if ( await this._checkLocale( ctx ) ) return;

            await this.#setCommands( ctx );

            // command
            if ( req.command ) {

                // command is valid
                if ( this.bot.getModuleInstance( req.command ) ) {
                    return ctx.call( req.command );
                }

                // command is not valie
                else {
                    return this._onInvalidCommand( ctx, req );
                }
            }

            // run module
            else {
                return ctx.call( ctx.userModule, req );
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

        async _checkLocale ( ctx ) {
            if ( !this.bot.locales.canChangeLocale( ctx.user.locale ) ) return;

            await ctx.call( "/locale" );

            return true;
        }

        // private
        async #setCommands ( ctx ) {
            if ( !this.#commandsHash ) {
                const commands = JSON.stringify( this.commands );

                this.#commandsHash = crypto.createHash( "MD5" ).update( commands ).digest( "base64url" );
            }

            if ( this.#commandsHash !== ctx.state.commandsHash || ctx.user.locale !== ctx.state.commandsLocale ) {
                await ctx.user.setChatCommands( this.commands );

                await ctx.updateState( {
                    "commandsHash": this.#commandsHash,
                    "commandsLocale": ctx.user.locale,
                } );
            }
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
