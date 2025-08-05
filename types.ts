export interface TableRow {
  id: number;
  serial: string;
  description: string;
  quantity: string;
  remarks: string;
}

export interface HeaderState {
  companyName: string;
  address: string;
  tagline: string;
  mobile: string;
  listTitle: string;
}

export interface FooterState {
  warning: string;
  examples: string;
}

export interface WatermarkState {
  topArcText: string;
  bottomArcText: string;
  centralText: string;
  show: boolean;
}

export interface ThemeState {
  fontFamily: string;
  headingFontFamily: string;
  accentColor: string;
  fontSize: string;
}