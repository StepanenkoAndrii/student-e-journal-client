import { useState } from 'react';
import { IGroup } from '../interfaces/interfaces';

type Props = {
  specialityId: string;
};

export function Group(props: Props) {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupVisibility, setGroupVisibility] = useState(false);

  async function handleSpecialityGroupsOnClick(specialityId: string): Promise<void> {
    if (!groups.length) {
      const data: Response = await fetch(`/api/groups?specialityId=${specialityId}`);
      const groupsData: IGroup[] = await data.json();
      setGroups(groupsData);
    }
    setGroupVisibility(!groupVisibility);
  }
}
