<script>
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { putMahasiswa, getMahasiswaById, detailMahasiswa } from '../../store/mahasiswa-store';
	let name, nim, clas, mhs;
	const id = $page.params.id;
	let showForm = false;
	onMount(async () => {
		await getMahasiswaById(id);
	});

	async function handleUpdate(event) {
		event.preventDefault();
		const data = {
			nim: nim,
			name: name,
			class: clas
		};
		await putMahasiswa(id, data);
		name = '';
		nim = '';
		clas = '';
	}

	function toggleForm() {
		showForm = !showForm;
	}

	$: mhs = $detailMahasiswa;
</script>

<svelte:head>
	<title>Mahasiswa - {mhs.name}</title>
</svelte:head>

<div class="todos" transition:scale|local={{ start: 0.7 }}>
	<h1>Mahasiswa - {mhs.name}</h1>
	<div class="todo" transition:scale|local={{ start: 0.7 }}>
		<form class="text">
			<input aria-label="Edit todo" type="text" name="nim" bind:value={mhs.nim} disabled />
			<input aria-label="Edit todo" type="text" name="name" bind:value={mhs.name} disabled />
			<input aria-label="Edit todo" type="text" name="class" bind:value={mhs.class} disabled />
			<!-- <button aria-label="Save todo" on:click={toggleForm}>{showForm}</button> -->
		</form>
	</div>

	<form class="new" on:submit={handleUpdate} transition:scale|local={{ start: 0.7 }}>
		<input name="text" aria-label="Add todo" placeholder={mhs.name} bind:value={name} />
		<input name="text" aria-label="Add todo" placeholder={mhs.nim} bind:value={nim} />
		<input name="text" aria-label="Add todo" placeholder={mhs.class} bind:value={clas} />
		<button type="submit" class="submiter" aria-label="Save todo">Save</button>
	</form>
</div>

<style>
	/* your styles go here */
	.todos {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.new {
		margin: 0 0 0.5rem 0;
	}

	input {
		border: 1px solid transparent;
	}

	input:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}

	.new input {
		font-size: 28px;
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		border-color: gray;
		text-align: center;
	}

	.submiter {
		font-size: 15px;
		width: 100%;
		padding: 10px;
		margin-top: 10px;
		border-radius: 8px;
		border-color: gray;
	}

	.todo {
		display: grid;
		grid-template-columns: 2rem 1fr 2rem;
		grid-gap: 0.5rem;
		align-items: center;
		margin: 0 0 0.5rem 0;
		padding: 0.5rem;
		background-color: white;
		border-radius: 8px;
		filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
		transform: translate(-1px, -1px);
		transition: filter 0.2s, transform 0.2s;
	}

	form.text {
		position: relative;
		display: flex;
		align-items: center;
		flex: 1;
	}

	.todo input {
		flex: 1;
		padding: 0.5em 2em 0.5em 0.8em;
		border-radius: 3px;
	}

	.todo button {
		width: 2em;
		height: 2em;
		border: none;
		background-color: transparent;
		background-position: 50% 50%;
		background-repeat: no-repeat;
	}

	.delete {
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
		opacity: 0.2;
	}

	.delete:hover,
	.delete:focus {
		transition: opacity 0.2s;
		opacity: 1;
	}
</style>
