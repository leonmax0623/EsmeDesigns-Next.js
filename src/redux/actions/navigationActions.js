import API from '../../api';

export async function getCollections() {
    const formData = {
        feaMethod: 'getCollections'
    }

    const result = await API.post('/', new URLSearchParams(formData))
    return result;
}