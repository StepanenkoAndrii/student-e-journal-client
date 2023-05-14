export interface ISpeciality {
  specialityId: string;
  name: string;
  facultyId: string;
  number?: number;
}

export interface IGroup {
  groupId: string;
  name: string;
  specialityId: string;
}
