import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

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
        title: 'Hubs',
        href: '/dashboard',
    },
];

export default function DBAs({ msps, memberships, position }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
    const [viewingOrg, setViewingOrg] = useState<Organization | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [stateFilter, setStateFilter] = useState('');
    const [lgaFilter, setLgaFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [membershipFilter, setMembershipFilter] = useState('');
    const [requestState, setRequestState] = useState('');
    const itemsPerPage = 12;

    // Reference for the carousel container
        const carouselRef = useRef<HTMLDivElement>(null);

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
    }, [isModalOpen, isViewModalOpen, isRequestModalOpen, isMenuOpen]);

    useEffect(() => {
        if (isModalOpen || isViewModalOpen || isRequestModalOpen || isMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isModalOpen, isViewModalOpen, isRequestModalOpen, isMenuOpen]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        mspId: '',
        mspName: '',
        state: '',
        lga: '',
        position: '',
        membership_plan: '',
        services: '',
        communityName: '',
    });

    const { data: requestData, setData: setRequestData, post: postRequest, processing: requestProcessing, errors: requestErrors, reset: resetRequest } = useForm({
        name: '',
        email: '',
        phone_number: '',
        state: '',
        lga: '',
        service: [] as string[],
    });

    useEffect(() => {
        setLgaFilter('');
    }, [stateFilter]);

    useEffect(() => {
        setRequestData('lga', '');
    }, [requestState, setRequestData]);

    const filteredMsps = msps.filter(org => 
        (stateFilter === '' || org.state?.stateName.toLowerCase() === stateFilter.toLowerCase()) &&
        (lgaFilter === '' || org.lga?.lgaName.toLowerCase() === lgaFilter.toLowerCase()) &&
        (positionFilter === '' || org.position?.positionName.toLowerCase() === positionFilter.toLowerCase()) &&
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

    const states = Array.from(new Set(msps.map(org => org.state?.stateName).filter(Boolean))).sort();
    const lgas = stateFilter
        ? Array.from(new Set(msps.filter(org => org.state?.stateName.toLowerCase() === stateFilter.toLowerCase()).map(org => org.lga?.lgaName).filter(Boolean))).sort()
        : Array.from(new Set(msps.map(org => org.lga?.lgaName).filter(Boolean))).sort();
    const requestLgas = requestState
        ? Array.from(new Set(msps.filter(org => org.state?.stateName.toLowerCase() === requestState.toLowerCase()).map(org => org.lga?.lgaName).filter(Boolean))).sort()
        : Array.from(new Set(msps.map(org => org.lga?.lgaName).filter(Boolean))).sort();
    
    const servicesList = ['Solar Treshers', 'Solar Dryers', 'Solar Knapsack Sprayers', 'Solar Water Pumps'];

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

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Update requestData with the transformed service value
        setRequestData('service', requestData.service.join(','));
        postRequest('/request-service', {
            onSuccess: () => {
                setIsRequestModalOpen(false);
                resetRequest();
                setRequestState('');
                alert('Service request submitted successfully!');
            },
        });
    };

    const handleEdit = (org: Organization) => {
        setEditingOrg(org);
        setData({
            mspId: org.mspId || '',
            mspName: org.mspName || '',
            state: org.state?.stateName || '',
            lga: org.lga?.lgaName || '',
            position: org.position?.positionName || '',
            membership_plan: org.membership_plan?.membershipPlanName || '',
            services: org.services || '',
            communityName: org.communityName || '',
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
    ];

    const hubsDropdown = [
        { title: 'Adamawa', href: 'https://dashboard.wimanigeria.com/adamawa/' },
        { title: 'Gombe', href: 'https://dashboard.wimanigeria.com/gombe/' },
        { title: 'Kaduna', href: 'https://dashboard.wimanigeria.com/kaduna/' },
        { title: 'Kano', href: 'https://dashboard.wimanigeria.com/kano/' },
       
    ];

      // Functions to handle carousel scrolling
      const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hubs" />
            <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#333333] dba-wrapper">
                {/* <header className="bg-[#E8F5E9] py-[15px]"> */}
                <header className="bg-[#E8F5E9] py-[15px] sticky top-0 z-20 shadow-md">
                    <div className="max-w-[1170px] mx-auto px-[15px] flex items-center justify-between">
                        <div className="flex items-center space-x-[15px]">
                            <img
                                src="https://wimanigeria.com/wp-content/uploads/2022/04/WIMA_logo_png.png"
                                alt="WIMA Nigeria Logo"
                                className="h-[64px] sm:h-[80px] max-w-[250px] object-contain"
                            />
                            <div className="text-[#333333] text-[13px] font-medium">
                                <b>WIMA</b><br />
                                Empowering Women<br/> Driving Mechanization & <br/>Transforming Agriculture
                            </div>
                        </div>
                        <nav className="flex items-center relative">
                            <ul className="flex space-x-[15px] text-[#333333] text-[13px] font-semibold uppercase tracking-[0.5px]">
                                {navLinks.map((link, index) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.href}
                                            className={link.title === 'Hubs' ? 'text-[#00A651]' : 'hover:text-[#00A651]'}
                                        >
                                            {link.title}
                                            {index < navLinks.length - 1 && <span className="mx-[5px] text-[#00A651]">•</span>}
                                        </a>
                                    </li>
                                ))}
                                <li className="relative">
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="text-[#333333] hover:text-[#00A651] focus:outline-none flex items-center"
                                    >
                                        HUBS
                                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {isMenuOpen && (
                                        <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#e5e5e5] rounded-md shadow-lg z-10">
                                            {hubsDropdown.map((item) => (
                                                <li key={item.title}>
                                                    <Link
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#e5e5e5] hover:text-[#00A651]"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </nav>
                        <h2 style={{fontWeight: 'bolder'}}>GOMBE HUB</h2>

                    </div>
                </header>

                <div className="bg-[#f5f5f5] h-[300px] bg-[url('https://wimanigeria.com/wp-content/uploads/2025/05/hub_design.png')] bg-cover bg-center" style={{ backgroundSize: '100%' }}>
                    <div className="max-w-[1170px] mx-auto px-[15px] h-full flex items-center">
                        <nav className="text-center w-full">
                            <h3 className="text-lg font-bold text-[#fff]">
                                <span>GOMBE HUB</span>
                            </h3>
                        </nav>
                    </div>
                </div>

                <main className="max-w-[1170px] mx-auto px-[15px] py-6">

                    {/* Updated Images and Videos Section with Scrollable Carousel */}
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6 relative">
                        <h3 className="text-lg font-semibold text-[#333333] mb-4">
                            Images and Videos
                        </h3>
                        <div className="relative">
                            {/* Left Arrow */}
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#00a651] text-white p-2 rounded-full hover:bg-[#008c44] focus:outline-none z-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Carousel Container */}
                            <div
                                ref={carouselRef}
                                className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-[#00a651] scrollbar-track-[#e5e5e5] snap-x snap-mandatory"
                                style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin' }}
                            >
                                {/* Images */}
                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe_hub_pic1.jpg"
                                        alt="Gombe Hub Activity 1"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">A visit by the WIMA team to Gombe Hub</p>
                                </div>
                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe1.jpg"
                                        alt="Gombe Hub Activity 2"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>
                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe2.jpg"
                                        alt="Gombe Hub Activity 3"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>
                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe3.jpg"
                                        alt="Adamawa Hub Activity 4"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Women in Agriculture</p>
                                </div>

                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe4.jpg"
                                        alt="Gombe Hub Activity 3"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>

                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe5.jpg"
                                        alt="Gombe Hub Activity 3"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>

                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe6.jpg"
                                        alt="Gombe Hub Activity 3"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>
                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe7.jpg"
                                        alt="Gombe Hub Activity 3"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>

                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe8.jpg"
                                        alt="Gombe Hub Activity 3"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>


                                <div className="flex-none w-64 snap-center">
                                    <img
                                        src="https://wimanigeria.com/wp-content/uploads/2025/05/gombe9.jpg"
                                        alt="Gombe Hub Activity 3"
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    />
                                    <p className="text-sm text-[#333333] mt-2 text-center">Hub Activity</p>
                                </div>
                                {/* Videos */}
                                <div className="flex-none w-64 snap-center">
                                    <video
                                        controls
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    >
                                        <source
                                            src="https://wimanigeria.com/wp-content/uploads/2025/05/hub_video.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                    <p className="text-sm text-[#333333] mt-2 text-center">Gombe Hub Overview</p>
                                </div>
                                {/* <div className="flex-none w-64 snap-center">
                                    <video
                                        controls
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    >
                                        <source
                                            src="https://wimanigeria.com/wp-content/uploads/2025/05/hub_video_2.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                    <p className="text-sm text-[#333333] mt-2 text-center">Solar Water Pump Demo</p>
                                </div> */}
                                {/* <div className="flex-none w-64 snap-center">
                                    <video
                                        controls
                                        className="w-full h-48 object-cover rounded-md border border-[#e5e5e5]"
                                    >
                                        <source
                                            src="https://wimanigeria.com/wp-content/uploads/2025/05/hub_video_3.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                    <p className="text-sm text-[#333333] mt-2 text-center">Training Workshop</p>
                                </div> */}
                            </div>

                            {/* Right Arrow */}
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#00a651] text-white p-2 rounded-full hover:bg-[#008c44] focus:outline-none z-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                <h3 className="text-lg font-semibold text-[#333333] flex-1">
                                    Our hubs provide mechanized services using Solar Treshers, Solar Dryers, Solar Knapsack Sprayers, and Solar Water Pumps
                                </h3>
                                <button
                                    onClick={() => setIsRequestModalOpen(true)}
                                    className="px-3 py-1.5 bg-[#00a651] text-white rounded-md hover:bg-[#008c44] focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:ring-offset-2 text-sm"
                                >
                                    Request Service
                                </button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* <div className="flex-1 min-w-0">
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
                                </div> */}
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
                                        {(position || []).map(pos => (
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
                                        {(memberships || []).map(membership => (
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
                                                    <p className="text-sm font-medium text-[#333333] opacity-70">MSP ID</p>
                                                    <p className="text-base text-[#333333] truncate">{org.mspId}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[#333333] opacity-70">Name</p>
                                                    <p className="text-base text-[#333333] truncate" style={{ textTransform: 'uppercase' }}>{org.mspName}</p>
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
                            <a href="https://web.facebook.com/womeninmechanizedagriculture?_rdc=1&_rdr" className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/wima.nigeria/" className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/106617937/admin/page-posts/published/" className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="text-sm">House 2, Block B, Sani Zangon Daura Estate, Kado, Abuja, Nigeria.</p>
                        <p className="text-sm">Phone: ‪+234-806- 4237 096‬ | Email: info@wimanigeria.com</p>
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
                                    className="text-[#333333] hover:text-[#555555] focus:outline-none text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            MSP ID
                                        </label>
                                        <input
                                            type="text"
                                            value={data.mspId}
                                            onChange={(e) => setData('mspId', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter MSP ID"
                                        />
                                        {errors.mspId && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.mspId}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.mspName}
                                            onChange={(e) => setData('mspName', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter MSP name"
                                        />
                                        {errors.mspName && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.mspName}</p>
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
                                            Specialization
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
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Services
                                        </label>
                                        <input
                                            type="text"
                                            value={data.services}
                                            onChange={(e) => setData('services', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter services"
                                        />
                                        {errors.services && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{errors.services}</p>
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

                {isRequestModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
                        <div className="bg-white rounded-md p-4 shadow-md border border-[#e5e5e5] w-full max-w-[90vw] max-h-[90vh] overflow-y-auto pointer-events-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-[#333333]">
                                    Request Service
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsRequestModalOpen(false);
                                        resetRequest();
                                        setRequestState('');
                                    }}
                                    className="text-[#333333] hover:text-[#555555] focus:outline-none text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleRequestSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={requestData.name}
                                            onChange={(e) => setRequestData('name', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter your name"
                                        />
                                        {requestErrors.name && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{requestErrors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={requestData.email}
                                            onChange={(e) => setRequestData('email', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter your email"
                                        />
                                        {requestErrors.email && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{requestErrors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={requestData.phone_number}
                                            onChange={(e) => setRequestData('phone_number', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                            placeholder="Enter your phone number"
                                        />
                                        {requestErrors.phone_number && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{requestErrors.phone_number}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            State
                                        </label>
                                        <select
                                            value={requestData.state}
                                            onChange={(e) => {
                                                setRequestData('state', e.target.value);
                                                setRequestState(e.target.value);
                                            }}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                        >
                                            <option value="">Select State</option>
                                            {states.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        {requestErrors.state && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{requestErrors.state}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            LGA
                                        </label>
                                        <select
                                            value={requestData.lga}
                                            onChange={(e) => setRequestData('lga', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-md border border-[#e5e5e5] bg-white text-[#333333] focus:ring-2 focus:ring-[#00a651] focus:border-[#00a651] text-sm"
                                        >
                                            <option value="">Select LGA</option>
                                            {requestLgas.map(lga => (
                                                <option key={lga} value={lga}>{lga}</option>
                                            ))}
                                        </select>
                                        {requestErrors.lga && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{requestErrors.lga}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#333333] mb-1">
                                            Services Requested (Select one or more)
                                        </label>
                                        <div className="space-y-2">
                                            {servicesList.map(service => (
                                                <div key={service} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={service}
                                                        value={service}
                                                        checked={requestData.service.includes(service)}
                                                        onChange={(e) => {
                                                            const updatedServices = e.target.checked
                                                                ? [...requestData.service, service]
                                                                : requestData.service.filter(s => s !== service);
                                                            setRequestData('service', updatedServices);
                                                        }}
                                                        className="h-5 w-5 text-[#00a651] focus:ring-[#00a651] border-[#e5e5e5] rounded"
                                                    />
                                                    <label htmlFor={service} className="ml-2 text-sm text-[#333333]">
                                                        {service}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {requestErrors.service && (
                                            <p className="mt-1 text-sm text-[#ff0000]">{requestErrors.service}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsRequestModalOpen(false);
                                            resetRequest();
                                            setRequestState('');
                                        }}
                                        className="px-4 py-2 text-[#333333] bg-[#e5e5e5] rounded-md hover:bg-[#d5d5d5] transition duration-150 ease-in-out text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={requestProcessing}
                                        className="px-4 py-2 bg-[#00a651] text-white rounded-md hover:bg-[#008c44] disabled:opacity-50 transition duration-150 ease-in-out text-sm"
                                    >
                                        {requestProcessing ? 'Submitting...' : 'Submit'}
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
                                    MSP Details
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
                                    <p className="text-sm font-medium text-[#333333] opacity-70">MSP ID</p>
                                    <p className="text-base text-[#333333]">{viewingOrg.mspId}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">Name</p>
                                    <p className="text-base text-[#333333]" style={{ textTransform: 'uppercase' }}>{viewingOrg.mspName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">Location</p>
                                    <p className="text-base text-[#333333]">{viewingOrg.communityName}, {viewingOrg.lga.lgaName} - {viewingOrg.state.stateName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#333333] opacity-70">Specialization</p>
                                    <p className="text-base text-[#333333]">{viewingOrg.position.positionName}</p>
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