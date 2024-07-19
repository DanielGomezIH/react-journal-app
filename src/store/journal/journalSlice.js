import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice( {
  name: 'journal',

  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },

  reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },

    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },

    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved = '';
    },

    setPhotosToActiveNote: ( state, action ) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;
    },

    setNotes: ( state, action ) => {
      state.notes = action.payload;
    },

    setSaving: ( state ) => {
      state.isSaving = true;
      state.messageSaved = '';
    },

    updateNote: ( state, action ) => {
      state.isSaving = false;
      state.notes = state.notes.map( ( note ) => note.id === action.payload.id
        ? action.payload
        : note
      );
      state.messageSaved = `Note with title: "${ action.payload.title }" has been successfully updated.`;
    },

    deleteNoteById: ( state, action ) => {
      state.notes = state.notes.filter( ( note ) => note.id !== action.payload );
      state.active = null;
      state.messageSaved = `Note with id: "${ action.payload }" has been successfully deleted.`;
    },

    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    }
  }
} );

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;