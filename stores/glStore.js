export const useGlStore = defineStore('glStore', {
    state: () => ({
        user:{},
        selectedGame: "",
        isLogin: true
    }),
    actions:{
        setUserData(data){
            this.user = data
        },
        setGame(data){
            this.selectedGame = data
        },
        setFilter(data){
            this.user.userData.gameFilters.push(data)
        },
        setLogin(data){
            this.isLogin = data
        }
    },
})
