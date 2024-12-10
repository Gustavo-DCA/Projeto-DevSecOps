<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	let { data } = $props();
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
					<th scope="col" class="px-6 py-3"> Id do commit </th>
					<th scope="col" class="px-6 py-3"> Razao </th>
					<th scope="col" class="px-6 py-3"> Data / Hora </th>
				</tr>
			</thead>
			<tbody class="flex w-full flex-col shadow child:flex child:child:flex-1 child:items-center">
				{#each data.attention! as item}
					<tr class="border-b bg-white hover:bg-gray-50">
						<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
							{item.commitId}
						</th>
						<td class="px-6 py-4"> {item.reason} </td>
						<td class="px-6 py-4">
							{item.timestamp?.toLocaleDateString()} - {item.timestamp?.toLocaleTimeString()}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<nav
			class="flex-column flex flex-wrap items-center justify-between bg-white px-5 py-4 md:flex-row"
			aria-label="Table navigation"
		>
			<span class="mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto"
				>Mostrando <span class="font-semibold text-gray-900">{data.attention.length}</span>
			</span>
		</nav>
	</div>
</div>
