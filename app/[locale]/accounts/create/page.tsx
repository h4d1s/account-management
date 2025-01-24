"use client";

import { RootState } from "@/app/lib/stores";
import { Account } from '@/app/lib/types/account';
import AccountForm from '@/app/ui/accounts/account-form';
import { useDispatch, useSelector } from "react-redux";
import { create } from "@/app/lib/stores/slices/accountsSlice";
import * as React from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  params: {
  };
};

const AccountCreatePage = ({ params }: Props) => {
  const accounts = useSelector((state: RootState) =>  state.accounts.accounts);
  const dispach = useDispatch();

  const account: Account = {
    id: 0,
    firstname: '',
    lastname: '',
    currency: '',
    balance: 0,
  };

  const handleSave = (account: Account) => {
    let maxId = 0;
    accounts.forEach(account => {
      if(maxId < account.id) {
        maxId = account.id;
      }
    });
    account.id = maxId + 1;
    dispach(create(account));
  };

  const t = useTranslations('Account');

  return (
    <>
      <h3>{t('createNewAccount')}</h3>
      <AccountForm
        account={account}
        onSave={handleSave} />
    </>
  );
};

export default AccountCreatePage;