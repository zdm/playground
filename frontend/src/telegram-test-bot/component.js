import TelegramBotComponent from "#vue/components/telegram/bot/component";

class Component extends TelegramBotComponent {

    // propertirs
    get id () {
        return "telegramTestBot";
    }

    get name () {
        return l10n( "Test bot" );
    }

    get shortDescription () {
        return super.shortDescription;
    }

    get description () {
        return l10n( `Test bot, for development.` );
    }

    get panel () {
        return import( /* webpackChunkName: "telegram-support-bot" */ "./panel" );
    }

    // protected
    async _runWebApp ( panel, data ) {
        if ( data.webAppType === "orders" ) {
            return panel.$mount( import( /* webpackChunkName: "telegram-support-bot" */ "./webapp.panel" ) );
        }
        else {
            return super._runWebApp( panel, data );
        }
    }
}

export default new Component();
