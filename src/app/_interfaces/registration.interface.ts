export interface RegisterArray {
  data: Registration[];
}

export interface Registration {
  HallName:   string;
  Hall:       string;
  AccessName: string;
  Access:     number;
  Active:     number;
}
