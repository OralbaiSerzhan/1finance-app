import { Period, Transaction } from '../types';

export const transactions: Transaction[] = [
  { id: '1', title: 'Salary', category: 'Income', amount: 4000, type: 'income', date: 'Apr 18' },
  { id: '2', title: 'Groceries', category: 'Food', amount: 105, type: 'expense', date: 'Apr 24' },
  { id: '3', title: 'Rent', category: 'Housing', amount: 574.4, type: 'expense', date: 'Apr 16' },
  { id: '4', title: 'Internet', category: 'Bills', amount: 45, type: 'expense', date: 'Apr 20' },
  { id: '5', title: 'Freelance', category: 'Income', amount: 800, type: 'income', date: 'Apr 22' },
];

export const chartData: Record<Period, number[]> = {
  Daily: [20, 45, 30, 60, 25, 80, 50],
  Weekly: [300, 450, 280, 500],
  Monthly: [1200, 980, 1450, 1100, 1300, 1187],
};