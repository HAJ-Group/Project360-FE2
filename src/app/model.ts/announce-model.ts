export class AnnounceModel {

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
    public announcerId: number
  ){}
}
