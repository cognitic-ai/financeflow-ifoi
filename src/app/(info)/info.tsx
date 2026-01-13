import { useTransactions } from '@/contexts/transaction-context';
import * as AC from '@bacons/apple-colors';
import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

export default function TransactionsScreen() {
  const { transactions, deleteTransaction } = useTransactions();
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions =
    filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: AC.systemBackground as any }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={{ padding: 20, gap: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: AC.secondarySystemBackground as any,
            borderRadius: 12,
            borderCurve: 'continuous',
            padding: 4,
          }}
        >
          <Pressable
            onPress={() => setFilter('all')}
            style={{
              flex: 1,
              backgroundColor: filter === 'all' ? (AC.systemFill as any) : 'transparent',
              borderRadius: 8,
              borderCurve: 'continuous',
              paddingVertical: 8,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: filter === 'all' ? '600' : '500',
                color: AC.label as any,
              }}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter('income')}
            style={{
              flex: 1,
              backgroundColor: filter === 'income' ? (AC.systemFill as any) : 'transparent',
              borderRadius: 8,
              borderCurve: 'continuous',
              paddingVertical: 8,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: filter === 'income' ? '600' : '500',
                color: AC.label as any,
              }}
            >
              Income
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter('expense')}
            style={{
              flex: 1,
              backgroundColor: filter === 'expense' ? (AC.systemFill as any) : 'transparent',
              borderRadius: 8,
              borderCurve: 'continuous',
              paddingVertical: 8,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: filter === 'expense' ? '600' : '500',
                color: AC.label as any,
              }}
            >
              Expenses
            </Text>
          </Pressable>
        </View>

        {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
          <View key={date} style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: AC.secondaryLabel as any,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {formatDate(new Date(date))}
            </Text>
            <View
              style={{
                backgroundColor: AC.secondarySystemBackground as any,
                borderRadius: 16,
                borderCurve: 'continuous',
                overflow: 'hidden',
              }}
            >
              {dayTransactions.map((transaction, index) => (
                <View key={transaction.id}>
                  <Pressable
                    onLongPress={() => {
                      deleteTransaction(transaction.id);
                    }}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      padding: 16,
                      alignItems: 'center',
                      gap: 12,
                      backgroundColor: pressed
                        ? (AC.tertiarySystemBackground as any)
                        : 'transparent',
                    })}
                  >
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor:
                          transaction.type === 'income'
                            ? 'rgba(52, 199, 89, 0.15)'
                            : 'rgba(255, 59, 48, 0.15)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {transaction.type === 'income' ? '↓' : '↑'}
                      </Text>
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          color: AC.label as any,
                        }}
                      >
                        {transaction.description}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: AC.secondaryLabel as any,
                        }}
                      >
                        {transaction.category}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '600',
                        color:
                          transaction.type === 'income'
                            ? (AC.systemGreen as any)
                            : (AC.systemRed as any),
                      }}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </Text>
                  </Pressable>
                  {index < dayTransactions.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: AC.separator as any,
                        marginLeft: 72,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {filteredTransactions.length === 0 && (
          <View
            style={{
              padding: 40,
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 42,
              }}
            >
              💰
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: AC.secondaryLabel as any,
                textAlign: 'center',
              }}
            >
              No transactions yet
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
