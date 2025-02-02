// Generated by https://quicktype.io

export interface Registration {
  data: Data;
}

export interface Data {
  base:  Base[];
  users: User[];
}

export interface Base {
  Active:      number;
  AccessName:  string;
  AccessLevel: number;
  HallName:    string;
  HallId:      number;
}

export interface User {
  Username: string;
  Email:    string;
}
