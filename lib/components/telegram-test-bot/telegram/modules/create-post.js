export default Super =>
    class extends Super {

        // public
        async run ( ctx, req ) {
            if ( !ctx.state.subject ) {
                return this._requestSubject( ctx, req );
            }
            else if ( !ctx.state.body ) {
                return this._requestBody( ctx, req );
            }
            else if ( req?.message.photo ) {
                const attachments = ctx.state.attachments || [];

                attachments.push( req.message.photo );

                await ctx.updateState( {
                    attachments,
                } );
            }

            return this.#showMessage( ctx );
        }

        async API_next ( ctx ) {
            return this.#showMessage( ctx );
        }

        // protected
        async _requestSubject ( ctx, req ) {
            if ( req?.message?.text && !req.command ) {
                await ctx.updateState( {
                    "subject": req.message.text,
                } );

                return this.run( ctx );
            }
            else {
                return ctx.sendText( this.l10nt( `Please, enter post subject` ) );
            }
        }

        async _requestBody ( ctx, req ) {
            if ( req?.message?.text && !req.command ) {
                await ctx.updateState( {
                    "body": req.message.text,
                } );

                return this.run( ctx );
            }
            else {
                return ctx.sendText( this.l10nt( `Please, enter post` ) );
            }
        }

        // private
        async #deleteMessage ( ctx ) {
            if ( !ctx.state.messageId ) return;

            const res = await ctx.sendDeleteMessage( ctx.state.messageId );

            if ( res.ok ) {
                await ctx.updateState( {
                    "messageId": null,
                } );
            }
        }

        async #showMessage ( ctx ) {
            await this.#deleteMessage( ctx );

            var res;

            const text = `${ ctx.state.subject }
${ ctx.state.body }

<b>Услуги:</b>
- маникюо;
- педикюр;
- стрижка;
- покраска,
- массаж;

<b>Адрес:</b>
г. Киеы, ул. Урловская 1з


<b>Contact:</b> @zdm002
`;

            if ( !ctx.state.attachments?.length ) {
                res = await ctx.sendMessage( {
                    text,
                    "reply_markup": {
                        "inline_keyboard": [
                            [
                                {
                                    "text": this.createBackButtonText( this.l10nt( `Return to start` ) ),
                                    "callback_data": this.encodeCallbackData( "run", "start" ),
                                },
                            ],
                        ],
                    },
                } );
            }
            else {
                res = await ctx.send( "sendMediaGroup", {
                    "media": [
                        {
                            "type": "photo",
                            "media": "AgACAgIAAxkBAAIEDGVgjz4o1W-X06eMphGUMkmiXdp_AAKk1TEb4iABS3LU0SSBLIx9AQADAgADcwADMwQ",
                        },
                        {
                            "type": "photo",
                            "media": "AgACAgIAAxkBAAIEkGVglsPGLIOt5LY04m0zHZ5KD2crAAJD1TEb4iABS67oMPkLLGxxAQADAgADcwADMwQ",
                        },
                        {
                            "type": "video",
                            "media": "BAACAgIAAxkBAAIEgWVglkSNXnEiVaDq7steOrEIDd8VAAK7NQAC4iABS6X4NMUlXmXzMwQ",
                        },
                    ],
                } );

                await ctx.sendMessage( {
                    text,
                    "parse_mode": "HTML",
                    "reply_markup": {
                        "inline_keyboard": [
                            [
                                {
                                    "text": this.createBackButtonText( this.l10nt( `Previous post` ) ),
                                    "callback_data": this.encodeCallbackData( "run", "start" ),
                                },
                                {
                                    "text": this.createForwardButtonText( this.l10nt( `Next post` ) ),
                                    "callback_data": this.encodeCallbackData( "next" ),
                                },
                            ],
                        ],
                    },
                } );
            }

            if ( res.ok ) {
                await ctx.updateState( {
                    "messageId": res.data.message_id,
                } );
            }
        }
    };
