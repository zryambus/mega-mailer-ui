import * as React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';

import { ImportantAddresses } from './important-addresses';
import { WorkingHours } from './working-hours';

const NotificationSettingsView: React.FC = () => {
  const [tab, setTab] = React.useState('1');
  return (
    <TabContext value={tab}>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
      >
        <Tab label={'Working hours'} value={'1'} />
        <Tab label={'Important addresses'} value={'2'} />
      </Tabs>
      <TabPanel value={'1'}>
        <WorkingHours />
      </TabPanel>
      <TabPanel value={'2'}>
        <ImportantAddresses />
      </TabPanel>
    </TabContext>
  )
};

export { NotificationSettingsView }
