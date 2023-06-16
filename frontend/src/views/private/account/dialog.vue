<template>
    <AccountDialog>
        <template #top>
            <!-- <ext-panel title="General Settings"> -->
            <!--     <ext-toolbar docked="top"> -->
            <!--         <ext&#45;container html="General Settings"/> -->
            <!--     </ext-toolbar> -->
            <!--     <ext-fieldset defaults='{"labelAlign":"left","labelWidth":250}'> -->
            <!--         <ext-textfield label="Test field" bind="{record.test}"/> -->
            <!--     </ext-fieldset> -->
            <!-- </ext-panel> -->
        </template>

        <template #bottom/>
    </AccountDialog>
</template>

<script>
import AccountDialog from "#vue/components/account/dialog";

export default {
    "components": { AccountDialog },
};
</script>
