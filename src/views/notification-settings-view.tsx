import * as React from 'react';
import cn from 'classnames';
import * as cl from '_base.scss';
import { Badge, Button, Input, Slider, Tooltip, Typography } from '@material-ui/core';
import { useRequestor } from 'context/requestor';
import { Warning } from '@material-ui/icons';

const initialWorkingHours: [number, number] = [10, 19];

const NotificationSettingsView: React.FC = () => {
  const [workingHours, setWorkingHours] = React.useState(initialWorkingHours);
  const [whNotSet, setWhNotSet] = React.useState(true);
  const handleChange = (event: any, newValue: [number, number]) => {
    setWorkingHours(newValue);
  };

  const requestor = useRequestor();

  React.useEffect(() => {
    const f = (async () => {
      const hours = await requestor.getJson('/api/working_hours', undefined);
      if (hours == null)
        return;

      setWorkingHours(hours);
      setWhNotSet(false);
    })();
    return () => f.cancel();
  }, []);

  const saveWorkingHours = async () => {
    await requestor.postJson('/api/working_hours', undefined, workingHours);
    setWhNotSet(false);
  };

  const Alert = () => {
    if (whNotSet) {
      return (
        <Tooltip title={'Currently not set'}>
          <Warning color={'error'}  />
        </Tooltip>
      );
    }
    return <div/>;
  }

  return (
    <div className={cn(cl.fullSize, cl.flexbox)}>
      <div className={cn(cl.marginAuto, cl.flexcol, cl.childSpacingV)}>
        <div className={cl.flexrow}>
          <Typography gutterBottom>
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
          onClick={saveWorkingHours}
        >
          Save working hours
        </Button>
      </div>
    </div>
  );
};

export { NotificationSettingsView }
