import { CloseOutlined, DeleteFilled, EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Income from "../types/income";

const Incomes = () => {
  const [form] = Form.useForm();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(["Salary", "Scholarship", "Illegal activities"]);
  const [incomes, setIncomes] = useState<Income[]>([
    { id: uuidv4(), name: "Salary", category: "Salary", amount: 1234, date: "2022-05-03" },
    { id: uuidv4(), name: "Scholarship", category: "Scholarship", amount: 300, date: "2022-05-08" },
  ]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isEditingAddedRow, setEditingAddedRow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const columns: ColumnType<Income>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, income) => {
        if (editingRowId !== income.id) {
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
      render: (amount, income) => {
        if (editingRowId !== income.id) {
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
      render: (category, income) => {
        if (editingRowId !== income.id) {
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
      render: (date, income) => {
        if (editingRowId !== income.id) {
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
            <Input placeholder="Date" />
          </Form.Item>
        );
      },
      align: "center",
    },
    {
      title: "Operations",
      align: "right",
      render: (_, income) =>
        editingRowId === null ? (
          <>
            <Button icon={<EditFilled />} type="primary" onClick={() => onStartEditingRow(income)} />{" "}
            <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteRow(income.id)}>
              <Button icon={<DeleteFilled />} type="primary" danger />
            </Popconfirm>
          </>
        ) : editingRowId === income.id ? (
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
    const newRow: Income = { id: uuidv4(), name: "", category: "", amount: 0, date: "" };
    setIncomes((incomes) => [...incomes, newRow]);
    form.setFieldsValue(newRow);
    setEditingRowId(newRow.id);
    setEditingAddedRow(true);
  };

  const onStartEditingRow = (row: Income) => {
    form.setFieldsValue(row);
    setEditingRowId(row.id);
  };

  const onEditRow = async (id: string) => {
    const newRow = await form.validateFields();
    setIncomes((incomes) => incomes.map((income) => (income.id === id ? { ...income, ...newRow } : income)));
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
    setIncomes((incomes) => incomes.filter((income) => income.id !== id));
  };

  return (
    <>
      <Typography.Title>Incomes</Typography.Title>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ marginBottom: "1em", float: "right" }}
        onClick={() => onAddRow()}
      >
        New Income
      </Button>
      <Form form={form} component={false}>
        <Table<Income>
          columns={columns}
          dataSource={incomes}
          rowKey="id"
          pagination={{
            onChange: onCancelEditingRow,
          }}
        />
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

export default Incomes;
