import { CloseOutlined, DeleteFilled, EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PaymentReminder from "../types/payment-reminder";

const PaymentReminders = () => {
  const [form] = Form.useForm();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(["Subscription", "Food"]);
  const [paymentReminders, setPaymentReminders] = useState<PaymentReminder[]>([
    { id: uuidv4(), name: "OnlyFans", category: "Subscription", amount: 10, date: "2022-05-22" },
  ]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isEditingAddedRow, setEditingAddedRow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const columns: ColumnType<PaymentReminder>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, paymentReminder) => {
        if (editingRowId !== paymentReminder.id) {
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
      render: (amount, paymentReminder) => {
        if (editingRowId !== paymentReminder.id) {
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
      render: (category, paymentReminder) => {
        if (editingRowId !== paymentReminder.id) {
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
      render: (date, paymentReminder) => {
        if (editingRowId !== paymentReminder.id) {
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
      render: (_, paymentReminder) =>
        editingRowId === null ? (
          <>
            <Button icon={<EditFilled />} type="primary" onClick={() => onStartEditingRow(paymentReminder)} />{" "}
            <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteRow(paymentReminder.id)}>
              <Button icon={<DeleteFilled />} type="primary" danger />
            </Popconfirm>
          </>
        ) : editingRowId === paymentReminder.id ? (
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
    const newRow: PaymentReminder = { id: uuidv4(), name: "", category: "", amount: 0, date: "" };
    setPaymentReminders((paymentReminders) => [...paymentReminders, newRow]);
    form.setFieldsValue(newRow);
    setEditingRowId(newRow.id);
    setEditingAddedRow(true);
  };

  const onStartEditingRow = (row: PaymentReminder) => {
    form.setFieldsValue(row);
    setEditingRowId(row.id);
  };

  const onEditRow = async (id: string) => {
    const newRow = await form.validateFields();
    setPaymentReminders((paymentReminders) =>
      paymentReminders.map((paymentReminder) =>
        paymentReminder.id === id ? { ...paymentReminder, ...newRow } : paymentReminder
      )
    );
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
    setPaymentReminders((paymentReminders) => paymentReminders.filter((paymentReminder) => paymentReminder.id !== id));
  };

  return (
    <>
      <Typography.Title>Payment Reminders</Typography.Title>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ marginBottom: "1em", float: "right" }}
        onClick={() => onAddRow()}
      >
        New Payment Reminder
      </Button>
      <Form form={form} component={false}>
        <Table<PaymentReminder>
          columns={columns}
          dataSource={paymentReminders}
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

export default PaymentReminders;
