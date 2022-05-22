import { CloseOutlined, DeleteFilled, EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "../types/expense";

const Expenses = () => {
  const [form] = Form.useForm();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(["Subscription", "Groceries"]);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: uuidv4(), name: "Groceries", category: "Groceries", amount: 10, date: "2022-05-21" },
  ]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isEditingAddedRow, setEditingAddedRow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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
            <Input placeholder="Name" />
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
            <InputNumber placeholder="Amount" prefix="$" />
          </Form.Item>
        );
      },
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category, expense) => {
        if (editingRowId !== expense.id) {
          return category;
        }
        return (
          <Form.Item
            style={{
              margin: 0,
            }}
            name="category"
            rules={[
              {
                required: true,
                message: `Category is required.`,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Category"
              style={{ textAlign: "left" }}
              onSelect={(category: string) => category === "null" && form.setFieldsValue({ category: "" })}
            >
              {categories.map((category) => (
                <Select.Option key={category}>{category}</Select.Option>
              ))}
              <Select.Option key={null}>
                <Button icon={<PlusOutlined />} type="primary" block onClick={() => setModalVisible(true)}>
                  New Category
                </Button>
              </Select.Option>
            </Select>
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
              {
                pattern: /^(\d{4})-(\d{2})-(\d{2})$/,
                message: "Date must be in the format of YYYY-MM-DD.",
              },
            ]}
          >
            <Input placeholder="Date" />
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
    const newRow: Expense = { id: uuidv4(), name: "", category: "", amount: 0, date: "" };
    setExpenses((expenses) => [...expenses, newRow]);
    form.setFieldsValue(newRow);
    setEditingRowId(newRow.id);
    setEditingAddedRow(true);
  };

  const onStartEditingRow = (row: Expense) => {
    form.setFieldsValue(row);
    setEditingRowId(row.id);
  };

  const onEditRow = async (id: string) => {
    const newRow = await form.validateFields();
    setExpenses((expenses) => expenses.map((expense) => (expense.id === id ? { ...expense, ...newRow } : expense)));
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
      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onOk={() => {
          if (newCategory === "" || newCategory === "null") {
            message.error("Enter a name for the category!");
          } else {
            setCategories((categories) => [...categories, newCategory]);
            form.setFieldsValue({ category: newCategory });
            setNewCategory("");
            setModalVisible(false);
          }
        }}
        onCancel={() => {
          setNewCategory("");
          setModalVisible(false);
        }}
      >
        <Input
          placeholder="Category Name"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
        />
      </Modal>
    </>
  );
};

export default Expenses;
