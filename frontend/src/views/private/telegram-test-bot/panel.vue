<template>
    <ext-tabpanel defaults='{"padding":"0 0 0 1"}' flex="1" layout='{"animation":{"direction":"vertical","type":"slide"}}' margin="1 0 0  0" tabBar='{"defaults":{"flex":null,"style":"font-size:.7em","textAlign":"center","width":120},"layout":{"align":"start","pack":"start","type":"vbox"}}' tabBarPosition="left" tabRotation="none" viewModel="true" @ready="_ready">
        <!-- info tab -->
        <ext-panel iconCls="fa-brands fa-telegram" layout="fit" :title="l10n(`Bot info`)">
            <BotDetailsPanel :telegramBotId="telegramBotId"/>
        </ext-panel>

        <!-- users -->
        <ext-panel iconCls="fa-solid fa-users" layout="fit" :title="l10n(`Bot users`)">
            <BotUsersPanel :telegramBotId="telegramBotId"/>
        </ext-panel>
    </ext-tabpanel>
</template>

<script>
import BotDetailsPanel from "#vue/components/telegram/bot/details/panel";
import BotUsersPanel from "#vue/components/telegram/bot/users/panel";

export default {
    "components": { BotDetailsPanel, BotUsersPanel },

    "props": {
        "telegramBotId": {
            "type": String,
            "required": true,
        },
    },

    "methods": {
        _ready ( e ) {},
    },
};
</script>
