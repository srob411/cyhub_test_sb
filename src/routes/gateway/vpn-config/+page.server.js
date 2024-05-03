import { loadVPNConfig, loadGatewayConfig, loadGatewayInfo } from '../../../mockupData';

export async function load () {
    return { 
        oGatewayConfig: await loadGatewayConfig(),
        oGatewayInfo  : await loadGatewayInfo(),
        aVPNConfig    : await loadVPNConfig()
    };
}