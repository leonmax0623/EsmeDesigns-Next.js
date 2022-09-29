import API from '../../api';

export async function getTerritories() {
    const formData = {
        feaMethod: 'getTerritories',
        parrentTerritoryId: '',
    }
    const result = await API.post('/', new URLSearchParams(formData))
    return result;
}


export async function getStates(id) {
    const formData = {
        feaMethod: 'getTerritories',
        parrentTerritoryId: id,
    }
    const result = await API.post('/', new URLSearchParams(formData))
    return result;
}