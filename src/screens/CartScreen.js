import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';
import { colors, radii } from '../theme/tokens';

const paymentOptions = [
  { id: 'cod', label: 'Cash on delivery', detail: 'Pay in cash when the rider arrives.', active: true },
  { id: 'upi', label: 'UPI', detail: 'Currently unavailable for this order.', active: false },
];

export default function CartScreen({ navigation }) {
  const {
    cart,
    getTotal,
    itemCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    orderDetails,
    updateOrderDetails,
  } = useContext(CartContext);
  const deliveryFee = itemCount > 0 ? 40 : 0;
  const taxes = itemCount > 0 ? Math.round(getTotal() * 0.05) : 0;
  const grandTotal = getTotal() + deliveryFee + taxes;
  const eta = itemCount > 0 ? '17-22 min' : '--';

  const handlePlaceOrder = () => {
    navigation.navigate('Success');
    clearCart();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryHero}>
          <Text style={styles.heroLabel}>Checkout workspace</Text>
          <Text style={styles.heroTitle}>Review your order before dispatch.</Text>
          <Text style={styles.heroText}>Transparent pricing, ETA, and payment details make the cart feel production-ready.</Text>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCardWrap}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{itemCount}</Text>
              <Text style={styles.kpiLabel}>Units</Text>
            </View>
          </View>
          <View style={styles.kpiCardWrap}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{eta}</Text>
              <Text style={styles.kpiLabel}>ETA</Text>
            </View>
          </View>
          <View style={styles.kpiCardWrap}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>COD</Text>
              <Text style={styles.kpiLabel}>Payment</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Items in cart</Text>
            <Text style={styles.panelCount}>{cart.length} dishes</Text>
          </View>

          {cart.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptyText}>Add a few dishes from the menu and come back here to place the order.</Text>
            </View>
          ) : (
            cart.map((item) => (
              <View key={item.id} style={styles.cartRow}>
                <View style={styles.cartTopRow}>
                  <View style={styles.cartIdentity}>
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{item.name.slice(0, 1)}</Text>
                    </View>
                    <View style={styles.cartDetails}>
                      <Text style={styles.cartName}>{item.name}</Text>
                      <Text style={styles.cartMeta}>{item.category} - {item.prepTime}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)} activeOpacity={0.8}>
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cartBottomRow}>
                  <View style={styles.qtyControl}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.qty - 1)}
                      style={styles.qtyButton}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.qty}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.qty + 1)}
                      style={styles.qtyButton}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.priceBlock}>
                    <Text style={styles.linePrice}>Rs. {item.price * item.qty}</Text>
                    <Text style={styles.unitPrice}>Rs. {item.price} each</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Delivery details</Text>
          <Text style={styles.panelSubtext}>Update these details before placing the order.</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Full name</Text>
            <TextInput
              value={orderDetails.name}
              onChangeText={(value) => updateOrderDetails('name', value)}
              style={styles.fieldInput}
              placeholder="Enter full name"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Phone number</Text>
            <TextInput
              value={orderDetails.phone}
              onChangeText={(value) => updateOrderDetails('phone', value)}
              style={styles.fieldInput}
              placeholder="Enter phone number"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Delivery address</Text>
            <TextInput
              value={orderDetails.address}
              onChangeText={(value) => updateOrderDetails('address', value)}
              style={[styles.fieldInput, styles.fieldTextarea]}
              placeholder="Enter delivery address"
              placeholderTextColor="#94A3B8"
              multiline
            />
          </View>

          <View style={styles.fieldGroupLast}>
            <Text style={styles.fieldLabel}>Instructions</Text>
            <TextInput
              value={orderDetails.instructions}
              onChangeText={(value) => updateOrderDetails('instructions', value)}
              style={[styles.fieldInput, styles.fieldTextarea]}
              placeholder="Add delivery instructions"
              placeholderTextColor="#94A3B8"
              multiline
            />
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Payment method</Text>
          <Text style={styles.panelSubtext}>Choose how the order will be settled when it arrives.</Text>

          {paymentOptions.map((option) => (
            <View
              key={option.id}
              style={[styles.paymentOption, option.active && styles.paymentOptionActive]}
            >
              <View style={[styles.paymentDot, option.active && styles.paymentDotActive]} />
              <View style={styles.paymentCopy}>
                <Text style={[styles.paymentTitle, option.active && styles.paymentTitleActive]}>{option.label}</Text>
                <Text style={[styles.paymentText, option.active && styles.paymentTextActive]}>{option.detail}</Text>
              </View>
              <Text style={[styles.paymentStatus, option.active ? styles.paymentStatusActive : styles.paymentStatusMuted]}>
                {option.active ? 'Selected' : 'Unavailable'}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Delivery and billing</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Dispatching from Kitchen 03</Text>
            <Text style={styles.infoText}>Rider assignment begins as soon as the kitchen completes preparation.</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>Rs. {getTotal()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery fee</Text>
            <Text style={styles.totalValue}>Rs. {deliveryFee}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Taxes</Text>
            <Text style={styles.totalValue}>Rs. {taxes}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Payment method</Text>
            <Text style={styles.totalValue}>Cash on delivery</Text>
          </View>
          <View style={[styles.totalRow, styles.grandRow]}>
            <Text style={styles.grandLabel}>Grand total</Text>
            <Text style={styles.grandValue}>Rs. {grandTotal}</Text>
          </View>

          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={[styles.checkoutBtn, cart.length === 0 && styles.checkoutBtnDisabled]}
            disabled={cart.length === 0}
            activeOpacity={0.9}
          >
            <Text style={styles.checkoutBtnText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  summaryHero: {
    marginBottom: 18,
  },
  heroLabel: {
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginBottom: 16,
  },
  kpiCardWrap: {
    width: '33.33%',
    minWidth: 100,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  kpiCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  kpiValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  kpiLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  panelTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
    marginRight: 10,
  },
  panelSubtext: {
    color: colors.textMuted,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 14,
  },
  panelCount: {
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  emptyState: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: 18,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  cartRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceMuted,
  },
  cartTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  cartIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 220,
    marginRight: 12,
    marginBottom: 8,
  },
  cartBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cartBadgeText: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 16,
  },
  cartDetails: {
    flex: 1,
  },
  cartName: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  cartMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  removeText: {
    color: '#DC2626',
    fontWeight: '700',
    marginTop: 2,
  },
  cartBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    padding: 4,
    marginRight: 12,
    marginBottom: 8,
  },
  qtyButton: {
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  qtyValue: {
    minWidth: 32,
    textAlign: 'center',
    color: colors.text,
    fontWeight: '700',
  },
  priceBlock: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  linePrice: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 4,
  },
  unitPrice: {
    color: colors.textMuted,
    fontSize: 12,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldGroupLast: {
    marginBottom: 2,
  },
  fieldLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  fieldInput: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  fieldTextarea: {
    minHeight: 84,
    textAlignVertical: 'top',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    backgroundColor: colors.surfaceMuted,
  },
  paymentOptionActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
  },
  paymentDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
  },
  paymentDotActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  paymentCopy: {
    flex: 1,
    marginRight: 10,
  },
  paymentTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  paymentTitleActive: {
    color: '#9A3412',
  },
  paymentText: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  paymentTextActive: {
    color: '#9A3412',
  },
  paymentStatus: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  paymentStatusActive: {
    color: colors.accent,
  },
  paymentStatusMuted: {
    color: colors.textMuted,
  },
  infoCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: 14,
    marginTop: 14,
  },
  infoTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 6,
  },
  infoText: {
    color: colors.textMuted,
    lineHeight: 21,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  totalLabel: {
    color: colors.textMuted,
    marginRight: 12,
    marginBottom: 4,
  },
  totalValue: {
    color: colors.text,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    marginBottom: 4,
  },
  grandRow: {
    paddingTop: 14,
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  grandLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  grandValue: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '800',
  },
  checkoutBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radii.md,
    alignItems: 'center',
    marginTop: 22,
  },
  checkoutBtnDisabled: {
    opacity: 0.5,
  },
  checkoutBtnText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
  },
});
