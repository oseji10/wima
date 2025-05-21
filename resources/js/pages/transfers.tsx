import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react'; // Import router
import { useState } from 'react';

interface Transfers {
    transferId: number;
    staffId: number;
    transferFrom: number | null;
    transferTo: number;
    initiatedBy: number | null;
    approvedBy: number | null;
    comment: string | null;
    status: string | null;
    created_at: string;
    staff: Staff;
    from_dba: Dba | null;
    to_dba: Dba;
}

interface Staff {
    staffId: number;
    surname: string;
    firstName: string;
    otherNames: string;
    dba: string;
}

interface Dba {
    dbaId: number;
    dbaName: string;
}

interface Props {
    transfers: Transfers[];
    dbas: Dba[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transfers/Posting',
        href: '/transfers',
    },
];

export default function Transfers({ transfers, dbas }: Props) {
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedTransfer, setSelectedTransfer] = useState<Transfers | null>(null);
    const [transferProcessing, setTransferProcessing] = useState(false); // Manual processing state

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleTransfer = (transfer: Transfers) => {
        setSelectedTransfer(transfer);
        setIsConfirmationModalOpen(true);
    };

    const handleTransferResponse = (response: 'Accepted' | 'Rejected') => {
        if (!selectedTransfer) return;

        const payload = { status: response };
        console.log('Intended payload:', payload); // Log before sending

        setTransferProcessing(true); // Set processing state

        router.put(
            `/transfers/${selectedTransfer.transferId}/respond`,
            payload, // Send payload directly
            {
                onSuccess: () => {
                    setIsConfirmationModalOpen(false);
                    setSelectedTransfer(null);
                },
                onError: (errors) => {
                    console.error('Transfer response errors:', errors);
                },
                onFinish: () => {
                    setTransferProcessing(false);
                    console.log('Request sent with status:', response);
                },
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transfers/Posting" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Request date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Staff Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transfer from</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transfer to</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {transfers.map((org) => (
                                    <tr key={org.transferId} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatDate(org.created_at)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.staff.surname} {org.staff.firstName} {org.staff.otherNames}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.from_dba?.dbaName || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.to_dba.dbaName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleTransfer(org)}
                                                    className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                    title="Respond to Transfer"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h12m0 0l-4 4m4-4l-4-4M15 19H3m0 0l4-4m-4 4l4 4" />
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

                {isConfirmationModalOpen && selectedTransfer && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto relative">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Transfer</h2>
                                <button
                                    onClick={() => setIsConfirmationModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Staff: <strong>{selectedTransfer.staff.surname} {selectedTransfer.staff.firstName} {selectedTransfer.staff.otherNames}</strong>
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Transfer From: <strong>{selectedTransfer.from_dba?.dbaName || 'N/A'}</strong>
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Transfer To: <strong>{selectedTransfer.to_dba.dbaName}</strong>
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Comment: <strong>{selectedTransfer.comment || 'N/A'}</strong>
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Do you want to accept or reject this transfer request?
                                </p>
                            </div>
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                                <button
                                    onClick={() => setIsConfirmationModalOpen(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleTransferResponse('Rejected')}
                                    disabled={transferProcessing}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                                >
                                    {transferProcessing ? 'Processing...' : 'Reject'}
                                </button>
                                <button
                                    onClick={() => handleTransferResponse('Accepted')}
                                    disabled={transferProcessing}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                >
                                    {transferProcessing ? 'Processing...' : 'Accept'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}