import { destroy, get, post, put } from ".";



export const signIn = async (data)=>{
    const res = await post(
        'https://ticket1a-app.herokuapp.com/api/login',data
        );
        return res;
    };

export const signUp = async (data)=>{
    const res = await post(
        'https://ticket1a-app.herokuapp.com/api/register',
        data);
        return res;
    };


export const getUser = async (config)=>{
        const res = await get(
            'https://ticket1a-app.herokuapp.com/api/user',config
        );
        return res;
    };

export const editUser = async (config,data,id)=>{
        const res = await put(
            `https://ticket1a-app.herokuapp.com/api/user/${id}`,data,config
        );
        return res;
    };


export const delUser = async (config,id)=>{
        const res = await destroy(
            `https://ticket1a-app.herokuapp.com/api/user/${id}`,config
        );
        return res;
    };


export const getRoles = async ()=>{
        const res = await get(
            'https://ticket1a-app.herokuapp.com/api/roles-list',
        );
        return res;
    };