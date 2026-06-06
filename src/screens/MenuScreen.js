import { useContext, useMemo, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';
import { menuData } from '../data/menuData';
import FoodCard from '../components/FoodCard';
import CategoryTabs from '../components/CategoryTabs';
import { colors, radii } from '../theme/tokens';

export default function MenuScreen({ navigation }) {
  const { addToCart, itemCount, getTotal } = useContext(CartContext);
  const [selected, setSelected] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => ['All', ...new Set(menuData.map((item) => item.category))], []);

  const handleSearch = () => {
    setQuery(searchText.trim());
  };

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
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <View style={styles.leftSide}>
          <TouchableOpacity
            onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home'))}
            style={styles.backButton}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backIcon}>{'<'}</Text>
          </TouchableOpacity>

          <View style={styles.titleWrap}>
            <Text style={styles.eyebrow}>Chef-picked dishes</Text>
            <Text style={styles.headerTitle}>Curated Menu</Text>
          </View>
        </View>

        <View style={styles.searchInlineWrap}>
          <View style={styles.searchField}>
            <Text style={styles.searchIcon}>{'\u{1F50D}'}</Text>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search pizza, pasta, desserts..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel="Search dishes"
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
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
    paddingTop: 6,
  },
  topBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingTop: 2,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    minWidth: 210,
    marginRight: 12,
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  backIcon: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: -1,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
  },
  searchInlineWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexBasis: 240,
    minWidth: 220,
    marginBottom: 10,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    marginRight: 10,
    minHeight: 44,
    outlineStyle: 'none',
  },
  searchIcon: {
    color: colors.textMuted,
    fontSize: 18,
    marginRight: 8,
    marginTop: -1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 15,
    outlineStyle: 'none',
    borderWidth: 0,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  searchButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
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
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 1,
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
