/* eslint-disable prettier/prettier */
export const CONTACT = 'CONTACT';
export const LOADING = 'LOADING';
export const LOADING_DETAIL = 'LOADING_DETAIL';
export const initialState = {
  id: null,
  loading: true,
  loadingDetail: true,
};
const reduce = (state, action) => {
  switch (action.type) {
    case CONTACT:
      return {...state, id: action.payload};
    case LOADING:
      return {...state, loading: action.payload};
    case LOADING_DETAIL:
      return {...state, loadingDetail: action.payload};
    default:
      return state;
  }
};
export default reduce;
