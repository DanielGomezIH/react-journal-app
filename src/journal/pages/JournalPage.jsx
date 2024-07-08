import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';
import { AddButton } from '../components';

export const JournalPage = () => {
  return (
    <JournalLayout>

      <NothingSelectedView />

      {/* <NoteView /> */ }

      <AddButton />

    </JournalLayout>
  );
};