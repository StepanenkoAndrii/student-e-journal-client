import { useContext, useEffect, useRef, useState } from 'react';
import { IGrade, IStudent } from '../../../../interfaces/interfaces';
import { Form, FormInstance, Input, InputRef, Table } from 'antd';
import React from 'react';

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
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
  handleSave: (record: Item) => void;
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
      handleSave({ ...record, ...values });
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

interface IStudentGrade {
  studentId: string;
  grades: IGrade[];
}

export function GradesTable({ monthIndex, students, subjectId }: GradesTableProps) {
  console.log(subjectId);

  const [studentGrades, setStudentGrades] = useState<IStudentGrade[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

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
      setStudentGrades(studentsWithGrades);
    };

    if (students.length > 0) {
      fetchStudentGrades();
    }
  }, [students]);

  // useEffect(() => {
  //   console.log('here');
  //   const studentGradesWithDate: any[] = [];
  //   if (isLoading) {
  //     const promises = students.map((student) => {
  //       return fetch(
  //         `/api/grades?studentId=${student.studentId}&monthIndex=${monthIndex}&subjectId=${subjectId}`
  //       )
  //         .then((response) => response.json())
  //         .then((gradesData: IGrade[]) => {
  //           console.log(gradesData);
  //           studentGradesWithDate.push({ grades: [...gradesData] });
  //         });
  //     });

  //     console.log(promises);

  //     Promise.all(promises).then(() => {
  //       console.log(studentGradesWithDate);
  //       setIsLoading(false);
  //       setGrades(studentGradesWithDate);
  //     });
  //   }
  // }, [grades, isLoading]);

  console.log(`grades`, studentGrades);

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'Edward King 0',
      day1: '9',
      day2: '-',
      day3: '4',
      day4: '5',
      day5: '-',
      day6: '6',
      day7: '9',
      day8: 'a',
      day9: '9',
      day10: 'a',
      day11: '6',
      day12: '9',
      day13: '10',
      day14: '-',
      day15: '7'
    },
    {
      key: '1',
      name: 'Edward King 1',
      day1: '6',
      day2: '8',
      day3: '-',
      day4: '6',
      day5: '8',
      day6: 'a',
      day7: 'a',
      day8: 'a',
      day9: '10',
      day10: '-',
      day11: '8',
      day12: '9',
      day13: '9',
      day14: '-',
      day15: 'a'
    },
    {
      key: '2',
      name: 'Edward King 2',
      day1: '9',
      day2: '-',
      day3: '4',
      day4: '5',
      day5: '-',
      day6: '6',
      day7: '9',
      day8: 'a',
      day9: '9',
      day10: 'a',
      day11: '6',
      day12: '9',
      day13: '10',
      day14: '-',
      day15: '7'
    },
    {
      key: '3',
      name: 'Edward King 3',
      day1: '6',
      day2: '8',
      day3: '-',
      day4: '6',
      day5: '8',
      day6: 'a',
      day7: 'a',
      day8: 'a',
      day9: '10',
      day10: '-',
      day11: '8',
      day12: '9',
      day13: '9',
      day14: '-',
      day15: 'a'
    },
    {
      key: '4',
      name: 'Edward King 4',
      day1: '9',
      day2: '-',
      day3: '4',
      day4: '5',
      day5: '-',
      day6: '6',
      day7: '9',
      day8: 'a',
      day9: '9',
      day10: 'a',
      day11: '6',
      day12: '9',
      day13: '10',
      day14: '-',
      day15: '7'
    },
    {
      key: '5',
      name: 'Edward King 5',
      day1: '6',
      day2: '8',
      day3: '-',
      day4: '6',
      day5: '8',
      day6: 'a',
      day7: 'a',
      day8: 'a',
      day9: '10',
      day10: '-',
      day11: '8',
      day12: '9',
      day13: '9',
      day14: '-',
      day15: 'a'
    },
    {
      key: '6',
      name: 'Edward King 6',
      day1: '9',
      day2: '-',
      day3: '4',
      day4: '5',
      day5: '-',
      day6: '6',
      day7: '9',
      day8: 'a',
      day9: '9',
      day10: 'a',
      day11: '6',
      day12: '9',
      day13: '10',
      day14: '-',
      day15: '7'
    },
    {
      key: '7',
      name: 'Edward King 7',
      day1: '6',
      day2: '8',
      day3: '-',
      day4: '6',
      day5: '8',
      day6: 'a',
      day7: 'a',
      day8: 'a',
      day9: '10',
      day10: '-',
      day11: '8',
      day12: '9',
      day13: '9',
      day14: '-',
      day15: 'a'
    },
    {
      key: '8',
      name: 'Edward King 8',
      day1: '9',
      day2: '-',
      day3: '4',
      day4: '5',
      day5: '-',
      day6: '6',
      day7: '9',
      day8: 'a',
      day9: '9',
      day10: 'a',
      day11: '6',
      day12: '9',
      day13: '10',
      day14: '-',
      day15: '7'
    },
    {
      key: '9',
      name: 'Edward King 9',
      day1: '6',
      day2: '8',
      day3: '-',
      day4: '6',
      day5: '8',
      day6: 'a',
      day7: 'a',
      day8: 'a',
      day9: '10',
      day10: '-',
      day11: '8',
      day12: '9',
      day13: '9',
      day14: '-',
      day15: 'a'
    },
    {
      key: '10',
      name: 'Edward King 10',
      day1: '9',
      day2: '-',
      day3: '4',
      day4: '5',
      day5: '-',
      day6: '6',
      day7: '9',
      day8: 'a',
      day9: '9',
      day10: 'a',
      day11: '6',
      day12: '9',
      day13: '10',
      day14: '-',
      day15: '7'
    },
    {
      key: '11',
      name: 'Edward King 11',
      day1: '6',
      day2: '8',
      day3: '-',
      day4: '6',
      day5: '8',
      day6: 'a',
      day7: 'a',
      day8: 'a',
      day9: '10',
      day10: '-',
      day11: '8',
      day12: '9',
      day13: '9',
      day14: '-',
      day15: 'a'
    },
    {
      key: '12',
      name: 'Edward King 12',
      day1: '9',
      day2: '-',
      day3: '4',
      day4: '5',
      day5: '-',
      day6: '6',
      day7: '9',
      day8: 'a',
      day9: '9',
      day10: 'a',
      day11: '6',
      day12: '9',
      day13: '10',
      day14: '-',
      day15: '7'
    },
    {
      key: '13',
      name: 'Edward King 13',
      day1: '6',
      day2: '8',
      day3: '-',
      day4: '6',
      day5: '8',
      day6: 'a',
      day7: 'a',
      day8: 'a',
      day9: '10',
      day10: '-',
      day11: '8',
      day12: '9',
      day13: '9',
      day14: '-',
      day15: 'a'
    }
  ]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'name',
      dataIndex: 'name',
      width: 150,
      align: 'center'
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
    }
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
  };

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

  // return (
  //   <Card className="main-card card">
  //     <Tabs defaultActiveKey="1" items={months} onChange={onTabChange} />
  //   </Card>
  // );

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
    </div>
  );
}
