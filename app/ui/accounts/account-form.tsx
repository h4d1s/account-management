import { Account } from '@/app/lib/types/account';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface FormData {
  firstname: string;
  lastname: string;
  currency: string;
  balance: string;
}

interface Errors {
  firstname?: string;
  lastname?: string;
  currency?: string;
  balance?: string;
}

interface Props {
  account?: Account;
  onSave: (formData: Account) => void;
}

const AccountForm = (props: Props) => {
  const t = useTranslations('Account');

  const [formData, setFormData] = useState<FormData>({
    firstname: props.account?.firstname || '',
    lastname: props.account?.lastname || '',
    currency: props.account?.currency || '',
    balance: props.account?.balance.toString() || ''
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = t('firstnameIsRequired');
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = t('lastnameIsRequired');
    }

    if (!formData.currency.trim()) {
      newErrors.currency = t('currencyIsRequired');
    }

    if (!formData.balance.trim() && isNaN(Number(formData.balance)) && Number(formData.balance) === 0) {
      newErrors.currency = t('balanceIsRequired');
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const account: Account = {
      id: props.account?.id || 0,
      firstname: formData.firstname,
      lastname: formData.lastname,
      currency: formData.currency,
      balance: Number(formData.balance)
    };
    props.onSave(account);

    setFormData({
      firstname: '',
      lastname: '',
      currency: '',
      balance: '',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">{t('firstname')}</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className={`form-control ${errors?.firstname ? "is-invalid" : ""}`}
          placeholder="Enter firstname"
          value={formData.firstname}
          onChange={handleChange}
          aria-describedby="firstnameFeedback"
        />
        { errors.firstname && (
          <div id="firstnameFeedback" className="invalid-feedback">{errors.firstname}</div>
        ) }
      </div>

      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">{t('lastname')}</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className={`form-control ${errors?.lastname ? "is-invalid" : ""}`}
          placeholder="Enter lastname"
          value={formData.lastname}
          onChange={handleChange}
          aria-describedby="lastnameFeedback"
        />
        { errors.lastname && (
          <div id="lastnameFeedback" className="invalid-feedback">{errors.lastname}</div>
        ) }
      </div>

      <div className="mb-3">
        <label htmlFor="currency" className="form-label">{t('currency')}</label>
        <select
          id="currency"
          name="currency"
          className={`form-select ${errors?.currency ? "is-invalid" : ""}`}
          value={formData.currency}
          onChange={handleChange}
          aria-describedby="currencyFeedback">
          <option></option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
        </select>
        {errors?.currency && (
          <div id="currencyFeedback" className="invalid-feedback">{errors.currency}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="balance" className="form-label">{t('balance')}</label>
        <input
          type="text"
          id="balance"
          name="balance"
          className={`form-control ${errors?.balance ? "is-invalid" : ""}`}
          placeholder="Enter balance"
          value={formData.balance}
          onChange={handleChange}
          aria-describedby="balanceFeedback"
        />
        {errors?.balance && (
          <div id="balanceFeedback" className="invalid-feedback">{errors.balance}</div>
        )}
      </div>

      <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
          >
          {t('save')}
          </button>
      </div>
    </form>
  );
};

export default AccountForm;