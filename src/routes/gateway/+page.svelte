<script>
    import { page } from '$app/stores';
    import ChartValue from '$lib/components/ChartValue.svelte';
    import ChartThermometer from '$lib/components/ChartThermometer.svelte';
    import DashboardSystemInfo from '$lib/components/DashboardSystemInfo.svelte';
    import DashboardSystemMessages from '$lib/components/DashboardSystemMessages.svelte';
    import DashboardAvailableNI from '$lib/components/DashboardAvailableNI.svelte';
</script>

<section class="mContent">
    <div class="cContainer">
        <div class="chartsContainer">
            <ChartValue title={$page.data.oLangGateway.gate_011_title._text}       name="systemload" val={$page.data.oGatewayInfo.load.systemload} />
            <ChartValue title={$page.data.oLangGateway.gate_012_title._text}       name="hdd"        val={$page.data.oGatewayInfo.load.hdd} />
            <ChartValue title={$page.data.oLangGateway.gate_013_title._text}       name="memory"     val={$page.data.oGatewayInfo.load.memory} />
            <ChartThermometer title={$page.data.oLangGateway.gate_020_title._text} val={$page.data.oGatewayInfo.sensors.temps.main} />
        </div>
        <div class="cSystemInformation">
            <DashboardSystemInfo />
        </div>
        <div class="cSystemMessages">
            <DashboardSystemMessages />
        </div>
        <div class="cAvailableNetworkInterfaces">
            <DashboardAvailableNI />
        </div>
    </div>
</section>

<style>
    .cContainer {
        display: grid; 
        grid-template-areas: 
            "cc cc"
            "cc cc"
            "si si"
            "sm sm"
            "ni ni";
        grid-template-columns: repeat(2 1fr);
        gap: 1rem;
    }
    .cContainer > * {
        display: grid;
        justify-content: center;
        align-items: center;
    }
    .cSystemInformation {
        grid-area: si;
        display: flex;
        justify-items: stretch;
    }
    .cSystemMessages {
        grid-area: sm;
        display: flex;
        justify-items: stretch;
    }
    .cAvailableNetworkInterfaces {
        grid-area: ni;
        display: flex;
        justify-items: stretch;
    }

    .mContent {
        grid-area: content;
    }
    .chartsContainer {
        display: grid;
        align-items: stretch;
        justify-content: stretch;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 1fr;
        grid-area: cc;
        /* grid-template-areas:
            "sl hd"
            "mu st"; */
        gap: 1rem;
    }

    @media (min-width: 768px) {  /* md */
        .cContainer {
            grid-template-areas: 
                "cc cc cc cc"
                "si si sm sm"
                "ni ni ni ni";
            grid-template-columns: repeat(4, 1fr);
            justify-items: stretch;
        }
        .chartsContainer {
            grid-template-areas:
                "sl hd mu st";
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (min-width: 1024px) {  /* lg */
        .mContent {
            grid-area: content;
        }
    }

    @media (min-width: 1280px) {  /* xl */
        .cContainer {
            grid-template-areas: 
                "cc cc si si sm sm"
                "cc cc si si sm sm"
                "ni ni ni ni ni ni";
            grid-template-columns: repeat(6, 1fr);
        }
        .chartsContainer {
            grid-template-areas:
                "sl hd"
                "mu st";
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1536px) {  /* 2xl */
        .cContainer {
            grid-template-areas: 
                "cc cc cc cc si si si si sm sm sm sm sm sm"
                "cc cc cc cc si si si si sm sm sm sm sm sm"
                "ni ni ni ni ni ni ni ni ni ni ni ni ni ni";
            grid-template-columns: repeat(14, 1fr);
        }
    }

</style>