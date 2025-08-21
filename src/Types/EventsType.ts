export interface IEvent {
  event_id: number;
  event_title: string;
  event_venu: string;
  event_date: string;
  event_photo: string;
  event_start_time: string;
  event_end_time: string;
}

export interface ISingleEvent {
  event_id: number;
  event_title: string;
  event_type: string;
  event_venu: string;
  event_date: string;
  event_total_speaker: number;
  event_description: string;
  event_created_at: string;
  event_photo: string;
  event_created_by: number;
  event_start_time: string;
  event_end_time: string;
}
