"use client";

import AccountsList from "@/app/ui/accounts/accounts-list";
import { RootState } from "@/app/lib/stores";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, filter } from "@/app/lib/stores/slices/accountsSlice";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

const AccountPage = () => {
  const accounts = useSelector((state: RootState) =>  state.accounts.filteredAccounts);
  const q = useSelector((state: RootState) =>  state.accounts.q);
  const dispatch = useDispatch();
  const t = useTranslations('Account');

  const handleDelete = (id: number) => {
    dispatch(deleteAccount(id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filter(e.currentTarget.value));
  };

  return (
    <>
      <h1 className="">{t('accountManagment')}</h1>
      <div className="row g-3 mb-3">
        <div className="col-auto">
          <Link
            href="/accounts/create"
            className="btn btn-primary">{t('addNew')}</Link>
        </div>
        <div className="col-auto">
          <Link
              href="/accounts/transfer"
              className="btn btn-secondary">{t('transferFunds')}</Link>
        </div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={t('search')}
          onChange={handleChange}
          value={q} />
      </div>
      <AccountsList
        accounts={accounts} 
        onDelete={handleDelete} />
    </>
  );
}

export default AccountPage;