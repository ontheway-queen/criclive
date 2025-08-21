export interface IVisitorInvoice {
  visitor_payment_invoice_item_id: number;
  visitor_payment_invoice_id: number;
  visitor_payment_invoice_item_name: string;
  visitor_payment_invoice_item_amount: string;
  visitor_payment_user_id: string;
  visitor_payment_invoice_issue_date: string;
  visitor_payment_invoice_status: string;
  visitor_payment_invoice_transaction_date: string;
  visitor_payment_invoice_transaction_id: string;
  visitor_first_name: string;
  visitor_last_name: string;
  visitor_id: number;
}

export interface IVisitorUser {
  visitor_id?: number;
  visitor_first_name?: string;
  visitor_last_name?: string;
  visitor_gender?: string;
  visitor_email?: string;
  visitor_phone?: string;
  visitor_photo?: string;
  visitor_date_of_birth?: string;
  visitor_education?: string;
  visitor_profession?: string;
  visitor_organization?: string;
  visitor_designation?: string;
  visitor_website?: string;
  visitor_address?: string;
  visitor_city?: string;
  visitor_facebook?: string;
  visitor_type?: string;
  visitor_zip_code?: string;
}
export interface IAllRegisterEvent {
  fair_event_joined_id: number;
  fair_event_id: number;
  event_title: string;
  event_venu: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
}

export interface IMemberVisitor {
  visitor_id: number;
  visitor_first_name: string;
  visitor_last_name: string;
  visitor_email: string;
  visitor_gender: string;
  visitor_phone?: string;
}

export interface ISpeaker {
  event_speaker_id: number;
  speaker_id: number;
  guest_speaker_name: string;
  guest_speaker_designation: string;
  guest_speaker_company_name: string;
  guest_speaker_photo: string;
}
