<template>
    <ext-panel layout="vbox">
        <ext-button text="Show Froala dialog" @tap="showFroalaDialog"/>

        <ext-froalaeditorfield flex="1"/>
    </ext-panel>
</template>

<script>
import "#vue/components/froala-editor";
import FroalaDialog from "./froala.dialog";

export default {
    "methods": {
        async showFroalaDialog () {
            const cmp = await this.$mount( FroalaDialog );

            cmp.ext.show();
        },
    },
};
</script>
