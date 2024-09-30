import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: {
    name: string | null;
    email: string | null;
  } | null;
  items: { id: string; title: string; text: string }[];
}

const initialState: UserState = {
  userData: null,
  items: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{ name: string; email: string }>) {
      state.userData = action.payload;
    },
    addItem(
      state,
      action: PayloadAction<{ id: string; title: string; text: string }>
    ) {
      state.items.push(action.payload);
      const items = JSON.parse(sessionStorage.getItem('items') || '[]');
      items.push(action.payload);
      sessionStorage.setItem('items', JSON.stringify(items));
    },
    editItem(
      state,
      action: PayloadAction<{ id: string; title: string; text: string }>
    ) {
      const { id, title, text } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.title = title;
        item.text = text;
        const updatedItems = state.items.map((item) =>
          item.id === id ? { id, title, text } : item
        );
        sessionStorage.setItem('items', JSON.stringify(updatedItems));
      }
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const updatedItems = state.items;
      sessionStorage.setItem('items', JSON.stringify(updatedItems));
    },
    logout(state) {
      state.userData = null;
      state.items = [];
      sessionStorage.removeItem('items');
    },
    getUserData(state) {
      const user = sessionStorage.getItem('userData');
      if (user) {
        const data = JSON.parse(user);
        state.userData = {
          name: data.username,
          email: data.email,
        };
      }
    },
    getItems(state) {
      const items = sessionStorage.getItem('items');
      if (items) {
        state.items = JSON.parse(items);
      }
    },
  },
});

export const {
  setUserData,
  addItem,
  editItem,
  deleteItem,
  logout,
  getUserData,
  getItems,
} = userSlice.actions;
export default userSlice.reducer;
