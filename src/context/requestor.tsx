import * as React from 'react';
import { MegaMailerApi } from 'mega-mailer-api';
import { ApiRequestor, Requestor } from 'requestor';

const requestor: ApiRequestor<MegaMailerApi> = new Requestor();

export { requestor }
