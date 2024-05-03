<script>
    import { page } from '$app/stores';
</script>

<div class="rounded-md bg-white shadow-md w-full h-full text-sm text-gray-400 flex flex-col justify-between">
    <div class="bg-gray-100 p-2 rounded-t-md">{$page.data.oLangGateway.gate_019_title._text}</div>
    <div class="w-full h-full bg-transparent flex flex-row items-center justify-center">
        <div class="rounded my-4 p-4 bg-gray-200 text-gray-600 flex flex-row justify-center items-center gap-4">
            <span class="font-heuftmenu text-[21px]">&#xe91e;</span>
            <span class="">{$page.data.oLangGateway.msg_nosystemmessages._text}</span>
        </div>
    </div>
</div>


