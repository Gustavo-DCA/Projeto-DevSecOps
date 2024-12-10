<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	let { data } = $props();
	let loading = $state();

	async function update(id: number) {
		const res = await fetch(`/dashboard`, {
			method: 'PATCH',
			body: JSON.stringify({ id })
		});
		console.log(res);
		if (res.ok) {
			// só para mostrar  a animação de carregar pq é mto rapido a consulta localmente
		} else {
			setTimeout(async () => {
				//error = (await res.json()).message;
			}, 1300);
		}
	}
</script>

<svelte:head>
	<title>Dashboard | Painel</title>
</svelte:head>

<div class="mb-4 flex h-full w-full py-32 sm:w-full md:w-4/5">
	<div class="relative flex h-full w-full flex-col overflow-x-auto shadow-md sm:rounded-lg">
		<table
			class="flex h-full w-full flex-col bg-gray-200 text-left text-sm text-gray-500 rtl:text-right"
		>
			<thead class=" bg-gray-50 text-xs uppercase text-gray-700">
				<tr class="flex items-center child:w-full child:flex-1">
					<th scope="col" class="px-6 py-3"> Nome do Commit </th>
					<th scope="col" class="px-6 py-3"> Autor </th>
					<th scope="col" class="px-6 py-3"> Data / Hora </th>
					<th scope="col" class="px-6 py-3"> Status </th>
					<th scope="col" class="px-6 py-3"> Ações </th>
				</tr>
			</thead>
			<tbody class="flex w-full flex-col shadow child:flex child:child:flex-1 child:items-center">
				{#each data.commits! as item}
					<tr class="border-b bg-white hover:bg-gray-50">
						<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
							{item.message}
						</th>
						<td class="px-6 py-4"> {item.authorName} </td>
						<td class="px-6 py-4">
							{item.timestamp?.toLocaleDateString()} - {item.timestamp?.toLocaleTimeString()}
						</td>
						<td class="px-6 py-4">
							{#if item.statusInt === 0}
								<p class="font-medium text-blue-600 hover:underline">Sem problemas</p>
							{:else if item.statusInt === 1}
								<p class="font-medium text-red-600 hover:underline">
									{item.status}
								</p>
							{:else if item.statusInt === 2}
								<p class="font-medium text-green-600 hover:underline">Resolvido</p>
							{/if}
						</td>
						<td class="relative px-6 py-4">
							<button
								onclick={() => {
									update(item.id);
								}}
								aria-labelledby="action"
								class="relative text-gray-700 child:transition"
							>
								{#if item.statusInt === 1}
									<a
										href="#"
										aria-label="resolver"
										class="font-medium hover:text-emerald-700 hover:underline"
										>Constar como resolvidos!</a
									>
								{:else}
									<p class="font-medium text-gray-300">Nada para ser feito!</p>
								{/if}
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<nav
			class="flex-column flex flex-wrap items-center justify-between bg-white px-5 py-4 md:flex-row"
			aria-label="Table navigation"
		>
			<span class="mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto">
				Mostrando
				<span class="font-semibold text-gray-900">{data.commits?.length ?? 0}</span>
			</span>
		</nav>
	</div>

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
	{/if}
</div>
