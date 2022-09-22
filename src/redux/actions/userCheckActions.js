import { Cookies } from 'react-cookie';
import API from '../../api';

export async function getUserCheckResult() {
    const cookies = new Cookies();

    const userToken = cookies.get('accessToken')
    const tokenInStorage = localStorage.getItem('accessToken')

    const formData = {
        feaMethod: 'getSalesOrdersList',
        accessToken: tokenInStorage
    }

    const result = await API.post('/', new URLSearchParams(formData))
    return result;
}