import { Empty } from 'antd';

export function AdminDefaultContent() {
  const emptyAdminText = 'Please, choose a Speciality, Group or a Student from the side menu';

  return <Empty description={emptyAdminText} style={{ fontSize: '20px' }} />;
}
