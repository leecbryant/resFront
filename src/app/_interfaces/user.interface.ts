export interface UserArray {
  data: User[];
}

export interface User {
  Id:            number;
  Username:      string;
  Password:      string;
  Name:          string;
  Email:         string;
  RegIp:         string;
  LoginIps:      string;
  EmailVerified: number;
  LockoutCode:   string;
  RegHall:       string;
  DefaultHall:   number;
  Access:        number;
  Accessibility: string;
  LastReset:     number;
}
