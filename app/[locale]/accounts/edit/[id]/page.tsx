"use client";

import { RootState } from "@/app/lib/stores";
import { useDispatch, useSelector } from "react-redux";
import AccountForm from '@/app/ui/accounts/account-form';
import { Account } from "@/app/lib/types/account";
import { update } from "@/app/lib/stores/slices/accountsSlice";
import React from "react";
import { useTranslations } from 'next-intl';

interface Props {
  params: Promise<{ id: string }>;
}

const AccountEditPage = ({ params }: Props) => {
  const resolvedParams = React.use(params);

  const accounts = useSelector((state: RootState) =>  state.accounts.accounts);
  const dispach = useDispatch();
  const { id } = resolvedParams;
  const t = useTranslations('Account');
  
  const account = accounts.find((account) => account.id === Number.parseInt(id));

  const handleSave = (account: Account) => {
    dispach(update(account));
  };

  return (
    <>
      <h3>{t('editAccount')}</h3>
      <AccountForm
        account={account}
        onSave={handleSave} />
    </>
  );
}

export default AccountEditPage;