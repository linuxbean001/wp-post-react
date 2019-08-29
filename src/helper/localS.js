export const localS={
    setLocal,
    getLocal,
    removeLocal
}

function setLocal(name,data){
    localStorage.setItem(name,JSON.stringify(data));
}

function getLocal(name){
    return JSON.parse(localStorage.getItem(name));
}

function removeLocal(name){
    localStorage.removeItem(name);
}