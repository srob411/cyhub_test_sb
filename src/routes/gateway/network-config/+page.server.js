import { fail } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import { loadVPNConfig, loadGatewayConfig, loadGatewayInfo } from '../../../mockupData';

export async function load ({ parent }) {
    const layoutData = await parent();
    const pageData   = { 
        ...layoutData,
        oGatewayConfig: await loadGatewayConfig(),
        oGatewayInfo  : await loadGatewayInfo(),
        aVPNConfig    : await loadVPNConfig()
    };

    return pageData;
}

export const actions = {
    saveData: async ({ request }) => {
        const data = await request.formData();
        const fd   = Object.fromEntries(data);

        if (fd.devicename === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'devicename', msg: '!R! cannot be empty!' } });
        }
        if (fd.interfacegateway === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'interfacegateway', msg: '!R! cannot be empty!' } });
        }
        if (fd.autoconnectinterval === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'autoconnectinterval', msg: '!R! cannot be empty!' } });
        }
        if (fd.second_tunnel_ip === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'second_tunnel_ip', msg: '!R! cannot be empty!' } });
        }
        if (fd.lan1_mac === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan1_mac', msg: '!R! (lan1) cannot be empty!' } });
        }
        if (fd.lan1_interfacegateway === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan1_interfacegateway', msg: '!R! (lan1) cannot be empty!' } });
        }
        if (fd.lan1_ip === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan1_ip', msg: '!R! (lan1) cannot be empty!' } });
        }
        if (fd.lan1_netmask === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan1_netmask', msg: '!R! (lan1) cannot be empty!' } });
        }
        if (fd.lan2_mac === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan2_mac', msg: '!R! (lan2) cannot be empty!' } });
        }
        if (fd.lan2_interfacegateway === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan2_interfacegateway', msg: '!R! (lan2) cannot be empty!' } });
        }
        if (fd.lan2_ip === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan2_ip', msg: '!R! (lan2) cannot be empty!' } });
        }
        if (fd.lan2_netmask === '') {
            return fail(400, { formId: 'frmNetworkConfig', formErrors: { field: 'lan2_netmask', msg: '!R! (lan2) cannot be empty!' } });
        }
        return { success: true };
    },
    nameserverip: async ({ request, fetch }) => {
        const data = await request.formData();
        const fd   = Object.fromEntries(data);

        if (fd.nameserverip === '') {
            return fail(400, { formId: 'frmEditNameServer', formErrors: { field: 'nameserverip', msg: '!R! cannot be empty!' } });
        }

console.log('1 TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', fd)        
        const url      = `/api/nameserverip`;
        const response = await fetch(url, {
			method: 'POST',
			body  : JSON.stringify({
				nameserverip    : fd.nameserverip,
				nameserverip_org: fd.nameserverip_org,
                is_new          : fd.is_new
			})
		});
        if (!response.ok) {
            const loBody = await response.json();
            return { failure: true, msg: loBody.message }
        }
        return { success: true };
    }    
}