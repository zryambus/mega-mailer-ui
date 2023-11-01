import { MegaMailerApi } from '~/src/mega-mailer-api';
import { ApiRequestor, Requestor } from '~/src/requestor';

const requestor: ApiRequestor<MegaMailerApi> = new Requestor();

export { requestor }
