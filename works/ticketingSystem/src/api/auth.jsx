import users from "../db/user";

export const loginAPI = ()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>resolve({
           
            userss: users

            })
       ,500);
    });
}