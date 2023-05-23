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

export interface IGroupsMenuProps {
  specialityId: string;
}

export interface ISpecialityProps {
  speciality: ISpeciality;
}

type Role = 'Teacher' | 'Administrator';
type TeacherType = 'Lector' | 'Practician';

interface ITeacher {
  name: string;
  surname: string;
  email?: string;
  phoneNumber: string;
  phoneNumber2?: string;
  description?: string;
  userId: string;
  username: string;
  password: string;
  role: Role;
  subjects?: ISubject[];
}

interface ISubject {
  subjectId: string;
  name: string;
  type: TeacherType;
}

export interface ITeachersProps {
  teachers: ITeacher[];
  setPageContentType: any;
  setPickedTeacher: any;
}

export interface ITeacherProps {
  teacher?: ITeacher;
  setPageContentType: any;
  setPickedTeacher?: any;
}
