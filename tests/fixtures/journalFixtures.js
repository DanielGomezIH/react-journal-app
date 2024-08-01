export const initialJournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null
};

export const singleNote = {
  id: 'note-1',
  title: 'Test Note',
  body: 'This is a test note',
  date: new Date().getTime(),
  imageUrls: []
};

export const multipleNotes = [
  {
    id: 'note-1',
    title: 'Test Note 1',
    body: 'This is the first test note',
    date: new Date().getTime(),
    imageUrls: []
  },
  {
    id: 'note-2',
    title: 'Test Note 2',
    body: 'This is the second test note',
    date: new Date().getTime(),
    imageUrls: []
  }
];

export const stateWithNotes = {
  isSaving: false,
  messageSaved: '',
  notes: multipleNotes,
  active: null
};

export const stateWithActiveNote = {
  isSaving: false,
  messageSaved: '',
  notes: multipleNotes,
  active: singleNote
};

export const newEmptyNote = {
  id: 'note-3',
  title: '',
  body: '',
  date: new Date().getTime(),
  imageUrls: []
};

export const updatedMockNote = {
  id: 'note-1',
  title: 'Updated Test Note',
  body: 'This is an updated test note',
  date: new Date().getTime(),
  imageUrls: [ 'https://example.com/image1.jpg' ]
};

export const newPhotos = [ 'https://example.com/image2.jpg', 'https://example.com/image3.jpg' ];

export const messageAfterUpdate = 'Note with title: "Updated Test Note" has been successfully updated.';

export const messageAfterDelete = 'Note with id: "note-1" has been successfully deleted.';