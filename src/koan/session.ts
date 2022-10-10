import got, { Response } from 'got';
import { CookieJar } from 'tough-cookie';

export interface KoanSession {
  cookieJar: CookieJar;
  flowExecutionKey: string;
}

export const createSession = async (): Promise<KoanSession> => {
  const cookieJar = new CookieJar();

  const resp = await got({
    url: 'https://koan.osaka-u.ac.jp/campusweb/campussquare.do?_flowId=SYW4201600-flow&locale=ja_JP',
    followRedirect: false,
    cookieJar,
    timeout: {
      request: 5000,
    },
  });

  return {
    cookieJar,
    flowExecutionKey: extractFlowExecutionKey(resp),
  };
};

const extractFlowExecutionKey = (resp: Response): string => {
  const redirectTo = resp.headers.location;
  if (redirectTo === undefined) {
    throw new Error(`KOAN responded with no location header`);
  }

  const redirectToUrl = new URL(redirectTo, 'https://example.com');

  const flowExecutionKey = redirectToUrl.searchParams.get('_flowExecutionKey');
  if (flowExecutionKey === null) {
    throw new Error(`KOAN responded with no _flowExecutionKey`);
  }

  return flowExecutionKey;
};
