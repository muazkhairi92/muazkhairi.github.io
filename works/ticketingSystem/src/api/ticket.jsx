
import { destroy, get, post, put } from ".";

export const getTickets = async (config)=>{
    const res = await get(
        'https://ticket1a-app.herokuapp.com/api/ticket',config
    );
    return res;
};
export const createTickets = async (data,config)=>{
    const res = await post(
        'https://ticket1a-app.herokuapp.com/api/ticket',data,config
    );
    return res;
};

export const editTicket = async (config,data,id)=>{
    const res = await put(
        `https://ticket1a-app.herokuapp.com/api/ticket/${id}`,data,config
    );
    return res;
};


export const delTicket = async (config,id)=>{
    const res = await destroy(
        `https://ticket1a-app.herokuapp.com/api/ticket/${id}`,config
    );
    return res;
};

export const getStatus = async (token)=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const res  = await get(
        'https://ticket1a-app.herokuapp.com/api/ticket-lookup',config
    );
    return res;
};