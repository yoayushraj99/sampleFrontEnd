import React from 'react';
import Drawer from '../../components/drawer/drawer.component';
import ShowmailsList from '../history-mail/history-mail';
import ScheduleMail from '../scheduled-mail/scheduled-mail';

export default function homepage({ currentUser }) {
  console.log(currentUser);
  return (
    <div>
      <Drawer
        currentUser={currentUser}
        ShowmailsList={ShowmailsList}
        ScheduleMail={ScheduleMail}
      />
    </div>
  );
}
