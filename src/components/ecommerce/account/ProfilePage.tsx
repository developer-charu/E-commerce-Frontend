import React, { useState } from "react";
import { Avatar, Button, Form, Input, Modal, message, Tag } from "antd";
import { AiOutlineEdit, AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { AccountLayout } from "./AccountLayout.tsx";
import { MOCK_USER_PROFILE } from "../../../mock/ecommerceMockData.ts";
import { useRole } from "../../../hooks/useRole.ts";

export const ProfilePage: React.FC = () => {
  const { role } = useRole();
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = (values: { name: string; email: string; phone: string }) => {
    setProfile((prev) => ({ ...prev, ...values }));
    setIsEditModalOpen(false);
    message.success("Profile updated successfully (Demo)");
  };

  return (
    <AccountLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-4">
          <Avatar
            size={72}
            style={{ backgroundColor: "#059669", color: "#fff", fontSize: 24, fontWeight: "bold" }}
          >
            {profile.name.charAt(0)}
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-500">Member since {profile.joinedDate}</p>
            <div className="mt-1">
              <Tag color="blue">Role: {role}</Tag>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          icon={<AiOutlineEdit />}
          style={{ backgroundColor: "#059669", borderColor: "#059669" }}
          onClick={() => {
            form.setFieldsValue(profile);
            setIsEditModalOpen(true);
          }}
        >
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            <AiOutlineUser /> Full Name
          </div>
          <div className="text-sm font-medium text-gray-900">{profile.name}</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            <AiOutlineMail /> Email Address
          </div>
          <div className="text-sm font-medium text-gray-900">{profile.email}</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            <AiOutlinePhone /> Phone Number
          </div>
          <div className="text-sm font-medium text-gray-900">{profile.phone}</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Account Status
          </div>
          <div className="text-sm font-medium text-emerald-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Verified & Active
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile Information"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} className="mt-4">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, type: "email", message: "Please input a valid email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please input your phone number" }]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#059669", borderColor: "#059669" }}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </AccountLayout>
  );
};

export default ProfilePage;

