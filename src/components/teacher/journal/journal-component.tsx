import './journal-component.css';
import { Tabs, TabsProps, Card } from 'antd';
import { useEffect, useState } from 'react';
import { IGroup, IStudent } from '../../../interfaces/interfaces';
import { GradesTable } from './components/grades-table';

interface JournalComponentProps {
  subjectId: string;
  group: IGroup;
}

export function JournalComponent({ subjectId, group }: JournalComponentProps) {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [, setCurrentMonth] = useState('1');

  useEffect(() => {
    fetch(`/api/students?groupId=${group.groupId}`)
      .then((response) => response.json())
      .then((studentsData: IStudent[]) => {
        console.log(studentsData);
        setStudents(studentsData);
      })
      .catch((error) => console.log(`Error getting group students`, error));
  }, []);

  console.log(group, students);

  const months: TabsProps['items'] = [
    {
      key: '1',
      label: 'January',
      children: [
        <GradesTable key={'1'} monthIndex={'1'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '2',
      label: 'February',
      children: [
        <GradesTable key={'2'} monthIndex={'2'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '3',
      label: 'March',
      children: [
        <GradesTable key={'3'} monthIndex={'3'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '4',
      label: 'April',
      children: [
        <GradesTable key={'4'} monthIndex={'4'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '5',
      label: 'May',
      children: [
        <GradesTable key={'5'} monthIndex={'5'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '6',
      label: 'June',
      children: [
        <GradesTable key={'6'} monthIndex={'6'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '7',
      label: 'July',
      children: [
        <GradesTable key={'7'} monthIndex={'7'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '8',
      label: 'August',
      children: [
        <GradesTable key={'8'} monthIndex={'8'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '9',
      label: 'September',
      children: [
        <GradesTable key={'9'} monthIndex={'9'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '10',
      label: 'October',
      children: [
        <GradesTable key={'10'} monthIndex={'10'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '11',
      label: 'November',
      children: [
        <GradesTable key={'11'} monthIndex={'11'} students={students} subjectId={subjectId} />
      ]
    },
    {
      key: '12',
      label: 'December',
      children: [
        <GradesTable key={'12'} monthIndex={'12'} students={students} subjectId={subjectId} />
      ]
    }
  ];

  function onTabChange(key: string) {
    console.log(key);
    setCurrentMonth(key);
  }
  return (
    <Card className="main-card card">
      <Tabs defaultActiveKey="1" items={months} onChange={onTabChange} />
    </Card>
  );
}

// const data = students.map((student) => {
//   const studentGrades = grades.find((grade) => grade.studentId === student.id);
//   const gradeData: any = {
//     key: student.id,
//     name: student.name
//   };
//   if (studentGrades) {
//     for (let i = 0; i < 31; i++) {
//       gradeData[`day${i + 1}`] = studentGrades.grades[i] || '';
//     }
//   } else {
//     for (let i = 0; i < 31; i++) {
//       gradeData[`day${i + 1}`] = '';
//     }
//   }
//   return gradeData;
// });

// return (
//   <Card className="main-card card">
//     <Tabs defaultActiveKey="1" items={months} onChange={onTabChange} />
//     {/* {months.map((month) => (
//         <TabPane tab={month.name} key={month.id}>
//           <Table
//             columns={columns}
//             dataSource={data}
//             pagination={false}
//             bordered={true}
//             scroll={{ x: 3500, y: 1000 }}
//           />
//         </TabPane>
//       ))} */}
//     {/* </Tabs> */}
//   </Card>
// );
