export enum WorkType {
  web_development = 'web-development',
  graphics_design = 'graphics-design',
  video_editing = 'video-editing',
  digital_marketing = 'digital-marketing',
  uiux_design = 'uiux-design',
}

export interface IWork {
  type: WorkType;
  description: string;
  photo: string;
  tag: string;
  date?: Date;
  video_link?: string;
  category?: string;
  design_link?: string;
  live_link?: string;
}
