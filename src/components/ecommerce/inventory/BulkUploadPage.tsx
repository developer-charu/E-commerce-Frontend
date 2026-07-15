import React, { useState } from "react";
import { Upload, Button, Alert, message, Card } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { AiOutlineUpload, AiOutlineFileExcel, AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { EComLayoutComponent } from "../layout/EComLayoutComponent.tsx";

const { Dragger } = Upload;

export const BulkUploadPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleProcessBulk = () => {
    if (fileList.length === 0) {
      message.warning("Please select a CSV or XLSX file first");
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      message.success(`Processed ${fileList[0].name}: 42 products imported successfully! (Demo)`);
      navigate("/inventory");
    }, 1500);
  };

  return (
    <EComLayoutComponent>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/inventory">
            <Button icon={<AiOutlineArrowLeft />} size="small">
              Back to Inventory
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bulk Product Upload</h1>
        </div>

        <Card className="rounded-xl border border-gray-200 shadow-2xs">
          <div className="mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Download Template</h3>
                <p className="text-xs text-gray-500">Ensure your CSV strictly follows our standard column schema</p>
              </div>
              <Button
                icon={<AiOutlineDownload />}
                size="small"
                onClick={() => message.info("Sample CSV template downloaded (Demo)")}
              >
                CSV Template
              </Button>
            </div>

            <Alert
              message="Required Columns: name, sku, brand, category, price, stockCount, description"
              type="info"
              showIcon
              className="mb-4 text-xs"
            />

            <Dragger
              fileList={fileList}
              accept=".csv,.xlsx,.xls"
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
              onRemove={() => setFileList([])}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <AiOutlineFileExcel size={40} className="text-emerald-600 mx-auto mb-2" />
              </p>
              <p className="ant-upload-text">Click or drag batch spreadsheet to this area</p>
              <p className="ant-upload-hint">Support for single .CSV or .XLSX files up to 10MB</p>
            </Dragger>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button onClick={() => navigate("/inventory")}>Cancel</Button>
            <Button
              type="primary"
              loading={uploading}
              icon={<AiOutlineUpload />}
              style={{ backgroundColor: "#059669", borderColor: "#059669" }}
              onClick={handleProcessBulk}
            >
              Start Bulk Import
            </Button>
          </div>
        </Card>
      </div>
    </EComLayoutComponent>
  );
};

export default BulkUploadPage;

