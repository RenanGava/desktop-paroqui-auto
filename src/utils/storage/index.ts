import Store, { Options } from "electron-store";


type Key = '@jwtTheos'

const store = new Store({});



console.log();

function getKey(key:Key){
    //@ts-ignore
    return store.get('key')
}

function setKey(key:Key, value:any){
    //@ts-ignore
    return store.set('key', value)
}

function clearKeys(){

    //@ts-ignore
    store.clear()
    
}


export { getKey, setKey, clearKeys };
