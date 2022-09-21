import { Cookies } from 'react-cookie';
import API from '../../api';

export async function getProductsList() {
    const cookies = new Cookies();

    const userToken = cookies.get('accessToken')

    const formData = {
        feaMethod: 'getProductsList',
        accessToken: userToken
    }

    const result = await API.post('/', new URLSearchParams(formData))
    return result;
}