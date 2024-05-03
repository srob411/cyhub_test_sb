import { spawn } from 'child_process';

export async function handle(req) {
    const command = 'ls';
    const args    = [];

    try {
        const process = spawn(command, args);

        let output = '';
        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            console.error(`Error: ${data.toString()}`);
        });

        await new Promise((resolve) => {
            process.on('close', (code) => {
                if (code === 0) {
                    resolve(output);
                } else {
                    console.error(`Command exited with code ${code}`);
                    resolve(null);
                }
            });
        });

    	return new Response(output);
    } catch (error) {
        console.error('Error executing command:', error);
        return new Response('Error occurred', { status: 500 });
    }
}