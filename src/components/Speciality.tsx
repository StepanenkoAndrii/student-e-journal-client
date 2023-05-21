import { Menu } from 'antd';
import { ISpecialityProps } from '../interfaces/interfaces';

export function Speciality(props: ISpecialityProps) {
  return (
    <Menu.SubMenu
      key={props.speciality.specialityId}
      title={`${props.speciality.number}, ${props.speciality.name}`}
      // onTitleClick={handleSpecialityGroupsOnClick}
    ></Menu.SubMenu>
  );
}
