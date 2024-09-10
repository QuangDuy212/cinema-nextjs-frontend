import { configureStore } from '@reduxjs/toolkit'
import accountSlide from './slice/accountSlide'
import billSlide from './slice/billSlide'

export const makeStore = () => {
    return configureStore({
        reducer: {
            account: accountSlide,
            bill: billSlide
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']