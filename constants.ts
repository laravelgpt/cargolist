import { TableRow } from './types';

export const INITIAL_TABLE_DATA: TableRow[] = [
  { id: 1, serial: '১', description: 'কম্বল', quantity: '১ পিছ', remarks: '' },
  { id: 2, serial: '২', description: 'পাউডার দুধ', quantity: '১ পিছ', remarks: 'ছোট প্যাকেট হলে ২ পিছ' },
  { id: 3, serial: '৩', description: 'চিনি', quantity: '২ কেজি', remarks: '' },
  { id: 4, serial: '৪', description: 'খেজুর', quantity: '৩ কেজি', remarks: '' },
  { id: 5, serial: '৫', description: 'চকলেট', quantity: '২ কেজি', remarks: '' },
  { id: 6, serial: '৬', description: 'সাবান', quantity: '৫ পিছ', remarks: '' },
  { id: 7, serial: '৭', description: 'শ্যাম্পু', quantity: '২ পিছ', remarks: 'কসমেটিকস' },
  { id: 8, serial: '৮', description: 'লোশন', quantity: '২ পিছ', remarks: 'সব কিছু মিলিয়ে ৪ কেজি' },
  { id: 9, serial: '৯', description: 'ক্রিম', quantity: '৩ পিছ', remarks: '' },
  { id: 10, serial: '১০', description: 'তেল', quantity: '২ পিছ', remarks: '' },
  { id: 11, serial: '১১', description: 'মেকাপ বক্স', quantity: '১ পিছ', remarks: '' },
  { id: 12, serial: '১২', description: 'জায়নামাজ', quantity: '৩ পিছ', remarks: '' },
  { id: 13, serial: '১৩', description: 'খেলনা', quantity: '৩ পিছ', remarks: '' },
  { id: 14, serial: '১৪', description: 'জামা কাপড়', quantity: '৪-৫ সেট', remarks: 'শর্ত সাপেক্ষে পাঠানো যাবে' },
  { id: 15, serial: '১৫', description: 'প্রেসার / রাইস কুকার', quantity: '১ পিছ', remarks: '' },
  { id: 16, serial: '১৬', description: 'ইলেক্ট্রিক মালামাল', quantity: '', remarks: '' },
  { id: 17, serial: '১৭', description: 'টর্চ লাইট', quantity: '২ পিছ', remarks: '' },
  { id: 18, serial: '১৮', description: 'মশলা আইটেম', quantity: '১-২ কেজি', remarks: 'এলাচ, দারচিনি, জিরা ইত্যাদি' },
  { id: 19, serial: '১৯', description: 'আয়রন', quantity: '১ পিছ', remarks: '' },
  { id: 20, serial: '২০', description: 'ঘড়ি / চশমা', quantity: '২ পিছ', remarks: '' },
  { id: 21, serial: '২১', description: 'ল্যাপটপ', quantity: '১ পিছ', remarks: 'চার্জার ছাড়া দেওয়া যাবে না' },
];

export const FONT_OPTIONS = [
  { value: "'Hind Siliguri', sans-serif", label: 'Hind Siliguri (Default)' },
  { value: "'Noto Sans Bengali', sans-serif", label: 'Noto Sans Bengali' },
  { value: "'Noto Serif Bengali', serif", label: 'Sonali Bangla' },
  { value: "'Roboto', sans-serif", label: 'Roboto' },
  { value: "'Lato', sans-serif", label: 'Lato' },
  { value: "'Times New Roman', serif", label: 'Times New Roman' },
];