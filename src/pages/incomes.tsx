import { CloseOutlined, DeleteFilled, EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Popconfirm, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Income from "../types/income";

const Incomes = () => {
  const [incomes, setIncomes] = useState<Income[]>([
    { id: uuidv4(), name: "Salary", amount: 1234, date: "2022-05-03" },
    { id: uuidv4(), name: "Scholarship", amount: 300, date: "2022-05-08" },
  ]);
  const [editingRow, setEditingRow] = useState<Income | null>(null);

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
      align: "right",
      render: (_, income) =>
        editingRow === null ? (
          <>
            <Button icon={<EditFilled />} type="primary" onClick={() => setEditingRow(income)} />{" "}
            <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteRow(income.id)}>
              <Button icon={<DeleteFilled />} type="primary" danger />
            </Popconfirm>
          </>
        ) : editingRow.id === income.id ? (
          <>
            <Button icon={<SaveFilled />} type="primary" onClick={() => onEditRow(editingRow)} />{" "}
            <Button icon={<CloseOutlined />} type="primary" danger onClick={() => setEditingRow(null)} />
          </>
        ) : (
          <></>
        ),
    },
  ];

  const onEditRow = (row: Income) => {
    setIncomes((incomes) => incomes.map((income) => (income.id === row.id ? row : income)));
    setEditingRow(null);
  };

  const onDeleteRow = (id: string) => {
    setIncomes((incomes) => incomes.filter((income) => income.id !== id));
  };

  return (
    <>
      <Typography.Title>Incomes</Typography.Title>
      <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: "1em", float: "right" }}>
        New income
      </Button>
      <Table<Income> columns={columns} dataSource={incomes} rowKey="id" />
    </>
  );
};

export default Incomes;
