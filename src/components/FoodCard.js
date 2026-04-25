import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radii } from '../theme/tokens';

export default function FoodCard({ item, onAdd }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>Rs. {item.price}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>Rating {item.rating}</Text>
          </View>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>{item.prepTime}</Text>
          </View>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>{item.calories}</Text>
          </View>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>{item.category}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerLabel}>Kitchen status</Text>
            <Text style={styles.footerValue}>Available now</Text>
          </View>
          <TouchableOpacity onPress={() => onAdd(item)} style={styles.button} activeOpacity={0.9}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  imageWrap: {
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: radii.md,
    resizeMode: 'contain',
    backgroundColor: '#F8FAFC',
  },
  tagPill: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    padding: 18,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    minWidth: 170,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginRight: 12,
    marginBottom: 4,
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.accent,
    marginTop: 1,
  },
  description: {
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginBottom: 12,
  },
  metaPill: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  metaText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerInfo: {
    flex: 1,
    minWidth: 120,
    marginRight: 12,
    marginBottom: 10,
  },
  footerLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  footerValue: {
    color: colors.text,
    fontWeight: '700',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    minWidth: 128,
  },
  buttonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
  },
});
