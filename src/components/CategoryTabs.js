import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radii } from '../theme/tokens';

export default function CategoryTabs({ categories, selected, setSelected }) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    minHeight: 40,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.surface,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  activeTabText: {
    color: colors.text,
  },
});
