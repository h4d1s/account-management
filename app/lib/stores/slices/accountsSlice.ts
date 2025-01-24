import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "@/app/lib/types/account";

interface AccountsState {
  accounts: Account[],
  q: string,
  currentPage: number,
  itemsPerPage: number
}

const accounts = [
  {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "currency": "USD",
    "balance": 7200
  },
  {
    "id": 2,
    "firstname": "James",
    "lastname": "Smith",
    "currency": "EUR",
    "balance": 4500
  },
  {
    "id": 3,
    "firstname": "Emma",
    "lastname": "Brown",
    "currency": "EUR",
    "balance": 2000
  }
]

const initialState: AccountsState = {
  accounts: accounts,
  q: "",
  currentPage: 1,
  itemsPerPage: 2
};

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
      create: (state, action: PayloadAction<Account>) => {
        state.accounts.push(action.payload);
      },
      update: (state, action: PayloadAction<Account>) => {
        let index = state.accounts.findIndex((acc) => acc.id === action.payload.id);
        if(index !== -1) {
          state.accounts[index] = action.payload;
        }
      },
      deleteAccount: (state, action: PayloadAction<number>) => {
        state.accounts = state.accounts.filter((account) => account.id !== action.payload);
      },
      transferFunds: (state, action: PayloadAction<{ fromId: number; toId: number; amount: number }>) => {
        const { fromId, toId, amount } = action.payload;
        let fromAccount = state.accounts.find((account) => account.id === fromId);
        let toAccount = state.accounts.find((account) => account.id === toId);

        if(fromAccount && toAccount && amount <= fromAccount.balance) {
          fromAccount.balance -= amount;
          toAccount.balance += amount;
        }
      },
      setQuery: (state, action: PayloadAction<string>) => {
        state.q = action.payload;
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      }
    }
});

export const {
  create,
  update,
  deleteAccount,
  transferFunds,
  setQuery,
  setCurrentPage
} = accountsSlice.actions;
export default accountsSlice.reducer;