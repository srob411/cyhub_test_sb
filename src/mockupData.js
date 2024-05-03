import { read } from '$app/server';
// import vpn from '../static/db/test.txt';
import vpn from '../static/db/vpn.json';
import langGateway from '../static/db/langGateway.json';
import langPortal from '../static/db/langPortal.json';
import hsgatewayconfig from '../static/db/hsgatewayconfig.json';
import hsgatewayinfo from '../static/db/hsgatewayinfo.json';

async function loadVPNConfig () {
    return vpn.aHSVPN;
}

// async function loadVPNConfig () {
//     const response = await fetch('http://localhost:8081/api/json/hsvpn');
//     if (!response.ok) {
//         throw new Error('Failed to fetch vpn config data');
//     }
//     const jsonData = await response.json();
//     return jsonData.aHSVPN;
// }

// async function loadVPNConfig () {

//     // const vpn = read('../static/db/vpn.json');
//     const txt = await read(vpn).json();
//     console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH>', txt)
//     // return JSON.parse(vpn);
//     // const response = await fetch('http://localhost:8081/api/json/hsvpn');
//     // if (!response.ok) {
//     //     throw new Error('Failed to fetch vpn config data');
//     // }
//     // const jsonData = await response.json();
//     // return jsonData.aHSVPN;
// }

// async function loadi18n () {
//     const responseG = await fetch('http://localhost:8081/api/json/lang-gateway');
//     if (!responseG.ok) {
//         throw new Error('Failed to fetch i18n Gateway');
//     }
//     const jsonDataG = await responseG.json();
//     const responseP = await fetch('http://localhost:8081/api/json/lang-portal');
//     if (!responseP.ok) {
//         throw new Error('Failed to fetch i18n Portal');
//     }
//     const jsonDataP = await responseP.json();
//     return {
//         oLangGateway: jsonDataG.oLangGateway,
//         oLangPortal : jsonDataP.oLangPortal
//     };
// }

async function loadi18n () {
    return {
        oLangGateway: langGateway,
        oLangPortal : langPortal
    };
}

async function loadGatewayConfig () {
    return hsgatewayconfig;
}

async function loadGatewayInfo () {
    return hsgatewayinfo;
}

// async function loadGatewayConfig () {
//     const response = await fetch('http://localhost:8081/api/json/gateway-config');
//     if (!response.ok) {
//         throw new Error('Failed to fetch vpn gateway config data');
//     }
//     const jsonData = await response.json();
//     return jsonData.oHSGatewayConfig;
// }

// async function loadGatewayInfo () {
//     const response = await fetch('http://localhost:8081/api/json/gateway-info');
//     if (!response.ok) {
//         throw new Error('Failed to fetch vpn gateway info data');
//     }
//     const jsonData = await response.json();
// // console.log('4444444444444444444444444444444444', jsonData.oHSGatewayInfo.load)    
//     return jsonData.oHSGatewayInfo;
// }


// --------------------------------------------------------------------------------------------------

export { loadVPNConfig, loadi18n, loadGatewayInfo, loadGatewayConfig }