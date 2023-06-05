import { useContext, useEffect, useRef, useState } from 'react';
import { IGrade, IStudent } from '../../../../interfaces/interfaces';
import { Button, Card, Form, FormInstance, Input, InputRef, Modal, Table } from 'antd';
import React from 'react';

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  studentId: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
  day7: string;
  day8: string;
  day9: string;
  day10: string;
  day11: string;
  day12: string;
  day13: string;
  day14: string;
  day15: string;
  day16: string;
  day17: string;
  day18: string;
  day19: string;
  day20: string;
  day21: string;
  day22: string;
  day23: string;
  day24: string;
  day25: string;
  day26: string;
  day27: string;
  day28: string;
  day29: string;
  day30: string;
  day31: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  // eslint-disable-next-line no-unused-vars
  handleSave: (record: Item, values: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values }, values);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface GradesTableProps {
  monthIndex: string;
  students: IStudent[];
  subjectId: string;
}

interface IStudentGrade extends IStudent {
  grades: IGrade[];
}

export function GradesTable({ monthIndex, students, subjectId }: GradesTableProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudent | null>(null);
  const [pickedStudentTotalGrade, setPickedStudentTotalGrade] = useState(0);
  const [pickedStudentTotalSkips, setPickedStudentTotalSkips] = useState(0);

  async function getStudentGrades(studentId: string) {
    const response = await fetch(
      `/api/grades?studentId=${studentId}&monthIndex=${monthIndex}&subjectId=${subjectId}`
    );
    const gradesData: IGrade[] = await response.json();
    return gradesData;
  }

  useEffect(() => {
    const fetchStudentGrades = async () => {
      const gradesPromises = students.map((student) => getStudentGrades(student.studentId));
      const gradesData = await Promise.all(gradesPromises);
      const studentsWithGrades = students.map((student, index) => ({
        ...student,
        grades: gradesData[index]
      }));

      setInitialStudentGrades(studentsWithGrades);
    };

    if (students.length > 0) {
      fetchStudentGrades();
    }
  }, [students]);

  function setInitialStudentGrades(studentsWithGrades: IStudentGrade[]) {
    const studentsGradesData = [];
    let counter = 0;
    for (const studentWithGrades of studentsWithGrades) {
      const studentGradesDataObj: any = {
        key: counter,
        studentId: studentWithGrades.studentId,
        name: `${studentWithGrades.surname} ${studentWithGrades.name}`
      };

      if (studentWithGrades.grades.length > 0) {
        for (let i = 0; i < 31; i++) {
          if (studentWithGrades.grades[i]?.value) {
            const date = new Date(studentWithGrades.grades[i]?.date);
            const dayIndex = date.getDate();

            studentGradesDataObj[`day${dayIndex}`] = studentWithGrades.grades[i]?.value;
          }
        }
        for (let i = 0; i < 31; i++) {
          if (!studentGradesDataObj[`day${i + 1}`]) studentGradesDataObj[`day${i + 1}`] = '-';
        }
      } else {
        for (let i = 0; i < 31; i++) {
          studentGradesDataObj[`day${i + 1}`] = '-';
        }
      }

      studentsGradesData.push(studentGradesDataObj);
      counter++;
    }

    setDataSource(studentsGradesData);
  }

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'name',
      dataIndex: 'name',
      width: 150,
      align: 'center',
      render: (text, record: any) => (
        <Button
          className="student-button"
          onClick={async () => {
            await handlePickedStudent(record.studentId);
            setIsModalOpen(true);
          }}>
          {text}
        </Button>
      )
    },
    {
      title: 'Day 1',
      dataIndex: 'day1',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 2',
      dataIndex: 'day2',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 3',
      dataIndex: 'day3',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 4',
      dataIndex: 'day4',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 5',
      dataIndex: 'day5',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 6',
      dataIndex: 'day6',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 7',
      dataIndex: 'day7',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 8',
      dataIndex: 'day8',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 9',
      dataIndex: 'day9',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 10',
      dataIndex: 'day10',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 11',
      dataIndex: 'day11',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 12',
      dataIndex: 'day12',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 13',
      dataIndex: 'day13',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 14',
      dataIndex: 'day14',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 15',
      dataIndex: 'day15',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 16',
      dataIndex: 'day16',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 17',
      dataIndex: 'day17',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 18',
      dataIndex: 'day18',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 19',
      dataIndex: 'day19',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 20',
      dataIndex: 'day20',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 21',
      dataIndex: 'day21',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 22',
      dataIndex: 'day22',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 23',
      dataIndex: 'day23',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 24',
      dataIndex: 'day24',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 25',
      dataIndex: 'day25',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 26',
      dataIndex: 'day26',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 27',
      dataIndex: 'day27',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 28',
      dataIndex: 'day28',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 29',
      dataIndex: 'day29',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 30',
      dataIndex: 'day30',
      editable: true,
      width: 80,
      align: 'center'
    },
    {
      title: 'Day 31',
      dataIndex: 'day31',
      editable: true,
      width: 80,
      align: 'center'
    }
  ];

  async function handlePickedStudent(studentId: string) {
    const response = await fetch(`/api/students/${studentId}`);
    const responseData = await response.json();

    const response2 = await fetch(
      `/api/grades/total-grade?studentId=${studentId}&subjectId=${subjectId}`
    );
    const responseData2 = await response2.json();

    const response3 = await fetch(
      `/api/grades/skips?studentId=${studentId}&subjectId=${subjectId}`
    );
    const responseData3 = await response3.json();

    setPickedStudent(responseData);
    setPickedStudentTotalGrade(responseData2);
    setPickedStudentTotalSkips(responseData3);
  }

  function updateStudentGrades(
    studentId: string,
    subjectId: string,
    formattedDate: string,
    newValue: string
  ) {
    fetch(`/api/grades/params?studentId=${studentId}&subjectId=${subjectId}&date=${formattedDate}`)
      .then((response) => response.text())
      .then((gradeId) => {
        if (gradeId === '') {
          addStudentGrade(studentId, subjectId, formattedDate, newValue);
        } else {
          updateStudentGrade(gradeId, newValue);
        }
      });
  }

  function addStudentGrade(
    studentId: string,
    subjectId: string,
    formattedDate: string,
    newValue: string
  ) {
    if (newValue !== 'a' && newValue !== '-' && !Number(newValue)) {
      return 'Incorrect grade value';
    }

    fetch(`/api/grades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: newValue,
        studentId,
        subjectId,
        date: formattedDate
      })
    });
  }

  function updateStudentGrade(gradeId: string, newValue: string) {
    if (newValue !== 'a' && newValue !== '-' && !Number(newValue)) {
      return 'Incorrect grade value';
    }

    if (newValue !== '-') {
      fetch(`/api/grades/${gradeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: newValue
        })
      });
    } else {
      fetch(`/api/grades/${gradeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  const handleSave = (row: DataType, values: any) => {
    const year = 2023;
    const month = Number(monthIndex) - 1;
    const day = Number(Object.keys(values)[0].substring(3));
    const dateToUpdate = new Date(year, month, day);
    const formattedDate = dateToUpdate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const studentId = row.studentId;
    const newValue = String(Object.values(values)[0]);

    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
    updateStudentGrades(studentId, subjectId, formattedDate, newValue);
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });

  function CustomCardRow({ currValue, student, totalGrade, skips }: any) {
    const keys = [
      'First name',
      'Second name',
      'Email',
      'Phone number',
      'Secondary phone',
      'Description',
      'Total subject grade',
      'Number of skips'
    ];

    const values = [
      student!.name,
      student!.surname,
      student!.email,
      student!.phoneNumber,
      student!.phoneNumber2 ?? 'No secondary phone',
      student!.description ?? 'No description',
      totalGrade,
      skips
    ];

    return (
      <Card className="card-row">
        <Card.Grid hoverable={false} className="key-card key-card-small">
          {keys[currValue]}
        </Card.Grid>
        <Card.Grid hoverable={false} className="value-card value-card-small">
          {values[currValue]}
        </Card.Grid>
      </Card>
    );
  }

  const ModalWindowData = (
    <Card className="form-card form-card-small">
      <CustomCardRow
        currValue={0}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
      <CustomCardRow
        currValue={1}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
      <CustomCardRow
        currValue={2}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
      <CustomCardRow
        currValue={3}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
      <CustomCardRow
        currValue={4}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
      <CustomCardRow
        currValue={5}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
      <CustomCardRow
        currValue={6}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
      <CustomCardRow
        currValue={7}
        student={pickedStudent}
        totalGrade={pickedStudentTotalGrade}
        skips={pickedStudentTotalSkips}
      />
    </Card>
  );

  return (
    <div>
      <Table
        // size="small"
        className="grades-table"
        scroll={{ x: 'max-content', y: '60vh' }}
        pagination={false}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      <Modal
        title="Student info"
        open={isModalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        footer={[
          <Button key="ok" type="primary" onClick={closeModal}>
            OK
          </Button>
        ]}>
        {ModalWindowData}
      </Modal>
    </div>
  );
}
