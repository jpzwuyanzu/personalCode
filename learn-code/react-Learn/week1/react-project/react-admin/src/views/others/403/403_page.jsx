import React from 'react';
import { Result, Button} from 'antd'
import { useHistory } from 'react-router-dom';

const NoAuthorized = () => {
    const history = useHistory()
    console.log(history)
    const goBack = () => {
        history.goBack(-1)
    }
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={goBack}>Back Home</Button>}
        />
    );
}

export default NoAuthorized;
