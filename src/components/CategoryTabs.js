import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, radii } from '../theme/tokens';

export default function CategoryTabs({ categories, selected, setSelected }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isActive = selected === cat;

        return (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelected(cat)}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.9}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 14,
    paddingRight: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.surface,
  },
});
