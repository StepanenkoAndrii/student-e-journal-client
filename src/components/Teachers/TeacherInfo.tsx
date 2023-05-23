import { Avatar, Button, Card } from 'antd';
import { ITeacherProps } from '../../interfaces/interfaces';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

export function TeacherInfo({ teacher, setPageContentType, setPickedTeacher }: ITeacherProps) {
  function goBackToAllTeachers() {
    setPageContentType('allTeachers');
    setPickedTeacher(null);
  }

  function AllData() {
    const keyCards = AllKeys();
    const keyValues = AllValues();
    let allData = [];

    for (let i = 0; i < keyCards.length; i++) {
      allData.push(keyCards[i], keyValues[i]);
    }

    console.log(allData);

    return <Card className="form-card">{allData}</Card>;
  }

  function AllKeys() {
    const keys = [
      'First name',
      'Second name',
      'Roles',
      'Username',
      'Email',
      'Phone number',
      'Secondary phone number',
      'Description',
      'Subjects'
    ];

    const keyCards = keys.map((key) => {
      return <FormCard key={key} name={key} cardClassName="key-card" />;
    });

    return keyCards;

    // return <Card className="left-part">{keyCards}</Card>;
  }

  function AllValues() {
    const values = [
      teacher!.name,
      teacher!.surname,
      teacher!.subjects
        ? teacher!
            .subjects!.map((subject) => {
              return subject.type;
            })
            .join(', ')
        : 'Unknown',
      teacher!.username,
      teacher!.email,
      teacher!.phoneNumber,
      teacher!.phoneNumber2 ?? 'No secondary phone',
      teacher!.description ?? 'No description',
      teacher!.subjects
        ? teacher!
            .subjects!.map((subject) => {
              return `${subject.name} (as a ${subject.type})`;
            })
            .join(', ')
        : 'No subjects yet'
    ];

    const valueCards = values.map((value) => {
      return <FormCard key={value} name={value} cardClassName="value-card" />;
    });

    return valueCards;

    // return <Card className="right-part">{valueCards}</Card>;
  }

  function FormCard({ name, cardClassName }: any) {
    return (
      <Card key={name} className={cardClassName}>
        {name}
      </Card>
    );
  }

  return (
    <>
      <Card className="card-header">
        <Button
          className="teacher-button back-button"
          icon={<ArrowLeftOutlined />}
          onClick={goBackToAllTeachers}
        />
        <Avatar className="avatar" size={96} icon={<UserOutlined />} />
      </Card>
      <AllData />
    </>
  );
}
