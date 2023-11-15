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

                await ctx.user.sendText( `Your locale has been changed` );

                return ctx.runModule( "/" );
            }
        }

        // private
        async #sendInlineKeyboard ( ctx ) {
            const buttons = [];

            for ( const locale of this.bot.locales ) {
                buttons.push( [
                    {
                        "text": locale.name,
                        "callback_data": ctx.createCallbackData( "setLocale", locale.id ),
                    },
                ] );
            }

            var res;

            res = await ctx.user.send( "sendMessage", {
                "text": this.l10nt( `Please, select your communication language:` ),
                "reply_markup": {
                    "remove_keyboard": true,
                },
            } );

            await ctx.user.send( "deleteMessage", {
                "message_id": res.data.message_id,
            } );

            res = await ctx.user.send( "sendMessage", {
                "text": this.l10nt( `Please, select your communication language:` ),
                "parse_mode": "HTML",
                "reply_markup": {
                    "inline_keyboard": buttons,
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
