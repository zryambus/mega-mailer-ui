import * as React from 'react';
import { Button, Box, RangeSlider } from '@mantine/core';
import * as cl from '~/src/app.module.scss';

export const WorkingHours = () => {
  return (
    <Box className={cl.childSpacingV}>
      <RangeSlider
        defaultValue={[10, 19]}
        min={0}
        max={24}
        step={1}
        labelAlwaysOn
        label={v => `${v}:00`}
        minRange={1}
      />
      <Button>Submit</Button>
    </Box>
  )
}
