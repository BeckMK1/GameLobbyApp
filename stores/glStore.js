export const useGlStore = defineStore('glStore', {
    state: () => ({
        userData:{}
    }),
    actions:{
        setUserData(data){
            this.userData = data
        }
    },
})
