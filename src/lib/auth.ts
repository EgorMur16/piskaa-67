export const saveToken=(token:string)=>{
    localStorage.setItem('token',token);
};
export const logout=()=>{
    localStorage.removeItem('token');
}