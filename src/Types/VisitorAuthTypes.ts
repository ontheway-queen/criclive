import { Dispatch } from 'react';

export interface IVisitorUser {
  visitor_address?: string;
  visitor_city?: string;
  visitor_date_of_birth?: string;
  visitor_designation?: string;
  visitor_education?: string;
  visitor_email?: string;
  visitor_facebook?: string;
  visitor_first_name?: string;
  visitor_gender?: string;
  visitor_id?: number;
  visitor_last_name?: string;
  visitor_organization?: string;
  visitor_phone?: string;
  visitor_photo?: string;
  visitor_profession?: string;
  visitor_type?: string;
  visitor_cricbsite?: string;
  visitor_zip_code?: string;
}

export interface IVisitorAuthContext {
  visitorUser: IVisitorUser;
  dispatch?: Dispatch<any>;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}

export interface IB2BAuthContext {
  B2BUser: IVisitorUser;
  dispatch?: Dispatch<any>;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}
