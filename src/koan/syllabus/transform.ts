import type { Duration, Period, PeriodDay, PeriodTime } from './types';

const durationToText: { [K in Duration]: string } = {
  Spring: '春学期',
  Summer: '夏学期',
  Fall: '秋学期',
  Winter: '冬学期',
  SpringSummer: '春～夏学期',
  FallWinter: '秋～冬学期',
  FullYear: '通年',
  ContinueToNextYear: '年度跨り',
  Intensive: '集中',
  FirstSemester: '１学期',
  SecondSemester: '２学期',
};

const periodDayToText: { [K in PeriodDay]: string } = {
  Mon: '月',
  Tue: '火',
  Wed: '水',
  Thu: '木',
  Fri: '金',
  Sat: '土',
};

const textToDuration = Object.fromEntries(
  Object.entries(durationToText).map((x) => x.reverse()),
) as { [K in string]: Duration };

const textToPeriodDay = Object.fromEntries(
  Object.entries(periodDayToText).map((x) => x.reverse()),
) as { [K in string]: PeriodDay };

export const stringifyDuration = (duration: Duration): string =>
  durationToText[duration];

export const parseDuration = (text: string): Duration => {
  const d = textToDuration[text];

  if (d === undefined) {
    throw new Error(`Invalid duration: ${text}`);
  }

  return d;
};

export const stringifyPeriod = (period: Period): string =>
  `${periodDayToText[period.day]}${period.time}`;

export const stringifyPeriodList = (periodList: Period[]): string =>
  periodList.map(stringifyPeriod).join(',');

export const parsePeriod = (text: string): Period | undefined => {
  if (text === '他') {
    return undefined;
  }

  const match = text.match(/^([月火水木金土])([1-7])$/u);
  if (match === null || match[1] === undefined || match[2] === undefined) {
    throw new Error(`Invalid period: ${text}`);
  }

  return {
    day: textToPeriodDay[match[1]] as PeriodDay,
    time: parseInt(match[2]) as PeriodTime,
  };
};

export const parsePeriodList = (text: string): Period[] => {
  const periodList = text.split(',').map(parsePeriod);

  if (periodList.some((period) => period === undefined)) {
    return [];
  }

  return periodList as Period[];
};
