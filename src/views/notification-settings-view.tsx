import * as React from 'react';
import cn from 'classnames';
import * as cl from '_base.scss';
import { Button, Input, Slider, Tooltip, Typography } from '@material-ui/core';
import { Warning } from '@material-ui/icons';

import { getWorkingHoursMutation, getWorkingHoursQuery } from 'queries/working-hours';

const initialWorkingHours: [number, number] = [10, 19];

const NotificationSettingsView: React.FC = () => {
  const [workingHours, setWorkingHours] = React.useState(initialWorkingHours);
  const handleChange = (event: any, newValue: [number, number]) => {
    setWorkingHours(newValue);
  };

  const workingHoursQuery = getWorkingHoursQuery();
  const workingHoursMutation = getWorkingHoursMutation();

  React.useEffect(() => {
    if (workingHoursQuery.status === 'success')
      setWorkingHours(workingHoursQuery.data);
  }, [workingHoursQuery.data])

  const Alert = () => {
    if (workingHoursQuery.data == null) {
      return (
        <Tooltip title={'Currently not set'}>
          <Warning color={'error'}  />
        </Tooltip>
      );
    }
    return <div/>;
  }

  if (workingHoursQuery.isLoading) {
    return <h3>Loading</h3>;
  }

  return (
    <div className={cn(cl.fullSize, cl.flexbox)}>
      <div className={cn(cl.marginAuto, cl.flexcol, cl.childSpacingV)}>
        <div className={cl.flexrow}>
          <Typography variant={'h5'} gutterBottom>
            Working hours
          </Typography>
          <Alert />
        </div>
        <div className={cn(cl.flexrow, cl.childSpacingH, cl.wideControlWidth)}>
          <Input
            value={workingHours[0]}
            className={cl.narrowNumericInput}
            margin='dense'
            readOnly={true}
            inputProps={{
              type: 'number'
            }}
          />
          <Slider
            value={workingHours}
            onChange={handleChange}
            step={1}
            min={0}
            max={24}
            marks={[8, 10, 12, 14, 16, 18, 20, 22].map(i => ({ value: i, label: `${i}h` }))}
          />
          <Input
            value={workingHours[1]}
            className={cl.narrowNumericInput}
            margin='dense'
            readOnly={true}
            inputProps={{
              type: 'number'
            }}
          />
        </div>
        <Button
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          onClick={() => workingHoursMutation.mutate(workingHours)}
        >
          Save working hours
        </Button>
      </div>
    </div>
  );
};

export { NotificationSettingsView }
