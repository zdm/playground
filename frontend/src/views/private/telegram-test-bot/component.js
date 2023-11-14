import app from "#app";
import TelegramBotComponent from "#vue/components/telegram/bot/component";

class Component extends TelegramBotComponent {

    // propertirs
    get id () {
        return "telegramTestBot";
    }

    get name () {
        return app.locale.l10n( "Test bot" );
    }

    get shortDescription () {
        return super.shortDescription;
    }

    get description () {
        return app.locale.l10n( `Test bot, for development.` );
    }

    get panel () {
        return import( /* webpackChunkName: "telegram-support-bot" */ "./panel" );
    }
}

export default new Component();
