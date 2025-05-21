
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Organization {
    id: number;
    mspName: string;
    state: { stateName: string };
    lga: { lgaName: string };
    position: { positionName: string };
    membership_plan: { membershipPlanName: string } | null;
    services: string;
    mspId: string;
    communityName: string;
}

interface MembershipPlan {
    membershipPlanId: number;
    membershipPlanName: string;
}

interface Position {
    positionId: number;
    positionName: string;
}

interface Props {
    msps: Organization[];
    memberships: MembershipPlan[];
    position: Position[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mechanized Service Providers',
        href: '/dashboard',
    },
];

export default function DBAs({ msps, memberships, position }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
    const [viewingOrg, setViewingOrg] = useState<Organization | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [stateFilter, setStateFilter] = useState('');
    const [lgaFilter, setLgaFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [membershipFilter, setMembershipFilter] = useState('');
    const itemsPerPage = 10;

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        mspId: '',
        mspName: '',
        state: '',
        lga: '',
        position: '',
        membership_plan: '',
        services: '',
        communityName: ''
    });

    // Filter logic
    const filteredMsps = msps.filter(org => 
        (stateFilter === '' || org.state.stateName.toLowerCase() === stateFilter.toLowerCase()) &&
        (lgaFilter === '' || org.lga.lgaName.toLowerCase() === lgaFilter.toLowerCase()) &&
        (positionFilter === '' || org.position.positionName.toLowerCase() === positionFilter.toLowerCase()) &&
        (membershipFilter === '' || org.membership_plan?.membershipPlanName.toLowerCase() === membershipFilter.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredMsps.length / itemsPerPage);
    const paginatedMsps = filteredMsps.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Record count logic
    const startRecord = (currentPage - 1) * itemsPerPage + 1;
    const endRecord = Math.min(currentPage * itemsPerPage, filteredMsps.length);
    const totalRecords = filteredMsps.length;

    // Unique states and LGAs for filter dropdowns
    const states = Array.from(new Set(msps.map(org => org.state.stateName))).sort();
    const lgas = Array.from(new Set(msps.map(org => org.lga.lgaName))).sort();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOrg) {
            put(`/dbas/${editingOrg.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingOrg(null);
                    reset();
                }
            });
        } else {
            post('/dbas', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (org: Organization) => {
        setEditingOrg(org);
        setData({
            mspId: org.mspId,
            mspName: org.mspName,
            state: org.state.stateName,
            lga: org.lga.lgaName,
            position: org.position.positionName,
            membership_plan: org.membership_plan?.membershipPlanName || '',
            services: org.services,
        });
        setIsModalOpen(true);
    };

    const handleView = (org: Organization) => {
        setViewingOrg(org);
        setIsViewModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this record?')) {
            destroy(`/dbas/${id}`);
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Limited page buttons for mobile
    const getVisiblePages = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mechanized Service Providers" />
            <div className="flex h-full flex-1 flex-col gap-2 p-2 sm:gap-4 sm:p-4">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    {/* <button
                        onClick={() => {
                            setEditingOrg(null);
                            reset();
                            setIsModalOpen(true);
                        }}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
                    >
                        Add DBA
                    </button> */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <div className="w-full sm:w-48">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Filter by State
                            </label>
                            <select
                                value={stateFilter}
                                onChange={(e) => {
                                    setStateFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            >
                                <option value="">All States</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-48">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Filter by LGA
                            </label>
                            <select
                                value={lgaFilter}
                                onChange={(e) => {
                                    setLgaFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            >
                                <option value="">All LGAs</option>
                                {lgas.map(lga => (
                                    <option key={lga} value={lga}>{lga}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-48">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Filter by Position
                            </label>
                            <select
                                value={positionFilter}
                                onChange={(e) => {
                                    setPositionFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            >
                                <option value="">All Positions</option>
                                {position.map(pos => (
                                    <option key={pos.positionId} value={pos.positionName}>{pos.positionName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-48">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Filter by Membership Plan
                            </label>
                            <select
                                value={membershipFilter}
                                onChange={(e) => {
                                    setMembershipFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            >
                                <option value="">All Membership Plans</option>
                                {memberships.map(membership => (
                                    <option key={membership.membershipPlanId} value={membership.membershipPlanName}>{membership.membershipPlanName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800 hidden sm:table-header-group">
                                <tr>
                                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        MSP ID
                                    </th>
                                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Location
                                    </th>
                                    {/* <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        LGA
                                    </th> */}
                                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {paginatedMsps.map((org) => (
                                    <tr 
                                        key={org.id}
                                        className="block sm:table-row bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 mb-4 sm:mb-0 border-b sm:border-0"
                                    >
                                        <td className="block sm:table-cell px-4 py-2 text-sm text-gray-900 dark:text-gray-100 sm:whitespace-nowrap">
                                            <div className="flex items-center sm:block">
                                                <span className="font-medium sm:hidden mr-2">Image:</span>
                                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="block sm:table-cell px-4 py-2 text-sm text-gray-900 dark:text-gray-100 sm:whitespace-nowrap">
                                            <span className="font-medium sm:hidden">MSP ID:</span> {org.mspId}
                                        </td>
                                        <td className="block sm:table-cell px-4 py-2 text-sm text-gray-900 dark:text-gray-100" style={{ textTransform: 'uppercase' }}>
                                            <span className="font-medium sm:hidden">Name:</span> {org.mspName}
                                        </td>
                                        <td className="block sm:table-cell px-4 py-2 text-sm text-gray-900 dark:text-gray-100 sm:whitespace-nowrap" style={{ textTransform: 'uppercase' }}>
                                            <span className="font-medium sm:hidden">State:</span>{org.communityName}, {org.lga.lgaName} - {org.state.stateName}
                                        </td>
                                        {/* <td className="block sm:table-cell px-4 py-2 text-sm text-gray-900 dark:text-gray-100 sm:whitespace-nowrap">
                                            <span className="font-medium sm:hidden">LGA:</span> {org.lga.lgaName}
                                        </td> */}
                                        <td className="block sm:table-cell px-4 py-2 text-sm text-gray-900 dark:text-gray-100 sm:whitespace-nowrap">
                                            <div className="flex space-x-2 sm:justify-start">
                                                <span className="font-medium sm:hidden">Actions:</span>
                                                <button
                                                    onClick={() => handleView(org)}
                                                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                                    title="View"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                {/* <button
                                                    onClick={() => handleEdit(org)}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button> */}
                                                {/* <button
                                                    onClick={() => handleDelete(org.id)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16" />
                                                    </svg>
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 px-4 py-2 sm:px-6 sm:py-3 gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 text-sm sm:text-base"
                        >
                            Previous
                        </button>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <div className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                                {startRecord}-{endRecord} of {totalRecords}
                            </div>
                            <div className="flex space-x-2">
                                {getVisiblePages().map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md text-sm sm:text-base ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 text-sm sm:text-base"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 w-[calc(100%-1rem)] sm:w-full max-w-md max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                    {editingOrg ? 'Edit MSP' : 'Add New MSP'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingOrg(null);
                                        reset();
                                    }}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none text-sm sm:text-base"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            MSP ID
                                        </label>
                                        <input
                                            type="text"
                                            value={data.mspId}
                                            onChange={(e) => setData('mspId', e.target.value)}
                                            className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                            placeholder="Enter MSP ID"
                                        />
                                        {errors.mspId && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.mspId}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.mspName}
                                            onChange={(e) => setData('mspName', e.target.value)}
                                            className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                            placeholder="Enter MSP name"
                                        />
                                        {errors.mspName && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.mspName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                            className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                            placeholder="Enter state"
                                        />
                                        {errors.state && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.state}</p>
                                        )}
                                    </div>
                                    {/* <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            LGA
                                        </label>
                                        <input
                                            type="text"
                                            value={data.lga}
                                            onChange={(e) => setData('lga', e.target.value)}
                                            className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                            placeholder="Enter LGA"
                                        />
                                        {errors.lga && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lga}</p>
                                        )}
                                    </div> */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Position
                                        </label>
                                        <input
                                            type="text"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                            placeholder="Enter position"
                                        />
                                        {errors.position && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.position}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Membership Plan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.membership_plan}
                                            onChange={(e) => setData('membership_plan', e.target.value)}
                                            className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                            placeholder="Enter membership plan"
                                        />
                                        {errors.membership_plan && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.membership_plan}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Services
                                        </label>
                                        <input
                                            type="text"
                                            value={data.services}
                                            onChange={(e) => setData('services', e.target.value)}
                                            className="block w-full px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                            placeholder="Enter services"
                                        />
                                        {errors.services && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.services}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-6 flex justify-end gap-2 sm:gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setEditingOrg(null);
                                            reset();
                                        }}
                                        className="px-3 py-1 sm:px-4 sm:py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-150 ease-in-out text-sm sm:text-base"
                                    >
                                        {processing ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* View Modal */}
                {isViewModalOpen && viewingOrg && (
                    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-2 sm:p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 w-[calc(100%-1rem)] sm:w-full max-w-full sm:max-w-md max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                    MSP Details
                                </h2>
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none text-sm sm:text-base"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-center">
                                    <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">MSP ID</p>
                                    <p className="text-gray-900 dark:text-white text-sm sm:text-base">{viewingOrg.mspId}</p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Name</p>
                                    <p className="text-gray-900 dark:text-white text-sm sm:text-base" style={{ textTransform: 'uppercase' }}>{viewingOrg.mspName}</p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Location</p>
                                    <p className="text-gray-900 dark:text-white text-sm sm:text-base">{viewingOrg.communityName}, {viewingOrg.lga.lgaName} - {viewingOrg.state.stateName}</p>
                                </div>
                                {/* <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">LGA</p>
                                    <p className="text-gray-900 dark:text-white text-sm sm:text-base">{viewingOrg.lga.lgaName}</p>
                                </div> */}
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Position</p>
                                    <p className="text-gray-900 dark:text-white text-sm sm:text-base">{viewingOrg.position.positionName}</p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Membership Plan</p>
                                    <p className="text-gray-900 dark:text-white text-sm sm:text-base">{viewingOrg.membership_plan ? `${viewingOrg.membership_plan.membershipPlanName} MEMBERSHIP` : 'None'}</p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Services</p>
                                    <p className="text-gray-900 dark:text-white text-sm sm:text-base">{viewingOrg.services}</p>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-6 flex justify-end">
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="px-3 py-1 sm:px-4 sm:py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out text-sm sm:text-base"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
