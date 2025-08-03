import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Account {
  id: number;
  ma: string;
  hoVaTen: string;
  anhDaiDien: string;
  vaiTro: string;
  cccd: string;
  email: string;
  gioiTinh: string;
  soDienThoai: string;
  ngaySinh: string;
  diaChi: string;
  truongDaiHoc: string;
  chuyenNganh: string;
  hanhDong: string;
}

interface AccountContextType {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: number, account: Partial<Account>) => void;
  deleteAccount: (id: number) => void;
}

const initialAccounts: Account[] = [
  {
    id: 1,
    ma: "TPK",
    hoVaTen: "Lê Mạnh",
    anhDaiDien: "",
    vaiTro: "TPK",
    cccd: "",
    email: "",
    gioiTinh: "Nam",
    soDienThoai: "0338 0562 74",
    ngaySinh: "1/1/2002",
    diaChi: "Thủ Đức",
    truongDaiHoc: "",
    chuyenNganh: "",
    hanhDong: ""
  },
  {
    id: 2,
    ma: "BS001",
    hoVaTen: "Tô Linh",
    anhDaiDien: "",
    vaiTro: "Bác sĩ",
    cccd: "",
    email: "",
    gioiTinh: "Nữ",
    soDienThoai: "",
    ngaySinh: "",
    diaChi: "Hà Nội",
    truongDaiHoc: "",
    chuyenNganh: "",
    hanhDong: ""
  }
];

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
};

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  const addAccount = (newAccountData: Omit<Account, 'id'>) => {
    const newId = Math.max(...accounts.map(acc => acc.id), 0) + 1;
    const newAccount: Account = {
      ...newAccountData,
      id: newId,
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const updateAccount = (id: number, updates: Partial<Account>) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === id ? { ...account, ...updates } : account
      )
    );
  };

  const deleteAccount = (id: number) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
  };

  const value: AccountContextType = {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};
