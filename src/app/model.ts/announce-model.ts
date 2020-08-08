import {ImageModel} from './Image-model';

export class AnnounceModel {

  public created_at: string;
  public images: ImageModel[];

  constructor(
    public id: number,
    public title: string,
    public type: string,
    public description: string,
    public price: number,
    public address: string,
    public city: string,
    public positionMap: string,
    public status: string,
    public rent: string,
    public surface: number,
    public pieces: number,
    public rooms: number,
    public premium: boolean,
    public announcerId: number,
  ){}
}
