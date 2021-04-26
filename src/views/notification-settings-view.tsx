import * as React from 'react';
import * as cl from '_base.scss';
import { Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';

import { ImportantAddresses } from './settings/important-addresses';
import { WorkingHours } from './settings/working-hours';
import { ImportantTags } from './settings/important-tags';



const NotificationSettingsView: React.FC = () => {
  const [tab, setTab] = React.useState('1');

  const tabsProps = (id: string) => (
    {
      value: id,
      className:tab === id && cl.tab
    }
  );

  return (
    <TabContext value={tab}>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
      >
        <Tab label={'Working hours'} value={'1'} />
        <Tab label={'Important addresses'} value={'2'} />
        <Tab label={'Important tags'} value={'3'} />
      </Tabs>
      <TabPanel {...tabsProps('1')}>
        <WorkingHours />
      </TabPanel>
      <TabPanel {...tabsProps('2')}>
        <ImportantAddresses />
      </TabPanel>
      <TabPanel {...tabsProps('3')}>
        <ImportantTags />
      </TabPanel>
    </TabContext>
  )
};

export { NotificationSettingsView }
