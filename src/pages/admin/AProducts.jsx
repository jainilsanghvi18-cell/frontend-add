import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: 1, name: "Modern Velvet Sofa", category: "Living Room", price: 899, stock: 12, status: "In Stock", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070", sku: "FUR-001" },
  { id: 2, name: "Oak Dining Table", category: "Dining", price: 450.5, stock: 5, status: "Low Stock", image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=2400", sku: "FUR-002" },
  { id: 3, name: "Ergonomic Office Chair", category: "Office", price: 299.99, stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000", sku: "FUR-003" },
  { id: 4, name: "Minimalist Bed Frame", category: "Bedroom", price: 599, stock: 24, status: "In Stock", image: "https://images.unsplash.com/photo-1505693416388-b0346efee539?auto=format&fit=crop&q=80&w=1000", sku: "FUR-004" },
  { id: 5, name: "Wooden Coffee Table", category: "Living Room", price: 159, stock: 8, status: "Low Stock", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1000", sku: "FUR-005" },
];

const STATUS = {
  "In Stock": { color: "text-green-600 bg-green-50", icon: <CheckCircle2 className="w-4 h-4 mr-1" /> },
  "Low Stock": { color: "text-orange-600 bg-orange-50", icon: <AlertCircle className="w-4 h-4 mr-1" /> },
  "Out of Stock": { color: "text-red-600 bg-red-50", icon: <XCircle className="w-4 h-4 mr-1" /> },
};

const ProductRow = React.memo(({ product }) => {
  const { color, icon } = STATUS[product.status] || { color: "text-gray-600 bg-gray-50" };
  return (
    <tr className="group hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg border shadow-sm object-cover" />
          <div>
            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">{product.name}</h4>
            <p className="text-xs text-gray-500">SKU: {product.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border">{product.category}</span>
      </td>
      <td className="px-6 py-4"><span className="text-sm font-semibold">{product.price.toFixed(2)}</span></td>
      <td className="px-6 py-4"><span className="text-sm text-gray-600">{product.stock} units</span></td>
      <td className="px-6 py-4">
        <div className={`flex items-center w-fit px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
          {icon}{product.status}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
          {[Eye, Edit, Trash2].map((Icon, i) => (
            <button key={i} className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
});

export default function AProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() =>
    DUMMY_PRODUCTS.filter(p =>
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || p.category === selectedCategory)
    ), [searchTerm, selectedCategory]);

  const stats = useMemo(() => ({
    total: DUMMY_PRODUCTS.length,
    inStock: DUMMY_PRODUCTS.filter(p => p.status === 'In Stock').length,
    lowOutOfStock: DUMMY_PRODUCTS.filter(p => p.status !== 'In Stock').length
  }), []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
          <p className="text-gray-500 mt-1">Manage your inventory and catalog</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Products", value: stats.total, icon: <Package className="w-8 h-8" />, color: "bg-indigo-50 text-indigo-600" },
          { label: "In Stock", value: stats.inStock, icon: <CheckCircle2 className="w-8 h-8" />, color: "bg-green-50 text-green-600" },
          { label: "Low/Out of Stock", value: stats.lowOutOfStock, icon: <AlertCircle className="w-8 h-8" />, color: "bg-red-50 text-red-600" },
        ].map(({ label, value, icon, color }, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder-gray-400 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <select
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {["All", "Living Room", "Dining", "Bedroom", "Office"].map((cat) => (
                <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
              ))}
            </select>
            <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((head, i) => (
                  <th key={i} className={`px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${head === "Actions" ? "text-right" : ""}`}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-2xl">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> results
          </p>
          <div className="flex gap-2">
            {["Previous", "Next"].map((btn, i) => (
              <button key={i} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}