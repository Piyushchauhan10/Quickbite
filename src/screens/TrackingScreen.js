import { useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';
import { colors, radii } from '../theme/tokens';

const steps = [
  { label: 'Order placed', detail: 'Order logged successfully and cash will be collected on delivery.' },
  { label: 'Preparing meal', detail: 'Chefs are assembling your items right now.' },
  { label: 'Out for delivery', detail: 'Rider has picked up the order and is en route.' },
  { label: 'Delivered', detail: 'Order completed successfully.' },
];

export default function TrackingScreen({ navigation }) {
  const { orderDetails } = useContext(CartContext);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep >= steps.length - 1) {
          clearInterval(interval);
          return prevStep;
        }

        return prevStep + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const progress = useMemo(() => `${step + 1}/${steps.length}`, [step]);
  const currentStep = steps[step];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Live fulfillment</Text>
          <Text style={styles.title}>Track the order like a real delivery timeline.</Text>
          <Text style={styles.subtitle}>Status updates move automatically every two seconds so the flow feels alive.</Text>
        </View>

        <View style={styles.statusHero}>
          <View style={styles.statusCopy}>
            <Text style={styles.statusHeroLabel}>Current stage</Text>
            <Text style={styles.statusHeroTitle}>{currentStep.label}</Text>
            <Text style={styles.statusHeroText}>{currentStep.detail}</Text>
          </View>
          <View style={styles.progressBadge}>
            <Text style={styles.progressValue}>{progress}</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
        </View>

        <View style={styles.metaStrip}>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Address</Text>
            <Text style={styles.metaValue}>{orderDetails.address}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Payment</Text>
            <Text style={styles.metaValue}>Cash on delivery</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Contact</Text>
            <Text style={styles.metaValue}>{orderDetails.phone}</Text>
          </View>
        </View>

        <View style={styles.timeline}>
          {steps.map((item, index) => {
            const isComplete = index <= step;
            const isCurrent = index === step;

            return (
              <View key={item.label} style={styles.stepRow}>
                <View style={styles.markerColumn}>
                  <View style={[styles.marker, isComplete && styles.markerActive]} />
                  {index < steps.length - 1 ? <View style={[styles.line, isComplete && styles.lineActive]} /> : null}
                </View>

                <View style={[styles.stepCard, isCurrent && styles.stepCardCurrent]}>
                  <Text style={[styles.stepLabel, isComplete && styles.stepLabelActive]}>{item.label}</Text>
                  <Text style={styles.stepText}>{item.detail}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')} activeOpacity={0.9}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 18,
  },
  eyebrow: {
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  statusHero: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: 20,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statusCopy: {
    flex: 1,
    minWidth: 180,
    marginRight: 12,
    marginBottom: 12,
  },
  statusHeroLabel: {
    color: '#FDBA74',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusHeroTitle: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  statusHeroText: {
    color: '#CBD5E1',
    lineHeight: 21,
  },
  progressBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radii.md,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
    minWidth: 96,
    marginBottom: 4,
  },
  progressValue: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  progressLabel: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  metaStrip: {
    marginBottom: 16,
  },
  metaCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  metaValue: {
    color: colors.text,
    fontWeight: '700',
    lineHeight: 20,
  },
  timeline: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
  },
  markerColumn: {
    alignItems: 'center',
    marginRight: 14,
  },
  marker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#CBD5E1',
    marginTop: 6,
  },
  markerActive: {
    backgroundColor: colors.success,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 56,
    backgroundColor: '#E2E8F0',
    marginTop: 6,
  },
  lineActive: {
    backgroundColor: colors.success,
  },
  stepCard: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: 16,
    marginBottom: 14,
  },
  stepCardCurrent: {
    borderWidth: 1,
    borderColor: '#BBF7D0',
    backgroundColor: '#F0FDF4',
  },
  stepLabel: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  stepLabelActive: {
    color: colors.text,
  },
  stepText: {
    color: colors.textMuted,
    lineHeight: 21,
  },
  homeBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  homeBtnText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
});
