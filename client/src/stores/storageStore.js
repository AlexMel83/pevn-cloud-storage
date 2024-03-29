import {defineStore} from 'pinia';

export const useStorageStore = defineStore('storageStore', {
    state: () => ({
        storage: [{id:1},{id:2}],
    })
})