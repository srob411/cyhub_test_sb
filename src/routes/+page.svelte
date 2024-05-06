<script>
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
	import { goAppState } from '$lib/stores/stores.js';
    import { clone } from '$lib/helper.js';
    import { fade } from 'svelte/transition';
    import { goto, invalidateAll } from '$app/navigation';
    import ConfigNetworkInterface from '$lib/components/ConfigNetworkInterface.svelte';
    import DialogNameServers from './DialogNameServers.svelte';

    export let form;

console.log('----------------------------------------------- form: ', form)
console.log('----------------------------------------------- $page.data.oLangGateway: ', $page.data.oLangGateway)
console.log('----------------------------------------------- $page.data.oLangPortal : ', $page.data.oLangPortal)

    const DATA_SAVED          = true;
    const INPUT_CANCELLED     = false;
    let   glEditMode          = false;
    let   glModalOpen         = false;
    let   goLabels            = {
        'devicename'            : $page.data.oLangGateway.devicename._text,
        'interfacegateway'      : $page.data.oLangGateway.interfacegateway._text,
        'autoconnectinterval'   : $page.data.oLangGateway.autoconnectinterval._text,
        'second_tunnel_ip'      : $page.data.oLangGateway.foreigncompip._text,
        'lan1_mac'              : $page.data.oLangGateway.macaddress._text,
        'lan1_interfacegateway' : $page.data.oLangGateway.interfacegateway._text,
        'lan1_ip'               : $page.data.oLangGateway.ipaddress._text,
        'lan1_netmask'          : $page.data.oLangGateway.subnetmask._text,
        'lan2_mac'              : $page.data.oLangGateway.macaddress._text,
        'lan2_interfacegateway' : $page.data.oLangGateway.interfacegateway._text,
        'lan2_ip'               : $page.data.oLangGateway.ipaddress._text,
        'lan2_netmask'          : $page.data.oLangGateway.subnetmask._text,
    };
    let   goWorkingData       = clone($page.data);
    let   gcEditNameServer    = '';
    let   gcEditNameServerOrg = '';

    $goAppState.cMainMenuActiveItem = 'network-config';

    function editModeCancelled () {
        goWorkingData = clone($page.data);
console.log('ZZZZZZZZZZZZZZZZZZ>', goWorkingData)        
    }

    async function toggleEditMode (vlDataSaved = false) {
        if (glEditMode) {
console.log('YYYYYYYYYYYYYYYYYY>', goWorkingData)        
console.log('YYYYYYYYYYYYYYYYYY>', vlDataSaved)        
            glEditMode = false;
            form       = null;  // später klären, ob das so der richtige Weg ist, oder ob beim Verlassen des EditModes etwas über +page.server.js laufen sollte...
            if (!vlDataSaved) {
                editModeCancelled();
            }
        } else {
            glEditMode = true;
        }
        $goAppState.lEditMode = glEditMode;
    }

    function openDialogNameServers (voNameServer) {
        gcEditNameServer    = voNameServer?.nameserver ?? '';
        gcEditNameServerOrg = gcEditNameServer
        glModalOpen         = true;
    }

    onMount(() => {
        document.getElementById('frmNetworkConfig').addEventListener('keydown', event => {  //  default-Verhalten der form abschalten bez. Return => Submit
            if (event.key === 'Enter') {
                event.stopPropagation();
                event.preventDefault();
            }
        });
    });
</script>

{#if false}
{#if form?.success}
    <div class="bg-green-200 mb-4">
        form success
    </div>
{:else}
    <div class="bg-red-200 mb-4">
        no form or no form success
    </div>
{/if}
{/if}

<form id="frmNetworkConfig" method="POST" use:enhance={() => {
    return async ({ result, update }) => {
        await update({ reset: false });
console.log('+++++ enhance.return: result                             = ', result)   
console.log('+++++ enhance.return: goWorkingData.oGatewayConfig.gname = ', goWorkingData.oGatewayConfig.gname)   
        if ((result.type === 'success') && glEditMode) {
            toggleEditMode(DATA_SAVED);
        }


    }
}}>
    <section class="mContent pb-4">
        <div class="rounded-md bg-gray-100 p-4 w-full flex flex-row items-center justify-end gap-4">
            <div class="">
                {#if glEditMode}
                    <div class="flex flex-row justify-end gap-2 text-sm">
                        <button formaction="?/saveData" class="btnSave btn-primary" in:fade={{ delay: 250, duration: 400 }}>{$page.data.oLangGateway.saveconfig._text}</button>
                        <button on:click={() => { toggleEditMode(INPUT_CANCELLED) }} class="ml-2 text-gray-600 bg-transparent border-0 focus:outline-none hover:text-heuft-orange-600 rounded font-heuftmenu text-[21px] w-[36px] aspect-square" title="{$page.data.oLangPortal.abort._text}">&#xe924;</button>
                    </div>
                {:else}
                    <button on:click={toggleEditMode} class="text-gray-600 bg-transparent border-0 focus:outline-none hover:text-heuft-orange-600 rounded font-heuftmenu text-[21px] w-[36px] aspect-square" title="{$page.data.oLangGateway.editconfig._text}">&#xe90f;</button>
                {/if}
            </div>
        </div>

        {#if (form?.formId === 'frmNetworkConfig') && form?.formErrors}
            <div class="errorBox">
                <div><span>{$page.data.oLangPortal.error._text}</span></div>
                <div>{form.formErrors.msg.replace('!R!', goLabels[form.formErrors.field])}</div>    
            </div>
        {/if}

        <!-- Akkordion General Settings -->
        <details class="group rounded-md bg-white shadow-md mt-4 w-full text-sm">
            <summary class="bg-gray-500 p-4 pb-3 rounded-t-md uppercase tracking-wider text-white cursor-pointer rounded-b-md group-open:rounded-b-none flex flex-row justify-between items-center">
                <h2>{$page.data.oLangGateway.commoninterfacesettings._text}</h2><div class="hidden group-open:block font-heuft text-xl">&#xe922;</div><div class="group-open:hidden font-heuft text-xl">&#xe923;</div>
            </summary>
            <div class="accordion-content p-4 pt-0">

                <div class="text-gray-600 w-full">
                    <div class="relative mb-2 flex flex-row items-center">
                        <label for="devicename" class="w-52 leading-7 text-sm text-nowrap">{goLabels.devicename}</label>
                        <!-- <input type="text" id="devicename" name="devicename" value="{$page.data.oGatewayConfig.gname}" readonly={glEditMode ? '' : 'readonly'} class="w-36 h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'devicename'} /> -->
                        <input type="text" id="devicename" name="devicename" bind:value={goWorkingData.oGatewayConfig.gname} readonly={glEditMode ? '' : 'readonly'} class="w-36 h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'devicename'} />
                    </div>
                    <div class="relative mb-2 flex flex-row items-center">
                        <label for="interfacegateway" class="w-52 leading-7 text-sm text-nowrap">{goLabels.interfacegateway}</label>
                        <input type="text" id="interfacegateway" name="interfacegateway" bind:value="{goWorkingData.oGatewayInfo.gateway}" readonly={glEditMode ? '' : 'readonly'} class="w-36 h-8 bg-gray-200 rounded outline-none text-gray-700 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'interfacegateway'} />
                    </div>
                </div>
                {#if $goAppState.lExpertMode}
                <div class="mt-8 pt-4 border-t border-t-gray-300 border-dotted text-gray-600">
                    <h2 class="font-bold text-gray-600 pb-4">{goWorkingData.oLangGateway.nameserversettings._text}</h2>

                    <div class="w-48">
                        <div class="flex flex-col flex-wrap gap-1">
                            {#each goWorkingData.oGatewayConfig.nameserver as nameserver}
                            <div class="flex flex-row py-1 items-center gap-4 rounded-md bg-white shadow-heuft hover:bg-gray-100">
                                <div class="flex-1 pl-2">{nameserver}</div>
                                <div class="flex flex-row gap-1 items-center pr-2">
                                    <button class="btn-icon-secondary-sm" disabled={glEditMode ? '' : 'disabled'} on:click|preventDefault = {() => { openDialogNameServers({nameserver}); }}>&#xe9e1;</button>
                                    <button class="btn-icon-secondary-sm" disabled={glEditMode ? '' : 'disabled'} on:click|preventDefault = { () => { alert('delete not yet...'); }}>&#xe912;</button>
                                </div>
                            </div>
                            {/each}
                        </div>
                        <div class="flex flex-row justify-end mt-4 pr-1">
                            <button class="btn-icon-primary_circle" disabled={glEditMode ? '' : 'disabled'} on:click|preventDefault ={() => { openDialogNameServers(''); }}>&#xe921;</button>
                        </div>
                    </div>
                </div>

                <div class="mt-4 pt-4 border-t border-t-gray-300 border-dotted text-gray-600">
                    <h2 class="font-bold text-gray-600 pb-4">{$page.data.oLangGateway.autoconnect._text}<em class="font-normal">{$page.data.oLangGateway.autoconnect.i._text}</em></h2>
                    <div class="relative mb-2 flex flex-row items-center">
                        <label for="autoconnectactive" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.autoconnectactive._text}</label>
                        <!-- <input id="autoconnectactive" name="autoconnectactive" type="checkbox" class="accent-heuft-blue-600 cursor-pointer" disabled={glEditMode ? '' : 'disabled'} checked="{$page.data.oGatewayConfig.autoconnectactive ? 'checked' : ''}" />  -->
                        <input id="autoconnectactive" name="autoconnectactive" type="checkbox" class="accent-heuft-blue-600 cursor-pointer" disabled={glEditMode ? '' : 'disabled'} bind:checked={goWorkingData.oGatewayConfig.autoconnectactive} /> 
                    </div>
                    <div class="relative mb-2 flex flex-row items-center">
                        <label for="autoconnectinterval" class="w-52 leading-7 text-sm text-nowrap">{goLabels.autoconnectinterval}</label>
                        <!-- <input type="text" id="autoconnectinterval" name="autoconnectinterval" value="{$page.data.oGatewayConfig.autoconnectinterval}" readonly={glEditMode ? '' : 'readonly'} class="w-12 h-8 bg-gray-200 rounded outline-none text-gray-700 px-3 mr-2 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'autoconnectinterval'} /> {$page.data.oLangPortal.days._text} -->
                        <input type="text" id="autoconnectinterval" name="autoconnectinterval" bind:value="{goWorkingData.oGatewayConfig.autoconnectinterval}" readonly={glEditMode ? '' : 'readonly'} class="w-12 h-8 bg-gray-200 rounded outline-none text-gray-700 px-3 mr-2 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'autoconnectinterval'} /> {$page.data.oLangPortal.days._text}
                    </div>
                </div>

                <div class="mt-4 pt-4 border-t border-t-gray-300 border-dotted text-gray-600">
                    <h2 class="font-bold text-gray-600 pb-4">{goLabels.second_tunnel_ip}</h2>
                    <div class="relative mb-2 flex flex-row items-center">
                        <label for="second_tunnel_ip" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.foreigncompip._text}</label>
                        <!-- <input type="text" id="second_tunnel_ip" name="second_tunnel_ip" value="{$page.data.oGatewayConfig['2nd_tunnel_ip']}" readonly={glEditMode ? '' : 'readonly'} class="w-36 h-8 bg-gray-200 rounded outline-none text-gray-700 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'second_tunnel_ip'} /> -->
                        <input type="text" id="second_tunnel_ip" name="second_tunnel_ip" bind:value="{goWorkingData.oGatewayConfig['2nd_tunnel_ip']}" readonly={glEditMode ? '' : 'readonly'} class="w-36 h-8 bg-gray-200 rounded outline-none text-gray-700 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'second_tunnel_ip'} />
                    </div>
                    <div class="relative mb-2 flex flex-row items-center">
                        <label for="foreigncompinterface" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.foreigncompinterface._text}</label>
                        <div class="flex flex-row items-center gap-4">
                            <div class="flex flex-row items-center gap-2">
                                <!-- <input id="foreigncompinterface1" name="foreigncompinterface" type="radio" disabled={glEditMode ? '' : 'disabled'} value="{$page.data.oGatewayConfig['2nd_tunnel_interface'] === 'lan1'}" class="accent-heuft-blue-600 cursor-pointer mb-[3px]" checked="{$page.data.oGatewayConfig['2nd_tunnel_interface'] === 'lan1' ? 'checked' : ''}" />  -->
                                <input id="foreigncompinterface1" name="foreigncompinterface" type="radio" value={'lan1'} bind:group={goWorkingData.oGatewayConfig['2nd_tunnel_interface']} disabled={glEditMode ? '' : 'disabled'} class="accent-heuft-blue-600 cursor-pointer mb-[3px]" /> 
                                <label for="foreigncompinterface1" class="text-sm text-nowrap">lan1</label>
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <!-- <input id="foreigncompinterface2" name="foreigncompinterface" type="radio" disabled={glEditMode ? '' : 'disabled'} value="{$page.data.oGatewayConfig['2nd_tunnel_interface'] === 'lan2'}" class="accent-heuft-blue-600 cursor-pointer mb-[3px]"  checked="{$page.data.oGatewayConfig['2nd_tunnel_interface'] === 'lan2' ? 'checked' : ''}" />  -->
                                <input id="foreigncompinterface2" name="foreigncompinterface" type="radio" value={'lan2'} bind:group={goWorkingData.oGatewayConfig['2nd_tunnel_interface']} disabled={glEditMode ? '' : 'disabled'} class="accent-heuft-blue-600 cursor-pointer mb-[3px]" /> 
                                <label for="foreigncompinterface2" class="text-sm text-nowrap">lan2</label>
                            </div>
                        </div>
                    </div>

                </div>
                {/if}
            </div>
        </details>

        <!-- Akkordion Network Interfaces lan1 -->
        <details class="group rounded-md bg-white shadow-md mt-4 w-full text-sm">
            <summary class="bg-gray-500 p-4 pb-3 rounded-t-md uppercase tracking-wider text-white cursor-pointer rounded-b-md group-open:rounded-b-none flex flex-row justify-between items-center">
                <h2>{$page.data.oLangGateway.interfaces._text} lan1</h2><div class="hidden group-open:block font-heuft text-xl">&#xe922;</div><div class="group-open:hidden font-heuft text-xl">&#xe923;</div>
            </summary>
            <div class="accordion-content p-4 pt-0">
                <ConfigNetworkInterface lan_index="1" {goWorkingData} edit_mode={glEditMode} {form} />
            </div>
        </details>  

        <!-- Akkordion Network Interfaces lan2 -->
        <details class="group rounded-md bg-white shadow-md mt-4 w-full text-sm">
            <summary class="bg-gray-500 p-4 pb-3 rounded-t-md uppercase tracking-wider text-white cursor-pointer rounded-b-md group-open:rounded-b-none flex flex-row justify-between items-center">
                <h2>{$page.data.oLangGateway.interfaces._text} lan2</h2><div class="hidden group-open:block font-heuft text-xl">&#xe922;</div><div class="group-open:hidden font-heuft text-xl">&#xe923;</div>
            </summary>
            <div class="accordion-content p-4 pt-0">
                <ConfigNetworkInterface lan_index="2" {goWorkingData} edit_mode={glEditMode} {form} />
            </div>
        </details>

        <DialogNameServers title={$page.data.oLangGateway.nameserversettings._text} {gcEditNameServer} {gcEditNameServerOrg} {form} onClose={() => { glModalOpen = false; }} openDialog={glModalOpen} />

    
    </section>
</form>