<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	let { user } = $props();
	let loading = $state();
	let username = '';
	let password = '';
	let error = $state(null);

	async function handleSubmit(event: any) {
		event.preventDefault();
		loading = true;
		const res = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});
		console.log(res);
		if (res.ok) {
			// só para mostrar  a animação de carregar pq é mto rapido a consulta localmente
			setTimeout(() => {
				let error = null;
				window.location.href = '/';
			}, 500);
		} else {
			setTimeout(async () => {
				loading = false;
				error = (await res.json()).message;
			}, 1300);
		}
	}
</script>

<svelte:head>
	<title>Login | Painel</title>
</svelte:head>

<form
	class="mb-4 flex w-full flex-col items-center gap-4 rounded-2xl bg-white px-8 py-32 shadow-md sm:w-full md:w-2/4 2xl:w-1/4"
	onsubmit={handleSubmit}
>
	<div>
		<h1>Login</h1>
		{#if error}
			<p style="color: red;">{error}</p>
		{/if}
	</div>
	<div class="w-full">
		<label for="username">Usuario:</label>
		<input class="mt-1" placeholder="Nome do usuário" bind:value={username} required />
	</div>
	<div class="w-full">
		<label for="password">Senha:</label>
		<input
			class="mt-1 flex"
			placeholder="********"
			type="password"
			bind:value={password}
			required
		/>
	</div>
	<button
		class="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[--color-theme-2] p-3 text-white transition hover:bg-[--color-theme-1]"
		type="submit"
	>
		{#if loading}
			<svg
				class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{:else}
			<p class="font-bold">Login</p>
		{/if}
	</button>
	<a href="/"><small>Recuperar senha</small></a>
</form>
