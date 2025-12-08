export interface ActivityRecord {
  date: string;
  dateColor: 'black' | 'red' | 'blue';
  name: string;
  totalParticipants: number;
  participants: string[];
}

export interface MonthData {
  monthName: string;
  records: ActivityRecord[];
}