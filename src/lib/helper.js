// Zur Zeit ohne Verwendung -> übergangsweise wird über +layout.server.js geladen, was /src/mockupData.js aufbereitet

async function loadVPNConfig () {
    const response = await fetch('http://localhost:8081/api/json/vpn');
    if (!response.ok) {
        throw new Error('Failed to fetch vpn config data');
    }
    const jsonData = await response.json();
console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++> jsonData', jsonData);
    return jsonData;
  }

    function clone(obj) {
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return obj;
        }
        if (obj === null || obj === undefined) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => clone(item));
        }
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = clone(obj[key]);
            }
        }
        return newObj;
    }

  // --------------------------------------------------------------------------------------------------

  export { loadVPNConfig, clone }