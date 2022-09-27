import { Cookies } from 'react-cookie';
import API from '../../api';

export async function getProductDetail(productId, typeId) {
    const cookies = new Cookies();

    const userToken = cookies.get('accessToken')
    const tokenInStorage = localStorage.getItem('accessToken')

    const formData = {
        feaMethod: 'getProduct',
        accessToken: tokenInStorage,
        productId: productId,
        productTypeId: typeId,
    }
    const result = await API.post('/', new URLSearchParams(formData))
    return result;

}