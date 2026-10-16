import Store, { Options } from "electron-store";


type Key = '@jwtTheos' | "email" | "pass"

const store = new Store({});


function getKey(key:Key): string{
    //@ts-ignore
    return store.get(key)
}

function setKey(key:Key, value:any){

    store.delete(key)
    store.set(key, value)
}

function clearKeys(){
    //@ts-ignore
    store.clear()
}


export { getKey, setKey, clearKeys };
