<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';

    export let openDialog       = false;
    export let onClose;
    export let title            = '';
    export let gcEditNameServer = '';
    export let gcEditNameServerOrg = '';
    export let form;

    let   glEdit     = false;
    let   goDialogEl = null;
    let   goLabels   = {
        'nameserverip': $page.data.oLangGateway.nameserverip._text,
    };


    function closeDialog () {
        form = null;
        goDialogEl.close();
        onClose();
    }

    onMount(() => {
        goDialogEl = document.getElementById('dialogNameServers');
        goDialogEl.addEventListener('cancel', (event) => {
            event.preventDefault();
        });        
    });

    $: {
        if (openDialog) {
            goDialogEl.showModal();
        }
        glEdit = (gcEditNameServer !== '');
    }
</script>

<dialog id="dialogNameServers" class="bg-white mx-auto rounded-md shadow-xl z-50 overflow-y-auto md:min-w-96">
    <div class="bg-gray-100 p-2 px-4 rounded-t-md flex justify-between"><h1 class="text-gray-400">{title}</h1><button on:click|preventDefault={closeDialog} class="block font-heuft text-gray-600 hover:text-heuft-orange-600 hover:cursor-pointer" title="{$page.data.oLangPortal.close._text}">&#xea38;</button></div>
    <div class="py-4 pl-4 pr-0 firefox:pr-4 text-gray-600 overflow-y-scroll text-sm">
        <h2 class="font-bold">{(glEdit) ? $page.data.oLangGateway.msg_editnameserver._text.replace(':', '') : $page.data.oLangGateway.msg_createnewnameserver._text.replace(':', '')}</h2>
        <form id="frmEditNameServer" method="POST" use:enhance={() => {
            return async ({ result, update }) => {
                await update({ reset: false });
console.log('+++++++++++++++++++++++ result = ', result)   
                if (result.type === 'success') {
                    closeDialog();
                }
        
        
            }
        }}>
            {#if (form?.formId === 'frmEditNameServer') && form?.formErrors}
            <div class="errorBox">
                <div><span>{$page.data.oLangPortal.error._text}</span></div>
                <div>{form.formErrors.msg.replace('!R!', goLabels[form.formErrors.field])}</div>    
            </div>
            {/if}
            <div class="relative mt-4 mb-2 flex flex-row items-center">
                <label for="nameserverip" class="w-52 leading-7 text-sm text-nowrap">{goLabels.nameserverip}</label>
                <input type="text" id="nameserverip" name="nameserverip" bind:value={gcEditNameServer} class="w-36 h-8 bg-gray-200 rounded outline-none text-gray-700 pb-0 px-3 read-only:bg-white read-only:rounded-none read-only:border-b read-only:border-b-gray-300" class:errorBorder={form?.formErrors?.field === 'nameserverip'} />
                <input type="hidden" id="nameserverip_org" name="nameserverip_org" value={gcEditNameServerOrg} />
                <input type="hidden" id="is_new" name="is_new" value={!glEdit} />
            </div>
            <div class="flex flex-row justify-end gap-2 text-sm mt-8">
                <button formaction="?/nameserverip" class="btnSave btn-primary">{$page.data.oLangPortal.save._text}</button>
            </div>
        </form>
    </div>
</dialog>

{#if openDialog}
{#if false}
<div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
    <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"></div>
        <div class="bg-white w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
            <div class="head bg-gray-100 py-5 px-8 text-2xl font-extrabold">
                <button class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4" on:click={() => alert('name of this function is supposed to be dispatch') }>
                    <svg xmlns="http://www.w3   .org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                </button>
            </div>
        <div class="content p-8">
        </div>
    </div>
</div>
{/if}
{/if}


<style>
    ::backdrop {
        background: rgb(0 0 0 / .62);
    }
    #dialogNameServers {
        /* animation: fade-out 0.5s ease-out; */
    }
    #dialogNameServers[open] {
        animation: fade-in .2s ease-out;
    }
    .errorBox div:last-child {
        @apply p-4 bg-gray-100 rounded-b-md text-gray-600;
    }

    @keyframes fade-in {
        0% { opacity: 0; transform: scaleY(0); display: none; }
        100% { opacity: 1; transform: scaleY(1); display: block; }
    }
</style>