import { Dispatch } from 'react';

export interface IUser {
  user_fair_member_company_address?: string;
  user_fair_member_company_city?: string;
  user_fair_member_company_id?: number;
  user_fair_member_company_logo?: string;
  user_fair_member_company_name?: string;
  user_fair_member_company_telephone?: string;
  user_fair_member_company_website?: string;
  user_fair_member_company_zip?: string;
  user_fair_member_contact_designation?: string;
  user_fair_member_contact_email?: string;
  user_fair_member_contact_name?: string;
  user_fair_member_contact_number?: string;
  user_fair_member_email?: string;
  user_fair_member_id?: number;
}

export interface IAuthContextState {
  user: IUser;
  dispatch?: Dispatch<any>;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}
