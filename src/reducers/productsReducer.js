import { GET_PRODUCTS_LIST } from '../types'

const initialState = {
  products: [],
  loading: true,
}
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_LIST:
      return {
        ...state,
        getProductsList: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default productsReducer
