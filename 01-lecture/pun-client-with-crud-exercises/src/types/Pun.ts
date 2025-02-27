export interface IPun {
  _id: string;
  content: string;
  date: string;
}

export type PunCreate = Pick<IPun, 'content'>;
export type PunUpdate = Pick<IPun, 'content'>;