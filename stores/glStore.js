export const useGlStore = defineStore('glStore', {
    state: () => ({
        userData:{},
        selectedGame: "",
        isLogin: true
    }),
    actions:{
        setUserData(data){
            this.userData = data
        },
        setGame(data){
            this.selectedGame = data
        },
        setFilter(data){
            this.userData.gameFilters.push(data)
        },
        setLogin(data){
            this.isLogin = data
        }
    },
})
