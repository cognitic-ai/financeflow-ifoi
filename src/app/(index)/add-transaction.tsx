import { useTransactions, TransactionType } from '@/contexts/transaction-context';
import * as AC from '@bacons/apple-colors';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Rent', 'Groceries', 'Entertainment', 'Transport', 'Bills', 'Shopping', 'Other'],
};

export default function AddTransactionScreen() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!amount || !category || !description) {
      return;
    }

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(),
    });

    router.back();
  };

  const categories = CATEGORIES[type];

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: AC.systemBackground as any }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ padding: 20, gap: 24 }}>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: AC.label as any,
                marginBottom: 4,
              }}
            >
              Type
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                onPress={() => {
                  setType('expense');
                  setCategory('');
                }}
                style={{
                  flex: 1,
                  backgroundColor:
                    type === 'expense'
                      ? (AC.systemRed as any)
                      : (AC.secondarySystemBackground as any),
                  borderRadius: 12,
                  borderCurve: 'continuous',
                  padding: 16,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: type === 'expense' ? 'white' : (AC.label as any),
                  }}
                >
                  Expense
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setType('income');
                  setCategory('');
                }}
                style={{
                  flex: 1,
                  backgroundColor:
                    type === 'income'
                      ? (AC.systemGreen as any)
                      : (AC.secondarySystemBackground as any),
                  borderRadius: 12,
                  borderCurve: 'continuous',
                  padding: 16,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: type === 'income' ? 'white' : (AC.label as any),
                  }}
                >
                  Income
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: AC.label as any,
                marginBottom: 4,
              }}
            >
              Amount
            </Text>
            <View
              style={{
                backgroundColor: AC.secondarySystemBackground as any,
                borderRadius: 12,
                borderCurve: 'continuous',
                padding: 16,
              }}
            >
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                style={{
                  fontSize: 17,
                  color: AC.label as any,
                }}
                placeholderTextColor={AC.tertiaryLabel as any}
              />
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: AC.label as any,
                marginBottom: 4,
              }}
            >
              Category
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={{
                    backgroundColor:
                      category === cat
                        ? (AC.systemBlue as any)
                        : (AC.secondarySystemBackground as any),
                    borderRadius: 20,
                    borderCurve: 'continuous',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: category === cat ? 'white' : (AC.label as any),
                    }}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: AC.label as any,
                marginBottom: 4,
              }}
            >
              Description
            </Text>
            <View
              style={{
                backgroundColor: AC.secondarySystemBackground as any,
                borderRadius: 12,
                borderCurve: 'continuous',
                padding: 16,
              }}
            >
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                style={{
                  fontSize: 17,
                  color: AC.label as any,
                  minHeight: 80,
                }}
                multiline
                placeholderTextColor={AC.tertiaryLabel as any}
              />
            </View>
          </View>

          <View style={{ gap: 12, marginTop: 8 }}>
            <Pressable
              onPress={handleSubmit}
              disabled={!amount || !category || !description}
              style={({ pressed }) => ({
                backgroundColor:
                  !amount || !category || !description
                    ? (AC.tertiarySystemFill as any)
                    : (AC.systemBlue as any),
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
                  color:
                    !amount || !category || !description
                      ? (AC.tertiaryLabel as any)
                      : 'white',
                }}
              >
                Add Transaction
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                backgroundColor: AC.secondarySystemBackground as any,
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
                  color: AC.label as any,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
