import axios from 'axios'

let access_token
const env = "imetro-s8ara"

const relay = axios.create({
    baseURL: "/relay",
    headers: {'Content-Type': 'application/json'}
})

relay.get("/getAccessToken.php").then(res=>{    
    access_token = res.data.access_token
    // console.log(access_token)
})

const wx = {
    axios: axios.create({
        baseURL: "/tcb",
        headers: {'Content-Type': 'application/json'}
    }),
    collection: function(query){
        console.log(query)
        return this.axios.request({
            url: "/databasequery?access_token=" + access_token,
            method: "POST",
            data: {
                env,
                query
            }
        })
    },
    aggregate: function(query){
        console.log(query)
        return this.axios.request({
            url: "/databaseaggregate?access_token=" + access_token,
            method: "POST",
            data: {
                env,
                query
            }
        })
    }
}

// 添加请求拦截器
wx.axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
wx.axios.interceptors.response.use(function (response) {
    console.log(response.data)
    if(response.data.errcode !=0){
        if(typeof(response.data) == typeof("")){
            alert(response.data)
        }else {
            alert(response.data.errmsg)
        }        
    }else{
        response.data.data = (JSON.parse("[" + response.data.data.toString() + "]"))
    }    
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default wx