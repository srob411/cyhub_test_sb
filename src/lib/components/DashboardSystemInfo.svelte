<script>
    import { page } from '$app/stores';

    let   laUptime = (Math.floor($page.data.oGatewayInfo.load.uptime/86400) + ":" + (new Date($page.data.oGatewayInfo.load.uptime * 1000)).toISOString().substr(11, 8)).split(":");
    let   lcUptime = `${laUptime[0] > 0 ? laUptime[0]+' '+$page.data.oLangPortal.days._text+' ' : ''}${laUptime[1]}:${laUptime[2]} ${$page.data.oLangPortal.hours._text}`

</script>

<div class="rounded-md bg-white shadow-md w-full h-full text-sm text-gray-400">
    <div class="bg-gray-100 p-2 rounded-t-md flex justify-between">{$page.data.oLangGateway.systeminfo._text}<a href="{'#'}" class="block font-heuft text-gray-600 hover:text-heuft-orange-600 hover:cursor-pointer" title="{$page.data.oLangGateway.refreshinfo._text}">&#xe9a2;</a></div>
    <div class="py-4 px-4 text-gray-600 w-full">
        <div class="relative mb-2 flex flex-row items-center">
            <label for="devicename" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.devicename._text}</label>
            <input type="text" id="devicename" name="devicename" value="{$page.data.oGatewayConfig.gname}" readonly class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
        </div>
        <div class="relative mb-2 flex flex-row items-center">
            <label for="hostname" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.hostname._text}</label>
            <input type="text" id="hostname" name="hostname" readonly value="{$page.data.oGatewayInfo.hostname}" class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
        </div>
        <div class="relative mb-2 flex flex-row items-center">
            <label for="interfacegateway" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.interfacegateway._text}</label>
            <input type="text" id="interfacegateway" name="interfacegateway" value="{$page.data.oGatewayInfo.gateway}" readonly class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
        </div>
        <div class="relative mb-2 flex flex-row items-center">
            <label for="softwareversion" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.softwareversion._text}</label>
            <input type="text" id="softwareversion" name="softwareversion" readonly value="{$page.data.oGatewayInfo.sw_version}" class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
        </div>
        <div class="relative mb-2 flex flex-row items-center">
            <label for="uptime" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.uptime._text}</label>
            <input type="text" id="uptime" name="uptime" readonly value="{lcUptime}" class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
        </div>
        <div class="relative mb-2 flex flex-row items-center">
            <label for="licence" class="w-52 leading-7 text-sm text-nowrap">{$page.data.oLangGateway.licence._text}</label>
            <input type="text" id="licence" name="licence" readonly value="{$page.data.oGatewayConfig.hlic_ts}" class="w-full bg-white border border-transparent border-b-gray-300 outline-none text-gray-700 py-1 px-3 leading-6">
        </div>
    </div>
</div>


