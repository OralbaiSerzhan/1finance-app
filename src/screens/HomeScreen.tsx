import { FlatList } from 'react-native';
import { transactions } from '../data/mockData';
import TransactionItem from '../components/TransactionItem';
import { colors, spacing } from '../constants/theme';

export default function TransactionsScreen() {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => <TransactionItem item={item} />}
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing.lg, paddingTop: 60 }}
    />
  );
}