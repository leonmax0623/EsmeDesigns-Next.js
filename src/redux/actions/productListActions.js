import { Cookies } from 'react-cookie';
import API from '../../api';

export async function getProductsList() {
    const cookies = new Cookies();

    const userToken = cookies.get('accessToken')
    const tokenInStorage = localStorage.getItem('accessToken')

    const formData = {
        feaMethod: 'getProductsList',
        accessToken: tokenInStorage
    }

    const result = await API.post('/', new URLSearchParams(formData))
    return result;
}