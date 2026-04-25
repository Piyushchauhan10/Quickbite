import { useContext } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';
import { recommendFood } from '../ai/recommender';
import { menuData } from '../data/menuData';
import { colors, radii } from '../theme/tokens';

const highlights = [
  { label: 'Avg delivery', value: '18 min' },
  { label: 'Live kitchens', value: '12' },
  { label: 'Satisfaction', value: '4.9/5' },
];

const opsCards = [
  { title: 'Conversion-ready storefront', text: 'Sharper hierarchy and stronger CTAs help the app feel launchable.' },
  { title: 'Operational transparency', text: 'ETA, menu metadata, and tracking details make the experience more trustworthy.' },
];

export default function HomeScreen({ navigation }) {
  const { itemCount } = useContext(CartContext);
  const featuredItems = menuData.slice(0, 3);

  const handleRecommendation = () => {
    Alert.alert('AI Recommendation', recommendFood(menuData));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.eyebrow}>QuickBite Cloud Kitchen</Text>
            <Text style={styles.logo}>QuickBite</Text>
          </View>
          <TouchableOpacity
            style={styles.cartPill}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.9}
          >
            <Text style={styles.cartPillLabel}>Cart</Text>
            <Text style={styles.cartPillValue}>{itemCount}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Premium delivery dashboard</Text>
          </View>
          <Text style={styles.heroTitle}>Food delivery that feels fast, curated, and reliable.</Text>
          <Text style={styles.heroText}>
            Browse chef-picked meals, track orders in real time, and order from a storefront that feels production-ready.
          </Text>

          <View style={styles.metricRow}>
            {highlights.map((item) => (
              <View key={item.label} style={styles.metricCard}>
                <Text style={styles.metricValue}>{item.value}</Text>
                <Text style={styles.metricLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
              style={[styles.primaryBtn, styles.actionButton]}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryBtnText}>Explore Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={[styles.secondaryBtn, styles.actionButton]}
              activeOpacity={0.9}
            >
              <Text style={styles.secondaryBtnText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionCopy}>
            <Text style={styles.sectionTitle}>Featured today</Text>
            <Text style={styles.sectionSubtitle}>A curated rail that makes the app feel merchandised, not random.</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} activeOpacity={0.8}>
            <Text style={styles.linkText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRail}>
          {featuredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.featuredCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Menu')}
            >
              <View style={styles.featuredImageWrap}>
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
              </View>
              <Text style={styles.featuredName}>{item.name}</Text>
              <Text style={styles.featuredMeta}>{item.prepTime} - {item.calories}</Text>
              <View style={styles.featuredFooter}>
                <Text style={styles.featuredPrice}>Rs. {item.price}</Text>
                <Text style={styles.featuredTag}>{item.tag}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Why it feels real</Text>
          <Text style={styles.sectionSubtitle}>Clean hierarchy, live metrics, and premium meal curation.</Text>
        </View>

        <View style={styles.featureGrid}>
          {opsCards.map((item) => (
            <View key={item.title} style={styles.featureCard}>
              <Text style={styles.featureLabel}>Product signal</Text>
              <Text style={styles.featureValue}>{item.title}</Text>
              <Text style={styles.featureText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.aiCard} onPress={handleRecommendation} activeOpacity={0.9}>
          <Text style={styles.aiEyebrow}>Smart suggestion</Text>
          <Text style={styles.aiTitle}>Let the assistant pick your next order</Text>
          <Text style={styles.aiText}>Tap once for a curated recommendation based on the current menu.</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  headerTextWrap: {
    flex: 1,
    minWidth: 180,
    marginRight: 12,
  },
  eyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.textMuted,
    marginBottom: 6,
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  cartPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
  },
  cartPillLabel: {
    color: colors.textMuted,
    fontWeight: '600',
    marginRight: 10,
  },
  cartPillValue: {
    backgroundColor: colors.primary,
    color: colors.surface,
    minWidth: 28,
    textAlign: 'center',
    paddingVertical: 4,
    borderRadius: radii.pill,
    overflow: 'hidden',
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: 24,
    marginBottom: 28,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
    marginBottom: 18,
  },
  heroBadgeText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 12,
  },
  heroText: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 24,
  },
  metricCard: {
    width: '50%',
    minWidth: 130,
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  metricValue: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  metricLabel: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  actionButton: {
    marginHorizontal: 6,
    marginBottom: 12,
    minWidth: 150,
  },
  primaryBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: radii.pill,
  },
  primaryBtnText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: radii.pill,
  },
  secondaryBtnText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sectionCopy: {
    flex: 1,
    minWidth: 220,
    marginRight: 12,
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  sectionSubtitle: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  linkText: {
    color: colors.accent,
    fontWeight: '700',
    marginTop: 8,
  },
  featuredRail: {
    paddingRight: 10,
    paddingBottom: 10,
  },
  featuredCard: {
    width: 220,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginRight: 14,
  },
  featuredImageWrap: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  featuredImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  featuredName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },
  featuredMeta: {
    color: colors.textMuted,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  featuredPrice: {
    color: colors.text,
    fontWeight: '800',
    marginRight: 8,
  },
  featuredTag: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  featureGrid: {
    marginBottom: 18,
  },
  featureCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  featureLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  featureValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  featureText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  aiCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  aiEyebrow: {
    color: colors.accent,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 10,
  },
  aiTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 8,
  },
  aiText: {
    color: '#9A3412',
    lineHeight: 22,
  },
});
