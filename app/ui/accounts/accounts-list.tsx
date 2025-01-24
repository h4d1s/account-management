import { Account } from "@/app/lib/types/account";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

interface Props {
  accounts: Account[],
  onDelete: (id: number) => void
}

const AccountsList = (props: Props) => {
  const t = useTranslations('Account');
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('name')}</th>
            <th>{t('balance')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { props.accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.firstname} {account.lastname}</td>
              <td>{account.balance.toFixed(2)} {account.currency}</td>
              <td>
                <Link
                  className="btn btn-primary me-2"
                  href={`/accounts/edit/${account.id}`}>{t('edit')}</Link>
                <button
                  onClick={() => props.onDelete(account.id)}
                  className="btn btn-danger"
                >
                  {t('delete')}
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
};

export default AccountsList;