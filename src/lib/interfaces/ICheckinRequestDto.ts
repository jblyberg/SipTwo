export interface ICheckinRequestDto {
  offline: boolean;
  returnDate: Date;
  location: string;
  itemIdentifier: string;
  itemProperties?: string;
  cancel?: boolean;
}
