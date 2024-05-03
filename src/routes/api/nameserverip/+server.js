import { error, json } from '@sveltejs/kit';

export function GET ({ url }) {
	// if (isNaN(d) || d < 0) {
	// 	error(400, 'min and max must be numbers, and min must be less than max');
	// }

    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuurl = ', url)
	return new Response('erstertest');
}

export async function POST ({ request, fetch }) {
    const loData = await request.json();
    const loRes  = await fetch('http://localhost:8081/api/nameserverip', {
        method: 'POST',
        body  : loData
    })

    console.log('???', loRes)

    const loBody = await loRes.json();

console.log('DDDDDDDDDDDDDDDD>', loBody)

    // error(404, {
    //     message: 'Put error message here...'
    // });
    return json({ nameserverip_new: loData.nameserverip, nameserverip_org: loData.nameserverip_org });
}