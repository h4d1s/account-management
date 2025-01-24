import { fireEvent, render, screen } from '@testing-library/react';
import { Account } from '@/app/lib/types/account';
import AccountForm from '@/app/ui/accounts/account-form';
import {getMessages} from 'next-intl/server';
import '@testing-library/jest-dom';
import {NextIntlClientProvider} from 'next-intl';
import messages from "@/messages/en.json";

describe("AccountForm", () => {
  test("renders from with empty fields", () => {
    render(<NextIntlClientProvider messages={messages} locale="en">
      <AccountForm onSave={jest.fn()} />
    </NextIntlClientProvider>);

    expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Last name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Currency/i)).toHaveValue("");
    expect(screen.getByLabelText(/Balance/i)).toHaveValue("");
  });

  test("renders form with passed values", async () => {
    const account: Account = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      currency: "USD",
      balance: 400
    };

    render(<NextIntlClientProvider messages={messages} locale="en">
      <AccountForm account={account} onSave={jest.fn()} />
    </NextIntlClientProvider>);

    expect(screen.getByLabelText(/First Name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Currency/i)).toHaveValue("USD");
    expect(screen.getByLabelText(/Balance/i)).toHaveValue("400");
  });

  test("updates when form fields changes", () => {
    render(<NextIntlClientProvider messages={messages} locale="en">
      <AccountForm onSave={jest.fn()} />
    </NextIntlClientProvider>);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastnameInput = screen.getByLabelText(/Last name/i);
    const currencySelect = screen.getByLabelText(/Currency/i);
    const balanceInput = screen.getByLabelText(/Balance/i);

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastnameInput, { target: { value: "Doe" } });
    fireEvent.change(currencySelect, { target: { value: "USD" } });
    fireEvent.change(balanceInput, { target: { value: "500" } });

    expect(firstNameInput).toHaveValue("John");
    expect(lastnameInput).toHaveValue("Doe");
    expect(currencySelect).toHaveValue("USD");
    expect(balanceInput).toHaveValue("500");
  });

  test("show validation errors with empty input", () => {
    render(<NextIntlClientProvider messages={messages} locale="en">
      <AccountForm onSave={jest.fn()} />
    </NextIntlClientProvider>);

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Firstname is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Lastname is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Currency is required/i)).toBeInTheDocument();
  });

  test("calls OnSave with form data", () => {
    const mockOnSave = jest.fn();
    render(<NextIntlClientProvider messages={messages} locale="en">
      <AccountForm onSave={mockOnSave} />
    </NextIntlClientProvider>);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastnameInput = screen.getByLabelText(/Last name/i);
    const currencySelect = screen.getByLabelText(/Currency/i);
    const balanceInput = screen.getByLabelText(/Balance/i);

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastnameInput, { target: { value: "Doe" } });
    fireEvent.change(currencySelect, { target: { value: "USD" } });
    fireEvent.change(balanceInput, { target: { value: "500" } });

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      id: 0,
      firstname: "John",
      lastname: "Doe",
      currency: "USD",
      balance: 500,
    })
  });

  test("resets the form fields after successful submit", () => {
    render(<NextIntlClientProvider messages={messages} locale="en">
      <AccountForm onSave={jest.fn()} />
    </NextIntlClientProvider>);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastnameInput = screen.getByLabelText(/Last name/i);
    const currencySelect = screen.getByLabelText(/Currency/i);
    const balanceInput = screen.getByLabelText(/Balance/i);

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastnameInput, { target: { value: "Doe" } });
    fireEvent.change(currencySelect, { target: { value: "USD" } });
    fireEvent.change(balanceInput, { target: { value: "500" } });

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    expect(firstNameInput).toHaveValue("");
    expect(lastnameInput).toHaveValue("");
    expect(currencySelect).toHaveValue("");
    expect(balanceInput).toHaveValue("");
  });
});