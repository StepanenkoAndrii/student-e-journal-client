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

export interface ITeacher {
  profileId: string;
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

export interface ISubject {
  subjectId: string;
  name: string;
  type: TeacherType;
}

export interface ITeachersProps {
  teachers: ITeacher[];
  goToTeacherInfo: any;
  getSubjectsAndTypes: any;
  handleTeacherDelete: () => void;
  handleTeacherUpdate: () => void;
  goToTeacherCreate: () => void;
}

export interface ITeacherProps {
  teacher: ITeacher | null;
  setPageContentType: any;
  setPickedTeacher?: any;
  handleTeacherDelete: () => void;
  handleTeacherUpdate: () => void;
}

export interface IUser {
  userId: string;
  username: string;
  password: string;
  role: Role;
  profileId: string;
}

export interface ISpecialityGroup {
  groups: string;
  specialityId: string;
  name: string;
  facultyId: string;
  number?: number;
}

export interface IStudent {
  profileId: string;
  name: string;
  surname: string;
  email?: string;
  phoneNumber: string;
  phoneNumber2?: string;
  description?: string;
  studentId: string;
  groupId: string;
}

export interface IGrade {
  gradeId: string;
  value: string;
  studentId: string;
  date: string;
  subjectId: string;
}
