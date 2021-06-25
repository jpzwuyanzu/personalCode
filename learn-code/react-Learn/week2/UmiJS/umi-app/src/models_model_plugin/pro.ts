import { useState } from 'react';
import { getProlist } from '../api/pro'

export default function () {
    const [prolist, setProlist] = useState([])

    //数据请求
    const getProlistFn = async () => {
        const res = await getProlist()
        setProlist(res.data)
    }

    return {
        prolist,
        getProlistFn
    }
}