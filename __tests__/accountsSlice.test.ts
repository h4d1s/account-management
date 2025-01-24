import { configureStore } from '@reduxjs/toolkit';
import accountsReducer, {
  create, 
  update, 
  deleteAccount, 
  transferFunds, 
  filter 
} from '@/app/lib/stores/slices/accountsSlice';
import { Account } from '@/app/lib/types/account';
import { RootState } from '@/app/lib/stores/index';

describe('accountsSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        accounts: accountsReducer,
      },
    });
  });

  test('should create an account', () => {
    const newAccount: Account = { id: 100, firstname: 'Alice', lastname: 'Smith', currency: "USD", balance: 500 };

    store.dispatch(create(newAccount));

    const state = store.getState() as RootState;

    expect(state.accounts.accounts).toHaveLength(4);
    expect(state.accounts.filteredAccounts).toHaveLength(4);
    expect(state.accounts.accounts[3].id).toBe(100);
  });

  test('should edit an account', () => {
    let state = store.getState() as RootState;
    let firstAccount = { ... state.accounts.accounts[0] };
    firstAccount.firstname = "Firstname";

    store.dispatch(update(firstAccount));
    state = store.getState() as RootState;

    expect(state.accounts.accounts[0].firstname).toBe("Firstname");
    expect(state.accounts.filteredAccounts[0].firstname).toBe("Firstname");
  });

  test('should delete an account', () => {
    store.dispatch(deleteAccount(1));

    const state = store.getState() as RootState;

    expect(state.accounts.accounts).toHaveLength(2);
    expect(state.accounts.filteredAccounts).toHaveLength(2);
  });

  test('should transfer from one account to another', () => {
    let state = store.getState() as RootState;
    const fromAccount = state.accounts.accounts[1];
    const toAccount = state.accounts.accounts[2];

    store.dispatch(transferFunds({ fromId: fromAccount.id,  toId: toAccount.id, amount: 100 }));

    state = store.getState() as RootState;

    expect(state.accounts.accounts[2].balance).toBe(toAccount.balance + 100);
    expect(state.accounts.accounts[1].balance).toBe(fromAccount.balance - 100);
    expect(state.accounts.filteredAccounts[2].balance).toBe(toAccount.balance + 100);
    expect(state.accounts.filteredAccounts[1].balance).toBe(fromAccount.balance - 100);
  });

  test('should filter accounts', () => {
    let state = store.getState() as RootState;
    store.dispatch(filter("a"));

    state = store.getState() as RootState;

    expect(state.accounts.filteredAccounts).toHaveLength(2);
  });
});