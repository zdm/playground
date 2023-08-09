<template>
    <ext-panel layout="vbox">
        <ext-panel flex="1" title="Test"/>

        <Amcharts5 ref="callsChart" :createChart="_createChart" flex="1" :updateChart="_updateChart" @refresh="_chartRefresh"/>>

        <ext-panel flex="1" title="Test"/>
    </ext-panel>
</template>

<script>
import Amcharts5 from "#vue/components/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

export default {
    "components": { Amcharts5 },

    "methods": {
        _createChart ( cmp ) {
            const root = cmp.root,
                am5 = cmp.am5;

            const chart = root.container.children.push( am5xy.XYChart.new( root, {

                // "panX": true,
                // "panY": true,
                // "wheelX": "panX",
                // "wheelY": "zoomX",
                // "pinchZoomX": true,
            } ) );

            chart.set(
                "cursor",
                am5xy.XYCursor.new( root, {
                    "behavior": "none", // "zoomX",
                } )
            );

            chart.children.push( am5.Label.new( root, {
                "text": "Chart title",
                "fontSize": 12,
                "x": am5.percent( 50 ),
                "centerX": am5.percent( 50 ),
            } ) );
        },
    },
};
</script>
