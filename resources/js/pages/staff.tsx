import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import * as docx from 'docx'; // Use built-in types from docx
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';
import { saveAs } from 'file-saver'

interface Staff {
    staffId: number;
    fileNumber: string;
    surname: string;
    firstName: string;
    lastName: string;
    otherNames: string;
    dateOfBirth: string;
    gender: string;
    stateOfOrigin: string;
    lgaOfOrigin: string;
    dateOfFirstAppointment: string;
    dateOfPresentAppointment: string;
    dateOfConfirmation: string;
    cadre: string;
    accountNumber: string;
    bankId: string;
    PFAId: number;
    // pfaName: string;
    NHFNumber: string;
    HISNumber: string;
    HISId: number;
    hisName: string;
    dba: string;
    status: string;

    // his: His | null;  // Change from HIS: string to his: His | null
    
    // bank?: { bankName: string }; // Assuming bank is a relationship
    // pfa?: { pfaName: string };
    // his?: { hisName: string };
}

interface Cadre {
    cadreId: number;
    cadreName: string;
}

interface Dba {
    dbaId: number;
    dbaName: string;
}

interface His {
    HISId: number;
    hisName: string;
}

interface Bank {
    bankId: number;
    bankName: string;
}

interface Pfa {
    PFAId: number;
    pfaName: string;
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface StaffPagination {
    data: Staff[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLinks[];
}

interface Props {
    // staff: Staff[];
    staff: StaffPagination;
    cadres: Cadre[];
    dbas: Dba[];
    his: His[];
    bank: Bank[];
    pfa: Pfa[];
    filters: {
        search: string;
        per_page: number;
    };
}


// Define available fields for selection
const availableFields = [
    { key: 'fileNumber', label: 'File Number' },
    { key: 'surname', label: 'Surname' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'otherNames', label: 'Other Names' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'stateOfOrigin', label: 'State of Origin' },
    { key: 'lgaOfOrigin', label: 'LGA of Origin' },
    { key: 'dateOfFirstAppointment', label: 'Date of First Appointment' },
    { key: 'dateOfPresentAppointment', label: 'Date of Present Appointment' },
    { key: 'dateOfConfirmation', label: 'Date of Confirmation' },
    { key: 'cadre', label: 'Cadre' },
    { key: 'accountNumber', label: 'Account Number' },
    { key: 'bankId', label: 'Bank' },
    { key: 'PFAId', label: 'PFA' },
    { key: 'NHFNumber', label: 'NHF Number' },
    { key: 'HISNumber', label: 'HIS Number' },
    { key: 'HISId', label: 'HIS' },
    { key: 'dba', label: 'DBA' },
    { key: 'status', label: 'Status' },
];

// Complete list of Nigerian states and their LGAs (shortened for brevity here)
const nigerianStates = [
    {
        name: 'Abia',
        lgas: [
            'Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 
            'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo', 
            'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'
        ]
    },
    {
        name: 'Adamawa',
        lgas: [
            'Demsa', 'Fufure', 'Ganye', 'Gayuk', 'Gombi', 'Grie', 'Hong', 'Jada', 'Lamurde', 
            'Madagali', 'Maiha', 'Mayo Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 
            'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'
        ]
    },
    {
        name: 'Akwa Ibom',
        lgas: [
            'Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan', 
            'Ibeno', 'Ibesikpo Asutan', 'Ibiono-Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 
            'Ini', 'Itu', 'Mbo', 'Mkpat-Enin', 'Nsit-Atai', 'Nsit-Ibom', 'Nsit-Ubium', 'Obot Akara', 
            'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung-Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 
            'Uyo'
        ]
    },
    {
        name: 'Anambra',
        lgas: [
            'Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South', 
            'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala', 
            'Njikoka', 'Nnewi North', 'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South', 
            'Orumba North', 'Orumba South', 'Oyi'
        ]
    },
    {
        name: 'Bauchi',
        lgas: [
            'Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 
            'Giade', 'Itas/Gadau', 'Jama’are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 
            'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'
        ]
    },
    {
        name: 'Bayelsa',
        lgas: [
            'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 
            'Yenagoa'
        ]
    },
    {
        name: 'Benue',
        lgas: [
            'Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West', 'Katsina-Ala', 
            'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu', 
            'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'
        ]
    },
    {
        name: 'Borno',
        lgas: [
            'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa', 'Gubio', 
            'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga', 'Kukawa', 
            'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar', 'Monguno', 'Ngala', 
            'Nganzai', 'Shani'
        ]
    },
    {
        name: 'Cross River',
        lgas: [
            'Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal', 
            'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 
            'Yakuur', 'Yala'
        ]
    },
    {
        name: 'Delta',
        lgas: [
            'Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West', 
            'Ika North East', 'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 
            'Okpe', 'Oshimili North', 'Oshimili South', 'Patani', 'Sapele', 'Udu', 'Ughelli North', 
            'Ughelli South', 'Ukwuani', 'Uvwie', 'Warri North', 'Warri South', 'Warri South West'
        ]
    },
    {
        name: 'Ebonyi',
        lgas: [
            'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 
            'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'
        ]
    },
    {
        name: 'Edo',
        lgas: [
            'Akoko-Edo', 'Egor', 'Esan Central', 'Esan South-East', 'Esan West', 'Etsako Central', 
            'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba Okha', 'Orhionmwon', 'Oredo', 
            'Ovia North-East', 'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'
        ]
    },
    {
        name: 'Ekiti',
        lgas: [
            'Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin', 
            'Ido Osi', 'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun', 
            'Moba', 'Oye'
        ]
    },
    {
        name: 'Enugu',
        lgas: [
            'Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti', 
            'Igbo Eze North', 'Igbo Eze South', 'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka', 
            'Oji River', 'Udenu', 'Udi', 'Uzo Uwani'
        ]
    },
    {
        name: 'Gombe',
        lgas: [
            'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 
            'Nafada', 'Shongom', 'Yamaltu/Deba'
        ]
    },
    {
        name: 'Imo',
        lgas: [
            'Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South', 
            'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 
            'Nkwerre', 'Nwangele', 'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Orlu', 'Orsu', 
            'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North', 'Owerri West', 'Unuimo'
        ]
    },
    {
        name: 'Jigawa',
        lgas: [
            'Auyo', 'Babura', 'Birnin Kudu', 'Birniwa', 'Buji', 'Dutse', 'Gagarawa', 'Garki', 
            'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kazaure', 
            'Kiri Kasama', 'Kiyawa', 'Maigatari', 'Malam Madori', 'Miga', 'Ringim', 'Roni', 
            'Sule Tankarkar', 'Taura', 'Yankwashi'
        ]
    },
    {
        name: 'Kaduna',
        lgas: [
            'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema’a', 'Kachia', 
            'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 
            'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'
        ]
    },
    {
        name: 'Kano',
        lgas: [
            'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 
            'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 
            'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya', 
            'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa', 
            'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 
            'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'
        ]
    },
    {
        name: 'Katsina',
        lgas: [
            'Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dandume', 'Danja', 
            'Dan Musa', 'Daura', 'Dutsi', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa', 'Jibia', 
            'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi', 'Kusada', 'Mai’Adua', 
            'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 
            'Sandamu', 'Zango'
        ]
    },
    {
        name: 'Kebbi',
        lgas: [
            'Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza', 
            'Dandi', 'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 
            'Sakaba', 'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri', 'Zuru'
        ]
    },
    {
        name: 'Kogi',
        lgas: [
            'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela Odolu', 
            'Ijumu', 'Kabba/Bunu', 'Kogi', 'Lokoja', 'Mopa Muro', 'Ofu', 'Ogori/Magongo', 
            'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'
        ]
    },
    {
        name: 'Kwara',
        lgas: [
            'Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South', 
            'Ilorin West', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'
        ]
    },
    {
        name: 'Lagos',
        lgas: [
            'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 
            'Epe', 'Eti Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 
            'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 
            'Surulere'
        ]
    },
    {
        name: 'Nasarawa',
        lgas: [
            'Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 
            'Nasarawa Egon', 'Obi', 'Toto', 'Wamba'
        ]
    },
    {
        name: 'Niger',
        lgas: [
            'Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 
            'Gurara', 'Katcha', 'Kontagora', 'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu', 
            'Mokwa', 'Muya', 'Pailoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja', 'Tafa', 'Wushishi'
        ]
    },
    {
        name: 'Ogun',
        lgas: [
            'Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Egbado North', 'Egbado South', 
            'Ewekoro', 'Ifo', 'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 
            'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside', 
            'Remo North', 'Shagamu'
        ]
    },
    {
        name: 'Ondo',
        lgas: [
            'Akoko North-East', 'Akoko North-West', 'Akoko South-West', 'Akoko South-East', 
            'Akure North', 'Akure South', 'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo', 
            'Irele', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West', 'Ose', 'Owo'
        ]
    },
    {
        name: 'Osun',
        lgas: [
            'Atakunmosa East', 'Atakunmosa West', 'Aiyedaade', 'Aiyedire', 'Boluwaduro', 'Boripe', 
            'Ede North', 'Ede South', 'Ife Central', 'Ife East', 'Ife North', 'Ife South', 'Egbedore', 
            'Ejigbo', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesa East', 'Ilesa West', 'Irepodun', 
            'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa', 'Olorunda', 'Oriade', 
            'Orolu', 'Osogbo'
        ]
    },
    {
        name: 'Oyo',
        lgas: [
            'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North-East', 
            'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central', 
            'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 
            'Kajola', 'Lagelu', 'Ogbomosho North', 'Ogbomosho South', 'Ogo Oluwa', 'Olorunsogo', 
            'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 
            'Saki West', 'Surulere'
        ]
    },
    {
        name: 'Plateau',
        lgas: [
            'Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 
            'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Mikang', 'Pankshin', 'Qua’an Pan', 
            'Riyom', 'Shendam', 'Wase'
        ]
    },
    {
        name: 'Rivers',
        lgas: [
            'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru', 
            'Bonny', 'Degema', 'Eleme', 'Emohua', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 
            'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro', 
            'Oyigbo', 'Port Harcourt', 'Tai'
        ]
    },
    {
        name: 'Sokoto',
        lgas: [
            'Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela', 
            'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North', 
            'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta', 'Wamako', 'Wurno', 'Yabo'
        ]
    },
    {
        name: 'Taraba',
        lgas: [
            'Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido', 
            'Kumi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'
        ]
    },
    {
        name: 'Yobe',
        lgas: [
            'Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 
            'Jakusko', 'Karasuwa', 'Machina', 'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 
            'Yunusari', 'Yusufari'
        ]
    },
    {
        name: 'Zamfara',
        lgas: [
            'Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau', 
            'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Tsafe', 'Zurmi'
        ]
    },
    {
        name: 'FCT',
        lgas: [
            'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council'
        ]
    }
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staff',
        href: '/staff',
    },
];

export default function Staff({ staff, cadres, dbas, his, bank, pfa, filters }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [filteredLgas, setFilteredLgas] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [exportFormat, setExportFormat] = useState<'excel' | 'word' | null>(null);
    const [selectedFields, setSelectedFields] = useState<string[]>(availableFields.map(f => f.key));

    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
const [transferringStaff, setTransferringStaff] = useState<Staff | null>(null);
const { data: transferData, setData: setTransferData, put: transferPut, processing: transferProcessing, errors: transferErrors, reset: resetTransfer } = useForm({
    dba: '',
    currentDba: '',
    comment: '',
});


const handleTransfer = (staff: Staff) => {
    setTransferringStaff(staff);
    setTransferData({
        dba: staff.dba || '',           // Pre-fill new department with current value
        currentDba: staff.dba || '', 
        comment: '', // Pre-fill comment with current value
    });
    setIsTransferModalOpen(true);
};

const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferringStaff) return;

    transferPut(`/staff/${transferringStaff.staffId}/transfer`, {
        data: {
            dba: transferData.dba,
            currentDba: transferData.currentDba,
            staffId: transferringStaff.staffId,
            comment: transferData.comment,
        },
        onSuccess: () => {
            setIsTransferModalOpen(false);
            setTransferringStaff(null);
            resetTransfer();
        },
        onError: (errors) => {
            console.error('Transfer errors:', errors);
        },
    });
};

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        fileNumber: '',
        surname: '',
        firstName: '',
        lastName: '',
        otherNames: '',
        dateOfBirth: '',
        gender: '',
        stateOfOrigin: '',
        lgaOfOrigin: '',
        dateOfFirstAppointment: '',
        dateOfPresentAppointment: '',
        dateOfConfirmation: '',
        cadre: '',
        accountNumber: '',
        bankId: '',
        PFANumber: '',
        PFAId: '',
        NHFNumber: '',
        HISNumber: '',
        HISId: '',
        dba: '',
        status: '',
    });

    const totalSteps = 6;

    // Filter LGAs when stateOfOrigin changes
    useEffect(() => {
        if (data.stateOfOrigin) {
            const selectedState = nigerianStates.find(state => state.name === data.stateOfOrigin);
            setFilteredLgas(selectedState ? selectedState.lgas : []);
            // Only reset lgaOfOrigin if it’s not valid for the new state
            if (selectedState && !selectedState.lgas.includes(data.lgaOfOrigin)) {
                setData('lgaOfOrigin', '');
            }
        } else {
            setFilteredLgas([]);
            setData('lgaOfOrigin', '');
        }
    }, [data.stateOfOrigin]);


    // Handle search submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Navigate to the same route with updated search query
        window.location.href = route('staff.index', { search: searchQuery, per_page: filters.per_page });
    };


    const openExportModal = (format: 'excel' | 'word') => {
        setExportFormat(format);
        setIsExportModalOpen(true);
    };

    const handleFieldToggle = (fieldKey: string) => {
        setSelectedFields(prev =>
            prev.includes(fieldKey) ? prev.filter(f => f !== fieldKey) : [...prev, fieldKey]
        );
    };

    const exportToExcel = () => {
        const filteredData = staff.data.map(staffMember => {
            const row: { [key: string]: any } = {};
            selectedFields.forEach(field => {
                if (field === 'cadre') row[field] = cadres.find(c => c.cadreId === parseInt(staffMember[field]))?.cadreName || staffMember[field];
                else if (field === 'bankId') row[field] = bank.find(b => b.bankId === parseInt(staffMember[field]))?.bankName || staffMember[field];
                else if (field === 'PFAId') row[field] = pfa.find(p => p.PFAId === staffMember[field])?.pfaName || staffMember[field];
                else if (field === 'HISId') row[field] = his.find(h => h.HISId === staffMember[field])?.hisName || staffMember[field];
                else if (field === 'dba') row[field] = dbas.find(d => d.dbaId === parseInt(staffMember[field]))?.dbaName || staffMember[field];
                else row[field] = staffMember[field as keyof Staff] || 'N/A';
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff');
        XLSX.writeFile(workbook, 'staff_data.xlsx');
        setIsExportModalOpen(false);
    };

    const exportToWord = () => {
        const doc = new docx.Document({
            sections: [{
                children: [
                    new docx.Paragraph({
                        text: 'Staff Data',
                        heading: docx.HeadingLevel.TITLE,
                    }),
                    new docx.Table({
                        rows: [
                            new docx.TableRow({
                                children: selectedFields.map(field => new docx.TableCell({
                                    children: [new docx.Paragraph(availableFields.find(f => f.key === field)?.label || field)],
                                })),
                            }),
                            ...staff.data.map(staffMember => new docx.TableRow({
                                children: selectedFields.map(field => {
                                    let value = staffMember[field as keyof Staff] || 'N/A';
                                    if (field === 'cadre') value = cadres.find(c => c.cadreId === parseInt(staffMember[field]))?.cadreName || value;
                                    else if (field === 'bankId') value = bank.find(b => b.bankId === parseInt(staffMember[field]))?.bankName || value;
                                    else if (field === 'PFAId') value = pfa.find(p => p.PFAId === staffMember[field])?.pfaName || value;
                                    else if (field === 'HISId') value = his.find(h => h.HISId === staffMember[field])?.hisName || value;
                                    else if (field === 'dba') value = dbas.find(d => d.dbaId === parseInt(staffMember[field]))?.dbaName || value;
                                    return new docx.TableCell({
                                        children: [new docx.Paragraph(value.toString())],
                                    });
                                }),
                            })),
                        ],
                    }),
                ],
            }],
        });
    
        docx.Packer.toBlob(doc).then(blob => {
            saveAs(blob, 'staff_data.docx');
            setIsExportModalOpen(false);
        }).catch(err => console.error('Error generating Word file:', err));
    };

    const handleExport = () => {
        if (exportFormat === 'excel') exportToExcel();
        else if (exportFormat === 'word') exportToWord();
    };


    const handleEdit = (staff: Staff) => {
        setEditingStaff(staff);
        setData({
            fileNumber: staff.fileNumber || '',
            surname: staff.surname || '',
            firstName: staff.firstName || '',
            lastName: staff.lastName || '',
            otherNames: staff.otherNames || '',
            dateOfBirth: staff.dateOfBirth || '',
            gender: staff.gender || '',
            stateOfOrigin: staff.stateOfOrigin || '',
            lgaOfOrigin: staff.lgaOfOrigin || '',
            dateOfFirstAppointment: staff.dateOfFirstAppointment || '',
            dateOfPresentAppointment: staff.dateOfPresentAppointment || '',
            dateOfConfirmation: staff.dateOfConfirmation || '',
            cadre: staff.cadre || '',
            accountNumber: staff.accountNumber || '',
            bankId: staff.bankId || '',
            PFANumber: staff.PFANumber || '',
            PFA: staff.PFAId || '',
            NHFNumber: staff.NHFNumber || '',
            HISNumber: staff.HISNumber || '',
            HIS: staff.HISId || '',
            dba: staff.dba || '',
            status: staff.status || '',
        });

        // Pre-populate filteredLgas for the selected state
        const selectedState = nigerianStates.find(state => state.name === staff.stateOfOrigin);
        setFilteredLgas(selectedState ? selectedState.lgas : []);

        setCurrentStep(1);
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            return;
        }

        if (editingStaff) {
            put(`/staff/${editingStaff.staffId}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingStaff(null);
                    setCurrentStep(1);
                    reset();
                },
            });
        } else {
            post('/staff', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setCurrentStep(1);
                    reset();
                },
            });
        }
    };

    const handleViewSummary = (staff: Staff) => {
        setSelectedStaff(staff);
        setIsSummaryModalOpen(true);
    };

    const handleDelete = (staffId: number) => {
        if (confirm('Are you sure you want to delete this staff record?')) {
            destroy(`/staff/${staffId}`);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Number</label>
                            <input
                                type="text"
                                value={data.fileNumber}
                                onChange={(e) => setData('fileNumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.fileNumber && <p className="mt-1 text-sm text-red-600">{errors.fileNumber}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Surname</label>
                            <input
                                type="text"
                                value={data.surname}
                                onChange={(e) => setData('surname', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                            <input
                                type="text"
                                value={data.firstName}
                                onChange={(e) => setData('firstName', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                value={data.dateOfBirth}
                                onChange={(e) => setData('dateOfBirth', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                            <select
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Demographic Info</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State of Origin</label>
                            <select
                                value={data.stateOfOrigin}
                                onChange={(e) => setData('stateOfOrigin', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select State</option>
                                {nigerianStates.map((state) => (
                                    <option key={state.name} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            {errors.stateOfOrigin && <p className="mt-1 text-sm text-red-600">{errors.stateOfOrigin}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LGA of Origin</label>
                            <select
                                value={data.lgaOfOrigin}
                                onChange={(e) => setData('lgaOfOrigin', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={!data.stateOfOrigin}
                            >
                                <option value="">Select LGA</option>
                                {filteredLgas.map((lga) => (
                                    <option key={lga} value={lga}>
                                        {lga}
                                    </option>
                                ))}
                            </select>
                            {errors.lgaOfOrigin && <p className="mt-1 text-sm text-red-600">{errors.lgaOfOrigin}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appointment Details</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of First Appointment</label>
                            <input
                                type="date"
                                value={data.dateOfFirstAppointment}
                                onChange={(e) => setData('dateOfFirstAppointment', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Present Appointment</label>
                            <input
                                type="date"
                                value={data.dateOfPresentAppointment}
                                onChange={(e) => setData('dateOfPresentAppointment', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Confirmation</label>
                            <input
                                type="date"
                                value={data.dateOfConfirmation}
                                onChange={(e) => setData('dateOfConfirmation', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        
                    </div>
                );

                case 4:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Posting Details</h3>
                        

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cadre</label>
                            <select
                                value={data.cadre}
                                onChange={(e) => setData('cadre', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Cadre</option>
                                {cadres.map((cadre) => (
                                    <option key={cadre.cadreId} value={cadre.cadreId}>
                                        {cadre.cadreName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DBA</label>
                            <select
                                value={data.dba}
                                onChange={(e) => setData('dba', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select DBA</option>
                                {dbas.map((dba) => (
                                    <option key={dba.dbaId} value={dba.dbaId}>
                                        {dba.dbaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                );
                case 5:
                    return (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">NHF & Health Insurance</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NHF Number</label>
                                <input
                                    type="text"
                                    value={data.NHFNumber}
                                    onChange={(e) => setData('NHFNumber', e.target.value)}
                                    className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HIPs</label>
                                <select
                                    value={data.HIS}
                                    onChange={(e) => setData('HIS', e.target.value)}
                                    className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select HIP </option>
                                    {his.map((provider) => (
                                        <option key={provider.HISId} value={provider.HISId}>
                                            {provider.hisName}
                                        </option>
                                    ))}
                                </select>
                                {errors.HIS && <p className="mt-1 text-sm text-red-600">{errors.HIS}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HIP Number</label>
                                <input
                                    type="text"
                                    value={data.HISNumber}
                                    onChange={(e) => setData('HISNumber', e.target.value)}
                                    className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    );

                case 6:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Financial Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Number</label>
                            <input
                                type="text"
                                value={data.accountNumber}
                                onChange={(e) => setData('accountNumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bank</label>
                                <select
                                    value={data.bankId}
                                    onChange={(e) => setData('bankId', e.target.value)}
                                    className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Bank </option>
                                    {bank.map((bank) => (
                                        <option key={bank.bankId} value={bank.bankId}>
                                            {bank.bankName}
                                        </option>
                                    ))}
                                </select>
                                {errors.HIS && <p className="mt-1 text-sm text-red-600">{errors.HIS}</p>}
                            </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PFA Number</label>
                            <input
                                type="text"
                                value={data.PFANumber}
                                onChange={(e) => setData('PFANumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        
                    </div>
                );

            default:
                return null;
        }
    };

    const renderSummary = () => {
        if (!selectedStaff) return null;

        const formatDate = (dateString: string | undefined) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'N/A';
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Staff Summary</h3>
                <div>
                    <p><strong>File Number:</strong> {selectedStaff.fileNumber || 'N/A'}</p>
                    <p><strong>Surname:</strong> {selectedStaff.surname || 'N/A'}</p>
                    <p><strong>First Name:</strong> {selectedStaff.firstName || 'N/A'}</p>
                    <p><strong>Last Name:</strong> {selectedStaff.lastName || 'N/A'}</p>
                    <p><strong>Other Names:</strong> {selectedStaff.otherNames || 'N/A'}</p>
                    <p><strong>Date of Birth:</strong> {formatDate(selectedStaff.dateOfBirth)}</p>
                    <p><strong>Gender:</strong> {selectedStaff.gender || 'N/A'}</p>
                    <p><strong>State of Origin:</strong> {selectedStaff.stateOfOrigin || 'N/A'}</p>
                    <p><strong>LGA of Origin:</strong> {selectedStaff.lgaOfOrigin || 'N/A'}</p>
                    <p><strong>Date of First Appointment:</strong> {formatDate(selectedStaff.dateOfFirstAppointment)}</p>
                    <p><strong>Date of Present Appointment:</strong> {formatDate(selectedStaff.dateOfPresentAppointment)}</p>
                    <p><strong>Date of Confirmation:</strong> {formatDate(selectedStaff.dateOfConfirmation)}</p>
                    <p><strong>Cadre:</strong> {cadres.find(c => c.cadreId === parseInt(selectedStaff.cadre))?.cadreName || 'N/A'}</p>
                    <p><strong>Account Number:</strong> {selectedStaff.accountNumber || 'N/A'}</p>
                    <p><strong>Bank Name:</strong> {selectedStaff.bank?.bankName || 'N/A'}</p>
                    <p><strong>PFA Number:</strong> {selectedStaff.PFANumber || 'N/A'}</p>
                    <p><strong>PFA:</strong> {selectedStaff.pfa?.pfaName || 'N/A'}</p>
                    <p><strong>NHF Number:</strong> {selectedStaff.NHFNumber || 'N/A'}</p>
                    <p><strong>HIP Number:</strong> {selectedStaff.HISNumber || 'N/A'}</p>
                    <p><strong>HIP:</strong> {selectedStaff.his?.hisName || 'N/A'}</p>
                    <p><strong>DBA:</strong> {dbas.find(d => d.dbaId === parseInt(selectedStaff.dba))?.dbaName || 'N/A'}</p>
                    <p><strong>Status:</strong> {selectedStaff.status || 'N/A'}</p>
                </div>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
            <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setEditingStaff(null);
                                reset();
                                setCurrentStep(1);
                                setIsModalOpen(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Staff
                        </button>
                        <button
                            onClick={() => openExportModal('excel')}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Export to Excel
                        </button>
                        <button
                            onClick={() => openExportModal('word')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            Export to Word
                        </button>
                    </div>
                    <form onSubmit={handleSearch} className="w-full sm:w-auto flex gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search staff..."
                            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Staff Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {staff.data.map((org) => (
                                    <tr key={org.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.fileNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.surname} {org.firstName} {org.otherNames}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{org.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            <div className="flex space-x-2">
                                            <button 
    onClick={() => handleTransfer(org)} 
    className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300" 
    title="Transfer"
>
    <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5h12m0 0l-4 4m4-4l-4-4M15 19H3m0 0l4-4m-4 4l4 4" 
        />
    </svg>
</button>
                                                <button
                                                    onClick={() => handleViewSummary(org)}
                                                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                                    title="View Summary"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
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
                                                    onClick={() => handleDelete(org.staffId)}
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

                    {/* Pagination Controls */}
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Showing {staff.data.length} of {staff.total} records
                        </div>
                        <div className="flex gap-2 flex-wrap justify-center">
                            {staff.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                    } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {isExportModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Select Fields to Export
                </h2>
                <button
                    onClick={() => setIsExportModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                >
                    ✕
                </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-4">
                <div className="space-y-2">
                    {availableFields.map(field => (
                        <div key={field.key} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedFields.includes(field.key)}
                                onChange={() => handleFieldToggle(field.key)}
                                className="mr-2"
                            />
                            <label className="text-gray-900 dark:text-white">{field.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <button
                    onClick={() => setIsExportModalOpen(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                    Cancel
                </button>
                <button
                    onClick={handleExport}
                    disabled={selectedFields.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    Export
                </button>
            </div>
        </div>
    </div>
)}


{isTransferModalOpen && transferringStaff && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Transfer {transferringStaff.surname} {transferringStaff.firstName}
                </h2>
                <button
                    onClick={() => setIsTransferModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                >
                    ✕
                </button>
            </div>
            <form onSubmit={handleTransferSubmit}>
                <div className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Department (DBA)</label>
                        <input
                            type="text"
                            value={dbas.find(d => d.dbaId === parseInt(transferData.currentDba))?.dbaName || transferData.currentDba || 'N/A'}
                            readOnly
                            className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Department (DBA)</label>
                        <select
                            value={transferData.dba}
                            onChange={(e) => setTransferData('dba', e.target.value)}
                            className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Department</option>
                            {dbas.map((dba) => (
                                <option key={dba.dbaId} value={dba.dbaId}>
                                    {dba.dbaName}
                                </option>
                            ))}
                        </select>
                        {transferErrors.dba && <p className="mt-1 text-sm text-red-600">{transferErrors.dba}</p>}
                    </div>

                    <div>
                           
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason (Comment)</label>
    <textarea 
        value={transferData.comment}  // ✅ Correct: Use transferData
        onChange={(e) => setTransferData('comment', e.target.value)}  // ✅ Correct: Use setTransferData
        className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
    </textarea>
</div>
                        </div>

                {/* </div> */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setIsTransferModalOpen(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={transferProcessing || transferData.dba === transferData.currentDba}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
                    >
                        {transferProcessing ? 'Transferring...' : 'Transfer'}
                    </button>
                </div>
            </form>
        </div>
    </div>
)}                {/* Main Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto relative">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                    {editingStaff ? 'Edit Staff' : 'Add New Staff'}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                {[1, 2, 3, 4, 5, 6].map((step) => (
                                    <div
                                        key={step}
                                        className={`flex-1 text-center text-sm sm:text-base ${
                                            step === currentStep
                                                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        Step {step}
                                    </div>
                                ))}
                            </div>

                            {/* Scrollable Form Content */}
                            <form onSubmit={handleSubmit}>
                                <div className="max-h-[50vh] overflow-y-auto p-4">
                                    {renderStep()}
                                </div>

                                {/* Buttons */}
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-3">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                            className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingStaff(null);
                                                setCurrentStep(1);
                                                reset();
                                            }}
                                            className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Saving...'
                                                : currentStep === totalSteps
                                                ? 'Save'
                                                : 'Next'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Summary Modal */}
                {isSummaryModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto relative">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Staff Summary</h2>
                                <button
                                    onClick={() => setIsSummaryModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-4">
                                {renderSummary()}
                            </div>
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                <button
                                    onClick={() => setIsSummaryModalOpen(false)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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