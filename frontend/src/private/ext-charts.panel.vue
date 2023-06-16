<template>
    <ext-panel layout="vbox">
        <ext-button text="Show ExtCharts dialog" @tap="showExtChartsDialog"/>

        <ext-chart flex="1" title="Chart 1" @ready="_chartReady"/>
    </ext-panel>
</template>

<script>
import "#vue/components/ext-charts";
import ExtChartsDialog from "./ext-charts.dialog";

export default {
    "methods": {
        async showExtChartsDialog () {
            const cmp = await this.$mount( ExtChartsDialog );

            cmp.ext.show();
        },

        _chartReady ( e ) {
            const chart = e.detail.cmp;

            chart.setLegend( {
                "docked": "bottom",
            } );

            chart.setAxes( [
                {
                    "type": "numeric",
                    "position": "left",
                    "grid": true,
                },
                {
                    "type": "category",
                    "position": "bottom",
                    "visibleRange": [ 0, 0.4 ],
                },
            ] );

            chart.setSeries( [
                {
                    "type": "area",
                    "xField": "name",
                    "yField": [ "g1", "g2" ],
                    "title": [ "G1", "G2" ],
                    "style": {
                        "stroke": "#666666",
                        "fillOpacity": 0.8,
                    },
                },
            ] );

            chart.setStore( {
                "fields": [ "name", "g1", "g2" ],
                "data": [
                    { "name": "Item-0", "g1": 18.34, "g2": 0.04 },
                    { "name": "Item-1", "g1": 2.67, "g2": 14.87 },
                    { "name": "Item-2", "g1": 1.9, "g2": 5.72 },
                    { "name": "Item-3", "g1": 21.37, "g2": 2.13 },
                    { "name": "Item-4", "g1": 2.67, "g2": 8.53 },
                    { "name": "Item-5", "g1": 18.22, "g2": 4.62 },
                    { "name": "Item-6", "g1": 28.51, "g2": 12.43 },
                    { "name": "Item-7", "g1": 34.43, "g2": 4.4 },
                    { "name": "Item-8", "g1": 21.65, "g2": 13.87 },
                    { "name": "Item-9", "g1": 12.98, "g2": 35.44 },
                    { "name": "Item-10", "g1": 22.96, "g2": 38.7 },
                    { "name": "Item-11", "g1": 0.49, "g2": 51.9 },
                    { "name": "Item-12", "g1": 20.87, "g2": 62.07 },
                    { "name": "Item-13", "g1": 25.1, "g2": 78.46 },
                    { "name": "Item-14", "g1": 16.87, "g2": 56.8 },
                ],
            } );
        },
    },
};
</script>
ts
