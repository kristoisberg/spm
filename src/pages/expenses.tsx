import { CloseOutlined, DeleteFilled, EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "../types/expense";

const Expenses = () => {
  const [form] = Form.useForm();
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: uuidv4(), name: "OnlyFans", amount: 10, date: "2022-05-22" },
  ]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isEditingAddedRow, setEditingAddedRow] = useState(false);

  const columns: ColumnType<Expense>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, expense) => {
        if (editingRowId !== expense.id) {
          return name;
        }
        return (
          <Form.Item
            style={{
              margin: 0,
            }}
            name="name"
            rules={[
              {
                required: true,
                message: `Name is required.`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        );
      },
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, expense) => {
        if (editingRowId !== expense.id) {
          return `$${Number(amount).toFixed(2)}`;
        }
        return (
          <Form.Item
            style={{
              margin: 0,
            }}
            name="amount"
            rules={[
              {
                required: true,
                message: `Amount is required.`,
              },
            ]}
          >
            <InputNumber prefix="$" />
          </Form.Item>
        );
      },
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date, expense) => {
        if (editingRowId !== expense.id) {
          return date;
        }
        return (
          <Form.Item
            style={{
              margin: 0,
            }}
            name="date"
            rules={[
              {
                required: true,
                message: `Date is required.`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        );
      },
      align: "center",
    },
    {
      title: "Operations",
      align: "right",
      render: (_, expense) =>
        editingRowId === null ? (
          <>
            <Button icon={<EditFilled />} type="primary" onClick={() => onStartEditingRow(expense)} />{" "}
            <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteRow(expense.id)}>
              <Button icon={<DeleteFilled />} type="primary" danger />
            </Popconfirm>
          </>
        ) : editingRowId === expense.id ? (
          <>
            <Button icon={<SaveFilled />} type="primary" onClick={() => onEditRow(editingRowId)} />{" "}
            <Button icon={<CloseOutlined />} type="primary" danger onClick={() => onCancelEditingRow()} />
          </>
        ) : (
          <></>
        ),
    },
  ];

  const onAddRow = () => {
    const newRow: Expense = { id: uuidv4(), name: "", amount: 0, date: "" };
    setExpenses((expenses) => [...expenses, newRow]);
    setEditingRowId(newRow.id);
    setEditingAddedRow(true);
  };

  const onStartEditingRow = (row: Expense) => {
    form.setFieldsValue(row);
    setEditingRowId(row.id);
  };

  const onEditRow = async (id: string) => {
    const newRow = await form.validateFields();
    setExpenses((expenses) => expenses.map((expense) => (expense.id === id ? newRow : expense)));
    setEditingRowId(null);
  };

  const onCancelEditingRow = () => {
    if (isEditingAddedRow && editingRowId) {
      setEditingAddedRow(false);
      onDeleteRow(editingRowId);
    }
    setEditingRowId(null);
  };

  const onDeleteRow = (id: string) => {
    setExpenses((expenses) => expenses.filter((expense) => expense.id !== id));
  };

  return (
    <>
      <Typography.Title>Expenses</Typography.Title>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ marginBottom: "1em", float: "right" }}
        onClick={() => onAddRow()}
      >
        New Expense
      </Button>
      <Form form={form} component={false}>
        <Table<Expense>
          columns={columns}
          dataSource={expenses}
          rowKey="id"
          pagination={{
            onChange: onCancelEditingRow,
          }}
        ></Table>
      </Form>
    </>
  );
};

export default Expenses;
