import fetch from 'node-fetch';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-token': 'xxx'
};

class ApiHelper{
    makeRequest(url, method, headers, body){
        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: Object.assign({}, defaultHeaders, headers),
        })
        .then(res =>  res.json());
    }

    fetchUsernames(username){
        return this.makeRequest(`https://mb71r4j683.execute-api.ap-northeast-1.amazonaws.com/test/usernames?lookup=${username}`);
    }
}

export default new ApiHelper();