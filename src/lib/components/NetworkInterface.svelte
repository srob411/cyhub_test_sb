<script>
    import { page } from '$app/stores';

    export let title;
    export let lan_index;

    let ni_data       = $page.data.oGatewayInfo.interfaces[`lan${lan_index}`];
    let laLanFirewall = [];

    Object.entries(ni_data.firewall).forEach(([key, value]) => { 
        if ((key !== 'nat') && value) { 
            laLanFirewall.push({
                text: $page.data.oLangGateway[`fw_${key}`]._text
            }); 
        } 
    });
</script>

<div class="flex flex-col">
    <h2 class="p-2 pt-1 2xl:col-span-2 font-bold h-10 text-gray-600">{title}</h2>
    <div class="rounded-md bg-white grid grid-cols-1 md:grid-cols-2 h-full">
        <div class="p-2 border border-dotted border-b-0 border-r-0 border-l-0 border-t-0">

            <div class="py-4 px-2 text-gray-600 w-full">
                <div class="relative mb-2 flex flex-row items-center">
                    <label for="interfaceup" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.interfaceup._text}</label>
                    {#if ni_data.active}
                        <input type="text" id="interfaceup" name="interfaceup" value="&#xe936;" readonly class="font-heuft w-full bg-white border border-transparent border-b-gray-300 outline-none py-1 px-3 leading-6 text-green-600">
                    {:else}
                        <input type="text" id="interfaceup" name="interfaceup" value="&#xe937;" readonly class="font-heuft w-full bg-white border border-transparent border-b-gray-300 outline-none py-1 px-3 leading-6 text-red-600">
                    {/if}
                </div>
                <div class="relative mb-2 flex flex-row items-center">
                    <label for="mac" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.macaddress._text}</label>
                    <input type="text" id="mac" name="mac" readonly value="{ni_data.mac}" class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
                </div>
                <div class="relative mb-2 flex flex-row items-center">
                    <label for="dhcp" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.dhcp._text}</label>
                    {#if ni_data.dhcp}
                        <input type="text" id="dhcp" name="dhcp" value="&#xe936;" readonly class="font-heuft w-full bg-white border border-transparent border-b-gray-300 outline-none py-1 px-3 leading-6 text-green-600">
                    {:else}
                        <input type="text" id="dhcp" name="dhcp" value="&#xe937;" readonly class="font-heuft w-full bg-white border border-transparent border-b-gray-300 outline-none py-1 px-3 leading-6 text-red-600">
                    {/if}
                </div>
                <div class="relative mb-2 flex flex-row items-center">
                    <label for="ip" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.ipaddress._text}</label>
                    <input type="text" id="ip" name="ip" readonly value="{ni_data.ip}" class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
                </div>
                <div class="relative mb-2 flex flex-row items-center">
                    <label for="netmask" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.subnetmask._text}</label>
                    <input type="text" id="netmask" name="netmask" readonly value="{ni_data.netmask}" class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
                </div>
                <div class="relative mb-2 flex flex-row items-center">
                    <label for="interfacegateway" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.interfacegateway._text}</label>
                    <input type="text" id="interfacegateway" name="interfacegateway" value="{$page.data.oGatewayInfo.gateway}" readonly class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
                </div>
                <div class="relative mb-2 flex flex-row items-center">
                    <label for="natactive" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.natactive._text}</label>
                    {#if ni_data.dhcp}
                        <input type="text" id="natactive" name="natactive" value="&#xe936;" readonly class="font-heuft w-full bg-white border border-transparent border-b-gray-300 outline-none py-1 px-3 leading-6 text-green-600">
                    {:else}
                        <input type="text" id="natactive" name="natactive" value="&#xe937;" readonly class="font-heuft w-full bg-white border border-transparent border-b-gray-300 outline-none py-1 px-3 leading-6 text-red-600">
                    {/if}
                </div>
            </div>
        </div>
        <div class="p-4 border border-dotted border-b-0 border-r-0 border-l-0 md:border-t-0 md:border-l md:border-l-gray-200">
            <h2 class="text-gray-600 font-bold">{$page.data.oLangGateway.activefirewall._text}</h2>
            <ul class="mt-4 text-gray-600 list-disc list-inside">
                {#each laLanFirewall as fw_label}
                    <li class="py-1">{fw_label.text}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>
