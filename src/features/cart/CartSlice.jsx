import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add an item to the store
    addItem: (state, action) => {
      const {name, image, cost} = action.payload;
      // Pointless to check, since we can't add the same item twice, as the button gets disabled
      // const existingItem = state.items.find(item => item.name === name);
      // if (!existingItem) {
      state.items.push({name, cost, image, quantity: 1});
      // }
    
    },
    // Does what it says on the tin
    removeItem: (state, action) => {
      const {name} = action.payload;
      state.items = state.items.filter(item => item.name !== name);


    },

    // The quantity is updated by a static value, as per requirements
    updateQuantity: (state, action) => {
      const {name, newQuantity} = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = newQuantity;
      }
    
    },
  },
});

// Prefer using a selector here, it's more efficient than putting the logic into ProductList
// eslint-disable-next-line react-refresh/only-export-components
export const selectTotalItems = state =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

// eslint-disable-next-line react-refresh/only-export-components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
