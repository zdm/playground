<template>
    <ext-panel layout="fit" scrollable="true">
        <AppTitle ref="title" @showAccountDialog="showAccountDialog">
            <!-- <template #menuBottom> -->
            <!--     <ext-button  iconCls="fas fa-users" text="Users" textAlign="left" @tap="showUsersDialog"/> -->
            <!-- </template> -->
        </AppTitle>

        <ext-tabpanel flex="1" layout='{"animation":{"direction":"vertical","type":"slide"}}' margin="1 0 0  0" tabBar='{"defaults":{"flex":null,"style":"font-size:.7em","textAlign":"center","width":120},"layout":{"align":"start","pack":"start","type":"vbox"}}' tabBarPosition="left" tabRotation="none" viewModel="true" @ready="_ready">
            <!-- main panel -->
            <ext-panel iconCls="fa-solid fa-people-group" layout="fit" :title="i18n(`Main`)">
                <ext-panel layout='{"align":"center","pack":"center","type":"vbox"}'>
                    <!-- users -->
                    <ext-button text="Show users" ui="action" @tap="showUsersDialog"/>
                    <ext-container height="20"/>

                    <!-- acl -->
                    <ext-button text="Show acl" ui="action" @tap="_showAcl"/>
                    <ext-container height="20"/>

                    <!-- send notification -->
                    <ext-button text="Send notification" ui="action" @tap="_sendNotification"/>
                    <ext-container height="20"/>

                    <!-- send push notification -->
                    <ext-button text="Send push notification" ui="action" @tap="_sendPushNotification"/>
                    <ext-container height="20"/>

                    <ext-container layout="hbox">
                        <ext-filebutton text="Upload file" ui="action" @change="_uploadFile"/>
                        <ext-spacer width="20"/>
                        <ext-button text="Download file" ui="action" @tap="_downloadFile"/>
                    </ext-container>
                </ext-panel>
            </ext-panel>

            <ext-panel iconCls="fa-solid fa-people-group" layout="fit" :title="i18n(`API status`)">
                <MonitoringPanel/>
            </ext-panel>

            <!-- froala -->
            <ext-panel iconCls="fa-solid fa-people-group" layout="fit" :title="i18n(`Froala`)">
                <FroalaPanel/>
            </ext-panel>

            <!-- ext-charts -->
            <ext-panel iconCls="fa-solid fa-people-group" layout="fit" :title="i18n(`Ext charts`)">
                <ExtChartsPanel/>
            </ext-panel>
        </ext-tabpanel>
    </ext-panel>
</template>

<script>
import AppTitle from "#vue/components/application/title";
import UsersDialog from "#vue/components/administration/users/dialog";
import AccountDialog from "./private/account/dialog";
import AclDialog from "#vue/components/acl/dialog";
import MonitoringPanel from "#vue/components/development/monitoring/panel";
import FroalaPanel from "./private/froala.panel";
import ExtChartsPanel from "./private/ext-charts.panel";

// import constants from "@/constants";

export default {
    "components": { AppTitle, MonitoringPanel, FroalaPanel, ExtChartsPanel },

    "methods": {
        _ready ( e ) {
            const cmp = e.detail.cmp;

            const tabBar = cmp.getTabBar();

            // XXX throws error in background render
            tabBar.add( [
                { "xtype": "spacer", "flex": 1 },
                {
                    "xtype": "button",
                    "iconCls": "fa-solid fa-cog",
                    "text": this.i18n( `Settings` ),
                    "iconAlign": "top",
                    "ui": "action",
                    "padding": "0 0 0 0",

                    // "handler": this.showSettings.bind( this ),
                },
            ] );
        },

        async showUsersDialog () {
            const cmp = await this.$mount( UsersDialog );

            cmp.ext.show();
        },

        async showAccountDialog () {
            const cmp = await this.$mount( AccountDialog );

            cmp.ext.show();
        },

        async _showAcl () {
            const cmp = await this.$mount( AclDialog, {
                "cache": false,
                "props": {
                    "aclId": "-1",
                },
            } );

            cmp.ext.show();
        },

        async _sendPushNotification () {
            this.$api.call( "test/send-push-notification" );
        },

        async _sendNotification () {
            this.$api.call( "test/send-notification" );
        },

        async _uploadFile ( e ) {
            const button = e.detail.sender,
                file = button.getFiles()[0];

            button.clearFiles();

            const upload = this.$api
                .upload( "test/upload", {
                    "params": { "a": 1, "b": 2 },
                    "file1": file,
                } )
                .on( "progress", upload => console.log( "--- upload", upload.progressText ) );

            const res = await upload.start();

            console.log( "--- upload", res + "" );

            this.$utils.toast( res );
        },

        async _downloadFile ( e ) {
            const res = await this.$api.call( "test/download" );

            console.log( "download:", res + "", res.data?.url );

            this.$utils.toast( res );
        },
    },
};
</script>
