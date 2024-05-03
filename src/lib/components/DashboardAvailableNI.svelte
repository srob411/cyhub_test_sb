<script>
    import { page } from '$app/stores';
    import NetworkInterface from './NetworkInterface.svelte';
</script>

<div class="rounded-md bg-white shadow-md w-full h-full text-sm text-gray-400 flex flex-col justify-between">
    <div class="bg-gray-100 p-2 rounded-t-md">{$page.data.oLangGateway.gate_015_title._text}</div>
    <div class="rounded-b-md border-t border-t-gray-200 p-2 w-full bg-gray-100 grid grid-cols-1 gap-2 2xl:grid-cols-2">
        <NetworkInterface title="lan1" lan_index="1" />
        <NetworkInterface title="lan2" lan_index="2" />
    </div>
</div>



