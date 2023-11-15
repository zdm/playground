export default Super =>
    class extends Super {

        // public
        async run ( ctx, req ) {
            var res;

            res = await ctx.user.setChatCommands();
            if ( !res.ok ) console.log( res );

            await this.#deleteMessage( ctx );

            await this.#sendInlineKeyboard( ctx );
        }

        async API_setLocale ( ctx, locale ) {
            const res = await ctx.user.setLocale( locale );

            if ( !res.ok ) {
                await ctx.user.sendText( this.l10nt( `Some error occured, pleast try again.` ) );
            }
            else {
                await this.#deleteMessage( ctx );

                return ctx.runModule( "/" );
            }
        }

        // private
        async #sendInlineKeyboard ( ctx ) {
            const res = await ctx.user.send( "sendMessage", {
                "text": this.l10nt( `Please, select your communication language:` ),
                "reply_markup": {
                    "remove_keyboard": true,
                    "inline_keyboard": [
                        [
                            {
                                "text": this.l10nt( "some action" ),
                                "callback_data": ctx.createCallbackData( "setLocale", ["ru-RU"] ),
                            },
                        ],
                        [
                            {
                                "text": this.l10nt( "some action" ),
                                "callback_data": ctx.createCallbackData( "setLocale", ["ru-RU"] ),
                            },
                        ],
                    ],
                },
            } );

            if ( res.ok ) {
                await ctx.updateState( {
                    "messageId": res.data.message_id,
                } );
            }

            return res;
        }

        async #deleteMessage ( ctx ) {
            if ( !ctx.state.messageId ) return;

            await ctx.user.send( "deleteMessage", {
                "message_id": ctx.state.messageId,
            } );

            await ctx.updateState( {
                "messageId": null,
            } );
        }
    };
