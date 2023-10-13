// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {}
	type Scp = {
		clearance: string;
		contain: string; 
		disrupt: string;
		fragment: boolean;
		name: string;    
		number: string;
		risk: string; 
		secondary: string; 
		url: string;
	}
}

export { Scp };
