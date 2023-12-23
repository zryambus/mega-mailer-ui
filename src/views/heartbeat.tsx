import * as React from 'react';
import { Box, Table } from '@mantine/core';
import * as cl from '~/src/app.module.scss';
import { getHeartbeatQuery } from '~/src/queries/heartbeat';

export const Heartbeat = () => {
  const query = getHeartbeatQuery();

  return (
    <Box className={cl.childSpacingV}>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Checker</Table.Td>
            <Table.Td>{query.data?.MAIL_CHECKER ? 'Online' : 'Offline'}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Bot</Table.Td>
            <Table.Td>{query.data?.TELEGRAM_BOT ? 'Online' : 'Offline'}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Box>
  );
}
