export const run = ({ dispatch }, date, arr) => {
    dispatch('CUST_DOWN')
}

export const clear = ({ dispatch }, date, arr) => {
    dispatch('STOP')
}