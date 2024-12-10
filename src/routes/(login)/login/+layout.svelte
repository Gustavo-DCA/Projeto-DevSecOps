<script>
	let { children } = $props();
</script>

<div class="app my-auto flex flex-col items-center px-5 sm:px-0">
	{@render children()}
</div>
