<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
</script>

<section class="app flex h-screen w-screen flex-col">
	{@render children()}
</section>

<style>
</style>
