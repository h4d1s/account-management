"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/stores";
import { transferFunds } from "@/app/lib/stores/slices/accountsSlice";
import React from "react";
import TransferForm from "@/app/ui/accounts/transfer-form";
import CurrencyAPI from "@/app/lib/api/currency";

const AccountTransferPage = () => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const dispatch = useDispatch();

  const handleOnSubmit = async (data: {
    fromAccountId: number,
    toAccountId: number,
    amount: number
  }) => {
    const fromAccount = accounts.find((account) => account.id === data.fromAccountId);
    const toAccount = accounts.find((account) => account.id === data.toAccountId);

    const baseCurrency = fromAccount?.currency || "USD";
    const toCurrency = toAccount?.currency || "USD";
    let amount = data.amount;
    
    if(baseCurrency !== toCurrency) {
      const response = await CurrencyAPI.latest(baseCurrency, toCurrency);
      amount = response.data.data[toCurrency] * amount;
    }

    dispatch(transferFunds({ 
      fromId: data.fromAccountId,
      toId: data.toAccountId,
      amount: Number(amount.toFixed(2))
    }));
  };

  return (
    <TransferForm
      accounts={accounts}
      onSubmit={handleOnSubmit} />
  );
};

export default AccountTransferPage;