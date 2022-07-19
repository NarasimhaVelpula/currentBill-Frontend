import axios from 'axios'
const instance=axios.create({
    baseURL:"https://blooming-retreat-74928.herokuapp.com/"
    //baseURL: "http://localhost:3001/"
})
export default instance;