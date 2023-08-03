import { createReducer } from "@reduxjs/toolkit";

export const types = {
 SET_TITLE:'title',
 SET_DESCRIPTION:'desc',
 SET_CATEGORY:'category',
 SET_STATUS:'status',
 SET_DUE_DATE:'dueDate',
 SET_UPDATE:"update",
 SET_UPDATE_ITEMTEXT:"updItemText",
 SET_UPDATE_DESCRIPTION:'updDesc',
 SET_UPDATE_CATEGORY:'updCategory',
 SET_UPDATE_DUE_DATE:'updDueDate',
 SET_OPTIONS:'options',
 SET_OPTIONS_CATEGORY:'optionsCategory',
}

const initialState = {
  title:'',
  description:'',
  category:'',
  dueDate:'',
  status:'ACTIVE',
  isUpdate:'',
  updateItemText:'',
  updateDescription:'',
  updateCategory:'',
  updateDueDate:'',
  options:'ALL',
  optionsCategory:'ALL'
};


export const customReducer = createReducer(initialState,{
    [types.SET_TITLE]:(state, action) => {
        state.title = action.payload;
    },
    [types.SET_DESCRIPTION]:(state, action) => {
        state.description = action.payload;
    },
    [types.SET_CATEGORY]:(state, action) => {
        state.category = action.payload;
    },
    [types.SET_DUE_DATE]:(state, action) => {
        state.dueDate = action.payload;
    },
    [types.SET_UPDATE]:(state, action) => {
        state.isUpdate = action.payload;
    },
    [types.SET_UPDATE_ITEMTEXT]:(state, action) => {
        state.updateItemText = action.payload;
    },
    [types.SET_UPDATE_DESCRIPTION]:(state, action) => {
        state.updateDescription = action.payload;
    },
    [types.SET_UPDATE_DUE_DATE]:(state, action) => {
        state.updateDueDate = action.payload;
    },
    [types.SET_UPDATE_CATEGORY]:(state, action) => {
        state.updateCategory = action.payload;
    },
    [types.SET_STATUS]:(state, action) => {
        state.status = 'ACTIVE';
    },
    [types.SET_OPTIONS]:(state, action) => {
        state.options = action.payload
    },
    [types.SET_OPTIONS_CATEGORY]:(state, action) => {
        state.optionsCategory = action.payload
    },

});