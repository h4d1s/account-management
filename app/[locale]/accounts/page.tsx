"use client";

import AccountsList from "@/app/ui/accounts/accounts-list";
import { RootState } from "@/app/lib/stores";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, setQuery, setCurrentPage } from "@/app/lib/stores/slices/accountsSlice";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import clsx from "clsx";

const AccountPage = () => {
  const { accounts, q, currentPage, itemsPerPage } = useSelector((state: RootState) =>  state.accounts);
  const dispatch = useDispatch();
  const t = useTranslations('Account');

  const filteredAccounts = accounts.filter((account) => 
    account.firstname.toLocaleLowerCase().includes(q) ||
    account.lastname.toLocaleLowerCase().includes(q)
  );

  let totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  totalPages = totalPages <= 0 ? 1 : totalPages;

  const startIndex = (currentPage * itemsPerPage) - itemsPerPage;
  const lastIndex = (currentPage * itemsPerPage);
  const currentAccounts = filteredAccounts.slice(startIndex, lastIndex);

  const handleDelete = (id: number) => {
    dispatch(deleteAccount(id));
  };

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.currentTarget.value));
  };

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const page = (currentPage - 1 < 0 ? 0 : currentPage - 1);
    dispatch(setCurrentPage(page));
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const page = (currentPage + 1 > totalPages ? currentPage : currentPage + 1);
    dispatch(setCurrentPage(page));
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
          onChange={handleSetQuery}
          value={q} />
      </div>
      <AccountsList
        accounts={currentAccounts}
        onDelete={handleDelete} />
        
      <nav aria-label="...">
        <ul className="pagination">
          <li className={clsx("page-item", { "disabled": currentPage == 1})}>
            <a className="page-link" onClick={handlePrevious}>&laquo;</a>
          </li>
          <li className={clsx("page-item", { "disabled": currentPage == totalPages})}>
            <a className="page-link" onClick={handleNext}>&raquo;</a>
          </li>
        </ul>
      </nav>

      { t('page') } {currentPage} { t('of') } {totalPages}
    </>
  );
}

export default AccountPage;