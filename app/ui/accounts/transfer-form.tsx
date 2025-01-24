import { Account } from "@/app/lib/types/account";
import React, { FormEvent, useState } from "react";
import { useTranslations } from 'next-intl';

type Errors = {
  form: string,
  fromAccount: string,
  toAccount: string,
  amount: string
};

type Form = {
  fromAccountId: number,
  toAccountId: number,
  amount: string
};

type Props = {
  accounts: Account[],
  onSubmit: (data: {
    fromAccountId: number,
    toAccountId: number,
    amount: number
  }) => void
}

const TransferForm = (props: Props) => {
  const t = useTranslations('Account');

  const [formData, setFormData] = useState<Form>({
      fromAccountId: 0,
      toAccountId: 0,
      amount: ""
    });
    const [toAccounts, setToAccounts] = useState<Account[]>();
    const [errors, setErrors] = useState<Errors>(({
      form: "",
      fromAccount: "",
      toAccount: "",
      amount: ""
    }));
  
    const handleFromSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const fromAccountId = Number(e.target.value);
      setFormData({
        ...formData,
        fromAccountId: fromAccountId
      });
  
      setToAccounts(props.accounts.filter((account) => account.id !== fromAccountId));
  
      setErrors({
        ...errors,
        fromAccount: ""
      });
    };
  
    const handleToSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const toAccountId = Number(e.target.value);
      setFormData({
        ...formData,
        toAccountId: toAccountId
      });
  
      setErrors({
        ...errors,
        toAccount: ""
      });
    };
  
    const handleOnAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const amount = e.currentTarget.value;
  
      setErrors({
        ...errors,
        amount: ""
      });
  
      if(isNaN(Number(amount))) {
        setErrors({
          ...errors,
          amount: t('amountShouldBeNumber')
        });
        return;
      }
  
      if(Number(amount) < 0) {
        setErrors({
          ...errors,
          amount: t('amountShouldBeGreaterThan0')
        });
        return;
      }
  
      if(amount.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
        setFormData({
          ...formData,
          amount: amount
        });
      }
    };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if(!formData.fromAccountId) {
        setErrors({
          ...errors,
          fromAccount: t('selectFromAccountTrasferFrom')
        });      
        return;
      }
  
      if(!formData.toAccountId) {
        setErrors({
          ...errors,
          toAccount: t('selectFromAccountTrasferTo')
        });  
        return;
      }
  
      if(!formData.amount) {
        setErrors({
          ...errors,
          amount: t('enterAmount')
        });  
        return;
      }
  
      const fromAccount = props.accounts.find((account: Account) => account.id === formData.fromAccountId);
  
      if(fromAccount) {
        const amountFixed = Number(Number(formData.amount).toFixed(2));
        if(amountFixed > fromAccount.balance) {
          setErrors({
            ...errors,
            form: t('accNotSufficientAmount')
          }); 
          return;
        } else {
          setErrors({
            ...errors,
            form: ""
          }); 
        }
      }
  
      props.onSubmit({
        fromAccountId: formData.fromAccountId,
        toAccountId: formData.toAccountId,
        amount: Number(formData.amount)
      });
  
      setFormData({
        fromAccountId: 0,
        toAccountId: 0,
        amount: "",
      });
    };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{t('trasferFunds')}</h3>
      {errors?.form && <div className="alert alert-danger" role="alert">
        {errors?.form}
      </div>}
      <div className="mb-3"> 
        <label className="form-label">{t('fromAccount')}</label>
        <select
          className={`form-select ${errors?.fromAccount ? "is-invalid" : ""}`}
          onChange={handleFromSelect}
          aria-describedby="fromAccountFeedback"
          value={formData.fromAccountId}>
          <option value="0"></option>
          {props.accounts.map((account) => (
            <option key={account.id} value={account.id}>{account.firstname} {account.lastname}</option>
          ))}
        </select>
        {errors?.fromAccount && (
          <div id="fromAccountFeedback" className="invalid-feedback">{errors.fromAccount}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">{t('toAccount')}</label>
        <select
          className={`form-select ${errors?.toAccount ? "is-invalid" : ""}`}
          onChange={handleToSelect}
          aria-describedby="toAccountFeedback"
          value={formData.toAccountId}>
          <option value="0"></option>
          {toAccounts?.map((account) => (
            <option
              key={account.id}
              value={account.id}>{account.firstname} {account.lastname}</option>
          ))}
        </select>
        {errors?.toAccount && (
            <div id="toAccountFeedback" className="invalid-feedback">{errors.toAccount}</div>
          )}
      </div>

      <div className="mb-3">
        <label className="form-label">{t('amount')}</label>
        <input
          type="text"
          className={`form-control ${errors?.amount ? "is-invalid" : ""}`}
          onChange={handleOnAmountChange}
          aria-describedby="amountFeedback"
          value={formData.amount}></input>
          {errors?.amount && (
            <div id="amountFeedback" className="invalid-feedback">{errors.amount}</div>
          )}
      </div>

      <button type="submit" className="btn btn-primary">
        {t('transfer')}
      </button>
    </form>
  );
};

export default TransferForm;