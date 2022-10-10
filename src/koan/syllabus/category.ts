import * as cheerio from 'cheerio';
import { createSession } from '../session';
import { createClient } from '../client';
import type { Category } from './types';

export const listCategory = async (): Promise<Category[]> => {
  const { flowExecutionKey, cookieJar } = await createSession();

  const url = new URL('https://koan.osaka-u.ac.jp/campusweb/campussquare.do');
  url.searchParams.append('_flowExecutionKey', flowExecutionKey);

  const client = createClient();
  const html = await client
    .get({
      url,
      followRedirect: false,
      cookieJar,
      timeout: {
        request: 5000,
      },
    })
    .text();

  return extractCategoryList(html);
};

const extractCategoryList = (html: string): Category[] => {
  const $ = cheerio.load(html);

  return $('#jShozokuCodeMajor > option')
    .map((_i, option) => {
      const $option = $(option);

      const id = $option.attr('value');
      if (id === undefined) {
        throw new Error('<option> element does not have attribute "value"');
      }

      return { id, name: $option.text() };
    })
    .toArray();
};
