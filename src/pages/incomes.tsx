import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Popconfirm, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Income from "../types/income";

const Incomes = () => {
  const [incomes, setIncomes] = useState<Income[]>([
    { id: uuidv4(), name: "Salary", amount: 1234, date: "2022-05-03", editing: false },
    { id: uuidv4(), name: "Scholarship", amount: 300, date: "2022-05-08", editing: false },
  ]);

  const columns: ColumnType<Income>[] = [
    { title: "Name", dataIndex: "name", key: "name", align: "center" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${Number(amount).toFixed(2)}`,
      align: "center",
    },
    { title: "Date", dataIndex: "date", key: "date", align: "center" },
    {
      title: "Operations",
      align: "center",
      render: (_, income) => (
        <>
          <Button icon={<EditFilled />} type="primary" />{" "}
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteRow(income.id)}>
            <Button icon={<DeleteFilled />} type="primary" danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  const onDeleteRow = (id: string) => {
    setIncomes((incomes) => incomes.filter((income) => income.id !== id));
  };

  return (
    <>
      <Typography.Title>Incomes</Typography.Title>
      <Table<Income> columns={columns} dataSource={incomes} rowKey="id"></Table>
    </>
  );
};

export default Incomes;
