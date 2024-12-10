<script lang="ts">
	import '../../app.css';
	let { children, data } = $props();
	import { page } from '$app/stores';
</script>

<header
	class="mx-auto flex items-center justify-center gap-10 rounded-b-full bg-white px-24 py-3 text-lg child:text-gray-500"
>
	<a class:active={$page.url.pathname.toLowerCase() === '/dashboard'} href="/">Dashboard</a>
	<a class:active={$page.url.pathname.toLowerCase() === '/alerta'} href="/Alerta">Alertas</a>
</header>
<div class="app my-auto flex h-full flex-col items-center px-5 lg:px-0">
	{@render children()}
</div>

<style>
	.active {
		@apply font-semibold text-black;
	}
</style>
