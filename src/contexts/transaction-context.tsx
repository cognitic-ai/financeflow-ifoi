import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  getBalance: () => number;
  getIncome: () => number;
  getExpenses: () => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 3500,
    category: 'Salary',
    description: 'Monthly salary',
    date: new Date(2026, 0, 1),
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    description: 'Monthly rent payment',
    date: new Date(2026, 0, 5),
  },
  {
    id: '3',
    type: 'expense',
    amount: 85.50,
    category: 'Groceries',
    description: 'Weekly groceries',
    date: new Date(2026, 0, 8),
  },
  {
    id: '4',
    type: 'expense',
    amount: 45,
    category: 'Entertainment',
    description: 'Movie tickets',
    date: new Date(2026, 0, 10),
  },
  {
    id: '5',
    type: 'income',
    amount: 500,
    category: 'Freelance',
    description: 'Website design project',
    date: new Date(2026, 0, 12),
  },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const getIncome = () => {
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getExpenses = () => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getBalance = () => {
    return getIncome() - getExpenses();
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        getBalance,
        getIncome,
        getExpenses,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
