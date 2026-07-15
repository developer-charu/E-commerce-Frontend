import React, { useState } from "react";
import { Button, Tag, Modal, Form, Input, message } from "antd";
import { AiOutlinePlus, AiOutlineHome, AiOutlineDelete } from "react-icons/ai";
import { AccountLayout } from "./AccountLayout.tsx";
import { MOCK_ADDRESSES } from "../../../mock/ecommerceMockData.ts";
import type { Address } from "../../../types/ecommerce.types.ts";

export const AddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddAddress = (values: Omit<Address, "id" | "isDefault">) => {
    const newAddress: Address = {
      ...values,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newAddress]);
    setIsAddModalOpen(false);
    form.resetFields();
    message.success("Address added successfully (Demo)");
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    message.info("Address removed (Demo)");
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    message.success("Default address updated");
  };

  return (
    <AccountLayout>
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
          <p className="text-sm text-gray-500">Manage delivery addresses for faster checkout</p>
        </div>
        <Button
          type="primary"
          icon={<AiOutlinePlus />}
          style={{ backgroundColor: "#059669", borderColor: "#059669" }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 rounded-xl border relative flex flex-col justify-between transition-colors ${
              addr.isDefault
                ? "border-emerald-600 bg-emerald-50/20"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AiOutlineHome className="text-emerald-700" size={18} />
                  <span className="font-semibold text-gray-900 text-sm">{addr.name}</span>
                </div>
                {addr.isDefault ? (
                  <Tag color="emerald">Default</Tag>
                ) : (
                  <Button
                    size="small"
                    type="link"
                    onClick={() => handleSetDefault(addr.id)}
                    style={{ padding: 0 }}
                  >
                    Set as default
                  </Button>
                )}
              </div>

              <div className="text-sm text-gray-600 space-y-0.5 leading-relaxed">
                <div>{addr.street}</div>
                <div>
                  {addr.city}, {addr.state} {addr.postalCode}
                </div>
                <div>{addr.country}</div>
                <div className="text-xs text-gray-500 pt-1">Phone: {addr.phone}</div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-gray-100 flex justify-end">
              <Button
                type="text"
                danger
                size="small"
                icon={<AiOutlineDelete />}
                onClick={() => handleDelete(addr.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      <Modal
        title="Add New Delivery Address"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddAddress} className="mt-4">
          <Form.Item
            name="name"
            label="Address Title"
            rules={[{ required: true, message: "e.g. Home, Office" }]}
          >
            <Input placeholder="Home, Office, etc." />
          </Form.Item>
          <Form.Item
            name="street"
            label="Street Address"
            rules={[{ required: true, message: "Please input street address" }]}
          >
            <Input placeholder="Street name and number" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="state"
              label="State / Province"
              rules={[{ required: true, message: "State is required" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="postalCode"
              label="Postal Code"
              rules={[{ required: true, message: "Postal code is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Input defaultValue="United States" />
            </Form.Item>
          </div>
          <Form.Item
            name="phone"
            label="Contact Phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#059669", borderColor: "#059669" }}
            >
              Add Address
            </Button>
          </div>
        </Form>
      </Modal>
    </AccountLayout>
  );
};

export default AddressesPage;

