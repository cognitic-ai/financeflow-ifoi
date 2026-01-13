import { useTransactions } from '@/contexts/transaction-context';
import * as AC from '@bacons/apple-colors';
import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';

export default function HomeScreen() {
  const { transactions, getBalance, getIncome, getExpenses } = useTransactions();

  const balance = getBalance();
  const income = getIncome();
  const expenses = getExpenses();

  const recentTransactions = transactions.slice(0, 5);

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
    }).format(date);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: AC.systemBackground as any }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={{ padding: 20, gap: 24 }}>
        <View
          style={{
            backgroundColor: AC.systemBlue as any,
            borderRadius: 20,
            borderCurve: 'continuous',
            padding: 24,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500',
            }}
          >
            Total Balance
          </Text>
          <Text
            style={{
              fontSize: 42,
              fontWeight: '700',
              color: 'white',
            }}
          >
            {formatCurrency(balance)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: AC.secondarySystemBackground as any,
              borderRadius: 16,
              borderCurve: 'continuous',
              padding: 16,
              gap: 8,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(52, 199, 89, 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 18 }}>↓</Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: AC.secondaryLabel as any,
              }}
            >
              Income
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: AC.label as any,
              }}
            >
              {formatCurrency(income)}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: AC.secondarySystemBackground as any,
              borderRadius: 16,
              borderCurve: 'continuous',
              padding: 16,
              gap: 8,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(255, 59, 48, 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 18 }}>↑</Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: AC.secondaryLabel as any,
              }}
            >
              Expenses
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: AC.label as any,
              }}
            >
              {formatCurrency(expenses)}
            </Text>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: AC.label as any,
              }}
            >
              Recent Transactions
            </Text>
          </View>

          <View
            style={{
              backgroundColor: AC.secondarySystemBackground as any,
              borderRadius: 16,
              borderCurve: 'continuous',
              overflow: 'hidden',
            }}
          >
            {recentTransactions.map((transaction, index) => (
              <View key={transaction.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center',
                    gap: 12,
                  }}
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
                      {transaction.category} • {formatDate(transaction.date)}
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
                </View>
                {index < recentTransactions.length - 1 && (
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

        <Pressable
          onPress={() => router.push('/(index)/add-transaction')}
          style={({ pressed }) => ({
            backgroundColor: AC.systemBlue as any,
            borderRadius: 14,
            borderCurve: 'continuous',
            padding: 16,
            alignItems: 'center',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: '600',
              color: 'white',
            }}
          >
            Add Transaction
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
