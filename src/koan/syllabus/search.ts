import * as cheerio from 'cheerio';
import { createSession } from '../session';
import { createClient } from '../client';
import type { Course, SearchQuery } from './types';
import { parseDuration, parsePeriodList } from './transform';

export const search = async (query: SearchQuery): Promise<Course[]> => {
  const { flowExecutionKey, cookieJar } = await createSession();

  const form = {
    s_no: 0,
    _flowExecutionKey: flowExecutionKey,
    _eventId: 'search',
    nendo: query.year,
    categoryFlg: 1,
    jShozokuCodeMajor: query.categoryId,
    _gymnasticsFlg: 1,
    kaikokbncd: '',
    yobi: '',
    jigen: '',
    nenji: '',
    bunyacd: '',
    kaikoKamokunm: query.name,
    kyokannm: '',
    kyokankn: '',
    freeword: '',
    freewordCondition: 0,
  };

  const client = createClient();
  const html = await client
    .post({
      url: 'https://koan.osaka-u.ac.jp/campusweb/campussquare.do',
      followRedirect: true,
      cookieJar,
      form,
      timeout: {
        request: 20000,
      },
    })
    .text();

  return extractCourseList(html);
};

const extractCourseList = (html: string): Course[] => {
  const $ = cheerio.load(html);

  return $(
    '#tabs-1 > table > tbody > tr > td:nth-child(4) > table > tbody > tr',
  )
    .map((_i, tr) => {
      const $tr = $(tr);
      const $tds = $tr.children('td');

      const $duration = $($tds.get(3));
      const duration = parseDuration($duration.text().trim());

      const $periods = $($tds.get(4));
      const periods = parsePeriodList($periods.text().trim());

      const id = $($tds.get(5)).text().trim();
      const name = $($tds.get(6)).text().trim();
      const instructor = $($tds.get(7)).text().trim();

      if (id === '') {
        throw new Error('Course ID is empty');
      }
      if (name === '') {
        throw new Error('Course name is empty');
      }
      if (instructor === '') {
        throw new Error('Course instructor is empty');
      }

      return { id, name, instructor, duration, periods };
    })
    .toArray();
};
