export type TransactionType = 'income' | 'expense';

export type CategoryId =
  | 'food'
  | 'transport'
  | 'medicine'
  | 'groceries'
  | 'rent'
  | 'gifts'
  | 'savings'
  | 'entertainment'
  | 'salary'
  | 'others';

export type PeriodOption = 'Daily' | 'Weekly' | 'Monthly' | 'Year';

export interface CategoryItem {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryId;
  type: TransactionType;
  amount: number;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "18:27"
  dateLabel: string; // e.g. "April 30"
  month: string; // e.g. "April"
  note?: string;
}

export interface TargetGoal {
  id: string;
  title: string;
  progress: number; // 0..100
  icon: string;
}

export interface UserProfile {
  name: string;
  userId: string;
  phone: string;
  email: string;
  pushNotifications: boolean;
  darkTheme: boolean;
}

export type MainTabParamList = {
  HomeTab: undefined;
  AnalysisTab: undefined;
  TransactionsTab: undefined;
  CategoriesTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Search: undefined;
  Calendar: undefined;
  CategoryDetail: { categoryId: CategoryId };
  AddExpense: { defaultCategory?: CategoryId } | undefined;
  EditProfile: undefined;
  Notifications: undefined;
  Security: undefined;
  Settings: undefined;
  OnlineSupport: undefined;
  QuickAnalysis: undefined;
  AccountBalance: undefined;
};
