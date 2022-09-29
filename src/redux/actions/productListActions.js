import { Cookies } from 'react-cookie';
import API from '../../api';

export async function getProductsList(arr, pageIndex) {
    const cookies = new Cookies();

    const userToken = cookies.get('accessToken')
    const tokenInStorage = localStorage.getItem('accessToken')

    if (arr && arr.collectionId && arr.fabricId) {
        const formData = {
            feaMethod: 'getProductsList',
            accessToken: tokenInStorage,
            page: pageIndex,
            pageSize: 24,
            idCollection: arr.collectionId,
            idCollectionFabric: arr.fabricId
        }
        const result = await API.post('/', new URLSearchParams(formData))
        return result;
    }
    if (arr && arr.fabricId) {
        const formData = {
            feaMethod: 'getProductsList',
            accessToken: tokenInStorage,
            page: pageIndex,
            pageSize: 24,
            idCollectionFabric: arr.fabricId
        }
        const result = await API.post('/', new URLSearchParams(formData))
        return result;
    }
    if (!arr) {
        const formData = {
            feaMethod: 'getProductsList',
            accessToken: tokenInStorage,
            page: pageIndex,
            pageSize: 24,
        }
        const result = await API.post('/', new URLSearchParams(formData))
        return result;
    }


}