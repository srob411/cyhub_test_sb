import { loadi18n } from '../mockupData';

export async function load () {
    const loi18n = await loadi18n();

    return { 
        oLangGateway  : loi18n.oLangGateway,
        oLangPortal   : loi18n.oLangPortal,
        // oGatewayConfig: await loadGatewayConfig(),  // die JSON-Daten werden in den jeweiligen Routen unter +page.server.js geladen!
        // oGatewayInfo  : await loadGatewayInfo(),
        // aVPNConfig    : await loadVPNConfig()
    };
}