"use client";

import {useParams} from 'next/navigation';
import { Link, routing, useRouter, usePathname } from "@/i18n/routing";
import { useLocale  } from "next-intl";
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface NavLinkProps {
  href: string;
  label: string;
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const query = params ? { ...params } : {};
  const locale = useLocale();

  const isAccountsPath = pathname === '/accounts';
  const t = useTranslations('Account');

  const handleLocaleChange = (e: React.MouseEvent<HTMLAnchorElement>, cur: string) => {
    e.preventDefault();

    const nextLocale = cur;
    router.replace({pathname, query}, {locale: nextLocale});
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">{t('accountManagment')}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className={clsx('nav-link', { 'active': isAccountsPath })}
              href="/accounts">{t('accounts')}</Link>
          </div>
          <div className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('language')}
              </a>
              <ul className="dropdown-menu">
              {routing.locales.map((cur) => (
                <li key={cur}>
                  <a
                    className={clsx('dropdown-item', { 'active': locale === cur })}
                    href="#"
                    onClick={(e) => handleLocaleChange(e, cur)}>{cur}</a>
                </li>
              ))}
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;