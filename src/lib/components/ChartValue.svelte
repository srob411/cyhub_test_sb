<script>
    import { page } from '$app/stores';
    import { onMount, onDestroy } from 'svelte';

    export let title;
    export let val;
    export let name;

    let goChart = undefined;

    onMount(() => {
        let lnFlipToRed = 90;

        am4core.useTheme(am4themes_animated);
        am4core.ready(function() {
            const lnValue      = val;
            const lnComplement = 100 - lnValue;
            let   laData       = [{ "value": lnValue }, { "value": lnComplement }];
            
            goChart = am4core.createFromConfig({
                    "type"       : "PieChart",
                    "data"       : laData,
                    "series"     : [{
                        "type"       : "PieSeries",
                        "dataFields": {
                            "value": "value",
                        },
                        "labels"     : {
                            "disabled": true
                        },
                        "ticks"      : {
                            "stroke": "#transparent"
                        },
                        "colors"     : {
                            "list": [
                                am4core.color((lnFlipToRed <= parseInt(lnValue)) ? "#cc3300" : "#00cc92"),
                                am4core.color("#e5e7eb") // === gray-200
                            ]
                        },
                        "hiddenState": {
                            "properties": {
                                "endAngle": -90
                            }
                        }
                    }],
                    "radius"     : "60%",
                    "innerRadius": "40%"
                },
                document.getElementById(`chart-${name}`)
            );
            goChart.logo.disabled = true;
            document.getElementById(`chart-value-${name}`).innerHTML = `${lnValue}&#8239;%`;
        });
    });

    onDestroy(() => {
        if (goChart !== undefined) {
            goChart.dispose();
        }
    });
</script>

<div class="shadow-md aspect-square bg-transparent rounded-md flex flex-col text-sm text-gray-400">
    <div class="bg-gray-100 p-2 rounded-t-md flex-0">{title}</div>
    <div class="bg-white p-2 rounded-b-md relative flex-1 overflow-hidden">
        <div id="chart-{name}" class="w-full h-full"></div>
        <div id="chart-value-{name}" class="absolute w-full h-full top-0 left-0 text-xs font-mono font-bold text-gray-500 flex items-center justify-center">{val}</div>
    </div>
</div>
