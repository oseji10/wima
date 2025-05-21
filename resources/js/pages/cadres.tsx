// resources/js/Pages/DBAs.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Cadre {
    cadreId: number;
    cadreName: string;
    step: string;
    gradeLevel: string;
    maximumGradeLevel: string;
    maximumStep: string;
    cadreGroupId?: number;
    cadreSubGroupId?: number;
}

interface CadreGroup {
    cadreGroupId: number;
    cadreGroupName: string;
}

interface CadreSubgroup {
    cadreSubGroupId: number;
    cadreSubGroupName: string;
    cadreGroupId: number;
}

interface Props {
    cadres: Cadre[];
    cadreGroups: CadreGroup[];
    cadreSubgroups: CadreSubgroup[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cadres',
        href: '/cadres',
    },
];

export default function Cadres({ cadres, cadreGroups, cadreSubgroups }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCadreGroupModalOpen, setIsCadreGroupModalOpen] = useState(false);
    const [isCadreSubgroupModalOpen, setIsCadreSubgroupModalOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Cadre | null>(null);
    const [filteredSubgroups, setFilteredSubgroups] = useState<CadreSubgroup[]>([]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        cadreName: '',
        step: '',
        gradeLevel: '',
        maximumGradeLevel: '',
        maximumStep: '',
        cadreGroupId: '',
        cadreSubGroupId: '',
    });

    const { data: cadreGroupData, setData: setCadreGroupData, post: postCadreGroup, processing: cadreGroupProcessing, errors: cadreGroupErrors, reset: resetCadreGroup } = useForm({
        cadreGroupName: '',
    });

    const { data: cadreSubgroupData, setData: setCadreSubgroupData, post: postCadreSubgroup, processing: cadreSubgroupProcessing, errors: cadreSubgroupErrors, reset: resetCadreSubgroup } = useForm({
        cadreSubGroupName: '',
        cadreGroupId: '',
    });

    // Filter Cadre Subgroups based on selected Cadre Group
    useEffect(() => {
        // console.log('Cadre Group ID in useEffect:', data.cadreGroupId);
        // console.log('All Subgroups:', cadreSubgroups);
        if (data.cadreGroupId) {
            const filtered = cadreSubgroups.filter(subgroup => subgroup.cadreGroupId === Number(data.cadreGroupId));
            console.log('Filtered Subgroups:', filtered);
            setFilteredSubgroups(filtered);
            setData('cadreSubgroupId', '');
        } else {
            setFilteredSubgroups([]);
        }
    }, [data.cadreGroupId, cadreSubgroups]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOrg) {
            put(`/cadres/${editingOrg.cadreId}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingOrg(null);
                    reset();
                },
            });
        } else {
            post('/cadres', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleCadreGroupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postCadreGroup('/cadre-groups', {
            onSuccess: () => {
                setIsCadreGroupModalOpen(false);
                resetCadreGroup();
            },
        });
    };

    const handleCadreSubgroupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subgroup Payload:', cadreSubgroupData); // Debug payload
        postCadreSubgroup('/cadre-subgroups', {
            onSuccess: () => {
                setIsCadreSubgroupModalOpen(false);
                resetCadreSubgroup();
            },
        });
    };

    const handleEdit = (org: Cadre) => {
        setEditingOrg(org);
        setData({
            cadreName: org.cadreName,
            step: org.step,
            gradeLevel: org.gradeLevel,
            maximumGradeLevel: org.maximumGradeLevel,
            maximumStep: org.maximumStep,
            cadreGroupId: org.cadreGroupId?.toString() || '',
            cadreSubgroupId: org.cadreSubgroupId?.toString() || '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = (cadreId: number) => {
        if (confirm('Are you sure you want to delete this record?')) {
            destroy(`/cadres/${cadreId}`);
        }
    };

    // Sync cadreGroupId when opening subgroup modal
    const openSubgroupModal = () => {
        if (data.cadreGroupId) {
            setCadreSubgroupData('cadreGroupId', data.cadreGroupId); // Pre-set cadreGroupId
        }
        setIsCadreSubgroupModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadres" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
                <div className="mb-4">
                    <button
                        onClick={() => {
                            setEditingOrg(null);
                            reset();
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Cadre
                    </button>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cadre Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Group</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subgroup</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Max GL</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Max Step</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {cadres.map((org) => (
                                    // render table
                                    <tr key={org.cadreId} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.cadreId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.cadreName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.cadre_group.cadreGroupName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.cadre_subgroup.cadreSubGroupName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.maximumGradeLevel}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.maximumStep}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(org)}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(org.cadreId)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Main Cadre Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {editingOrg ? 'Edit Cadre' : 'Add New Cadre'}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setEditingOrg(null);
                                            reset();
                                        }}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cadre Name
                                            </label>
                                            <input
                                                type="text"
                                                value={data.cadreName}
                                                onChange={(e) => setData('cadreName', e.target.value)}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                                placeholder="Enter Cadre name"
                                            />
                                            {errors.cadreName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cadreName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cadre Group
                                            </label>
                                            <select
                                                value={data.cadreGroupId}
                                                onChange={(e) => {
                                                    console.log('Selected Cadre Group ID:', e.target.value);
                                                    setData('cadreGroupId', e.target.value);
                                                }}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
                                            >
                                                <option value="">Select Cadre Group</option>
                                                {cadreGroups.map((group) => (
                                                    <option key={group.cadreGroupId} value={group.cadreGroupId}>
                                                        {group.cadreGroupName}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    console.log('Opening Cadre Group Modal');
                                                    setIsCadreGroupModalOpen(true);
                                                }}
                                                className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                Create New Cadre Group
                                            </button>
                                            {errors.cadreGroupId && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cadreGroupId}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cadre Subgroup
                                            </label>
                                            <select
                                                value={data.cadreSubGroupId}
                                                onChange={(e) => {
                                                    console.log('Selected Cadre Subgroup ID:', e.target.value);
                                                    setData('cadreSubGroupId', e.target.value);
                                                }}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
                                                disabled={!data.cadreGroupId}
                                            >
                                                <option value="">Select Cadre Subgroup</option>
                                                {filteredSubgroups.map((subgroup) => (
                                                    <option key={subgroup.cadreSubGroupId} value={subgroup.cadreSubGroupId}>
                                                        {subgroup.cadreSubGroupName}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={openSubgroupModal} // Use new function
                                                className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                disabled={!data.cadreGroupId}
                                            >
                                                Create New Cadre Subgroup
                                            </button>
                                            {errors.cadreSubgroupId && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cadreSubgroupId}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Maximum Grade Level
                                            </label>
                                            <input
                                                type="text"
                                                value={data.maximumGradeLevel}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === '' || (/^\d*$/.test(value) && Number(value) >= 0)) {
                                                        setData('maximumGradeLevel', value);
                                                    }
                                                }}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                                placeholder="Enter Maximum Grade Level"
                                                pattern="[0-9]*"
                                                inputMode="numeric"
                                                style={{ margin: 0 }}
                                            />
                                            {errors.maximumGradeLevel && (
                                                <p className="mt-1 text-sm text-red-600">{errors.maximumGradeLevel}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Maximum Step
                                            </label>
                                            <input
                                                type="text"
                                                value={data.maximumStep}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === '' || (/^\d*$/.test(value) && Number(value) >= 0)) {
                                                        setData('maximumStep', value);
                                                    }
                                                }}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                                placeholder="Enter Maximum Step"
                                                pattern="[0-9]*"
                                                inputMode="numeric"
                                                style={{ margin: 0 }}
                                            />
                                            {errors.maximumStep && (
                                                <p className="mt-1 text-sm text-red-600">{errors.maximumStep}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingOrg(null);
                                                reset();
                                            }}
                                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-150 ease-in-out"
                                        >
                                            {processing ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cadre Group Modal */}
                {isCadreGroupModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Cadre Group</h2>
                                    <button
                                        onClick={() => {
                                            setIsCadreGroupModalOpen(false);
                                            resetCadreGroup();
                                        }}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleCadreGroupSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cadre Group Name
                                            </label>
                                            <input
                                                type="text"
                                                value={cadreGroupData.cadreGroupName}
                                                onChange={(e) => setCadreGroupData('cadreGroupName', e.target.value)}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                                placeholder="Enter Cadre Group name"
                                            />
                                            {cadreGroupErrors.cadreGroupName && (
                                                <p className="mt-1 text-sm text-red-600">{cadreGroupErrors.cadreGroupName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCadreGroupModalOpen(false);
                                                resetCadreGroup();
                                            }}
                                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={cadreGroupProcessing}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-150 ease-in-out"
                                        >
                                            {cadreGroupProcessing ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cadre Subgroup Modal */}
                {isCadreSubgroupModalOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Cadre Subgroup</h2>
                                    <button
                                        onClick={() => {
                                            setIsCadreSubgroupModalOpen(false);
                                            resetCadreSubgroup();
                                        }}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleCadreSubgroupSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cadre Group
                                            </label>
                                            <select
                                                value={cadreSubgroupData.cadreGroupId || data.cadreGroupId}
                                                onChange={(e) => setCadreSubgroupData('cadreGroupId', e.target.value)}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
                                            >
                                                <option value="">{data.cadreGroupId ? cadreGroups.find(g => g.cadreGroupId === Number(data.cadreGroupId))?.cadreGroupName : 'Select Cadre Group'}</option>
                                                {cadreGroups.map((group) => (
                                                    <option key={group.cadreGroupId} value={group.cadreGroupId}>
                                                        {group.cadreGroupName}
                                                    </option>
                                                ))}
                                            </select>
                                            {cadreSubgroupErrors.cadreGroupId && (
                                                <p className="mt-1 text-sm text-red-600">{cadreSubgroupErrors.cadreGroupId}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cadre Subgroup Name
                                            </label>
                                            <input
                                                type="text"
                                                value={cadreSubgroupData.cadreSubGroupName}
                                                onChange={(e) => setCadreSubgroupData('cadreSubGroupName', e.target.value)}
                                                className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                                placeholder="Enter Cadre Subgroup name"
                                            />
                                            {cadreSubgroupErrors.cadreSubGroupName && (
                                                <p className="mt-1 text-sm text-red-600">{cadreSubgroupErrors.cadreSubGroupName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCadreSubgroupModalOpen(false);
                                                resetCadreSubgroup();
                                            }}
                                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={cadreSubgroupProcessing}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-150 ease-in-out"
                                        >
                                            {cadreSubgroupProcessing ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}