import { CloseOutlined, DeleteFilled, EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PaymentReminder from "../types/payment-reminder";

const PaymentReminders = () => {
  const [form] = Form.useForm();
  const [paymentReminders, setPaymentReminders] = useState<PaymentReminder[]>([
    { id: uuidv4(), name: "OnlyFans", amount: 10, date: "2022-05-22" },
  ]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isEditingAddedRow, setEditingAddedRow] = useState(false);

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
            <Input />
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
    const newRow: PaymentReminder = { id: uuidv4(), name: "", amount: 0, date: "" };
    setPaymentReminders((paymentReminders) => [...paymentReminders, newRow]);
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
      paymentReminders.map((paymentReminder) => (paymentReminder.id === id ? newRow : paymentReminder))
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
    </>
  );
};

export default PaymentReminders;
