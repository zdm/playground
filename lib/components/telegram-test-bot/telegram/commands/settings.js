export default Super =>
    class extends Super {

        // public
        async run ( ctx, req ) {
            return ctx.user.send( "sendMessage", {
                "text": this.l10nt( `Settings:` ),
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                "text": this.l10nt( "Change communication landuage" ),
                                "callback_data": this.encodeCallbackData( "run", "locale" ),
                            },
                        ],
                        [
                            {
                                "text": this.l10nt( `Back` ),
                                "callback_data": this.encodeCallbackData( "run", "start" ),
                            },
                        ],
                    ],
                },
            } );
        }
    };
