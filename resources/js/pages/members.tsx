import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Organization {
    id: number;
    membershipId: string;
    memberName: string;
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
        title: 'Members',
        href: '/members',
    },
];

export default function Members({ msps, memberships, position }: Props) {
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
    const [viewingOrg, setViewingOrg] = useState<Organization | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [stateFilter, setStateFilter] = useState('');
    const [lgaFilter, setLgaFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [membershipFilter, setMembershipFilter] = useState('');
    const itemsPerPage = 12;

    useEffect(() => {
        const sendHeight = () => {
            const height = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            window.parent.postMessage({ height }, 'https://wimanigeria.com');
        };

        sendHeight();
        window.addEventListener('resize', sendHeight);
        const observer = new MutationObserver(sendHeight);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('resize', sendHeight);
            observer.disconnect();
        };
    }, [isModalOpen, isViewModalOpen, isRequestModalOpen]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        membershipId: '',
        memberName: '',
        state: '',
        lga: '',
        position: '',
        membership_plan: '',
        services: '',
        communityName: '',
    });

    useEffect(() => {
        setLgaFilter('');
    }, [stateFilter]);

    const filteredMsps = msps.filter(org => 
        (stateFilter === '' || org.state.stateName.toLowerCase() === stateFilter.toLowerCase()) &&
        (lgaFilter === '' || org.lga.lgaName.toLowerCase() === lgaFilter.toLowerCase()) &&
        (positionFilter === '' || org.position.positionName.toLowerCase() === positionFilter.toLowerCase()) &&
        (membershipFilter === '' || org.membership_plan?.membershipPlanName.toLowerCase() === membershipFilter.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMsps.length / itemsPerPage);
    const paginatedMsps = filteredMsps.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const startRecord = (currentPage - 1) * itemsPerPage + 1;
    const endRecord = Math.min(currentPage * itemsPerPage, filteredMsps.length);
    const totalRecords = filteredMsps.length;

    const states = Array.from(new Set(msps.map(org => org.state.stateName))).sort();
    const lgas = stateFilter
        ? Array.from(new Set(msps.filter(org => org.state.stateName.toLowerCase() === stateFilter.toLowerCase()).map(org => org.lga.lgaName))).sort()
        : Array.from(new Set(msps.map(org => org.lga?.lgaName))).sort();

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
            membershipId: org.membershipId,
            memberName: org.memberName,
            state: org.state.stateName,
            lga: org.lga.lgaName,
            position: org.position.positionName,
            membership_plan: org.membership_plan?.membershipPlanName || '',
            services: org.services,
            communityName: org.communityName,
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

    const getVisiblePages = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const navLinks = [
        { title: 'Home', href: 'https://wimanigeria.com/' },
        // { title: 'About Us', href: 'https://wimanigeria.com/about/' },
        // { title: 'Contact', href: 'https://wimanigeria.com/contact/' },
        // { title: 'FAQs', href: 'https://wimanigeria.com/faqs/' },
        // { title: 'Blog', href: 'https://wimanigeria.com/blog/' },
        // { title: 'Hubs', href: '/dashboard' },
        // { title: 'Members', href: '/members' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Members" />
            <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#333333]">
                <header className="bg-[#E8F5E9] py-[15px]">
                    <div className="max-w-[1170px] mx-auto px-[15px] flex items-center justify-between">
                        <div className="flex items-center space-x-[15px]">
                            <img
                                src="https://wimanigeria.com/wp-content/uploads/2022/04/WIMA_logo_png.png"
                                alt="WIMA Nigeria Logo"
                                className="h-[64px] sm:h-[80px] max-w-[250px] object-contain"
                            />
                            <div className="text-[#333333] text-[13px] font-medium">
                                <b>WIMA</b><br />
                                Empowering Women<br />Driving Mechanization & <br />Transforming Agriculture
                            </div>
                        </div>
                        <nav className="flex items-center">
                            <ul className="flex space-x-[15px] text-[#333333] text-[13px] font-semibold uppercase tracking-[0.5px]">
                                {navLinks.map((link, index) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.href}
                                            className={link.title === 'Members' ? 'text-[#00A651]' : 'hover:text-[#00A651]'}
                                        >
                                            {link.title}
                                            {index < navLinks.length - 1 && <span className="mx-[5px] text-[#00A651]">•</span>}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </header>

                <div className="bg-[#f5f5f5] h-[300px] bg-[url('https://wimanigeria.com/wp-content/uploads/2025/05/member_banner.png')] bg-cover bg-center">
                    <div className="max-w-[1170px] mx-auto px-[15px] h-full flex items-center">
                        <nav className="text-center w-full">
                            <h3 className="text-lg font-bold text-[#fff]">
                                {/* <span>Members</span> */}
                            </h3>
                        </nav>
                    </div>
                </div>

                <main className="max-w-[1170px] mx-auto px-[15px] py-6">
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                <h3 className="text-lg font-semibold text-[#333333] flex-1">
                                    Our members are driving agricultural innovation with mechanized solutions
                                </h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 min-w-0">
                                    <label className="block text-sm font-medium text-[#333333] mb-1">
                                        Filter by State
                                    </label>
                                    <select
                                        value={stateFilter}
                                        onChange={(e) => {
                                            setStateFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                    >
                                        <option value="">All States</option>
                                        {states.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <label className="block text-sm font-medium text-[#333333] mb-1">
                                        Filter by LGA
                                    </label>
                                    <select
                                        value={lgaFilter}
                                        onChange={(e) => {
                                            setLgaFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                    >
                                        <option value="">All LGAs</option>
                                        {lgas.map(lga => (
                                            <option key={lga} value={lga}>{lga}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <label className="block text-sm font-medium text-[#333333] mb-1">
                                        Filter by Specialization
                                    </label>
                                    <select
                                        value={positionFilter}
                                        onChange={(e) => {
                                            setPositionFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                    >
                                        <option value="">All Specializations</option>
                                        {position.map(pos => (
                                            <option key={pos.positionId} value={pos.positionName}>{pos.positionName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <label className="block text-sm font-medium text-[#333333] mb-1">
                                        Filter by Membership Plan
                                    </label>
                                    <select
                                        value={membershipFilter}
                                        onChange={(e) => {
                                            setMembershipFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                    >
                                        <option value="">All Membership Plans</option>
                                        {memberships.map(membership => (
                                            <option key={membership.membershipPlanId} value={membership.membershipPlanName}>{membership.membershipPlanName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="border border-[#e5e5e5] rounded-md">
                            <div className="p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {paginatedMsps.map((org) => (
                                        <div
                                            key={org.id}
                                            className="bg-white rounded-md shadow-sm p-4 border border-[#e5e5e5] hover:shadow-md transition-shadow duration-150 min-w-0"
                                        >
                                            <div className="flex flex-col gap-3">
                                                <div className="flex justify-center">
                                                    <svg className="w-12 h-12 text-[#333333] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[#333333] opacity-70">MEMBER ID</p>
                                                    <p className="text-base text-[#333333] truncate">{org.membershipId}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[#333333] opacity-70">Name</p>
                                                    <p className="text-base text-[#333333] truncate" style={{ textTransform: 'uppercase' }}>{org.memberName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[#333333] opacity-70">Location</p>
                                                    <p className="text-base text-[#333333] truncate" style={{ textTransform: 'uppercase' }}>{org.communityName}, {org.lga.lgaName} - {org.state.stateName}</p>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-[#333333] opacity-70">Specialization</p>
                                                    <p className="text-base text-[#333333] truncate" style={{ textTransform: 'uppercase' }}>{org.position.positionName}</p>
                                                </div>

                                                {/* <div className="flex justify-end mt-2">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleView(org)}
                                                            className="text-[#00a651] hover:text-[#008c44]"
                                                            title="View"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 px-4 py-3 gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-[#e5e5e5] text-[#333333] rounded-md hover:bg-[#d5d5d5] disabled:opacity-50 text-sm"
                                >
                                    Previous
                                </button>
                                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                    <div className="text-[#333333] text-sm">
                                        {startRecord}-{endRecord} of {totalRecords}
                                    </div>
                                    <div className="flex space-x-2">
                                        {getVisiblePages().map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-3 py-1 rounded-md text-sm ${currentPage === page ? 'bg-[#00a651] text-white' : 'bg-[#e5e5e5] text-[#333333] hover:bg-[#d5d5d5]'}`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-[#e5e5e5] text-[#333333] rounded-md hover:bg-[#d5d5d5] disabled:opacity-50 text-sm"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-[#1A3C34] text-white py-4">
                    <div className="max-w-[1170px] mx-auto px-[15px] flex flex-col items-center">
                        <img
                            src="https://wimanigeria.com/wp-content/uploads/2022/04/WIMA_logo_png.png"
                            alt="WIMA Logo"
                            className="h-16 mb-4"
                        />
                        <div className="flex space-x-6 mb-4">
                            <a href="https://facebook.com" className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com" className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://linkedin.com" className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="text-sm">© 2025 WIMA. All rights reserved.</p>
                    </div>
                </footer>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
                        <div className="bg-white rounded-md p-4 shadow-md border border-[#e5e5e5] w-full max-w-[90vw] max-h-[90vh] overflow-y-auto pointer-events-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-[#333333]">
                                    {editingOrg ? 'Edit MSP' : 'Add New MSP'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingOrg(null);
                                        reset();
                                    }}
                                    className="text-[#333333] hover:text-[#555555] focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            MEMBER ID
                                        </label>
                                        <input
                                            type="text"
                                            value={data.membershipId}
                                            onChange={(e) => setData('membershipId', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter MEMBER ID"
                                        />
                                        {errors.membershipId && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.membershipId}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.memberName}
                                            onChange={(e) => setData('memberName', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter member name"
                                        />
                                        {errors.memberName && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.memberName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter state"
                                        />
                                        {errors.state && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.state}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            LGA
                                        </label>
                                        <input
                                            type="text"
                                            value={data.lga}
                                            onChange={(e) => setData('lga', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter LGA"
                                        />
                                        {errors.lga && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.lga}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Community Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.communityName}
                                            onChange={(e) => setData('communityName', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter community name"
                                        />
                                        {errors.communityName && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.communityName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Position
                                        </label>
                                        <input
                                            type="text"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter position"
                                        />
                                        {errors.position && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.position}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Membership Plan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.membership_plan}
                                            onChange={(e) => setData('membership_plan', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter membership plan"
                                        />
                                        {errors.membership_plan && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.membership_plan}</p>
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
                                        className="px-4 py-2 text-[#333333] bg-[#e5e5e5] rounded-md hover:bg-[#d5d5d5] transition duration-150 ease-in-out text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-[#00a651] text-white rounded-md hover:bg-[#008c44] disabled:opacity-50 transition duration-150 ease-in-out text-sm"
                                    >
                                        {processing ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isViewModalOpen && viewingOrg && (
                    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-2">
                        <div className="bg-white rounded-md p-4 shadow-md border border-[#e5e5e5] w-full max-w-[90vw] max-h-[90vh] overflow-y-auto pointer-events-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-[#333333]">
                                    MEMBER Details
                                </h2>
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="text-[#333333] hover:text-[#555555] focus:outline-none text-lg"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <svg className="w-16 h-16 text-[#333333] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">MEMBER ID</p>
                                    <p className="text-base text-[#333333]">{viewingOrg.membershipId}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">Name</p>
                                    <p className="text-base text-[#333333]" style={{ textTransform: 'uppercase' }}>{viewingOrg.memberName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">Location</p>
                                    <p className="text-base text-[#333333]">{viewingOrg.communityName}, {viewingOrg.lga.lgaName} - {viewingOrg.state.stateName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">Specialization</p>
                                    <p className="text-base text-[#333333]">{viewingOrg.position.positionName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">Membership Plan</p>
                                    <p className="text-base text-[#333333]">{viewingOrg.membership_plan ? `${viewingOrg.membership_plan.membershipPlanName} MEMBERSHIP` : 'None'}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="px-4 py-2 text-[#333333] bg-[#e5e5e5] rounded-md hover:bg-[#d5d5d5] transition duration-150 ease-in-out text-sm"
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