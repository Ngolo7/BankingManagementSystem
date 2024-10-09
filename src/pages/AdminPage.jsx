import React from "react";
import AdminPanel from "../components/AdminPanel";

const AdminPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminPanel />
    </div>
  );
};

export default AdminPage;
