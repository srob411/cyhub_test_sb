<script>
    import { page } from '$app/stores';
	import { goAppState } from '$lib/stores/stores.js';

    export let lan_index;
    export let edit_mode;
    export let form;
    export let goWorkingData;

    // let   ni_data               = $page.data.oGatewayInfo.interfaces[`lan${lan_index}`];
    let   ni_data               = null;
    let   laLanFirewall         = [];
    const gcPref                = `lan${lan_index}_`;
    let   id_mac                = `${gcPref}mac`;
    const id_interfacegateway   = `${gcPref}interfacegateway`;
    const id_interfaceup        = `${gcPref}interfaceup`;
    const id_dhcp               = `${gcPref}dhcp`;
    const id_ip                 = `${gcPref}ip`;
    const id_netmask            = `${gcPref}netmask`;

    $: {
        ni_data       = goWorkingData.oGatewayInfo.interfaces[`lan${lan_index}`];
        laLanFirewall = [];
        Object.entries(ni_data.firewall).forEach(([key, value]) => { 
            if ((key !== 'nat') && value) { 
                laLanFirewall.push({
                    text: $page.data.oLangGateway[`fw_${key}`]._text
                }); 
            } 
        });
    }
   
</script>

<div class="flex flex-col">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div class="py-4 px-2 text-gray-600 w-full">
            <div class="relative mb-2 flex flex-row items-center">
                <label for="{id_mac}" class="w-36 max-w-36 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.macaddress._text}</label>
                <!-- <input type="text" id="{id_mac}" name="{id_mac}" readonly={edit_mode ? '' : 'readonly'} value="{ni_data.mac}" class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_mac}`}> -->
                <input type="text" id="{id_mac}" name="{id_mac}" readonly={edit_mode ? '' : 'readonly'} bind:value={ni_data.mac} class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_mac}`}>
            </div>
            <div class="relative mb-2 flex flex-row items-center">
                <label for="{id_interfacegateway}" class="w-36 max-w-36 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.interfacegateway._text}</label>
                <!-- <input type="text" id="{id_interfacegateway}" name="{id_interfacegateway}" value="{$page.data.oGatewayInfo.gateway}" readonly={edit_mode ? '' : 'readonly'} class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_interfacegateway}`}> -->
                <input type="text" id="{id_interfacegateway}" name="{id_interfacegateway}" bind:value="{goWorkingData.oGatewayInfo.gateway}" readonly={edit_mode ? '' : 'readonly'} class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_interfacegateway}`}>
            </div>
            <div class="relative mb-2 flex flex-row items-center">
                <label for="{id_interfaceup}" class="w-36 max-w-36 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.interfaceup._text}</label>
                <!-- <input id="{id_interfaceup}" name="{id_interfaceup}" type="checkbox" class="h-8 accent-heuft-blue-600 cursor-pointer" disabled={edit_mode ? '' : 'disabled'} checked="{ni_data.active ? 'checked' : ''}" />  -->
                <input id="{id_interfaceup}" name="{id_interfaceup}" type="checkbox" class="h-8 accent-heuft-blue-600 cursor-pointer" disabled={edit_mode ? '' : 'disabled'} bind:checked={ni_data.active} /> 
            </div>
            <div class="relative mb-2 flex flex-row items-center">
                <label for="{id_dhcp}" class="w-36 max-w-36 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.dhcp._text}</label>
                <!-- <input id="{id_dhcp}" name="{id_dhcp}" type="checkbox" class="h-8 accent-heuft-blue-600 cursor-pointer" disabled={edit_mode ? '' : 'disabled'} checked="{ni_data.dhcp ? 'checked' : ''}" />  -->
                <input id="{id_dhcp}" name="{id_dhcp}" type="checkbox" class="h-8 accent-heuft-blue-600 cursor-pointer" disabled={edit_mode ? '' : 'disabled'} bind:checked={ni_data.dhcp} /> 
            </div>
            <div class="relative mb-2 flex flex-row items-center">
                <label for="{id_ip}" class="w-36 max-w-36 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.ipaddress._text}</label>
                <!-- <input type="text" id="{id_ip}" name="{id_ip}" readonly={edit_mode ? '' : 'readonly'} value="{ni_data.ip}" class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_ip}`}> -->
                <input type="text" id="{id_ip}" name="{id_ip}" readonly={edit_mode ? '' : 'readonly'} bind:value={ni_data.ip} class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_ip}`}>
            </div>
            <div class="relative mb-2 flex flex-row items-center">
                <label for="{id_netmask}" class="w-36 max-w-36 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.subnetmask._text}</label>
                <!-- <input type="text" id="{id_netmask}" name="{id_netmask}" readonly={edit_mode ? '' : 'readonly'} value="{ni_data.netmask}" class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_netmask}`}> -->
                <input type="text" id="{id_netmask}" name="{id_netmask}" readonly={edit_mode ? '' : 'readonly'} bind:value={ni_data.netmask} class="h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === `${id_netmask}`}>
            </div>
        </div>
        {#if $goAppState.lExpertMode}
        <div class="mt-0 p-2 pt-4 border border-gray-300 border-dotted border-r-0 border-b-0 border-l-0 xl:border-t-0 xl:border-l xl:border-l-gray-300 xl:pl-4">
            todo: Routing table & Firewall rules
        </div>
        {/if}
    </div>
</div>
