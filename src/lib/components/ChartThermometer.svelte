<script>
    import { goAppState } from '$lib/stores/stores.js';

    export let title;
    export let val;

    let   [gcTempAct, gcTempMax] = val;
    const lnPercentage           = parseInt(gcTempAct)/parseInt(gcTempMax);
    const gnTempPercent          = Math.floor(100*lnPercentage);
    const gnTempColor            = 200+Math.floor(160*lnPercentage);  //  blau..rot -> hsl: h = 200..360, also Prozentwert auf Distanz 160 angewendet
</script>

<div class="shadow-md aspect-square bg-transparent rounded-md flex flex-col text-sm text-gray-400">
    <div class="bg-gray-100 p-2 w-full rounded-t-md" class:bg-red-300={$goAppState.lExpertMode}>{title}</div>
    <div class="bg-white rounded-b-md flex-grow py-4 flex justify-center gap-2 overflow-hidden">
        <div id="chart-value-tempact" class="text-xs font-mono font-bold text-gray-500 flex items-center">{gcTempAct}°</div>
        <div id="thermowrapper" class="w-6 py-1 h-full bg-gray-200 flex justify-center items-end">
            <div id="thermotemp" class="w-4" style="height: {gnTempPercent}%; background-color: hsl({gnTempColor}, 100%, 50%);"></div>
        </div>
        <div id="chart-value-tempmax" class="text-xs font-mono font-bold text-gray-500 flex items-start" style="margin-top: -8px;">{gcTempMax}°</div>
    </div>
</div>
