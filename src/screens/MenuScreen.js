import { useContext, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';
import { menuData } from '../data/menuData';
import FoodCard from '../components/FoodCard';
import CategoryTabs from '../components/CategoryTabs';
import { colors, radii } from '../theme/tokens';

export default function MenuScreen({ navigation }) {
  const { addToCart, itemCount, getTotal } = useContext(CartContext);
  const [selected, setSelected] = useState('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => ['All', ...new Set(menuData.map((item) => item.category))], []);

  const filtered = useMemo(() => {
    const categoryFiltered =
      selected === 'All'
        ? menuData
        : menuData.filter((item) => item.category === selected);

    if (!query.trim()) {
      return categoryFiltered;
    }

    return categoryFiltered.filter((item) => {
      const searchable = `${item.name} ${item.description} ${item.category} ${item.tag}`.toLowerCase();
      return searchable.includes(query.trim().toLowerCase());
    });
  }, [query, selected]);

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>Curated for fast-moving teams</Text>
        <Text style={styles.subtitle}>High-conviction dishes with stronger discovery, filtering, and merchandising.</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchLabel}>Search dishes</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search pizza, pasta, desserts..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.analyticsRow}>
        <View style={styles.analyticsCardWrap}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsValue}>{filtered.length}</Text>
            <Text style={styles.analyticsLabel}>Matches</Text>
          </View>
        </View>
        <View style={styles.analyticsCardWrap}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsValue}>4.8</Text>
            <Text style={styles.analyticsLabel}>Top rating</Text>
          </View>
        </View>
        <View style={styles.analyticsCardWrap}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsValue}>12m</Text>
            <Text style={styles.analyticsLabel}>Fastest prep</Text>
          </View>
        </View>
      </View>

      <CategoryTabs categories={categories} selected={selected} setSelected={setSelected} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodCard item={item} onAdd={addToCart} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, itemCount > 0 && styles.listContentWithBar]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No dishes found</Text>
            <Text style={styles.emptyText}>Try another search term or switch the category filter.</Text>
          </View>
        }
      />

      {itemCount > 0 ? (
        <View style={styles.stickyBarWrap} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.stickyBar}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.92}
          >
            <View style={styles.stickyCopy}>
              <Text style={styles.stickyLabel}>Ready to checkout</Text>
              <Text style={styles.stickyMeta}>{itemCount} items in cart</Text>
            </View>
            <View style={styles.stickyPriceWrap}>
              <Text style={styles.stickyPrice}>Rs. {getTotal()}</Text>
              <Text style={styles.stickyAction}>Open Cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerBlock: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  searchBox: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
  },
  searchLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 15,
  },
  analyticsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginBottom: 14,
  },
  analyticsCardWrap: {
    width: '33.33%',
    minWidth: 100,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  analyticsCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  analyticsValue: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 19,
    marginBottom: 4,
  },
  analyticsLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  listContentWithBar: {
    paddingBottom: 120,
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginTop: 10,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  stickyBarWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  stickyBar: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  stickyCopy: {
    flex: 1,
    minWidth: 150,
    marginRight: 12,
    marginBottom: 8,
  },
  stickyLabel: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 4,
  },
  stickyMeta: {
    color: '#CBD5E1',
  },
  stickyPriceWrap: {
    alignItems: 'flex-end',
    minWidth: 96,
    marginTop: 4,
  },
  stickyPrice: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 4,
  },
  stickyAction: {
    color: '#FDBA74',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
