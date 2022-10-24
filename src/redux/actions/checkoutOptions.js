import { Cookies } from 'react-cookie';
import API from '../../api';

export async function getCheckoutOptions() {
    const cookies = new Cookies();

    const tokenInStorage = localStorage.getItem('accessToken')

    const formData = {
        feaMethod: 'getCheckoutOptions',
        accessToken: tokenInStorage,
    }
    const result = await API.post('/', new URLSearchParams(formData))
    return result;


}