import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';
import { colors, radii } from '../theme/tokens';

const summaryCards = [
  { value: '17-22 min', label: 'Estimated arrival' },
  { value: 'Kitchen 03', label: 'Prep station' },
  { value: 'COD', label: 'Payment method' },
];

export default function OrderSuccessScreen({ navigation }) {
  const { orderDetails } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroGlow} />
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>OK</Text>
          </View>
          <Text style={styles.label}>Order confirmed</Text>
          <Text style={styles.title}>Your kitchen has started preparing the order.</Text>
          <Text style={styles.text}>The purchase flow now lands on a more trustworthy confirmation surface with dispatch context and next actions.</Text>

          <View style={styles.metricsRow}>
            {summaryCards.map((item) => (
              <View key={item.label} style={styles.metricCard}>
                <Text style={styles.metricValue}>{item.value}</Text>
                <Text style={styles.metricLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>What happens next</Text>
            <Text style={styles.noticeText}>The kitchen confirms prep, a rider gets assigned, and payment will be collected at your doorstep.</Text>
          </View>

          <View style={styles.deliveryCard}>
            <Text style={styles.deliveryTitle}>Delivery details</Text>
            <Text style={styles.deliveryText}>{orderDetails.name} - {orderDetails.address}</Text>
            <Text style={styles.deliverySubtext}>{orderDetails.phone}</Text>
            <Text style={styles.deliverySubtext}>{orderDetails.instructions}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Tracking')} activeOpacity={0.9}>
            <Text style={styles.primaryBtnText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Home')} activeOpacity={0.9}>
            <Text style={styles.secondaryBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  heroGlow: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    height: 180,
    backgroundColor: '#E0F2FE',
    borderRadius: 999,
    opacity: 0.8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  iconWrap: {
    width: 82,
    height: 82,
    borderRadius: 26,
    backgroundColor: colors.successSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  icon: {
    color: colors.success,
    fontSize: 26,
    fontWeight: '800',
  },
  label: {
    color: colors.success,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 27,
    textAlign: 'center',
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 10,
  },
  text: {
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 22,
  },
  metricsRow: {
    width: '100%',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  metricValue: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 4,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  noticeCard: {
    width: '100%',
    backgroundColor: '#EFF6FF',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 16,
    marginBottom: 14,
  },
  noticeTitle: {
    color: '#1D4ED8',
    fontWeight: '800',
    marginBottom: 6,
  },
  noticeText: {
    color: '#1E3A8A',
    lineHeight: 21,
  },
  deliveryCard: {
    width: '100%',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 22,
  },
  deliveryTitle: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 6,
  },
  deliveryText: {
    color: colors.text,
    fontWeight: '600',
    lineHeight: 21,
    marginBottom: 6,
  },
  deliverySubtext: {
    color: colors.textMuted,
    lineHeight: 21,
    marginTop: 2,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryBtn: {
    width: '100%',
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
});
