import { writable } from 'svelte/store';
import { api } from '../utils/_api';

export const allMahasiswa = writable([])
export const detailMahasiswa = writable({})
export const showAlert = writable(false)


export const getMahasiswa = async () => {
	try {
		const response = await api('get', 'mahasiswa')
		const data = await response.json()
		if (response.ok) return allMahasiswa.set(data.data)
		return allMahasiswa.set([])
	} catch (error) {
		throw new Error(error)
	}
}

export const getMahasiswaById = async (id) => {
	try {
		const response = await api('get', `mahasiswa/${id}`)
		const data = await response.json()
		if (response.ok) return detailMahasiswa.set(data.data)
		return detailMahasiswa.set({})
	} catch (error) {
		throw new Error(error)
	}
}

export const postMahasiswa = async (body) => {
	const response = await api('post', 'mahasiswa', body)
	const data = await response.json()
	if (response.status == 201) return allMahasiswa.set(data.data)
	return allMahasiswa.set([])
}

export const putMahasiswa = async (id, body) => {
	const response = await api('put', `mahasiswa/${id}`, body)
	const data = await response.json()
	if (response.status == 201) return detailMahasiswa.set(data.data)
	return detailMahasiswa.set({})
}

export const delMahasiswa = async (id) => {
	const response = await api('delete', `mahasiswa/${id}`)
	const data = await response.json()
	if (response.ok) {
		allMahasiswa.set(data.data)
		return showAlert.set(true)
	}
	return showAlert.set(false)
}

export const get = async ({ locals }) => {
	// locals.userid comes from src/hooks.js
	const response = await api('get', `todos/${locals.userid}`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			body: {
				todos: []
			}
		};
	}

	if (response.status === 200) {
		return {
			body: {
				todos: await response.json()
			}
		};
	}

	return {
		status: response.status
	};
};

export const post = async ({ request, locals }) => {
	const form = await request.formData();

	await api('post', `todos/${locals.userid}`, {
		text: form.get('text')
	});

	return {};
};

// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
const redirect = {
	status: 303,
	headers: {
		location: '/todos'
	}
};

export const patch = async ({ request, locals }) => {
	const form = await request.formData();

	await api('patch', `todos/${locals.userid}/${form.get('uid')}`, {
		text: form.has('text') ? form.get('text') : undefined,
		done: form.has('done') ? !!form.get('done') : undefined
	});

	return redirect;
};

export const del = async ({ request, locals }) => {
	const form = await request.formData();

	await api('delete', `todos/${locals.userid}/${form.get('uid')}`);

	return redirect;
};
