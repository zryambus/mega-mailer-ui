import * as React from 'react';
import { Button, Box, RangeSlider } from '@mantine/core';
import * as cl from '~/src/app.module.scss';
import { getWorkingHoursQuery, getWorkingHoursMutation } from '~src/queries/working-hours';

export const WorkingHours = () => {

  const wh = getWorkingHoursQuery();
  const mutation = getWorkingHoursMutation();
  
  const [changedWh, setWh] = React.useState<[number, number]>([10, 19])

  React.useEffect(() => {
    if (wh.data)
        setWh(wh.data);
  }, [wh.data]);

  const onClick = () => {
    mutation.mutate(changedWh);
  };

  return (
    <Box className={cl.childSpacingV}>
      <RangeSlider
        onChange={setWh}
        value={changedWh}
        min={0}
        max={23}
        step={1}
        labelAlwaysOn
        label={v => `${v}:00`}
        minRange={1}
      />
      <Button onClick={onClick}>Submit</Button>
    </Box>
  )
}
