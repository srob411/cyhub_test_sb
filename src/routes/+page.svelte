<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    if (browser) {
        goto('/gateway/network-config');
    }
</script>

<h1 class="my-4 text-slate-600 text-xl font-bold">testaa / 345080GA2</h1>

<h2 class="h2gw">{$page.data.oLangPortal.device._text}</h2>
<div class="grid grid-cols-2 gap-4">
    <div class="linkBox">Device information</div>
    <div class="linkBox"><a href="/gateway" class="text-heuft-orange-600 hover:text-heuft-orange-800">Configure device</a></div>
</div>

<h2 class="h2gw">Documentation and spare parts</h2>
<div class="grid grid-cols-2 gap-4">
    <div class="linkBox">Documentation</div>
    <div class="linkBox">Spare parts</div>
</div>

<h2 class="h2gw">{$page.data.oLangPortal.device._text}</h2>
<div class="grid grid-cols-2 gap-4">
    <div class="linkBox">LOGOS <em>DeviceSupport</em></div>
    <div class="linkBox">Contact</div>
</div>

<style>
    .h2gw {
        @apply mt-8 mb-2 text-gray-400 text-sm uppercase tracking-wider;
    }
    .linkBox {
        @apply flex justify-center p-4 py-8 rounded-md bg-white shadow-md w-full h-full text-sm text-gray-400;
    }
</style>