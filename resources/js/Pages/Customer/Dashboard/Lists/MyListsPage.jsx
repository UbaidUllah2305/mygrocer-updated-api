import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import ListsTable from "./ListsTable";
import ListModal from "./ListModal";
import ViewListModal from "./ViewListModal";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

const MyListsPage = ({ auth }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewingList, setViewingList] = useState(null);
  const [deletingList, setDeletingList] = useState(null);

  const categories = ["Grocery", "Household", "Personal Care", "Snacks", "Beverages"];

  const lists = [
    {
      id: 1,
      name: "My Daily Grocery",
      details: "Eggs, Bread, Apples, Butter",
      actions: "edit",
    },
  ];

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
          My Lists
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#6F9C3D] text-white text-base md:text-lg rounded-lg hover:bg-[#5A7E2F] transition"
        >
          Add a new List
        </button>
      </div>

      {/* Styled Table */}
      <ListsTable
        lists={lists}
        onView={(list) => {
          setViewingList(list);
          setIsViewModalOpen(true);
        }}
        onEdit={(list) => {
          const productsArray = list.details.split(',').map(item => item.trim());
          setEditingList({ ...list, products: productsArray });
          setIsEditModalOpen(true);
        }}
        onDelete={(list) => {
          setDeletingList(list);
          setIsDeleteModalOpen(true);
        }}
      />

      {/* Modals */}
      <ListModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode="add"
        categories={categories}
      />
      <ListModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mode="edit"
        initialData={editingList}
        categories={categories}
      />
      <ViewListModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        list={viewingList}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          alert(`Deleted list: ${deletingList?.name}`);
          setIsDeleteModalOpen(false);
          setDeletingList(null);
        }}
        listName={deletingList?.name || ""}
      />
    </CustomerDashboardLayout>
  );
};

export default MyListsPage;