import {configureStore} from '@reduxjs/toolkit'
import Bills from './services/Bills'

export default configureStore({
    reducer:{
        'bills': Bills
    }
})