import API from '../../api';

export async function getTerritories() {
    const formData = {
        feaMethod: 'getTerritories',
        parrentTerritoryId: null,
    }
    const result = await API.post('/', new URLSearchParams(formData))
    return result;
}