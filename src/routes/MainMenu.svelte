<script>
    import { page } from '$app/stores';
	import { goAppState } from '$lib/stores/stores.js';

    export let menuItems;

    const checkState = $goAppState.lExpertMode ? 'checked' : '';

    function changeAppStateExpertMode (e) {
        goAppState.update(apst => ({ ...apst, lExpertMode: e.target.checked }));
    }

    // function setMainMenuActiveItem (vcItem) {
    //     goAppState.update(apst => ({ ...apst, cMainMenuActiveItem: vcItem }));
    // }
</script>

<nav id="mainmenu_wrapper" class="h-auto bg-gray-100 rounded-md hidden lg:block">
    <div id="mainmenu1" class="text-xs text-gray-500 h-screen">
        {#each menuItems as menuItem}
            {@const mihref = ($goAppState.lEditMode) ? 'javascript: return false' : menuItem.href}
            {@const menuItemIcon = (menuItem.icon) ? `&#x${menuItem.icon};` : ''}
            <!-- <a href="{menuItem.href}" on:click={() => setMainMenuActiveItem(menuItem.menuItemClass)} class:is-active={$goAppState.cMainMenuActiveItem === menuItem.menuItemClass} class="group {menuItem.menuItemClass} p-2 pl-4 border-b border-b-gray-200 grid grid-cols-[25px,auto] items-center tracking-wide hover:text-white hover:shadow-[inset_16rem_0_0_0] hover:shadow-heuft-blue-600 duration-[400ms,700ms] transition-[color,box-shadow] first:rounded-t-md cursor-pointer"> -->
            <!-- <a href="{menuItem.href}" class:is-active={$goAppState.cMainMenuActiveItem === menuItem.menuItemClass} style:pointer-events={$goAppState.lEditMode ? 'none' : 'auto'} class="group {menuItem.menuItemClass} p-2 pl-4 border-b border-b-gray-200 grid grid-cols-[25px,auto] items-center tracking-wide hover:shadow-[inset_16rem_0_0_0] hover:shadow-heuft-blue-600 duration-[400ms,700ms] transition-[color,box-shadow] first:rounded-t-md cursor-pointer hover:text-white"> -->
            <a href="{mihref}" class:is-active={$goAppState.cMainMenuActiveItem === menuItem.menuItemClass} style:pointer-events={$goAppState.lEditMode ? 'none' : 'auto'} class="group {menuItem.menuItemClass} p-2 pl-4 border-b border-b-gray-200 grid grid-cols-[25px,auto] items-center tracking-wide hover:shadow-[inset_16rem_0_0_0] hover:shadow-heuft-blue-600 duration-[400ms,700ms] transition-[color,box-shadow] first:rounded-t-md cursor-pointer hover:text-white">
                <span class="w-7 font-heuft text-sm group-[.is-active]:text-heuft-blue-600">{@html menuItemIcon}</span>
                <span class="uppercase group-[.is-active]:text-heuft-blue-600">{menuItem.label}</span>
            </a>
        {/each}    
        <div class="mt-[1px] p-4 flex flex-row gap-3 items-center border-t border-t-gray-200">
            <input id="chkexpert" name="chkexpert" type="checkbox" class="accent-heuft-blue-600 cursor-pointer" checked="{checkState}" on:change={changeAppStateExpertMode} /> 
            <label for="chkexpert" class="text-gray-500 cursor-pointer">{$page.data.oLangGateway.activateexpertmode._text}</label>
        </div>
    </div>
</nav>
