import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';
import { AddButton } from '../components';
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../store';
import { useSelector } from 'react-redux';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active: activeNote } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  };

  return (
    <JournalLayout>
      { activeNote
        ?
        <NoteView />
        :
        <NothingSelectedView />
      }

      <AddButton
        onClickNewNote={ onClickNewNote }
        isSavingNote={ isSaving }
      />
    </JournalLayout>
  );
};