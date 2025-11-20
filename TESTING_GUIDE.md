# 🧪 Checkout Implementation - Testing Guide

## Quick Start Testing

### Prerequisites

```bash
# Make sure dependencies are installed
npm install

# Start dev server
npm run dev

# Open browser to http://localhost:3000
```

---

## Testing Scenarios

## ✅ Scenario 1: Empty Cart Checkout

**Steps:**

1. Open browser at `http://localhost:3000`
2. Click "Cart" icon or navigate to `/cart`
3. If cart is empty, click "Checkout"

**Expected Result:**

- ❌ Should NOT go to checkout
- ✅ Should show "Your cart is empty" message
- ✅ "Start shopping" button should be visible
- ✅ Suggested products should be shown

---

## ✅ Scenario 2: Successful Checkout Flow

### Part A: Add Item to Cart

**Steps:**

1. Navigate to `/products`
2. Add any product to cart
3. Click cart icon or navigate to `/cart`
4. Verify item appears in cart

**Expected Result:**

- ✅ Product shows in cart table
- ✅ Cart total shows correct price
- ✅ "Checkout" button is enabled

### Part B: Navigate to Checkout

**Steps:**

1. From cart page, click "Checkout" button
2. Verify page loads

**Expected Result:**

- ✅ URL changes to `/checkout`
- ✅ Page title shows "Checkout"
- ✅ Hero banner displays
- ✅ Two-column layout visible (form left, summary right)
- ✅ Order summary shows product from cart
- ✅ Order total is calculated correctly

### Part C: Fill Contact Details

**Steps:**

1. In "Contact Details" section (should be expanded)
2. Fill in all required fields:
   - First Name: "John"
   - Last Name: "Doe"
   - Email: "john@example.com"
   - Phone: "555-1234"
   - Country: Select from dropdown
3. Fill Billing Address:
   - Address: "123 Main St"
   - City: "New York"
   - State: "NY"
   - Zip: "10001"
   - Country: Select from dropdown
4. Verify checkboxes:
   - ✓ "Same as billing address"
   - ✓ "Save as billing address"
5. Click "Continue" button

**Expected Result:**

- ✅ All inputs accept typed values
- ✅ Checkboxes toggle correctly
- ✅ "Continue" button expands Delivery Details section
- ✅ Contact Details section collapses
- ✅ Shows email in collapsed state: "john@example.com"
- ✅ Checkmark (✓) appears next to Contact Details

### Part D: Fill Delivery Details

**Steps:**

1. In "Delivery Details" section (should now be expanded)
2. Fill Shipping Address:
   - Address: "456 Oak Ave"
   - City: "Boston"
   - State: "MA"
   - Zip: "02101"
   - Country: Select from dropdown
3. Select shipping method:
   - Try each option and verify price updates in summary:
     - ○ Standard ($0)
     - ● Express ($25) ← Select this
     - ○ Overnight ($50)
4. Verify Order Summary updates:
   - Shipping cost changes
   - Total updates accordingly
5. Click "Continue" button

**Expected Result:**

- ✅ Shipping address inputs work
- ✅ Shipping methods are selectable
- ✅ Order summary updates in real-time
- ✅ Total changes when shipping method changes
  - Subtotal: $XX.XX
  - Shipping: $25.00 (Express selected)
  - Tax: $XX.XX
  - Total: $XX.XX
- ✅ "Continue" button expands Review & Pay
- ✅ Delivery Details collapses with summary

### Part E: Select Payment & Place Order

**Steps:**

1. In "Review & Pay" section (should now be expanded)
2. Verify payment method options:
   - Should see pre-loaded cards (Visa, MasterCard)
   - Last 4 digits should be visible
   - Expiry date should be shown
3. Select a card (should have radio button)
4. Verify checkboxes:
   - ✓ "I agree to Terms and Conditions"
   - ✓ "Save this shipping address"
5. Test "Add a new card" button:
   - Click button
   - Modal should appear with form
   - Try adding card details (doesn't need to be real)
   - Click "Cancel" to close modal
6. Select original card again
7. Click "Place Order" button

**Expected Result:**

- ✅ Payment methods display correctly
- ✅ Card selection works (radio buttons)
- ✅ "Add a new card" modal appears
  - Form has fields: Card holder, Card number, Expiry, CVV
  - Cancel button closes modal
  - Card details form accepts input
- ✅ Checkboxes are pre-checked
- ✅ "Place Order" button is clickable
- ✅ Redirects to `/order-confirmation` after click
- ✅ Cart is cleared (bag icon shows 0)

### Part F: Verify Order Confirmation

**Steps:**

1. On confirmation page, verify display:
   - ✅ Green checkmark icon
   - ✅ "Thank You for Your Order!" message
   - ✅ Order details box showing:
     - Order Number: #ORDER-2024-001
     - Order Date: Current date
     - Estimated Delivery: 5-7 Business Days
   - ✅ Two buttons: "Continue Shopping" and "View My Orders"
2. Click "Continue Shopping" → Should go to home page
3. Navigate back to confirm order page is still there
4. Try clicking "View My Orders" → Should go to `/account/orders`

**Expected Result:**

- ✅ Confirmation page displays all elements
- ✅ Navigation buttons work
- ✅ Cart remains empty (count shows 0)

---

## ✅ Scenario 3: Form Validation

### Test Incomplete Form Submission

**Steps:**

1. Go back to `/checkout`
2. Try to place order without filling form:
   - Skip Contact Details
   - Click directly to Payment
   - Try "Place Order"

**Expected Result:**

- ✅ Alert shows: "Please fill in contact details"
- ✅ Order is not placed
- ✅ Not redirected to confirmation

**Steps:**

1. Fill Contact Details
2. Try to place order without filling Delivery Details
3. Try "Place Order"

**Expected Result:**

- ✅ Alert shows: "Please fill in delivery details"
- ✅ Order is not placed

---

## ✅ Scenario 4: Responsive Design Testing

### Mobile (320px - 480px)

**Steps:**

1. Open developer tools (F12)
2. Toggle device toolbar
3. Select "iPhone SE" or similar

**Expected Result:**

- ✅ Single column layout
- ✅ Form stacks vertically
- ✅ Order summary appears below form
- ✅ All inputs are touch-friendly
- ✅ No horizontal scroll needed
- ✅ Text is readable

### Tablet (768px - 1024px)

**Steps:**

1. Select "iPad" in device toolbar

**Expected Result:**

- ✅ Two columns visible but proportionally balanced
- ✅ Good spacing maintained
- ✅ Buttons are usable

### Desktop (1200px+)

**Steps:**

1. Select "Desktop" or maximize browser

**Expected Result:**

- ✅ Two-column layout with 2/3 and 1/3 split
- ✅ Order summary sticky to viewport
- ✅ No layout issues
- ✅ Proper spacing

---

## ✅ Scenario 5: Shipping Method Updates

**Steps:**

1. In Delivery Details, select each shipping method
2. Observe Order Summary updates

**Expected Result:**

- ○ Standard → Shipping $0.00
  - Total updates: $XX.XX
- ○ Express → Shipping $25.00
  - Total updates: $XX.XX + $25
- ○ Overnight → Shipping $50.00
  - Total updates: $XX.XX + $50

---

## ✅ Scenario 6: Collapsible Sections

**Steps:**

1. Complete Contact Details and click Continue
2. Try clicking "Contact Details" header again

**Expected Result:**

- ✅ Section collapses
- ✅ Shows summary: "john@example.com"
- ✅ Collapsed section shows checkmark (✓)
- ✅ Can be expanded again by clicking

**Steps:**

1. Collapse Contact Details
2. Expand again
3. Verify all data is still there

**Expected Result:**

- ✅ Form state persists
- ✅ All filled data is still visible

---

## ✅ Scenario 7: Order Summary Real-time Updates

**Steps:**

1. Add 2 different products to cart before checkout
2. Go to checkout
3. Verify Order Summary shows:
   - Both products
   - Correct quantities
   - Correct prices
   - Correct subtotal
4. Change shipping method
5. Verify:
   - Shipping cost updates
   - Tax recalculates if needed
   - Total updates

**Expected Result:**

- ✅ All items display
- ✅ Real-time updates work
- ✅ Math is accurate

---

## ✅ Scenario 8: Form Navigation

**Steps:**

1. Fill Contact Details
2. Click "Continue"
3. Verify only Delivery Details expands
4. Try clicking Contact Details title again
5. Both should be toggleable independently

**Expected Result:**

- ✅ Sections expand/collapse independently
- ✅ Data persists
- ✅ Clear visual feedback (chevron changes)

---

## ❌ Error Testing

### Expected Validation Failures

**Test 1: Empty submission**

```
Action: Click Place Order with empty form
Result: Alert "Please fill in contact details"
```

**Test 2: Missing shipping**

```
Action: Fill contact but not delivery, click Place Order
Result: Alert "Please fill in delivery details"
```

---

## 📊 Test Checklist

### Layout & Visual

- [ ] Two-column layout on desktop
- [ ] Responsive on mobile/tablet
- [ ] Order summary sticky
- [ ] All colors match design
- [ ] Font sizes are correct
- [ ] Spacing is consistent
- [ ] Icons display correctly

### Functionality

- [ ] Sections expand/collapse
- [ ] Form data persists
- [ ] Shipping cost updates
- [ ] Total calculates correctly
- [ ] Tax is applied (10%)
- [ ] "Add card" modal works
- [ ] Form validation works
- [ ] Place order redirects

### Form Inputs

- [ ] Text inputs accept input
- [ ] Select dropdowns work
- [ ] Checkboxes toggle
- [ ] Radio buttons work
- [ ] No console errors

### Navigation

- [ ] Cart → Checkout works
- [ ] Checkout → Confirmation works
- [ ] Confirmation links work
- [ ] Back button behavior correct

### Cart Integration

- [ ] Cart items show in summary
- [ ] Cart total matches
- [ ] Cart clears after order
- [ ] Empty cart check works

### Edge Cases

- [ ] Very long product names
- [ ] Many items in cart (scroll)
- [ ] Very small screen
- [ ] Very large screen
- [ ] Fast clicks on buttons
- [ ] Network latency simulation

---

## 🐛 Browser Testing

### Chrome/Edge (Chromium)

```
Test: All modern features
Expected: ✅ Should work perfectly
```

### Firefox

```
Test: CSS Grid, Flexbox
Expected: ✅ Should work perfectly
```

### Safari

```
Test: Sticky positioning
Expected: ✅ Should work perfectly
```

### Mobile Safari

```
Test: Mobile responsive
Expected: ✅ Should work perfectly
```

---

## 🔍 Console Check

**What to look for:**

```javascript
// Good - No errors
✅ No red errors
✅ No warnings about missing deps
✅ Form state logs if enabled

// Bad - Fix these
❌ Cannot find module
❌ useCart is undefined
❌ React warnings
```

---

## 📈 Performance Testing

**Lighthouse Audit:**

```bash
# Open DevTools → Lighthouse
# Run audit for Checkout page

Expected:
✅ Performance: > 90
✅ Accessibility: > 90
✅ Best Practices: > 90
✅ SEO: > 90
```

---

## 💾 State Persistence Test

**Steps:**

1. Fill form completely
2. Open DevTools → Network → Slow 3G
3. Navigate away and back
4. Check if state persists

**Expected Result:**

- ⚠️ State resets (normal for React without persistence)
- ✅ No errors on navigation

---

## 🚀 Deployment Checklist

Before deploying, verify:

- [ ] `npm run build` completes without errors
- [ ] No console warnings in production build
- [ ] All images have alt text
- [ ] Links have proper href values
- [ ] Forms don't submit without validation
- [ ] No hardcoded localhost URLs
- [ ] Environment variables configured
- [ ] Payment integration ready
- [ ] Database connected
- [ ] Email service configured

---

## 📝 Test Results Template

```
Date: _______
Tester: _______
Browser: _______
Device: _______

Form Validation: ✅ / ⚠️ / ❌
Responsive Design: ✅ / ⚠️ / ❌
Navigation: ✅ / ⚠️ / ❌
Real-time Updates: ✅ / ⚠️ / ❌
Payment Selection: ✅ / ⚠️ / ❌
Order Confirmation: ✅ / ⚠️ / ❌

Issues Found:
1. _______________
2. _______________
3. _______________

Notes:
_______________
_______________
```

---

## 🎯 Success Criteria

### MVP (Minimum Viable Product)

- ✅ User can add items to cart
- ✅ User can navigate to checkout
- ✅ User can fill out contact information
- ✅ User can select shipping method
- ✅ User can select payment method
- ✅ User can place order
- ✅ Order summary displays correctly
- ✅ Confirmation page shows

### Phase 2 (Future)

- Backend integration with payment processing
- Order saved to database
- Confirmation email sent
- Order tracking page
- User account integration
- Saved addresses
- Multiple payment methods

---

**Testing Framework**: Manual Testing
**Estimated Test Time**: 30-45 minutes
**Environment**: localhost:3000
**Next.js Version**: 16.0.1
**Node Version**: 18+ (recommended)
