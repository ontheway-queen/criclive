export interface Ilogo {
  companyLogoPhoto: any;
  companyLogoAi: any;
}

export interface ICompanyInfo {
  user_member_id: number;
  user_member_phone: string;
  user_member_company_name: string;
  user_member_representative_name: string;
  user_member_account_status: string;
  user_member_info_verified_status: string;
  user_member_payment_verified_status?: string;
}

export interface ICompanyProfileProps {
  register: any;
  setCompanyLogo: (value: Ilogo) => void;
  companyLogo: Ilogo;
  companyProfileReg: ICompanyProfileInfoRegister | undefined;
}
export interface ICompanyProfileInfoRegister {
  userMemberId: number;
  memberId: number;
  status: string;
  email: string;
  mobileNumber: string;
  companyName: string;
  membershipType: string;
  logo: null | string;
  address: string;
  representativeName: string;
  representativeDesignation: string;
}

export interface IStalls {
  cric_stall_id: number;
  cric_stall_name: string;
  cric_stall_hall_no: number;
  cric_stall_type: string;
  cric_stall_hall_name: string;
  cric_stall_available_status: string;
}
