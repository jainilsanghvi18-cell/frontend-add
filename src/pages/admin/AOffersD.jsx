import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Tag,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  Percent
} from 'lucide-react';

const DUMMY_OFFERS = [
  {
    id: 1,
    name: "Summer Sale 2026",
    code: "SUMMER2026",
    discount: 25,
    discountType: "percentage",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    status: "Active",
    usageCount: 145,
    usageLimit: 500,
    minPurchase: 100.00
  },
  {
    id: 2,
    name: "New Year Clearance",
    code: "NEWYEAR50",
    discount: 50,
    discountType: "fixed",
    startDate: "2026-01-01",
    endDate: "2026-01-15",
    status: "Active",
    usageCount: 89,
    usageLimit: 200,
    minPurchase: 200.00
  },
  {
    id: 3,
    name: "Black Friday Mega Sale",
    code: "BLACKFRI40",
    discount: 40,
    discountType: "percentage",
    startDate: "2025-11-25",
    endDate: "2025-11-30",
    status: "Expired",
    usageCount: 567,
    usageLimit: 1000,
    minPurchase: 50.00
  },
  {
    id: 4,
    name: "First Time Buyer",
    code: "WELCOME15",
    discount: 15,
    discountType: "percentage",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "Active",
    usageCount: 234,
    usageLimit: null,
    minPurchase: 0
  },
  {
    id: 5,
    name: "VIP Member Exclusive",
    code: "VIP30OFF",
    discount: 30,
    discountType: "percentage",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    status: "Scheduled",
    usageCount: 0,
    usageLimit: 100,
    minPurchase: 150.00
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'text-green-600 bg-green-50';
    case 'Scheduled': return 'text-blue-600 bg-blue-50';
    case 'Expired': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Active': return <CheckCircle2 className="w-4 h-4 mr-1" />;
    case 'Scheduled': return <Calendar className="w-4 h-4 mr-1" />;
    case 'Expired': return <XCircle className="w-4 h-4 mr-1" />;
    default: return null;
  }
};

const OfferRow = React.memo(({ offer }) => (
  <tr className="group hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-100 shrink-0">
          <Tag className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{offer.name}</h4>
          <p className="text-xs text-gray-500">Code: {offer.code}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-1.5">
        <Percent className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">
          {offer.discountType === 'percentage' ? `${offer.discount}%` : `$${offer.discount}`}
        </span>
        <span className="text-xs text-gray-500">
          {offer.discountType === 'percentage' ? 'off' : 'flat'}
        </span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="text-sm text-gray-600">
        <p className="font-medium">{new Date(offer.startDate).toLocaleDateString()}</p>
        <p className="text-xs text-gray-400">to {new Date(offer.endDate).toLocaleDateString()}</p>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="text-sm text-gray-600">
        <p className="font-medium">{offer.usageCount} used</p>
        <p className="text-xs text-gray-400">
          {offer.usageLimit ? `of ${offer.usageLimit} limit` : 'Unlimited'}
        </p>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className="text-sm text-gray-600">
        {offer.minPurchase > 0 ? `$${offer.minPurchase.toFixed(2)}` : 'No minimum'}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className={`flex items-center w-fit px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(offer.status).replace('bg-', 'border-').replace('text-', 'border-opacity-20 ')} ${getStatusColor(offer.status)}`}>
        {getStatusIcon(offer.status)}
        {offer.status}
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" title="View Details">
          <Eye className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="Edit">
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Delete">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
));

export default function AOffersD() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredOffers = useMemo(() => {
    return DUMMY_OFFERS.filter(offer => {
      const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || offer.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const stats = useMemo(() => ({
    total: DUMMY_OFFERS.length,
    active: DUMMY_OFFERS.filter(o => o.status === 'Active').length,
    scheduled: DUMMY_OFFERS.filter(o => o.status === 'Scheduled').length,
    expired: DUMMY_OFFERS.filter(o => o.status === 'Expired').length
  }), []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Offers & Discounts</h1>
          <p className="text-gray-500 mt-1">Manage promotional codes and special offers</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
          <Plus className="w-5 h-5" />
          Create New Offer
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <Tag className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Offers</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-green-50 rounded-xl text-green-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Scheduled</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.scheduled}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-red-50 rounded-xl text-red-600">
            <XCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Expired</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.expired}</h3>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search offers by name or code..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder-gray-400 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <select
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Expired">Expired</option>
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
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Offer Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Valid Period</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Min Purchase</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOffers.map((offer) => (
                <OfferRow key={offer.id} offer={offer} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOffers.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Tag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">No offers found</h3>
            <p className="mt-1">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination (Simple) */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-2xl">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filteredOffers.length}</span> results
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
