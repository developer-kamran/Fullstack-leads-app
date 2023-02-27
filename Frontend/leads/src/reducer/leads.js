import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from './actions/types.js';

const initialState = {
  leads: [],
};

export default function (state = initialState, action) {
  if (action.type === GET_LEADS) {
    return { ...state, leads: action.payload };
  }
  if (action.type === DELETE_LEAD) {
    const leads = state.leads.filter((lead) => lead.id !== action.payload);
    return { ...state, leads };
  }
  if (action.type === ADD_LEAD) {
    return { ...state, leads: [...state.leads, action.payload] };
  }
  return state;
}
