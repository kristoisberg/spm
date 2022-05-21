import { Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import Expense from "../types/expense";

const COLUMNS: ColumnType<Expense>[] = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
];

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([{ name: "OnlyFans", amount: 10 }]);

  return (
    <>
      <Typography.Title>Expenses</Typography.Title>
      <Table<Expense> columns={COLUMNS} dataSource={expenses}></Table>
    </>
  );
};

export default Expenses;
