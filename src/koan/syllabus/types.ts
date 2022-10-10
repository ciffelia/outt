// 科目
export interface Course {
  // 時間割コード
  id: string;

  // 科目名
  name: string;

  // 担当教員
  instructor: string;

  // 開講学期
  duration: Duration;

  // 曜日・時間
  periods: Period[];
}

// 開講学期
export type Duration =
  | 'Spring'
  | 'Summer'
  | 'Fall'
  | 'Winter'
  | 'SpringSummer'
  | 'FallWinter'
  | 'FullYear'
  | 'ContinueToNextYear'
  | 'Intensive'
  | 'FirstSemester' // 旧1学期
  | 'SecondSemester'; // 旧2学期

// 曜日・時間
export interface Period {
  day: PeriodDay;
  time: PeriodTime;
}

export type PeriodDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
export type PeriodTime = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// 科目カテゴリ/開講所属（学部等）
export interface Category {
  id: string;
  name: string;
}

export interface SearchQuery {
  // 開講年度
  year: number;

  // 科目カテゴリID
  categoryId: string;

  // 科目名
  name: string;
}
