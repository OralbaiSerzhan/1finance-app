import React, { createContext, useContext, useMemo, useState } from 'react';
import { INITIAL_TRANSACTIONS, INITIAL_USER } from '../data/mockData';
import { CategoryId, Transaction, UserProfile } from '../types';

interface NewExpenseInput {
  title: string;
  category: CategoryId;
  amount: number;
  dateLabel: string;
  date: string;
  month: string;
  note?: string;
}

interface AppContextValue {
  transactions: Transaction[];
  user: UserProfile;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  addExpense: (input: NewExpenseInput) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    // Keep baseline $7,783.00 aligned with mockups + any new additions
    const baseBalance = 7783.0;
    const initialIncome = INITIAL_TRANSACTIONS.filter((t) => t.type === 'income').reduce(
      (a, b) => a + b.amount,
      0
    );
    const initialExpense = INITIAL_TRANSACTIONS.filter((t) => t.type === 'expense').reduce(
      (a, b) => a + b.amount,
      0
    );
    const delta = income - initialIncome - (expense - initialExpense);
    return {
      totalIncome: income,
      totalExpense: expense,
      totalBalance: baseBalance + delta,
    };
  }, [transactions]);

  const addExpense = (input: NewExpenseInput) => {
    const newItem: Transaction = {
      id: `t-${Date.now()}`,
      title: input.title.trim() || 'Expense',
      subtitle: input.category.charAt(0).toUpperCase() + input.category.slice(1),
      category: input.category,
      type: 'expense',
      amount: input.amount,
      date: input.date,
      time: '12:00',
      dateLabel: input.dateLabel,
      month: input.month,
      note: input.note,
    };
    setTransactions((prev) => [newItem, ...prev]);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        user,
        totalBalance,
        totalIncome,
        totalExpense,
        addExpense,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
